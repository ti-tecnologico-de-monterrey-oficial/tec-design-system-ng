import { jsxDEV } from 'react/jsx-dev-runtime';
import { getBadgeClasses, getBadgeBulletColor } from '@ti-tecnologico-de-monterrey-oficial/core/component/badge';

var styles$1 = {};

var _jsxFileName$2 = "/Users/thezeeck/Documents/GitHub/tec-design-system-ng/lib/ui-react/src/lib/ui-react.tsx";
function TiTecnologicoDeMonterreyOficialUiReact() {
  return /*#__PURE__*/jsxDEV("div", {
    className: styles$1['container'],
    children: /*#__PURE__*/jsxDEV("h1", {
      children: "Welcome to TiTecnologicoDeMonterreyOficialUiReact!"
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 7,
      columnNumber: 7
    }, this)
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 6,
    columnNumber: 5
  }, this);
}

var styles = {"container":"button-module_container__YPcta"};

var _jsxFileName$1 = "/Users/thezeeck/Documents/GitHub/tec-design-system-ng/lib/ui-react/src/lib/button/button.tsx";
function Button(_ref) {
  var label = _ref.label;
  return /*#__PURE__*/jsxDEV("button", {
    className: styles['container'],
    children: label
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 9,
    columnNumber: 5
  }, this);
}

var $$2 = require('../internals/export');
var fails = require('../internals/fails');
var isArray = require('../internals/is-array');
var isObject = require('../internals/is-object');
var toObject = require('../internals/to-object');
var lengthOfArrayLike = require('../internals/length-of-array-like');
var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer');
var createProperty = require('../internals/create-property');
var setArrayLength = require('../internals/array-set-length');
var arraySpeciesCreate = require('../internals/array-species-create');
var arrayMethodHasSpeciesSupport$1 = require('../internals/array-method-has-species-support');
var wellKnownSymbol = require('../internals/well-known-symbol');
var V8_VERSION = require('../internals/environment-v8-version');

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$1('concat');

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$2({ target: 'Array', proto: true, arity: 1, forced: FORCED$1 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    setArrayLength(A, n);
    return A;
  }
});

var $$1 = require('../internals/export');
var $filter = require('../internals/array-iteration').filter;
var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support');

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$1({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $ = require('../internals/export');
var uncurryThis = require('../internals/function-uncurry-this');
var IndexedObject = require('../internals/indexed-object');
var toIndexedObject = require('../internals/to-indexed-object');
var arrayMethodIsStrict = require('../internals/array-method-is-strict');

var nativeJoin = uncurryThis([].join);

var ES3_STRINGS = IndexedObject !== Object;
var FORCED = ES3_STRINGS || !arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: FORCED }, {
  join: function join(separator) {
    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support');
var defineBuiltIn = require('../internals/define-built-in');
var toString = require('../internals/object-to-string');

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}

var _jsxFileName = "/Users/thezeeck/Documents/GitHub/tec-design-system-ng/lib/ui-react/src/lib/bmb-badge/bmb-badge.tsx";
function BmbBadge(_ref) {
  var _ref$appearance = _ref.appearance,
    appearance = _ref$appearance === void 0 ? 'normal' : _ref$appearance,
    _ref$text = _ref.text,
    text = _ref$text === void 0 ? '' : _ref$text,
    _ref$container = _ref.container,
    container = _ref$container === void 0 ? true : _ref$container,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var sectionClasses = [].concat(getBadgeClasses({
    container: container,
    appearance: appearance
  }), [className]).filter(Boolean).join(' ');
  var bulletClasses = ['bmb_badge-bullet', !container ? getBadgeBulletColor(appearance) : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/jsxDEV("section", {
    className: sectionClasses,
    children: [/*#__PURE__*/jsxDEV("span", {
      className: bulletClasses
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 7
    }, this), /*#__PURE__*/jsxDEV("span", {
      className: "bmb_badge-content",
      children: text
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, this)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 36,
    columnNumber: 5
  }, this);
}

export { BmbBadge, Button, TiTecnologicoDeMonterreyOficialUiReact };
//# sourceMappingURL=index.js.map
