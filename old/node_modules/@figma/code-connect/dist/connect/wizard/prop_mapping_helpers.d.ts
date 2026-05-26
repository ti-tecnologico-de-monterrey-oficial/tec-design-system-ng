import { BaseCommand } from '../../commands/connect';
import { ComponentTypeSignature } from '../../react/parser';
import { FigmaRestApi } from '../figma_rest_api';
import { ProjectInfo } from '../project';
import { MatchableName } from './prop_mapping';
import { PropMapping } from '../parser_executable_types';
export type MatchableNamesMap = Record<string, MatchableName[]>;
export type PropMappingData = {
    [filepathExport: string]: {
        signature: ComponentTypeSignature;
        matchableNamesMap: MatchableNamesMap;
        componentPropertyDefinitions: FigmaRestApi.Component['componentPropertyDefinitions'];
    };
};
/**
 * Preprocess signatures and matchable names for all components
 */
export declare function getPropMappingData({ filepathExportsToComponents, projectInfo, cmd, }: {
    filepathExportsToComponents: Record<string, FigmaRestApi.Component>;
    projectInfo: ProjectInfo;
    cmd: BaseCommand;
}): PropMappingData;
export declare function getUniqueMatchableNames(propMappingData: PropMappingData): string[];
export type PropMatchResult = {
    item: string;
    score: number;
};
export type ComponentMatchResults = {
    [propName: string]: PropMatchResult[];
};
type AllMatchResults = {
    [filepathExport: string]: ComponentMatchResults;
};
type MatchableNameEmbeddings = {
    [matchableName: string]: number[];
};
export declare function buildAllEmbeddingsMatchResults(propMappingData: PropMappingData, matchableNameEmbeddings: MatchableNameEmbeddings): AllMatchResults;
export declare function generateAllPropsMappings({ propMappingData, accessToken, figmaUrl, useAi, mockResponseName, }: {
    propMappingData: PropMappingData;
    accessToken: string;
    figmaUrl: string;
    useAi: boolean;
    mockResponseName?: string;
}): Promise<{
    [filepathExport: string]: PropMapping;
}>;
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
export declare function extractDataAndGenerateAllPropsMappings({ filepathExportsToComponents, projectInfo, cmd, figmaUrl, accessToken, useAi, }: {
    filepathExportsToComponents: Record<string, FigmaRestApi.Component>;
    projectInfo: ProjectInfo;
    cmd: BaseCommand;
    figmaUrl: string;
    accessToken: string;
    useAi: boolean;
}): Promise<{
    propMappingData: PropMappingData;
    propMappings: {
        [filepathExport: string]: PropMapping;
    };
}>;
export {};
//# sourceMappingURL=prop_mapping_helpers.d.ts.map