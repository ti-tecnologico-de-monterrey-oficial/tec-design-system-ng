/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { reflector } from './reflection/reflection';
import { Type } from './facade/type';
import { resolveForwardRef } from './forward_ref';
import { InjectionToken } from './injection_token';
import { Inject, Optional, Self, SkipSelf } from './metadata';
import { invalidProviderError, mixingMultiProvidersWithRegularProvidersError, noAnnotationError } from './reflective_errors';
import { ReflectiveKey } from './reflective_key';
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
export class ReflectiveDependency {
    constructor(key, optional, visibility) {
        this.key = key;
        this.optional = optional;
        this.visibility = visibility;
    }
    static fromKey(key) {
        return new ReflectiveDependency(key, false, null);
    }
}
const _EMPTY_LIST = [];
// tslint:disable-next-line:class-name
export class ResolvedReflectiveProvider_ {
    constructor(key, resolvedFactories, multiProvider) {
        this.key = key;
        this.resolvedFactories = resolvedFactories;
        this.multiProvider = multiProvider;
    }
    get resolvedFactory() {
        return this.resolvedFactories[0];
    }
}
/**
 * An internal resolved representation of a factory function created by resolving {@link
 * Provider}.
 * @experimental
 */
export class ResolvedReflectiveFactory {
    constructor(
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    factory, 
    /**
     * Arguments (dependencies) to the `factory` function.
     */
    dependencies) {
        this.factory = factory;
        this.dependencies = dependencies;
    }
}
/**
 * Resolve a single provider.
 */
function resolveReflectiveFactory(provider) {
    let factoryFn;
    let resolvedDeps;
    if (provider.useClass) {
        const useClass = resolveForwardRef(provider.useClass);
        factoryFn = reflector.factory(useClass);
        resolvedDeps = _dependenciesFor(useClass);
    }
    else if (provider.useExisting) {
        factoryFn = (aliasInstance) => aliasInstance;
        resolvedDeps = [ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting))];
    }
    else if (provider.useFactory) {
        factoryFn = provider.useFactory;
        resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
    }
    else {
        factoryFn = () => provider.useValue;
        resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
}
/**
 * Converts the {@link Provider} into {@link ResolvedProvider}.
 *
 * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
 * convenience provider syntax.
 */
function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [resolveReflectiveFactory(provider)], provider.multi || false);
}
/**
 * Resolve a list of Providers.
 */
export function resolveReflectiveProviders(providers) {
    const normalized = _normalizeProviders(providers, []);
    const resolved = normalized.map(resolveReflectiveProvider);
    const resolvedProviderMap = mergeResolvedReflectiveProviders(resolved, new Map());
    return Array.from(resolvedProviderMap.values());
}
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 */
export function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (let i = 0; i < providers.length; i++) {
        const provider = providers[i];
        const existing = normalizedProvidersMap.get(provider.key.id);
        if (existing) {
            if (provider.multiProvider !== existing.multiProvider) {
                throw mixingMultiProvidersWithRegularProvidersError(existing, provider);
            }
            if (provider.multiProvider) {
                for (let j = 0; j < provider.resolvedFactories.length; j++) {
                    existing.resolvedFactories.push(provider.resolvedFactories[j]);
                }
            }
            else {
                normalizedProvidersMap.set(provider.key.id, provider);
            }
        }
        else {
            let resolvedProvider;
            if (provider.multiProvider) {
                resolvedProvider = new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider);
            }
            else {
                resolvedProvider = provider;
            }
            normalizedProvidersMap.set(provider.key.id, resolvedProvider);
        }
    }
    return normalizedProvidersMap;
}
function _normalizeProviders(providers, res) {
    providers.forEach((b) => {
        if (b instanceof Type) {
            res.push({ provide: b, useClass: b });
        }
        else if (b && typeof b === 'object' && b.provide !== undefined) {
            res.push(b);
        }
        else if (b instanceof Array) {
            _normalizeProviders(b, res);
        }
        else {
            throw invalidProviderError(b);
        }
    });
    return res;
}
export function constructDependencies(typeOrFunc, dependencies) {
    if (!dependencies) {
        return _dependenciesFor(typeOrFunc);
    }
    else {
        const params = dependencies.map((t) => [t]);
        return dependencies.map((t) => _extractToken(typeOrFunc, t, params));
    }
}
function _dependenciesFor(typeOrFunc) {
    const params = reflector.parameters(typeOrFunc);
    if (!params)
        return [];
    if (params.some((p) => p == null)) {
        throw noAnnotationError(typeOrFunc, params);
    }
    return params.map((p) => _extractToken(typeOrFunc, p, params));
}
function _extractToken(typeOrFunc, metadata, params) {
    let token = null;
    let optional = false;
    if (!Array.isArray(metadata)) {
        if (metadata instanceof Inject) {
            return _createDependency(metadata['token'], optional, null);
        }
        else {
            return _createDependency(metadata, optional, null);
        }
    }
    let visibility = null;
    for (let i = 0; i < metadata.length; ++i) {
        const paramMetadata = metadata[i];
        if (paramMetadata instanceof Type) {
            token = paramMetadata;
        }
        else if (paramMetadata instanceof Inject) {
            token = paramMetadata['token'];
        }
        else if (paramMetadata instanceof Optional) {
            optional = true;
        }
        else if (paramMetadata instanceof Self || paramMetadata instanceof SkipSelf) {
            visibility = paramMetadata;
        }
        else if (paramMetadata instanceof InjectionToken) {
            token = paramMetadata;
        }
    }
    token = resolveForwardRef(token);
    if (token != null) {
        return _createDependency(token, optional, visibility);
    }
    else {
        throw noAnnotationError(typeOrFunc, params);
    }
}
function _createDependency(token, optional, visibility) {
    return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
}
//# sourceMappingURL=reflective_provider.js.map