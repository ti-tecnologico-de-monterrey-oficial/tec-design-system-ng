"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileIfExists = getFileIfExists;
const child_process_1 = require("child_process");
// Check if a file matching a search pattern exists, and return the first match if so
function getFileIfExists(cwd, search) {
    return (0, child_process_1.execSync)(`find . -maxdepth 1 -name ${search}`, { cwd }).toString().trim().split('\n')[0];
}
//# sourceMappingURL=get_file_if_exists.js.map