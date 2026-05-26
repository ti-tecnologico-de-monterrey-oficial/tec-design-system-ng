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
exports.getDefaultExport = getDefaultExport;
exports.bfsFindNode = bfsFindNode;
exports.parsePropertyOfType = parsePropertyOfType;
exports.isOneOf = isOneOf;
exports.parseFunctionArgument = parseFunctionArgument;
exports.assertIsPropertyAssignment = assertIsPropertyAssignment;
exports.assertIsStringLiteral = assertIsStringLiteral;
exports.assertIsArrayLiteralExpression = assertIsArrayLiteralExpression;
exports.assertIsObjectLiteralExpression = assertIsObjectLiteralExpression;
exports.assertIsIdentifier = assertIsIdentifier;
exports.convertObjectLiteralToJs = convertObjectLiteralToJs;
exports.convertArrayLiteralToJs = convertArrayLiteralToJs;
exports.getTagName = getTagName;
exports.stripQuotesFromNode = stripQuotesFromNode;
exports.isUndefinedType = isUndefinedType;
const typescript_1 = __importStar(require("typescript"));
const parser_common_1 = require("../connect/parser_common");
/**
 * Get the default export from a TypeScript source file
 *
 * @param sourceFile TypeScript source file
 * @returns The default export Expression, or undefined if there is no default export
 */
function getDefaultExport(sourceFile) {
    for (const statement of sourceFile.statements) {
        if (typescript_1.default.isExportAssignment(statement) && typescript_1.default.isIdentifier(statement.expression)) {
            // The default export is a reference to another variable
            const identifierName = statement.expression.text;
            // Find the variable declaration that matches the identifier
            for (const stmt of sourceFile.statements) {
                if (typescript_1.default.isVariableStatement(stmt)) {
                    for (const declaration of stmt.declarationList.declarations) {
                        if (typescript_1.default.isIdentifier(declaration.name) && declaration.name.text === identifierName) {
                            // Return the initializer of the variable declaration
                            return declaration.initializer;
                        }
                    }
                }
            }
        }
        else if (typescript_1.default.isExportAssignment(statement)) {
            // The default export is not a reference to another variable
            return statement.expression;
        }
    }
}
/**
 * Perform a breadth-first search to find the first node matching a predicate
 *
 * @param node Node to start the search from
 * @param tsSourceFile SourceFile associated with the node
 * @param predicate Predicate to match
 * @returns The first node matching the predicate, or undefined if no node is found
 */
function bfsFindNode(node, tsSourceFile, predicate) {
    const queue = [node];
    while (queue.length > 0) {
        node = queue.shift();
        if (predicate(node)) {
            return node;
        }
        if (node && node.getChildCount(tsSourceFile) > 0) {
            queue.push(...node.getChildren(tsSourceFile));
        }
    }
}
function parsePropertyOfType({ objectLiteralNode, propertyName, predicate, parserContext, required = false, errorMessage, }) {
    const { sourceFile, checker } = parserContext;
    const node = objectLiteralNode.properties.find((property) => property.name?.getText() === propertyName);
    if (!node) {
        if (!required) {
            return undefined;
        }
        else {
            throw new parser_common_1.ParserError(errorMessage ?? `Expected property '${propertyName}' to be present`, {
                sourceFile,
                node: objectLiteralNode,
            });
        }
    }
    let initializer;
    if (typescript_1.default.isPropertyAssignment(node)) {
        if (typescript_1.default.isIdentifier(node.initializer)) {
            const symbol = checker.getSymbolAtLocation(node.initializer);
            if (symbol) {
                const decl = symbol.valueDeclaration;
                if (decl && typescript_1.default.isVariableDeclaration(decl) && decl.initializer) {
                    initializer = decl.initializer;
                }
            }
        }
        else {
            initializer = node.initializer;
        }
    }
    if (typescript_1.default.isShorthandPropertyAssignment(node)) {
        const symbol = checker.getShorthandAssignmentValueSymbol(node);
        if (!symbol || !symbol.valueDeclaration || !typescript_1.default.isVariableDeclaration(symbol.valueDeclaration)) {
            throw new parser_common_1.ParserError('Expected shorthand property to be declared in the same file', {
                sourceFile,
                node,
            });
        }
        initializer = symbol.valueDeclaration.initializer;
    }
    if (!initializer) {
        throw new parser_common_1.ParserError(`Expected property ${propertyName} to be a property assignment`, {
            sourceFile,
            node,
        });
    }
    // Unwrap `as Type` or `satisfies Type` expressions
    if (typescript_1.default.isAsExpression(initializer) || typescript_1.default.isSatisfiesExpression(initializer)) {
        initializer = initializer.expression;
    }
    if (!predicate(initializer)) {
        throw new parser_common_1.ParserError(errorMessage ??
            `Unexpected shape of property ${propertyName}, got node type: ${typescript_1.default.SyntaxKind[initializer.kind]}`, {
            sourceFile,
            node: initializer,
        });
    }
    return initializer;
}
function isOneOf(guards) {
    return function (arg) {
        return guards.some(function (predicate) {
            return predicate(arg);
        });
    };
}
/**
 * Gets a function argument with the specified index from a call expression node
 *
 * @param fn The call expression node potentially containing the argument
 * @param parserContext The parser context
 * @param index The index of the argument to get
 * @param predicate Predicate to match
 * @param required Whether the argument is required. Defaults to false.
 * @param errorMessage Optional error message to throw if the argument is not found
 * @returns
 */
function parseFunctionArgument(fn, parserContext, index, predicate, required = false, errorMessage) {
    const { sourceFile } = parserContext;
    if (fn.arguments.length <= index && !required) {
        return undefined;
    }
    if (fn.arguments.length <= index) {
        throw new parser_common_1.ParserError(errorMessage ?? `Expected function to have at least ${index + 1} arguments`, {
            sourceFile,
            node: fn,
        });
    }
    const arg = fn.arguments[index];
    if (!arg || !predicate(arg)) {
        throw new parser_common_1.ParserError(errorMessage ?? `Unexpected shape of argument ${index}`, {
            sourceFile,
            node: fn.arguments[index],
        });
    }
    return arg;
}
function assertIsPropertyAssignment(node, sourceFile) {
    if (!typescript_1.default.isPropertyAssignment(node)) {
        throw new parser_common_1.ParserError(`Expected a property assignment, got ${typescript_1.default.SyntaxKind[node.kind]}`, {
            node,
            sourceFile,
        });
    }
}
function assertIsStringLiteral(node, sourceFile, msg) {
    if (!typescript_1.default.isStringLiteral(node)) {
        throw new parser_common_1.ParserError(msg ?? `Expected a string literal, got ${typescript_1.default.SyntaxKind[node.kind]}`, {
            node,
            sourceFile,
        });
    }
}
function assertIsArrayLiteralExpression(node, sourceFile, msg) {
    if (!typescript_1.default.isArrayLiteralExpression(node)) {
        throw new parser_common_1.ParserError(msg ?? `Expected an array literal, got ${typescript_1.default.SyntaxKind[node.kind]}`, {
            node,
            sourceFile,
        });
    }
}
function assertIsObjectLiteralExpression(node, sourceFile, msg) {
    if (!typescript_1.default.isObjectLiteralExpression(node)) {
        throw new parser_common_1.ParserError(msg ?? `Expected an object literal, got ${typescript_1.default.SyntaxKind[node.kind]}`, {
            node,
            sourceFile,
        });
    }
}
function assertIsIdentifier(node, sourceFile, msg) {
    if (!typescript_1.default.isIdentifier(node)) {
        throw new parser_common_1.ParserError(msg ?? `Expected an identifier, got ${typescript_1.default.SyntaxKind[node.kind]}`, {
            node,
            sourceFile,
        });
    }
}
function convertValueNodeToJs(valueNode, sourceFile, checker, extraConversionFn) {
    if (typescript_1.default.isObjectLiteralExpression(valueNode)) {
        // A prop mapping to an object literal, which maps each figma value to a code value
        return convertObjectLiteralToJs(valueNode, sourceFile, checker, extraConversionFn);
    }
    else {
        // A prop mapping to anything else, which will be passed as a literal value
        if (typescript_1.default.isStringLiteral(valueNode)) {
            // Accessing `text` directly prevents the value being wrapped in quotes
            return valueNode.text;
        }
        else if (valueNode.kind === typescript_1.default.SyntaxKind.TrueKeyword) {
            return true;
        }
        else if (valueNode.kind === typescript_1.default.SyntaxKind.FalseKeyword) {
            return false;
            // undefined is not a keyword in TypeScript, but actually translates to an identifier
            // (even though confusingly ts.SyntaxKind.UndefinedKeyword exists)
        }
        else if (typescript_1.default.isIdentifier(valueNode) && valueNode.text === 'undefined') {
            return undefined;
        }
        else if (valueNode.kind === typescript_1.default.SyntaxKind.NullKeyword) {
            return null;
        }
        else if (valueNode.kind === typescript_1.default.SyntaxKind.NumericLiteral) {
            return parseFloat(valueNode.getText());
        }
        else if ((0, typescript_1.isTaggedTemplateExpression)(valueNode)) {
            // Return the content of the template string without the backticks
            return valueNode.template.getText().replace(/^`/, '').replace(/`$/, '');
        }
        else {
            return valueNode.getText();
        }
    }
}
/**
 * Convert an object literal node to a JavaScript object
 *
 * @param objectLiteral The object literal node to convert
 * @param sourceFile The source file containing the object literal
 * @param extraConversionFn Optional function to convert a node to a value. This
 * runs before the default conversion. If this returns undefined, the default
 * conversion will be used. (This does mean there's no way to return undefined)
 * @returns The JavaScript object version of the object literal
 */
function convertObjectLiteralToJs(objectLiteral, sourceFile, checker, extraConversionFn) {
    const obj = {};
    const properties = [...objectLiteral.properties];
    while (properties.length > 0) {
        const prop = properties.shift();
        // If the value is a spread assignment, we need to resolve the object it's spreading
        // and add its properties to the current object
        if (typescript_1.default.isSpreadAssignment(prop)) {
            const declaration = bfsFindNode(sourceFile, sourceFile, (node) => {
                return typescript_1.default.isVariableDeclaration(node) && node.name.getText() === prop.expression.getText();
            });
            if (!declaration.initializer || !typescript_1.default.isObjectLiteralExpression(declaration.initializer)) {
                throw new parser_common_1.ParserError('Expected spread object to be an object literal', {
                    sourceFile,
                    node: prop,
                });
            }
            for (const prop of declaration.initializer.properties) {
                properties.push(prop);
            }
            continue;
        }
        assertIsPropertyAssignment(prop, sourceFile);
        if (!typescript_1.default.isIdentifier(prop.name) && !typescript_1.default.isStringLiteral(prop.name)) {
            throw new parser_common_1.ParserError('Expected property key to be an identifier or String Literal', {
                sourceFile,
                node: prop,
            });
        }
        const key = prop.name.text;
        const valueNode = prop.initializer;
        const extraConversionResult = extraConversionFn && extraConversionFn(valueNode);
        if (extraConversionResult !== undefined) {
            obj[key] = extraConversionResult;
        }
        else {
            obj[key] = convertValueNodeToJs(valueNode, sourceFile, checker, extraConversionFn);
        }
    }
    return obj;
}
/**
 * Convert an Array literal node to a JavaScript array
 *
 * @param arrayLiteral The array literal node to convert
 * @param sourceFile The source file containing the array literal
 * @param extraConversionFn Optional function to convert a node to a value. This
 * runs before the default conversion. If this returns undefined, the default
 * conversion will be used. (This does mean there's no way to return undefined)
 * @returns The JavaScript object version of the object literal
 */
function convertArrayLiteralToJs(arrayLiteral, sourceFile, checker, extraConversionFn) {
    return arrayLiteral.elements.map((element) => {
        const extraConversionResult = extraConversionFn && extraConversionFn(element);
        if (extraConversionResult !== undefined) {
            return extraConversionResult;
        }
        else {
            return convertValueNodeToJs(element, sourceFile, checker, extraConversionFn);
        }
    });
}
function getTagName(element) {
    if (typescript_1.default.isJsxSelfClosingElement(element)) {
        return element.tagName.getText();
    }
    else {
        return element.openingElement.tagName.getText();
    }
}
function stripQuotesFromNode(node) {
    return stripQuotes(node.text);
}
function stripQuotes(text) {
    if (text.startsWith('"') || text.startsWith("'")) {
        return text.substring(1, text.length - 1);
    }
    return text;
}
function isUndefinedType(node, checker) {
    const type = checker.getTypeAtLocation(node);
    return (type.getFlags() & typescript_1.default.TypeFlags.Undefined) !== 0;
}
//# sourceMappingURL=compiler.js.map