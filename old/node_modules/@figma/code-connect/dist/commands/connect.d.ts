import * as commander from 'commander';
import { ProjectInfo } from '../connect/project';
import { CodeConnectJSON } from '../connect/figma_connect';
export type BaseCommand = commander.Command & {
    token: string;
    verbose: boolean;
    outFile: string;
    outDir: string;
    config: string;
    dryRun: boolean;
    dir: string;
    jsonFile: string;
    skipUpdateCheck: boolean;
    exitOnUnreadableFiles: boolean;
};
export declare function addConnectCommandToProgram(program: commander.Command): void;
export declare function getAccessToken(cmd: BaseCommand): string;
export declare function getDir(cmd: BaseCommand): string;
export declare function parseRawFile(filePath: string, label: string | undefined): CodeConnectJSON;
export declare function getCodeConnectObjects(cmd: BaseCommand & {
    label?: string;
    includeTemplateFiles?: boolean;
}, projectInfo: ProjectInfo, silent?: boolean): Promise<CodeConnectJSON[]>;
//# sourceMappingURL=connect.d.ts.map