import { CodeConnectConfig, ProjectInfo } from '../project';
import prompts from 'prompts';
import { BaseCommand } from '../../commands/connect';
export declare function maybePrefillWizardQuestionsForTesting(): void;
/**
 *
 * Gets the default include globs for config.parser with componentDirectory prepended
 * @param args
 * @param args.dir project root path
 * @param args.componentDirectory optional path to where includes should be limited to
 * @param args.config CodeConnectConfig
 * @returns array of include globs
 */
export declare function getIncludesGlob({ dir, componentDirectory, config, }: {
    dir: string;
    componentDirectory: string | null;
    config: CodeConnectConfig;
}): string[] | undefined;
export declare function createEnvFile({ dir, accessToken }: {
    dir: string;
    accessToken?: string;
}): Promise<void>;
export declare function addTokenToEnvFile({ dir, accessToken }: {
    dir: string;
    accessToken?: string;
}): void;
export declare function createCodeConnectConfig({ dir, componentDirectory, config, figmaUrl, }: {
    dir: string;
    componentDirectory: string | null;
    config: CodeConnectConfig;
    figmaUrl: string;
}): Promise<void>;
export declare function parseFilepathExport(filepathExport: string): {
    filepath: string;
    exportName: null;
} | {
    filepath: string;
    exportName: string;
};
export declare function getFilepathExport(filepath: string, exp: string): string;
/**
 * Formats an array of filepathExports into a map of filepaths->exports
 *
 * @param filepathExports an array of components in the format `${filepath}~${componentName}
 * @returns a map of filepaths to an array of their exports. Array is empty if no exports found
 */
export declare function getComponentOptionsMap(filepathExports: string[]): Record<string, prompts.Choice[]>;
/**
 * Parses a ProjectInfo for any TS exports (or filepaths if not a TS project)
 *
 * @param projectInfo
 * @returns an array of components in the format `${filepath}~${componentName}
 */
export declare function getFilepathExportsFromFiles(projectInfo: ProjectInfo, cmd: BaseCommand): string[];
export declare function isValidFigmaUrl(url: string): boolean;
//# sourceMappingURL=helpers.d.ts.map