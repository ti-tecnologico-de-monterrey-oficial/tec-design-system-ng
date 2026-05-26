import { CodeConnectJSON } from '../connect/figma_connect';
interface Args {
    accessToken: string;
    docs: CodeConnectJSON[];
    batchSize?: number;
    verbose: boolean;
}
export declare function upload({ accessToken, docs, batchSize, verbose }: Args): Promise<void>;
export {};
//# sourceMappingURL=upload.d.ts.map