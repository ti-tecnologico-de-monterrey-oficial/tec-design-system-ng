import * as ts from 'typescript';
import { ParserContext } from './parser_common';
import { FCCValue } from '../react/parser_template_helpers';
import { Modifier } from './modifiers';
export declare const API_PREFIX = "figma";
export declare const FIGMA_CONNECT_CALL = "figma.connect";
export declare enum IntrinsicKind {
    Enum = "enum",
    String = "string",
    Boolean = "boolean",
    Instance = "instance",
    Children = "children",
    NestedProps = "nested-props",
    ClassName = "className",
    TextContent = "text-content"
}
export interface IntrinsicBase {
    kind: IntrinsicKind;
    args: {};
    modifiers?: Modifier[];
}
export type ValueMappingKind = FCCValue | Intrinsic;
export interface FigmaBoolean extends IntrinsicBase {
    kind: IntrinsicKind.Boolean;
    args: {
        figmaPropName: string;
        valueMapping?: Record<'true' | 'false', ValueMappingKind>;
    };
}
export type ValueMapping = Record<string, ValueMappingKind>;
export interface FigmaEnum extends IntrinsicBase {
    kind: IntrinsicKind.Enum;
    args: {
        figmaPropName: string;
        valueMapping: ValueMapping;
    };
}
export interface FigmaString extends IntrinsicBase {
    kind: IntrinsicKind.String;
    args: {
        figmaPropName: string;
    };
}
export interface FigmaInstance extends IntrinsicBase {
    kind: IntrinsicKind.Instance;
    args: {
        figmaPropName: string;
    };
}
export interface FigmaChildren extends IntrinsicBase {
    kind: IntrinsicKind.Children;
    args: {
        layers: string[];
    };
}
export interface FigmaNestedProps extends IntrinsicBase {
    kind: IntrinsicKind.NestedProps;
    args: {
        layer: string;
        props: Record<string, Intrinsic>;
    };
}
export interface FigmaClassName extends IntrinsicBase {
    kind: IntrinsicKind.ClassName;
    args: {
        className: (string | Intrinsic)[];
    };
}
export interface FigmaTextContent extends IntrinsicBase {
    kind: IntrinsicKind.TextContent;
    args: {
        layer: string;
    };
}
export type Intrinsic = FigmaBoolean | FigmaEnum | FigmaString | FigmaInstance | FigmaChildren | FigmaNestedProps | FigmaClassName | FigmaTextContent;
/**
 * Parses a call expression to an intrinsic
 *
 * @param exp Expression to parse
 * @param parserContext parser context
 * @returns
 */
export declare function parseIntrinsic(exp: ts.CallExpression, parserContext: ParserContext): Intrinsic;
export declare function valueToString(value: ValueMappingKind, childLayer?: string): string;
export declare function valueMappingToString(valueMapping: ValueMapping, childLayer?: string): string;
export declare function intrinsicToString({ kind, args, modifiers }: Intrinsic, childLayer?: string): string;
/**
 * Parses the `props` field in a `figma.connect()` call, returning a mapping of
 * prop names to their respective intrinsic types
 *
 * @param objectLiteral An object literal expression
 * @param parserContext Parser context
 * @returns
 */
export declare function parsePropsObject(objectLiteral: ts.ObjectLiteralExpression, parserContext: ParserContext): PropMappings;
export type PropMappings = Record<string, Intrinsic>;
//# sourceMappingURL=intrinsics.d.ts.map