/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ReflectorReader } from './reflector_reader';
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export class Reflector extends ReflectorReader {
    constructor(reflectionCapabilities) {
        super();
        this.reflectionCapabilities = reflectionCapabilities;
    }
    updateCapabilities(caps) {
        this.reflectionCapabilities = caps;
    }
    factory(type) {
        return this.reflectionCapabilities.factory(type);
    }
    parameters(typeOrFunc) {
        return this.reflectionCapabilities.parameters(typeOrFunc);
    }
    annotations(typeOrFunc) {
        return this.reflectionCapabilities.annotations(typeOrFunc);
    }
    propMetadata(typeOrFunc) {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
    }
    hasLifecycleHook(type, lcProperty) {
        return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
    }
    getter(name) {
        return this.reflectionCapabilities.getter(name);
    }
    setter(name) {
        return this.reflectionCapabilities.setter(name);
    }
    method(name) {
        return this.reflectionCapabilities.method(name);
    }
    importUri(type) {
        return this.reflectionCapabilities.importUri(type);
    }
    resourceUri(type) {
        return this.reflectionCapabilities.resourceUri(type);
    }
    resolveIdentifier(name, moduleUrl, members, runtime) {
        return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
    }
    resolveEnum(identifier, name) {
        return this.reflectionCapabilities.resolveEnum(identifier, name);
    }
}
//# sourceMappingURL=reflector.js.map