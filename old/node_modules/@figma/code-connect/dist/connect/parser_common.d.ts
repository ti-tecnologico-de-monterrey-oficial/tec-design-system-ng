import ts from 'typescript';
import { PropMappings } from './intrinsics';
import { BaseCodeConnectConfig } from './project';
import { CodeConnectJSON } from './figma_connect';
interface ParserErrorContext {
    sourceFile: ts.SourceFile;
    node: ts.Node | undefined;
}
export declare function getPositionInSourceFile(node: ts.Node, sourceFile: ts.SourceFile): ts.LineAndCharacter;
export declare class ParserError extends Error {
    sourceFilePosition: ts.LineAndCharacter | null;
    sourceFileName: string;
    constructor(message: string, context?: ParserErrorContext);
    toString(): string;
    toDebugString(): string;
}
export declare class InternalError extends ParserError {
    constructor(message: string);
}
export interface ParserContext {
    checker: ts.TypeChecker;
    sourceFile: ts.SourceFile;
    resolvedImports: Record<string, string>;
    config: any;
    absPath: string;
}
/**
 * Factory to create a function that is used to create `__PROP__(propName)`
 * function nodes, which are used to replace prop references and ultimately
 * replaced.
 *
 * @returns Function to create `__PROP__(propName)` function nodes
 */
export declare function makeCreatePropPlaceholder({ propMappings, referencedProps, sourceFile, }: {
    /** The prop mappings object */
    propMappings?: PropMappings | undefined;
    /** The set of referenced props in the current example */
    referencedProps: Set<string>;
    /** The source file */
    sourceFile: ts.SourceFile;
}): ({ name, node, wrapInJsxExpression, }: {
    /** The prop name */
    name: string;
    /** The props node, used for error reporting */
    node: ts.Node;
    /** Whether to wrap the placeholder in a JSX expression node */
    wrapInJsxExpression?: boolean;
}) => ts.CallExpression | ts.JsxExpression;
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
export declare function visitPropReferencingNode({ propsParameter, node, createPropPlaceholder, useJsx, }: {
    /** The props function parameter node */
    propsParameter: ts.ParameterDeclaration;
    /** The node to visit */
    node: ts.Node;
    /**
     * The function to create `__PROP__(propName)` function nodes, created by
     * `baseCreatePropPlaceholder`
     * */
    createPropPlaceholder: ReturnType<typeof makeCreatePropPlaceholder>;
    /** Whether to support JSX syntax or not */
    useJsx?: boolean;
}): ts.Expression | undefined;
/**
 * Get template code to create variables referencing the props in the prop
 * mappings. This converts the prop mappings into JS calls like `const propName
 * = figma.properties.string('Prop Name')`, which can then be prepended to the
 * template code.
 *
 * @returns Template code string
 */
export declare function getReferencedPropsForTemplate({ propMappings, }: {
    /** The prop mappings object */
    propMappings: PropMappings | undefined;
    /** The top level node, used for error reporting */
    exp: ts.Node;
    /** The source file */
    sourceFile: ts.SourceFile;
}): string;
/**
 * Checks if a file contains Code Connect by looking for the `figma.connect()` function call
 */
export declare function isFigmaConnectFile(program: ts.Program, file: string, extension: string | string[]): boolean;
/**
 * Checks if an AST node is a `figma.connect()` call
 *
 * @param node AST node
 * @param sourceFile Source file
 * @returns True if the node is a `figma.connect()` call
 */
export declare function isFigmaConnectCall(node: ts.Node, sourceFile: ts.SourceFile): node is ts.CallExpression;
export declare function findDescendants(node: ts.Node, cb: (node: ts.Node) => boolean): ts.Node[];
/**
 * Parses the `links` field of a `figma.connect()` call
 *
 * @param linksArray an ArrayLiteralExpression
 * @param parserContext Parser context
 * @returns An array of link objects
 */
export declare function parseLinks(linksArray: ts.ArrayLiteralExpression, parserContext: ParserContext): {
    name: string;
    url: string;
}[];
export declare function parseVariant(variantMap: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile, checker: ts.TypeChecker): Record<string, any>;
/**
 * Parses the `imports` field of a `figma.connect()` call
 *
 * @param importsArray an ArrayLiteralExpression
 * @param parserContext Parser context
 * @returns An array of link objects
 */
export declare function parseImports(importsArray: ts.ArrayLiteralExpression, parserContext: ParserContext): string[];
export type ParseOptions = {
    repoUrl?: string;
    debug?: boolean;
    silent?: boolean;
};
export type ParseFn = (node: ts.CallExpression, parserContext: ParserContext, { repoUrl, silent }: ParseOptions) => Promise<CodeConnectJSON>;
export type ResolveImportsFn = (program: ts.Program, sourceFile: ts.SourceFile) => Record<string, string>;
export declare function parseCodeConnect<T extends BaseCodeConnectConfig>({ program, file, config, absPath, parseFn, resolveImportsFn, parseOptions, }: {
    program: ts.Program;
    file: string;
    config: T;
    absPath: string;
    parseFn: ParseFn;
    resolveImportsFn?: ResolveImportsFn;
    parseOptions?: ParseOptions;
}): Promise<any[]>;
export {};
//# sourceMappingURL=parser_common.d.ts.map