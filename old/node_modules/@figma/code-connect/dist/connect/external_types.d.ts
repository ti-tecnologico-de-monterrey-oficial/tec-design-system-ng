import { PropMapping, ValueOf, EnumValue, ConnectedComponent } from './api';
export declare function booleanType(_figmaPropName: string): boolean;
export declare function enumType<V extends EnumValue>(_figmaPropName: string, _valueMapping: PropMapping<Record<string, V>>): ValueOf<Record<string, V>>;
export declare function stringType(_figmaPropName: string): string;
export declare function nestedPropsType<T>(_layer: string, props: T): T;
export declare function classNameType(_className: (string | undefined)[]): string;
export declare function textContentType(_layer: string): string;
export declare function instanceType<T = ConnectedComponent>(_figmaPropName: string): T;
//# sourceMappingURL=external_types.d.ts.map