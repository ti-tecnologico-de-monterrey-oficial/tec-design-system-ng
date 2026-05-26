"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LogLevel = exports.underline = exports.reset = exports.highlight = exports.verbose = exports.debug = exports.warn = exports.info = exports.success = exports.error = void 0;
exports.exitWithError = exitWithError;
const chalk_1 = __importDefault(require("chalk"));
const console_1 = require("console");
const updates_1 = require("./updates");
// Redirect all console output to stderr, so that JSON output to stdout in parse
// mode can be piped to other commands
const console = new console_1.Console(process.stderr);
exports.error = chalk_1.default.red;
exports.success = chalk_1.default.green;
exports.info = chalk_1.default.white;
exports.warn = chalk_1.default.yellow;
exports.debug = chalk_1.default.gray;
exports.verbose = chalk_1.default.cyan;
exports.highlight = chalk_1.default.bold;
exports.reset = chalk_1.default.reset;
exports.underline = chalk_1.default.underline;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Nothing"] = 0] = "Nothing";
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Warn"] = 2] = "Warn";
    LogLevel[LogLevel["Info"] = 3] = "Info";
    LogLevel[LogLevel["Debug"] = 4] = "Debug";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
let logLevel = LogLevel.Info;
exports.logger = {
    setLogLevel: (level) => {
        logLevel = level;
    },
    error: (...msgs) => {
        if (logLevel >= LogLevel.Error)
            console.error((0, exports.error)(...msgs));
    },
    warn: (...msgs) => {
        if (logLevel >= LogLevel.Warn)
            console.warn((0, exports.warn)(...msgs));
    },
    info: (...msgs) => {
        if (logLevel >= LogLevel.Info)
            console.info((0, exports.info)(...msgs));
    },
    infoForce: (...msgs) => {
        console.info((0, exports.info)(...msgs));
    },
    debug: (...msgs) => {
        if (logLevel >= LogLevel.Debug)
            console.debug((0, exports.debug)(...msgs));
    },
};
/**
 * Exit the process with an error message. The `never` type tells TypeScript
 * that code after this will not be executed.
 *
 * @param msg Error message
 * @param errorCode Optional command exit code, defaults to 1
 */
function exitWithError(msg, errorCode = 1) {
    exports.logger.error(msg);
    (0, updates_1.exitWithUpdateCheck)(errorCode);
}
//# sourceMappingURL=logging.js.map