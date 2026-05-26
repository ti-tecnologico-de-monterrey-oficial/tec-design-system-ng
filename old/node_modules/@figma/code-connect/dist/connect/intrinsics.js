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
exports.IntrinsicKind = exports.FIGMA_CONNECT_CALL = exports.API_PREFIX = void 0;
exports.parseIntrinsic = parseIntrinsic;
exports.valueToString = valueToString;
exports.valueMappingToString = valueMappingToString;
exports.intrinsicToString = intrinsicToString;
exports.parsePropsObject = parsePropsObject;
const ts = __importStar(require("typescript"));
const parser_common_1 = require("./parser_common");
const compiler_1 = require("../typescript/compiler");
const compiler_2 = require("../typescript/compiler");
const compiler_3 = require("../typescript/compiler");
const parser_template_helpers_1 = require("../react/parser_template_helpers");
const modifiers_1 = require("./modifiers");
exports.API_PREFIX = 'figma';
exports.FIGMA_CONNECT_CALL = `${exports.API_PREFIX}.connect`;
var IntrinsicKind;
(function (IntrinsicKind) {
    IntrinsicKind["Enum"] = "enum";
    IntrinsicKind["String"] = "string";
    IntrinsicKind["Boolean"] = "boolean";
    IntrinsicKind["Instance"] = "instance";
    IntrinsicKind["Children"] = "children";
    IntrinsicKind["NestedProps"] = "nested-props";
    IntrinsicKind["ClassName"] = "className";
    IntrinsicKind["TextContent"] = "text-content";
})(IntrinsicKind || (exports.IntrinsicKind = IntrinsicKind = {}));
const Intrinsics = {};
/**
 * These functions are used to convert "intrinsic" parser types (which are calls to helper functions
 * like `Figma.boolean() in code)` to an object representing that intrinsic that we can serialize to JSON.
 *
 * Each call to `makeIntrinsic` should take a function from the {@link FigmaConnectAPI},
 * ensuring that the name of the intrinsic that we're parsing matches the name of the function
 *
 * @param staticFunctionMember
 * @param obj
 */
function makeIntrinsic(intrinsicName, obj) {
    const name = `${exports.API_PREFIX}.${intrinsicName}`;
    Intrinsics[name] = {
        match: (exp) => {
            return ts.isCallExpression(exp) && exp.getText().replace(/\s/g, '').startsWith(name);
        },
        ...obj(name),
    };
}
makeIntrinsic('boolean', (name) => {
    return {
        parse: (exp, ctx) => {
            const figmaPropNameIdentifier = exp.arguments?.[0];
            (0, compiler_1.assertIsStringLiteral)(figmaPropNameIdentifier, ctx.sourceFile, `${name} takes at least one argument, which is the Figma property name`);
            const valueMappingArg = exp.arguments?.[1];
            let valueMapping;
            if (valueMappingArg) {
                (0, compiler_3.assertIsObjectLiteralExpression)(valueMappingArg, ctx.sourceFile, `${name} second argument should be an object literal, that sets values for 'true' and 'false'`);
                valueMapping = parsePropsObject(valueMappingArg, ctx);
            }
            return {
                kind: IntrinsicKind.Boolean,
                args: {
                    figmaPropName: (0, compiler_1.stripQuotesFromNode)(figmaPropNameIdentifier),
                    valueMapping,
                },
            };
        },
    };
});
makeIntrinsic('enum', (name) => {
    return {
        parse: (exp, ctx) => {
            const { sourceFile } = ctx;
            const figmaPropNameIdentifier = exp.arguments?.[0];
            (0, compiler_1.assertIsStringLiteral)(figmaPropNameIdentifier, sourceFile, `${name} takes at least one argument, which is the Figma property name`);
            const valueMapping = exp.arguments?.[1];
            (0, compiler_3.assertIsObjectLiteralExpression)(valueMapping, sourceFile, `${name} second argument should be an object literal, that maps Figma prop values to code`);
            return {
                kind: IntrinsicKind.Enum,
                args: {
                    figmaPropName: (0, compiler_1.stripQuotesFromNode)(figmaPropNameIdentifier),
                    valueMapping: parsePropsObject(valueMapping, ctx),
                },
            };
        },
    };
});
makeIntrinsic('string', (name) => {
    return {
        parse: (exp, ctx) => {
            const { sourceFile } = ctx;
            const figmaPropNameIdentifier = exp.arguments?.[0];
            (0, compiler_1.assertIsStringLiteral)(figmaPropNameIdentifier, sourceFile, `${name} takes at least one argument, which is the Figma property name`);
            return {
                kind: IntrinsicKind.String,
                args: {
                    figmaPropName: (0, compiler_1.stripQuotesFromNode)(figmaPropNameIdentifier),
                },
            };
        },
    };
});
makeIntrinsic('instance', (name) => {
    return {
        parse: (exp, ctx) => {
            const { sourceFile } = ctx;
            const figmaPropNameIdentifier = exp.arguments?.[0];
            (0, compiler_1.assertIsStringLiteral)(figmaPropNameIdentifier, sourceFile, `${name} takes at least one argument, which is the Figma property name`);
            return {
                kind: IntrinsicKind.Instance,
                args: {
                    figmaPropName: (0, compiler_1.stripQuotesFromNode)(figmaPropNameIdentifier),
                },
            };
        },
    };
});
makeIntrinsic('children', (name) => {
    return {
        parse: (exp, ctx) => {
            const { sourceFile } = ctx;
            const layerName = exp.arguments?.[0];
            const layers = [];
            if (ts.isStringLiteral(layerName)) {
                layers.push((0, compiler_1.stripQuotesFromNode)(layerName));
            }
            else if (ts.isArrayLiteralExpression(layerName) && layerName.elements.length > 0) {
                layerName.elements.forEach((el) => {
                    (0, compiler_1.assertIsStringLiteral)(el, sourceFile);
                    const name = (0, compiler_1.stripQuotesFromNode)(el);
                    if (name.includes('*')) {
                        throw new parser_common_1.ParserError(`Wildcards can not be used with an array of strings. Use a single string literal instead.`, {
                            node: layerName,
                            sourceFile,
                        });
                    }
                    layers.push((0, compiler_1.stripQuotesFromNode)(el));
                });
            }
            else {
                throw new parser_common_1.ParserError(`Invalid argument to ${name}, should be a string literal or an array of strings`, {
                    node: layerName,
                    sourceFile,
                });
            }
            return {
                kind: IntrinsicKind.Children,
                args: {
                    layers,
                },
            };
        },
    };
});
makeIntrinsic('nestedProps', (name) => {
    return {
        parse: (exp, ctx) => {
            const { sourceFile } = ctx;
            const layerName = exp.arguments?.[0];
            const mapping = exp.arguments?.[1];
            (0, compiler_1.assertIsStringLiteral)(layerName, sourceFile, `Invalid argument to ${name}, \`layerName\` should be a string literal`);
            (0, compiler_3.assertIsObjectLiteralExpression)(mapping, sourceFile, `Invalid argument to ${name}, \`props\` should be an object literal`);
            ts.forEachChild(mapping, (node) => {
                if (ts.isPropertyAssignment(node) &&
                    ts.isCallExpression(node.initializer) &&
                    node.initializer.getText().startsWith('figma.nestedProps')) {
                    throw new parser_common_1.ParserError(`nestedProps can not be nested inside another nestedProps call, instead, pass the deeply nested layer name at the top level`);
                }
            });
            return {
                kind: IntrinsicKind.NestedProps,
                args: {
                    layer: (0, compiler_1.stripQuotesFromNode)(layerName),
                    props: parsePropsObject(mapping, ctx),
                },
            };
        },
    };
});
makeIntrinsic('className', (name) => {
    return {
        parse: (exp, ctx) => {
            const { sourceFile } = ctx;
            const classNameArg = exp.arguments?.[0];
            const className = [];
            (0, compiler_1.assertIsArrayLiteralExpression)(classNameArg, sourceFile, `${name} takes an array of strings`);
            classNameArg.elements.forEach((el) => {
                if (ts.isStringLiteral(el)) {
                    className.push((0, compiler_1.stripQuotesFromNode)(el));
                }
                else if (ts.isCallExpression(el)) {
                    className.push(parseIntrinsic(el, ctx));
                }
            });
            return {
                kind: IntrinsicKind.ClassName,
                args: {
                    className,
                },
            };
        },
    };
});
makeIntrinsic('textContent', (name) => {
    return {
        parse: (exp, ctx) => {
            const { sourceFile } = ctx;
            const layerNameArg = exp.arguments?.[0];
            (0, compiler_1.assertIsStringLiteral)(layerNameArg, sourceFile, `${name} takes a single argument which is the Figma layer name`);
            return {
                kind: IntrinsicKind.TextContent,
                args: {
                    layer: (0, compiler_1.stripQuotesFromNode)(layerNameArg),
                },
            };
        },
    };
});
/**
 * Parses a call expression to an intrinsic
 *
 * @param exp Expression to parse
 * @param parserContext parser context
 * @returns
 */
function parseIntrinsic(exp, parserContext) {
    for (const key in Intrinsics) {
        if (Intrinsics[key].match(exp)) {
            // Chained call expressions in TS are nested with the innermost call expression
            // being the first in the chain. We need to reverse the chain so that the intrinsic
            // is the first element in the array. The TS AST looks like this for a().b():
            // CallExpression [a().b()] ->
            //   PropertyAccessExpression [a().b] ->
            //     CallExpression [a()]
            let callChain = [];
            let current = exp;
            while (current) {
                if (ts.isCallExpression(current)) {
                    callChain.push(current);
                    current = current.expression;
                }
                else if (ts.isPropertyAccessExpression(current)) {
                    current = current.expression;
                }
                else {
                    current = null;
                }
            }
            // If there's only one call expression just return the matching intrinsic
            callChain = callChain.reverse();
            if (callChain.length <= 1) {
                return Intrinsics[key].parse(exp, parserContext);
            }
            // The first call expression is the intrinsic itself, and any following call
            // expressions are modifiers
            const intrinsic = Intrinsics[key].parse(callChain.shift(), parserContext);
            const modifiers = callChain.map((modifier) => (0, modifiers_1.parseModifier)(modifier, parserContext));
            return {
                ...intrinsic,
                modifiers,
            };
        }
    }
    throw new parser_common_1.ParserError(`Unknown intrinsic: ${exp.getText()}`, {
        node: exp,
        sourceFile: parserContext.sourceFile,
    });
}
/**
 * Replace newlines in enum values with \\n so that we don't output
 * broken JS with newlines inside the string
 */
function replaceNewlines(str) {
    return str.toString().replaceAll('\n', '\\n').replaceAll("'", "\\'");
}
function valueToString(value, childLayer) {
    if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'undefined') {
        return `${value}`;
    }
    if (typeof value === 'string') {
        return `'${replaceNewlines(value)}'`;
    }
    if ('kind' in value) {
        // Mappings can be nested, e.g. an enum value can be figma.instance(...)
        return `${intrinsicToString(value, childLayer)}`;
    }
    // Convert objects to strings
    const str = typeof value.$value === 'string' ? value.$value : `${JSON.stringify(value.$value)}`;
    const v = replaceNewlines(str);
    switch (value.$type) {
        case 'function':
            return `_fcc_function('${v}')`;
        case 'identifier':
            return `_fcc_identifier('${v}')`;
        case 'object':
            // Don't pass the object itself wrapped in quotes - this helper needs to instantiate the actual
            // object, as it may be used in the snippet code
            return `_fcc_object(${v})`;
        case 'template-string':
            return `_fcc_templateString('${v}')`;
        case 'jsx-element':
            return `_fcc_jsxElement('${v}')`;
        case 'array':
            return `_fcc_array(${v})`;
        default:
            throw new parser_common_1.InternalError(`Unknown helper type: ${value}`);
    }
}
function valueMappingToString(valueMapping, childLayer) {
    // For enums (and booleans with a valueMapping provided), convert the
    // value mapping to an object.
    return ('{\n' +
        Object.entries(valueMapping)
            .map(([key, value]) => {
            return `"${key}": ${valueToString(value, childLayer)}`;
        })
            .join(',\n') +
        '}');
}
let nestedLayerCount = 0;
function intrinsicToString({ kind, args, modifiers = [] }, childLayer) {
    const selector = childLayer ?? `figma.currentLayer`;
    switch (kind) {
        case IntrinsicKind.String:
            return `${selector}.__properties__.string('${args.figmaPropName}')`;
        case IntrinsicKind.Instance: {
            // Outputs:
            // `const propName = figma.properties.string('propName')`, or
            // `const propName = figma.properties.boolean('propName')`, or
            // `const propName = figma.properties.instance('propName')`
            if (modifiers.length > 0) {
                const instance = `${selector}.__properties__.__instance__('${args.figmaPropName}')`;
                let body = `const instance = ${instance}\n`;
                body += `return instance && instance.type !== "ERROR" ? ${['instance', ...modifiers.map(modifiers_1.modifierToString)].join('.')} : instance`;
                return `(function () {${body}})()`;
            }
            return `${selector}.__properties__.instance('${args.figmaPropName}')`;
        }
        case IntrinsicKind.Boolean: {
            if (args.valueMapping) {
                const mappingString = valueMappingToString(args.valueMapping, childLayer);
                // Outputs: `const propName = figma.properties.boolean('propName', { ... mapping object from above ... })`
                return `${selector}.__properties__.boolean('${args.figmaPropName}', ${mappingString})`;
            }
            return `${selector}.__properties__.boolean('${args.figmaPropName}')`;
        }
        case IntrinsicKind.Enum: {
            const mappingString = valueMappingToString(args.valueMapping, childLayer);
            // Outputs: `const propName = figma.properties.enum('propName', { ... mapping object from above ... })`
            return `${selector}.__properties__.enum('${args.figmaPropName}', ${mappingString})`;
        }
        case IntrinsicKind.Children: {
            // Outputs: `const propName = figma.properties.children(["Layer 1", "Layer 2"])`
            return `${selector}.__properties__.children([${args.layers.map((layerName) => `"${layerName}"`).join(',')}])`;
        }
        case IntrinsicKind.ClassName: {
            // Outputs: `const propName = ['btn-base', figma.currentLayer.__properties__.enum('Size, { Large: 'btn-large' })].join(" ")`
            return `[${args.className.map((className) => (typeof className === 'string' ? `"${className}"` : `${intrinsicToString(className, childLayer)}`)).join(', ')}].filter(v => !!v).join(' ')`;
        }
        case IntrinsicKind.TextContent: {
            return `${selector}.__findChildWithCriteria__({ name: '${args.layer}', type: "TEXT" }).__render__()`;
        }
        case IntrinsicKind.NestedProps: {
            let body = '';
            // the actual layer name in figma could have a bunch of special characters in it,
            // and if we try to normalize it to a valid JS identifier, it could conflict with
            // other variables in the template code. So we generate a unique variable name
            // for each nested layer reference instead. The only reason it's wrapped in a funciton
            // currently is to keep the error checking out of global scope
            const nestedLayerRef = `nestedLayer${nestedLayerCount++}`;
            body += `const ${nestedLayerRef} = figma.currentLayer.__find__("${args.layer}")\n`;
            body += `return ${nestedLayerRef}.type === "ERROR" ? ${nestedLayerRef} : {
${Object.entries(args.props).map(([key, intrinsic]) => `${key}: ${intrinsicToString(intrinsic, nestedLayerRef)}\n`)}
        }\n`;
            return `(function () {${body}})()`;
        }
        default:
            throw new parser_common_1.InternalError(`Unknown intrinsic: ${kind}`);
    }
}
/**
 * Converts an expression to an FCC value, which is a wrapper around the actual value that
 * includes the type information. This is used to serialize the value to JSON and then
 * deserialize it back to the correct type in the generated code.
 *
 * @param valueNode
 * @param parserContext
 * @returns
 */
function expressionToFccEnumValue(valueNode, parserContext) {
    const { sourceFile, checker } = parserContext;
    if (ts.isParenthesizedExpression(valueNode)) {
        return expressionToFccEnumValue(valueNode.expression, parserContext);
    }
    if (ts.isJsxElement(valueNode) || ts.isJsxSelfClosingElement(valueNode)) {
        return (0, parser_template_helpers_1._fcc_jsxElement)(valueNode.getText());
    }
    if (ts.isArrowFunction(valueNode) || ts.isFunctionExpression(valueNode)) {
        return (0, parser_template_helpers_1._fcc_function)(valueNode.getText());
    }
    if (ts.isObjectLiteralExpression(valueNode)) {
        // should recursively convert to FCC
        return (0, parser_template_helpers_1._fcc_object)(parsePropsObject(valueNode, parserContext));
    }
    if (ts.isArrayLiteralExpression(valueNode)) {
        return (0, parser_template_helpers_1._fcc_array)((0, compiler_1.convertArrayLiteralToJs)(valueNode, sourceFile, checker, (valueNode) => {
            if (ts.isCallExpression(valueNode)) {
                return parseIntrinsic(valueNode, parserContext);
            }
            return expressionToFccEnumValue(valueNode, parserContext);
        }));
    }
    if (ts.isTemplateLiteral(valueNode)) {
        const str = valueNode.getText().replaceAll('`', '');
        return (0, parser_template_helpers_1._fcc_templateString)(str);
    }
    // Handles enums, for example `MyEnum.Value`
    if (ts.isPropertyAccessExpression(valueNode)) {
        return (0, parser_template_helpers_1._fcc_identifier)(valueNode.getText());
    }
    // Any other identifiers (except undefined) are treated as React components, for example `MyComponent`.
    // We don't support referencing other variables in props object so this should be fine.
    if (ts.isIdentifier(valueNode) && !(0, compiler_1.isUndefinedType)(valueNode, parserContext.checker)) {
        return (0, parser_template_helpers_1._fcc_identifier)(valueNode.getText());
    }
    // Fall back to the default conversion in `convertObjectLiteralToJs`
    return undefined;
}
/**
 * Parses the `props` field in a `figma.connect()` call, returning a mapping of
 * prop names to their respective intrinsic types
 *
 * @param objectLiteral An object literal expression
 * @param parserContext Parser context
 * @returns
 */
function parsePropsObject(objectLiteral, parserContext) {
    const { sourceFile, checker } = parserContext;
    return (0, compiler_2.convertObjectLiteralToJs)(objectLiteral, sourceFile, checker, (valueNode) => {
        if (ts.isCallExpression(valueNode)) {
            return parseIntrinsic(valueNode, parserContext);
        }
        return expressionToFccEnumValue(valueNode, parserContext);
    });
}
//# sourceMappingURL=intrinsics.js.map