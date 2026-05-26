import { CodeConnectJSON } from '../connect/figma_connect';
import { BaseCommand } from '../commands/connect';
export declare function parseFigmaNode(verbose: boolean, doc: CodeConnectJSON, silent?: boolean): {
    fileKey: string;
    nodeId: string;
} | null;
export declare const STATE_BOOLEAN_VALUE_PAIRS: string[][];
export declare function validateDoc(doc: CodeConnectJSON, figmaNode: any, nodeId: string): boolean;
export declare function validateDocs(cmd: BaseCommand, accessToken: string, docs: CodeConnectJSON[]): Promise<boolean>;
//# sourceMappingURL=validation.d.ts.map