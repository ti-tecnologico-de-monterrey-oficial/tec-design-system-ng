interface NodesToDeleteInfo {
    figmaNode: string;
    label: string;
}
interface Args {
    accessToken: string;
    docs: NodesToDeleteInfo[];
}
export declare function delete_docs({ accessToken, docs }: Args): Promise<void>;
export {};
//# sourceMappingURL=delete_docs.d.ts.map