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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybePrefillWizardQuestionsForTesting = maybePrefillWizardQuestionsForTesting;
exports.getIncludesGlob = getIncludesGlob;
exports.createEnvFile = createEnvFile;
exports.addTokenToEnvFile = addTokenToEnvFile;
exports.createCodeConnectConfig = createCodeConnectConfig;
exports.parseFilepathExport = parseFilepathExport;
exports.getFilepathExport = getFilepathExport;
exports.getComponentOptionsMap = getComponentOptionsMap;
exports.getFilepathExportsFromFiles = getFilepathExportsFromFiles;
exports.isValidFigmaUrl = isValidFigmaUrl;
const prettier = __importStar(require("prettier"));
const fs_1 = __importDefault(require("fs"));
const project_1 = require("../project");
const logging_1 = require("../../common/logging");
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const parser_common_1 = require("../parser_common");
const helpers_1 = require("../helpers");
function maybePrefillWizardQuestionsForTesting() {
    if (process.env.JEST_WORKER_ID && process.env.WIZARD_ANSWERS_TO_PREFILL) {
        const unescapedJson = JSON.parse(process.env.WIZARD_ANSWERS_TO_PREFILL.replace(/\\"/g, '"'));
        prompts_1.default.inject(unescapedJson);
    }
}
/**
 *
 * Gets the default include globs for config.parser with componentDirectory prepended
 * @param args
 * @param args.dir project root path
 * @param args.componentDirectory optional path to where includes should be limited to
 * @param args.config CodeConnectConfig
 * @returns array of include globs
 */
function getIncludesGlob({ dir, componentDirectory, config, }) {
    if (componentDirectory) {
        // use unix separators for config file globs
        const pathToComponentsDir = path_1.default.relative(dir, componentDirectory).replaceAll(path_1.default.sep, '/');
        if (config.parser === 'custom') {
            return [];
        }
        return project_1.DEFAULT_INCLUDE_GLOBS_BY_PARSER[config.parser].map((defaultIncludeGlob) => `${pathToComponentsDir}/${defaultIncludeGlob}`);
    }
    return project_1.DEFAULT_INCLUDE_GLOBS_BY_PARSER[config.parser];
}
async function createEnvFile({ dir, accessToken }) {
    // Create .env file
    const filePath = (0, project_1.getDefaultConfigPath)(dir);
    fs_1.default.writeFileSync((0, project_1.getEnvPath)(dir), `FIGMA_ACCESS_TOKEN="${accessToken}"`);
    logging_1.logger.info((0, logging_1.success)(`Created ${filePath}`));
}
function addTokenToEnvFile({ dir, accessToken }) {
    const filePath = (0, project_1.getDefaultConfigPath)(dir);
    fs_1.default.appendFileSync((0, project_1.getEnvPath)(dir), `\nFIGMA_ACCESS_TOKEN="${accessToken}"`);
    logging_1.logger.info((0, logging_1.success)(`Appended access token to ${filePath}`));
}
async function createCodeConnectConfig({ dir, componentDirectory, config, figmaUrl, }) {
    const label = project_1.DEFAULT_LABEL_PER_PARSER[config.parser];
    const includesGlob = getIncludesGlob({ dir, componentDirectory, config });
    const configJson = label
        ? `{
  "codeConnect": {
    "include": ["${includesGlob}"],
    "label": "${label}",
    "interactiveSetupFigmaFileUrl": "${figmaUrl}",
}
}`
        : `{
  "codeConnect": {
    "include": ["${includesGlob}"],
    "interactiveSetupFigmaFileUrl": "${figmaUrl}",
  }
}`;
    const formatted = await prettier.format(configJson, {
        parser: 'json',
    });
    const filePath = (0, project_1.getDefaultConfigPath)(dir);
    fs_1.default.writeFileSync(filePath, formatted);
    logging_1.logger.info((0, logging_1.success)(`Created ${filePath}`));
}
const FILEPATH_EXPORT_DELIMITER = '~';
function parseFilepathExport(filepathExport) {
    const delimiterLastIndex = filepathExport.lastIndexOf(FILEPATH_EXPORT_DELIMITER);
    if (delimiterLastIndex === -1) {
        return {
            filepath: filepathExport,
            exportName: null,
        };
    }
    return {
        filepath: filepathExport.substring(0, delimiterLastIndex),
        exportName: filepathExport.substring(delimiterLastIndex + 1),
    };
}
function getFilepathExport(filepath, exp) {
    return `${filepath}${FILEPATH_EXPORT_DELIMITER}${exp}`;
}
/**
 * Formats an array of filepathExports into a map of filepaths->exports
 *
 * @param filepathExports an array of components in the format `${filepath}~${componentName}
 * @returns a map of filepaths to an array of their exports. Array is empty if no exports found
 */
function getComponentOptionsMap(filepathExports) {
    return filepathExports.reduce((acc, filepathExport) => {
        const { filepath, exportName } = parseFilepathExport(filepathExport);
        acc[filepath] = acc[filepath] || [];
        if (exportName) {
            acc[filepath].push({
                title: exportName,
                value: getFilepathExport(filepath, exportName),
            });
        }
        return acc;
    }, {});
}
/**
 * Parses a ProjectInfo for any TS exports (or filepaths if not a TS project)
 *
 * @param projectInfo
 * @returns an array of components in the format `${filepath}~${componentName}
 */
function getFilepathExportsFromFiles(projectInfo, cmd) {
    return projectInfo.files.reduce((options, filepath) => {
        if (projectInfo.config.parser === 'react') {
            const { tsProgram } = projectInfo;
            if (!(0, parser_common_1.isFigmaConnectFile)(tsProgram, filepath, 'tsx')) {
                const checker = tsProgram.getTypeChecker();
                const sourceFile = tsProgram.getSourceFile(filepath);
                if (!sourceFile) {
                    if (cmd.verbose) {
                        logging_1.logger.warn(`Could not parse file for TypeScript: ${filepath}`);
                    }
                }
                else {
                    try {
                        const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile);
                        const exports = checker.getExportsOfModule(sourceFileSymbol);
                        exports.forEach((exp) => {
                            options.push(getFilepathExport(filepath, exp.getName()));
                        });
                    }
                    catch (e) {
                        if (cmd.verbose) {
                            logging_1.logger.warn(`Could not parse exports of file: ${filepath}`);
                        }
                        // ignore invalid files
                    }
                }
            }
        }
        else {
            options.push(filepath);
        }
        return options;
    }, []);
}
function isValidFigmaUrl(url) {
    try {
        const { hostname } = new URL(url);
        if (!hostname.includes('figma.com')) {
            return false;
        }
        return !!(0, helpers_1.parseFileKey)(url);
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=helpers.js.map