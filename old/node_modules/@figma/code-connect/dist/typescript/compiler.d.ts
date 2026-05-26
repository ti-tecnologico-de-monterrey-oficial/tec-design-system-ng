import ts from 'typescript';
import { ParserContext } from '../connect/parser_common';
/**
 * Get the default export from a TypeScript source file
 *
 * @param sourceFile TypeScript source file
 * @returns The default export Expression, or undefined if there is no default export
 */
export declare function getDefaultExport(sourceFile: ts.SourceFile): ts.Expression | undefined;
/**
 * Perform a breadth-first search to find the first node matching a predicate
 *
 * @param node Node to start the search from
 * @param tsSourceFile SourceFile associated with the node
 * @param predicate Predicate to match
 * @returns The first node matching the predicate, or undefined if no node is found
 */
export declare function bfsFindNode(node: ts.Node, tsSourceFile: ts.SourceFile, predicate: (node: ts.Node) => boolean): ts.Node | undefined;
/**
 * Gets a property with the specified name and type (via predicate) from an object literal node
 *
 * @param objectLiteralNode The object literal node potentially containing the property
 * @param propertyName The name of the property to get
 * @param predicate Optional predicate to match
 * @param required Whether the property is required. Defaults to false.
 * If true, an error will be thrown if the property is not found
 * @param errorMessage Optional error message to throw if the property is not found
 * @returns The property, or undefined if the property is not found
 */
export declare function parsePropertyOfType<T extends ts.Node>(params: {
    objectLiteralNode: ts.ObjectLiteralExpression;
    propertyName: string;
    predicate: (node: ts.Node) => node is T;
    parserContext: ParserContext;
    required?: true;
    errorMessage?: string;
}): T;
export declare function parsePropertyOfType<T extends ts.Node>(params: {
    objectLiteralNode: ts.ObjectLiteralExpression;
    propertyName: string;
    predicate: (node: ts.Node) => node is T;
    parserContext: ParserContext;
    required?: false;
    errorMessage?: string;
}): T | undefined;
export declare function parsePropertyOfType<T extends ts.Node>(params: {
    objectLiteralNode: ts.ObjectLiteralExpression;
    propertyName: string;
    predicate: (node: ts.Node) => node is T;
    parserContext: ParserContext;
    required?: boolean;
    errorMessage?: string;
}): T | undefined;
type TypeGuard<A, B extends A> = (a: A) => a is B;
type GuardType<T> = T extends (o: any) => o is infer U ? U : never;
/**
 * Combines several type guards into one.
 *
 * The returned function checks if any of the type guards in the list matches the argument,
 * and infers the type based on the matching type guard.
 *
 * @param guards A list of type guards
 */
export declare function isOneOf<T extends TypeGuard<any, any>>(guards: T[]): [T] extends [TypeGuard<infer A, any>] ? (a: A) => a is GuardType<T> : never;
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
export declare function parseFunctionArgument<T extends ts.Node>(fn: ts.CallExpression, parserContext: ParserContext, index: number, predicate: (node: ts.Node) => node is T, required?: boolean, errorMessage?: string): T | undefined;
export declare function assertIsPropertyAssignment(node: ts.Node, sourceFile: ts.SourceFile): asserts node is ts.PropertyAssignment;
export declare function assertIsStringLiteral(node: ts.Node, sourceFile: ts.SourceFile, msg?: string): asserts node is ts.StringLiteral;
export declare function assertIsArrayLiteralExpression(node: ts.Node, sourceFile: ts.SourceFile, msg?: string): asserts node is ts.ArrayLiteralExpression;
export declare function assertIsObjectLiteralExpression(node: ts.Node, sourceFile: ts.SourceFile, msg?: string): asserts node is ts.ObjectLiteralExpression;
export declare function assertIsIdentifier(node: ts.Node, sourceFile: ts.SourceFile, msg?: string): asserts node is ts.Identifier;
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
export declare function convertObjectLiteralToJs(objectLiteral: ts.ObjectLiteralExpression, sourceFile: ts.SourceFile, checker: ts.TypeChecker, extraConversionFn?: (node: ts.Expression) => any): Record<string, any>;
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
export declare function convertArrayLiteralToJs(arrayLiteral: ts.ArrayLiteralExpression, sourceFile: ts.SourceFile, checker: ts.TypeChecker, extraConversionFn?: (node: ts.Expression) => any): any[];
export declare function getTagName(element: ts.JsxElement | ts.JsxSelfClosingElement): string;
export declare function stripQuotesFromNode(node: ts.StringLiteral): string;
export declare function isUndefinedType(node: ts.Node, checker: ts.TypeChecker): boolean;
export {};
//# sourceMappingURL=compiler.d.ts.map