"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.narrowDownComponentsPerPage = narrowDownComponentsPerPage;
exports.getComponentChoicesForPrompt = getComponentChoicesForPrompt;
exports.addPayload = addPayload;
exports.createCodeConnectFiles = createCodeConnectFiles;
exports.convertRemoteFileUrlToRelativePath = convertRemoteFileUrlToRelativePath;
exports.getUnconnectedComponentsAndConnectedComponentMappings = getUnconnectedComponentsAndConnectedComponentMappings;
exports.runWizard = runWizard;
const connect_1 = require("../../commands/connect");
const prompts_1 = __importDefault(require("prompts"));
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");
const figma_rest_api_1 = require("../figma_rest_api");
const logging_1 = require("../../common/logging");
const project_1 = require("../../connect/project");
const validation_1 = require("../validation");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const parser_executable_types_1 = require("../parser_executable_types");
const create_1 = require("../create");
const create_2 = require("../../react/create");
const boxen_1 = __importDefault(require("boxen"));
const helpers_2 = require("./helpers");
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const parser_executables_1 = require("../parser_executables");
const ora_1 = __importDefault(require("ora"));
const zod_validation_error_1 = require("zod-validation-error");
const autolinking_1 = require("./autolinking");
const prop_mapping_helpers_1 = require("./prop_mapping_helpers");
const fetch_1 = require("../../common/fetch");
const NONE = '(None)';
const MAX_COMPONENTS_TO_MAP = 40;
function clearQuestion(prompt, answer) {
    const displayedAnswer = (Array.isArray(prompt.choices) && prompt.choices.find((c) => c.value === answer)?.title) ||
        answer;
    const lengthOfDisplayedQuestion = (0, strip_ansi_1.default)(prompt.message).length + (0, strip_ansi_1.default)(displayedAnswer).length + 5; // 2 chars before, 3 chars between Q + A
    const rowsToRemove = Math.ceil(lengthOfDisplayedQuestion / process.stdout.columns);
    process.stdout.moveCursor(0, -rowsToRemove);
    process.stdout.clearScreenDown();
}
async function fetchTopLevelComponentsFromFile({ accessToken, figmaUrl, cmd, }) {
    // TODO enter create flow if node-id specified
    const fileKey = (0, helpers_1.parseFileKey)(figmaUrl);
    const apiUrl = (0, figma_rest_api_1.getApiUrl)(figmaUrl ?? '') + `/code_connect/${fileKey}/cli_data`;
    try {
        const spinner = (0, ora_1.default)({
            text: `Fetching component information from ${cmd.verbose ? `${apiUrl}\n` : 'Figma...'}`,
            color: 'green',
        }).start();
        const response = await (process.env.CODE_CONNECT_MOCK_DOC_RESPONSE
            ? Promise.resolve({
                response: { status: 200 },
                data: JSON.parse(fs_1.default.readFileSync(process.env.CODE_CONNECT_MOCK_DOC_RESPONSE, 'utf-8')),
            })
            : fetch_1.request.get(apiUrl, {
                headers: {
                    'X-Figma-Token': accessToken,
                    'Content-Type': 'application/json',
                },
            })).finally(() => {
            if (cmd.verbose) {
                spinner.stopAndPersist();
            }
            else {
                spinner.stop();
            }
        });
        if (response.response.status === 200) {
            return (0, helpers_1.findComponentsInDocument)(response.data.document).filter(({ id }) => id in response.data.componentSets || !response.data.components[id].componentSetId);
        }
        else {
            logging_1.logger.error(`Failed to fetch components from Figma with status: ${response.response.status}`);
            logging_1.logger.debug('Failed to fetch components from Figma with Body:', response.data);
        }
    }
    catch (err) {
        if ((0, fetch_1.isFetchError)(err)) {
            if (err.response) {
                logging_1.logger.error(`Failed to fetch components from Figma (${err.response.status}): ${err.response.status} ${err.data?.err ?? err.data?.message}`);
            }
            else {
                logging_1.logger.error(`Failed to fetch components from Figma: ${err.message}`);
            }
            logging_1.logger.debug(JSON.stringify(err.data));
        }
        else {
            logging_1.logger.error(err);
        }
        (0, helpers_1.exitWithFeedbackMessage)(1);
    }
}
/**
 * enable selection of a subset of components per page
 * @param components to narrow down from
 * @returns components narrowed down to the selected pages
 */
async function narrowDownComponentsPerPage(components, pages) {
    const createTitle = (name, id, pad) => {
        const componentsInPage = components.filter((c) => c.pageId === id);
        let namesPreview = componentsInPage
            .slice(0, 4)
            .map((c) => c.name)
            .join(', ');
        namesPreview = componentsInPage.length > 4 ? `${namesPreview}, ...` : `${namesPreview}`;
        const componentWord = componentsInPage.length === 1 ? 'Component' : 'Components';
        return `${name.padEnd(pad, ' ')} - ${componentsInPage.length} ${componentWord} ${chalk_1.default.dim(`(${namesPreview})`)}`;
    };
    const longestPageName = Math.max(...Object.values(pages).map((name) => name.length));
    let pagesToMap = [];
    console.info('');
    while (true) {
        const { pagesToMap_temp } = await askQuestion({
            type: 'multiselect',
            name: 'pagesToMap_temp',
            message: `Select the pages with the Figma components you'd like to map (Press ${chalk_1.default.green('space')} to select and ${chalk_1.default.green('enter')} to continue)`,
            instructions: false,
            choices: Object.entries(pages).map(([id, name]) => ({
                title: createTitle(name, id, longestPageName),
                value: id,
            })),
        });
        if (!pagesToMap_temp || pagesToMap_temp.length === 0) {
            logging_1.logger.warn('Select at least one page to continue.');
            continue;
        }
        pagesToMap = pagesToMap_temp;
        break;
    }
    return components.filter((c) => pagesToMap.includes(c.pageId));
}
/**
 * Asks a Prompts question and adds spacing
 * @param question Prompts question
 * @returns Prompts answer
 */
async function askQuestion(question) {
    const answers = await (0, prompts_1.default)(question);
    logging_1.logger.info('');
    return answers;
}
/**
 * Asks a Prompts question and exits the process if user cancels
 * @param question Prompts question
 * @returns Prompts answer
 */
async function askQuestionOrExit(question) {
    const answers = await askQuestion(question);
    if (!Object.keys(answers).length) {
        return process.exit(0);
    }
    return answers;
}
/**
 * Asks a Prompts question and shows an exit confirmation if user cancels.
 * This should be used for questions further along in the wizard.
 * @param question Prompts question
 * @returns Prompts answer
 */
async function askQuestionWithExitConfirmation(question) {
    while (true) {
        const answers = await askQuestion(question);
        if (Object.keys(answers).length) {
            return answers;
        }
        const { shouldExit } = await askQuestion({
            type: 'select',
            name: 'shouldExit',
            message: 'Are you sure you want to exit?',
            choices: [
                {
                    title: 'Yes',
                    value: 'yes',
                },
                {
                    title: 'No',
                    value: 'no',
                },
            ],
        });
        // also exit if no answer provided (esc / ctrl+c)
        if (!shouldExit || shouldExit === 'yes') {
            process.exit(0);
        }
    }
}
function formatComponentTitle(componentName, filepathExport, pad) {
    const fileExport = filepathExport ? (0, helpers_2.parseFilepathExport)(filepathExport) : null;
    const nameLabel = `${chalk_1.default.dim('Figma component:')} ${componentName.padEnd(pad, ' ')}`;
    const filepathLabel = fileExport ? fileExport.filepath : '-';
    const exportNote = fileExport?.exportName ? ` (${fileExport.exportName})` : '';
    const linkedLabel = `↔️ ${chalk_1.default.dim('Code Definition:')} ${filepathLabel}${exportNote}`;
    return `${nameLabel}  ${linkedLabel}`;
}
function getComponentChoicesForPrompt(components, linkedNodeIdsToFilepathExports, connectedComponentsMappings, dir) {
    const longestNameLength = [...components, ...connectedComponentsMappings].reduce((longest, component) => Math.max(longest, 'name' in component ? component.name.length : component.componentName.length), 0);
    const nameCompare = (a, b) => a.name.localeCompare(b.name);
    const linkedComponents = components
        .filter((c) => !!linkedNodeIdsToFilepathExports[c.id])
        .sort(nameCompare);
    const unlinkedComponents = components
        .filter((c) => !linkedNodeIdsToFilepathExports[c.id])
        .sort(nameCompare);
    const formatComponentChoice = (c) => {
        const filepathExport = linkedNodeIdsToFilepathExports[c.id]
            ? path_1.default.relative(dir, linkedNodeIdsToFilepathExports[c.id])
            : null;
        return {
            title: formatComponentTitle(c.name, filepathExport, longestNameLength),
            value: c.id,
            description: `${chalk_1.default.green('Edit Match')}`,
        };
    };
    return [
        ...linkedComponents.map(formatComponentChoice),
        ...unlinkedComponents.map(formatComponentChoice),
        ...connectedComponentsMappings.map((connectedComponent) => ({
            title: formatComponentTitle(connectedComponent.componentName, connectedComponent.filepathExport, longestNameLength),
            disabled: true,
        })),
    ];
}
function getUnconnectedComponentChoices(componentPaths, dir) {
    return [
        {
            title: NONE,
            value: NONE,
        },
        ...componentPaths.map((absPath) => {
            return {
                title: path_1.default.relative(dir, absPath),
                value: absPath,
            };
        }),
    ];
}
const escapeHandler = () => {
    let escPressed = false;
    const keypressListener = (_, key) => {
        if (key.name === 'escape') {
            escPressed = true;
        }
    };
    process.stdin.on('keypress', keypressListener);
    return {
        escPressed: () => escPressed,
        reset: () => {
            escPressed = false;
        },
        destroy: () => {
            process.stdin.removeListener('keypress', keypressListener);
        },
    };
};
async function runManualLinking({ unconnectedComponents, linkedNodeIdsToFilepathExports, filepathExports, connectedComponentsMappings, cmd, }) {
    const filesToComponentOptionsMap = (0, helpers_2.getComponentOptionsMap)(filepathExports);
    const dir = (0, connect_1.getDir)(cmd);
    const escHandler = escapeHandler();
    while (true) {
        // Don't show exit confirmation as we're relying on esc behavior
        const { nodeId } = await (0, prompts_1.default)({
            type: 'select',
            name: 'nodeId',
            message: `Select a Figma component match you'd like to edit (Press ${chalk_1.default.green('esc')} when you're ready to continue on)`,
            choices: getComponentChoicesForPrompt(unconnectedComponents, linkedNodeIdsToFilepathExports, connectedComponentsMappings, dir),
            warn: 'This component already has a local Code Connect file.',
            hint: ' ',
        }, {
            onSubmit: clearQuestion,
        });
        if (!nodeId) {
            break;
        }
        const pathChoices = getUnconnectedComponentChoices(Object.keys(filesToComponentOptionsMap), dir);
        const prevSelectedKey = linkedNodeIdsToFilepathExports[nodeId];
        const { filepath: prevSelectedFilepath, exportName: prevSelectedComponent } = prevSelectedKey
            ? (0, helpers_2.parseFilepathExport)(prevSelectedKey)
            : {
                filepath: null,
                exportName: null,
            };
        escHandler.reset();
        const { pathToComponent } = await (0, prompts_1.default)({
            type: 'autocomplete',
            name: 'pathToComponent',
            message: 'Choose a path to your code component (type to filter results)',
            choices: pathChoices,
            // default suggest uses .startsWith(input) which isn't very useful for full paths
            suggest: (input, choices) => Promise.resolve(choices.filter((i) => i.value.toUpperCase().includes(input.toUpperCase()))),
            // preselect if editing an existing choice
            initial: prevSelectedFilepath
                ? pathChoices.findIndex(({ value }) => value === prevSelectedFilepath)
                : 0,
        }, {
            onSubmit: clearQuestion,
        });
        if (escHandler.escPressed()) {
            continue;
        }
        if (pathToComponent) {
            if (pathToComponent === NONE) {
                delete linkedNodeIdsToFilepathExports[nodeId];
            }
            else {
                const fileExports = filesToComponentOptionsMap[pathToComponent];
                if (fileExports.length === 0) {
                    // Not TS, default to filepath
                    linkedNodeIdsToFilepathExports[nodeId] = pathToComponent;
                }
                else {
                    escHandler.reset();
                    const { filepathExport } = await (0, prompts_1.default)({
                        type: 'autocomplete',
                        name: 'filepathExport',
                        message: `Choose an export of ${path_1.default.parse(pathToComponent).base} (type to filter results)`,
                        choices: fileExports,
                        // default suggest uses .startsWith(input)
                        suggest: (input, choices) => Promise.resolve(choices.filter((i) => i.value.toUpperCase().includes(input.toUpperCase()))),
                        // preselect if editing an existing choice
                        initial: prevSelectedComponent && prevSelectedFilepath === pathToComponent
                            ? fileExports.findIndex(({ title }) => title === prevSelectedComponent)
                            : 0,
                    }, {
                        onSubmit: clearQuestion,
                    });
                    if (escHandler.escPressed()) {
                        continue;
                    }
                    linkedNodeIdsToFilepathExports[nodeId] = filepathExport;
                }
            }
        }
    }
    escHandler.destroy();
}
async function runManualLinkingWithConfirmation(manualLinkingArgs) {
    let outDir = manualLinkingArgs.cmd.outDir || null;
    while (true) {
        await runManualLinking(manualLinkingArgs);
        if (!outDir) {
            console.info('\nA Code Connect file is created for each Figma component to code definition match.');
            const { outputDirectory } = await askQuestionWithExitConfirmation({
                type: 'text',
                name: 'outputDirectory',
                message: `In which directory would you like to store Code Connect files? (Press ${chalk_1.default.green('enter')} to co-locate your files alongside your component files)`,
            });
            outDir = outputDirectory;
        }
        const linkedNodes = Object.keys(manualLinkingArgs.linkedNodeIdsToFilepathExports);
        if (!linkedNodes.length) {
            const { confirmation } = await askQuestionOrExit({
                type: 'select',
                name: 'confirmation',
                message: `No Code Connect files linked. Are you sure you want to exit?`,
                choices: [
                    {
                        title: 'Back to edit',
                        value: 'backToEdit',
                    },
                    {
                        title: 'Exit',
                        value: 'exit',
                    },
                ],
            });
            if (confirmation === 'exit') {
                process.exit(0);
            }
        }
        else {
            const { confirmation } = await askQuestionWithExitConfirmation({
                type: 'select',
                name: 'confirmation',
                message: `You're ready to create ${chalk_1.default.green(linkedNodes.length)} Code Connect file${linkedNodes.length == 1 ? '' : 's'}. Continue?`,
                choices: [
                    {
                        title: 'Create files',
                        value: 'create',
                    },
                    {
                        title: 'Back to editing',
                        value: 'backToEdit',
                    },
                ],
            });
            if (confirmation === 'backToEdit') {
                outDir = manualLinkingArgs.cmd.outDir || null;
            }
            else {
                return outDir;
            }
        }
    }
}
async function addPayload(payloads, args) {
    const { payloadType, filepath, sourceExport, reactTypeSignature, propMapping, figmaNodeUrl, moreComponentProps, destinationDir, sourceFilepath, normalizedName, config, } = args;
    if (payloadType === 'MULTI_EXPORT') {
        const figmaConnection = {
            sourceExport,
            reactTypeSignature,
            propMapping,
            component: {
                figmaNodeUrl,
                ...moreComponentProps,
            },
        };
        if (payloads[filepath]) {
            ;
            payloads[filepath].figmaConnections.push(figmaConnection);
        }
        else {
            const payload = {
                mode: 'CREATE',
                destinationDir,
                sourceFilepath,
                normalizedName,
                figmaConnections: [figmaConnection],
                config,
            };
            payloads[filepath] = payload;
        }
    }
    if (payloadType === 'SINGLE_EXPORT') {
        const payload = {
            mode: 'CREATE',
            destinationDir,
            sourceFilepath,
            component: {
                figmaNodeUrl,
                normalizedName,
                ...moreComponentProps,
            },
            config,
        };
        payloads[filepath] = payload;
    }
}
async function createCodeConnectFiles({ linkedNodeIdsToFilepathExports, figmaFileUrl, unconnectedComponentsMap, outDir: outDirArg, projectInfo, cmd, accessToken, useAi, }) {
    const filepathExportsToComponents = Object.entries(linkedNodeIdsToFilepathExports).reduce((map, [nodeId, filepathExport]) => {
        map[filepathExport] = unconnectedComponentsMap[nodeId];
        return map;
    }, {});
    let embeddingsFetchSpinner = null;
    if (useAi) {
        embeddingsFetchSpinner = (0, ora_1.default)({
            text: 'Computing embeddings...',
            color: 'green',
        }).start();
    }
    const propMappingsAndData = projectInfo.config.parser === 'react'
        ? await (0, prop_mapping_helpers_1.extractDataAndGenerateAllPropsMappings)({
            filepathExportsToComponents,
            projectInfo,
            cmd,
            figmaUrl: figmaFileUrl,
            accessToken,
            useAi,
        })
        : null;
    if (embeddingsFetchSpinner) {
        embeddingsFetchSpinner.stop();
    }
    let allFilesCreated = true;
    const payloads = {};
    for (const [nodeId, filepathExport] of Object.entries(linkedNodeIdsToFilepathExports)) {
        const urlObj = new URL(figmaFileUrl);
        urlObj.search = '';
        urlObj.searchParams.append('node-id', nodeId);
        const { filepath, exportName } = (0, helpers_2.parseFilepathExport)(filepathExport);
        const { name } = path_1.default.parse(filepath);
        const outDir = outDirArg || path_1.default.dirname(filepath);
        const payloadType = projectInfo.config.parser === 'react' || projectInfo.config.parser === 'html'
            ? 'MULTI_EXPORT'
            : 'SINGLE_EXPORT';
        addPayload(payloads, {
            payloadType,
            filepath,
            sourceExport: exportName || '?',
            reactTypeSignature: propMappingsAndData?.propMappingData[filepathExport]?.signature,
            propMapping: propMappingsAndData?.propMappings[filepathExport],
            figmaNodeUrl: urlObj.toString(),
            moreComponentProps: unconnectedComponentsMap[nodeId],
            destinationDir: outDir,
            sourceFilepath: filepath,
            normalizedName: (0, create_1.normalizeComponentName)(name),
            config: projectInfo.config,
        });
    }
    for (const payloadKey of Object.keys(payloads)) {
        const payload = payloads[payloadKey];
        let result;
        if (projectInfo.config.parser === 'react') {
            result = await (0, create_2.createReactCodeConnect)(payload);
        }
        else {
            try {
                const stdout = await (0, parser_executables_1.callParser)(
                // We use `as` because the React parser makes the types difficult
                // TODO remove once React is an executable parser
                projectInfo.config, payload, projectInfo.absPath);
                result = parser_executable_types_1.CreateResponsePayload.parse(stdout);
            }
            catch (e) {
                throw (0, zod_validation_error_1.fromError)(e);
            }
        }
        const { hasErrors } = (0, parser_executables_1.handleMessages)(result.messages);
        if (!hasErrors) {
            result.createdFiles.forEach((file) => {
                logging_1.logger.info((0, logging_1.success)(`Created ${file.filePath}`));
            });
        }
        else {
            allFilesCreated = false;
        }
    }
    return allFilesCreated;
}
function convertRemoteFileUrlToRelativePath({ remoteFileUrl, gitRootPath, dir, }) {
    if (!gitRootPath) {
        return null;
    }
    const pathWithinRepo = remoteFileUrl.replace(new RegExp(`.*?(tree|blob)/[^/]*`), '');
    if (!pathWithinRepo) {
        return null;
    }
    const absPath = path_1.default.join(gitRootPath, pathWithinRepo);
    return path_1.default.relative(dir, absPath);
}
async function getUnconnectedComponentsAndConnectedComponentMappings(cmd, figmaFileUrl, componentsFromFile, projectInfo) {
    const dir = (0, connect_1.getDir)(cmd);
    const fileKey = (0, helpers_1.parseFileKey)(figmaFileUrl);
    const codeConnectObjects = await (0, connect_1.getCodeConnectObjects)(cmd, projectInfo, true);
    const connectedNodeIdsInFileToCodeConnectObjectMap = codeConnectObjects.reduce((map, codeConnectJson) => {
        const parsedNode = (0, validation_1.parseFigmaNode)(cmd.verbose, codeConnectJson, true);
        if (parsedNode && parsedNode.fileKey === fileKey) {
            map[parsedNode.nodeId] = codeConnectJson;
        }
        return map;
    }, {});
    const unconnectedComponents = [];
    const connectedComponentsMappings = [];
    const gitRootPath = (0, project_1.getGitRepoAbsolutePath)(dir);
    componentsFromFile.map((c) => {
        if (c.id in connectedNodeIdsInFileToCodeConnectObjectMap) {
            const cc = connectedNodeIdsInFileToCodeConnectObjectMap[c.id];
            const relativePath = convertRemoteFileUrlToRelativePath({
                remoteFileUrl: cc.source,
                gitRootPath,
                dir,
            });
            connectedComponentsMappings.push({
                componentName: c.name,
                filepathExport: relativePath ?? '(Unknown file)',
            });
        }
        else {
            unconnectedComponents.push(c);
        }
    });
    return {
        unconnectedComponents,
        connectedComponentsMappings,
    };
}
async function askForTopLevelDirectoryOrDetermineFromConfig({ dir, hasConfigFile, config, cmd, }) {
    let componentDirectory = null;
    while (true) {
        if (!hasConfigFile) {
            const { componentDirectory: componentDirectoryAnswer } = await askQuestionOrExit({
                type: 'text',
                message: `Which top-level directory contains the code to be connected to your Figma design system? (Press ${chalk_1.default.green('enter')} to use current directory)`,
                name: 'componentDirectory',
                format: (val) => val || process.cwd(), // should this be || dir?
                validate: (value) => {
                    if (!value) {
                        return true;
                    }
                    const isValidDir = fs_1.default.existsSync(value) && fs_1.default.lstatSync(value).isDirectory();
                    if (!isValidDir)
                        return 'Please enter a valid directory path.';
                    return true;
                },
            });
            componentDirectory = componentDirectoryAnswer;
        }
        const configToUse = componentDirectory
            ? {
                ...config,
                include: (0, helpers_2.getIncludesGlob)({
                    dir,
                    componentDirectory,
                    config,
                }),
            }
            : config;
        const spinner = (0, ora_1.default)({
            text: 'Parsing local files...',
            color: 'green',
            spinner: {
                // Don't show spinner as ts.createProgram blocks thread
                frames: [''],
            },
        }).start();
        let projectInfo = await (0, project_1.getProjectInfoFromConfig)(dir, configToUse);
        if (projectInfo.config.parser === 'react') {
            projectInfo = (0, project_1.getReactProjectInfo)(projectInfo);
        }
        const filepathExports = (0, helpers_2.getFilepathExportsFromFiles)(projectInfo, cmd);
        spinner.stop();
        if (!filepathExports.length) {
            if (hasConfigFile) {
                logging_1.logger.error('No files found. Please update the include/exclude globs in your config file and try again.');
                (0, helpers_1.exitWithFeedbackMessage)(1);
            }
            else {
                logging_1.logger.error('No files for your project type could be found in that directory. Please enter a different directory.');
            }
        }
        else {
            return {
                projectInfo,
                componentDirectory,
                filepathExports,
            };
        }
    }
}
async function runWizard(cmd) {
    logging_1.logger.info((0, boxen_1.default)(`${chalk_1.default.bold(`Welcome to ${chalk_1.default.green('Code Connect')}`)}\n\n` +
        `Follow a few simple steps to connect your Figma design system to your codebase.\n` +
        `When you're done, you'll be able to see your component code while inspecting in\n` +
        `Figma's Dev Mode.\n\n` +
        `Learn more at ${chalk_1.default.cyan('https://www.figma.com/developers/code-connect')}.\n\n` +
        `Please raise bugs or feedback at ${chalk_1.default.cyan('https://github.com/figma/code-connect/issues')}.\n\n` +
        `${chalk_1.default.red.bold('Note: ')}This process will create and modify Code Connect files. Make sure you've\n` +
        `committed necessary changes in your codebase first.`, {
        padding: 1,
        margin: 1,
        textAlignment: 'center',
    }));
    const dir = (0, connect_1.getDir)(cmd);
    const { hasConfigFile, config } = await (0, project_1.parseOrDetermineConfig)(dir, cmd.config);
    const { hasEnvFile, envHasFigmaToken } = await (0, project_1.checkForEnvAndToken)(dir);
    // This isn't ideal as you see the intro text followed by an error, but we'll
    // add support for this soon so I think it's OK
    if (config.parser === 'html') {
        (0, logging_1.exitWithError)('HTML projects are currently not supported by Code Connect interactive setup. Please use the "npx figma connect create" command instead.');
    }
    let accessToken = (0, connect_1.getAccessToken)(cmd);
    if (!accessToken) {
        const { accessTokenEntered } = await askQuestionOrExit({
            type: 'text',
            message: `No access token detected. Visit https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens
      for instructions on how to do this, ensuring you have both the File Content and Code Connect Write scopes \n\n  Please enter your access token:`,
            name: 'accessTokenEntered',
            validate: (value) => !!value || 'Please enter an access token.',
        });
        accessToken = accessTokenEntered;
    }
    logging_1.logger.info('');
    if (!hasEnvFile) {
        // If there is no .env file, we should ask the user if they want to create one
        // to store the Figma token.
        const { createConfigFile } = await askQuestionOrExit({
            type: 'select',
            name: 'createConfigFile',
            message: "It looks like you don't have a .env file. Would you like to generate one now to store the Figma access token?",
            choices: [
                {
                    title: 'Yes',
                    value: 'yes',
                },
                {
                    title: 'No',
                    value: 'no',
                },
            ],
        });
        if (createConfigFile === 'yes') {
            await (0, helpers_2.createEnvFile)({ dir, accessToken });
        }
    }
    else if (!envHasFigmaToken) {
        // If there is a .env file but no Figma token, we should ask the user if they want to add it.
        const { addFigmaToken } = await askQuestionOrExit({
            type: 'select',
            name: 'addFigmaToken',
            message: 'Would you like to add your Figma access token to your .env file?',
            choices: [
                {
                    title: 'Yes',
                    value: 'yes',
                },
                {
                    title: 'No',
                    value: 'no',
                },
            ],
        });
        if (addFigmaToken === 'yes') {
            (0, helpers_2.addTokenToEnvFile)({ dir, accessToken });
        }
    }
    const { componentDirectory, projectInfo, filepathExports } = await askForTopLevelDirectoryOrDetermineFromConfig({
        dir,
        hasConfigFile,
        config,
        cmd,
    });
    let figmaFileUrl;
    if (config.interactiveSetupFigmaFileUrl) {
        logging_1.logger.info(`Using Figma file URL from config: ${config.interactiveSetupFigmaFileUrl}\n`);
        figmaFileUrl = config.interactiveSetupFigmaFileUrl;
    }
    else {
        let { figmaFileUrl: answer } = await askQuestionOrExit({
            type: 'text',
            message: "What is the URL of the Figma file containing design components you'd like to connect?",
            name: 'figmaFileUrl',
            validate: (value) => (0, helpers_2.isValidFigmaUrl)(value) || 'Please enter a valid Figma file URL.',
        });
        figmaFileUrl = answer;
    }
    let componentsFromFile = await fetchTopLevelComponentsFromFile({
        accessToken,
        figmaUrl: figmaFileUrl,
        cmd,
    });
    if (!componentsFromFile) {
        (0, helpers_1.exitWithFeedbackMessage)(1);
    }
    if (!hasConfigFile) {
        const { createConfigFile } = await askQuestionOrExit({
            type: 'select',
            name: 'createConfigFile',
            message: "It looks like you don't have a Code Connect config file (figma.config.json). Would you like to generate one now from your provided answers?",
            choices: [
                {
                    title: 'Yes',
                    value: 'yes',
                },
                {
                    title: 'No',
                    value: 'no',
                },
            ],
        });
        if (createConfigFile === 'yes') {
            await (0, helpers_2.createCodeConnectConfig)({ dir, componentDirectory, config, figmaUrl: figmaFileUrl });
        }
    }
    let useAi = false;
    if (projectInfo.config.parser === 'react') {
        const { useAi: useAiSelection } = await askQuestionOrExit({
            type: 'select',
            name: 'useAi',
            message: 'Code Connect offers AI support to map properties between the Figma file and components in your codebase. Data is used only for mapping and is not stored or used for AI training. To learn more, visit https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect',
            choices: [
                {
                    title: 'Do not use AI for prop mapping (default)',
                    value: 'no',
                },
                {
                    title: 'Use AI for prop mapping',
                    value: 'yes',
                },
            ],
        });
        useAi = useAiSelection === 'yes';
    }
    const pagesFromFile = componentsFromFile.reduce((acc, c) => {
        acc[c.pageId] = c.pageName;
        return acc;
    }, {});
    const pagesFromFileCount = Object.keys(pagesFromFile).length;
    if (componentsFromFile.length > MAX_COMPONENTS_TO_MAP && pagesFromFileCount > 1) {
        logging_1.logger.info(`${componentsFromFile.length} Figma components found in the Figma file across ${pagesFromFileCount} pages.`);
        componentsFromFile = await narrowDownComponentsPerPage(componentsFromFile, pagesFromFile);
    }
    const linkedNodeIdsToFilepathExports = {};
    const { unconnectedComponents, connectedComponentsMappings } = await getUnconnectedComponentsAndConnectedComponentMappings(cmd, figmaFileUrl, componentsFromFile, projectInfo);
    (0, autolinking_1.autoLinkComponents)({
        unconnectedComponents,
        linkedNodeIdsToFilepathExports,
        filepathExports,
    });
    logging_1.logger.info((0, boxen_1.default)(`${chalk_1.default.bold(`Connecting your Figma components`)}\n\n` +
        `${chalk_1.default.green(`${chalk_1.default.bold(Object.keys(linkedNodeIdsToFilepathExports).length)} ${Object.keys(linkedNodeIdsToFilepathExports).length === 1
            ? 'component was automatically matched based on its name'
            : 'components were automatically matched based on their names'}`)}\n` +
        `${chalk_1.default.yellow(`${chalk_1.default.bold(unconnectedComponents.length)} ${unconnectedComponents.length === 1
            ? 'component has not been matched'
            : 'components have not been matched'}`)}\n\n` +
        `Match up Figma components with their code definitions. When you're finished, you\n` +
        `can specify the directory you want to create Code Connect files in.`, {
        padding: 1,
        margin: 1,
        textAlignment: 'center',
    }));
    const outDir = await runManualLinkingWithConfirmation({
        unconnectedComponents,
        connectedComponentsMappings,
        linkedNodeIdsToFilepathExports,
        filepathExports,
        cmd,
    });
    const unconnectedComponentsMap = unconnectedComponents.reduce((map, component) => {
        map[component.id] = component;
        return map;
    }, {});
    const success = await createCodeConnectFiles({
        linkedNodeIdsToFilepathExports,
        unconnectedComponentsMap,
        figmaFileUrl,
        outDir,
        projectInfo,
        cmd,
        accessToken,
        useAi,
    });
    if (success) {
        logging_1.logger.info(`\nUse the 'publish' command to make mappings visible in Figma Dev Mode.`);
    }
}
//# sourceMappingURL=run_wizard.js.map