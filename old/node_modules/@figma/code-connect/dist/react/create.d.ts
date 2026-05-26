import z from 'zod';
import { CreateRequestPayloadMulti, CreateResponsePayload, FigmaConnectionComponent } from '../connect/parser_executable_types';
import { Intrinsic } from '../connect/intrinsics';
export declare function isBooleanKind(propValue: string): boolean;
export declare function generateExpressionFromIntrinsic({ kind, args }: Intrinsic): string | never;
export declare function getSetOfAllPropsReferencedInPropMapping(obj: Object): Set<string>;
export declare function generateProps(component: FigmaConnectionComponent): string;
export declare function createReactCodeConnect(payload: CreateRequestPayloadMulti): Promise<z.infer<typeof CreateResponsePayload>>;
//# sourceMappingURL=create.d.ts.map