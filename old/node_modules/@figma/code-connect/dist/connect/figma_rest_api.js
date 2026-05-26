"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FigmaRestApi = void 0;
exports.getApiUrl = getApiUrl;
exports.getHeaders = getHeaders;
exports.getDocument = getDocument;
const fetch_1 = require("../common/fetch");
const logging_1 = require("../common/logging");
const version = require('../../package.json').version;
function getApiUrl(figmaNode) {
    return 'https://api.figma.com/v1';
}
function getHeaders(accessToken) {
    return {
        'X-Figma-Token': accessToken,
        'Content-Type': 'application/json',
        'User-Agent': `code-connect-cli/${version}`,
    };
}
// These typings are a subset of the Figma REST API
var FigmaRestApi;
(function (FigmaRestApi) {
    let ComponentPropertyType;
    (function (ComponentPropertyType) {
        ComponentPropertyType["Boolean"] = "BOOLEAN";
        ComponentPropertyType["InstanceSwap"] = "INSTANCE_SWAP";
        ComponentPropertyType["Text"] = "TEXT";
        ComponentPropertyType["Variant"] = "VARIANT";
    })(ComponentPropertyType = FigmaRestApi.ComponentPropertyType || (FigmaRestApi.ComponentPropertyType = {}));
})(FigmaRestApi || (exports.FigmaRestApi = FigmaRestApi = {}));
async function getDocument(url, accessToken) {
    try {
        logging_1.logger.info('Fetching component information from Figma...');
        const response = await fetch_1.request.get(url, {
            headers: getHeaders(accessToken),
        });
        if (response.response.status === 200) {
            logging_1.logger.info('Successfully fetched component information from Figma');
            return response.data.document;
        }
        else {
            logging_1.logger.error(`Failed to get node information from Figma with status: ${response.response.status}`);
            logging_1.logger.debug('Failed to get node information from Figma with Body:', response.data);
            return Promise.reject();
        }
    }
    catch (err) {
        if ((0, fetch_1.isFetchError)(err)) {
            if (err.response) {
                logging_1.logger.error(`Failed to get node data from Figma (${err.response.status}): ${err.response.status} ${err.data?.err ?? err.data?.message}`);
            }
            else {
                logging_1.logger.error(`Failed to get node data from Figma: ${err.message}`);
            }
            logging_1.logger.debug(JSON.stringify(err.data));
        }
        else {
            logging_1.logger.error(`Failed to create: ${err}`);
        }
        return Promise.reject();
    }
}
//# sourceMappingURL=figma_rest_api.js.map