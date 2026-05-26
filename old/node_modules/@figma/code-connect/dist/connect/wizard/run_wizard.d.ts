import { BaseCommand } from '../../commands/connect';
import prompts from 'prompts';
import { FigmaRestApi } from '../figma_rest_api';
import { ReactProjectInfo, CodeConnectConfig, ProjectInfo } from '../../connect/project';
import { CreateRequestPayload, CreateRequestPayloadMulti, PropMapping } from '../parser_executable_types';
import { ComponentTypeSignature } from '../../react/parser';
type ConnectedComponentMappings = {
    componentName: string;
    filepathExport: string;
}[];
/**
 * enable selection of a subset of components per page
 * @param components to narrow down from
 * @returns components narrowed down to the selected pages
 */
export declare function narrowDownComponentsPerPage(components: FigmaRestApi.Component[], pages: Record<string, string>): Promise<FigmaRestApi.Component[]>;
export declare function getComponentChoicesForPrompt(components: FigmaRestApi.Component[], linkedNodeIdsToFilepathExports: Record<string, string>, connectedComponentsMappings: ConnectedComponentMappings, dir: string): prompts.Choice[];
interface AddPayloadArgs {
    payloadType: 'MULTI_EXPORT' | 'SINGLE_EXPORT';
    filepath: string;
    sourceExport: string;
    reactTypeSignature?: ComponentTypeSignature;
    propMapping?: PropMapping;
    figmaNodeUrl: string;
    moreComponentProps: FigmaRestApi.Component;
    destinationDir: string;
    sourceFilepath: string;
    normalizedName: string;
    config: CodeConnectConfig;
}
export declare function addPayload(payloads: Record<string, CreateRequestPayloadMulti | CreateRequestPayload>, args: AddPayloadArgs): Promise<void>;
export declare function createCodeConnectFiles({ linkedNodeIdsToFilepathExports, figmaFileUrl, unconnectedComponentsMap, outDir: outDirArg, projectInfo, cmd, accessToken, useAi, }: {
    figmaFileUrl: string;
    linkedNodeIdsToFilepathExports: Record<string, string>;
    unconnectedComponentsMap: Record<string, FigmaRestApi.Component>;
    outDir: string | null;
    projectInfo: ProjectInfo;
    cmd: BaseCommand;
    accessToken: string;
    useAi: boolean;
}): Promise<boolean>;
export declare function convertRemoteFileUrlToRelativePath({ remoteFileUrl, gitRootPath, dir, }: {
    remoteFileUrl: string;
    gitRootPath: string;
    dir: string;
}): string | null;
export declare function getUnconnectedComponentsAndConnectedComponentMappings(cmd: BaseCommand, figmaFileUrl: string, componentsFromFile: FigmaRestApi.Component[], projectInfo: ProjectInfo<CodeConnectConfig> | ReactProjectInfo): Promise<{
    unconnectedComponents: FigmaRestApi.Component[];
    connectedComponentsMappings: ConnectedComponentMappings;
}>;
export declare function runWizard(cmd: BaseCommand): Promise<void>;
export {};
//# sourceMappingURL=run_wizard.d.ts.map