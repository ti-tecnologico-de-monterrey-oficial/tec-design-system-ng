"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.booleanType = booleanType;
exports.enumType = enumType;
exports.stringType = stringType;
exports.nestedPropsType = nestedPropsType;
exports.classNameType = classNameType;
exports.textContentType = textContentType;
exports.instanceType = instanceType;
function booleanType(_figmaPropName, _valueMapping) {
    if (_valueMapping) {
        return enumType(_figmaPropName, _valueMapping);
    }
    return true;
}
function enumType(_figmaPropName, _valueMapping) {
    return Object.values(_valueMapping)[0];
}
function stringType(_figmaPropName) {
    return '';
}
function nestedPropsType(_layer, props) {
    return props;
}
function classNameType(_className) {
    return '';
}
function textContentType(_layer) {
    return '';
}
function instanceType(_figmaPropName) {
    return undefined;
}
//# sourceMappingURL=external_types.js.map