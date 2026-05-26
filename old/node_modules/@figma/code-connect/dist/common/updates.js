"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withUpdateCheck = withUpdateCheck;
exports.exitWithUpdateCheck = exitWithUpdateCheck;
exports.updateCli = updateCli;
const chalk_1 = __importDefault(require("chalk"));
const logging_1 = require("./logging");
const child_process_1 = require("child_process");
const compare_versions_1 = require("compare-versions");
const fetch_1 = require("./fetch");
let updatedVersionAvailable = undefined;
let message = undefined;
// Wrap action handlers to check for updates or a message, and output a message
// after the action if any are available
function withUpdateCheck(
// The second to last argument is always the command args, but I couldn't work
// out how to model this with Typescript here
fn) {
    return (...args) => {
        // Get the args passed at the command line (the second to last argument)
        const commandArgs = args[args.length - 2];
        // Anything before that is a regular arg
        const restArgs = args.slice(0, -2);
        if (commandArgs.skipUpdateCheck) {
            return fn(...restArgs, commandArgs);
        }
        startUpdateCheck();
        const result = fn(...restArgs, commandArgs);
        if (result instanceof Promise) {
            result.finally(waitAndCheckForUpdates);
        }
        else {
            waitAndCheckForUpdates();
        }
    };
}
// Start checking for updates in the background. We don't wait for this before
// running the action, as we will show the result at the end
function startUpdateCheck() {
    fetch_1.request
        .get('https://api.github.com/repos/figma/code-connect/releases/latest')
        .then((response) => {
        const latestVersion = response.data.tag_name.replace(/^v/, '');
        const currentVersion = require('../../package.json').version;
        if ((0, compare_versions_1.compareVersions)(latestVersion, currentVersion) === 1) {
            updatedVersionAvailable = latestVersion;
        }
        else {
            updatedVersionAvailable = false;
        }
    })
        .catch(() => {
        // Silently fail if we can't check for updates
        updatedVersionAvailable = false;
    });
}
// Wait for up to 1 second for the result of update checking to be available,
// and output a message if there is an update or a message. If there is no
// result after the timeout, the app will exit.
async function waitAndCheckForUpdates() {
    for (let i = 0; i < 10; i++) {
        if (updatedVersionAvailable !== undefined) {
            break;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    maybeShowUpdateMessage();
}
// Exit the process, first checking if there is an update or message available.
// Unlike waitAndCheckForUpdates, this will not wait for the update check to
// complete, so if the request has not completed yet, nothing will be shown.
// This is to avoid confusion about when the process _actually_ exits.
function exitWithUpdateCheck(errorCode = 1) {
    maybeShowUpdateMessage();
    process.exit(errorCode);
}
function getUpdateCommand() {
    return 'npm update -g @figma/code-connect';
}
function maybeShowUpdateMessage() {
    if (updatedVersionAvailable) {
        logging_1.logger.warn(`\nA new version of the Figma CLI is available. v${require('../../package.json').version} is currently installed, and the latest version available is v${updatedVersionAvailable}.

To update, run ${chalk_1.default.whiteBright('npm install @figma/code-connect@latest')} for React or HTML, or ${chalk_1.default.whiteBright('npm install -g @figma/code-connect@latest')} for other targets (or if you have Code Connect installed globally).`);
    }
    if (message) {
        logging_1.logger.warn(`\n${message}`);
    }
}
function updateCli() {
    (0, child_process_1.execSync)(getUpdateCommand(), { stdio: 'inherit' });
}
//# sourceMappingURL=updates.js.map