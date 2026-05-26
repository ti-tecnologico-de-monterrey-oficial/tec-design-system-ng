export type EmbeddingsResponse = {
    status: number;
    error: boolean;
    meta: {
        embeddings: number[][];
    };
};
export declare function fetchEmbeddings({ uniqueMatchableNames, accessToken, figmaUrl, }: {
    uniqueMatchableNames: string[];
    accessToken: string;
    figmaUrl: string;
}): Promise<EmbeddingsResponse>;
//# sourceMappingURL=embeddings.d.ts.map