"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_docs = delete_docs;
const fetch_1 = require("../common/fetch");
const logging_1 = require("../common/logging");
const figma_rest_api_1 = require("./figma_rest_api");
const helpers_1 = require("./helpers");
async function delete_docs({ accessToken, docs }) {
    const apiUrl = (0, figma_rest_api_1.getApiUrl)(docs?.[0]?.figmaNode ?? '') + '/code_connect';
    try {
        logging_1.logger.info(`Unpublishing Code Connect files from Figma...`);
        await fetch_1.request.delete(apiUrl, { nodes_to_delete: docs }, {
            headers: (0, figma_rest_api_1.getHeaders)(accessToken),
        });
        logging_1.logger.info(`Successfully deleted:\n${docs.map((doc) => `-> ${doc.figmaNode} (${doc.label})`).join('\n')}`);
    }
    catch (err) {
        if ((0, fetch_1.isFetchError)(err)) {
            if (err.response) {
                logging_1.logger.error(`Failed to upload to Figma (${err.response.status}): ${err.response.status} ${err.data?.err ?? err.data?.message}`);
            }
            else {
                logging_1.logger.error(`Failed to upload to Figma: ${err.message}`);
            }
            logging_1.logger.debug(JSON.stringify(err.data));
        }
        else {
            logging_1.logger.error(`Failed to delete docs: ${err}`);
        }
        (0, helpers_1.exitWithFeedbackMessage)(1);
    }
}
//# sourceMappingURL=delete_docs.js.map