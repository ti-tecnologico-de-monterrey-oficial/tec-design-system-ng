"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.textContent = exports.className = exports.nestedProps = exports.string = exports.enum = exports.boolean = void 0;
exports.connect = connectType;
exports.children = childrenType;
const React = __importStar(require("react"));
const external_types_1 = require("../connect/external_types");
Object.defineProperty(exports, "boolean", { enumerable: true, get: function () { return external_types_1.booleanType; } });
Object.defineProperty(exports, "enum", { enumerable: true, get: function () { return external_types_1.enumType; } });
Object.defineProperty(exports, "string", { enumerable: true, get: function () { return external_types_1.stringType; } });
Object.defineProperty(exports, "nestedProps", { enumerable: true, get: function () { return external_types_1.nestedPropsType; } });
Object.defineProperty(exports, "className", { enumerable: true, get: function () { return external_types_1.classNameType; } });
Object.defineProperty(exports, "textContent", { enumerable: true, get: function () { return external_types_1.textContentType; } });
Object.defineProperty(exports, "instance", { enumerable: true, get: function () { return external_types_1.instanceType; } });
function connectType(_component, _figmaNodeUrl, _meta) { }
function childrenType(_layers) {
    return React.createElement('div');
}
//# sourceMappingURL=external.js.map