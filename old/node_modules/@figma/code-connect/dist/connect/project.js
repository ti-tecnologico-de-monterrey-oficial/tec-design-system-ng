"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LABEL_PER_PARSER = exports.DEFAULT_INCLUDE_GLOBS_BY_PARSER = void 0;
exports.determineConfigFromProject = determineConfigFromProject;
exports.determineLabelFromProject = determineLabelFromProject;
exports.getGitRemoteURL = getGitRemoteURL;
exports.getGitRepoAbsolutePath = getGitRepoAbsolutePath;
exports.getGitRepoDefaultBranchName = getGitRepoDefaultBranchName;
exports.getRemoteFileUrl = getRemoteFileUrl;
exports.getStorybookUrl = getStorybookUrl;
exports.getDefaultConfigPath = getDefaultConfigPath;
exports.getEnvPath = getEnvPath;
exports.parseOrDetermineConfig = parseOrDetermineConfig;
exports.checkForEnvAndToken = checkForEnvAndToken;
exports.getProjectInfoFromConfig = getProjectInfoFromConfig;
exports.getProjectInfo = getProjectInfo;
exports.getReactProjectInfo = getReactProjectInfo;
exports.getTsProgram = getTsProgram;
exports.mapImportPath = mapImportPath;
const child_process_1 = require("child_process");
const glob_1 = require("glob");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const typescript_1 = __importDefault(require("typescript"));
const logging_1 = require("../common/logging");
const chalk_1 = __importDefault(require("chalk"));
const readline_1 = __importDefault(require("readline"));
// We use an old version of this dep as I couldn't get ES modules working
const find_up_1 = __importDefault(require("find-up"));
const helpers_1 = require("./helpers");
const DEFAULT_CONFIG_FILE_NAME = 'figma.config.json';
const ENV_FILE_NAME = '.env';
exports.DEFAULT_INCLUDE_GLOBS_BY_PARSER = {
    react: [`**/*.{tsx,jsx}`],
    html: [`**/*.{ts,js}`],
    swift: ['**/*.swift'],
    compose: ['**/*.kt'],
    // include globs should be included in configs for custom parsers
    custom: undefined,
    __unit_test__: [''],
};
exports.DEFAULT_LABEL_PER_PARSER = {
    react: 'React',
    html: 'Web Components',
};
function determineConfigFromProject(dir, exitOnError = true) {
    const parser = determineParserFromProject(dir);
    if (parser) {
        const label = determineLabelFromProject(dir);
        if (label) {
            return { codeConnect: { parser, label } };
        }
        return { codeConnect: { parser } };
    }
    if (exitOnError) {
        (0, logging_1.exitWithError)(`Code Connect was not able to determine your project type, and no config file was found. Please ensure you are running Code Connect from your project root. You may need to create a config file specifying which parser to use. See https://github.com/figma/code-connect/ for instructions.`);
    }
}
function showParserMessage(message) {
    logging_1.logger.info(message +
        '. If this is incorrect, please check you are running Code Connect from your project root, or add a `parser` key to your config file. See https://github.com/figma/code-connect for more information.');
}
function packageJsonContains(packageJson, dependency) {
    return ((packageJson.dependencies && packageJson.dependencies[dependency]) ||
        (packageJson.peerDependencies && packageJson.peerDependencies[dependency]) ||
        (packageJson.devDependencies && packageJson.devDependencies[dependency]));
}
// Walk up from the given directory looking for the first directory which
// matches heuristics for the platforms we support. This means that e.g. if you
// have a Swift project inside a React project, we'll detect Swift. This enables
// users to run commands from anywhere inside their project, rather than having
// to run from the root (the same way npm works).
function determineParserFromProject(dir) {
    let parser;
    find_up_1.default.sync((currentDir) => {
        const packageJsonPath = path_1.default.join(currentDir, 'package.json');
        if (fs_1.default.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf-8'));
            if (packageJsonContains(packageJson, 'react')) {
                showParserMessage(`Using "react" parser as package.json containing a "react" ${packageJson.dependencies && packageJson.dependencies['react']
                    ? 'dependency'
                    : 'peer dependency'} was found in ${currentDir}`);
                parser = 'react';
                return find_up_1.default.stop;
            }
            else {
                showParserMessage(`Using "html" parser as package.json containing no other supported web frameworks was found in ${currentDir}`);
                parser = 'html';
                return find_up_1.default.stop;
            }
        }
        else {
            if ((0, glob_1.globSync)([`${currentDir}/*.xcodeproj`, `${currentDir}/Package.swift`]).length > 0) {
                showParserMessage(`Using "swift" parser as a file matching *.xcodeproj or Package.swift was found in ${currentDir}`);
                parser = 'swift';
                return find_up_1.default.stop;
            }
            else if ((0, glob_1.globSync)([`${currentDir}/build.gradle.kts`]).length > 0) {
                showParserMessage(`Using "compose" parser as a file matching build.gradle.kts was found in ${currentDir}`);
                parser = 'compose';
                return find_up_1.default.stop;
            }
            else if ((0, glob_1.globSync)([`${currentDir}/build.gradle`]).length > 0) {
                showParserMessage(`Using "compose" parser as a file matching build.gradle was found in ${currentDir}`);
                parser = 'compose';
                return find_up_1.default.stop;
            }
        }
    }, { cwd: dir });
    return parser;
}
// Similarly to determineParserFromProject, this walks up looking for a
// package.json containing a library which we support and we set a specific
// label for. An example is Angular, which is detected as 'html' parser, but we
// set a different label for it.
function determineLabelFromProject(dir) {
    function showMessage(libraryName, moduleName, packageJson, currentDir) {
        showParserMessage(`Using "${libraryName}" label as package.json containing a "${moduleName}" ${packageJson.dependencies && packageJson.dependencies[moduleName]
            ? 'dependency'
            : 'peer dependency'} was found in ${currentDir}`);
    }
    let label;
    find_up_1.default.sync((currentDir) => {
        const packageJsonPath = path_1.default.join(currentDir, 'package.json');
        if (fs_1.default.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf-8'));
            if (packageJsonContains(packageJson, 'angular')) {
                showMessage('Angular', 'angular', packageJson, currentDir);
                label = 'Angular';
                return find_up_1.default.stop;
            }
            else if (packageJsonContains(packageJson, 'vue')) {
                showMessage('Vue', 'vue', packageJson, currentDir);
                label = 'Vue';
                return find_up_1.default.stop;
            }
        }
    }, { cwd: dir });
    return label;
}
async function checkForLegacyConfig(config, configFilePath) {
    const { codeConnect } = config;
    const newConfigBase = {
        ...(codeConnect.include ? { include: codeConnect.include } : {}),
        ...(codeConnect.exclude ? { exclude: codeConnect.exclude } : {}),
        ...(codeConnect.documentUrlSubstitutions
            ? { documentUrlSubstitutions: codeConnect.documentUrlSubstitutions }
            : {}),
    };
    const maybeNewReactConfig = {
        codeConnect: { parser: 'react', ...codeConnect.react, ...newConfigBase },
    };
    const maybeNewSwiftConfig = {
        codeConnect: { parser: 'swift', ...codeConnect.swift, ...newConfigBase },
    };
    if (codeConnect.react && codeConnect.swift) {
        logging_1.logger.error(`${chalk_1.default.bold('⚠️  Your Code Connect configuration needs to be updated\n')}`);
        logging_1.logger.infoForce(`Code Connect is migrating from a single configuration file for all supported languages, to individual configuration files for each language.

As part of this change, your Code Connect configuration file needs to be split into two configuration files, one for React and one for Swift.

The React ${chalk_1.default.bold('figma.config.json')} should be located in your React project root and contain:

${JSON.stringify(maybeNewReactConfig, null, 2)}

The Swift ${chalk_1.default.bold('figma.config.json')} should be located in your Swift project root and contain:

${JSON.stringify(maybeNewSwiftConfig, null, 2)}

You will need to check any include/exclude paths are correct relative to the new locations.`);
        (0, helpers_1.exitWithFeedbackMessage)(1);
    }
    if (codeConnect.react || codeConnect.swift) {
        const platform = codeConnect.react ? 'React' : 'Swift';
        const newConfig = codeConnect.react ? maybeNewReactConfig : maybeNewSwiftConfig;
        logging_1.logger.infoForce(`${chalk_1.default.bold('⚠️  Your Code Connect configuration needs to be updated')}

Code Connect is migrating from a single configuration file for all supported languages, to individual configuration files for each language.

As part of this change, your Code Connect configuration file needs to be updated to remove the ${chalk_1.default.bold(platform.toLowerCase())} key and add ${chalk_1.default.bold(`{ parser: "${platform.toLowerCase()}" }`)}:

${JSON.stringify(newConfig, null, 2)}

Code Connect can make this change for you automatically, or you can do it manually.

Please also ensure your configuration file is located in your ${platform} project root. If you move the configuration file, you will need to check any include/exclude paths are correct relative to the new location.

Please raise an issue at https://github.com/figma/code-connect/issues if you have any problems.

---
`);
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stderr,
        });
        const updateConfig = await new Promise((resolve) => {
            rl.question('Would you like Code Connect to update your configuration file for you? (y/n) ', (answer) => {
                resolve(answer);
            });
        });
        rl.close();
        if (updateConfig.toLowerCase() === 'y') {
            fs_1.default.writeFileSync(configFilePath, JSON.stringify(newConfig, null, 2));
            logging_1.logger.infoForce(`\nConfiguration file updated`);
            return newConfig;
        }
        else {
            (0, logging_1.exitWithError)(`\nPlease update your configuration file manually`);
        }
    }
    return config;
}
async function parseConfig(configFilePath, dir) {
    try {
        const rawData = fs_1.default.readFileSync(configFilePath, 'utf-8');
        const rawConfig = JSON.parse(rawData);
        const config = await checkForLegacyConfig(rawConfig, configFilePath);
        if (!config.codeConnect?.parser) {
            const parser = determineParserFromProject(dir);
            if (!parser) {
                logging_1.logger.error(`Code Connect was not able to determine your project type, and no \`parser\` was specified. Please ensure you are running Code Connect from your project root. You may need to add a \`parser\` key to your config file, specifying which parser to use. See https://github.com/figma/code-connect/ for instructions.`);
                (0, helpers_1.exitWithFeedbackMessage)(1);
            }
            if (!config.codeConnect) {
                config.codeConnect = { parser };
            }
            // TS errors if this is in an else
            config.codeConnect.parser = parser;
        }
        if (!config.codeConnect?.label) {
            const label = determineLabelFromProject(dir);
            if (label) {
                config.codeConnect.label = label;
            }
        }
        return config;
    }
    catch (error) {
        console.error('Error parsing config file:', error);
        return undefined;
    }
}
function getGitRemoteURL(repoPath) {
    try {
        const spawn = (0, child_process_1.spawnSync)('git', ['config', '--get', 'remote.origin.url'], {
            cwd: repoPath,
        });
        const output = spawn.stdout;
        return (output || '').toString().trim();
    }
    catch (error) {
        console.error('Error getting git remote URL:', error);
        return '';
    }
}
/**
 * Uses `git rev-parse` to find absolute path to the root of the git repository
 */
function getGitRepoAbsolutePath(filePath) {
    try {
        const dirPath = fs_1.default.statSync(filePath).isDirectory() ? filePath : path_1.default.dirname(filePath);
        const spawn = (0, child_process_1.spawnSync)('git', ['rev-parse', '--show-toplevel'], {
            cwd: dirPath,
        });
        const output = spawn.stdout;
        return ((output || '')
            .toString()
            // git always uses /, but other Node API use \ on Windows
            .replaceAll('/', path_1.default.sep)
            .trim());
    }
    catch (error) {
        console.error('Error running `git rev-parse`:', error.toString().split('\n')[0]);
        return '';
    }
}
/**
 * Find the default branch name (master or main) for the git repository
 */
function getGitRepoDefaultBranchName(repoPath) {
    const DEFAULT_BRANCH_NAME = 'master';
    try {
        // Get all git branches
        const gitBranchResult = (0, child_process_1.spawnSync)('git', ['branch', '-r'], {
            cwd: repoPath,
        });
        if (!gitBranchResult.stdout) {
            return DEFAULT_BRANCH_NAME;
        }
        const branches = gitBranchResult.stdout
            .toString()
            .trim()
            .split('\n')
            .map((s) => s.trim());
        // Check if origin/main exists, otherwise assume master
        if (branches.includes('origin/main')) {
            return 'main';
        }
        else {
            return DEFAULT_BRANCH_NAME;
        }
    }
    catch (error) {
        console.error('Error getting git default branch name:', error.toString().split('\n')[0]);
        return DEFAULT_BRANCH_NAME;
    }
}
/**
 * Finds the URL of a remote file
 * @param filePath absolute file path on disk
 * @param repoURL remote URL, can be a GitHub, GitLab, Bitbucket, etc. URL.
 * @returns
 */
function getRemoteFileUrl(filePath, repoURL) {
    if (!repoURL) {
        return '';
    }
    filePath = filePath.replaceAll(path_1.default.sep, '/');
    let url = repoURL.trim();
    if (url.startsWith('git@')) {
        url = url.replace(':', '/');
        url = url.replace('git@', 'https://');
    }
    url = url.replace(/\.git$/, '');
    // the folder of the git repo on disk could be named differently,
    // so we need to find the relative path of the file to the root of the repo
    // and append that to the remote URL
    const repoAbsPath = getGitRepoAbsolutePath(filePath)
        // Windows uses \ as the path separator, so replace with /
        .replaceAll(path_1.default.sep, '/');
    const defaultBranch = getGitRepoDefaultBranchName(repoAbsPath);
    const index = filePath.indexOf(repoAbsPath);
    if (index === -1) {
        return '';
    }
    const relativeFilePath = filePath.substring(index + repoAbsPath.length);
    if (url.includes('github.com')) {
        return `${url}/blob/${defaultBranch}${relativeFilePath}`;
    }
    else if (url.includes('gitlab.com')) {
        return `${url}/-/blob/${defaultBranch}${relativeFilePath}`;
    }
    else if (url.includes('bitbucket.org')) {
        return `${url}/src/${defaultBranch}${relativeFilePath}`;
    }
    else if (url.includes('dev.azure.com')) {
        // `git config --get remote.origin.url` for azure repos will return different strings depending on if it was
        // cloned with https or ssh. We need to convert this to a valid URL like "https://dev.azure.com/org/repo/_git/repo?path=/"
        if (repoURL.startsWith('git@')) {
            // ssh: "git@ssh.dev.azure.com:v3/org/repo/repo"
            const [org, project1, project2] = repoURL.split('/').slice(-3);
            return `https://dev.azure.com/${org}/${project1}/_git/${project2}?path=${relativeFilePath}&branch=${defaultBranch}`;
        }
        else {
            // https: "https://org@dev.azure.com/org/repo/_git/repo"
            const [_, url] = repoURL.split('@');
            return `https://${url}?path=${relativeFilePath}&branch=${defaultBranch}`;
        }
    }
    else {
        logging_1.logger.debug('Unknown remote URL - assuming GitHub Enterprise', url);
        return `${url}/blob/${defaultBranch}${relativeFilePath}`;
    }
}
function getStorybookUrl(filePath, storybookUrl) {
    // the folder of the git repo on disk could be named differently,
    // so we need to find the relative path of the file to the root of the repo
    // and append that to the remote URL
    const repoAbsPath = getGitRepoAbsolutePath(filePath).replaceAll(path_1.default.sep, '/');
    const index = filePath.indexOf(repoAbsPath);
    if (index === -1) {
        return '';
    }
    const relativeFilePath = filePath.substring(index + repoAbsPath.length + 1); // +1 to remove the leading slash
    const storybookComponentPath = relativeFilePath
        .trim()
        .replace(/[\s|_]/g, '-')
        .replace(/\.[jt]sx?$/, '')
        .replaceAll('\\', '/')
        .split('/')
        .join('-');
    return `${storybookUrl}/?path=/docs/${storybookComponentPath}`;
}
function mapToAbsolutePaths(globPaths, absPath) {
    // glob doesn't like Windows paths so convert to *nix format
    return globPaths.map((globPath) => `${absPath.replaceAll(path_1.default.sep, '/')}/${globPath}`);
}
function getDefaultConfigPath(dir) {
    return path_1.default.resolve(path_1.default.join(dir, DEFAULT_CONFIG_FILE_NAME));
}
function getEnvPath(dir) {
    return path_1.default.resolve(path_1.default.join(dir, ENV_FILE_NAME));
}
async function parseOrDetermineConfig(dir, configPath) {
    const configFilePath = configPath ? path_1.default.resolve(configPath) : getDefaultConfigPath(dir);
    const hasConfigFile = fs_1.default.existsSync(configFilePath);
    if (!hasConfigFile) {
        if (configPath) {
            logging_1.logger.warn(`${configPath} does not exist, proceeding with default options`);
        }
        else {
            logging_1.logger.info(`No config file found in ${dir}, proceeding with default options`);
        }
    }
    const globalConfig = hasConfigFile
        ? await parseConfig(configFilePath, dir)
        : determineConfigFromProject(dir);
    if (!globalConfig) {
        throw new Error(`Error parsing config file: ${configFilePath}`);
    }
    if (!globalConfig.codeConnect) {
        throw new Error(`No options specified under 'codeConnect' in config file: ${configFilePath}`);
    }
    const config = globalConfig.codeConnect;
    if (hasConfigFile) {
        if (!config) {
            logging_1.logger.info(`Config file found, but no options specified under 'codeConnect'. Parsing ${dir}`);
        }
        else if (config && !config.include) {
            logging_1.logger.info(`Config file found, but no include globs specified. Parsing ${dir}`);
        }
        else {
            logging_1.logger.info(`Config file found, parsing ${dir} using specified include globs`);
        }
    }
    return {
        config,
        hasConfigFile,
    };
}
/**
 * Check if a .env file exists in the provided directory and if it contains a FIGMA_ACCESS_TOKEN.
 */
async function checkForEnvAndToken(dir) {
    // Scan the provided directory for a .env file
    const envPath = await (0, find_up_1.default)('.env', { cwd: dir });
    if (!envPath) {
        // No .env file found
        return {
            hasEnvFile: false,
            envHasFigmaToken: false,
        };
    }
    // Read the contents of the .env file
    const envContents = fs_1.default.readFileSync(envPath, 'utf-8');
    // Determine if the .env file contains a FIGMA_ACCESS_TOKEN
    const envVars = envContents.split('\n').reduce((acc, line) => {
        const [key, value] = line.split('=');
        acc[key] = value;
        return acc;
    }, {});
    const figmaAccessToken = envVars['FIGMA_ACCESS_TOKEN'];
    return {
        hasEnvFile: true,
        envHasFigmaToken: !!figmaAccessToken,
    };
}
/**
 * Gets information about a project from config.
 *
 * @param dir Directory containing the project
 * @param config Code Connect config
 * @returns Object containing information about the project
 */
async function getProjectInfoFromConfig(dir, config) {
    const absPath = path_1.default.resolve(dir);
    const remoteUrl = getGitRemoteURL(absPath);
    const defaultIncludeGlobs = config.parser
        ? exports.DEFAULT_INCLUDE_GLOBS_BY_PARSER[config.parser]
        : undefined;
    // always ignore any `node_modules` folders in react projects
    const defaultExcludeGlobs = config.parser
        ? ({
            react: ['node_modules/**'],
            html: ['node_modules/**'],
            swift: [],
            compose: [],
            custom: [],
            __unit_test__: [],
        }[config.parser] ?? [])
        : [];
    const includeGlobs = config.include || defaultIncludeGlobs;
    const excludeGlobs = config.exclude
        ? [...config.exclude, ...defaultExcludeGlobs]
        : defaultExcludeGlobs;
    if (config.parser === 'custom' && (!includeGlobs || includeGlobs.length === 0)) {
        (0, logging_1.exitWithError)('Include globs must specified in config file for custom parsers');
    }
    if (!includeGlobs) {
        (0, logging_1.exitWithError)('No include globs specified in config file');
    }
    const files = (0, glob_1.globSync)(mapToAbsolutePaths(includeGlobs, absPath), {
        nodir: true,
        ignore: mapToAbsolutePaths(excludeGlobs, absPath),
        // Otherwise this is true on *nix and false on Windows
        absolute: true,
    });
    if (files.length > 10000) {
        logging_1.logger.warn(`Matching number of files was excessively large (${files.length}) - consider using more specific include/exclude globs in your config file.`);
    }
    return {
        absPath,
        remoteUrl,
        config,
        files,
    };
}
/**
 * Gets information about a project from a directory.
 *
 * @param dir Directory containing the project
 * @param configPath Optional path to Code Connect config file
 * @returns Object containing information about the project
 */
async function getProjectInfo(dir, configPath) {
    const { config } = await parseOrDetermineConfig(dir, configPath);
    return getProjectInfoFromConfig(dir, config);
}
function getReactProjectInfo(projectInfo) {
    const tsProgram = getTsProgram(projectInfo);
    return {
        ...projectInfo,
        tsProgram,
    };
}
function getTsProgram(projectInfo) {
    const compilerOptions = {
        // This ensures the compiler can resolve imports such as "ui/button" when a
        // baseUrl is configured in the tsconfig of the project. We probably want a more
        // sophisticated way to parse the users tsconfig and pass it to the compiler eventually.
        baseUrl: projectInfo.absPath,
        // TODO: not sure why Node10 is needed her, but otherwise module resolution for
        // pnpm workspaces won't work
        moduleResolution: typescript_1.default.ModuleResolutionKind.Node10,
        paths: 'paths' in projectInfo.config ? (projectInfo.config.paths ?? {}) : {},
        allowJs: true,
    };
    return typescript_1.default.createProgram(projectInfo.files, compilerOptions);
}
/**
 * Change an imported path for a component like `./button` to e.g `@ui/button`, based on the config file.
 * Note that `filePath` here is the path to the source file on disk, not the module specifier.
 *
 * @param filePath
 * @param config
 * @returns
 */
function mapImportPath(filePath, config) {
    // Takes the reversed path and pattern parts and check if they match
    function isMatch(patternParts, pathParts) {
        if (patternParts[0] === '*') {
            // if the path is just a wildcard and nothing else, match any import
            if (patternParts.length === 1) {
                return true;
            }
            // if the _next_ part in the pattern does not exist in the path, it's not
            // a match.
            const index = pathParts.indexOf(patternParts[1]);
            if (index === -1) {
                return false;
            }
            // Skip to the matching part in the path and match the rest of
            // the pattern. E.g if the pattern is `*/ui/src` (reversed) and the path is
            // `button.tsx/components/ui/src`, we skip to `ui` and match the rest of the
            // pattern.
            patternParts = patternParts.slice(1);
            pathParts = pathParts.slice(index);
        }
        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i] !== pathParts[i]) {
                return false;
            }
        }
        return true;
    }
    for (const [key, value] of Object.entries(config.importPaths || {})) {
        // Do a partial match from the end of the path
        const patternParts = key.split('/').reverse();
        const pathParts = filePath.split('/').reverse();
        if (pathParts.length < patternParts.length) {
            continue;
        }
        // If the mapped path ends with a wildcard we want to keep the filename in
        // the final path (for non-index imports)
        if (isMatch(patternParts, pathParts)) {
            return value.endsWith('*') ? `${value.slice(0, -1)}${pathParts[0].split('.')[0]}` : value;
        }
    }
    return null;
}
//# sourceMappingURL=project.js.map