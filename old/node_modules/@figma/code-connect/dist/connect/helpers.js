"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNodeId = void 0;
exports.isComponent = isComponent;
exports.parseNodeIds = parseNodeIds;
exports.parseFileKey = parseFileKey;
exports.findComponentsInDocument = findComponentsInDocument;
exports.figmaUrlOfComponent = figmaUrlOfComponent;
exports.normalizePropName = normalizePropName;
exports.exitWithFeedbackMessage = exitWithFeedbackMessage;
const url = __importStar(require("url"));
const logging_1 = require("../common/logging");
const guidRegex = /^I?[0-9]+:[0-9]+(;[0-9]+:[0-9]+)*$/;
function isComponent(node) {
    return node.type === 'COMPONENT' || node.type === 'COMPONENT_SET';
}
const validateNodeId = function (id) {
    const newId = id.replace('-', ':');
    if (!guidRegex.test(newId)) {
        logging_1.logger.error(`Invalid figma node URL: the provided node-id "${id}" is invalid`);
        exitWithFeedbackMessage(1);
    }
    return newId;
};
exports.validateNodeId = validateNodeId;
function parseNodeIds(figmaNodeUrls) {
    const nodeIds = [];
    for (const nodeURL of figmaNodeUrls) {
        const figmaNodeUrl = url.parse(nodeURL, true);
        const nodeId = figmaNodeUrl.query['node-id'];
        if (nodeId && typeof nodeId === 'string') {
            const figmaNodeId = (0, exports.validateNodeId)(nodeId);
            nodeIds.push(figmaNodeId);
        }
        else if (Array.isArray(nodeId)) {
            for (const id of nodeId) {
                const figmaNodeId = (0, exports.validateNodeId)(id);
                nodeIds.push(figmaNodeId);
            }
        }
    }
    return nodeIds;
}
function parseFileKey(figmaNodeUrl) {
    return figmaNodeUrl.match(/(?:file|design)\/([a-zA-Z0-9]+)/)?.[1];
}
/**
 * Parses components from a Rest API response
 * @param document
 * @param nodeIds
 * @returns
 */
function findComponentsInDocument(document, nodeIds) {
    const components = [];
    const pages = document.children;
    for (const page of pages) {
        if (page.type !== 'CANVAS') {
            continue;
        }
        const pageId = page.id;
        const pageName = page.name;
        const stack = page.children;
        while (stack.length > 0) {
            const node = stack.pop();
            if (nodeIds && nodeIds.includes(node.id)) {
                if (!isComponent(node)) {
                    throw new Error('Specified node is not a component or a component set');
                }
                components.push({ ...node, pageId, pageName });
            }
            if (!nodeIds && isComponent(node)) {
                components.push({ ...node, pageId, pageName });
            }
            // don't traverse into component sets
            if (Array.isArray(node.children) && !isComponent(node)) {
                stack.push(...node.children);
            }
        }
    }
    return components;
}
/**
 * Gets the URL of a figma component
 *
 * @param component a published figma component
 * @returns a URL to the figma component
 */
function figmaUrlOfComponent(component, fileKey) {
    const fileUrl = process.env.FILE_URL || `https://figma.com/file/`;
    const nodeId = component.id.replace(':', '-');
    const urlId = nodeId.replace(':', '-');
    return `${fileUrl}${fileKey}/?node-id=${urlId}`;
}
/**
 * removes the ID part of a component property name
 */
function normalizePropName(name) {
    return name.replace(/#[0-9:]*/g, '');
}
/**
 * Displays a feedback/bugs issues link before exiting
 */
function exitWithFeedbackMessage(exitCode) {
    logging_1.logger.info('Please raise any bugs or feedback at https://github.com/figma/code-connect/issues.');
    process.exit(exitCode);
}
//# sourceMappingURL=helpers.js.map