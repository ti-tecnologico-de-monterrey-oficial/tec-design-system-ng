#!/usr/bin/env node
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
const commander = __importStar(require("commander"));
const connect_1 = require("./commands/connect");
const helpers_1 = require("./connect/wizard/helpers");
require('dotenv').config();
async function run() {
    (0, helpers_1.maybePrefillWizardQuestionsForTesting)();
    const program = new commander.Command().version(require('./../package.json').version);
    program.enablePositionalOptions();
    (0, connect_1.addConnectCommandToProgram)(program);
    // Update command is temporarily disabled until we can show the correct update
    // command to React vs non-React users
    /*
    program
      .command('update')
      .description('Updates to the latest version of the Figma CLI')
      .action(() => {
        updateCli()
      })
    */
    program.parse(process.argv);
    if (program.args.length < 1) {
        program.outputHelp();
        process.exit(1);
    }
}
run();
//# sourceMappingURL=cli.js.map