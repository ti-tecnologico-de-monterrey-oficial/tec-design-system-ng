"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findJSXElement = findJSXElement;
exports.findAndResolveImports = findAndResolveImports;
exports.parseComponentMetadata = parseComponentMetadata;
exports.parseRenderFunctionExpression = parseRenderFunctionExpression;
exports.parseJSXRenderFunction = parseJSXRenderFunction;
exports.parseValueRenderFunction = parseValueRenderFunction;
exports.replacePropPlaceholders = replacePropPlaceholders;
exports.getDefaultTemplate = getDefaultTemplate;
exports.parseReactDoc = parseReactDoc;
const typescript_1 = __importDefault(require("typescript"));
const project_1 = require("../connect/project");
const logging_1 = require("../common/logging");
const compiler_1 = require("../typescript/compiler");
const intrinsics_1 = require("../connect/intrinsics");
const parser_template_helpers_1 = require("./parser_template_helpers");
const parser_common_1 = require("../connect/parser_common");
/**
 * Traverses the AST and returns the first JSX element it finds
 * @param node AST node
 * @returns
 */
function findJSXElement(node) {
    if (typescript_1.default.isJsxElement(node) || typescript_1.default.isJsxFragment(node) || typescript_1.default.isJsxSelfClosingElement(node)) {
        return node;
    }
    else {
        return typescript_1.default.forEachChild(node, findJSXElement);
    }
}
function findBlock(node) {
    if (typescript_1.default.isBlock(node)) {
        return node;
    }
    else {
        return typescript_1.default.forEachChild(node, findBlock);
    }
}
/**
 * Walks up the AST from an assignment to find the import declaration
 */
function findParentImportDeclaration(declaration) {
    let current = declaration;
    while (current) {
        if (typescript_1.default.isImportDeclaration(current)) {
            return current;
        }
        current = current.parent;
    }
}
function getImportsOfModule(sourceFile) {
    const imports = [];
    function visit(node) {
        if (typescript_1.default.isImportDeclaration(node)) {
            imports.push(node);
        }
        typescript_1.default.forEachChild(node, visit);
    }
    visit(sourceFile);
    return imports;
}
function resolveModuleSpecifier(program, sourceFile, importSpecifier) {
    const compilerHost = typescript_1.default.createCompilerHost(program.getCompilerOptions());
    const moduleResolutionHost = {
        fileExists: compilerHost.fileExists,
        readFile: compilerHost.readFile,
        directoryExists: compilerHost.directoryExists,
        getCurrentDirectory: compilerHost.getCurrentDirectory,
        getDirectories: compilerHost.getDirectories,
    };
    const resolvedModule = typescript_1.default.resolveModuleName(importSpecifier, sourceFile.fileName, program.getCompilerOptions(), moduleResolutionHost);
    return resolvedModule.resolvedModule?.resolvedFileName;
}
// Traverse the source file and resolve imports
function findAndResolveImports(program, sourceFile) {
    const importSpecifierToFilePath = {};
    typescript_1.default.forEachChild(sourceFile, (node) => {
        if (typescript_1.default.isImportDeclaration(node)) {
            const importSpecifier = node.moduleSpecifier.text;
            const resolvedFileName = resolveModuleSpecifier(program, sourceFile, importSpecifier);
            if (resolvedFileName) {
                importSpecifierToFilePath[importSpecifier] = resolvedFileName;
            }
        }
    });
    return importSpecifierToFilePath;
}
/**
 * Finds all import statements in a file that matches the given identifiers
 *
 * @param parserContext Parser context
 * @param identifiers List of identifiers to find imports for
 * @returns
 */
function getSourceFilesOfImportedIdentifiers(parserContext, _identifiers) {
    const { sourceFile, resolvedImports } = parserContext;
    const importDeclarations = getImportsOfModule(sourceFile);
    const imports = [];
    const identifiers = _identifiers.map((identifier) => identifier.split('.')[0]);
    for (const declaration of importDeclarations) {
        let statement = declaration.getText();
        // remove the quotation marks around the module specifier
        const moduleSpecifier = declaration.moduleSpecifier.getText().slice(1, -1);
        if (declaration.importClause) {
            // Default imports
            if (declaration.importClause.name) {
                const identifier = declaration.importClause.name.text;
                if (identifiers.includes(identifier)) {
                    imports.push({
                        statement,
                        file: resolvedImports[moduleSpecifier],
                    });
                }
            }
            if (declaration.importClause.namedBindings) {
                const namedBindings = declaration.importClause.namedBindings;
                if (typescript_1.default.isNamedImports(namedBindings)) {
                    // Named imports (import { x, y } from 'module')
                    // filter out any unused imports from the statement the identifier belongs to
                    const elements = namedBindings.elements
                        .map((specifier) => specifier.name.text)
                        .filter((name) => identifiers.includes(name));
                    if (elements.length > 0) {
                        imports.push({
                            statement: statement.replace(/{.*}/s, `{ ${elements.join(', ')} }`),
                            file: resolvedImports[moduleSpecifier],
                        });
                    }
                }
                else if (typescript_1.default.isNamespaceImport(namedBindings)) {
                    // Namespace import (import * as name from 'module')
                    const identifier = namedBindings.name.text;
                    if (identifiers.includes(identifier)) {
                        imports.push({
                            statement,
                            file: resolvedImports[moduleSpecifier],
                        });
                    }
                }
            }
        }
    }
    return imports;
}
/**
 * Extract metadata about the referenced React component. Used by both the
 * Code Connect and Storybook commands.
 *
 * @param parserContext Parser context
 * @param componentSymbol The ts.Symbol from the metadata referencing the
 * component being documented
 * @param node The node being parsed. Used for error logging.
 * @returns Metadata object
 */
async function parseComponentMetadata(node, parserContext, silent) {
    const { checker, sourceFile } = parserContext;
    let componentSymbol = checker.getSymbolAtLocation(node);
    let componentSourceFile = sourceFile;
    let component = '';
    let componentDeclaration;
    // Hacky fix for namespaced components, this probably doesn't work for storybook
    if (typescript_1.default.isPropertyAccessExpression(node)) {
        componentSymbol = checker.getSymbolAtLocation(node.expression);
        if (!componentSymbol) {
            throw new parser_common_1.ParserError(`Could not find symbol for component ${node.expression.getText()}`, {
                sourceFile,
                node,
            });
        }
    }
    // Component declared in a different file
    if (componentSymbol &&
        componentSymbol.declarations &&
        (typescript_1.default.isImportSpecifier(componentSymbol.declarations[0]) ||
            typescript_1.default.isImportClause(componentSymbol.declarations[0]))) {
        let importDeclaration = findParentImportDeclaration(componentSymbol.declarations[0]);
        if (!importDeclaration) {
            throw new parser_common_1.ParserError('No import statement found for component, make sure the component is imported', {
                sourceFile,
                node,
            });
        }
        // The component should be imported from another file, we need to follow the
        // aliased symbol to get the correct function definition
        if (componentSymbol.flags & typescript_1.default.SymbolFlags.Alias) {
            componentSymbol = checker.getAliasedSymbol(componentSymbol);
        }
        if (!componentSymbol || !componentSymbol.declarations) {
            if (!silent) {
                logging_1.logger.warn(`Import for ${node.getText()} could not be resolved, make sure that your \`include\` globs in \`figma.config.json\` matches the component source file (in addition to the Code Connect file). If you're using path aliases, make sure to include the same aliases in \`figma.config.json\` with the \`paths\` option.`);
            }
            return {
                source: '',
                line: 0,
                component: node.getText(),
            };
        }
        // If we haven't found the component declaration by now, it's likely because it's
        // assigned to an object/namespace, for example: `export const Button = { Primary: () => <button /> }`,
        // so we need to find the function declaration by traversing the AST in that file.
        if (!typescript_1.default.isFunctionDeclaration(componentSymbol.declarations[0])) {
            const sourceFile = componentSymbol.declarations[0].getSourceFile();
            (0, compiler_1.bfsFindNode)(sourceFile, sourceFile, (node) => {
                if ((typescript_1.default.isFunctionDeclaration(node) || typescript_1.default.isVariableDeclaration(node)) &&
                    node.name &&
                    componentSymbol?.name &&
                    node.name.getText() === componentSymbol.name) {
                    componentSymbol = checker.getSymbolAtLocation(node.name);
                    return true;
                }
                return false;
            });
        }
        componentDeclaration = componentSymbol.declarations[0];
        componentSourceFile = componentDeclaration.getSourceFile();
    }
    else {
        componentDeclaration = componentSymbol?.declarations?.[0];
    }
    const source = componentSourceFile.fileName;
    if (!source) {
        throw new parser_common_1.InternalError(`Could not find source file for component ${component} - is this file included in the directory passed to \`figma connect <dir>\`?`);
    }
    if (!componentDeclaration) {
        throw new parser_common_1.ParserError(`Could not find declaration for component ${component}`, {
            sourceFile,
            node,
        });
    }
    const line = (0, parser_common_1.getPositionInSourceFile)(componentDeclaration, componentSourceFile).line;
    if (line === undefined) {
        throw new parser_common_1.InternalError(`Could not determine line number for component ${componentDeclaration.getStart(sourceFile)}`);
    }
    return {
        source,
        line,
        component: node.getText(),
    };
}
/**
 * Parses a render function and ouputs a template string, extracting the code and
 * any import statements matching the JSX elements used in the function body
 *
 * @param exp A function or arrow function expression
 * @param parserContext Parser context
 * @param propMappings Prop mappings object as returned by parseProps
 *
 * @returns The code of the render function and a list of imports
 */
function parseRenderFunctionExpression(exp, parserContext, propMappings) {
    const { sourceFile } = parserContext;
    let renderFunctionCode;
    if (exp.parameters.length > 1) {
        throw new parser_common_1.ParserError(`Expected a single props parameter for the render function, got ${exp.parameters.length} parameters`, { sourceFile, node: exp });
    }
    const propsParameter = exp.parameters[0];
    // Keep track of any props which are referenced in the example
    const referencedProps = new Set();
    const createPropPlaceholder = (0, parser_common_1.makeCreatePropPlaceholder)({
        propMappings,
        referencedProps,
        sourceFile,
    });
    // Find all property access expressions in the function body and replace them
    // with a function call like `__PROP__("propName")`, so that we can easily
    // find them in the next step to convert them into
    // `${_fcc_renderReactProp(...)` in the template string.
    //
    // Doing it this way means we can normalize the different ways in which props
    // can be accessed using the compiler API, which is much easier than using a
    // regex, then in the next step we can use a simple regex to convert that into
    // the template string.
    if (propsParameter) {
        exp = typescript_1.default.transform(exp, [
            (context) => (rootNode) => {
                function visit(node) {
                    const visitResult = (0, parser_common_1.visitPropReferencingNode)({
                        propsParameter,
                        node,
                        createPropPlaceholder,
                        useJsx: true,
                    });
                    if (visitResult) {
                        return visitResult;
                    }
                    // object assignment using destructured reference, e.g `prop={{ key: value }}`
                    // (`{{ key: props.value }}` syntax will be captured by the `props.` notation branch above)
                    if (typescript_1.default.isObjectBindingPattern(propsParameter.name) &&
                        typescript_1.default.isPropertyAssignment(node) &&
                        typescript_1.default.isIdentifier(node.initializer) &&
                        propsParameter.name.elements.find((el) => node.initializer.getText().startsWith(el.name.getText()))) {
                        return typescript_1.default.factory.createPropertyAssignment(node.name, createPropPlaceholder({ name: node.initializer.getText(), node }));
                    }
                    // object assignment using destructured reference as a shorthand, e.g `prop={{ value }}`
                    if (typescript_1.default.isObjectBindingPattern(propsParameter.name) &&
                        typescript_1.default.isShorthandPropertyAssignment(node) &&
                        propsParameter.name.elements.find((el) => node.name.getText().startsWith(el.name.getText()))) {
                        return typescript_1.default.factory.createPropertyAssignment(node.name, createPropPlaceholder({ name: node.name.getText(), node }));
                    }
                    // Replaces {...props} with all the prop mapped props we know about,
                    // e.g. <Button {...props} /> becomes:
                    // <Button prop1={__PROP__("prop1")} prop2={__PROP__("prop2")} />.
                    if (typescript_1.default.isJsxSpreadAttribute(node) &&
                        typescript_1.default.isIdentifier(node.expression) &&
                        // example: (props) => (...)
                        (node.expression.getText() === propsParameter.name.getText() ||
                            // example: ({ prop1, prop2 ...props }) => (...)
                            (typescript_1.default.isObjectBindingPattern(propsParameter.name) &&
                                propsParameter.name.elements.find((el) => el.dotDotDotToken && el.name.getText() === node.expression?.getText())))) {
                        // if we have an object binding pattern ({ prop1, prop2 ...props }),
                        // exclude the props that are already destructured (prop1, prop2)
                        const propsToExclude = typescript_1.default.isObjectBindingPattern(propsParameter.name)
                            ? propsParameter.name.elements
                                .filter((el) => !el.dotDotDotToken)
                                .map((el) => el.name.getText())
                            : [];
                        const props = propMappings
                            ? Object.keys(propMappings)
                                .filter((prop) => !propsToExclude.includes(prop))
                                .map((prop) => {
                                return typescript_1.default.factory.createJsxAttribute(typescript_1.default.factory.createIdentifier(prop), createPropPlaceholder({
                                    name: prop,
                                    node,
                                    wrapInJsxExpression: true,
                                }));
                            })
                            : [];
                        if (propMappings) {
                            for (const key of Object.keys(propMappings)) {
                                referencedProps.add(key);
                            }
                        }
                        return props;
                    }
                    return typescript_1.default.visitEachChild(node, visit, context);
                }
                return typescript_1.default.visitNode(rootNode, visit);
            },
        ]).transformed[0];
    }
    const printer = typescript_1.default.createPrinter();
    const block = findBlock(exp);
    let nestable = false;
    let jsx = findJSXElement(exp);
    if (jsx && (!block || (block && block.statements.length <= 1))) {
        // The function body is a single JSX element
        renderFunctionCode = printer.printNode(typescript_1.default.EmitHint.Unspecified, jsx, sourceFile);
        nestable = true;
    }
    else if (block) {
        // The function body has more stuff in it, so we wrap the body in a function
        // expression. Why not just print the exact function passed to `render`?
        // Because the parameters to that function are not actually referenced in
        // the rendered code snippet in Figma - they're mapped to values on the
        // Figma instance.
        const functionName = 'Example';
        const functionExpression = typescript_1.default.factory.createFunctionExpression(undefined, undefined, typescript_1.default.factory.createIdentifier(functionName), [], undefined, undefined, block);
        const printer = typescript_1.default.createPrinter();
        renderFunctionCode = printer.printNode(typescript_1.default.EmitHint.Unspecified, functionExpression, sourceFile);
    }
    else {
        throw new parser_common_1.ParserError(`Expected a single JSX element or a block statement in the render function, got ${exp.getText()}`, { sourceFile, node: exp });
    }
    renderFunctionCode = replacePropPlaceholders(renderFunctionCode);
    // Escape backticks from the example code, as otherwise those would terminate the `figma.tsx` template literal
    renderFunctionCode = renderFunctionCode.replace(/`/g, '\\`');
    // Finally, output the render function as a figma.tsx call
    const figmaTsxCall = `figma.tsx\`${renderFunctionCode}\``;
    // Find all JSX elements in the function body and extract their import
    // statements
    const jsxTags = (0, parser_common_1.findDescendants)(exp, (element) => typescript_1.default.isJsxElement(element) || typescript_1.default.isJsxSelfClosingElement(element));
    const imports = getSourceFilesOfImportedIdentifiers(parserContext, jsxTags.map(compiler_1.getTagName));
    return {
        code: figmaTsxCall,
        imports,
        nestable,
        referencedProps,
    };
}
/**
 * Parses the render function passed to `figma.connect()`, extracting the code and
 * any import statements matching the JSX elements used in the function body
 *
 * @param exp A function or arrow function expression
 * @param parserContext Parser context
 * @param propMappings Prop mappings object as returned by parseProps
 *
 * @returns The code of the render function and a list of imports
 */
function parseJSXRenderFunction(exp, parserContext, propMappings) {
    const { sourceFile } = parserContext;
    const { code, imports, nestable, referencedProps } = parseRenderFunctionExpression(exp, parserContext, propMappings);
    let templateCode = '';
    // Generate the template code
    // Inject React-specific template helper functions
    templateCode = (0, parser_template_helpers_1.getParsedTemplateHelpersString)() + '\n\n';
    // Require the template API
    templateCode += `const figma = require('figma')\n\n`;
    // Then we output `const propName = figma.properties.<kind>('propName')` calls
    // for each referenced prop, so these are accessible to the template code.
    templateCode += (0, parser_common_1.getReferencedPropsForTemplate)({
        propMappings,
        exp,
        sourceFile,
    });
    const includeMetadata = propMappings && Object.keys(propMappings).length > 0;
    // Finally, output the example code
    templateCode += includeMetadata
        ? `export default { ...${code}, metadata: { __props } }\n`
        : `export default ${code}\n`;
    return {
        code: templateCode,
        imports,
        nestable,
    };
}
/**
 * Parses the render function for a value (i.e. example which returns a string or React
 * component reference, not JSX) passed to `figma.connect()`
 */
function parseValueRenderFunction(exp, parserContext, propMappings) {
    const { sourceFile } = parserContext;
    const printer = typescript_1.default.createPrinter();
    if (!exp.body) {
        throw new parser_common_1.ParserError('Expected a function body', {
            sourceFile: parserContext.sourceFile,
            node: exp,
        });
    }
    let exampleCode = printer.printNode(typescript_1.default.EmitHint.Unspecified, exp.body, sourceFile);
    const nestable = true;
    let templateCode = '';
    // Generate the template code
    // Inject React-specific template helper functions
    templateCode = (0, parser_template_helpers_1.getParsedTemplateHelpersString)() + '\n\n';
    // Require the template API
    templateCode += `const figma = require('figma')\n\n`;
    // Then we output `const propName = figma.properties.<kind>('propName')` calls
    // for each referenced prop, so these are accessible to the template code.
    templateCode += (0, parser_common_1.getReferencedPropsForTemplate)({
        propMappings,
        exp,
        sourceFile,
    });
    // Escape backticks from the example code
    exampleCode = exampleCode.replace(/`/g, '\\`');
    let imports = [];
    const includeMetadata = propMappings && Object.keys(propMappings).length > 0;
    if (typescript_1.default.isStringLiteral(exp.body)) {
        // The value is a string, which is already wrapped in quotes
        templateCode += includeMetadata
            ? `export default { ...figma.value(${exampleCode}), metadata: { __props } }\n`
            : `export default figma.value(${exampleCode})\n`;
    }
    else if (typescript_1.default.isIdentifier(exp.body)) {
        // The value is an identifier, i.e. a React component reference
        const value = `_fcc_reactComponent("${exp.body.getText()}")`;
        const preview = `_fcc_renderPropValue(${value})`;
        templateCode += includeMetadata
            ? `export default { ...figma.value(${value}, ${preview}), metadata: { __props } }\n`
            : `export default figma.value(${value}, ${preview})\n`;
        imports = getSourceFilesOfImportedIdentifiers(parserContext, [exp.body.getText()]);
    }
    return {
        code: templateCode,
        imports,
        nestable,
    };
}
function replacePropPlaceholders(exampleCode) {
    // Replace React prop placeholders we inserted above (like
    // `reactPropName={__PROP__("figmaPropName")}`) with calls to
    // _fcc_renderReactProp, which renders them correctly (see
    // parser_template_helpers.ts)
    exampleCode = exampleCode.replace(
    // match " reactPropName={__PROP__("figmaPropName")}" and extract the names
    // We allow hyphens in prop names (unlike React) to support rendering HTML attributes
    / ([A-Za-z0-9\-]+)=\{__PROP__\("([A-Za-z0-9_\.]+)"\)\}/g, (_match, reactPropName, figmaPropName) => {
        return `\${_fcc_renderReactProp('${reactPropName}', ${figmaPropName})}`;
    });
    // Replace React children placeholders like `${__PROP__("propName")}` with
    // calls to _fcc_renderReactChildren, which renders them correctly (see
    // parser_template_helpers.ts)
    exampleCode = exampleCode.replace(/\{__PROP__\("([A-Za-z0-9_\.]+)"\)\}/g, (_match, figmaPropName) => {
        return `\${_fcc_renderReactChildren(${figmaPropName})}`;
    });
    // Assume any remaining placeholders are values, e.g.
    // - { prop: __PROP__("propName") }
    // - useState(__PROP__("propName"))
    // These never need special treatment based on their type.
    return exampleCode.replace(/__PROP__\("([A-Za-z0-9_\.]+)"\)/g, (_match, figmaPropName) => {
        return `\${_fcc_renderPropValue(${figmaPropName})}`;
    });
}
function followIdentifierToStringLiteralDeclaration(node, parserContext, errMessage) {
    const { checker } = parserContext;
    let result = node;
    if (node && typescript_1.default.isIdentifier(node)) {
        const symbol = checker.getSymbolAtLocation(node);
        if (symbol) {
            const decl = symbol.valueDeclaration;
            if (decl &&
                typescript_1.default.isVariableDeclaration(decl) &&
                decl.initializer &&
                typescript_1.default.isStringLiteral(decl.initializer)) {
                result = decl.initializer;
            }
        }
    }
    // If we followed the identifier to its declaration and it's not a string literal,
    // throw an error
    if (!result || !typescript_1.default.isStringLiteral(result)) {
        throw new parser_common_1.ParserError(errMessage, {
            node: result,
            sourceFile: parserContext.sourceFile,
        });
    }
    return result;
}
function parseFigmaConnectArgs(node, parserContext) {
    const required = true;
    const first = (0, compiler_1.parseFunctionArgument)(node, parserContext, 0, (0, compiler_1.isOneOf)([typescript_1.default.isIdentifier, typescript_1.default.isPropertyAccessExpression, typescript_1.default.isStringLiteral]), required, `\`${intrinsics_1.FIGMA_CONNECT_CALL}\` must be called with a reference to a Component or a Figma Component URL as the first argument. Example usage:
  \`${intrinsics_1.FIGMA_CONNECT_CALL}(Button, 'https://www.figma.com/file/123?node-id=1-1')\``);
    let figmaNodeUrlArg;
    let componentArg;
    let configObjArgIndex;
    // This function has two signatures. If the first arg is a string literal, it's the Figma node URL, and
    // it won't have a component reference.
    if (typescript_1.default.isStringLiteral(first)) {
        figmaNodeUrlArg = first;
        componentArg = undefined;
        configObjArgIndex = 1;
    }
    else {
        // If the first argument is not a string literal, it must be a component reference,
        // and the second argument must be the Figma node URL
        componentArg = first;
        configObjArgIndex = 2;
        const invalidTypeErrorMsg = `The second argument to ${intrinsics_1.FIGMA_CONNECT_CALL}() must be a string literal (the URL of the Figma node). Example usage:
    \`${intrinsics_1.FIGMA_CONNECT_CALL}(Button, 'https://www.figma.com/file/123?node-id=1-1')\``;
        let arg = (0, compiler_1.parseFunctionArgument)(node, parserContext, 1, (0, compiler_1.isOneOf)([typescript_1.default.isIdentifier, typescript_1.default.isStringLiteral]), required, invalidTypeErrorMsg);
        figmaNodeUrlArg = followIdentifierToStringLiteralDeclaration(arg, parserContext, invalidTypeErrorMsg);
    }
    const configObjArg = (0, compiler_1.parseFunctionArgument)(node, parserContext, configObjArgIndex, typescript_1.default.isObjectLiteralExpression, false /* not required */, `The third argument to ${intrinsics_1.FIGMA_CONNECT_CALL}() must be an object literal. Example usage:
    \`${intrinsics_1.FIGMA_CONNECT_CALL}(Button, 'https://www.figma.com/file/123?node-id=1-1', { render: () => <Button /> })\``);
    return {
        componentArg,
        figmaNodeUrlArg,
        configObjArg,
    };
}
function parseConfigObjectArg(configArg, parserContext) {
    if (!configArg) {
        return {
            propsArg: undefined,
            exampleArg: undefined,
            variantArg: undefined,
            importsArg: undefined,
            linksArg: undefined,
        };
    }
    const propsArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'props',
        predicate: typescript_1.default.isObjectLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'props' property must be an object literal. Example usage:
      \`${intrinsics_1.FIGMA_CONNECT_CALL}(Button, 'https://www.figma.com/file/123?node-id=1-1', {
        props: {
          disabled: figma.boolean('Disabled'),
          text: figma.string('TextContent'),
        }
      })\``,
    });
    const exampleArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'example',
        predicate: (0, compiler_1.isOneOf)([typescript_1.default.isArrowFunction, typescript_1.default.isFunctionExpression]),
        parserContext,
        required: false,
        errorMessage: `The 'example' property must be an inline function or arrow function. Example usage:
    \`${intrinsics_1.FIGMA_CONNECT_CALL}(Button, 'https://www.figma.com/file/123?node-id=1-1', {
      example: () => <Button />
    })\``,
    });
    const variantArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'variant',
        predicate: typescript_1.default.isObjectLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'variant' property must be an object literal. Example usage:
    \`${intrinsics_1.FIGMA_CONNECT_CALL}(Button, 'https://www.figma.com/file/123?node-id=1-1', {
      variant: {
        "Has Icon": true
      }
    })\``,
    });
    const linksArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'links',
        predicate: typescript_1.default.isArrayLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'links' property must be an array literal. Example usage:
    \`${intrinsics_1.FIGMA_CONNECT_CALL}(Button, 'https://www.figma.com/file/123?node-id=1-1', {
      links: [
        { name: 'Storybook', url: 'https://storybook.com' }
      ]
    })\``,
    });
    const importsArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'imports',
        predicate: typescript_1.default.isArrayLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'imports' property must be an array literal. Example usage:
    \`${intrinsics_1.FIGMA_CONNECT_CALL}(Button, 'https://www.figma.com/file/123?node-id=1-1', {
      imports: ['import { Button } from "./Button"']
    })\``,
    });
    return {
        propsArg,
        exampleArg,
        variantArg,
        linksArg,
        importsArg,
    };
}
function getDefaultTemplate(componentMetadata) {
    const example = `<${componentMetadata.component} />`;
    return `const figma = require("figma")\n\nexport default figma.tsx\`${example}\``;
}
async function parseReactDoc(node, parserContext, { repoUrl, silent }) {
    const { checker, sourceFile, config } = parserContext;
    // Parse the arguments to the `figma.connect()` call
    const { componentArg, figmaNodeUrlArg, configObjArg } = parseFigmaConnectArgs(node, parserContext);
    const { propsArg, exampleArg, variantArg, linksArg, importsArg } = parseConfigObjectArg(configObjArg, parserContext);
    let figmaNode = (0, compiler_1.stripQuotesFromNode)(figmaNodeUrlArg);
    // TODO This logic is duplicated in connect.ts transformDocFromParser due to some type issues
    if (config.documentUrlSubstitutions) {
        Object.entries(config.documentUrlSubstitutions).forEach(([from, to]) => {
            // @ts-expect-error
            figmaNode = figmaNode.replace(from, to);
        });
    }
    const metadata = componentArg
        ? await parseComponentMetadata(componentArg, parserContext, silent)
        : undefined;
    const props = propsArg ? (0, intrinsics_1.parsePropsObject)(propsArg, parserContext) : undefined;
    const render = exampleArg
        ? findJSXElement(exampleArg)
            ? parseJSXRenderFunction(exampleArg, parserContext, props)
            : parseValueRenderFunction(exampleArg, parserContext, props)
        : undefined;
    const variant = variantArg ? (0, parser_common_1.parseVariant)(variantArg, sourceFile, checker) : undefined;
    const links = linksArg ? (0, parser_common_1.parseLinks)(linksArg, parserContext) : undefined;
    let mappedImports;
    if (importsArg) {
        mappedImports = (0, parser_common_1.parseImports)(importsArg, parserContext);
    }
    else {
        // If no template function was provided, construct one and add the import
        // statement for the component
        let imports = render?.imports
            ? render.imports
            : metadata !== undefined
                ? getSourceFilesOfImportedIdentifiers(parserContext, [metadata.component])
                : [];
        if (imports.length === 0 && metadata?.component) {
            // If no imports were found, it might mean that the component is not imported, or
            // that the `figma.connect` call is in the same file as the component. In the latter
            // case - we'll want to generate one
            const fileName = metadata.source.split('/').pop()?.split('.')[0];
            imports = [
                {
                    statement: `import { ${metadata.component} } from './${fileName}'`,
                    file: sourceFile.fileName,
                },
            ];
        }
        mappedImports =
            imports.map((imp) => {
                if (config) {
                    const mappedPath = (0, project_1.mapImportPath)(imp.file, config);
                    if (mappedPath) {
                        return imp.statement.replace(/['"]([\.\/a-zA-Z0-9_-]*)['"]/, `'${mappedPath}'`);
                    }
                }
                return imp.statement;
            }) ?? [];
    }
    if (mappedImports.length === 0 && metadata?.component) {
        logging_1.logger.warn(`The import statement for ${metadata.component} could not be automatically resolved, make sure the component is imported (if not colocating) and that the path mappings are correct in your figma.config.json`);
    }
    let template;
    if (render?.code) {
        template = render.code;
    }
    else if (metadata) {
        template = getDefaultTemplate(metadata);
    }
    else {
        throw new parser_common_1.ParserError(`${intrinsics_1.FIGMA_CONNECT_CALL}() requires either a component argument or an example function`, { sourceFile, node });
    }
    return {
        figmaNode,
        label: project_1.DEFAULT_LABEL_PER_PARSER.react,
        language: 'typescript',
        component: metadata?.component,
        source: metadata?.source ? (0, project_1.getRemoteFileUrl)(metadata.source, repoUrl) : '',
        sourceLocation: metadata?.line !== undefined ? { line: metadata.line } : { line: -1 },
        variant,
        template,
        templateData: {
            // TODO: `props` here is currently only used for validation purposes,
            // we should eventually remove it from the JSON payload
            props,
            imports: mappedImports,
            // If there's no render function, the default example is always nestable
            nestable: render ? render.nestable : true,
        },
        links,
        metadata: {
            cliVersion: require('../../package.json').version,
        },
    };
}
//# sourceMappingURL=parser.js.map