"use strict";
/* istanbul ignore file */
// This file needs to be ignored from code coverage, as Istanbul adds extra calls
// to `cov_*` functions which are used to track coverage, but these functions
// can't be resolved when executing the templates from the unit tests inside
// `new Function()`
Object.defineProperty(exports, "__esModule", { value: true });
exports._fcc_array = _fcc_array;
exports._fcc_jsxElement = _fcc_jsxElement;
exports._fcc_function = _fcc_function;
exports._fcc_identifier = _fcc_identifier;
exports._fcc_object = _fcc_object;
exports._fcc_templateString = _fcc_templateString;
exports._fcc_reactComponent = _fcc_reactComponent;
exports.getParsedTemplateHelpersString = getParsedTemplateHelpersString;
function _fcc_array($value) {
    return {
        $value,
        $type: 'array',
    };
}
function _fcc_jsxElement($value) {
    return {
        $value,
        $type: 'jsx-element',
    };
}
function _fcc_function($value) {
    return {
        $value,
        $type: 'function',
    };
}
function _fcc_identifier($value) {
    return {
        $value,
        $type: 'identifier',
    };
}
function _fcc_object($value) {
    return {
        $value,
        $type: 'object',
        ...$value,
    };
}
function _fcc_templateString($value) {
    return {
        $value,
        $type: 'template-string',
    };
}
function _fcc_reactComponent($value) {
    return {
        $value,
        $type: 'react-component',
    };
}
function isReactComponentArray(prop) {
    return (Array.isArray(prop) &&
        prop.every((item) => item.type === 'INSTANCE' || item.type === 'CODE' || item.type === 'ERROR'));
}
// Render a prop value passed to an object literal based on its type.
// for example: <Button sx={{ key: value }} />
function _fcc_renderPropValue(prop) {
    if (isReactComponentArray(prop)) {
        return prop;
    }
    if (prop === undefined) {
        return 'undefined';
    }
    // Replace any newlines or quotes in the string with escaped versions
    if (typeof prop === 'string') {
        const str = `"${prop.replaceAll('\n', '\\n').replaceAll('"', '\\"')}"`;
        if (str === '') {
            return 'undefined';
        }
        else {
            return str;
        }
    }
    if (typeof prop === 'boolean' || typeof prop === 'number') {
        return prop;
    }
    if (prop.$type === 'function' ||
        prop.$type === 'identifier' ||
        prop.$type === 'jsx-element' ||
        prop.$type === 'react-component') {
        return prop.$value;
    }
    if (prop.$type === 'array') {
        return `[${prop.$value.map((el) => _fcc_renderPropValue(el))}]`;
    }
    if (prop.$type === 'object') {
        return `{${Object.keys(prop.$value)
            .map((key) => ` ${key}: ${_fcc_renderPropValue(prop.$value[key])} `)
            .join(',')}}`;
    }
    if (prop.$type === 'template-string') {
        return `\`${prop.$value}\``;
    }
    return 'undefined';
}
// Render a React prop correctly, based on its type
function _fcc_renderReactProp(name, prop) {
    // If the value is an array, then it's an array of objects representing React
    // children (either of type INSTANCE for pills, or CODE for inline code). The
    // template string handler in the template API handles extracting the instance
    // objects in a way the UI can handle.
    if (isReactComponentArray(prop)) {
        if (prop.length > 1) {
            // If the array has multiple children, render them wrapped in braces and a
            // fragment.
            //
            // We recursively call `figma.tsx` on the value as it itself is an array of
            // CODE/INSTANCE sections, so we need to run it through the template string
            // function otherwise this would just output `[object Object]` for the value.
            // The template string handler function handles flattening nested arrays.
            return figma.tsx ` ${name}={<>${prop}</>}`;
        }
        else {
            // Render a single child wrapped in braces, see above for why we use `figma.tsx`
            return figma.tsx ` ${name}={${prop}}`;
        }
    }
    // Render either the prop name or nothing for a boolean, we don't want to
    // render `prop={true/false}`
    if (typeof prop === 'boolean') {
        return prop ? ` ${name}` : '';
    }
    // Replace any newlines or quotes in the string with escaped versions
    if (typeof prop === 'string') {
        const str = prop.replaceAll('\n', '\\n').replaceAll('"', '\\"');
        if (str === '') {
            return '';
        }
        return ` ${name}="${str}"`;
    }
    if (typeof prop === 'number') {
        return ` ${name}={${prop}}`;
    }
    if (prop === undefined) {
        return '';
    }
    if (prop.$type === 'function' ||
        prop.$type === 'identifier' ||
        prop.$type === 'jsx-element' ||
        prop.$type === 'react-component') {
        return ` ${name}={${prop.$value}}`;
    }
    if (prop.$type === 'array' || prop.$type === 'object') {
        return ` ${name}={${_fcc_renderPropValue(prop)}}`;
    }
    if (prop.$type === 'template-string') {
        return ` ${name}={\`${prop.$value}\`}`;
    }
    return '';
}
// Renders React children correctly, based on their type
function _fcc_renderReactChildren(prop) {
    if (isReactComponentArray(prop)) {
        return prop;
    }
    if (typeof prop === 'string' || typeof prop === 'number' || typeof prop === 'boolean') {
        return prop;
    }
    if (prop === undefined) {
        return '';
    }
    if (prop.$type === 'template-string') {
        // If the value is a template string, wrap in braces
        return figma.tsx `{\`${prop.$value}\`}`;
    }
    // If the value is a JSX element, return it directly
    if (prop.$type === 'jsx-element') {
        return prop.$value;
    }
    // but for other values, wrap in braces
    if (prop.$type === 'function' || prop.$type === 'identifier') {
        return `{${prop.$value}}`;
    }
    if (prop.$type === 'array' || prop.$type === 'object') {
        return `{${_fcc_renderPropValue(prop)}}`;
    }
    if (prop.$type === 'react-component') {
        return `<${prop.$value} />`;
    }
}
function _fcc_stringifyObject(obj) {
    if (Array.isArray(obj)) {
        return `[${obj.map((element) => `${_fcc_stringifyObject(element)}`).join(',')}]`;
    }
    if (typeof obj !== 'object' || obj instanceof Date || obj === null) {
        return JSON.stringify(obj);
    }
    return `{${Object.keys(obj)
        .map((key) => ` ${key}: ${_fcc_stringifyObject(obj[key])} `)
        .join(',')}}`;
}
// Return the helpers as a string which can be injected into the template
function getParsedTemplateHelpersString() {
    return [
        _fcc_renderReactProp,
        _fcc_renderReactChildren,
        _fcc_jsxElement,
        _fcc_function,
        _fcc_identifier,
        _fcc_object,
        _fcc_templateString,
        _fcc_renderPropValue,
        _fcc_stringifyObject,
        _fcc_reactComponent,
        _fcc_array,
        isReactComponentArray,
    ]
        .map((fn) => fn.toString())
        .join('\n');
}
//# sourceMappingURL=parser_template_helpers.js.map