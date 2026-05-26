/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { global, stringify } from '../facade/lang';
let _nextClassId = 0;
const Reflect = global['Reflect'];
function extractAnnotation(annotation) {
    if (typeof annotation === 'function' && annotation.hasOwnProperty('annotation')) {
        // it is a decorator, extract annotation
        annotation = annotation.annotation;
    }
    return annotation;
}
function applyParams(fnOrArray, key) {
    if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function || fnOrArray === Number || fnOrArray === Array) {
        throw new Error(`Can not use native ${stringify(fnOrArray)} as constructor`);
    }
    if (typeof fnOrArray === 'function') {
        return fnOrArray;
    }
    if (Array.isArray(fnOrArray)) {
        const annotations = fnOrArray;
        const annoLength = annotations.length - 1;
        const fn = fnOrArray[annoLength];
        if (typeof fn !== 'function') {
            throw new Error(`Last position of Class method array must be Function in key ${key} was '${stringify(fn)}'`);
        }
        if (annoLength !== fn.length) {
            throw new Error(`Number of annotations (${annoLength}) does not match number of arguments (${fn.length}) in the function: ${stringify(fn)}`);
        }
        const paramsAnnotations = [];
        for (let i = 0, ii = annotations.length - 1; i < ii; i++) {
            const paramAnnotations = [];
            paramsAnnotations.push(paramAnnotations);
            const annotation = annotations[i];
            if (Array.isArray(annotation)) {
                for (let j = 0; j < annotation.length; j++) {
                    paramAnnotations.push(extractAnnotation(annotation[j]));
                }
            }
            else if (typeof annotation === 'function') {
                paramAnnotations.push(extractAnnotation(annotation));
            }
            else {
                paramAnnotations.push(annotation);
            }
        }
        Reflect.defineMetadata('parameters', paramsAnnotations, fn);
        return fn;
    }
    throw new Error(`Only Function or Array is supported in Class definition for key '${key}' is '${stringify(fnOrArray)}'`);
}
/**
 * Provides a way for expressing ES6 classes with parameter annotations in ES5.
 *
 * ## Basic Example
 *
 * ```
 * var Greeter = ng.Class({
 *   constructor: function(name) {
 *     this.name = name;
 *   },
 *
 *   greet: function() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class Greeter {
 *   constructor(name) {
 *     this.name = name;
 *   }
 *
 *   greet() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * }
 * ```
 *
 * or equivalent to ES5:
 *
 * ```
 * var Greeter = function (name) {
 *   this.name = name;
 * }
 *
 * Greeter.prototype.greet = function () {
 *   alert('Hello ' + this.name + '!');
 * }
 * ```
 *
 * ### Example with parameter annotations
 *
 * ```
 * var MyService = ng.Class({
 *   constructor: [String, [new Optional(), Service], function(name, myService) {
 *     ...
 *   }]
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class MyService {
 *   constructor(name: string, @Optional() myService: Service) {
 *     ...
 *   }
 * }
 * ```
 *
 * ### Example with inheritance
 *
 * ```
 * var Shape = ng.Class({
 *   constructor: (color) {
 *     this.color = color;
 *   }
 * });
 *
 * var Square = ng.Class({
 *   extends: Shape,
 *   constructor: function(color, size) {
 *     Shape.call(this, color);
 *     this.size = size;
 *   }
 * });
 * ```
 * @suppress {globalThis}
 * @stable
 */
export function Class(clsDef) {
    const constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
    let proto = constructor.prototype;
    if (clsDef.hasOwnProperty('extends')) {
        if (typeof clsDef.extends === 'function') {
            constructor.prototype = proto = Object.create(clsDef.extends.prototype);
        }
        else {
            throw new Error(`Class definition 'extends' property must be a constructor function was: ${stringify(clsDef.extends)}`);
        }
    }
    for (const key in clsDef) {
        if (key !== 'extends' && key !== 'prototype' && clsDef.hasOwnProperty(key)) {
            proto[key] = applyParams(clsDef[key], key);
        }
    }
    if (this && this.annotations instanceof Array) {
        Reflect.defineMetadata('annotations', this.annotations, constructor);
    }
    const constructorName = constructor['name'];
    if (!constructorName || constructorName === 'constructor') {
        constructor['overriddenName'] = `class${_nextClassId++}`;
    }
    return constructor;
}
/**
 * @suppress {globalThis}
 */
export function makeDecorator(name, props, parentClass, chainFn) {
    const metaCtor = makeMetadataCtor([props]);
    function DecoratorFactory(objOrType) {
        if (!(Reflect && Reflect.getOwnMetadata)) {
            throw 'reflect-metadata shim is required when using class decorators';
        }
        if (this instanceof DecoratorFactory) {
            metaCtor.call(this, objOrType);
            return this;
        }
        const annotationInstance = new DecoratorFactory(objOrType);
        const chainAnnotation = typeof this === 'function' && Array.isArray(this.annotations) ? this.annotations : [];
        chainAnnotation.push(annotationInstance);
        const TypeDecorator = function TypeDecorator(cls) {
            const annotations = Reflect.getOwnMetadata('annotations', cls) || [];
            annotations.push(annotationInstance);
            Reflect.defineMetadata('annotations', annotations, cls);
            return cls;
        };
        TypeDecorator.annotations = chainAnnotation;
        TypeDecorator.Class = Class;
        if (chainFn)
            chainFn(TypeDecorator);
        return TypeDecorator;
    }
    if (parentClass) {
        DecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    DecoratorFactory.prototype.toString = () => `@${name}`;
    DecoratorFactory.annotationCls = DecoratorFactory;
    return DecoratorFactory;
}
function makeMetadataCtor(props) {
    return function ctor(...args) {
        props.forEach((prop, i) => {
            const argVal = args[i];
            if (Array.isArray(prop)) {
                // plain parameter
                this[prop[0]] = argVal === undefined ? prop[1] : argVal;
            }
            else {
                for (const propName in prop) {
                    this[propName] = argVal && argVal.hasOwnProperty(propName) ? argVal[propName] : prop[propName];
                }
            }
        });
    };
}
export function makeParamDecorator(name, props, parentClass) {
    const metaCtor = makeMetadataCtor(props);
    function ParamDecoratorFactory(...args) {
        if (this instanceof ParamDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        const annotationInstance = new ParamDecoratorFactory(...args);
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
        function ParamDecorator(cls, unusedKey, index) {
            const parameters = Reflect.getOwnMetadata('parameters', cls) || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = parameters[index] || [];
            parameters[index].push(annotationInstance);
            Reflect.defineMetadata('parameters', parameters, cls);
            return cls;
        }
    }
    if (parentClass) {
        ParamDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    ParamDecoratorFactory.prototype.toString = () => `@${name}`;
    ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
    return ParamDecoratorFactory;
}
export function makePropDecorator(name, props, parentClass) {
    const metaCtor = makeMetadataCtor(props);
    function PropDecoratorFactory(...args) {
        if (this instanceof PropDecoratorFactory) {
            metaCtor.apply(this, args);
            return this;
        }
        const decoratorInstance = new PropDecoratorFactory(...args);
        return function PropDecorator(target, name) {
            const meta = Reflect.getOwnMetadata('propMetadata', target.constructor) || {};
            meta[name] = (meta.hasOwnProperty(name) && meta[name]) || [];
            meta[name].unshift(decoratorInstance);
            Reflect.defineMetadata('propMetadata', meta, target.constructor);
        };
    }
    if (parentClass) {
        PropDecoratorFactory.prototype = Object.create(parentClass.prototype);
    }
    PropDecoratorFactory.prototype.toString = () => `@${name}`;
    PropDecoratorFactory.annotationCls = PropDecoratorFactory;
    return PropDecoratorFactory;
}
//# sourceMappingURL=decorators.js.map