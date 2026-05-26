import * as ts from 'typescript';
import { ParserContext } from './parser_common';
export declare enum ModifierKind {
    GetProps = "getProps",
    Render = "render"
}
export interface ModifierBase {
    kind: ModifierKind;
}
export interface GetPropsModifier extends ModifierBase {
    kind: ModifierKind.GetProps;
}
export interface RenderModifier extends ModifierBase {
    kind: ModifierKind.Render;
    args: {
        renderFn: {
            code: string;
            imports: {
                statement: string;
                file: string;
            }[];
            referencedProps: Set<string>;
        };
    };
}
export type Modifier = GetPropsModifier | RenderModifier;
export declare function parseModifier(exp: ts.CallExpression, parserContext: ParserContext): Modifier;
export declare function modifierToString(modifier: Modifier): string;
//# sourceMappingURL=modifiers.d.ts.map