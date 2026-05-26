import ts from 'typescript';
import { PropMappings } from '../connect/intrinsics';
import { CodeConnectJSON } from '../connect/figma_connect';
import { ParserContext, ParseOptions } from '../connect/parser_common';
/**
 * Parses the example template string passed to `figma.connect()`.
 *
 * @param exp A function or arrow function expression
 * @param parserContext Parser context
 * @param propMappings Prop mappings object as returned by parseProps
 *
 * @returns The code of the render function and a list of imports
 */
export declare function parseExampleTemplate(exp: ts.ArrowFunction, parserContext: ParserContext, propMappings?: PropMappings): {
    code: string;
    nestable: boolean;
};
export declare function parseHtmlDoc(node: ts.CallExpression, parserContext: ParserContext, _: ParseOptions): Promise<CodeConnectJSON>;
//# sourceMappingURL=parser.d.ts.map