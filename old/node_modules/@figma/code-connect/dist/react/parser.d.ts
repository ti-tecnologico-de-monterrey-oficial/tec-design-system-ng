import ts from 'typescript';
import { PropMappings } from '../connect/intrinsics';
import { CodeConnectJSON } from '../connect/figma_connect';
import { ParserContext, ParseOptions } from '../connect/parser_common';
/**
 * Traverses the AST and returns the first JSX element it finds
 * @param node AST node
 * @returns
 */
export declare function findJSXElement(node: ts.Node): ts.JsxElement | ts.JsxSelfClosingElement | ts.JsxFragment | undefined;
export declare function findAndResolveImports(program: ts.Program, sourceFile: ts.SourceFile): Record<string, string>;
export type ComponentTypeSignature = Record<string, string>;
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
export declare function parseComponentMetadata(node: ts.PropertyAccessExpression | ts.Identifier | ts.Expression, parserContext: ParserContext, silent?: boolean): Promise<{
    source: string;
    line: number;
    component: string;
}>;
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
export declare function parseRenderFunctionExpression(exp: ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration, parserContext: ParserContext, propMappings?: PropMappings): {
    code: string;
    imports: {
        statement: string;
        file: string;
    }[];
    nestable: boolean;
    referencedProps: Set<string>;
};
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
export declare function parseJSXRenderFunction(exp: ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration, parserContext: ParserContext, propMappings?: PropMappings): {
    code: string;
    imports: {
        statement: string;
        file: string;
    }[];
    nestable: boolean;
};
/**
 * Parses the render function for a value (i.e. example which returns a string or React
 * component reference, not JSX) passed to `figma.connect()`
 */
export declare function parseValueRenderFunction(exp: ts.ArrowFunction | ts.FunctionExpression | ts.FunctionDeclaration, parserContext: ParserContext, propMappings?: PropMappings): {
    code: string;
    imports: {
        statement: string;
        file: string;
    }[];
    nestable: boolean;
};
export declare function replacePropPlaceholders(exampleCode: string): string;
export declare function getDefaultTemplate(componentMetadata: Awaited<ReturnType<typeof parseComponentMetadata>>): string;
export declare function parseReactDoc(node: ts.CallExpression, parserContext: ParserContext, { repoUrl, silent }: ParseOptions): Promise<CodeConnectJSON>;
//# sourceMappingURL=parser.d.ts.map