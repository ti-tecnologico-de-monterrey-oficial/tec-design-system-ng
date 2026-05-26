import { FigmaRestApi } from '../connect/figma_rest_api';
export interface ComponentInfo {
    id: string;
    name: string;
    fileKey: string;
    figmaUrl: string;
}
export interface FigmaConnectClient {
    /**
     * Fetches components from a figma file, filtering out components that don't
     * match the provided function.
     *
     * @param fileOrNode figma URL
     * @param match a function that returns true if the component should be
     * included
     * @returns a list of components
     */
    getComponents: (fileOrNode: string) => Promise<(FigmaRestApi.Component & ComponentInfo)[]>;
}
/**
 * Fetch components from a figma file. If the `node-id` query parameter is used,
 * only components within those frames will be included. This is useful if your
 * file is very large, as this will speed up the query.
 *
 * @param fileOrNode a figma file URL
 * @param match a function that returns true if the component should be included
 * @returns
 */
export declare function getComponents(fileOrNode: string): Promise<{
    fileKey: string;
    figmaUrl: string;
    componentPropertyDefinitions: {} | undefined;
    type: "COMPONENT" | "COMPONENT_SET";
    pageId: string;
    pageName: string;
    name: string;
    id: string;
    children: FigmaRestApi.Node[];
}[]>;
//# sourceMappingURL=figma_client.d.ts.map