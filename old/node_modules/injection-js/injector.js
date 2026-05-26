/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { stringify } from './facade/lang';
const _THROW_IF_NOT_FOUND = new Object();
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
// tslint:disable-next-line:class-name no-use-before-declare
class _NullInjector {
    get(token, notFoundValue = _THROW_IF_NOT_FOUND) {
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            throw new Error(`No provider for ${stringify(token)}!`);
        }
        return notFoundValue;
    }
}
/**
 * @whatItDoes Injector interface
 * @howToUse
 * ```
 * const injector: Injector = ...;
 * injector.get(...);
 * ```
 *
 * @description
 * For more details, see the {@linkDocs guide/dependency-injection "Dependency Injection Guide"}.
 *
 * ### Example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @stable
 */
export class Injector {
}
Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
Injector.NULL = new _NullInjector();
//# sourceMappingURL=injector.js.map