import { FigmaRestApi } from '../figma_rest_api';
import prompts from 'prompts';
/**
 * Guesses which export to use for a given file. Prioritizes default then search term.
 * @param args
 * @param args.filepath current file
 * @param args.exportOptions exported members of current file
 * @param args.nameToMatch name of Figma component
 * @returns filepathExport to use
 */
export declare function getBestMatchingExportWithinFile({ filepath, exportOptions, nameToMatch, }: {
    filepath: string;
    exportOptions: prompts.Choice[];
    nameToMatch: string;
}): string;
/**
 * Autolinks components/paths based on fuzzy matching of name and writes mappings to linkedNodeIdsToPaths.
 *
 * Matching is done by fast-fuzzy
 */
export declare function autoLinkComponents({ unconnectedComponents, linkedNodeIdsToFilepathExports, filepathExports, }: {
    unconnectedComponents: FigmaRestApi.Component[];
    linkedNodeIdsToFilepathExports: Record<string, string>;
    filepathExports: string[];
}): void;
//# sourceMappingURL=autolinking.d.ts.map