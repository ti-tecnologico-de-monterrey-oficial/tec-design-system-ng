"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponents = getComponents;
const figma_rest_api_1 = require("../connect/figma_rest_api");
const helpers_1 = require("../connect/helpers");
require('dotenv').config();
/**
 * Fetch components from a figma file. If the `node-id` query parameter is used,
 * only components within those frames will be included. This is useful if your
 * file is very large, as this will speed up the query.
 *
 * @param fileOrNode a figma file URL
 * @param match a function that returns true if the component should be included
 * @returns
 */
async function getComponents(fileOrNode) {
    if (!process.env.FIGMA_ACCESS_TOKEN) {
        throw new Error('FIGMA_ACCESS_TOKEN is not set');
    }
    const fileKey = (0, helpers_1.parseFileKey)(fileOrNode);
    if (!fileKey) {
        throw new Error(`Invalid Figma file URL: ${fileOrNode}, file key missing`);
    }
    const nodeIds = (0, helpers_1.parseNodeIds)([fileOrNode]);
    let apiUrl = (0, figma_rest_api_1.getApiUrl)(fileOrNode ?? '') + `/files/${fileKey}`;
    if (nodeIds.length > 0) {
        apiUrl += `?ids=${nodeIds.join(',')}`;
    }
    const doc = await (0, figma_rest_api_1.getDocument)(apiUrl, process.env.FIGMA_ACCESS_TOKEN);
    // `doc` in this case will only include the top frame(s) passed via `ids`. We omit the
    // nodeIds arg here because we want to return all components within the frame(s)
    return (0, helpers_1.findComponentsInDocument)(doc).map((component) => ({
        ...component,
        fileKey,
        figmaUrl: (0, helpers_1.figmaUrlOfComponent)(component, fileKey),
        componentPropertyDefinitions: component.type === 'COMPONENT_SET'
            ? Object.keys(component.componentPropertyDefinitions).reduce((result, key) => {
                return {
                    ...result,
                    // this removes the ID prefix from property names e.g #123:name -> name
                    [(0, helpers_1.normalizePropName)(key)]: component.componentPropertyDefinitions[key],
                };
            }, {})
            : undefined,
    }));
}
//# sourceMappingURL=figma_client.js.map