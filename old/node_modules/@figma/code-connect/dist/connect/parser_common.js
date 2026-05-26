"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.ParserError = void 0;
exports.getPositionInSourceFile = getPositionInSourceFile;
exports.makeCreatePropPlaceholder = makeCreatePropPlaceholder;
exports.visitPropReferencingNode = visitPropReferencingNode;
exports.getReferencedPropsForTemplate = getReferencedPropsForTemplate;
exports.isFigmaConnectFile = isFigmaConnectFile;
exports.isFigmaConnectCall = isFigmaConnectCall;
exports.findDescendants = findDescendants;
exports.parseLinks = parseLinks;
exports.parseVariant = parseVariant;
exports.parseImports = parseImports;
exports.parseCodeConnect = parseCodeConnect;
const typescript_1 = __importDefault(require("typescript"));
const intrinsics_1 = require("./intrinsics");
const logging_1 = require("../common/logging");
const console_1 = require("console");
const compiler_1 = require("../typescript/compiler");
function getPositionInSourceFile(node, sourceFile) {
    return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
}
class ParserError extends Error {
    constructor(message, context) {
        super(message);
        this.name = 'ParserError';
        this.sourceFileName = context?.sourceFile.fileName || '';
        this.sourceFilePosition =
            context && context.node
                ? getPositionInSourceFile(context.node, context.sourceFile) || null
                : null;
    }
    toString() {
        let msg = `${(0, logging_1.highlight)((0, console_1.error)(this.name))}: ${this.message}\n`;
        if (this.sourceFileName && this.sourceFilePosition) {
            msg += ` -> ${(0, logging_1.reset)(this.sourceFileName)}:${this.sourceFilePosition.line}:${this.sourceFilePosition.character}\n`;
        }
        return msg;
    }
    toDebugString() {
        return this.toString() + `\n ${this.stack}`;
    }
}
exports.ParserError = ParserError;
class InternalError extends ParserError {
    constructor(message) {
        super(message);
        this.name = 'InternalError';
    }
}
exports.InternalError = InternalError;
/**
 * Factory to create a function that is used to create `__PROP__(propName)`
 * function nodes, which are used to replace prop references and ultimately
 * replaced.
 *
 * @returns Function to create `__PROP__(propName)` function nodes
 */
function makeCreatePropPlaceholder({ propMappings, referencedProps, sourceFile, }) {
    return function ({ name, node, wrapInJsxExpression = false, }) {
        let propReferenceName = name;
        // for nested prop references like `nested.prop`, we only want to look for
        // the prop mapping of `nested`, but include the full `nested.prop` in the
        // __PROP__ call
        if (name.includes('.')) {
            propReferenceName = name.split('.')[0];
        }
        // if prop mappings exist, check that the prop reference is in the mappings
        if (propMappings) {
            const mappedProp = propMappings[propReferenceName];
            if (!mappedProp) {
                throw new ParserError(`Could not find prop mapping for ${propReferenceName} in the props object`, {
                    sourceFile,
                    node,
                });
            }
        }
        referencedProps.add(propReferenceName);
        const callExpression = typescript_1.default.factory.createCallExpression(typescript_1.default.factory.createIdentifier('__PROP__'), undefined, [typescript_1.default.factory.createStringLiteral(name)]);
        if (wrapInJsxExpression) {
            return typescript_1.default.factory.createJsxExpression(undefined, callExpression);
        }
        else {
            return callExpression;
        }
    };
}
/**
 * TS AST visitor function for use with example functions, which replaces
 * references to the `props` argument in various forms in the example code with
 * `__PROP__(propName)` placeholders (created with a createPropPlaceholder
 * function).
 *
 * This is called when transforming the TS AST, and allows us to normalise the
 * different forms of supported prop references into a single representation,
 * which we can then handle consistently (currently we replace the placeholders,
 * using a regex).
 *
 * @returns Placeholder node, or undefined if the node is not a supported prop
 * reference (which results in no transformation)
 */
function visitPropReferencingNode({ propsParameter, node, createPropPlaceholder, useJsx, }) {
    // `props.` notation
    if (typescript_1.default.isIdentifier(propsParameter.name) &&
        typescript_1.default.isPropertyAccessExpression(node) &&
        node.expression.getText().startsWith(propsParameter.name.getText())) {
        // nested notation e.g `props.nested.prop`
        if (typescript_1.default.isPropertyAccessExpression(node.expression)) {
            const name = `${node.expression.name.getText()}.${node.name.getText()}`;
            return createPropPlaceholder({ name, node });
        }
        const name = node.name.getText();
        return createPropPlaceholder({ name, node });
    }
    // `props[""]` notation
    if (typescript_1.default.isIdentifier(propsParameter.name) &&
        typescript_1.default.isElementAccessExpression(node) &&
        node.expression.getText().startsWith(propsParameter.name.getText()) &&
        typescript_1.default.isStringLiteral(node.argumentExpression)) {
        const name = (0, compiler_1.stripQuotesFromNode)(node.argumentExpression);
        return createPropPlaceholder({ name, node });
    }
    // object destructuring references
    if (typescript_1.default.isObjectBindingPattern(propsParameter.name)) {
        const isValidNode = useJsx
            ? typescript_1.default.isJsxExpression(node)
            : typescript_1.default.isPropertyAccessExpression(node) || typescript_1.default.isIdentifier(node);
        const target = useJsx ? node.expression : node;
        if (isValidNode &&
            target &&
            propsParameter.name.elements.find((el) => target?.getText().startsWith(el.name.getText()))) {
            const name = target.getText();
            return createPropPlaceholder({ name, node, wrapInJsxExpression: useJsx });
        }
    }
    return undefined;
}
/**
 * Get template code to create variables referencing the props in the prop
 * mappings. This converts the prop mappings into JS calls like `const propName
 * = figma.properties.string('Prop Name')`, which can then be prepended to the
 * template code.
 *
 * @returns Template code string
 */
function getReferencedPropsForTemplate({ propMappings = {}, }) {
    let templateCode = '';
    if (Object.keys(propMappings).length > 0) {
        for (const prop in propMappings) {
            const propMapping = propMappings[prop];
            templateCode += `const ${prop} = ${(0, intrinsics_1.valueToString)(propMapping)}\n`;
        }
        templateCode += `const __props = {}\n`;
        Object.keys(propMappings).forEach((prop) => {
            // If trying to render prop resulted in an error (e.g. layer was not found
            // because it was invisible), don't include it in the __props object as
            // this will result in a runtime error.
            //
            // TODO Note that this can also happen if there is a typo in the prop name
            // of a nested prop, because we don't validate these at publish time,
            // which would be confusing. Perhaps we should have a way to show a
            // warning but not an error to the user.
            templateCode += `if (${prop} && ${prop}.type !== 'ERROR') {
  __props["${prop}"] = ${prop}
}\n`;
        });
        templateCode += `\n`;
    }
    return templateCode;
}
/**
 * Checks if a file contains Code Connect by looking for the `figma.connect()` function call
 */
function isFigmaConnectFile(program, file, extension) {
    const allowedExtensions = Array.isArray(extension) ? extension : [extension];
    const fileExtension = file.split('.').pop();
    // If the file has no extension, we can't determine if it's a Code Connect file
    if (!fileExtension) {
        return false;
    }
    // If the file extension is not in the list of supported extensions, it's not a Code Connect file
    if (!allowedExtensions.includes(fileExtension)) {
        return false;
    }
    const sourceFile = program.getSourceFile(file);
    if (!sourceFile) {
        throw new InternalError(`Could not find source file for ${file}`);
    }
    return (findDescendants(sourceFile, (node) => {
        if (isFigmaConnectCall(node, sourceFile)) {
            return true;
        }
        return false;
    }).length > 0);
}
/**
 * Checks if an AST node is a `figma.connect()` call
 *
 * @param node AST node
 * @param sourceFile Source file
 * @returns True if the node is a `figma.connect()` call
 */
function isFigmaConnectCall(node, sourceFile) {
    return (typescript_1.default.isCallExpression(node) && node.expression.getText(sourceFile).includes(intrinsics_1.FIGMA_CONNECT_CALL));
}
function findDescendants(node, cb) {
    const matches = [];
    function visit(node) {
        if (cb(node)) {
            matches.push(node);
        }
        typescript_1.default.forEachChild(node, visit);
    }
    visit(node);
    return matches;
}
/**
 * Parses the `links` field of a `figma.connect()` call
 *
 * @param linksArray an ArrayLiteralExpression
 * @param parserContext Parser context
 * @returns An array of link objects
 */
function parseLinks(linksArray, parserContext) {
    const { sourceFile } = parserContext;
    const links = [];
    for (const element of linksArray.elements) {
        (0, compiler_1.assertIsObjectLiteralExpression)(element, sourceFile, `'links' must be an array literal with objects of the format { name: string, url: string }`);
        const name = (0, compiler_1.parsePropertyOfType)({
            objectLiteralNode: element,
            propertyName: 'name',
            predicate: typescript_1.default.isStringLiteral,
            parserContext,
            required: true,
            errorMessage: "The 'name' property must be a string literal",
        });
        const url = (0, compiler_1.parsePropertyOfType)({
            objectLiteralNode: element,
            propertyName: 'url',
            predicate: typescript_1.default.isStringLiteral,
            parserContext,
            required: true,
            errorMessage: "The 'url' property must be a string literal",
        });
        if (name && url) {
            links.push({ name: (0, compiler_1.stripQuotesFromNode)(name), url: (0, compiler_1.stripQuotesFromNode)(url) });
        }
    }
    return links;
}
function parseVariant(variantMap, sourceFile, checker) {
    return (0, compiler_1.convertObjectLiteralToJs)(variantMap, sourceFile, checker, (valueNode) => {
        if (!typescript_1.default.isObjectLiteralElement(valueNode) &&
            !typescript_1.default.isStringLiteral(valueNode) &&
            !typescript_1.default.isNumericLiteral(valueNode) &&
            valueNode.kind !== typescript_1.default.SyntaxKind.TrueKeyword &&
            valueNode.kind !== typescript_1.default.SyntaxKind.FalseKeyword) {
            throw new ParserError(`Invalid value for variant, got: ${valueNode.getText()}`, {
                node: valueNode,
                sourceFile,
            });
        }
    });
}
/**
 * Parses the `imports` field of a `figma.connect()` call
 *
 * @param importsArray an ArrayLiteralExpression
 * @param parserContext Parser context
 * @returns An array of link objects
 */
function parseImports(importsArray, parserContext) {
    const { sourceFile } = parserContext;
    const imports = [];
    for (const element of importsArray.elements) {
        (0, compiler_1.assertIsStringLiteral)(element, sourceFile, `'imports' must be an array literal with strings`);
        imports.push((0, compiler_1.stripQuotesFromNode)(element));
    }
    return imports;
}
async function parseCodeConnect({ program, file, config, absPath, parseFn, resolveImportsFn, parseOptions = {}, }) {
    const sourceFile = program.getSourceFile(file);
    if (!sourceFile) {
        throw new InternalError(`Could not find source file for ${file}`);
    }
    const parserContext = {
        checker: program.getTypeChecker(),
        sourceFile,
        resolvedImports: resolveImportsFn ? resolveImportsFn(program, sourceFile) : {},
        config,
        absPath,
    };
    const codeConnectObjects = [];
    const nodes = [parserContext.sourceFile];
    while (nodes.length > 0) {
        const node = nodes.shift();
        if (isFigmaConnectCall(node, parserContext.sourceFile)) {
            const doc = await parseFn(node, parserContext, parseOptions);
            if (doc) {
                codeConnectObjects.push(doc);
            }
        }
        nodes.push(...node.getChildren(parserContext.sourceFile));
    }
    if (codeConnectObjects.length === 0) {
        throw new ParserError(`Didn't find any calls to figma.connect()`, {
            sourceFile: parserContext.sourceFile,
            node: parserContext.sourceFile,
        });
    }
    return codeConnectObjects;
}
//# sourceMappingURL=parser_common.js.map