"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEmbeddings = fetchEmbeddings;
const fetch_1 = require("../../common/fetch");
const figma_rest_api_1 = require("../figma_rest_api");
const helpers_1 = require("../helpers");
async function fetchEmbeddings({ uniqueMatchableNames, accessToken, figmaUrl, }) {
    const apiUrl = (0, figma_rest_api_1.getApiUrl)(figmaUrl);
    const fileKey = (0, helpers_1.parseFileKey)(figmaUrl);
    const result = await fetch_1.request.post(apiUrl + '/code_connect/name_embeddings', uniqueMatchableNames, {
        headers: (0, figma_rest_api_1.getHeaders)(accessToken),
        query: {
            file_key: fileKey,
        },
    });
    return result.data;
}
//# sourceMappingURL=embeddings.js.map