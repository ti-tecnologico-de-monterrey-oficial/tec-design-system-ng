import { FigmaRestApi } from './figma_rest_api';
export declare function isComponent(node: FigmaRestApi.Node): node is FigmaRestApi.Component;
export declare const validateNodeId: (id: string) => string;
export declare function parseNodeIds(figmaNodeUrls: string[]): string[];
export declare function parseFileKey(figmaNodeUrl: string): string | undefined;
/**
 * Parses components from a Rest API response
 * @param document
 * @param nodeIds
 * @returns
 */
export declare function findComponentsInDocument(document: FigmaRestApi.Node, nodeIds?: string[]): FigmaRestApi.Component[];
/**
 * Gets the URL of a figma component
 *
 * @param component a published figma component
 * @returns a URL to the figma component
 */
export declare function figmaUrlOfComponent(component: FigmaRestApi.Component, fileKey: string): string;
/**
 * removes the ID part of a component property name
 */
export declare function normalizePropName(name: string): string;
/**
 * Displays a feedback/bugs issues link before exiting
 */
export declare function exitWithFeedbackMessage(exitCode: number): never;
//# sourceMappingURL=helpers.d.ts.map