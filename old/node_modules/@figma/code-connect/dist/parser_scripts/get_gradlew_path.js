"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGradleWrapperPath = getGradleWrapperPath;
exports.getGradleWrapperExecutablePath = getGradleWrapperExecutablePath;
const logging_1 = require("../common/logging");
const get_file_if_exists_1 = require("./get_file_if_exists");
const path_1 = __importDefault(require("path"));
// Get the enclosing directory of the gradle wrapper
async function getGradleWrapperPath(cwd, gradleWrapperPath) {
    const gradlePath = gradleWrapperPath || (0, get_file_if_exists_1.getFileIfExists)(cwd, 'gradlew');
    if (!gradlePath) {
        (0, logging_1.exitWithError)('Could not find the location of the gradlew in your project. You can specify the location of your gradlew file with the `gradleWrapperPath` config option.');
    }
    return path_1.default.dirname(gradlePath);
}
// Get the path for the executable
function getGradleWrapperExecutablePath(gradleWrapperDir) {
    return gradleWrapperDir === '.' ? './gradlew' : path_1.default.join(gradleWrapperDir, 'gradlew');
}
//# sourceMappingURL=get_gradlew_path.js.map