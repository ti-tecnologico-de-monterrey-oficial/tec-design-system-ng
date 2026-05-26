"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATE_BOOLEAN_VALUE_PAIRS = void 0;
exports.parseFigmaNode = parseFigmaNode;
exports.validateDoc = validateDoc;
exports.validateDocs = validateDocs;
const url = __importStar(require("url"));
const lodash_1 = require("lodash");
const logging_1 = require("../common/logging");
const helpers_1 = require("./helpers");
const figma_rest_api_1 = require("./figma_rest_api");
const fetch_1 = require("../common/fetch");
function parseFigmaNode(verbose, doc, silent = false) {
    const figmaNodeUrl = url.parse(doc.figmaNode, true);
    const fileKeyMatch = figmaNodeUrl.path?.match(/(file|design)\/([a-zA-Z0-9]+)/);
    if (!fileKeyMatch) {
        if (!silent || verbose) {
            logging_1.logger.error(`Failed to parse ${doc.figmaNode}`);
        }
        return null;
    }
    const fileKey = fileKeyMatch[2];
    const nodeId = figmaNodeUrl.query['node-id'];
    if (nodeId && typeof nodeId === 'string') {
        const figmaNodeId = (0, helpers_1.validateNodeId)(nodeId);
        return { fileKey, nodeId: figmaNodeId };
    }
    else {
        if (!silent || verbose) {
            logging_1.logger.error(`Failed to get node-id from ${doc.figmaNode}`);
        }
        return null;
    }
}
async function fetchNodeInfo(baseApiUrl, fileKey, nodeIdsChunk, accessToken) {
    try {
        const response = await fetch_1.request.get(`${baseApiUrl}${fileKey}/nodes?ids=${nodeIdsChunk.join(',')}`, { headers: (0, figma_rest_api_1.getHeaders)(accessToken) });
        if (response.response.status !== 200) {
            logging_1.logger.error('Failed to fetch node info: ' + response.response.status + ' ' + response.data?.message);
            return null;
        }
        return response.data.nodes;
    }
    catch (err) {
        if ((0, fetch_1.isFetchError)(err)) {
            if (err.response) {
                logging_1.logger.error(`Failed to to fetch node info (${err.response.status}): ${err.response.status} ${err.data?.err ?? err.data?.message}`);
            }
            else {
                logging_1.logger.error(`Failed to to fetch node info: ${err.message}`);
            }
            logging_1.logger.debug(JSON.stringify(err.data));
        }
        else {
            logging_1.logger.error(`Failed to to fetch node info: ${err}`);
        }
        return null;
    }
}
function validateProps(doc, document) {
    if (doc.templateData && doc.templateData?.props) {
        let propsValid = true;
        const codeConnectProps = Object.keys(doc.templateData.props ?? {});
        for (let i = 0; i < codeConnectProps.length; i++) {
            const codeConnectProp = doc.templateData?.props[codeConnectProps[i]];
            if (codeConnectProp.kind === 'children') {
                const codeConnectLayerNames = codeConnectProp.args.layers;
                // Get all layer names in the figma doc
                const figmaLayerNames = [];
                const getLayerNames = (layer) => {
                    if (layer.name) {
                        figmaLayerNames.push(layer.name);
                    }
                    if (layer.children) {
                        layer.children.forEach((child) => getLayerNames(child));
                    }
                };
                getLayerNames(document);
                // And make sure that the layer names in the code connect file are present in the figma doc
                for (const codeConnectLayerName of codeConnectLayerNames) {
                    const regex = new RegExp('^' + codeConnectLayerName.replace('*', '.*'));
                    if (figmaLayerNames.every((name) => !regex.test(name))) {
                        logging_1.logger.error(`Validation failed for ${doc.component} (${doc.figmaNode}): The layer "${codeConnectLayerName}" does not exist on the Figma component`);
                        propsValid = false;
                    }
                }
                continue;
            }
            if (codeConnectProp.kind === 'boolean' ||
                codeConnectProp.kind === 'enum' ||
                codeConnectProp.kind === 'string') {
                const codeConnectFigmaPropName = codeConnectProp?.args?.figmaPropName;
                if (!document.componentPropertyDefinitions ||
                    !Object.keys(document.componentPropertyDefinitions).find((figmaProp) => propMatches(figmaProp, codeConnectFigmaPropName, document.componentPropertyDefinitions))) {
                    logging_1.logger.error(`Validation failed for ${doc.component} (${doc.figmaNode}): The property "${codeConnectFigmaPropName}" does not exist on the Figma component`);
                    propsValid = false;
                }
            }
        }
        if (!propsValid) {
            return false;
        }
    }
    return true;
}
function getPropName(componentPropertyDefinitions, propName) {
    const prop = componentPropertyDefinitions[propName];
    if (prop.type === 'VARIANT') {
        return propName;
    }
    // non Variant Keys are of the form "name#id"
    // We have to take the last one in case the name contains #'s
    const lastIndex = propName.lastIndexOf('#');
    if (lastIndex !== -1) {
        return propName.substring(0, lastIndex);
    }
    return propName;
}
function propMatches(figmaProp, codeConnectPropName, componentPropertyDefinitions) {
    const figmaPropName = getPropName(componentPropertyDefinitions, figmaProp);
    return figmaPropName === codeConnectPropName;
}
exports.STATE_BOOLEAN_VALUE_PAIRS = [
    ['yes', 'no'],
    ['true', 'false'],
    ['on', 'off'],
];
function isVariantBoolean(variantPossibleValues) {
    if (variantPossibleValues.length === 2) {
        const lowerCaseOptions = variantPossibleValues.map((p) => p.toLowerCase());
        for (const pair of exports.STATE_BOOLEAN_VALUE_PAIRS) {
            const i = lowerCaseOptions.indexOf(pair[0]);
            const j = lowerCaseOptions.indexOf(pair[1]);
            if (i !== -1 && j !== -1) {
                return true;
            }
        }
    }
    return false;
}
function validateVariantRestrictions(doc, document) {
    if (doc.variant) {
        let variantRestrictionsValid = true;
        const codeConnectVariantRestrictions = Object.keys(doc.variant);
        for (let i = 0; i < codeConnectVariantRestrictions.length; i++) {
            const variantRestriction = codeConnectVariantRestrictions[i];
            const match = Object.keys(document.componentPropertyDefinitions ?? {}).find((figmaProp) => propMatches(figmaProp, variantRestriction, document.componentPropertyDefinitions));
            if (!match) {
                logging_1.logger.error(`Validation failed for ${doc.component} (${doc.figmaNode}): The property "${variantRestriction}" does not exist on the Figma component`);
                variantRestrictionsValid = false;
                continue;
            }
            const variantRestrictionValue = doc.variant[variantRestriction];
            const variantOrProp = document.componentPropertyDefinitions[match];
            // Only check `variantOptions` for Variants, and not for props, since props
            // don't have a set of possible values we can check against
            const isValidBooleanVariant = typeof variantRestrictionValue === 'boolean' &&
                Array.isArray(variantOrProp.variantOptions) &&
                isVariantBoolean(variantOrProp.variantOptions);
            const isValidVariantValue = variantOrProp.variantOptions?.includes(variantRestrictionValue) || isValidBooleanVariant;
            if (variantOrProp.type === 'VARIANT' && !isValidVariantValue) {
                logging_1.logger.error(`Validation failed for ${doc.component} (${doc.figmaNode}): The Figma Variant "${match}" does not have an option for ${variantRestrictionValue}`);
                variantRestrictionsValid = false;
                continue;
            }
        }
        if (!variantRestrictionsValid) {
            return false;
        }
    }
    return true;
}
function validateDoc(doc, figmaNode, nodeId) {
    if (!figmaNode || !figmaNode.document) {
        logging_1.logger.error(`Validation failed for ${doc.component} (${doc.figmaNode}): node not found in file`);
        return false;
    }
    const document = figmaNode.document;
    if (document.type !== 'COMPONENT' && document.type !== 'COMPONENT_SET') {
        logging_1.logger.error(`Validation failed for ${doc.component} (${doc.figmaNode}): corresponding node is not a component or component set`);
        return false;
    }
    const component = figmaNode.components[nodeId];
    if (component && component.componentSetId) {
        logging_1.logger.error(`Validation failed for ${doc.component} (${doc.figmaNode}): node is not a top level component or component set. Please check that the node is not a variant`);
        return false;
    }
    const propsValid = validateProps(doc, document);
    if (!propsValid) {
        return false;
    }
    const variantRestrictionsValid = validateVariantRestrictions(doc, document);
    if (!variantRestrictionsValid) {
        return false;
    }
    return true;
}
async function validateDocs(cmd, accessToken, docs) {
    let baseApiUrl = (0, figma_rest_api_1.getApiUrl)(docs?.[0]?.figmaNode ?? '') + '/files/';
    const fileKeyToNodeIds = {};
    let valid = true;
    docs.forEach((doc) => {
        const parsedNode = parseFigmaNode(cmd.verbose, doc);
        if (!parsedNode) {
            valid = false;
            return;
        }
        fileKeyToNodeIds[parsedNode.fileKey] ||= {};
        fileKeyToNodeIds[parsedNode.fileKey][parsedNode.nodeId] ||= [];
        fileKeyToNodeIds[parsedNode.fileKey][parsedNode.nodeId].push(doc);
    });
    if (!valid) {
        return false;
    }
    logging_1.logger.debug('fileKeyToNodeIds');
    logging_1.logger.debug(JSON.stringify(fileKeyToNodeIds, null, 2));
    const fileKeys = Object.keys(fileKeyToNodeIds);
    for (let i = 0; i < fileKeys.length; i++) {
        const fileKey = fileKeys[i];
        logging_1.logger.debug(`Validating file ${fileKey}`);
        const nodeMap = fileKeyToNodeIds[fileKey];
        const nodeIds = Object.keys(nodeMap);
        logging_1.logger.debug(`Validating ${nodeIds.length} nodes`);
        const chunks = (0, lodash_1.chunk)(nodeIds, 400);
        for (let batch = 0; batch < chunks.length; batch++) {
            const nodeIdsChunk = chunks[batch];
            logging_1.logger.debug(`Running for ${baseApiUrl + fileKey + '/nodes?ids=' + nodeIdsChunk.join(',')}`);
            const nodeMapRet = await fetchNodeInfo(baseApiUrl, fileKey, nodeIdsChunk, accessToken);
            if (!nodeMapRet) {
                return false;
            }
            valid =
                valid &&
                    nodeIdsChunk
                        .map((nodeId) => {
                        return nodeMap[nodeId]
                            .map((doc) => validateDoc(doc, nodeMapRet[nodeId], nodeId))
                            .every(Boolean);
                    })
                        .every(Boolean);
        }
    }
    return valid;
}
//# sourceMappingURL=validation.js.map