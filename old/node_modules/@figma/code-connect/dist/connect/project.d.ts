import ts from 'typescript';
export declare const DEFAULT_INCLUDE_GLOBS_BY_PARSER: {
    react: string[];
    html: string[];
    swift: string[];
    compose: string[];
    custom: undefined;
    __unit_test__: string[];
};
export declare const DEFAULT_LABEL_PER_PARSER: Partial<Record<CodeConnectParser, string>>;
export type CodeConnectExecutableParser = 'swift' | 'compose' | 'custom' | '__unit_test__';
export type CodeConnectParser = 'react' | 'html' | CodeConnectExecutableParser;
export type BaseCodeConnectConfig = {
    /**
     * Specify glob patterns for files (relative to the project root) to be
     * included when looking for source files. If not specified, all files
     * (except any specified in `exclude`) will be included.
     */
    include?: string[];
    /**
     * Specify glob patterns for files (relative to the project root) to be
     * excluded when looking for source files. If not specified, only
     * `node_modules` will be excluded.
     */
    exclude?: string[];
    /**
     * Optional object of substitutions applied to document URLs (in the format {
     * fromString, toString }) for testing (e.g. remapping a production URL to a
     * staging URL). Not publicly documented.
     */
    documentUrlSubstitutions?: Record<string, string>;
    /**
     * The parser name, if using an internal parser.
     */
    parser: CodeConnectParser;
    /**
     * Label to use for the uploaded code examples
     */
    label?: string;
    /**
     * The URL of the Figma file to use during the interactive setup wizard for connecting code components to Figma components.
     */
    interactiveSetupFigmaFileUrl?: string;
};
export type CodeConnectExecutableParserConfig = BaseCodeConnectConfig & {
    parser: CodeConnectExecutableParser;
};
export type CodeConnectCustomExecutableParserConfig = BaseCodeConnectConfig & {
    parser: 'custom';
    parserCommand: string;
};
/**
 * React specific configuration
 */
export type CodeConnectReactConfig = BaseCodeConnectConfig & {
    parser: 'react';
    /**
     * Maps imports from their path on disk to the specified path.
     * This will rewrite the imports in generated code examples, so it works with
     * relative imports such as `import { Button } from "./"`.
     *
     * Example: { "src/components/*": "@ui/components" }
     * Would rewrite imports for components located in `src/components` to `@ui/components` in
     * generated code examples.
     * `import { Button } from "./"` -> `import { Button } from "@ui/components/Button"`
     */
    importPaths?: Record<string, string>;
    /**
     * For import resolution - this is a temporary solution to support projects that use
     * pnpm workspaces, as the compiler doesn't seem to be able to resolve imports when
     * the package in node_modules is a symlink. Need to look into this more and find a
     * better solution.
     */
    paths?: Record<string, string[]>;
    /**
     * Storybook specific configuration
     */
    storybook?: {
        /**
         * The URL of the Storybook instance for the project
         */
        url: string;
    };
};
export type CodeConnectHtmlConfig = BaseCodeConnectConfig & {};
export type CodeConnectConfig = CodeConnectReactConfig | CodeConnectExecutableParserConfig | CodeConnectCustomExecutableParserConfig | CodeConnectHtmlConfig | BaseCodeConnectConfig;
interface FigmaConfig {
    codeConnect?: CodeConnectConfig;
}
export declare function determineConfigFromProject(dir: string, exitOnError?: boolean): FigmaConfig | undefined;
export declare function determineLabelFromProject(dir: string): string | undefined;
export declare function getGitRemoteURL(repoPath: string): string;
/**
 * Uses `git rev-parse` to find absolute path to the root of the git repository
 */
export declare function getGitRepoAbsolutePath(filePath: string): string;
/**
 * Find the default branch name (master or main) for the git repository
 */
export declare function getGitRepoDefaultBranchName(repoPath: string): "master" | "main";
/**
 * Finds the URL of a remote file
 * @param filePath absolute file path on disk
 * @param repoURL remote URL, can be a GitHub, GitLab, Bitbucket, etc. URL.
 * @returns
 */
export declare function getRemoteFileUrl(filePath: string, repoURL?: string): string;
export declare function getStorybookUrl(filePath: string, storybookUrl: string): string;
export type ProjectInfo<ConfigT = CodeConnectConfig> = {
    /**
     * Absolute path of the project directory
     */
    absPath: string;
    /**
     * An array of all tsx files in the project
     */
    files: string[];
    /**
     * The git remote URL of the project
     */
    remoteUrl: string;
    /**
     * The parsed Code Connect config file
     */
    config: ConfigT;
};
export type ReactProjectInfo = ProjectInfo<CodeConnectReactConfig> & {
    /**
     * TS program containing all tsx files in the project
     */
    tsProgram: ts.Program;
};
export declare function getDefaultConfigPath(dir: string): string;
export declare function getEnvPath(dir: string): string;
export declare function parseOrDetermineConfig(dir: string, configPath: string): Promise<{
    config: CodeConnectConfig;
    hasConfigFile: boolean;
}>;
/**
 * Check if a .env file exists in the provided directory and if it contains a FIGMA_ACCESS_TOKEN.
 */
export declare function checkForEnvAndToken(dir: string): Promise<{
    hasEnvFile: boolean;
    envHasFigmaToken: boolean;
}>;
/**
 * Gets information about a project from config.
 *
 * @param dir Directory containing the project
 * @param config Code Connect config
 * @returns Object containing information about the project
 */
export declare function getProjectInfoFromConfig(dir: string, config: CodeConnectConfig): Promise<ProjectInfo>;
/**
 * Gets information about a project from a directory.
 *
 * @param dir Directory containing the project
 * @param configPath Optional path to Code Connect config file
 * @returns Object containing information about the project
 */
export declare function getProjectInfo(dir: string, configPath: string): Promise<ProjectInfo>;
export declare function getReactProjectInfo(projectInfo: ProjectInfo<CodeConnectReactConfig>): ReactProjectInfo;
export declare function getTsProgram(projectInfo: ProjectInfo<CodeConnectConfig>): ts.Program;
/**
 * Change an imported path for a component like `./button` to e.g `@ui/button`, based on the config file.
 * Note that `filePath` here is the path to the source file on disk, not the module specifier.
 *
 * @param filePath
 * @param config
 * @returns
 */
export declare function mapImportPath(filePath: string, config: CodeConnectReactConfig): string | null;
export {};
//# sourceMappingURL=project.d.ts.map