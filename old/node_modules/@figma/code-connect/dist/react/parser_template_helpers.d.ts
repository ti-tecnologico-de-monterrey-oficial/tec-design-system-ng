export type FCCValue = string | number | boolean | undefined | ReturnType<typeof _fcc_jsxElement | typeof _fcc_function | typeof _fcc_identifier | typeof _fcc_object | typeof _fcc_templateString | typeof _fcc_reactComponent | typeof _fcc_array>;
export declare function _fcc_array($value: any[]): {
    readonly $value: any[];
    readonly $type: "array";
};
export declare function _fcc_jsxElement($value: string): {
    readonly $value: string;
    readonly $type: "jsx-element";
};
export declare function _fcc_function($value: string): {
    readonly $value: string;
    readonly $type: "function";
};
export declare function _fcc_identifier($value: string): {
    readonly $value: string;
    readonly $type: "identifier";
};
export declare function _fcc_object($value: Record<string, any>): {
    readonly $value: Record<string, any>;
    readonly $type: "object";
};
export declare function _fcc_templateString($value: string): {
    readonly $value: string;
    readonly $type: "template-string";
};
export declare function _fcc_reactComponent($value: string): {
    readonly $value: string;
    readonly $type: "react-component";
};
export declare function getParsedTemplateHelpersString(): string;
//# sourceMappingURL=parser_template_helpers.d.ts.map