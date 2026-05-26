"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textContent = exports.className = exports.nestedProps = exports.string = exports.enum = exports.boolean = void 0;
exports.instanceType = instanceType;
exports.instance = instanceType;
exports.connect = connectType;
exports.instanceType = instanceType;
exports.instance = instanceType;
exports.children = childrenType;
const external_types_1 = require("../connect/external_types");
Object.defineProperty(exports, "boolean", { enumerable: true, get: function () { return external_types_1.booleanType; } });
Object.defineProperty(exports, "enum", { enumerable: true, get: function () { return external_types_1.enumType; } });
Object.defineProperty(exports, "string", { enumerable: true, get: function () { return external_types_1.stringType; } });
Object.defineProperty(exports, "nestedProps", { enumerable: true, get: function () { return external_types_1.nestedPropsType; } });
Object.defineProperty(exports, "className", { enumerable: true, get: function () { return external_types_1.classNameType; } });
Object.defineProperty(exports, "textContent", { enumerable: true, get: function () { return external_types_1.textContentType; } });
function connectType(_figmaNodeUrl, _meta) { }
function childrenType(_layers) {
    return {
        __tag: 'HtmlTemplateString',
    };
}
function instanceType(_figmaPropName) {
    return {
        __tag: 'HtmlTemplateString',
    };
}
//# sourceMappingURL=external.js.map