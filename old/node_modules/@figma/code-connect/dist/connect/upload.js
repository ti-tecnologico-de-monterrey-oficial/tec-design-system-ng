"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = upload;
const logging_1 = require("../common/logging");
const figma_rest_api_1 = require("./figma_rest_api");
const helpers_1 = require("./helpers");
const validation_1 = require("./validation");
const fetch_1 = require("../common/fetch");
function codeConnectStr(doc) {
    return `${(0, logging_1.highlight)(doc.component ?? '')}${doc.variant ? `(${Object.entries(doc.variant).map(([key, value]) => `${key}=${value}`)})` : ''} ${(0, logging_1.underline)(doc.figmaNode)}`;
}
async function upload({ accessToken, docs, batchSize, verbose }) {
    const apiUrl = (0, figma_rest_api_1.getApiUrl)(docs?.[0]?.figmaNode ?? '') + '/code_connect';
    try {
        logging_1.logger.info(`Uploading to Figma...`);
        if (batchSize) {
            if (typeof batchSize !== 'number') {
                logging_1.logger.error('Batch size must be a number');
                (0, helpers_1.exitWithFeedbackMessage)(1);
            }
            // batch together based on fileKey + nodeId as all variants etc of the same node should be uploaded together
            // Otherwise, the server will overwrite the previous upload
            const groupedDocs = docs.reduce((acc, doc) => {
                const parsedData = (0, validation_1.parseFigmaNode)(verbose, doc);
                if (!parsedData) {
                    (0, helpers_1.exitWithFeedbackMessage)(1);
                }
                const { fileKey, nodeId } = parsedData;
                const accKey = fileKey + ',' + nodeId;
                if (!acc[accKey]) {
                    acc[accKey] = [];
                }
                acc[accKey].push(doc);
                return acc;
            }, {});
            const batchedDocs = [];
            const nodeKeys = Object.keys(groupedDocs);
            for (let i = 0; i < nodeKeys.length; i += batchSize) {
                const batch = [];
                for (let j = i; j < i + batchSize && j < nodeKeys.length; j++) {
                    const nodeKey = nodeKeys[j];
                    batch.push(...groupedDocs[nodeKey]);
                }
                batchedDocs.push(batch);
            }
            let currentBatch = 1;
            const noOfBatches = batchedDocs.length;
            for (const batch of batchedDocs) {
                process.stderr.write('\x1b[2K\x1b[0G');
                process.stderr.write(`Uploading batch ${currentBatch}/${noOfBatches}`);
                var size = Buffer.byteLength(JSON.stringify(batch)) / (1024 * 1024);
                // Server has a limit of 5mb
                if (size > 5) {
                    logging_1.logger.error(`Failed to upload to Figma: The request is too large (${size.toFixed(2)}mb).`);
                    logging_1.logger.error('Please try reducing the size of uploads by splitting them into smaller requests by running again and decreasing the --batch-size parameter.');
                    (0, helpers_1.exitWithFeedbackMessage)(1);
                }
                logging_1.logger.debug(`Uploading ${size.toFixed(2)}mb to Figma`);
                await fetch_1.request.post(apiUrl, batch, {
                    headers: (0, figma_rest_api_1.getHeaders)(accessToken),
                });
                currentBatch++;
            }
            process.stderr.write(`\n`);
        }
        else {
            var size = Buffer.byteLength(JSON.stringify(docs)) / (1024 * 1024);
            // Server has a limit of 5mb
            if (size > 5) {
                logging_1.logger.error(`Failed to upload to Figma: The request is too large (${size.toFixed(2)}mb).`);
                logging_1.logger.error('Please try reducing the size of uploads by splitting them into smaller requests by running again with the --batch-size parameter. You can do also this by running on different subdirectories using the --dir flag or by iteratively adjusting the includes field in the configuration.');
                (0, helpers_1.exitWithFeedbackMessage)(1);
            }
            logging_1.logger.debug(`Uploading ${size.toFixed(2)}mb to Figma`);
            await fetch_1.request.post(apiUrl, docs, {
                headers: (0, figma_rest_api_1.getHeaders)(accessToken),
            });
        }
        const docsByLabel = docs.reduce((acc, doc) => {
            if (acc[doc.label]) {
                acc[doc.label].push(doc);
            }
            else {
                acc[doc.label] = [doc];
            }
            return acc;
        }, {});
        for (const [label, docs] of Object.entries(docsByLabel)) {
            logging_1.logger.info(`Successfully uploaded to Figma, for ${label}:\n${docs.map((doc) => `-> ${codeConnectStr(doc)}`).join('\n')}`);
        }
    }
    catch (err) {
        if ((0, fetch_1.isFetchError)(err)) {
            if (err.response) {
                logging_1.logger.error(`Failed to upload to Figma (${err.response.status}): ${err.response.status} ${err.data?.message}`);
            }
            else {
                logging_1.logger.error(`Failed to upload to Figma: ${err.message}`);
            }
            logging_1.logger.debug(JSON.stringify(err?.data));
        }
        else {
            logging_1.logger.error(`Failed to upload to Figma: ${err}`);
        }
        (0, helpers_1.exitWithFeedbackMessage)(1);
    }
}
//# sourceMappingURL=upload.js.map