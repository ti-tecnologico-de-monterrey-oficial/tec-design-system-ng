/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export const ERROR_TYPE = 'ngType';
export const ERROR_COMPONENT_TYPE = 'ngComponentType';
export const ERROR_DEBUG_CONTEXT = 'ngDebugContext';
export const ERROR_ORIGINAL_ERROR = 'ngOriginalError';
export const ERROR_LOGGER = 'ngErrorLogger';
export function getType(error) {
    return error[ERROR_TYPE];
}
export function getDebugContext(error) {
    return error[ERROR_DEBUG_CONTEXT];
}
export function getOriginalError(error) {
    return error[ERROR_ORIGINAL_ERROR];
}
function defaultErrorLogger(console, ...values) {
    console.error(...values);
}
export function getErrorLogger(error) {
    return error[ERROR_LOGGER] || defaultErrorLogger;
}
export function wrappedError(message, originalError) {
    const msg = `${message} caused by: ${originalError instanceof Error ? originalError.message : originalError}`;
    const error = Error(msg);
    error[ERROR_ORIGINAL_ERROR] = originalError;
    return error;
}
//# sourceMappingURL=errors.js.map