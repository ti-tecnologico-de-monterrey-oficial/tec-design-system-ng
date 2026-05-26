"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStorybookFiles = convertStorybookFiles;
const fs_1 = require("fs");
const compiler_1 = require("../typescript/compiler");
const parser_1 = require("../react/parser");
const project_1 = require("../connect/project");
const logging_1 = require("../common/logging");
const typescript_1 = __importDefault(require("typescript"));
const minimatch_1 = require("minimatch");
const intrinsics_1 = require("../connect/intrinsics");
const parser_common_1 = require("../connect/parser_common");
/**
 * Converts all Storyboook files in a directory into Code Connect objects. If a file
 * cannot be converted (e.g. unsupported syntax), it is ignored and an error is
 * logged.
 *
 * @param args
 * @returns An array of Code Connect objects
 */
async function convertStorybookFiles({ projectInfo, storiesGlob = '**/*.stories.tsx', }) {
    const { remoteUrl, config, files, tsProgram } = projectInfo;
    const storyFiles = files.filter((file) => (0, minimatch_1.minimatch)(file, storiesGlob, { matchBase: true }));
    logging_1.logger.debug(`Story files found:\n${storyFiles.map((f) => `- ${f}`).join('\n')}`);
    return Promise.all(storyFiles.map((path) => convertStorybookFile({ path, tsProgram, config, remoteUrl, absPath: projectInfo.absPath })))
        .then((f) => f.filter((x) => Boolean(x)))
        .then((f) => f.flat());
}
async function convertStorybookFile({ path, tsProgram, remoteUrl, config, absPath, }) {
    const checker = tsProgram.getTypeChecker();
    const sourceFile = tsProgram.getSourceFile(path);
    if (!sourceFile) {
        throw new parser_common_1.InternalError(`Source file not found: ${path}`);
    }
    const parserContext = {
        checker,
        config,
        sourceFile,
        absPath,
        resolvedImports: (0, parser_1.findAndResolveImports)(tsProgram, sourceFile),
    };
    let source = (0, fs_1.readFileSync)(path).toString();
    // Replace backticks with ' as csf-tools can't parse dynamic titles
    source = source.replace(/title: `(.*)`/g, (_, title) => {
        return `title: '${title}'`;
    });
    logging_1.logger.debug(`Parsing story ${path}`);
    try {
        // We need to get the default export, which contains the story file meta,
        // from the TS Program rather than using `babelNodeToTsSourceFile(csf._metaNode)`,
        // because we need access to the full Program to parse it for prop types etc.
        const storyFileMetaNode = (0, compiler_1.getDefaultExport)(sourceFile);
        if (!storyFileMetaNode) {
            return;
        }
        const parseResult = parseStoryMetadata(storyFileMetaNode, parserContext);
        if (!parseResult) {
            logging_1.logger.debug(`Could not parse story metadata for ${path}`);
            return;
        }
        const { figmaStoryMetadata, componentDeclaration, propMappings, examples, imports, links } = parseResult;
        const componentMetadata = await (0, parser_1.parseComponentMetadata)(componentDeclaration, parserContext);
        const codeConnectObjects = [];
        const baseCodeConnect = {
            figmaNode: figmaStoryMetadata.url,
            source: config?.storybook?.url
                ? (0, project_1.getStorybookUrl)(componentMetadata.source, config.storybook.url)
                : (0, project_1.getRemoteFileUrl)(componentMetadata.source, remoteUrl),
            sourceLocation: { line: componentMetadata.line },
            template: '',
            templateData: {
                props: propMappings,
                imports,
            },
            links,
            component: componentMetadata.component,
            label: 'Storybook',
            language: 'typescript',
            metadata: {
                cliVersion: require('../../package.json').version,
            },
        };
        // If there are no examples, just return a default Code Connect object
        if (!examples) {
            codeConnectObjects.push({
                ...baseCodeConnect,
                template: (0, parser_1.getDefaultTemplate)(componentMetadata),
            });
            return codeConnectObjects;
        }
        for (const statement of sourceFile.statements) {
            // Find any exported function or variable declarations, which correspond to stories
            if (!(typescript_1.default.isFunctionDeclaration(statement) || typescript_1.default.isVariableStatement(statement))) {
                continue;
            }
            const name = typescript_1.default.isFunctionDeclaration(statement)
                ? statement.name?.text
                : statement.declarationList.declarations?.[0].name.getText(sourceFile);
            const example = examples?.find((example) => example.example === name);
            // This story is not in the examples array, so skip it
            if (examples && !example) {
                continue;
            }
            let statementToParse;
            if (typescript_1.default.isFunctionDeclaration(statement)) {
                statementToParse = statement;
            }
            else {
                const initializer = statement.declarationList.declarations[0].initializer;
                if (initializer && typescript_1.default.isArrowFunction(initializer)) {
                    statementToParse = initializer;
                }
                else if (initializer && typescript_1.default.isObjectLiteralExpression(initializer)) {
                    // Handle stories like `export const Primary = { render: () => <Button /> }`
                    const renderProperty = (0, compiler_1.parsePropertyOfType)({
                        objectLiteralNode: initializer,
                        propertyName: 'render',
                        predicate: typescript_1.default.isArrowFunction,
                        parserContext,
                        required: true,
                    });
                    if (renderProperty) {
                        statementToParse = renderProperty;
                    }
                }
            }
            if (!statementToParse) {
                throw new parser_common_1.ParserError('Expected function declaration, arrow function or render function in story', {
                    sourceFile,
                    node: statement,
                });
            }
            const exampleProps = example?.props ?? propMappings;
            let render = (0, parser_1.parseJSXRenderFunction)(statementToParse, parserContext, exampleProps);
            if (!render) {
                continue;
            }
            const template = render.code ?? `<${componentMetadata.component} />`;
            // TODO handle JSDoc on stories
            codeConnectObjects.push({
                ...baseCodeConnect,
                template,
                variant: example?.variant,
            });
        }
        return codeConnectObjects;
    }
    catch (e) {
        logging_1.logger.error(`Error parsing story ${path}: ${e}`);
        throw e;
    }
}
/**
 * Get the TS Node representing the component declaration from the story file
 *
 * @param objectLiteralNode Object literal containing the story file metadata
 * @returns TS Node representing the component declaration or undefined
 */
function getComponentDeclaration(objectLiteralNode) {
    for (const property of objectLiteralNode.properties) {
        if (!typescript_1.default.isPropertyAssignment(property))
            continue;
        const propertyName = property.name;
        if (typescript_1.default.isIdentifier(propertyName) && propertyName.text === 'component') {
            return property.initializer;
        }
    }
    return undefined;
}
/**
 * Validate and returns Figma metadata from the default export of the storybook
 * file
 *
 * @param storyFileMetaNode TS Node containing the story file metadata, i.e. the
 * default export of the file
 * @param sourceFile TS SourceFile representing a single story
 * @returns Figma metadata
 * @throws Error if no Figma metadata is found
 */
function parseStoryMetadata(storyFileMetaNode, parserContext) {
    const { sourceFile, checker } = parserContext;
    // Find the first object expression under tsSourceFile.statements[0],
    // which contains the story file metadata. We do it this way to allow syntax
    // like `export default ({ ... meta ... } as ComponentMeta<...>)`
    const objectLiteralNode = (0, compiler_1.bfsFindNode)(storyFileMetaNode, sourceFile, (node) => typescript_1.default.isObjectLiteralExpression(node));
    if (!objectLiteralNode || !typescript_1.default.isObjectLiteralExpression(objectLiteralNode)) {
        logging_1.logger.debug(`No object literal found in story metadata`);
        return;
    }
    const componentDeclaration = getComponentDeclaration(objectLiteralNode);
    if (!componentDeclaration) {
        logging_1.logger.debug(`No component declaration found in story metadata`);
        return;
    }
    const parametersNode = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: objectLiteralNode,
        propertyName: 'parameters',
        predicate: typescript_1.default.isObjectLiteralExpression,
        parserContext,
        required: false,
    });
    // If there's no parameters object, this file shouldn't be imported
    if (!parametersNode) {
        logging_1.logger.debug(`No parameters object found in story metadata`);
        return;
    }
    const designNode = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: parametersNode,
        propertyName: 'design',
        predicate: typescript_1.default.isObjectLiteralExpression,
        parserContext,
        required: false,
    });
    // If there's no design object, this file shouldn't be imported
    if (!designNode) {
        logging_1.logger.debug(`No design object found in story metadata`);
        return;
    }
    const typeNode = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: designNode,
        propertyName: 'type',
        predicate: typescript_1.default.isStringLiteral,
        parserContext,
        errorMessage: '"type" property not found in "design" object in story metadata',
        required: false,
    });
    // If the design is not a Figma design, this file shouldn't be imported
    if (!typeNode || typeNode.text !== 'figma') {
        logging_1.logger.debug(`Design type is not figma`);
        return;
    }
    const urlNode = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: designNode,
        propertyName: 'url',
        predicate: typescript_1.default.isStringLiteral,
        parserContext,
        errorMessage: '"url" property not found in "design" object in story metadata',
        required: true,
    });
    const figmaStoryMetadata = {
        type: typeNode.text,
        url: urlNode.text,
    };
    const propMappingNode = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: designNode,
        propertyName: 'props',
        predicate: typescript_1.default.isObjectLiteralExpression,
        parserContext,
        required: false,
    });
    const examplesNode = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: designNode,
        propertyName: 'examples',
        predicate: typescript_1.default.isArrayLiteralExpression,
        parserContext,
        required: false,
    });
    const importsNode = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: designNode,
        propertyName: 'imports',
        predicate: typescript_1.default.isArrayLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'imports' property must be an array literal. Example usage:
\`design: {
      type: 'figma',
      url: 'https://www.figma.com/file/123?node-id=1-1',
      examples: [Button],
      imports: [
        'import { Button } from "./Button"'
      ],
      ...
})\``,
    });
    const linksNode = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: designNode,
        propertyName: 'links',
        predicate: typescript_1.default.isArrayLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'links' property must be an array literal. Example usage:
\`design: {
      type: 'figma',
      url: 'https://www.figma.com/file/123?node-id=1-1',
      examples: [Button],
      links: [
        { name: 'Storybook', url: 'https://storybook.com' }
      ],
      ...
})\``,
    });
    let links;
    if (linksNode) {
        links = (0, parser_common_1.parseLinks)(linksNode, parserContext);
    }
    let imports = [];
    if (importsNode) {
        imports = (0, parser_common_1.parseImports)(importsNode, parserContext);
    }
    let propMappings;
    let mappedProps;
    if (propMappingNode) {
        mappedProps = new Map();
        propMappings = (0, intrinsics_1.parsePropsObject)(propMappingNode, parserContext);
    }
    let examples;
    if (examplesNode) {
        examples = examplesNode.elements.map((exampleNode) => {
            if (typescript_1.default.isStringLiteral(exampleNode) || typescript_1.default.isIdentifier(exampleNode)) {
                return { example: exampleNode.text };
            }
            if (!typescript_1.default.isObjectLiteralExpression(exampleNode)) {
                throw new parser_common_1.ParserError(`Expected object literal in examples array, got: ${typescript_1.default.SyntaxKind[exampleNode.kind]}`, {
                    sourceFile,
                    node: exampleNode,
                });
            }
            return (0, compiler_1.convertObjectLiteralToJs)(exampleNode, sourceFile, checker, (node) => {
                if (node.parent?.name?.escapedText === 'props') {
                    if (typescript_1.default.isObjectLiteralExpression(node)) {
                        return (0, intrinsics_1.parsePropsObject)(node, parserContext);
                    }
                }
            });
        });
    }
    return {
        figmaStoryMetadata,
        componentDeclaration,
        propMappings,
        mappedProps,
        examples,
        imports,
        links,
    };
}
//# sourceMappingURL=convert.js.map