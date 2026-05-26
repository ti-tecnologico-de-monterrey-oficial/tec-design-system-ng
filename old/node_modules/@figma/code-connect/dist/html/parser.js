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
exports.parseExampleTemplate = parseExampleTemplate;
exports.parseHtmlDoc = parseHtmlDoc;
const typescript_1 = __importStar(require("typescript"));
const compiler_1 = require("../typescript/compiler");
const intrinsics_1 = require("../connect/intrinsics");
const parser_template_helpers_1 = require("./parser_template_helpers");
const jsdom_1 = require("jsdom");
const parse5_1 = require("parse5");
const parser_common_1 = require("../connect/parser_common");
const project_1 = require("../connect/project");
const prettier_1 = require("prettier");
function getHtmlTaggedTemplateNode(node) {
    if (typescript_1.default.isTaggedTemplateExpression(node)) {
        const tag = node.tag;
        if (typescript_1.default.isIdentifier(tag) && tag.text === 'html') {
            return node;
        }
    }
    else if (typescript_1.default.isBlock(node) &&
        node.statements.length === 1 &&
        typescript_1.default.isReturnStatement(node.statements[0]) &&
        node.statements[0].expression &&
        typescript_1.default.isTaggedTemplateExpression(node.statements[0].expression) &&
        typescript_1.default.isIdentifier(node.statements[0].expression.tag) &&
        node.statements[0].expression.tag.text === 'html') {
        return node.statements[0].expression;
    }
    return undefined;
}
/**
 * This function converts the HTML template literal into a DOM (using JSDOM) to
 * extract information which is used in generating the template:
 * 1. A dictionary of template placeholders which correspond to HTML attribute
 *    values. The key is the placeholder index, and the value is the attribute
 *    name. The attribute name is unused (it used to be used in the output, but
 *    we need to preserve case to support Angular, which JSDOM can't do unless
 *    you use XHTML mode, and that doesn't support attributes without a value).
 * 2. Whether the template is "nestable" or not. A template is considered
 *    nestable if it has only one top level element.
 *
 * For finding the attribute placeholders, the algorithm is as follows:
 * 1. Build up a full string from the template literal, replacing any value
 *    ${placeholders} with `__FIGMA_PLACEHOLDER_0`, where 0 is the placeholder
 *    index. This results in a valid HTML string, with placeholders we can later
 *    detect.
 * 2. Use JSDOM to turn this into a DOM.
 * 3. Iterate over every node in the DOM, and if the node has any attributes
 *    starting `__FIGMA_PLACEHOLDER`, store the info of these attributes. This
 *    allows us to know which template literal placeholders correspond to HTML
 *    attributes when we construct the template.
 */
function getInfoFromDom(templateExp, parserContext) {
    let htmlString;
    if (typescript_1.default.isTemplateExpression(templateExp)) {
        // If this is a template expression, build up the HTML string with
        // identifiable placeholders as described above
        htmlString = templateExp.head.text;
        templateExp.templateSpans.forEach((part, index) => {
            htmlString += `__FIGMA_PLACEHOLDER_${index}` + part.literal.text;
        });
    }
    else if (templateExp.template.kind === typescript_1.default.SyntaxKind.FirstTemplateToken) {
        // This is just a template literal with no placeholders
        htmlString = templateExp.template.text;
    }
    else {
        // This should never happen as we check the type in the calling function
        throw new Error(`Unsupported template type: ${typescript_1.SyntaxKind[templateExp.template.kind]}`);
    }
    // First, check for HTML which we cannot handle. JSDOM is quite forgiving,
    // like a browser, but we need to be stricter
    //
    // Duplicate attribute names are handled gracefully by JSDOM (it just keeps
    // one of the attributes), but this breaks our algorithm because some of the
    // placeholders are no longer in the DOM. JSDOM has no way to detect this, but
    // parse5 (which is a library JSDOM uses under the hood) can detect this. We
    // just thrown an error in this case as there's no use case for doing this.
    (0, parse5_1.parse)(htmlString, {
        onParseError: (error) => {
            if (error.code === 'duplicate-attribute') {
                throw new parser_common_1.ParserError(`Duplicate attribute name in example HTML`, {
                    node: templateExp,
                    sourceFile: parserContext.sourceFile,
                });
            }
        },
    });
    // Try to format the HTML with prettier, to catch any errors due to invalid
    // HTML which would otherwise result in broken formatting in the UI as
    // prettier is less forgiving
    try {
        // pluginSearchDirs: false is needed as otherwise prettier picks up other
        // prettier plugins in our monorepo and fails on CI
        (0, prettier_1.format)(htmlString, { parser: 'html', pluginSearchDirs: false });
    }
    catch (e) {
        throw new parser_common_1.ParserError(`Error parsing example HTML. Check the HTML is valid.`, {
            node: templateExp,
            sourceFile: parserContext.sourceFile,
        });
    }
    // Create a DOM with JSDOM.
    //
    // JSDOM doesn't work properly in all cases if we parse a DOM without a full
    // document, e.g. Vue templates - when traversing with NodeIterator, it
    // doesn't find all elements. We create a Fragment then append it to a full
    // DOM to work around this. The extra wrapping elements don't matter, as we're
    // only interested in the attributes.
    const fragment = jsdom_1.JSDOM.fragment(htmlString);
    const dom = new jsdom_1.JSDOM('<!DOCTYPE html><html><body></body></html>');
    dom.window.document.body.appendChild(fragment);
    const document = dom.window.document;
    const NodeFilter = dom.window.NodeFilter;
    const attributePlaceholders = {};
    function iterateNodeIterator(nodeIterator) {
        let currentNode;
        while ((currentNode = nodeIterator.nextNode())) {
            // I couldn't work out how to do this in a way which satisfies TypeScript,
            // so using a check and a cast
            if (currentNode.nodeType === dom.window.Node.ELEMENT_NODE) {
                // Check for any attributes which correspond to placeholders in the
                // template literal, and store their index and name
                for (let attr of currentNode.attributes) {
                    if (attr.value.startsWith('__FIGMA_PLACEHOLDER_')) {
                        attributePlaceholders[parseInt(attr.value.split('__FIGMA_PLACEHOLDER_')[1])] = attr.name;
                    }
                }
            }
            // <TEMPLATE> nodes are not iterated over by default, as they are a way to
            // store a fragment which is not rendered immediately. These are used in
            // e.g. Vue templates, so we need to  iterate over them explicitly.
            if (currentNode.nodeName === 'TEMPLATE') {
                const templateContent = currentNode.content;
                const templateNodeIterator = document.createNodeIterator(templateContent, NodeFilter.SHOW_ELEMENT, null);
                iterateNodeIterator(templateNodeIterator);
            }
        }
    }
    // Iterate over all the nodes in the DOM
    const nodeIterator = document.createNodeIterator(document.body, NodeFilter.SHOW_ELEMENT, null);
    iterateNodeIterator(nodeIterator);
    // We check if there is more than one top level child, as we use this as a
    // signal that the template is not "nestable" (and so we render an instance
    // pill rather than render the child's code inline in the UI)
    const topLevelChildrenCount = document.body.children.length;
    return {
        attributePlaceholders,
        nestable: topLevelChildrenCount === 1,
    };
}
function escapeTemplateString(code) {
    return code.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
/**
 * Parses the example template string passed to `figma.connect()`.
 *
 * @param exp A function or arrow function expression
 * @param parserContext Parser context
 * @param propMappings Prop mappings object as returned by parseProps
 *
 * @returns The code of the render function and a list of imports
 */
function parseExampleTemplate(exp, parserContext, propMappings) {
    const { sourceFile } = parserContext;
    if (exp.parameters.length > 1) {
        throw new parser_common_1.ParserError(`Expected a single props parameter for the render function, got ${exp.parameters.length} parameters`, { sourceFile, node: exp });
    }
    const propsParameter = exp.parameters[0];
    if (!exp.body) {
        throw new parser_common_1.ParserError(`Expected a body for the render function`, { sourceFile, node: exp });
    }
    // If the body is a string literal, we generate a `figma.value` statement instead, which just
    // renders the string as-is in code examples
    if (typescript_1.default.isStringLiteral(exp.body)) {
        const printer = typescript_1.default.createPrinter();
        if (!exp.body) {
            throw new parser_common_1.ParserError('Expected a function body', {
                sourceFile: parserContext.sourceFile,
                node: exp,
            });
        }
        let exampleCode = printer.printNode(typescript_1.default.EmitHint.Unspecified, exp.body, sourceFile);
        let templateCode = (0, parser_template_helpers_1.getParsedTemplateHelpersString)() + '\n\n';
        templateCode += `const figma = require('figma')\n\n`;
        templateCode += (0, parser_common_1.getReferencedPropsForTemplate)({
            propMappings,
            exp,
            sourceFile,
        });
        exampleCode = exampleCode.replace(/`/g, '\\`');
        // Body is a string literal, so there aren't any placeholders
        templateCode += `export default figma.value(${exampleCode})\n`;
        return {
            code: templateCode,
            nestable: true,
        };
    }
    const templateNode = getHtmlTaggedTemplateNode(exp.body);
    if (!templateNode) {
        throw new parser_common_1.ParserError(`Expected only a tagged template literal as the body of the render function`, { sourceFile, node: templateNode });
    }
    // Keep track of any props which are referenced in the example so that we can
    // insert the appropriate `figma.properties` call in the JS template
    const referencedProps = new Set();
    let exampleCode = '';
    let nestable = true;
    if ((0, typescript_1.isTemplateExpression)(templateNode.template)) {
        // This is a template expression with placeholders
        const createPropPlaceholder = (0, parser_common_1.makeCreatePropPlaceholder)({
            propMappings,
            referencedProps,
            sourceFile,
        });
        // Transform the template to replace any props references with placeholder
        // function calls, normalising the different types of props references
        const transformedTemplate = typescript_1.default.transform(templateNode.template, [
            (context) => (rootNode) => {
                function visit(node) {
                    if (typescript_1.default.isTemplateSpan(node)) {
                        const visitResult = (0, parser_common_1.visitPropReferencingNode)({
                            propsParameter,
                            node: node.expression,
                            createPropPlaceholder,
                            useJsx: false,
                        });
                        if (visitResult) {
                            return typescript_1.default.factory.createTemplateSpan(visitResult, node.literal);
                        }
                    }
                    return typescript_1.default.visitEachChild(node, visit, context);
                }
                return typescript_1.default.visitNode(rootNode, visit);
            },
        ]).transformed[0];
        // Iterate over the template string spans (i.e. the interleaved strings and
        // placeholders) to build up our example code.
        //
        // Each time we encounter a placeholder (which by this point has been
        // normalised to a __PROP__ placeholder function call), we check if it
        // corresponds to a HTML attribute based on our previous DOM analysis (see
        // getInfoFromDom).
        //
        // If it does, we replace it with a call to
        // `_fcc_renderHtmlAttribute("attributeName", propVariableName), otherwise
        // we replace it with a call to `_fcc_renderHtmlValue(propVariableName)`.
        //
        // We have some additional logic to handle cases where the user accidentally
        // writes `attribute="${props.prop}"` rather than `attribute=${props.prop}`
        // (which is what we show in the docs), as it's easy to make this mistake
        // when copy/pasting.
        // Keep track of whether we're inside an attribute value that is wrapped in quotes,
        // so that we can strip the trailing quote if we are
        let insideAttributeWithQuotes = false;
        const infoFromDom = getInfoFromDom(transformedTemplate, parserContext);
        const { attributePlaceholders } = infoFromDom;
        nestable = infoFromDom.nestable;
        // Handle a chunk of HTML, i.e. a text section of the template string. If
        // the next placeholder is an attribute and this chunk ends with a HTML
        // attribute (i.e. matches a regex like ` text=` or ` text="`), we remove the
        // attribute name so that it's not present in the low level template before the
        // call to _fcc_renderHtmlAttribute.
        function handleHtmlChunk(html, nextPlaceholderIsAttribute) {
            // If we were previously inside an attribute value placeholder with quotes
            // surrounding it, remove the leading quote. We do it like this rather
            // than always removing the leading quote to avoid situations where we
            // mistakenly remove a quote that is part of the actual content.
            if (insideAttributeWithQuotes) {
                html = html.replace(/^"/g, '');
            }
            // If the next placeholder is an attribute, then match the start of the
            // attribute (`attribute=`) at the end of this chunk, so that we can
            // remove it from the example code and store the attribute name
            const attributeMatches = html.match(/(.*\s)([^\s]+)="?$/s);
            if (nextPlaceholderIsAttribute && attributeMatches) {
                // attributeMatches should always have matched here, but we check it
                // anyway so we can fail gracefully if not
                // Add the code up to the attribute, not including the ` attribute=`
                // part, as _fcc_renderHtmlAttribute is responsible for (maybe)
                // rendering that
                exampleCode += escapeTemplateString(attributeMatches[1]);
                // If we are in this block, we know that we've matched an attribute, so
                // store whether it ends with a quote
                insideAttributeWithQuotes = html.endsWith('"');
                // Return the attribute name so we can use it to construct the attribute
                // in the output. We do this rather than extract it from the HTML with
                // JSDOM because we want to preserve case, but do not want to parse the
                // doc as XHTML, so there's no way to do it otherwise.
                return attributeMatches[2];
            }
            else {
                // No attribute to remove, just add the code
                exampleCode += escapeTemplateString(html);
                insideAttributeWithQuotes = false;
            }
        }
        // Process the first chunk, which is a special case as it is not in templateSpans
        let maybeAttributeName = handleHtmlChunk(transformedTemplate.head.text, attributePlaceholders[0] !== undefined);
        // For each section of the template string, check that the expression is a
        // prop placeholder, then add the appropriate template function call
        transformedTemplate.templateSpans.forEach((part, index) => {
            if (!typescript_1.default.isCallExpression(part.expression)) {
                throw new parser_common_1.ParserError(`Expected a call expression as a placeholder in the template, got ${typescript_1.SyntaxKind[part.expression.kind]}`, { sourceFile, node: part.expression });
            }
            const propNameArg = part.expression.arguments[0];
            if (!typescript_1.default.isStringLiteral(propNameArg)) {
                throw new parser_common_1.ParserError(`Expected a string literal as the argument to the placeholder call, got ${typescript_1.SyntaxKind[propNameArg.kind]}`, { sourceFile, node: propNameArg });
            }
            const propVariableName = propNameArg.text;
            if (attributePlaceholders[index]) {
                exampleCode += `\${_fcc_renderHtmlAttribute('${maybeAttributeName}', ${propVariableName})}`;
            }
            else {
                exampleCode += `\${_fcc_renderHtmlValue(${propVariableName})}`;
            }
            // Process the next chunk
            maybeAttributeName = handleHtmlChunk(part.literal.text, attributePlaceholders[index + 1] !== undefined);
        });
    }
    else if (templateNode.template.kind === typescript_1.default.SyntaxKind.FirstTemplateToken) {
        // Template string with no placeholders
        nestable = getInfoFromDom(templateNode, parserContext).nestable;
        exampleCode = escapeTemplateString(templateNode.template.text);
    }
    else {
        throw new parser_common_1.ParserError(`Expected a template expression as the body of the render function, got ${typescript_1.SyntaxKind[templateNode.template.kind]}`, { sourceFile, node: templateNode.template });
    }
    let templateCode = (0, parser_template_helpers_1.getParsedTemplateHelpersString)() + '\n\n';
    templateCode += `const figma = require('figma')\n\n`;
    templateCode += (0, parser_common_1.getReferencedPropsForTemplate)({
        propMappings,
        exp,
        sourceFile,
    });
    templateCode += `export default figma.html\`${exampleCode}\`\n`;
    return {
        code: templateCode,
        nestable,
    };
}
function parseFigmaConnectArgs(node, parserContext) {
    const required = true;
    const figmaNodeUrlArg = (0, compiler_1.parseFunctionArgument)(node, parserContext, 0, typescript_1.default.isStringLiteral, required, `\`${intrinsics_1.FIGMA_CONNECT_CALL}\` must be called with a Figma Component URL as the first argument. Example usage:
\`${intrinsics_1.FIGMA_CONNECT_CALL}('https://www.figma.com/file/123?node-id=1-1', {
  example: () => html\`<button />\`
})\``);
    const configObjArg = (0, compiler_1.parseFunctionArgument)(node, parserContext, 1, typescript_1.default.isObjectLiteralExpression, true, `The second argument to ${intrinsics_1.FIGMA_CONNECT_CALL}() must be an object literal. Example usage:
\`${intrinsics_1.FIGMA_CONNECT_CALL}('https://www.figma.com/file/123?node-id=1-1', {
  example: () => html\`<button />\`
})\``);
    return {
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
\`${intrinsics_1.FIGMA_CONNECT_CALL}('https://www.figma.com/file/123?node-id=1-1', {
  props: {
    disabled: figma.boolean('Disabled'),
    text: figma.string('TextContent'),
  },
  example: (props) => html\`<my-button disabled=\${props.disabled} label=\${props.text} />\`
})\``,
    });
    const exampleArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'example',
        predicate: typescript_1.default.isArrowFunction,
        parserContext,
        required: true,
        errorMessage: `The 'example' property must be an arrow function which returns a html tagged template string. Example usage:
\`${intrinsics_1.FIGMA_CONNECT_CALL}('https://www.figma.com/file/123?node-id=1-1', {
  example: (props) => html\`<my-button />\`
})\``,
    });
    const variantArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'variant',
        predicate: typescript_1.default.isObjectLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'variant' property must be an object literal. Example usage:
\`${intrinsics_1.FIGMA_CONNECT_CALL}('https://www.figma.com/file/123?node-id=1-1', {
  variant: {
    "Has Icon": true
  },
  example: (props) => html\`<my-button />\`
})\``,
    });
    const linksArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'links',
        predicate: typescript_1.default.isArrayLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'links' property must be an array literal. Example usage:
\`${intrinsics_1.FIGMA_CONNECT_CALL}('https://www.figma.com/file/123?node-id=1-1', {
  links: [
    { name: 'Storybook', url: 'https://storybook.com' }
  ],
  example: (props) => html\`<my-button />\`
})\``,
    });
    const importsArg = (0, compiler_1.parsePropertyOfType)({
        objectLiteralNode: configArg,
        propertyName: 'imports',
        predicate: typescript_1.default.isArrayLiteralExpression,
        parserContext,
        required: false,
        errorMessage: `The 'imports' property must be an array literal. Example usage:
\`${intrinsics_1.FIGMA_CONNECT_CALL}('https://www.figma.com/file/123?node-id=1-1', {
  imports: ['import { Button } from "./Button"']
  example: (props) => html\`<my-button />\`,
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
async function parseHtmlDoc(node, parserContext, _) {
    const { checker, sourceFile, config } = parserContext;
    // Parse the arguments to the `figma.connect()` call
    const { figmaNodeUrlArg, configObjArg } = parseFigmaConnectArgs(node, parserContext);
    const { propsArg, exampleArg, variantArg, linksArg, importsArg } = parseConfigObjectArg(configObjArg, parserContext);
    let figmaNode = (0, compiler_1.stripQuotesFromNode)(figmaNodeUrlArg);
    // TODO This logic is duplicated in connect.ts transformDocFromParser due to some type issues
    if (config.documentUrlSubstitutions) {
        Object.entries(config.documentUrlSubstitutions).forEach(([from, to]) => {
            // @ts-expect-error
            figmaNode = figmaNode.replace(from, to);
        });
    }
    const metadata = undefined;
    const props = propsArg ? (0, intrinsics_1.parsePropsObject)(propsArg, parserContext) : undefined;
    const render = exampleArg ? parseExampleTemplate(exampleArg, parserContext, props) : undefined;
    const variant = variantArg ? (0, parser_common_1.parseVariant)(variantArg, sourceFile, checker) : undefined;
    const links = linksArg ? (0, parser_common_1.parseLinks)(linksArg, parserContext) : undefined;
    let imports = importsArg ? (0, parser_common_1.parseImports)(importsArg, parserContext) : undefined;
    let template;
    if (render?.code) {
        template = render.code;
    }
    else {
        throw new parser_common_1.ParserError(`${intrinsics_1.FIGMA_CONNECT_CALL}() requires an example function`, {
            sourceFile,
            node,
        });
    }
    return {
        figmaNode,
        label: project_1.DEFAULT_LABEL_PER_PARSER.html,
        language: 'html',
        component: metadata?.component,
        source: '',
        sourceLocation: { line: -1 },
        variant,
        template,
        templateData: {
            // TODO: `props` here is currently only used for validation purposes,
            // we should eventually remove it from the JSON payload
            props,
            imports,
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