"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOutFileName = getOutFileName;
const path_1 = __importDefault(require("path"));
function getOutFileName({ outFile, outDir, sourceFilename, extension, }) {
    if (outFile) {
        return outFile;
    }
    const baseName = `${sourceFilename}.figma.${extension}`;
    if (outDir) {
        return path_1.default.join(outDir, baseName);
    }
    return path_1.default.join(process.env.INIT_CWD ?? process.cwd(), baseName);
}
//# sourceMappingURL=create_common.js.map