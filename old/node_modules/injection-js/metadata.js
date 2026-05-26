/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { makeDecorator, makeParamDecorator } from './util/decorators';
/**
 * Inject decorator and metadata.
 *
 * @stable
 * @Annotation
 */
export const Inject = makeParamDecorator('Inject', [['token', undefined]]);
/**
 * Optional decorator and metadata.
 *
 * @stable
 * @Annotation
 */
export const Optional = makeParamDecorator('Optional', []);
/**
 * Injectable decorator and metadata.
 *
 * @stable
 * @Annotation
 */
export const Injectable = makeDecorator('Injectable', []);
/**
 * Self decorator and metadata.
 *
 * @stable
 * @Annotation
 */
export const Self = makeParamDecorator('Self', []);
/**
 * SkipSelf decorator and metadata.
 *
 * @stable
 * @Annotation
 */
export const SkipSelf = makeParamDecorator('SkipSelf', []);
/**
 * Host decorator and metadata.
 *
 * @stable
 * @Annotation
 */
export const Host = makeParamDecorator('Host', []);
//# sourceMappingURL=metadata.js.map