"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.isFetchError = void 0;
exports.getProxyUrl = getProxyUrl;
const undici_1 = require("undici");
class FetchError extends Error {
    constructor(response, data) {
        super();
        this.response = response;
        this.data = data;
    }
}
const isFetchError = (error) => {
    return error instanceof FetchError;
};
exports.isFetchError = isFetchError;
function getProxyUrl() {
    return (process.env.HTTPS_PROXY ||
        process.env.HTTP_PROXY ||
        process.env.https_proxy ||
        process.env.http_proxy);
}
/**
 * Creates a ProxyAgent and sets it as the global dispatcher via unidici (which
 * affects fetch calls) if a proxy is set either in VS Code settings or as an
 * environment variable.
 */
const proxyUrl = getProxyUrl();
const agent = proxyUrl ? new undici_1.ProxyAgent({ uri: proxyUrl }) : undefined;
if (agent) {
    (0, undici_1.setGlobalDispatcher)(agent);
}
/**
 * Makes a request to the Figma API. This is used by other functions to make
 * various types of requests. We return both the response object, and the data
 * parsed as JSON, to make it easier to work with the response.
 */
async function makeRequestInternal(url, method, options = {}, body) {
    const urlObj = new URL(url);
    if (options?.query) {
        Object.entries(options.query).forEach(([key, value]) => {
            urlObj.searchParams.append(key, value);
        });
    }
    url = urlObj.toString();
    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(url, { ...options, method });
    if (!response.ok) {
        let data;
        try {
            data = await response.json();
        }
        catch (e) {
            data = undefined;
        }
        throw new FetchError(response, data);
    }
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};
    return { response, data };
}
exports.request = {
    get: (url, options = {}) => {
        return makeRequestInternal(url, 'GET', options);
    },
    post: (url, body, options = {}) => {
        return makeRequestInternal(url, 'POST', options, body);
    },
    put: (url, body, options = {}) => {
        return makeRequestInternal(url, 'PUT', options, body);
    },
    delete: (url, body, options = {}) => {
        return makeRequestInternal(url, 'DELETE', options, body);
    },
};
//# sourceMappingURL=fetch.js.map