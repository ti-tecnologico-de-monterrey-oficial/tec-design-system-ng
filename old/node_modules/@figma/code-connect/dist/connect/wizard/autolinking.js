"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestMatchingExportWithinFile = getBestMatchingExportWithinFile;
exports.autoLinkComponents = autoLinkComponents;
const fast_fuzzy_1 = require("fast-fuzzy");
const path_1 = __importDefault(require("path"));
const helpers_1 = require("./helpers");
const FILENAME_MINIMUM_MATCH_THRESHOLD = 0.8;
const EXPORT_NAME_MINIMUM_MATCH_THRESHOLD = 0.8;
/**
 * Guesses which export to use for a given file. Prioritizes default then search term.
 * @param args
 * @param args.filepath current file
 * @param args.exportOptions exported members of current file
 * @param args.nameToMatch name of Figma component
 * @returns filepathExport to use
 */
function getBestMatchingExportWithinFile({ filepath, exportOptions, nameToMatch, }) {
    // Don't append export if no known exports
    if (exportOptions.length === 0) {
        return filepath;
    }
    if (exportOptions.length === 1) {
        return exportOptions[0].value;
    }
    const defaultOption = exportOptions.find((o) => o.title === 'default');
    if (defaultOption) {
        return defaultOption.value;
    }
    const matches = (0, fast_fuzzy_1.search)(nameToMatch, exportOptions.map((opt) => opt.title), {
        threshold: EXPORT_NAME_MINIMUM_MATCH_THRESHOLD,
    });
    if (matches.length > 0) {
        /**
         * fuzzy.search searches for string inside another, meaning e.g. "Button" and "ButtonProps" rank equally for "Button".
         * We counter this by looking for shortest string in matches
         */
        const shortestMatch = matches.reduce(function (a, b) {
            return a.length <= b.length ? a : b;
        });
        if (shortestMatch) {
            return exportOptions.find((o) => o.title === shortestMatch).value;
        }
    }
    // use anything
    return exportOptions[0].value;
}
/**
 * Autolinks components/paths based on fuzzy matching of name and writes mappings to linkedNodeIdsToPaths.
 *
 * Matching is done by fast-fuzzy
 */
function autoLinkComponents({ unconnectedComponents, linkedNodeIdsToFilepathExports, filepathExports, }) {
    const componentOptionsMap = (0, helpers_1.getComponentOptionsMap)(filepathExports);
    const pathMatchScores = {};
    /**
     * fast-fuzzy finds best match in filenames for a given component - this function
     * allows us to replace that link if a closer match is found
     */
    function isBestMatchForPath(match) {
        return !pathMatchScores[match.item] || match.score > pathMatchScores[match.item].score;
    }
    const matchableFilenameToPathMap = Object.keys(componentOptionsMap).reduce((acc, componentPath) => {
        const { name, dir } = path_1.default.parse(componentPath);
        // For index.ts files, match on the directory name
        const matchableName = name === 'index' ? path_1.default.basename(dir) : name;
        acc[matchableName] = componentPath;
        return acc;
    }, {});
    const searchSpace = Object.keys(matchableFilenameToPathMap);
    const searcher = new fast_fuzzy_1.Searcher(searchSpace);
    unconnectedComponents.forEach((component) => {
        const matchableName = component.name;
        const results = searcher.search(matchableName, { returnMatchData: true });
        const bestMatch = results[0];
        const filename = bestMatch?.item;
        if (bestMatch &&
            bestMatch.score > FILENAME_MINIMUM_MATCH_THRESHOLD &&
            filename in matchableFilenameToPathMap &&
            isBestMatchForPath(bestMatch)) {
            const filepath = matchableFilenameToPathMap[bestMatch.item];
            linkedNodeIdsToFilepathExports[component.id] = getBestMatchingExportWithinFile({
                filepath,
                exportOptions: componentOptionsMap[filepath],
                nameToMatch: component.name,
            });
            pathMatchScores[bestMatch.item] = { nodeId: component.id, score: bestMatch.score };
        }
    });
}
//# sourceMappingURL=autolinking.js.map