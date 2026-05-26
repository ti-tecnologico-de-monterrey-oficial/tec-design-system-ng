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
exports.ModifierKind = void 0;
exports.parseModifier = parseModifier;
exports.modifierToString = modifierToString;
const ts = __importStar(require("typescript"));
const parser_common_1 = require("./parser_common");
const parser_1 = require("../react/parser");
var ModifierKind;
(function (ModifierKind) {
    ModifierKind["GetProps"] = "getProps";
    ModifierKind["Render"] = "render";
})(ModifierKind || (exports.ModifierKind = ModifierKind = {}));
const Modifiers = {
    ...getInstanceModifiers(),
};
function makeModifier(modifierName, modifier) {
    return {
        match: (exp) => {
            return (ts.isCallExpression(exp) &&
                ts.isPropertyAccessExpression(exp.expression) &&
                exp.expression.name.getText() === modifierName);
        },
        parse: modifier,
    };
}
function getInstanceModifiers() {
    return {
        getProps: makeModifier('getProps', () => {
            return {
                kind: ModifierKind.GetProps,
            };
        }),
        render: makeModifier('render', (exp, parserContext) => {
            const renderFunction = exp.arguments?.[0];
            if (renderFunction &&
                (ts.isArrowFunction(renderFunction) ||
                    ts.isFunctionExpression(renderFunction) ||
                    ts.isFunctionDeclaration(renderFunction)) &&
                (0, parser_1.findJSXElement)(renderFunction)) {
                const { code, imports, referencedProps } = (0, parser_1.parseRenderFunctionExpression)(renderFunction, parserContext);
                return {
                    kind: ModifierKind.Render,
                    args: {
                        renderFn: {
                            code,
                            imports,
                            referencedProps,
                        },
                    },
                };
            }
            else {
                throw new parser_common_1.ParserError('first argument to render() must be a render function that returns a single JSX element', {
                    node: exp,
                    sourceFile: parserContext.sourceFile,
                });
            }
        }),
    };
}
function parseModifier(exp, parserContext) {
    for (const key in Modifiers) {
        if (Modifiers[key].match(exp)) {
            return Modifiers[key].parse(exp, parserContext);
        }
    }
    throw new parser_common_1.ParserError(`Unknown modifier: ${exp.getText()}`, {
        node: exp,
        sourceFile: parserContext.sourceFile,
    });
}
function modifierToString(modifier) {
    switch (modifier.kind) {
        case ModifierKind.GetProps: {
            return '__getProps__()';
        }
        case ModifierKind.Render: {
            const { code, referencedProps } = modifier.args.renderFn;
            return `__renderWithFn__(({${Array.from(referencedProps).join(',')}}) => ${code})`;
        }
        default:
            throw new Error('Unknown modifier');
    }
}
//# sourceMappingURL=modifiers.js.map