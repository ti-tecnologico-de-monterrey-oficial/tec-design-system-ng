"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchableNameTypes = exports.PROPERTY_PLACEHOLDER = void 0;
exports.generateValueMapping = generateValueMapping;
exports.buildMatchableNamesMap = buildMatchableNamesMap;
exports.generatePropMapping = generatePropMapping;
const figma_rest_api_1 = require("../figma_rest_api");
const fast_fuzzy_1 = require("fast-fuzzy");
const intrinsics_1 = require("../../connect/intrinsics");
const create_1 = require("../../react/create");
/**
 * These thresholds were come up with by running the benchmarking
 * and tweaking until high positives + acceptable false positives
 * were achieved. It's worth repeating this process whenever making
 * changes to the mapping algorithm.
 */
const MININUM_MATCH_SCORES = {
    fuzzy: {
        property: 0.65,
        variantValue: 0.8,
    },
    embeddings: {
        property: 0.84,
        variantValue: 0.87,
    },
};
/**
 * Used when we should output a placeholder for an unknown value in prop mapping.
 */
exports.PROPERTY_PLACEHOLDER = 'PROPERTY_PLACEHOLDER';
function generateValueMapping(propSignature, figmaPropDef) {
    const searchableCodeEnumOptions = {};
    propSignature.split(' | ').forEach((str) => {
        if (str.startsWith('"') && str.endsWith('"')) {
            const withoutQuotes = str.substring(1, str.length - 1);
            searchableCodeEnumOptions[withoutQuotes] = withoutQuotes;
        }
        else if (str === 'true') {
            searchableCodeEnumOptions[str] = true;
        }
        else if (str === 'false') {
            searchableCodeEnumOptions[str] = false;
        }
        else if (!isNaN(Number(str))) {
            searchableCodeEnumOptions[str] = Number(str);
        }
    });
    const searcher = new fast_fuzzy_1.Searcher(figmaPropDef.variantOptions);
    return Object.entries(searchableCodeEnumOptions).reduce((valueMapping, [codeEnumValue, mappedValue]) => {
        const results = searcher.search(codeEnumValue, { returnMatchData: true });
        if (results.length && results[0].score > 0.5) {
            valueMapping[results[0].item] = mappedValue;
        }
        return valueMapping;
    }, {});
}
function signatureIsJsxLike(signature) {
    return (signature.includes('ElementType') ||
        signature.includes('ReactElement') ||
        signature.includes('ReactNode'));
}
/**
 * Attempts to create a mapping between a code prop and figma prop.
 * These props have been matched by name and aren't guaranteed to
 * actually be related, so we return null if no suitable mapping
 */
function generateIntrinsic({ propSignature, figmaPropName: figmaPropNameWithNodeId, figmaPropDef, }) {
    const figmaPropName = stripNodeIdFromPropertyName(figmaPropNameWithNodeId);
    if (propSignature === 'string' && figmaPropDef.type === figma_rest_api_1.FigmaRestApi.ComponentPropertyType.Text) {
        return {
            kind: intrinsics_1.IntrinsicKind.String,
            args: {
                figmaPropName,
            },
        };
    }
    if (propSignature === 'false | true' &&
        (figmaPropDef.type === figma_rest_api_1.FigmaRestApi.ComponentPropertyType.Boolean ||
            (figmaPropDef.type === figma_rest_api_1.FigmaRestApi.ComponentPropertyType.Variant &&
                figmaPropDef.variantOptions?.length === 2 &&
                figmaPropDef.variantOptions?.every(create_1.isBooleanKind)))) {
        return {
            kind: intrinsics_1.IntrinsicKind.Boolean,
            args: {
                figmaPropName,
            },
        };
    }
    if (propSignature.includes(' | ') &&
        figmaPropDef.type === figma_rest_api_1.FigmaRestApi.ComponentPropertyType.Variant) {
        const valueMapping = generateValueMapping(propSignature, figmaPropDef);
        // Only valuable if some values were mapped
        if (Object.keys(valueMapping).length > 0) {
            return {
                kind: intrinsics_1.IntrinsicKind.Enum,
                args: {
                    figmaPropName,
                    valueMapping,
                },
            };
        }
    }
    if (signatureIsJsxLike(propSignature) &&
        figmaPropDef.type === figma_rest_api_1.FigmaRestApi.ComponentPropertyType.InstanceSwap) {
        return {
            kind: intrinsics_1.IntrinsicKind.Instance,
            args: {
                figmaPropName,
            },
        };
    }
    return null;
}
function stripNodeIdFromPropertyName(propertyName) {
    return propertyName.replace(/#\d+:\d+/, '');
}
var MatchableNameTypes;
(function (MatchableNameTypes) {
    MatchableNameTypes[MatchableNameTypes["Property"] = 0] = "Property";
    MatchableNameTypes[MatchableNameTypes["VariantValue"] = 1] = "VariantValue";
    // ChildLayer, // TODO
})(MatchableNameTypes || (exports.MatchableNameTypes = MatchableNameTypes = {}));
const MATCHABLE_NAME_TYPES_PRIORITY = [
    MatchableNameTypes.Property,
    MatchableNameTypes.VariantValue,
];
/**
 * Builds a map of all properties and enum values, indexed by name.
 * @param componentPropertyDefinitions
 * @returns A map of {name: values[]}. Each value is an array to avoid
 * collisions between properties / enum values
 */
function buildMatchableNamesMap(componentPropertyDefinitions) {
    const matchableValues = {};
    function add(name, definition) {
        matchableValues[name] = matchableValues[name] || [];
        matchableValues[name].push(definition);
    }
    Object.entries(componentPropertyDefinitions || {}).forEach(([propName, propDef]) => {
        const name = stripNodeIdFromPropertyName(propName);
        add(name, {
            type: MatchableNameTypes.Property,
            name: propName,
        });
        if (propDef.type === figma_rest_api_1.FigmaRestApi.ComponentPropertyType.Variant) {
            propDef.variantOptions?.forEach((variantValue) => {
                add(variantValue, {
                    type: MatchableNameTypes.VariantValue,
                    name: variantValue,
                    variantProperty: propName,
                });
            });
        }
    });
    return matchableValues;
}
function generatePropMapping({ componentPropertyDefinitions, signature, componentMatchResults, matchableNamesMap, }) {
    const propMapping = {};
    const searchSpace = Object.keys(matchableNamesMap);
    const searcher = new fast_fuzzy_1.Searcher(searchSpace);
    let minimumMatchScores = MININUM_MATCH_SCORES.fuzzy;
    const useEmbeddings = !!componentMatchResults;
    if (useEmbeddings) {
        minimumMatchScores = MININUM_MATCH_SCORES.embeddings;
    }
    function attemptGetIntrinsicForProp({ propMatch, propSignature, }) {
        const itemsInPriorityOrder = [...matchableNamesMap[propMatch.item]].sort((a, b) => MATCHABLE_NAME_TYPES_PRIORITY.indexOf(a.type) -
            MATCHABLE_NAME_TYPES_PRIORITY.indexOf(b.type));
        for (const item of itemsInPriorityOrder) {
            /**
             * First, look for matching property names with compatible types
             */
            if (item.type === MatchableNameTypes.Property &&
                propMatch.score > minimumMatchScores.property) {
                const intrinsic = generateIntrinsic({
                    propSignature,
                    figmaPropName: item.name,
                    figmaPropDef: componentPropertyDefinitions[item.name],
                });
                if (intrinsic) {
                    return intrinsic;
                }
                /**
                 * Then if no match AND a boolean prop, look for matching variant values, e.g:
                 *
                 * disabled: figma.enum('State', {
                 *   Disabled: true,
                 * })
                 */
            }
            else if (item.type === MatchableNameTypes.VariantValue &&
                propSignature === 'false | true' &&
                propMatch.score > minimumMatchScores.variantValue) {
                return {
                    kind: intrinsics_1.IntrinsicKind.Enum,
                    args: {
                        figmaPropName: item.variantProperty,
                        valueMapping: {
                            [item.name]: true,
                        },
                    },
                };
            }
        }
        return null;
    }
    /**
     * Attempt to generate an intrinsic for a given property name by looking
     * for name matches with a minimum threshold
     *
     * Embeddings are priorized over fuzzy matching if present (they
     * may be missing if gated or missing permissions).
     */
    for (const [propName, propSignatureWithOptionalModifier] of Object.entries(signature)) {
        const propSignature = propSignatureWithOptionalModifier.startsWith('?')
            ? propSignatureWithOptionalModifier.substring(1)
            : propSignatureWithOptionalModifier;
        let matches = searcher.search(propName, { returnMatchData: true });
        if (useEmbeddings) {
            matches = componentMatchResults[propName];
        }
        if (matches.length === 0) {
            continue;
        }
        for (const match of matches) {
            const intrinsic = attemptGetIntrinsicForProp({
                propMatch: match,
                propSignature,
            });
            if (intrinsic) {
                propMapping[propName] = intrinsic;
                break;
            }
        }
    }
    return propMapping;
}
//# sourceMappingURL=prop_mapping.js.map