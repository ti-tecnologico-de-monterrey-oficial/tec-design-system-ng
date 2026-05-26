"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropMappingData = getPropMappingData;
exports.getUniqueMatchableNames = getUniqueMatchableNames;
exports.buildAllEmbeddingsMatchResults = buildAllEmbeddingsMatchResults;
exports.generateAllPropsMappings = generateAllPropsMappings;
exports.extractDataAndGenerateAllPropsMappings = extractDataAndGenerateAllPropsMappings;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logging_1 = require("../../common/logging");
const helpers_1 = require("./helpers");
const prop_mapping_1 = require("./prop_mapping");
const signature_extraction_1 = require("./signature_extraction");
const embeddings_1 = require("./embeddings");
const fetch_1 = require("../../common/fetch");
/**
 * Preprocess signatures and matchable names for all components
 */
function getPropMappingData({ filepathExportsToComponents, projectInfo, cmd, }) {
    const propMappingData = {};
    for (const [filepathExport, { componentPropertyDefinitions }] of Object.entries(filepathExportsToComponents)) {
        const { filepath, exportName } = (0, helpers_1.parseFilepathExport)(filepathExport);
        if (projectInfo.config.parser === 'react' && filepath && exportName) {
            try {
                const signature = (0, signature_extraction_1.extractSignature)({
                    nameToFind: exportName,
                    sourceFilePath: filepath,
                });
                if (cmd.verbose && Object.keys(signature).length === 0) {
                    logging_1.logger.warn(`No TS signature found for "${exportName}" in ${filepath}`);
                }
                propMappingData[filepathExport] = {
                    signature,
                    componentPropertyDefinitions,
                    matchableNamesMap: (0, prop_mapping_1.buildMatchableNamesMap)(componentPropertyDefinitions),
                };
            }
            catch (e) {
                if (cmd.verbose) {
                    logging_1.logger.warn(`Could not extract signature for "${exportName}" in ${filepath}`);
                }
            }
        }
    }
    return propMappingData;
}
function getUniqueMatchableNames(propMappingData) {
    const allNames = Object.values(propMappingData).flatMap((d) => [
        ...Object.keys(d.signature),
        ...Object.keys(d.matchableNamesMap),
    ]);
    return Array.from(new Set(allNames));
}
function cosineSimilarity(a, b) {
    const dot_product = a.reduce((acc, val, i) => acc + val * b[i], 0);
    const magnitude_a = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
    const magnitude_b = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
    return dot_product / (magnitude_a * magnitude_b);
}
function buildAllEmbeddingsMatchResults(propMappingData, matchableNameEmbeddings) {
    const allMatchResults = {};
    Object.entries(propMappingData).forEach(([filepathExport, { signature, matchableNamesMap }]) => {
        allMatchResults[filepathExport] = {};
        Object.keys(signature).forEach((propName) => {
            allMatchResults[filepathExport][propName] = Object.keys(matchableNamesMap)
                .map((item) => ({
                item,
                score: cosineSimilarity(matchableNameEmbeddings[propName], matchableNameEmbeddings[item]),
            }))
                .sort((a, b) => b.score - a.score);
        });
    });
    return allMatchResults;
}
async function getMockEmbeddingsResponse(uniqueMatchableNames, mockResponseName) {
    /**
     * Refetch and write local mock responses.
     * This should be done whenever any upstream changes are made to e.g. TS signature extraction
     */
    const updateMockFiles = false;
    // Return mock response or update local mocks
    const mockResponsePath = mockResponseName &&
        path_1.default.join(__dirname, `__test__/prop_mapping/test_cases/embeddings_responses/${mockResponseName}.json`);
    if (updateMockFiles) {
        if (!process.env.FIGMA_ACCESS_TOKEN) {
            throw new Error('process.env.FIGMA_ACCESS_TOKEN required to fetch embeddings');
        }
        if (!process.env.FILE_URL) {
            throw new Error("process.env.FILE_URL required to fetch embeddings (note: contents of file don't matter)");
        }
        const res = await (0, embeddings_1.fetchEmbeddings)({
            uniqueMatchableNames,
            accessToken: process.env.FIGMA_ACCESS_TOKEN,
            figmaUrl: process.env.FILE_URL,
        });
        fs_1.default.writeFileSync(mockResponsePath, JSON.stringify(res));
        return res;
    }
    else {
        return JSON.parse(fs_1.default.readFileSync(mockResponsePath, 'utf-8'));
    }
}
async function getEmbeddingsMatchResults({ propMappingData, accessToken, figmaUrl, mockResponseName, }) {
    const uniqueMatchableNames = getUniqueMatchableNames(propMappingData);
    const res = mockResponseName
        ? await getMockEmbeddingsResponse(uniqueMatchableNames, mockResponseName)
        : await (0, embeddings_1.fetchEmbeddings)({ uniqueMatchableNames, accessToken, figmaUrl });
    const matchableNamesEmbeddings = {};
    res?.meta.embeddings.forEach((embedding, index) => {
        matchableNamesEmbeddings[uniqueMatchableNames[index]] = embedding;
    });
    return buildAllEmbeddingsMatchResults(propMappingData, matchableNamesEmbeddings);
}
async function generateAllPropsMappings({ propMappingData, accessToken, figmaUrl, useAi, mockResponseName, }) {
    let allMatchResults = {};
    if (useAi) {
        try {
            allMatchResults = await getEmbeddingsMatchResults({
                propMappingData,
                accessToken,
                figmaUrl,
                mockResponseName,
            });
        }
        catch (e) {
            if ((0, fetch_1.isFetchError)(e)) {
                logging_1.logger.error(`Failed to fetch embeddings: ${e.data?.message || e.response?.status}`);
            }
            else {
                logging_1.logger.error(`Failed to compute embeddings: ${e}`);
            }
            logging_1.logger.info('Falling back to using fuzzy matching');
        }
    }
    const propMappings = {};
    Object.entries(propMappingData).forEach(([filepathExport, { signature, componentPropertyDefinitions, matchableNamesMap }]) => {
        propMappings[filepathExport] = (0, prop_mapping_1.generatePropMapping)({
            matchableNamesMap,
            componentPropertyDefinitions,
            signature,
            componentMatchResults: allMatchResults[filepathExport],
        });
    });
    return propMappings;
}
/**
 * This is the top level function that takes a map of filepathExports to components and generates prop mappings.
 * It does the following:
 *
 * 1. For each component we want to match, extract their TS signature and all figma properties
 * 2. Make an array of all strings we want embeddings for (react props, figma properties, variant values)
 * 3. Call embeddings endpoint with above and create a map of names => embeddings
 * 4. For each component, build a map of code props to an list of matchable names + scores, sorted by their calculated embedding distance to the code prop
 * 5. Finally, pass those name matches and component data to the prop mapping algorithm to generate the mapping
 */
async function extractDataAndGenerateAllPropsMappings({ filepathExportsToComponents, projectInfo, cmd, figmaUrl, accessToken, useAi, }) {
    const propMappingData = getPropMappingData({
        filepathExportsToComponents,
        projectInfo,
        cmd,
    });
    return {
        propMappingData,
        propMappings: await generateAllPropsMappings({
            propMappingData,
            accessToken,
            figmaUrl,
            useAi,
        }),
    };
}
//# sourceMappingURL=prop_mapping_helpers.js.map