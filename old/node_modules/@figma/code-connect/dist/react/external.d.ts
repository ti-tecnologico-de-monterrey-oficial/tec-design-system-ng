import * as React from 'react';
import { booleanType, enumType, stringType, nestedPropsType, classNameType, textContentType, instanceType } from '../connect/external_types';
import { ReactMeta } from './types';
declare function connectType<P = {}>(_figmaNodeUrl: string, _meta?: ReactMeta<P>): void;
declare function connectType<P = {}>(_component: any, _figmaNodeUrl: string, _meta?: ReactMeta<P>): void;
declare function childrenType(_layers: string | string[]): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
export { booleanType as boolean, enumType as enum, stringType as string, nestedPropsType as nestedProps, classNameType as className, textContentType as textContent, connectType as connect, instanceType as instance, childrenType as children, };
//# sourceMappingURL=external.d.ts.map