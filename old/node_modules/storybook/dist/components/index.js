var Ep = Object.create;
var Pn = Object.defineProperty;
var Sp = Object.getOwnPropertyDescriptor;
var Cp = Object.getOwnPropertyNames;
var Mp = Object.getPrototypeOf, Ap = Object.prototype.hasOwnProperty;
var o = (e, t) => Pn(e, "name", { value: t, configurable: !0 }), Jr = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy <
"u" ? new Proxy(e, {
  get: (t, r) => (typeof require < "u" ? require : t)[r]
}) : e)(function(e) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + e + '" is not supported');
});
var C = (e, t) => () => (e && (t = e(e = 0)), t);
var H = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), Qr = (e, t) => {
  for (var r in t)
    Pn(e, r, { get: t[r], enumerable: !0 });
}, Lp = (e, t, r, n) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let a of Cp(t))
      !Ap.call(e, a) && a !== r && Pn(e, a, { get: () => t[a], enumerable: !(n = Sp(t, a)) || n.enumerable });
  return e;
};
var ge = (e, t, r) => (r = e != null ? Ep(Mp(e)) : {}, Lp(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  t || !e || !e.__esModule ? Pn(r, "default", { value: e, enumerable: !0 }) : r,
  e
));

// ../node_modules/@babel/runtime/helpers/esm/extends.js
function W() {
  return W = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, W.apply(null, arguments);
}
var en = C(() => {
  o(W, "_extends");
});

// ../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function H0(e) {
  if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
var P0 = C(() => {
  o(H0, "_assertThisInitialized");
});

// ../node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function vt(e, t) {
  return vt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, vt(e, t);
}
var kn = C(() => {
  o(vt, "_setPrototypeOf");
});

// ../node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function On(e) {
  return On = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, On(e);
}
var O0 = C(() => {
  o(On, "_getPrototypeOf");
});

// ../node_modules/memoizerific/memoizerific.js
var rn = H((q0, ca) => {
  (function(e) {
    if (typeof q0 == "object" && typeof ca < "u")
      ca.exports = e();
    else if (typeof define == "function" && define.amd)
      define([], e);
    else {
      var t;
      typeof window < "u" ? t = window : typeof global < "u" ? t = global : typeof self < "u" ? t = self : t = this, t.memoizerific = e();
    }
  })(function() {
    var e, t, r;
    return (/* @__PURE__ */ o(function n(a, i, c) {
      function l(f, d) {
        if (!i[f]) {
          if (!a[f]) {
            var m = typeof Jr == "function" && Jr;
            if (!d && m) return m(f, !0);
            if (s) return s(f, !0);
            var v = new Error("Cannot find module '" + f + "'");
            throw v.code = "MODULE_NOT_FOUND", v;
          }
          var y = i[f] = { exports: {} };
          a[f][0].call(y.exports, function(p) {
            var h = a[f][1][p];
            return l(h || p);
          }, y, y.exports, n, a, i, c);
        }
        return i[f].exports;
      }
      o(l, "s");
      for (var s = typeof Jr == "function" && Jr, u = 0; u < c.length; u++) l(c[u]);
      return l;
    }, "e"))({ 1: [function(n, a, i) {
      a.exports = function(c) {
        if (typeof Map != "function" || c) {
          var l = n("./similar");
          return new l();
        } else
          return /* @__PURE__ */ new Map();
      };
    }, { "./similar": 2 }], 2: [function(n, a, i) {
      function c() {
        return this.list = [], this.lastItem = void 0, this.size = 0, this;
      }
      o(c, "Similar"), c.prototype.get = function(l) {
        var s;
        if (this.lastItem && this.isEqual(this.lastItem.key, l))
          return this.lastItem.val;
        if (s = this.indexOf(l), s >= 0)
          return this.lastItem = this.list[s], this.list[s].val;
      }, c.prototype.set = function(l, s) {
        var u;
        return this.lastItem && this.isEqual(this.lastItem.key, l) ? (this.lastItem.val = s, this) : (u = this.indexOf(l), u >= 0 ? (this.lastItem =
        this.list[u], this.list[u].val = s, this) : (this.lastItem = { key: l, val: s }, this.list.push(this.lastItem), this.size++, this));
      }, c.prototype.delete = function(l) {
        var s;
        if (this.lastItem && this.isEqual(this.lastItem.key, l) && (this.lastItem = void 0), s = this.indexOf(l), s >= 0)
          return this.size--, this.list.splice(s, 1)[0];
      }, c.prototype.has = function(l) {
        var s;
        return this.lastItem && this.isEqual(this.lastItem.key, l) ? !0 : (s = this.indexOf(l), s >= 0 ? (this.lastItem = this.list[s], !0) :
        !1);
      }, c.prototype.forEach = function(l, s) {
        var u;
        for (u = 0; u < this.size; u++)
          l.call(s || this, this.list[u].val, this.list[u].key, this);
      }, c.prototype.indexOf = function(l) {
        var s;
        for (s = 0; s < this.size; s++)
          if (this.isEqual(this.list[s].key, l))
            return s;
        return -1;
      }, c.prototype.isEqual = function(l, s) {
        return l === s || l !== l && s !== s;
      }, a.exports = c;
    }, {}], 3: [function(n, a, i) {
      var c = n("map-or-similar");
      a.exports = function(f) {
        var d = new c(!1), m = [];
        return function(v) {
          var y = /* @__PURE__ */ o(function() {
            var p = d, h, g, w = arguments.length - 1, b = Array(w + 1), x = !0, E;
            if ((y.numArgs || y.numArgs === 0) && y.numArgs !== w + 1)
              throw new Error("Memoizerific functions should always be called with the same number of arguments");
            for (E = 0; E < w; E++) {
              if (b[E] = {
                cacheItem: p,
                arg: arguments[E]
              }, p.has(arguments[E])) {
                p = p.get(arguments[E]);
                continue;
              }
              x = !1, h = new c(!1), p.set(arguments[E], h), p = h;
            }
            return x && (p.has(arguments[w]) ? g = p.get(arguments[w]) : x = !1), x || (g = v.apply(null, arguments), p.set(arguments[w], g)),
            f > 0 && (b[w] = {
              cacheItem: p,
              arg: arguments[w]
            }, x ? l(m, b) : m.push(b), m.length > f && s(m.shift())), y.wasMemoized = x, y.numArgs = w + 1, g;
          }, "memoizerific");
          return y.limit = f, y.wasMemoized = !1, y.cache = d, y.lru = m, y;
        };
      };
      function l(f, d) {
        var m = f.length, v = d.length, y, p, h;
        for (p = 0; p < m; p++) {
          for (y = !0, h = 0; h < v; h++)
            if (!u(f[p][h].arg, d[h].arg)) {
              y = !1;
              break;
            }
          if (y)
            break;
        }
        f.push(f.splice(p, 1)[0]);
      }
      o(l, "moveToMostRecentLru");
      function s(f) {
        var d = f.length, m = f[d - 1], v, y;
        for (m.cacheItem.delete(m.arg), y = d - 2; y >= 0 && (m = f[y], v = m.cacheItem.get(m.arg), !v || !v.size); y--)
          m.cacheItem.delete(m.arg);
      }
      o(s, "removeCachedResult");
      function u(f, d) {
        return f === d || f !== f && d !== d;
      }
      o(u, "isEqual");
    }, { "map-or-similar": 1 }] }, {}, [3])(3);
  });
});

// ../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function pr(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Fn = C(() => {
  o(pr, "_objectWithoutPropertiesLoose");
});

// ../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
function G0(e, t) {
  if (e == null) return {};
  var r, n, a = pr(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (a[r] = e[r]);
  }
  return a;
}
var Y0 = C(() => {
  Fn();
  o(G0, "_objectWithoutProperties");
});

// ../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function nn(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var sa = C(() => {
  o(nn, "_arrayLikeToArray");
});

// ../node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
function X0(e) {
  if (Array.isArray(e)) return nn(e);
}
var Z0 = C(() => {
  sa();
  o(X0, "_arrayWithoutHoles");
});

// ../node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function K0(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
var J0 = C(() => {
  o(K0, "_iterableToArray");
});

// ../node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
function Q0(e, t) {
  if (e) {
    if (typeof e == "string") return nn(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.
    test(r) ? nn(e, t) : void 0;
  }
}
var ec = C(() => {
  sa();
  o(Q0, "_unsupportedIterableToArray");
});

// ../node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function tc() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var rc = C(() => {
  o(tc, "_nonIterableSpread");
});

// ../node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
function Dn(e) {
  return X0(e) || K0(e) || Q0(e) || tc();
}
var nc = C(() => {
  Z0();
  J0();
  ec();
  rc();
  o(Dn, "_toConsumableArray");
});

// ../node_modules/@babel/runtime/helpers/esm/typeof.js
function Vt(e) {
  "@babel/helpers - typeof";
  return Vt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Vt(e);
}
var ua = C(() => {
  o(Vt, "_typeof");
});

// ../node_modules/@babel/runtime/helpers/esm/toPrimitive.js
function oc(e, t) {
  if (Vt(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (Vt(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ac = C(() => {
  ua();
  o(oc, "toPrimitive");
});

// ../node_modules/@babel/runtime/helpers/esm/toPropertyKey.js
function ic(e) {
  var t = oc(e, "string");
  return Vt(t) == "symbol" ? t : t + "";
}
var lc = C(() => {
  ua();
  ac();
  o(ic, "toPropertyKey");
});

// ../node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _n(e, t, r) {
  return (t = ic(t)) in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
var fa = C(() => {
  lc();
  o(_n, "_defineProperty");
});

// ../node_modules/react-syntax-highlighter/dist/esm/create-element.js
import w2 from "react";
function cc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function mr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cc(Object(r), !0).forEach(function(n) {
      _n(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function b2(e) {
  var t = e.length;
  if (t === 0 || t === 1) return e;
  if (t === 2)
    return [e[0], e[1], "".concat(e[0], ".").concat(e[1]), "".concat(e[1], ".").concat(e[0])];
  if (t === 3)
    return [e[0], e[1], e[2], "".concat(e[0], ".").concat(e[1]), "".concat(e[0], ".").concat(e[2]), "".concat(e[1], ".").concat(e[0]), "".concat(
    e[1], ".").concat(e[2]), "".concat(e[2], ".").concat(e[0]), "".concat(e[2], ".").concat(e[1]), "".concat(e[0], ".").concat(e[1], ".").concat(
    e[2]), "".concat(e[0], ".").concat(e[2], ".").concat(e[1]), "".concat(e[1], ".").concat(e[0], ".").concat(e[2]), "".concat(e[1], ".").concat(
    e[2], ".").concat(e[0]), "".concat(e[2], ".").concat(e[0], ".").concat(e[1]), "".concat(e[2], ".").concat(e[1], ".").concat(e[0])];
  if (t >= 4)
    return [e[0], e[1], e[2], e[3], "".concat(e[0], ".").concat(e[1]), "".concat(e[0], ".").concat(e[2]), "".concat(e[0], ".").concat(e[3]),
    "".concat(e[1], ".").concat(e[0]), "".concat(e[1], ".").concat(e[2]), "".concat(e[1], ".").concat(e[3]), "".concat(e[2], ".").concat(e[0]),
    "".concat(e[2], ".").concat(e[1]), "".concat(e[2], ".").concat(e[3]), "".concat(e[3], ".").concat(e[0]), "".concat(e[3], ".").concat(e[1]),
    "".concat(e[3], ".").concat(e[2]), "".concat(e[0], ".").concat(e[1], ".").concat(e[2]), "".concat(e[0], ".").concat(e[1], ".").concat(e[3]),
    "".concat(e[0], ".").concat(e[2], ".").concat(e[1]), "".concat(e[0], ".").concat(e[2], ".").concat(e[3]), "".concat(e[0], ".").concat(e[3],
    ".").concat(e[1]), "".concat(e[0], ".").concat(e[3], ".").concat(e[2]), "".concat(e[1], ".").concat(e[0], ".").concat(e[2]), "".concat(e[1],
    ".").concat(e[0], ".").concat(e[3]), "".concat(e[1], ".").concat(e[2], ".").concat(e[0]), "".concat(e[1], ".").concat(e[2], ".").concat(
    e[3]), "".concat(e[1], ".").concat(e[3], ".").concat(e[0]), "".concat(e[1], ".").concat(e[3], ".").concat(e[2]), "".concat(e[2], ".").concat(
    e[0], ".").concat(e[1]), "".concat(e[2], ".").concat(e[0], ".").concat(e[3]), "".concat(e[2], ".").concat(e[1], ".").concat(e[0]), "".concat(
    e[2], ".").concat(e[1], ".").concat(e[3]), "".concat(e[2], ".").concat(e[3], ".").concat(e[0]), "".concat(e[2], ".").concat(e[3], ".").concat(
    e[1]), "".concat(e[3], ".").concat(e[0], ".").concat(e[1]), "".concat(e[3], ".").concat(e[0], ".").concat(e[2]), "".concat(e[3], ".").concat(
    e[1], ".").concat(e[0]), "".concat(e[3], ".").concat(e[1], ".").concat(e[2]), "".concat(e[3], ".").concat(e[2], ".").concat(e[0]), "".concat(
    e[3], ".").concat(e[2], ".").concat(e[1]), "".concat(e[0], ".").concat(e[1], ".").concat(e[2], ".").concat(e[3]), "".concat(e[0], ".").concat(
    e[1], ".").concat(e[3], ".").concat(e[2]), "".concat(e[0], ".").concat(e[2], ".").concat(e[1], ".").concat(e[3]), "".concat(e[0], ".").concat(
    e[2], ".").concat(e[3], ".").concat(e[1]), "".concat(e[0], ".").concat(e[3], ".").concat(e[1], ".").concat(e[2]), "".concat(e[0], ".").concat(
    e[3], ".").concat(e[2], ".").concat(e[1]), "".concat(e[1], ".").concat(e[0], ".").concat(e[2], ".").concat(e[3]), "".concat(e[1], ".").concat(
    e[0], ".").concat(e[3], ".").concat(e[2]), "".concat(e[1], ".").concat(e[2], ".").concat(e[0], ".").concat(e[3]), "".concat(e[1], ".").concat(
    e[2], ".").concat(e[3], ".").concat(e[0]), "".concat(e[1], ".").concat(e[3], ".").concat(e[0], ".").concat(e[2]), "".concat(e[1], ".").concat(
    e[3], ".").concat(e[2], ".").concat(e[0]), "".concat(e[2], ".").concat(e[0], ".").concat(e[1], ".").concat(e[3]), "".concat(e[2], ".").concat(
    e[0], ".").concat(e[3], ".").concat(e[1]), "".concat(e[2], ".").concat(e[1], ".").concat(e[0], ".").concat(e[3]), "".concat(e[2], ".").concat(
    e[1], ".").concat(e[3], ".").concat(e[0]), "".concat(e[2], ".").concat(e[3], ".").concat(e[0], ".").concat(e[1]), "".concat(e[2], ".").concat(
    e[3], ".").concat(e[1], ".").concat(e[0]), "".concat(e[3], ".").concat(e[0], ".").concat(e[1], ".").concat(e[2]), "".concat(e[3], ".").concat(
    e[0], ".").concat(e[2], ".").concat(e[1]), "".concat(e[3], ".").concat(e[1], ".").concat(e[0], ".").concat(e[2]), "".concat(e[3], ".").concat(
    e[1], ".").concat(e[2], ".").concat(e[0]), "".concat(e[3], ".").concat(e[2], ".").concat(e[0], ".").concat(e[1]), "".concat(e[3], ".").concat(
    e[2], ".").concat(e[1], ".").concat(e[0])];
}
function y2(e) {
  if (e.length === 0 || e.length === 1) return e;
  var t = e.join(".");
  return da[t] || (da[t] = b2(e)), da[t];
}
function R2(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = arguments.length > 2 ? arguments[2] : void 0, n = e.filter(
  function(i) {
    return i !== "token";
  }), a = y2(n);
  return a.reduce(function(i, c) {
    return mr(mr({}, i), r[c]);
  }, t);
}
function sc(e) {
  return e.join(" ");
}
function x2(e, t) {
  var r = 0;
  return function(n) {
    return r += 1, n.map(function(a, i) {
      return $t({
        node: a,
        stylesheet: e,
        useInlineStyles: t,
        key: "code-segment-".concat(r, "-").concat(i)
      });
    });
  };
}
function $t(e) {
  var t = e.node, r = e.stylesheet, n = e.style, a = n === void 0 ? {} : n, i = e.useInlineStyles, c = e.key, l = t.properties, s = t.type, u = t.
  tagName, f = t.value;
  if (s === "text")
    return f;
  if (u) {
    var d = x2(r, i), m;
    if (!i)
      m = mr(mr({}, l), {}, {
        className: sc(l.className)
      });
    else {
      var v = Object.keys(r).reduce(function(g, w) {
        return w.split(".").forEach(function(b) {
          g.includes(b) || g.push(b);
        }), g;
      }, []), y = l.className && l.className.includes("token") ? ["token"] : [], p = l.className && y.concat(l.className.filter(function(g) {
        return !v.includes(g);
      }));
      m = mr(mr({}, l), {}, {
        className: sc(p) || void 0,
        style: R2(l.className, Object.assign({}, l.style, a), r)
      });
    }
    var h = d(t.children);
    return /* @__PURE__ */ w2.createElement(u, W({
      key: c
    }, m), h);
  }
}
var da, pa = C(() => {
  en();
  fa();
  o(cc, "ownKeys");
  o(mr, "_objectSpread");
  o(b2, "powerSetPermutations");
  da = {};
  o(y2, "getClassNameCombinations");
  o(R2, "createStyleObject");
  o(sc, "createClassNameString");
  o(x2, "createChildren");
  o($t, "createElement");
});

// ../node_modules/react-syntax-highlighter/dist/esm/checkForListedLanguage.js
var uc, fc = C(() => {
  uc = /* @__PURE__ */ o(function(e, t) {
    var r = e.listLanguages();
    return r.indexOf(t) !== -1;
  }, "default");
});

// ../node_modules/react-syntax-highlighter/dist/esm/highlight.js
import jt from "react";
function dc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Rt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dc(Object(r), !0).forEach(function(n) {
      _n(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function C2(e) {
  return e.match(S2);
}
function M2(e) {
  var t = e.lines, r = e.startingLineNumber, n = e.style;
  return t.map(function(a, i) {
    var c = i + r;
    return /* @__PURE__ */ jt.createElement("span", {
      key: "line-".concat(i),
      className: "react-syntax-highlighter-line-number",
      style: typeof n == "function" ? n(c) : n
    }, "".concat(c, `
`));
  });
}
function A2(e) {
  var t = e.codeString, r = e.codeStyle, n = e.containerStyle, a = n === void 0 ? {
    float: "left",
    paddingRight: "10px"
  } : n, i = e.numberStyle, c = i === void 0 ? {} : i, l = e.startingLineNumber;
  return /* @__PURE__ */ jt.createElement("code", {
    style: Object.assign({}, r, a)
  }, M2({
    lines: t.replace(/\n$/, "").split(`
`),
    style: c,
    startingLineNumber: l
  }));
}
function L2(e) {
  return "".concat(e.toString().length, ".25em");
}
function pc(e, t) {
  return {
    type: "element",
    tagName: "span",
    properties: {
      key: "line-number--".concat(e),
      className: ["comment", "linenumber", "react-syntax-highlighter-line-number"],
      style: t
    },
    children: [{
      type: "text",
      value: e
    }]
  };
}
function mc(e, t, r) {
  var n = {
    display: "inline-block",
    minWidth: L2(r),
    paddingRight: "1em",
    textAlign: "right",
    userSelect: "none"
  }, a = typeof e == "function" ? e(t) : e, i = Rt(Rt({}, n), a);
  return i;
}
function Vn(e) {
  var t = e.children, r = e.lineNumber, n = e.lineNumberStyle, a = e.largestLineNumber, i = e.showInlineLineNumbers, c = e.lineProps, l = c ===
  void 0 ? {} : c, s = e.className, u = s === void 0 ? [] : s, f = e.showLineNumbers, d = e.wrapLongLines, m = e.wrapLines, v = m === void 0 ?
  !1 : m, y = v ? Rt({}, typeof l == "function" ? l(r) : l) : {};
  if (y.className = y.className ? [].concat(Dn(y.className.trim().split(/\s+/)), Dn(u)) : u, r && i) {
    var p = mc(n, r, a);
    t.unshift(pc(r, p));
  }
  return d & f && (y.style = Rt({
    display: "flex"
  }, y.style)), {
    type: "element",
    tagName: "span",
    properties: y,
    children: t
  };
}
function hc(e) {
  for (var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] :
  [], n = 0; n < e.length; n++) {
    var a = e[n];
    if (a.type === "text")
      r.push(Vn({
        children: [a],
        className: Dn(new Set(t))
      }));
    else if (a.children) {
      var i = t.concat(a.properties.className);
      hc(a.children, i).forEach(function(c) {
        return r.push(c);
      });
    }
  }
  return r;
}
function I2(e, t, r, n, a, i, c, l, s) {
  var u, f = hc(e.value), d = [], m = -1, v = 0;
  function y(E, R) {
    var S = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    return Vn({
      children: E,
      lineNumber: R,
      lineNumberStyle: l,
      largestLineNumber: c,
      showInlineLineNumbers: a,
      lineProps: r,
      className: S,
      showLineNumbers: n,
      wrapLongLines: s,
      wrapLines: t
    });
  }
  o(y, "createWrappedLine");
  function p(E, R) {
    if (n && R && a) {
      var S = mc(l, R, c);
      E.unshift(pc(R, S));
    }
    return E;
  }
  o(p, "createUnwrappedLine");
  function h(E, R) {
    var S = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    return t || S.length > 0 ? y(E, R, S) : p(E, R);
  }
  o(h, "createLine");
  for (var g = /* @__PURE__ */ o(function() {
    var R = f[v], S = R.children[0].value, A = C2(S);
    if (A) {
      var M = S.split(`
`);
      M.forEach(function(L, P) {
        var _ = n && d.length + i, D = {
          type: "text",
          value: "".concat(L, `
`)
        };
        if (P === 0) {
          var K = f.slice(m + 1, v).concat(Vn({
            children: [D],
            className: R.properties.className
          })), T = h(K, _);
          d.push(T);
        } else if (P === M.length - 1) {
          var z = f[v + 1] && f[v + 1].children && f[v + 1].children[0], k = {
            type: "text",
            value: "".concat(L)
          };
          if (z) {
            var $ = Vn({
              children: [k],
              className: R.properties.className
            });
            f.splice(v + 1, 0, $);
          } else {
            var F = [k], j = h(F, _, R.properties.className);
            d.push(j);
          }
        } else {
          var O = [D], G = h(O, _, R.properties.className);
          d.push(G);
        }
      }), m = v;
    }
    v++;
  }, "_loop"); v < f.length; )
    g();
  if (m !== f.length - 1) {
    var w = f.slice(m + 1, f.length);
    if (w && w.length) {
      var b = n && d.length + i, x = h(w, b);
      d.push(x);
    }
  }
  return t ? d : (u = []).concat.apply(u, d);
}
function z2(e) {
  var t = e.rows, r = e.stylesheet, n = e.useInlineStyles;
  return t.map(function(a, i) {
    return $t({
      node: a,
      stylesheet: r,
      useInlineStyles: n,
      key: "code-segement".concat(i)
    });
  });
}
function gc(e) {
  return e && typeof e.highlightAuto < "u";
}
function T2(e) {
  var t = e.astGenerator, r = e.language, n = e.code, a = e.defaultCodeValue;
  if (gc(t)) {
    var i = uc(t, r);
    return r === "text" ? {
      value: a,
      language: "text"
    } : i ? t.highlight(r, n) : t.highlightAuto(n);
  }
  try {
    return r && r !== "text" ? {
      value: t.highlight(n, r)
    } : {
      value: a
    };
  } catch {
    return {
      value: a
    };
  }
}
function ma(e, t) {
  return /* @__PURE__ */ o(function(n) {
    var a = n.language, i = n.children, c = n.style, l = c === void 0 ? t : c, s = n.customStyle, u = s === void 0 ? {} : s, f = n.codeTagProps,
    d = f === void 0 ? {
      className: a ? "language-".concat(a) : void 0,
      style: Rt(Rt({}, l['code[class*="language-"]']), l['code[class*="language-'.concat(a, '"]')])
    } : f, m = n.useInlineStyles, v = m === void 0 ? !0 : m, y = n.showLineNumbers, p = y === void 0 ? !1 : y, h = n.showInlineLineNumbers, g = h ===
    void 0 ? !0 : h, w = n.startingLineNumber, b = w === void 0 ? 1 : w, x = n.lineNumberContainerStyle, E = n.lineNumberStyle, R = E === void 0 ?
    {} : E, S = n.wrapLines, A = n.wrapLongLines, M = A === void 0 ? !1 : A, L = n.lineProps, P = L === void 0 ? {} : L, _ = n.renderer, D = n.
    PreTag, K = D === void 0 ? "pre" : D, T = n.CodeTag, z = T === void 0 ? "code" : T, k = n.code, $ = k === void 0 ? (Array.isArray(i) ? i[0] :
    i) || "" : k, F = n.astGenerator, j = G0(n, E2);
    F = F || e;
    var O = p ? /* @__PURE__ */ jt.createElement(A2, {
      containerStyle: x,
      codeStyle: d.style || {},
      numberStyle: R,
      startingLineNumber: b,
      codeString: $
    }) : null, G = l.hljs || l['pre[class*="language-"]'] || {
      backgroundColor: "#fff"
    }, Ce = gc(F) ? "hljs" : "prismjs", he = v ? Object.assign({}, j, {
      style: Object.assign({}, G, u)
    }) : Object.assign({}, j, {
      className: j.className ? "".concat(Ce, " ").concat(j.className) : Ce,
      style: Object.assign({}, u)
    });
    if (M ? d.style = Rt({
      whiteSpace: "pre-wrap"
    }, d.style) : d.style = Rt({
      whiteSpace: "pre"
    }, d.style), !F)
      return /* @__PURE__ */ jt.createElement(K, he, O, /* @__PURE__ */ jt.createElement(z, d, $));
    (S === void 0 && _ || M) && (S = !0), _ = _ || z2;
    var fe = [{
      type: "text",
      value: $
    }], de = T2({
      astGenerator: F,
      language: a,
      code: $,
      defaultCodeValue: fe
    });
    de.language === null && (de.value = fe);
    var be = de.value.length;
    be === 1 && de.value[0].type === "text" && (be = de.value[0].value.split(`
`).length);
    var Me = be + b, Nt = I2(de, S, P, p, g, b, Me, R, M);
    return /* @__PURE__ */ jt.createElement(K, he, /* @__PURE__ */ jt.createElement(z, d, !g && O, _({
      rows: Nt,
      stylesheet: l,
      useInlineStyles: v
    })));
  }, "SyntaxHighlighter");
}
var E2, S2, vc = C(() => {
  Y0();
  nc();
  fa();
  pa();
  fc();
  E2 = ["language", "children", "style", "customStyle", "codeTagProps", "useInlineStyles", "showLineNumbers", "showInlineLineNumbers", "star\
tingLineNumber", "lineNumberContainerStyle", "lineNumberStyle", "wrapLines", "wrapLongLines", "lineProps", "renderer", "PreTag", "CodeTag", "\
code", "astGenerator"];
  o(dc, "ownKeys");
  o(Rt, "_objectSpread");
  S2 = /\n/g;
  o(C2, "getNewLines");
  o(M2, "getAllLineNumbers");
  o(A2, "AllLineNumbers");
  o(L2, "getEmWidthOfNumber");
  o(pc, "getInlineLineNumber");
  o(mc, "assembleLineNumberStyles");
  o(Vn, "createLineElement");
  o(hc, "flattenCodeTree");
  o(I2, "processLines");
  o(z2, "defaultRenderer");
  o(gc, "isHighlightJs");
  o(T2, "getCodeTree");
  o(ma, "default");
});

// ../node_modules/xtend/immutable.js
var bc = H((Zb, wc) => {
  wc.exports = P2;
  var H2 = Object.prototype.hasOwnProperty;
  function P2() {
    for (var e = {}, t = 0; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        H2.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }
  o(P2, "extend");
});

// ../node_modules/hastscript/node_modules/property-information/lib/util/schema.js
var ga = H((Jb, Rc) => {
  "use strict";
  Rc.exports = yc;
  var ha = yc.prototype;
  ha.space = null;
  ha.normal = {};
  ha.property = {};
  function yc(e, t, r) {
    this.property = e, this.normal = t, r && (this.space = r);
  }
  o(yc, "Schema");
});

// ../node_modules/hastscript/node_modules/property-information/lib/util/merge.js
var Sc = H((e9, Ec) => {
  "use strict";
  var xc = bc(), k2 = ga();
  Ec.exports = O2;
  function O2(e) {
    for (var t = e.length, r = [], n = [], a = -1, i, c; ++a < t; )
      i = e[a], r.push(i.property), n.push(i.normal), c = i.space;
    return new k2(
      xc.apply(null, r),
      xc.apply(null, n),
      c
    );
  }
  o(O2, "merge");
});

// ../node_modules/hastscript/node_modules/property-information/normalize.js
var $n = H((r9, Cc) => {
  "use strict";
  Cc.exports = B2;
  function B2(e) {
    return e.toLowerCase();
  }
  o(B2, "normalize");
});

// ../node_modules/hastscript/node_modules/property-information/lib/util/info.js
var va = H((o9, Ac) => {
  "use strict";
  Ac.exports = Mc;
  var _e = Mc.prototype;
  _e.space = null;
  _e.attribute = null;
  _e.property = null;
  _e.boolean = !1;
  _e.booleanish = !1;
  _e.overloadedBoolean = !1;
  _e.number = !1;
  _e.commaSeparated = !1;
  _e.spaceSeparated = !1;
  _e.commaOrSpaceSeparated = !1;
  _e.mustUseProperty = !1;
  _e.defined = !1;
  function Mc(e, t) {
    this.property = e, this.attribute = t;
  }
  o(Mc, "Info");
});

// ../node_modules/hastscript/node_modules/property-information/lib/util/types.js
var jn = H((xt) => {
  "use strict";
  var N2 = 0;
  xt.boolean = Wt();
  xt.booleanish = Wt();
  xt.overloadedBoolean = Wt();
  xt.number = Wt();
  xt.spaceSeparated = Wt();
  xt.commaSeparated = Wt();
  xt.commaOrSpaceSeparated = Wt();
  function Wt() {
    return Math.pow(2, ++N2);
  }
  o(Wt, "increment");
});

// ../node_modules/hastscript/node_modules/property-information/lib/util/defined-info.js
var ba = H((c9, Hc) => {
  "use strict";
  var zc = va(), Lc = jn();
  Hc.exports = wa;
  wa.prototype = new zc();
  wa.prototype.defined = !0;
  var Tc = [
    "boolean",
    "booleanish",
    "overloadedBoolean",
    "number",
    "commaSeparated",
    "spaceSeparated",
    "commaOrSpaceSeparated"
  ], F2 = Tc.length;
  function wa(e, t, r, n) {
    var a = -1, i;
    for (Ic(this, "space", n), zc.call(this, e, t); ++a < F2; )
      i = Tc[a], Ic(this, i, (r & Lc[i]) === Lc[i]);
  }
  o(wa, "DefinedInfo");
  function Ic(e, t, r) {
    r && (e[t] = r);
  }
  o(Ic, "mark");
});

// ../node_modules/hastscript/node_modules/property-information/lib/util/create.js
var hr = H((u9, kc) => {
  "use strict";
  var Pc = $n(), D2 = ga(), _2 = ba();
  kc.exports = V2;
  function V2(e) {
    var t = e.space, r = e.mustUseProperty || [], n = e.attributes || {}, a = e.properties, i = e.transform, c = {}, l = {}, s, u;
    for (s in a)
      u = new _2(
        s,
        i(n, s),
        a[s],
        t
      ), r.indexOf(s) !== -1 && (u.mustUseProperty = !0), c[s] = u, l[Pc(s)] = s, l[Pc(u.attribute)] = s;
    return new D2(c, l, t);
  }
  o(V2, "create");
});

// ../node_modules/hastscript/node_modules/property-information/lib/xlink.js
var Bc = H((d9, Oc) => {
  "use strict";
  var $2 = hr();
  Oc.exports = $2({
    space: "xlink",
    transform: j2,
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null
    }
  });
  function j2(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  }
  o(j2, "xlinkTransform");
});

// ../node_modules/hastscript/node_modules/property-information/lib/xml.js
var Fc = H((m9, Nc) => {
  "use strict";
  var W2 = hr();
  Nc.exports = W2({
    space: "xml",
    transform: U2,
    properties: {
      xmlLang: null,
      xmlBase: null,
      xmlSpace: null
    }
  });
  function U2(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
  o(U2, "xmlTransform");
});

// ../node_modules/hastscript/node_modules/property-information/lib/util/case-sensitive-transform.js
var _c = H((g9, Dc) => {
  "use strict";
  Dc.exports = q2;
  function q2(e, t) {
    return t in e ? e[t] : t;
  }
  o(q2, "caseSensitiveTransform");
});

// ../node_modules/hastscript/node_modules/property-information/lib/util/case-insensitive-transform.js
var ya = H((w9, Vc) => {
  "use strict";
  var G2 = _c();
  Vc.exports = Y2;
  function Y2(e, t) {
    return G2(e, t.toLowerCase());
  }
  o(Y2, "caseInsensitiveTransform");
});

// ../node_modules/hastscript/node_modules/property-information/lib/xmlns.js
var jc = H((y9, $c) => {
  "use strict";
  var X2 = hr(), Z2 = ya();
  $c.exports = X2({
    space: "xmlns",
    attributes: {
      xmlnsxlink: "xmlns:xlink"
    },
    transform: Z2,
    properties: {
      xmlns: null,
      xmlnsXLink: null
    }
  });
});

// ../node_modules/hastscript/node_modules/property-information/lib/aria.js
var Uc = H((R9, Wc) => {
  "use strict";
  var Ra = jn(), K2 = hr(), Ie = Ra.booleanish, Ve = Ra.number, Ut = Ra.spaceSeparated;
  Wc.exports = K2({
    transform: J2,
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: Ie,
      ariaAutoComplete: null,
      ariaBusy: Ie,
      ariaChecked: Ie,
      ariaColCount: Ve,
      ariaColIndex: Ve,
      ariaColSpan: Ve,
      ariaControls: Ut,
      ariaCurrent: null,
      ariaDescribedBy: Ut,
      ariaDetails: null,
      ariaDisabled: Ie,
      ariaDropEffect: Ut,
      ariaErrorMessage: null,
      ariaExpanded: Ie,
      ariaFlowTo: Ut,
      ariaGrabbed: Ie,
      ariaHasPopup: null,
      ariaHidden: Ie,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: Ut,
      ariaLevel: Ve,
      ariaLive: null,
      ariaModal: Ie,
      ariaMultiLine: Ie,
      ariaMultiSelectable: Ie,
      ariaOrientation: null,
      ariaOwns: Ut,
      ariaPlaceholder: null,
      ariaPosInSet: Ve,
      ariaPressed: Ie,
      ariaReadOnly: Ie,
      ariaRelevant: null,
      ariaRequired: Ie,
      ariaRoleDescription: Ut,
      ariaRowCount: Ve,
      ariaRowIndex: Ve,
      ariaRowSpan: Ve,
      ariaSelected: Ie,
      ariaSetSize: Ve,
      ariaSort: null,
      ariaValueMax: Ve,
      ariaValueMin: Ve,
      ariaValueNow: Ve,
      ariaValueText: null,
      role: null
    }
  });
  function J2(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
  o(J2, "ariaTransform");
});

// ../node_modules/hastscript/node_modules/property-information/lib/html.js
var Gc = H((E9, qc) => {
  "use strict";
  var gr = jn(), Q2 = hr(), e4 = ya(), B = gr.boolean, t4 = gr.overloadedBoolean, on = gr.booleanish, Y = gr.number, xe = gr.spaceSeparated,
  Wn = gr.commaSeparated;
  qc.exports = Q2({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv"
    },
    transform: e4,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      // Standard Properties.
      abbr: null,
      accept: Wn,
      acceptCharset: xe,
      accessKey: xe,
      action: null,
      allow: null,
      allowFullScreen: B,
      allowPaymentRequest: B,
      allowUserMedia: B,
      alt: null,
      as: null,
      async: B,
      autoCapitalize: null,
      autoComplete: xe,
      autoFocus: B,
      autoPlay: B,
      capture: B,
      charSet: null,
      checked: B,
      cite: null,
      className: xe,
      cols: Y,
      colSpan: null,
      content: null,
      contentEditable: on,
      controls: B,
      controlsList: xe,
      coords: Y | Wn,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: B,
      defer: B,
      dir: null,
      dirName: null,
      disabled: B,
      download: t4,
      draggable: on,
      encType: null,
      enterKeyHint: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: B,
      formTarget: null,
      headers: xe,
      height: Y,
      hidden: B,
      high: Y,
      href: null,
      hrefLang: null,
      htmlFor: xe,
      httpEquiv: xe,
      id: null,
      imageSizes: null,
      imageSrcSet: Wn,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: B,
      itemId: null,
      itemProp: xe,
      itemRef: xe,
      itemScope: B,
      itemType: xe,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: B,
      low: Y,
      manifest: null,
      max: null,
      maxLength: Y,
      media: null,
      method: null,
      min: null,
      minLength: Y,
      multiple: B,
      muted: B,
      name: null,
      nonce: null,
      noModule: B,
      noValidate: B,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforePrint: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextMenu: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: B,
      optimum: Y,
      pattern: null,
      ping: xe,
      placeholder: null,
      playsInline: B,
      poster: null,
      preload: null,
      readOnly: B,
      referrerPolicy: null,
      rel: xe,
      required: B,
      reversed: B,
      rows: Y,
      rowSpan: Y,
      sandbox: xe,
      scope: null,
      scoped: B,
      seamless: B,
      selected: B,
      shape: null,
      size: Y,
      sizes: null,
      slot: null,
      span: Y,
      spellCheck: on,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: Wn,
      start: Y,
      step: null,
      style: null,
      tabIndex: Y,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: B,
      useMap: null,
      value: on,
      width: Y,
      wrap: null,
      // Legacy.
      // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
      align: null,
      // Several. Use CSS `text-align` instead,
      aLink: null,
      // `<body>`. Use CSS `a:active {color}` instead
      archive: xe,
      // `<object>`. List of URIs to archives
      axis: null,
      // `<td>` and `<th>`. Use `scope` on `<th>`
      background: null,
      // `<body>`. Use CSS `background-image` instead
      bgColor: null,
      // `<body>` and table elements. Use CSS `background-color` instead
      border: Y,
      // `<table>`. Use CSS `border-width` instead,
      borderColor: null,
      // `<table>`. Use CSS `border-color` instead,
      bottomMargin: Y,
      // `<body>`
      cellPadding: null,
      // `<table>`
      cellSpacing: null,
      // `<table>`
      char: null,
      // Several table elements. When `align=char`, sets the character to align on
      charOff: null,
      // Several table elements. When `char`, offsets the alignment
      classId: null,
      // `<object>`
      clear: null,
      // `<br>`. Use CSS `clear` instead
      code: null,
      // `<object>`
      codeBase: null,
      // `<object>`
      codeType: null,
      // `<object>`
      color: null,
      // `<font>` and `<hr>`. Use CSS instead
      compact: B,
      // Lists. Use CSS to reduce space between items instead
      declare: B,
      // `<object>`
      event: null,
      // `<script>`
      face: null,
      // `<font>`. Use CSS instead
      frame: null,
      // `<table>`
      frameBorder: null,
      // `<iframe>`. Use CSS `border` instead
      hSpace: Y,
      // `<img>` and `<object>`
      leftMargin: Y,
      // `<body>`
      link: null,
      // `<body>`. Use CSS `a:link {color: *}` instead
      longDesc: null,
      // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
      lowSrc: null,
      // `<img>`. Use a `<picture>`
      marginHeight: Y,
      // `<body>`
      marginWidth: Y,
      // `<body>`
      noResize: B,
      // `<frame>`
      noHref: B,
      // `<area>`. Use no href instead of an explicit `nohref`
      noShade: B,
      // `<hr>`. Use background-color and height instead of borders
      noWrap: B,
      // `<td>` and `<th>`
      object: null,
      // `<applet>`
      profile: null,
      // `<head>`
      prompt: null,
      // `<isindex>`
      rev: null,
      // `<link>`
      rightMargin: Y,
      // `<body>`
      rules: null,
      // `<table>`
      scheme: null,
      // `<meta>`
      scrolling: on,
      // `<frame>`. Use overflow in the child context
      standby: null,
      // `<object>`
      summary: null,
      // `<table>`
      text: null,
      // `<body>`. Use CSS `color` instead
      topMargin: Y,
      // `<body>`
      valueType: null,
      // `<param>`
      version: null,
      // `<html>`. Use a doctype.
      vAlign: null,
      // Several. Use CSS `vertical-align` instead
      vLink: null,
      // `<body>`. Use CSS `a:visited {color}` instead
      vSpace: Y,
      // `<img>` and `<object>`
      // Non-standard Properties.
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: B,
      disableRemotePlayback: B,
      prefix: null,
      property: null,
      results: Y,
      security: null,
      unselectable: null
    }
  });
});

// ../node_modules/hastscript/node_modules/property-information/html.js
var Xc = H((S9, Yc) => {
  "use strict";
  var r4 = Sc(), n4 = Bc(), o4 = Fc(), a4 = jc(), i4 = Uc(), l4 = Gc();
  Yc.exports = r4([o4, n4, a4, i4, l4]);
});

// ../node_modules/hastscript/node_modules/property-information/find.js
var Jc = H((C9, Kc) => {
  "use strict";
  var c4 = $n(), s4 = ba(), u4 = va(), xa = "data";
  Kc.exports = p4;
  var f4 = /^data[-\w.:]+$/i, Zc = /-[a-z]/g, d4 = /[A-Z]/g;
  function p4(e, t) {
    var r = c4(t), n = t, a = u4;
    return r in e.normal ? e.property[e.normal[r]] : (r.length > 4 && r.slice(0, 4) === xa && f4.test(t) && (t.charAt(4) === "-" ? n = m4(t) :
    t = h4(t), a = s4), new a(n, t));
  }
  o(p4, "find");
  function m4(e) {
    var t = e.slice(5).replace(Zc, v4);
    return xa + t.charAt(0).toUpperCase() + t.slice(1);
  }
  o(m4, "datasetToProperty");
  function h4(e) {
    var t = e.slice(4);
    return Zc.test(t) ? e : (t = t.replace(d4, g4), t.charAt(0) !== "-" && (t = "-" + t), xa + t);
  }
  o(h4, "datasetToAttribute");
  function g4(e) {
    return "-" + e.toLowerCase();
  }
  o(g4, "kebab");
  function v4(e) {
    return e.charAt(1).toUpperCase();
  }
  o(v4, "camelcase");
});

// ../node_modules/hast-util-parse-selector/index.js
var ts = H((A9, es) => {
  "use strict";
  es.exports = w4;
  var Qc = /[#.]/g;
  function w4(e, t) {
    for (var r = e || "", n = t || "div", a = {}, i = 0, c, l, s; i < r.length; )
      Qc.lastIndex = i, s = Qc.exec(r), c = r.slice(i, s ? s.index : r.length), c && (l ? l === "#" ? a.id = c : a.className ? a.className.push(
      c) : a.className = [c] : n = c, i += c.length), s && (l = s[0], i++);
    return { type: "element", tagName: n, properties: a, children: [] };
  }
  o(w4, "parse");
});

// ../node_modules/hastscript/node_modules/space-separated-tokens/index.js
var ns = H((Ea) => {
  "use strict";
  Ea.parse = R4;
  Ea.stringify = x4;
  var rs = "", b4 = " ", y4 = /[ \t\n\r\f]+/g;
  function R4(e) {
    var t = String(e || rs).trim();
    return t === rs ? [] : t.split(y4);
  }
  o(R4, "parse");
  function x4(e) {
    return e.join(b4).trim();
  }
  o(x4, "stringify");
});

// ../node_modules/hastscript/node_modules/comma-separated-tokens/index.js
var as = H((Ca) => {
  "use strict";
  Ca.parse = E4;
  Ca.stringify = S4;
  var Sa = ",", os = " ", an = "";
  function E4(e) {
    for (var t = [], r = String(e || an), n = r.indexOf(Sa), a = 0, i = !1, c; !i; )
      n === -1 && (n = r.length, i = !0), c = r.slice(a, n).trim(), (c || !i) && t.push(c), a = n + 1, n = r.indexOf(Sa, a);
    return t;
  }
  o(E4, "parse");
  function S4(e, t) {
    var r = t || {}, n = r.padLeft === !1 ? an : os, a = r.padRight ? os : an;
    return e[e.length - 1] === an && (e = e.concat(an)), e.join(a + Sa + n).trim();
  }
  o(S4, "stringify");
});

// ../node_modules/hastscript/factory.js
var ds = H((P9, fs) => {
  "use strict";
  var C4 = Jc(), is = $n(), M4 = ts(), ls = ns().parse, cs = as().parse;
  fs.exports = L4;
  var A4 = {}.hasOwnProperty;
  function L4(e, t, r) {
    var n = r ? P4(r) : null;
    return a;
    function a(c, l) {
      var s = M4(c, t), u = Array.prototype.slice.call(arguments, 2), f = s.tagName.toLowerCase(), d;
      if (s.tagName = n && A4.call(n, f) ? n[f] : f, l && I4(l, s) && (u.unshift(l), l = null), l)
        for (d in l)
          i(s.properties, d, l[d]);
      return us(s.children, u), s.tagName === "template" && (s.content = { type: "root", children: s.children }, s.children = []), s;
    }
    function i(c, l, s) {
      var u, f, d;
      s == null || s !== s || (u = C4(e, l), f = u.property, d = s, typeof d == "string" && (u.spaceSeparated ? d = ls(d) : u.commaSeparated ?
      d = cs(d) : u.commaOrSpaceSeparated && (d = ls(cs(d).join(" ")))), f === "style" && typeof s != "string" && (d = H4(d)), f === "classN\
ame" && c.className && (d = c.className.concat(d)), c[f] = T4(u, f, d));
    }
  }
  o(L4, "factory");
  function I4(e, t) {
    return typeof e == "string" || "length" in e || z4(t.tagName, e);
  }
  o(I4, "isChildren");
  function z4(e, t) {
    var r = t.type;
    return e === "input" || !r || typeof r != "string" ? !1 : typeof t.children == "object" && "length" in t.children ? !0 : (r = r.toLowerCase(),
    e === "button" ? r !== "menu" && r !== "submit" && r !== "reset" && r !== "button" : "value" in t);
  }
  o(z4, "isNode");
  function us(e, t) {
    var r, n;
    if (typeof t == "string" || typeof t == "number") {
      e.push({ type: "text", value: String(t) });
      return;
    }
    if (typeof t == "object" && "length" in t) {
      for (r = -1, n = t.length; ++r < n; )
        us(e, t[r]);
      return;
    }
    if (typeof t != "object" || !("type" in t))
      throw new Error("Expected node, nodes, or string, got `" + t + "`");
    e.push(t);
  }
  o(us, "addChild");
  function T4(e, t, r) {
    var n, a, i;
    if (typeof r != "object" || !("length" in r))
      return ss(e, t, r);
    for (a = r.length, n = -1, i = []; ++n < a; )
      i[n] = ss(e, t, r[n]);
    return i;
  }
  o(T4, "parsePrimitives");
  function ss(e, t, r) {
    var n = r;
    return e.number || e.positiveNumber ? !isNaN(n) && n !== "" && (n = Number(n)) : (e.boolean || e.overloadedBoolean) && typeof n == "stri\
ng" && (n === "" || is(r) === is(t)) && (n = !0), n;
  }
  o(ss, "parsePrimitive");
  function H4(e) {
    var t = [], r;
    for (r in e)
      t.push([r, e[r]].join(": "));
    return t.join("; ");
  }
  o(H4, "style");
  function P4(e) {
    for (var t = e.length, r = -1, n = {}, a; ++r < t; )
      a = e[r], n[a.toLowerCase()] = a;
    return n;
  }
  o(P4, "createAdjustMap");
});

// ../node_modules/hastscript/html.js
var hs = H((O9, ms) => {
  "use strict";
  var k4 = Xc(), O4 = ds(), ps = O4(k4, "div");
  ps.displayName = "html";
  ms.exports = ps;
});

// ../node_modules/hastscript/index.js
var vs = H((B9, gs) => {
  "use strict";
  gs.exports = hs();
});

// ../node_modules/refractor/node_modules/character-entities-legacy/index.json
var ws = H((N9, B4) => {
  B4.exports = {
    AElig: "\xC6",
    AMP: "&",
    Aacute: "\xC1",
    Acirc: "\xC2",
    Agrave: "\xC0",
    Aring: "\xC5",
    Atilde: "\xC3",
    Auml: "\xC4",
    COPY: "\xA9",
    Ccedil: "\xC7",
    ETH: "\xD0",
    Eacute: "\xC9",
    Ecirc: "\xCA",
    Egrave: "\xC8",
    Euml: "\xCB",
    GT: ">",
    Iacute: "\xCD",
    Icirc: "\xCE",
    Igrave: "\xCC",
    Iuml: "\xCF",
    LT: "<",
    Ntilde: "\xD1",
    Oacute: "\xD3",
    Ocirc: "\xD4",
    Ograve: "\xD2",
    Oslash: "\xD8",
    Otilde: "\xD5",
    Ouml: "\xD6",
    QUOT: '"',
    REG: "\xAE",
    THORN: "\xDE",
    Uacute: "\xDA",
    Ucirc: "\xDB",
    Ugrave: "\xD9",
    Uuml: "\xDC",
    Yacute: "\xDD",
    aacute: "\xE1",
    acirc: "\xE2",
    acute: "\xB4",
    aelig: "\xE6",
    agrave: "\xE0",
    amp: "&",
    aring: "\xE5",
    atilde: "\xE3",
    auml: "\xE4",
    brvbar: "\xA6",
    ccedil: "\xE7",
    cedil: "\xB8",
    cent: "\xA2",
    copy: "\xA9",
    curren: "\xA4",
    deg: "\xB0",
    divide: "\xF7",
    eacute: "\xE9",
    ecirc: "\xEA",
    egrave: "\xE8",
    eth: "\xF0",
    euml: "\xEB",
    frac12: "\xBD",
    frac14: "\xBC",
    frac34: "\xBE",
    gt: ">",
    iacute: "\xED",
    icirc: "\xEE",
    iexcl: "\xA1",
    igrave: "\xEC",
    iquest: "\xBF",
    iuml: "\xEF",
    laquo: "\xAB",
    lt: "<",
    macr: "\xAF",
    micro: "\xB5",
    middot: "\xB7",
    nbsp: "\xA0",
    not: "\xAC",
    ntilde: "\xF1",
    oacute: "\xF3",
    ocirc: "\xF4",
    ograve: "\xF2",
    ordf: "\xAA",
    ordm: "\xBA",
    oslash: "\xF8",
    otilde: "\xF5",
    ouml: "\xF6",
    para: "\xB6",
    plusmn: "\xB1",
    pound: "\xA3",
    quot: '"',
    raquo: "\xBB",
    reg: "\xAE",
    sect: "\xA7",
    shy: "\xAD",
    sup1: "\xB9",
    sup2: "\xB2",
    sup3: "\xB3",
    szlig: "\xDF",
    thorn: "\xFE",
    times: "\xD7",
    uacute: "\xFA",
    ucirc: "\xFB",
    ugrave: "\xF9",
    uml: "\xA8",
    uuml: "\xFC",
    yacute: "\xFD",
    yen: "\xA5",
    yuml: "\xFF"
  };
});

// ../node_modules/refractor/node_modules/character-reference-invalid/index.json
var bs = H((F9, N4) => {
  N4.exports = {
    "0": "\uFFFD",
    "128": "\u20AC",
    "130": "\u201A",
    "131": "\u0192",
    "132": "\u201E",
    "133": "\u2026",
    "134": "\u2020",
    "135": "\u2021",
    "136": "\u02C6",
    "137": "\u2030",
    "138": "\u0160",
    "139": "\u2039",
    "140": "\u0152",
    "142": "\u017D",
    "145": "\u2018",
    "146": "\u2019",
    "147": "\u201C",
    "148": "\u201D",
    "149": "\u2022",
    "150": "\u2013",
    "151": "\u2014",
    "152": "\u02DC",
    "153": "\u2122",
    "154": "\u0161",
    "155": "\u203A",
    "156": "\u0153",
    "158": "\u017E",
    "159": "\u0178"
  };
});

// ../node_modules/refractor/node_modules/is-decimal/index.js
var Ma = H((D9, ys) => {
  "use strict";
  ys.exports = F4;
  function F4(e) {
    var t = typeof e == "string" ? e.charCodeAt(0) : e;
    return t >= 48 && t <= 57;
  }
  o(F4, "decimal");
});

// ../node_modules/refractor/node_modules/is-hexadecimal/index.js
var xs = H((V9, Rs) => {
  "use strict";
  Rs.exports = D4;
  function D4(e) {
    var t = typeof e == "string" ? e.charCodeAt(0) : e;
    return t >= 97 && t <= 102 || t >= 65 && t <= 70 || t >= 48 && t <= 57;
  }
  o(D4, "hexadecimal");
});

// ../node_modules/refractor/node_modules/is-alphabetical/index.js
var Ss = H((j9, Es) => {
  "use strict";
  Es.exports = _4;
  function _4(e) {
    var t = typeof e == "string" ? e.charCodeAt(0) : e;
    return t >= 97 && t <= 122 || t >= 65 && t <= 90;
  }
  o(_4, "alphabetical");
});

// ../node_modules/refractor/node_modules/is-alphanumerical/index.js
var Ms = H((U9, Cs) => {
  "use strict";
  var V4 = Ss(), $4 = Ma();
  Cs.exports = j4;
  function j4(e) {
    return V4(e) || $4(e);
  }
  o(j4, "alphanumerical");
});

// ../node_modules/refractor/node_modules/parse-entities/decode-entity.browser.js
var Ls = H((G9, As) => {
  "use strict";
  var Un, W4 = 59;
  As.exports = U4;
  function U4(e) {
    var t = "&" + e + ";", r;
    return Un = Un || document.createElement("i"), Un.innerHTML = t, r = Un.textContent, r.charCodeAt(r.length - 1) === W4 && e !== "semi" ||
    r === t ? !1 : r;
  }
  o(U4, "decodeEntity");
});

// ../node_modules/refractor/node_modules/parse-entities/index.js
var $s = H((X9, Vs) => {
  "use strict";
  var Is = ws(), zs = bs(), q4 = Ma(), G4 = xs(), ks = Ms(), Y4 = Ls();
  Vs.exports = lm;
  var X4 = {}.hasOwnProperty, vr = String.fromCharCode, Z4 = Function.prototype, Ts = {
    warning: null,
    reference: null,
    text: null,
    warningContext: null,
    referenceContext: null,
    textContext: null,
    position: {},
    additional: null,
    attribute: !1,
    nonTerminated: !0
  }, K4 = 9, Hs = 10, J4 = 12, Q4 = 32, Ps = 38, em = 59, tm = 60, rm = 61, nm = 35, om = 88, am = 120, im = 65533, wr = "named", La = "hexa\
decimal", Ia = "decimal", za = {};
  za[La] = 16;
  za[Ia] = 10;
  var qn = {};
  qn[wr] = ks;
  qn[Ia] = q4;
  qn[La] = G4;
  var Os = 1, Bs = 2, Ns = 3, Fs = 4, Ds = 5, Aa = 6, _s = 7, Et = {};
  Et[Os] = "Named character references must be terminated by a semicolon";
  Et[Bs] = "Numeric character references must be terminated by a semicolon";
  Et[Ns] = "Named character references cannot be empty";
  Et[Fs] = "Numeric character references cannot be empty";
  Et[Ds] = "Named character references must be known";
  Et[Aa] = "Numeric character references cannot be disallowed";
  Et[_s] = "Numeric character references cannot be outside the permissible Unicode range";
  function lm(e, t) {
    var r = {}, n, a;
    t || (t = {});
    for (a in Ts)
      n = t[a], r[a] = n ?? Ts[a];
    return (r.position.indent || r.position.start) && (r.indent = r.position.indent || [], r.position = r.position.start), cm(e, r);
  }
  o(lm, "parseEntities");
  function cm(e, t) {
    var r = t.additional, n = t.nonTerminated, a = t.text, i = t.reference, c = t.warning, l = t.textContext, s = t.referenceContext, u = t.
    warningContext, f = t.position, d = t.indent || [], m = e.length, v = 0, y = -1, p = f.column || 1, h = f.line || 1, g = "", w = [], b, x,
    E, R, S, A, M, L, P, _, D, K, T, z, k, $, F, j, O;
    for (typeof r == "string" && (r = r.charCodeAt(0)), $ = G(), L = c ? Ce : Z4, v--, m++; ++v < m; )
      if (S === Hs && (p = d[y] || 1), S = e.charCodeAt(v), S === Ps) {
        if (M = e.charCodeAt(v + 1), M === K4 || M === Hs || M === J4 || M === Q4 || M === Ps || M === tm || M !== M || r && M === r) {
          g += vr(S), p++;
          continue;
        }
        for (T = v + 1, K = T, O = T, M === nm ? (O = ++K, M = e.charCodeAt(O), M === om || M === am ? (z = La, O = ++K) : z = Ia) : z = wr,
        b = "", D = "", R = "", k = qn[z], O--; ++O < m && (M = e.charCodeAt(O), !!k(M)); )
          R += vr(M), z === wr && X4.call(Is, R) && (b = R, D = Is[R]);
        E = e.charCodeAt(O) === em, E && (O++, x = z === wr ? Y4(R) : !1, x && (b = R, D = x)), j = 1 + O - T, !E && !n || (R ? z === wr ? (E &&
        !D ? L(Ds, 1) : (b !== R && (O = K + b.length, j = 1 + O - K, E = !1), E || (P = b ? Os : Ns, t.attribute ? (M = e.charCodeAt(O), M ===
        rm ? (L(P, j), D = null) : ks(M) ? D = null : L(P, j)) : L(P, j))), A = D) : (E || L(Bs, j), A = parseInt(R, za[z]), sm(A) ? (L(_s, j),
        A = vr(im)) : A in zs ? (L(Aa, j), A = zs[A]) : (_ = "", um(A) && L(Aa, j), A > 65535 && (A -= 65536, _ += vr(A >>> 10 | 55296), A =
        56320 | A & 1023), A = _ + vr(A))) : z !== wr && L(Fs, j)), A ? (he(), $ = G(), v = O - 1, p += O - T + 1, w.push(A), F = G(), F.offset++,
        i && i.call(
          s,
          A,
          { start: $, end: F },
          e.slice(T - 1, O)
        ), $ = F) : (R = e.slice(T - 1, O), g += R, p += R.length, v = O - 1);
      } else
        S === 10 && (h++, y++, p = 0), S === S ? (g += vr(S), p++) : he();
    return w.join("");
    function G() {
      return {
        line: h,
        column: p,
        offset: v + (f.offset || 0)
      };
    }
    function Ce(fe, de) {
      var be = G();
      be.column += de, be.offset += de, c.call(u, Et[fe], be, fe);
    }
    function he() {
      g && (w.push(g), a && a.call(l, g, { start: $, end: G() }), g = "");
    }
  }
  o(cm, "parse");
  function sm(e) {
    return e >= 55296 && e <= 57343 || e > 1114111;
  }
  o(sm, "prohibited");
  function um(e) {
    return e >= 1 && e <= 8 || e === 11 || e >= 13 && e <= 31 || e >= 127 && e <= 159 || e >= 64976 && e <= 65007 || (e & 65535) === 65535 ||
    (e & 65535) === 65534;
  }
  o(um, "disallowed");
});

// ../node_modules/refractor/node_modules/prismjs/components/prism-core.js
var Ws = H((K9, Gn) => {
  var fm = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
  var js = function(e) {
    var t = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, r = 0, n = {}, a = {
      /**
       * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
       * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
       * additional languages or plugins yourself.
       *
       * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
       *
       * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.manual = true;
       * // add a new <script> to load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      manual: e.Prism && e.Prism.manual,
      /**
       * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
       * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
       * own worker, you don't want it to do this.
       *
       * By setting this value to `true`, Prism will not add its own listeners to the worker.
       *
       * You obviously have to change this value before Prism executes. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.disableWorkerMessageHandler = true;
       * // Load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
      /**
       * A namespace for utility methods.
       *
       * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
       * change or disappear at any time.
       *
       * @namespace
       * @memberof Prism
       */
      util: {
        encode: /* @__PURE__ */ o(function p(h) {
          return h instanceof i ? new i(h.type, p(h.content), h.alias) : Array.isArray(h) ? h.map(p) : h.replace(/&/g, "&amp;").replace(/</g,
          "&lt;").replace(/\u00a0/g, " ");
        }, "encode"),
        /**
         * Returns the name of the type of the given value.
         *
         * @param {any} o
         * @returns {string}
         * @example
         * type(null)      === 'Null'
         * type(undefined) === 'Undefined'
         * type(123)       === 'Number'
         * type('foo')     === 'String'
         * type(true)      === 'Boolean'
         * type([1, 2])    === 'Array'
         * type({})        === 'Object'
         * type(String)    === 'Function'
         * type(/abc+/)    === 'RegExp'
         */
        type: /* @__PURE__ */ o(function(p) {
          return Object.prototype.toString.call(p).slice(8, -1);
        }, "type"),
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: /* @__PURE__ */ o(function(p) {
          return p.__id || Object.defineProperty(p, "__id", { value: ++r }), p.__id;
        }, "objId"),
        /**
         * Creates a deep clone of the given object.
         *
         * The main intended use of this function is to clone language definitions.
         *
         * @param {T} o
         * @param {Record<number, any>} [visited]
         * @returns {T}
         * @template T
         */
        clone: /* @__PURE__ */ o(function p(h, g) {
          g = g || {};
          var w, b;
          switch (a.util.type(h)) {
            case "Object":
              if (b = a.util.objId(h), g[b])
                return g[b];
              w = /** @type {Record<string, any>} */
              {}, g[b] = w;
              for (var x in h)
                h.hasOwnProperty(x) && (w[x] = p(h[x], g));
              return (
                /** @type {any} */
                w
              );
            case "Array":
              return b = a.util.objId(h), g[b] ? g[b] : (w = [], g[b] = w, /** @type {Array} */
              /** @type {any} */
              h.forEach(function(E, R) {
                w[R] = p(E, g);
              }), /** @type {any} */
              w);
            default:
              return h;
          }
        }, "deepClone"),
        /**
         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
         *
         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
         *
         * @param {Element} element
         * @returns {string}
         */
        getLanguage: /* @__PURE__ */ o(function(p) {
          for (; p; ) {
            var h = t.exec(p.className);
            if (h)
              return h[1].toLowerCase();
            p = p.parentElement;
          }
          return "none";
        }, "getLanguage"),
        /**
         * Sets the Prism `language-xxxx` class of the given element.
         *
         * @param {Element} element
         * @param {string} language
         * @returns {void}
         */
        setLanguage: /* @__PURE__ */ o(function(p, h) {
          p.className = p.className.replace(RegExp(t, "gi"), ""), p.classList.add("language-" + h);
        }, "setLanguage"),
        /**
         * Returns the script element that is currently executing.
         *
         * This does __not__ work for line script element.
         *
         * @returns {HTMLScriptElement | null}
         */
        currentScript: /* @__PURE__ */ o(function() {
          if (typeof document > "u")
            return null;
          if ("currentScript" in document)
            return (
              /** @type {any} */
              document.currentScript
            );
          try {
            throw new Error();
          } catch (w) {
            var p = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(w.stack) || [])[1];
            if (p) {
              var h = document.getElementsByTagName("script");
              for (var g in h)
                if (h[g].src == p)
                  return h[g];
            }
            return null;
          }
        }, "currentScript"),
        /**
         * Returns whether a given class is active for `element`.
         *
         * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
         * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
         * given class is just the given class with a `no-` prefix.
         *
         * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
         * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
         * ancestors have the given class or the negated version of it, then the default activation will be returned.
         *
         * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
         * version of it, the class is considered active.
         *
         * @param {Element} element
         * @param {string} className
         * @param {boolean} [defaultActivation=false]
         * @returns {boolean}
         */
        isActive: /* @__PURE__ */ o(function(p, h, g) {
          for (var w = "no-" + h; p; ) {
            var b = p.classList;
            if (b.contains(h))
              return !0;
            if (b.contains(w))
              return !1;
            p = p.parentElement;
          }
          return !!g;
        }, "isActive")
      },
      /**
       * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
       *
       * @namespace
       * @memberof Prism
       * @public
       */
      languages: {
        /**
         * The grammar for plain, unformatted text.
         */
        plain: n,
        plaintext: n,
        text: n,
        txt: n,
        /**
         * Creates a deep copy of the language with the given id and appends the given tokens.
         *
         * If a token in `redef` also appears in the copied language, then the existing token in the copied language
         * will be overwritten at its original position.
         *
         * ## Best practices
         *
         * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
         * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
         * understand the language definition because, normally, the order of tokens matters in Prism grammars.
         *
         * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
         * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
         *
         * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
         * @param {Grammar} redef The new tokens to append.
         * @returns {Grammar} The new language created.
         * @public
         * @example
         * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
         *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
         *     // at its original position
         *     'comment': { ... },
         *     // CSS doesn't have a 'color' token, so this token will be appended
         *     'color': /\b(?:red|green|blue)\b/
         * });
         */
        extend: /* @__PURE__ */ o(function(p, h) {
          var g = a.util.clone(a.languages[p]);
          for (var w in h)
            g[w] = h[w];
          return g;
        }, "extend"),
        /**
         * Inserts tokens _before_ another token in a language definition or any other grammar.
         *
         * ## Usage
         *
         * This helper method makes it easy to modify existing languages. For example, the CSS language definition
         * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
         * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
         * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
         * this:
         *
         * ```js
         * Prism.languages.markup.style = {
         *     // token
         * };
         * ```
         *
         * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
         * before existing tokens. For the CSS example above, you would use it like this:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'cdata', {
         *     'style': {
         *         // token
         *     }
         * });
         * ```
         *
         * ## Special cases
         *
         * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
         * will be ignored.
         *
         * This behavior can be used to insert tokens after `before`:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'comment', {
         *     'comment': Prism.languages.markup.comment,
         *     // tokens after 'comment'
         * });
         * ```
         *
         * ## Limitations
         *
         * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
         * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
         * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
         * deleting properties which is necessary to insert at arbitrary positions.
         *
         * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
         * Instead, it will create a new object and replace all references to the target object with the new one. This
         * can be done without temporarily deleting properties, so the iteration order is well-defined.
         *
         * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
         * you hold the target object in a variable, then the value of the variable will not change.
         *
         * ```js
         * var oldMarkup = Prism.languages.markup;
         * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
         *
         * assert(oldMarkup !== Prism.languages.markup);
         * assert(newMarkup === Prism.languages.markup);
         * ```
         *
         * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
         * object to be modified.
         * @param {string} before The key to insert before.
         * @param {Grammar} insert An object containing the key-value pairs to be inserted.
         * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
         * object to be modified.
         *
         * Defaults to `Prism.languages`.
         * @returns {Grammar} The new grammar object.
         * @public
         */
        insertBefore: /* @__PURE__ */ o(function(p, h, g, w) {
          w = w || /** @type {any} */
          a.languages;
          var b = w[p], x = {};
          for (var E in b)
            if (b.hasOwnProperty(E)) {
              if (E == h)
                for (var R in g)
                  g.hasOwnProperty(R) && (x[R] = g[R]);
              g.hasOwnProperty(E) || (x[E] = b[E]);
            }
          var S = w[p];
          return w[p] = x, a.languages.DFS(a.languages, function(A, M) {
            M === S && A != p && (this[A] = x);
          }), x;
        }, "insertBefore"),
        // Traverse a language definition with Depth First Search
        DFS: /* @__PURE__ */ o(function p(h, g, w, b) {
          b = b || {};
          var x = a.util.objId;
          for (var E in h)
            if (h.hasOwnProperty(E)) {
              g.call(h, E, h[E], w || E);
              var R = h[E], S = a.util.type(R);
              S === "Object" && !b[x(R)] ? (b[x(R)] = !0, p(R, g, null, b)) : S === "Array" && !b[x(R)] && (b[x(R)] = !0, p(R, g, E, b));
            }
        }, "DFS")
      },
      plugins: {},
      /**
       * This is the most high-level function in Prism’s API.
       * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
       * each one of them.
       *
       * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
       *
       * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
       * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
       * @memberof Prism
       * @public
       */
      highlightAll: /* @__PURE__ */ o(function(p, h) {
        a.highlightAllUnder(document, p, h);
      }, "highlightAll"),
      /**
       * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
       * {@link Prism.highlightElement} on each one of them.
       *
       * The following hooks will be run:
       * 1. `before-highlightall`
       * 2. `before-all-elements-highlight`
       * 3. All hooks of {@link Prism.highlightElement} for each element.
       *
       * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
       * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
       * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
       * @memberof Prism
       * @public
       */
      highlightAllUnder: /* @__PURE__ */ o(function(p, h, g) {
        var w = {
          callback: g,
          container: p,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        a.hooks.run("before-highlightall", w), w.elements = Array.prototype.slice.apply(w.container.querySelectorAll(w.selector)), a.hooks.run(
        "before-all-elements-highlight", w);
        for (var b = 0, x; x = w.elements[b++]; )
          a.highlightElement(x, h === !0, w.callback);
      }, "highlightAllUnder"),
      /**
       * Highlights the code inside a single element.
       *
       * The following hooks will be run:
       * 1. `before-sanity-check`
       * 2. `before-highlight`
       * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
       * 4. `before-insert`
       * 5. `after-highlight`
       * 6. `complete`
       *
       * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
       * the element's language.
       *
       * @param {Element} element The element containing the code.
       * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
       * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
       * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
       * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
       *
       * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
       * asynchronous highlighting to work. You can build your own bundle on the
       * [Download page](https://prismjs.com/download.html).
       * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
       * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
       * @memberof Prism
       * @public
       */
      highlightElement: /* @__PURE__ */ o(function(p, h, g) {
        var w = a.util.getLanguage(p), b = a.languages[w];
        a.util.setLanguage(p, w);
        var x = p.parentElement;
        x && x.nodeName.toLowerCase() === "pre" && a.util.setLanguage(x, w);
        var E = p.textContent, R = {
          element: p,
          language: w,
          grammar: b,
          code: E
        };
        function S(M) {
          R.highlightedCode = M, a.hooks.run("before-insert", R), R.element.innerHTML = R.highlightedCode, a.hooks.run("after-highlight", R),
          a.hooks.run("complete", R), g && g.call(R.element);
        }
        if (o(S, "insertHighlightedCode"), a.hooks.run("before-sanity-check", R), x = R.element.parentElement, x && x.nodeName.toLowerCase() ===
        "pre" && !x.hasAttribute("tabindex") && x.setAttribute("tabindex", "0"), !R.code) {
          a.hooks.run("complete", R), g && g.call(R.element);
          return;
        }
        if (a.hooks.run("before-highlight", R), !R.grammar) {
          S(a.util.encode(R.code));
          return;
        }
        if (h && e.Worker) {
          var A = new Worker(a.filename);
          A.onmessage = function(M) {
            S(M.data);
          }, A.postMessage(JSON.stringify({
            language: R.language,
            code: R.code,
            immediateClose: !0
          }));
        } else
          S(a.highlight(R.code, R.grammar, R.language));
      }, "highlightElement"),
      /**
       * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
       * and the language definitions to use, and returns a string with the HTML produced.
       *
       * The following hooks will be run:
       * 1. `before-tokenize`
       * 2. `after-tokenize`
       * 3. `wrap`: On each {@link Token}.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @param {string} language The name of the language definition passed to `grammar`.
       * @returns {string} The highlighted HTML.
       * @memberof Prism
       * @public
       * @example
       * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
       */
      highlight: /* @__PURE__ */ o(function(p, h, g) {
        var w = {
          code: p,
          grammar: h,
          language: g
        };
        if (a.hooks.run("before-tokenize", w), !w.grammar)
          throw new Error('The language "' + w.language + '" has no grammar.');
        return w.tokens = a.tokenize(w.code, w.grammar), a.hooks.run("after-tokenize", w), i.stringify(a.util.encode(w.tokens), w.language);
      }, "highlight"),
      /**
       * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
       * and the language definitions to use, and returns an array with the tokenized code.
       *
       * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
       *
       * This method could be useful in other contexts as well, as a very crude parser.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @returns {TokenStream} An array of strings and tokens, a token stream.
       * @memberof Prism
       * @public
       * @example
       * let code = `var foo = 0;`;
       * let tokens = Prism.tokenize(code, Prism.languages.javascript);
       * tokens.forEach(token => {
       *     if (token instanceof Prism.Token && token.type === 'number') {
       *         console.log(`Found numeric literal: ${token.content}`);
       *     }
       * });
       */
      tokenize: /* @__PURE__ */ o(function(p, h) {
        var g = h.rest;
        if (g) {
          for (var w in g)
            h[w] = g[w];
          delete h.rest;
        }
        var b = new s();
        return u(b, b.head, p), l(p, b, h, b.head, 0), d(b);
      }, "tokenize"),
      /**
       * @namespace
       * @memberof Prism
       * @public
       */
      hooks: {
        all: {},
        /**
         * Adds the given callback to the list of callbacks for the given hook.
         *
         * The callback will be invoked when the hook it is registered for is run.
         * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
         *
         * One callback function can be registered to multiple hooks and the same hook multiple times.
         *
         * @param {string} name The name of the hook.
         * @param {HookCallback} callback The callback function which is given environment variables.
         * @public
         */
        add: /* @__PURE__ */ o(function(p, h) {
          var g = a.hooks.all;
          g[p] = g[p] || [], g[p].push(h);
        }, "add"),
        /**
         * Runs a hook invoking all registered callbacks with the given environment variables.
         *
         * Callbacks will be invoked synchronously and in the order in which they were registered.
         *
         * @param {string} name The name of the hook.
         * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
         * @public
         */
        run: /* @__PURE__ */ o(function(p, h) {
          var g = a.hooks.all[p];
          if (!(!g || !g.length))
            for (var w = 0, b; b = g[w++]; )
              b(h);
        }, "run")
      },
      Token: i
    };
    e.Prism = a;
    function i(p, h, g, w) {
      this.type = p, this.content = h, this.alias = g, this.length = (w || "").length | 0;
    }
    o(i, "Token"), i.stringify = /* @__PURE__ */ o(function p(h, g) {
      if (typeof h == "string")
        return h;
      if (Array.isArray(h)) {
        var w = "";
        return h.forEach(function(S) {
          w += p(S, g);
        }), w;
      }
      var b = {
        type: h.type,
        content: p(h.content, g),
        tag: "span",
        classes: ["token", h.type],
        attributes: {},
        language: g
      }, x = h.alias;
      x && (Array.isArray(x) ? Array.prototype.push.apply(b.classes, x) : b.classes.push(x)), a.hooks.run("wrap", b);
      var E = "";
      for (var R in b.attributes)
        E += " " + R + '="' + (b.attributes[R] || "").replace(/"/g, "&quot;") + '"';
      return "<" + b.tag + ' class="' + b.classes.join(" ") + '"' + E + ">" + b.content + "</" + b.tag + ">";
    }, "stringify");
    function c(p, h, g, w) {
      p.lastIndex = h;
      var b = p.exec(g);
      if (b && w && b[1]) {
        var x = b[1].length;
        b.index += x, b[0] = b[0].slice(x);
      }
      return b;
    }
    o(c, "matchPattern");
    function l(p, h, g, w, b, x) {
      for (var E in g)
        if (!(!g.hasOwnProperty(E) || !g[E])) {
          var R = g[E];
          R = Array.isArray(R) ? R : [R];
          for (var S = 0; S < R.length; ++S) {
            if (x && x.cause == E + "," + S)
              return;
            var A = R[S], M = A.inside, L = !!A.lookbehind, P = !!A.greedy, _ = A.alias;
            if (P && !A.pattern.global) {
              var D = A.pattern.toString().match(/[imsuy]*$/)[0];
              A.pattern = RegExp(A.pattern.source, D + "g");
            }
            for (var K = A.pattern || A, T = w.next, z = b; T !== h.tail && !(x && z >= x.reach); z += T.value.length, T = T.next) {
              var k = T.value;
              if (h.length > p.length)
                return;
              if (!(k instanceof i)) {
                var $ = 1, F;
                if (P) {
                  if (F = c(K, z, p, L), !F || F.index >= p.length)
                    break;
                  var Ce = F.index, j = F.index + F[0].length, O = z;
                  for (O += T.value.length; Ce >= O; )
                    T = T.next, O += T.value.length;
                  if (O -= T.value.length, z = O, T.value instanceof i)
                    continue;
                  for (var G = T; G !== h.tail && (O < j || typeof G.value == "string"); G = G.next)
                    $++, O += G.value.length;
                  $--, k = p.slice(z, O), F.index -= z;
                } else if (F = c(K, 0, k, L), !F)
                  continue;
                var Ce = F.index, he = F[0], fe = k.slice(0, Ce), de = k.slice(Ce + he.length), be = z + k.length;
                x && be > x.reach && (x.reach = be);
                var Me = T.prev;
                fe && (Me = u(h, Me, fe), z += fe.length), f(h, Me, $);
                var Nt = new i(E, M ? a.tokenize(he, M) : he, _, he);
                if (T = u(h, Me, Nt), de && u(h, T, de), $ > 1) {
                  var Kr = {
                    cause: E + "," + S,
                    reach: be
                  };
                  l(p, h, g, T.prev, z, Kr), x && Kr.reach > x.reach && (x.reach = Kr.reach);
                }
              }
            }
          }
        }
    }
    o(l, "matchGrammar");
    function s() {
      var p = { value: null, prev: null, next: null }, h = { value: null, prev: p, next: null };
      p.next = h, this.head = p, this.tail = h, this.length = 0;
    }
    o(s, "LinkedList");
    function u(p, h, g) {
      var w = h.next, b = { value: g, prev: h, next: w };
      return h.next = b, w.prev = b, p.length++, b;
    }
    o(u, "addAfter");
    function f(p, h, g) {
      for (var w = h.next, b = 0; b < g && w !== p.tail; b++)
        w = w.next;
      h.next = w, w.prev = h, p.length -= b;
    }
    o(f, "removeRange");
    function d(p) {
      for (var h = [], g = p.head.next; g !== p.tail; )
        h.push(g.value), g = g.next;
      return h;
    }
    if (o(d, "toArray"), !e.document)
      return e.addEventListener && (a.disableWorkerMessageHandler || e.addEventListener("message", function(p) {
        var h = JSON.parse(p.data), g = h.language, w = h.code, b = h.immediateClose;
        e.postMessage(a.highlight(w, a.languages[g], g)), b && e.close();
      }, !1)), a;
    var m = a.util.currentScript();
    m && (a.filename = m.src, m.hasAttribute("data-manual") && (a.manual = !0));
    function v() {
      a.manual || a.highlightAll();
    }
    if (o(v, "highlightAutomaticallyCallback"), !a.manual) {
      var y = document.readyState;
      y === "loading" || y === "interactive" && m && m.defer ? document.addEventListener("DOMContentLoaded", v) : window.requestAnimationFrame ?
      window.requestAnimationFrame(v) : window.setTimeout(v, 16);
    }
    return a;
  }(fm);
  typeof Gn < "u" && Gn.exports && (Gn.exports = js);
  typeof global < "u" && (global.Prism = js);
});

// ../node_modules/refractor/lang/markup.js
var Ha = H((Q9, Us) => {
  "use strict";
  Us.exports = Ta;
  Ta.displayName = "markup";
  Ta.aliases = ["html", "mathml", "svg", "xml", "ssml", "atom", "rss"];
  function Ta(e) {
    e.languages.markup = {
      comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
      },
      prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
      },
      doctype: {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: !0,
            greedy: !0,
            inside: null
            // see below
          },
          string: {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: !0
          },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/
        }
      },
      cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
      },
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    }, e.languages.markup.tag.inside["attr-value"].inside.entity = e.languages.markup.entity, e.languages.markup.doctype.inside["internal-su\
bset"].inside = e.languages.markup, e.hooks.add("wrap", function(t) {
      t.type === "entity" && (t.attributes.title = t.content.value.replace(/&amp;/, "&"));
    }), Object.defineProperty(e.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: /* @__PURE__ */ o(function(r, n) {
        var a = {};
        a["language-" + n] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: e.languages[n]
        }, a.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var i = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: a
          }
        };
        i["language-" + n] = {
          pattern: /[\s\S]+/,
          inside: e.languages[n]
        };
        var c = {};
        c[r] = {
          pattern: RegExp(
            /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
              /__/g,
              function() {
                return r;
              }
            ),
            "i"
          ),
          lookbehind: !0,
          greedy: !0,
          inside: i
        }, e.languages.insertBefore("markup", "cdata", c);
      }, "addInlined")
    }), Object.defineProperty(e.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: /* @__PURE__ */ o(function(t, r) {
        e.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + t + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: !0,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: !0,
                  alias: [r, "language-" + r],
                  inside: e.languages[r]
                },
                punctuation: [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }, "value")
    }), e.languages.html = e.languages.markup, e.languages.mathml = e.languages.markup, e.languages.svg = e.languages.markup, e.languages.xml =
    e.languages.extend("markup", {}), e.languages.ssml = e.languages.xml, e.languages.atom = e.languages.xml, e.languages.rss = e.languages.
    xml;
  }
  o(Ta, "markup");
});

// ../node_modules/refractor/lang/css.js
var ka = H((ty, qs) => {
  "use strict";
  qs.exports = Pa;
  Pa.displayName = "css";
  Pa.aliases = [];
  function Pa(e) {
    (function(t) {
      var r = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      t.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0
            }
            // See rest below
          }
        },
        url: {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp(
            "\\burl\\((?:" + r.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)",
            "i"
          ),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + r.source + "$"),
              alias: "url"
            }
          }
        },
        selector: {
          pattern: RegExp(
            `(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + r.source + ")*(?=\\s*\\{)"
          ),
          lookbehind: !0
        },
        string: {
          pattern: r,
          greedy: !0
        },
        property: {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0
        },
        punctuation: /[(){};:,]/
      }, t.languages.css.atrule.inside.rest = t.languages.css;
      var n = t.languages.markup;
      n && (n.tag.addInlined("style", "css"), n.tag.addAttribute("style", "css"));
    })(e);
  }
  o(Pa, "css");
});

// ../node_modules/refractor/lang/clike.js
var Ys = H((ny, Gs) => {
  "use strict";
  Gs.exports = Oa;
  Oa.displayName = "clike";
  Oa.aliases = [];
  function Oa(e) {
    e.languages.clike = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: !0,
          greedy: !0
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: !0,
          greedy: !0
        }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    };
  }
  o(Oa, "clike");
});

// ../node_modules/refractor/lang/javascript.js
var Zs = H((ay, Xs) => {
  "use strict";
  Xs.exports = Ba;
  Ba.displayName = "javascript";
  Ba.aliases = ["js"];
  function Ba(e) {
    e.languages.javascript = e.languages.extend("clike", {
      "class-name": [
        e.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: !0
        }
      ],
      keyword: [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: !0
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: !0
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: !0
      },
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), e.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, e.languages.
    insertBefore("javascript", "keyword", {
      regex: {
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: e.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      parameter: [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: !0,
          inside: e.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: !0,
          inside: e.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: e.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: e.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), e.languages.insertBefore("javascript", "string", {
      hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: e.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property"
      }
    }), e.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
      }
    }), e.languages.markup && (e.languages.markup.tag.addInlined("script", "javascript"), e.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.
      source,
      "javascript"
    )), e.languages.js = e.languages.javascript;
  }
  o(Ba, "javascript");
});

// ../node_modules/refractor/core.js
var e1 = H((ly, Qs) => {
  "use strict";
  var ln = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof global ==
  "object" ? global : {}, dm = Am();
  ln.Prism = { manual: !0, disableWorkerMessageHandler: !0 };
  var pm = vs(), mm = $s(), Ks = Ws(), hm = Ha(), gm = ka(), vm = Ys(), wm = Zs();
  dm();
  var Na = {}.hasOwnProperty;
  function Js() {
  }
  o(Js, "Refractor");
  Js.prototype = Ks;
  var oe = new Js();
  Qs.exports = oe;
  oe.highlight = ym;
  oe.register = cn;
  oe.alias = bm;
  oe.registered = Rm;
  oe.listLanguages = xm;
  cn(hm);
  cn(gm);
  cn(vm);
  cn(wm);
  oe.util.encode = Cm;
  oe.Token.stringify = Em;
  function cn(e) {
    if (typeof e != "function" || !e.displayName)
      throw new Error("Expected `function` for `grammar`, got `" + e + "`");
    oe.languages[e.displayName] === void 0 && e(oe);
  }
  o(cn, "register");
  function bm(e, t) {
    var r = oe.languages, n = e, a, i, c, l;
    t && (n = {}, n[e] = t);
    for (a in n)
      for (i = n[a], i = typeof i == "string" ? [i] : i, c = i.length, l = -1; ++l < c; )
        r[i[l]] = r[a];
  }
  o(bm, "alias");
  function ym(e, t) {
    var r = Ks.highlight, n;
    if (typeof e != "string")
      throw new Error("Expected `string` for `value`, got `" + e + "`");
    if (oe.util.type(t) === "Object")
      n = t, t = null;
    else {
      if (typeof t != "string")
        throw new Error("Expected `string` for `name`, got `" + t + "`");
      if (Na.call(oe.languages, t))
        n = oe.languages[t];
      else
        throw new Error("Unknown language: `" + t + "` is not registered");
    }
    return r.call(this, e, n, t);
  }
  o(ym, "highlight");
  function Rm(e) {
    if (typeof e != "string")
      throw new Error("Expected `string` for `language`, got `" + e + "`");
    return Na.call(oe.languages, e);
  }
  o(Rm, "registered");
  function xm() {
    var e = oe.languages, t = [], r;
    for (r in e)
      Na.call(e, r) && typeof e[r] == "object" && t.push(r);
    return t;
  }
  o(xm, "listLanguages");
  function Em(e, t, r) {
    var n;
    return typeof e == "string" ? { type: "text", value: e } : oe.util.type(e) === "Array" ? Sm(e, t) : (n = {
      type: e.type,
      content: oe.Token.stringify(e.content, t, r),
      tag: "span",
      classes: ["token", e.type],
      attributes: {},
      language: t,
      parent: r
    }, e.alias && (n.classes = n.classes.concat(e.alias)), oe.hooks.run("wrap", n), pm(
      n.tag + "." + n.classes.join("."),
      Mm(n.attributes),
      n.content
    ));
  }
  o(Em, "stringify");
  function Sm(e, t) {
    for (var r = [], n = e.length, a = -1, i; ++a < n; )
      i = e[a], i !== "" && i !== null && i !== void 0 && r.push(i);
    for (a = -1, n = r.length; ++a < n; )
      i = r[a], r[a] = oe.Token.stringify(i, t, r);
    return r;
  }
  o(Sm, "stringifyAll");
  function Cm(e) {
    return e;
  }
  o(Cm, "encode");
  function Mm(e) {
    var t;
    for (t in e)
      e[t] = mm(e[t]);
    return e;
  }
  o(Mm, "attributes");
  function Am() {
    var e = "Prism" in ln, t = e ? ln.Prism : void 0;
    return r;
    function r() {
      e ? ln.Prism = t : delete ln.Prism, e = void 0, t = void 0;
    }
  }
  o(Am, "capture");
});

// ../node_modules/react-syntax-highlighter/dist/esm/prism-light.js
var Yn, Fa, Xn, t1 = C(() => {
  vc();
  Yn = ge(e1()), Fa = ma(Yn.default, {});
  Fa.registerLanguage = function(e, t) {
    return Yn.default.register(t);
  };
  Fa.alias = function(e, t) {
    return Yn.default.alias(e, t);
  };
  Xn = Fa;
});

// ../node_modules/react-syntax-highlighter/dist/esm/index.js
var r1 = C(() => {
  pa();
});

// ../node_modules/refractor/lang/bash.js
var o1 = H((py, n1) => {
  "use strict";
  n1.exports = Da;
  Da.displayName = "bash";
  Da.aliases = ["shell"];
  function Da(e) {
    (function(t) {
      var r = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE\
|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|G\
DMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HO\
STTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHON\
E|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OST\
YPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS\
|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRE\
NT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_\
SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b", n = {
        pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
        lookbehind: !0,
        alias: "punctuation",
        // this looks reasonably well in all themes
        inside: null
        // see below
      }, a = {
        bash: n,
        environment: {
          pattern: RegExp("\\$" + r),
          alias: "constant"
        },
        variable: [
          // [0]: Arithmetic Environment
          {
            pattern: /\$?\(\([\s\S]+?\)\)/,
            greedy: !0,
            inside: {
              // If there is a $ sign at the beginning highlight $(( and )) as variable
              variable: [
                {
                  pattern: /(^\$\(\([\s\S]+)\)\)/,
                  lookbehind: !0
                },
                /^\$\(\(/
              ],
              number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
              // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
              operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
              // If there is no $ sign at the beginning highlight (( and )) as punctuation
              punctuation: /\(\(?|\)\)?|,|;/
            }
          },
          // [1]: Command Substitution
          {
            pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
            greedy: !0,
            inside: {
              variable: /^\$\(|^`|\)$|`$/
            }
          },
          // [2]: Brace expansion
          {
            pattern: /\$\{[^}]+\}/,
            greedy: !0,
            inside: {
              operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
              punctuation: /[\[\]]/,
              environment: {
                pattern: RegExp("(\\{)" + r),
                lookbehind: !0,
                alias: "constant"
              }
            }
          },
          /\$(?:\w+|[#?*!@$])/
        ],
        // Escape sequences from echo and printf's manuals, and escaped quotes.
        entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
      };
      t.languages.bash = {
        shebang: {
          pattern: /^#!\s*\/.*/,
          alias: "important"
        },
        comment: {
          pattern: /(^|[^"{\\$])#.*/,
          lookbehind: !0
        },
        "function-name": [
          // a) function foo {
          // b) foo() {
          // c) function foo() {
          // but not “foo {”
          {
            // a) and c)
            pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
            lookbehind: !0,
            alias: "function"
          },
          {
            // b)
            pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
            alias: "function"
          }
        ],
        // Highlight variable names as variables in for and select beginnings.
        "for-or-select": {
          pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
          alias: "variable",
          lookbehind: !0
        },
        // Highlight variable names as variables in the left-hand part
        // of assignments (“=” and “+=”).
        "assign-left": {
          pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
          inside: {
            environment: {
              pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + r),
              lookbehind: !0,
              alias: "constant"
            }
          },
          alias: "variable",
          lookbehind: !0
        },
        string: [
          // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
          {
            pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
            lookbehind: !0,
            greedy: !0,
            inside: a
          },
          // Here-document with quotes around the tag
          // → No expansion (so no “inside”).
          {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
            lookbehind: !0,
            greedy: !0,
            inside: {
              bash: n
            }
          },
          // “Normal” string
          {
            // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
            pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
            lookbehind: !0,
            greedy: !0,
            inside: a
          },
          {
            // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
            pattern: /(^|[^$\\])'[^']*'/,
            lookbehind: !0,
            greedy: !0
          },
          {
            // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
            pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
            greedy: !0,
            inside: {
              entity: a.entity
            }
          }
        ],
        environment: {
          pattern: RegExp("\\$?" + r),
          alias: "constant"
        },
        variable: a.variable,
        function: {
          pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
          lookbehind: !0
        },
        keyword: {
          pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
          lookbehind: !0
        },
        // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
        builtin: {
          pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
          lookbehind: !0,
          // Alias added to make those easier to distinguish from strings.
          alias: "class-name"
        },
        boolean: {
          pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
          lookbehind: !0
        },
        "file-descriptor": {
          pattern: /\B&\d\b/,
          alias: "important"
        },
        operator: {
          // Lots of redirections here, but not just that.
          pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
          inside: {
            "file-descriptor": {
              pattern: /^\d/,
              alias: "important"
            }
          }
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
          pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
          lookbehind: !0
        }
      }, n.inside = t.languages.bash;
      for (var i = [
        "comment",
        "function-name",
        "for-or-select",
        "assign-left",
        "string",
        "environment",
        "function",
        "keyword",
        "builtin",
        "boolean",
        "file-descriptor",
        "operator",
        "punctuation",
        "number"
      ], c = a.variable[1].inside, l = 0; l < i.length; l++)
        c[i[l]] = t.languages.bash[i[l]];
      t.languages.shell = t.languages.bash;
    })(e);
  }
  o(Da, "bash");
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/bash.js
var a1, i1, l1 = C(() => {
  a1 = ge(o1()), i1 = a1.default;
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/css.js
var c1, s1, u1 = C(() => {
  c1 = ge(ka()), s1 = c1.default;
});

// ../node_modules/refractor/lang/graphql.js
var d1 = H((vy, f1) => {
  "use strict";
  f1.exports = _a;
  _a.displayName = "graphql";
  _a.aliases = [];
  function _a(e) {
    e.languages.graphql = {
      comment: /#.*/,
      description: {
        pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
        greedy: !0,
        alias: "string",
        inside: {
          "language-markdown": {
            pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
            lookbehind: !0,
            inside: e.languages.markdown
          }
        }
      },
      string: {
        pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
        greedy: !0
      },
      number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      boolean: /\b(?:false|true)\b/,
      variable: /\$[a-z_]\w*/i,
      directive: {
        pattern: /@[a-z_]\w*/i,
        alias: "function"
      },
      "attr-name": {
        pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
        greedy: !0
      },
      "atom-input": {
        pattern: /\b[A-Z]\w*Input\b/,
        alias: "class-name"
      },
      scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
      constant: /\b[A-Z][A-Z_\d]*\b/,
      "class-name": {
        pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
        lookbehind: !0
      },
      fragment: {
        pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
        lookbehind: !0,
        alias: "function"
      },
      "definition-mutation": {
        pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
        lookbehind: !0,
        alias: "function"
      },
      "definition-query": {
        pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
        lookbehind: !0,
        alias: "function"
      },
      keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
      operator: /[!=|&]|\.{3}/,
      "property-query": /\w+(?=\s*\()/,
      object: /\w+(?=\s*\{)/,
      punctuation: /[!(){}\[\]:=,]/,
      property: /\w+/
    }, e.hooks.add("after-tokenize", /* @__PURE__ */ o(function(r) {
      if (r.language !== "graphql")
        return;
      var n = r.tokens.filter(function(h) {
        return typeof h != "string" && h.type !== "comment" && h.type !== "scalar";
      }), a = 0;
      function i(h) {
        return n[a + h];
      }
      o(i, "getToken");
      function c(h, g) {
        g = g || 0;
        for (var w = 0; w < h.length; w++) {
          var b = i(w + g);
          if (!b || b.type !== h[w])
            return !1;
        }
        return !0;
      }
      o(c, "isTokenType");
      function l(h, g) {
        for (var w = 1, b = a; b < n.length; b++) {
          var x = n[b], E = x.content;
          if (x.type === "punctuation" && typeof E == "string") {
            if (h.test(E))
              w++;
            else if (g.test(E) && (w--, w === 0))
              return b;
          }
        }
        return -1;
      }
      o(l, "findClosingBracket");
      function s(h, g) {
        var w = h.alias;
        w ? Array.isArray(w) || (h.alias = w = [w]) : h.alias = w = [], w.push(g);
      }
      for (o(s, "addAlias"); a < n.length; ) {
        var u = n[a++];
        if (u.type === "keyword" && u.content === "mutation") {
          var f = [];
          if (c(["definition-mutation", "punctuation"]) && i(1).content === "(") {
            a += 2;
            var d = l(/^\($/, /^\)$/);
            if (d === -1)
              continue;
            for (; a < d; a++) {
              var m = i(0);
              m.type === "variable" && (s(m, "variable-input"), f.push(m.content));
            }
            a = d + 1;
          }
          if (c(["punctuation", "property-query"]) && i(0).content === "{" && (a++, s(i(0), "property-mutation"), f.length > 0)) {
            var v = l(/^\{$/, /^\}$/);
            if (v === -1)
              continue;
            for (var y = a; y < v; y++) {
              var p = n[y];
              p.type === "variable" && f.indexOf(p.content) >= 0 && s(p, "variable-input");
            }
          }
        }
      }
    }, "afterTokenizeGraphql"));
  }
  o(_a, "graphql");
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/graphql.js
var p1, m1, h1 = C(() => {
  p1 = ge(d1()), m1 = p1.default;
});

// ../node_modules/refractor/lang/js-extras.js
var v1 = H((yy, g1) => {
  "use strict";
  g1.exports = Va;
  Va.displayName = "jsExtras";
  Va.aliases = [];
  function Va(e) {
    (function(t) {
      t.languages.insertBefore("javascript", "function-variable", {
        "method-variable": {
          pattern: RegExp(
            "(\\.\\s*)" + t.languages.javascript["function-variable"].pattern.source
          ),
          lookbehind: !0,
          alias: ["function-variable", "method", "function", "property-access"]
        }
      }), t.languages.insertBefore("javascript", "function", {
        method: {
          pattern: RegExp(
            "(\\.\\s*)" + t.languages.javascript.function.source
          ),
          lookbehind: !0,
          alias: ["function", "property-access"]
        }
      }), t.languages.insertBefore("javascript", "constant", {
        "known-class-name": [
          {
            // standard built-ins
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
            pattern: /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,
            alias: "class-name"
          },
          {
            // errors
            pattern: /\b(?:[A-Z]\w*)Error\b/,
            alias: "class-name"
          }
        ]
      });
      function r(s, u) {
        return RegExp(
          s.replace(/<ID>/g, function() {
            return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source;
          }),
          u
        );
      }
      o(r, "withId"), t.languages.insertBefore("javascript", "keyword", {
        imports: {
          // https://tc39.es/ecma262/#sec-imports
          pattern: r(
            /(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/.source
          ),
          lookbehind: !0,
          inside: t.languages.javascript
        },
        exports: {
          // https://tc39.es/ecma262/#sec-exports
          pattern: r(
            /(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source
          ),
          lookbehind: !0,
          inside: t.languages.javascript
        }
      }), t.languages.javascript.keyword.unshift(
        {
          pattern: /\b(?:as|default|export|from|import)\b/,
          alias: "module"
        },
        {
          pattern: /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
          alias: "control-flow"
        },
        {
          pattern: /\bnull\b/,
          alias: ["null", "nil"]
        },
        {
          pattern: /\bundefined\b/,
          alias: "nil"
        }
      ), t.languages.insertBefore("javascript", "operator", {
        spread: {
          pattern: /\.{3}/,
          alias: "operator"
        },
        arrow: {
          pattern: /=>/,
          alias: "operator"
        }
      }), t.languages.insertBefore("javascript", "punctuation", {
        "property-access": {
          pattern: r(/(\.\s*)#?<ID>/.source),
          lookbehind: !0
        },
        "maybe-class-name": {
          pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
          lookbehind: !0
        },
        dom: {
          // this contains only a few commonly used DOM variables
          pattern: /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,
          alias: "variable"
        },
        console: {
          pattern: /\bconsole(?=\s*\.)/,
          alias: "class-name"
        }
      });
      for (var n = [
        "function",
        "function-variable",
        "method",
        "method-variable",
        "property-access"
      ], a = 0; a < n.length; a++) {
        var i = n[a], c = t.languages.javascript[i];
        t.util.type(c) === "RegExp" && (c = t.languages.javascript[i] = {
          pattern: c
        });
        var l = c.inside || {};
        c.inside = l, l["maybe-class-name"] = /^[A-Z][\s\S]*/;
      }
    })(e);
  }
  o(Va, "jsExtras");
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/js-extras.js
var w1, b1, y1 = C(() => {
  w1 = ge(v1()), b1 = w1.default;
});

// ../node_modules/refractor/lang/json.js
var x1 = H((Ey, R1) => {
  "use strict";
  R1.exports = $a;
  $a.displayName = "json";
  $a.aliases = ["webmanifest"];
  function $a(e) {
    e.languages.json = {
      property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: !0,
        greedy: !0
      },
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: !0,
        greedy: !0
      },
      comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: !0
      },
      number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      punctuation: /[{}[\],]/,
      operator: /:/,
      boolean: /\b(?:false|true)\b/,
      null: {
        pattern: /\bnull\b/,
        alias: "keyword"
      }
    }, e.languages.webmanifest = e.languages.json;
  }
  o($a, "json");
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/json.js
var E1, S1, C1 = C(() => {
  E1 = ge(x1()), S1 = E1.default;
});

// ../node_modules/refractor/lang/jsx.js
var Wa = H((My, M1) => {
  "use strict";
  M1.exports = ja;
  ja.displayName = "jsx";
  ja.aliases = [];
  function ja(e) {
    (function(t) {
      var r = t.util.clone(t.languages.javascript), n = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source, a = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.
      source, i = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
      function c(u, f) {
        return u = u.replace(/<S>/g, function() {
          return n;
        }).replace(/<BRACES>/g, function() {
          return a;
        }).replace(/<SPREAD>/g, function() {
          return i;
        }), RegExp(u, f);
      }
      o(c, "re"), i = c(i).source, t.languages.jsx = t.languages.extend("markup", r), t.languages.jsx.tag.pattern = c(
        /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.
        source
      ), t.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/, t.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,
      t.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, t.languages.jsx.tag.inside.comment = r.comment, t.languages.
      insertBefore(
        "inside",
        "attr-name",
        {
          spread: {
            pattern: c(/<SPREAD>/.source),
            inside: t.languages.jsx
          }
        },
        t.languages.jsx.tag
      ), t.languages.insertBefore(
        "inside",
        "special-attr",
        {
          script: {
            // Allow for two levels of nesting
            pattern: c(/=<BRACES>/.source),
            alias: "language-javascript",
            inside: {
              "script-punctuation": {
                pattern: /^=(?=\{)/,
                alias: "punctuation"
              },
              rest: t.languages.jsx
            }
          }
        },
        t.languages.jsx.tag
      );
      var l = /* @__PURE__ */ o(function(u) {
        return u ? typeof u == "string" ? u : typeof u.content == "string" ? u.content : u.content.map(l).join("") : "";
      }, "stringifyToken"), s = /* @__PURE__ */ o(function(u) {
        for (var f = [], d = 0; d < u.length; d++) {
          var m = u[d], v = !1;
          if (typeof m != "string" && (m.type === "tag" && m.content[0] && m.content[0].type === "tag" ? m.content[0].content[0].content ===
          "</" ? f.length > 0 && f[f.length - 1].tagName === l(m.content[0].content[1]) && f.pop() : m.content[m.content.length - 1].content ===
          "/>" || f.push({
            tagName: l(m.content[0].content[1]),
            openedBraces: 0
          }) : f.length > 0 && m.type === "punctuation" && m.content === "{" ? f[f.length - 1].openedBraces++ : f.length > 0 && f[f.length -
          1].openedBraces > 0 && m.type === "punctuation" && m.content === "}" ? f[f.length - 1].openedBraces-- : v = !0), (v || typeof m ==
          "string") && f.length > 0 && f[f.length - 1].openedBraces === 0) {
            var y = l(m);
            d < u.length - 1 && (typeof u[d + 1] == "string" || u[d + 1].type === "plain-text") && (y += l(u[d + 1]), u.splice(d + 1, 1)), d >
            0 && (typeof u[d - 1] == "string" || u[d - 1].type === "plain-text") && (y = l(u[d - 1]) + y, u.splice(d - 1, 1), d--), u[d] = new t.
            Token(
              "plain-text",
              y,
              null,
              y
            );
          }
          m.content && typeof m.content != "string" && s(m.content);
        }
      }, "walkTokens");
      t.hooks.add("after-tokenize", function(u) {
        u.language !== "jsx" && u.language !== "tsx" || s(u.tokens);
      });
    })(e);
  }
  o(ja, "jsx");
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/jsx.js
var A1, L1, I1 = C(() => {
  A1 = ge(Wa()), L1 = A1.default;
});

// ../node_modules/refractor/lang/markdown.js
var T1 = H((Iy, z1) => {
  "use strict";
  z1.exports = Ua;
  Ua.displayName = "markdown";
  Ua.aliases = ["md"];
  function Ua(e) {
    (function(t) {
      var r = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
      function n(d) {
        return d = d.replace(/<inner>/g, function() {
          return r;
        }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + d + ")");
      }
      o(n, "createInline");
      var a = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, i = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.
      replace(
        /__/g,
        function() {
          return a;
        }
      ), c = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
      t.languages.markdown = t.languages.extend("markup", {}), t.languages.insertBefore("markdown", "prolog", {
        "front-matter-block": {
          pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
          lookbehind: !0,
          greedy: !0,
          inside: {
            punctuation: /^---|---$/,
            "front-matter": {
              pattern: /\S+(?:\s+\S+)*/,
              alias: ["yaml", "language-yaml"],
              inside: t.languages.yaml
            }
          }
        },
        blockquote: {
          // > ...
          pattern: /^>(?:[\t ]*>)*/m,
          alias: "punctuation"
        },
        table: {
          pattern: RegExp(
            "^" + i + c + "(?:" + i + ")*",
            "m"
          ),
          inside: {
            "table-data-rows": {
              pattern: RegExp(
                "^(" + i + c + ")(?:" + i + ")*$"
              ),
              lookbehind: !0,
              inside: {
                "table-data": {
                  pattern: RegExp(a),
                  inside: t.languages.markdown
                },
                punctuation: /\|/
              }
            },
            "table-line": {
              pattern: RegExp("^(" + i + ")" + c + "$"),
              lookbehind: !0,
              inside: {
                punctuation: /\||:?-{3,}:?/
              }
            },
            "table-header-row": {
              pattern: RegExp("^" + i + "$"),
              inside: {
                "table-header": {
                  pattern: RegExp(a),
                  alias: "important",
                  inside: t.languages.markdown
                },
                punctuation: /\|/
              }
            }
          }
        },
        code: [
          {
            // Prefixed by 4 spaces or 1 tab and preceded by an empty line
            pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: !0,
            alias: "keyword"
          },
          {
            // ```optional language
            // code block
            // ```
            pattern: /^```[\s\S]*?^```$/m,
            greedy: !0,
            inside: {
              "code-block": {
                pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                lookbehind: !0
              },
              "code-language": {
                pattern: /^(```).+/,
                lookbehind: !0
              },
              punctuation: /```/
            }
          }
        ],
        title: [
          {
            // title 1
            // =======
            // title 2
            // -------
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: "important",
            inside: {
              punctuation: /==+$|--+$/
            }
          },
          {
            // # title 1
            // ###### title 6
            pattern: /(^\s*)#.+/m,
            lookbehind: !0,
            alias: "important",
            inside: {
              punctuation: /^#+|#+$/
            }
          }
        ],
        hr: {
          // ***
          // ---
          // * * *
          // -----------
          pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
          lookbehind: !0,
          alias: "punctuation"
        },
        list: {
          // * item
          // + item
          // - item
          // 1. item
          pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
          lookbehind: !0,
          alias: "punctuation"
        },
        "url-reference": {
          // [id]: http://example.com "Optional title"
          // [id]: http://example.com 'Optional title'
          // [id]: http://example.com (Optional title)
          // [id]: <http://example.com> "Optional title"
          pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
          inside: {
            variable: {
              pattern: /^(!?\[)[^\]]+/,
              lookbehind: !0
            },
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
          },
          alias: "url"
        },
        bold: {
          // **strong**
          // __strong__
          // allow one nested instance of italic text using the same delimiter
          pattern: n(
            /\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^..)[\s\S]+(?=..$)/,
              lookbehind: !0,
              inside: {}
              // see below
            },
            punctuation: /\*\*|__/
          }
        },
        italic: {
          // *em*
          // _em_
          // allow one nested instance of bold text using the same delimiter
          pattern: n(
            /\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^.)[\s\S]+(?=.$)/,
              lookbehind: !0,
              inside: {}
              // see below
            },
            punctuation: /[*_]/
          }
        },
        strike: {
          // ~~strike through~~
          // ~strike~
          // eslint-disable-next-line regexp/strict
          pattern: n(/(~~?)(?:(?!~)<inner>)+\2/.source),
          lookbehind: !0,
          greedy: !0,
          inside: {
            content: {
              pattern: /(^~~?)[\s\S]+(?=\1$)/,
              lookbehind: !0,
              inside: {}
              // see below
            },
            punctuation: /~~?/
          }
        },
        "code-snippet": {
          // `code`
          // ``code``
          pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
          lookbehind: !0,
          greedy: !0,
          alias: ["code", "keyword"]
        },
        url: {
          // [example](http://example.com "Optional title")
          // [example][id]
          // [example] [id]
          pattern: n(
            /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source
          ),
          lookbehind: !0,
          greedy: !0,
          inside: {
            operator: /^!/,
            content: {
              pattern: /(^\[)[^\]]+(?=\])/,
              lookbehind: !0,
              inside: {}
              // see below
            },
            variable: {
              pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
              lookbehind: !0
            },
            url: {
              pattern: /(^\]\()[^\s)]+/,
              lookbehind: !0
            },
            string: {
              pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
              lookbehind: !0
            }
          }
        }
      }), ["url", "bold", "italic", "strike"].forEach(function(d) {
        ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(m) {
          d !== m && (t.languages.markdown[d].inside.content.inside[m] = t.languages.markdown[m]);
        });
      }), t.hooks.add("after-tokenize", function(d) {
        if (d.language !== "markdown" && d.language !== "md")
          return;
        function m(v) {
          if (!(!v || typeof v == "string"))
            for (var y = 0, p = v.length; y < p; y++) {
              var h = v[y];
              if (h.type !== "code") {
                m(h.content);
                continue;
              }
              var g = h.content[1], w = h.content[3];
              if (g && w && g.type === "code-language" && w.type === "code-block" && typeof g.content == "string") {
                var b = g.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
                b = (/[a-z][\w-]*/i.exec(b) || [""])[0].toLowerCase();
                var x = "language-" + b;
                w.alias ? typeof w.alias == "string" ? w.alias = [w.alias, x] : w.alias.push(x) : w.alias = [x];
              }
            }
        }
        o(m, "walkTokens"), m(d.tokens);
      }), t.hooks.add("wrap", function(d) {
        if (d.type === "code-block") {
          for (var m = "", v = 0, y = d.classes.length; v < y; v++) {
            var p = d.classes[v], h = /language-(.+)/.exec(p);
            if (h) {
              m = h[1];
              break;
            }
          }
          var g = t.languages[m];
          if (g)
            d.content = t.highlight(
              f(d.content.value),
              g,
              m
            );
          else if (m && m !== "none" && t.plugins.autoloader) {
            var w = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
            d.attributes.id = w, t.plugins.autoloader.loadLanguages(m, function() {
              var b = document.getElementById(w);
              b && (b.innerHTML = t.highlight(
                b.textContent,
                t.languages[m],
                m
              ));
            });
          }
        }
      });
      var l = RegExp(t.languages.markup.tag.pattern.source, "gi"), s = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"'
      }, u = String.fromCodePoint || String.fromCharCode;
      function f(d) {
        var m = d.replace(l, "");
        return m = m.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(v, y) {
          if (y = y.toLowerCase(), y[0] === "#") {
            var p;
            return y[1] === "x" ? p = parseInt(y.slice(2), 16) : p = Number(y.slice(1)), u(p);
          } else {
            var h = s[y];
            return h || v;
          }
        }), m;
      }
      o(f, "textContent"), t.languages.md = t.languages.markdown;
    })(e);
  }
  o(Ua, "markdown");
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/markdown.js
var H1, P1, k1 = C(() => {
  H1 = ge(T1()), P1 = H1.default;
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/markup.js
var O1, B1, N1 = C(() => {
  O1 = ge(Ha()), B1 = O1.default;
});

// ../node_modules/refractor/lang/typescript.js
var Ga = H((Py, F1) => {
  "use strict";
  F1.exports = qa;
  qa.displayName = "typescript";
  qa.aliases = ["ts"];
  function qa(e) {
    (function(t) {
      t.languages.typescript = t.languages.extend("javascript", {
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
          lookbehind: !0,
          greedy: !0,
          inside: null
          // see below
        },
        builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
      }), t.languages.typescript.keyword.push(
        /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
        // keywords that have to be followed by an identifier
        /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
        // This is for `import type *, {}`
        /\btype\b(?=\s*(?:[\{*]|$))/
      ), delete t.languages.typescript.parameter, delete t.languages.typescript["literal-property"];
      var r = t.languages.extend("typescript", {});
      delete r["class-name"], t.languages.typescript["class-name"].inside = r, t.languages.insertBefore("typescript", "function", {
        decorator: {
          pattern: /@[$\w\xA0-\uFFFF]+/,
          inside: {
            at: {
              pattern: /^@/,
              alias: "operator"
            },
            function: /^[\s\S]+/
          }
        },
        "generic-function": {
          // e.g. foo<T extends "bar" | "baz">( ...
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: !0,
          inside: {
            function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
            generic: {
              pattern: /<[\s\S]+/,
              // everything after the first <
              alias: "class-name",
              inside: r
            }
          }
        }
      }), t.languages.ts = t.languages.typescript;
    })(e);
  }
  o(qa, "typescript");
});

// ../node_modules/refractor/lang/tsx.js
var _1 = H((Oy, D1) => {
  "use strict";
  var Lm = Wa(), Im = Ga();
  D1.exports = Ya;
  Ya.displayName = "tsx";
  Ya.aliases = [];
  function Ya(e) {
    e.register(Lm), e.register(Im), function(t) {
      var r = t.util.clone(t.languages.typescript);
      t.languages.tsx = t.languages.extend("jsx", r), delete t.languages.tsx.parameter, delete t.languages.tsx["literal-property"];
      var n = t.languages.tsx.tag;
      n.pattern = RegExp(
        /(^|[^\w$]|(?=<\/))/.source + "(?:" + n.pattern.source + ")",
        n.pattern.flags
      ), n.lookbehind = !0;
    }(e);
  }
  o(Ya, "tsx");
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/tsx.js
var V1, $1, j1 = C(() => {
  V1 = ge(_1()), $1 = V1.default;
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/typescript.js
var W1, U1, q1 = C(() => {
  W1 = ge(Ga()), U1 = W1.default;
});

// ../node_modules/refractor/lang/yaml.js
var Y1 = H((Dy, G1) => {
  "use strict";
  G1.exports = Xa;
  Xa.displayName = "yaml";
  Xa.aliases = ["yml"];
  function Xa(e) {
    (function(t) {
      var r = /[*&][^\s[\]{},]+/, n = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/, a = "(?:" + n.source +
      "(?:[ 	]+" + r.source + ")?|" + r.source + "(?:[ 	]+" + n.source + ")?)", i = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.
      source.replace(
        /<PLAIN>/g,
        function() {
          return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
        }
      ), c = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
      function l(s, u) {
        u = (u || "").replace(/m/g, "") + "m";
        var f = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
          return a;
        }).replace(/<<value>>/g, function() {
          return s;
        });
        return RegExp(f, u);
      }
      o(l, "createValuePattern"), t.languages.yaml = {
        scalar: {
          pattern: RegExp(
            /([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(
              /<<prop>>/g,
              function() {
                return a;
              }
            )
          ),
          lookbehind: !0,
          alias: "string"
        },
        comment: /#.*/,
        key: {
          pattern: RegExp(
            /((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
              return a;
            }).replace(/<<key>>/g, function() {
              return "(?:" + i + "|" + c + ")";
            })
          ),
          lookbehind: !0,
          greedy: !0,
          alias: "atrule"
        },
        directive: {
          pattern: /(^[ \t]*)%.+/m,
          lookbehind: !0,
          alias: "important"
        },
        datetime: {
          pattern: l(
            /\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.
            source
          ),
          lookbehind: !0,
          alias: "number"
        },
        boolean: {
          pattern: l(/false|true/.source, "i"),
          lookbehind: !0,
          alias: "important"
        },
        null: {
          pattern: l(/null|~/.source, "i"),
          lookbehind: !0,
          alias: "important"
        },
        string: {
          pattern: l(c),
          lookbehind: !0,
          greedy: !0
        },
        number: {
          pattern: l(
            /[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,
            "i"
          ),
          lookbehind: !0
        },
        tag: n,
        important: r,
        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
      }, t.languages.yml = t.languages.yaml;
    })(e);
  }
  o(Xa, "yaml");
});

// ../node_modules/react-syntax-highlighter/dist/esm/languages/prism/yaml.js
var X1, Z1, K1 = C(() => {
  X1 = ge(Y1()), Z1 = X1.default;
});

// src/components/components/ActionBar/ActionBar.tsx
import J1 from "react";
import { styled as Q1 } from "storybook/theming";
var zm, e5, Za, Ka = C(() => {
  "use strict";
  zm = Q1.div(({ theme: e }) => ({
    position: "absolute",
    bottom: 0,
    right: 0,
    maxWidth: "100%",
    display: "flex",
    background: e.background.content,
    zIndex: 1
  })), e5 = Q1.button(
    ({ theme: e }) => ({
      margin: 0,
      border: "0 none",
      padding: "4px 10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: e.color.defaultText,
      background: e.background.content,
      fontSize: 12,
      lineHeight: "16px",
      fontFamily: e.typography.fonts.base,
      fontWeight: e.typography.weight.bold,
      borderTop: `1px solid ${e.appBorderColor}`,
      borderLeft: `1px solid ${e.appBorderColor}`,
      marginLeft: -1,
      borderRadius: "4px 0 0 0",
      "&:not(:last-child)": { borderRight: `1px solid ${e.appBorderColor}` },
      "& + *": {
        borderLeft: `1px solid ${e.appBorderColor}`,
        borderRadius: 0
      },
      "&:focus": {
        boxShadow: `${e.color.secondary} 0 -3px 0 0 inset`,
        outline: "0 none",
        "@media (forced-colors: active)": {
          outline: "1px solid highlight"
        }
      }
    }),
    ({ disabled: e }) => e && {
      cursor: "not-allowed",
      opacity: 0.5
    }
  );
  e5.displayName = "ActionButton";
  Za = /* @__PURE__ */ o(({ actionItems: e, ...t }) => /* @__PURE__ */ J1.createElement(zm, { ...t }, e.map(({ title: r, className: n, onClick: a,
  disabled: i }, c) => /* @__PURE__ */ J1.createElement(e5, { key: c, className: n, onClick: a, disabled: !!i }, r))), "ActionBar");
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as t5 from "react";
function Tm(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function Ja(...e) {
  return (t) => e.forEach((r) => Tm(r, t));
}
function ct(...e) {
  return t5.useCallback(Ja(...e), e);
}
var Zn = C(() => {
  o(Tm, "setRef");
  o(Ja, "composeRefs");
  o(ct, "useComposedRefs");
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-slot/dist/index.mjs
import * as ve from "react";
import { Fragment as Hm, jsx as Qa } from "react/jsx-runtime";
function km(e) {
  return ve.isValidElement(e) && e.type === Pm;
}
function Om(e, t) {
  let r = { ...t };
  for (let n in t) {
    let a = e[n], i = t[n];
    /^on[A-Z]/.test(n) ? a && i ? r[n] = (...l) => {
      i(...l), a(...l);
    } : a && (r[n] = a) : n === "style" ? r[n] = { ...a, ...i } : n === "className" && (r[n] = [a, i].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function Bm(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref :
  e.props.ref || e.ref);
}
var ti, ei, Pm, r5 = C(() => {
  Zn();
  ti = ve.forwardRef((e, t) => {
    let { children: r, ...n } = e, a = ve.Children.toArray(r), i = a.find(km);
    if (i) {
      let c = i.props.children, l = a.map((s) => s === i ? ve.Children.count(c) > 1 ? ve.Children.only(null) : ve.isValidElement(c) ? c.props.
      children : null : s);
      return /* @__PURE__ */ Qa(ei, { ...n, ref: t, children: ve.isValidElement(c) ? ve.cloneElement(c, void 0, l) : null });
    }
    return /* @__PURE__ */ Qa(ei, { ...n, ref: t, children: r });
  });
  ti.displayName = "Slot";
  ei = ve.forwardRef((e, t) => {
    let { children: r, ...n } = e;
    if (ve.isValidElement(r)) {
      let a = Bm(r);
      return ve.cloneElement(r, {
        ...Om(n, r.props),
        // @ts-ignore
        ref: t ? Ja(t, a) : a
      });
    }
    return ve.Children.count(r) > 1 ? ve.Children.only(null) : null;
  });
  ei.displayName = "SlotClone";
  Pm = /* @__PURE__ */ o(({ children: e }) => /* @__PURE__ */ Qa(Hm, { children: e }), "Slottable");
  o(km, "isSlottable");
  o(Om, "mergeProps");
  o(Bm, "getElementRef");
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-primitive/dist/index.mjs
import * as n5 from "react";
import * as Nm from "react-dom";
import { jsx as Fm } from "react/jsx-runtime";
var Dm, br, o5 = C(() => {
  r5();
  Dm = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "span",
    "svg",
    "ul"
  ], br = Dm.reduce((e, t) => {
    let r = n5.forwardRef((n, a) => {
      let { asChild: i, ...c } = n, l = i ? ti : t;
      return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ Fm(l, { ...c, ref: a });
    });
    return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
  }, {});
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
import * as a5 from "react";
var sn, ri = C(() => {
  sn = globalThis?.document ? a5.useLayoutEffect : () => {
  };
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-presence/dist/index.mjs
import * as ze from "react";
import * as i5 from "react-dom";
import * as l5 from "react";
function _m(e, t) {
  return l5.useReducer((r, n) => t[r][n] ?? r, e);
}
function Vm(e) {
  let [t, r] = ze.useState(), n = ze.useRef({}), a = ze.useRef(e), i = ze.useRef("none"), c = e ? "mounted" : "unmounted", [l, s] = _m(c, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return ze.useEffect(() => {
    let u = Kn(n.current);
    i.current = l === "mounted" ? u : "none";
  }, [l]), sn(() => {
    let u = n.current, f = a.current;
    if (f !== e) {
      let m = i.current, v = Kn(u);
      e ? s("MOUNT") : v === "none" || u?.display === "none" ? s("UNMOUNT") : s(f && m !== v ? "ANIMATION_OUT" : "UNMOUNT"), a.current = e;
    }
  }, [e, s]), sn(() => {
    if (t) {
      let u = /* @__PURE__ */ o((d) => {
        let v = Kn(n.current).includes(d.animationName);
        d.target === t && v && i5.flushSync(() => s("ANIMATION_END"));
      }, "handleAnimationEnd"), f = /* @__PURE__ */ o((d) => {
        d.target === t && (i.current = Kn(n.current));
      }, "handleAnimationStart");
      return t.addEventListener("animationstart", f), t.addEventListener("animationcancel", u), t.addEventListener("animationend", u), () => {
        t.removeEventListener("animationstart", f), t.removeEventListener("animationcancel", u), t.removeEventListener("animationend", u);
      };
    } else
      s("ANIMATION_END");
  }, [t, s]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: ze.useCallback((u) => {
      u && (n.current = getComputedStyle(u)), r(u);
    }, [])
  };
}
function Kn(e) {
  return e?.animationName || "none";
}
function $m(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref :
  e.props.ref || e.ref);
}
var yr, c5 = C(() => {
  "use client";
  Zn();
  ri();
  o(_m, "useStateMachine");
  yr = /* @__PURE__ */ o((e) => {
    let { present: t, children: r } = e, n = Vm(t), a = typeof r == "function" ? r({ present: n.isPresent }) : ze.Children.only(r), i = ct(n.
    ref, $m(a));
    return typeof r == "function" || n.isPresent ? ze.cloneElement(a, { ref: i }) : null;
  }, "Presence");
  yr.displayName = "Presence";
  o(Vm, "usePresence");
  o(Kn, "getAnimationName");
  o($m, "getElementRef");
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-context/dist/index.mjs
import * as st from "react";
import { jsx as jm } from "react/jsx-runtime";
function s5(e, t = []) {
  let r = [];
  function n(i, c) {
    let l = st.createContext(c), s = r.length;
    r = [...r, c];
    function u(d) {
      let { scope: m, children: v, ...y } = d, p = m?.[e][s] || l, h = st.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ jm(p.Provider, { value: h, children: v });
    }
    o(u, "Provider");
    function f(d, m) {
      let v = m?.[e][s] || l, y = st.useContext(v);
      if (y) return y;
      if (c !== void 0) return c;
      throw new Error(`\`${d}\` must be used within \`${i}\``);
    }
    return o(f, "useContext2"), u.displayName = i + "Provider", [u, f];
  }
  o(n, "createContext3");
  let a = /* @__PURE__ */ o(() => {
    let i = r.map((c) => st.createContext(c));
    return /* @__PURE__ */ o(function(l) {
      let s = l?.[e] || i;
      return st.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: s } }),
        [l, s]
      );
    }, "useScope");
  }, "createScope");
  return a.scopeName = e, [n, Wm(a, ...t)];
}
function Wm(...e) {
  let t = e[0];
  if (e.length === 1) return t;
  let r = /* @__PURE__ */ o(() => {
    let n = e.map((a) => ({
      useScope: a(),
      scopeName: a.scopeName
    }));
    return /* @__PURE__ */ o(function(i) {
      let c = n.reduce((l, { useScope: s, scopeName: u }) => {
        let d = s(i)[`__scope${u}`];
        return { ...l, ...d };
      }, {});
      return st.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = t.scopeName, r;
}
var u5 = C(() => {
  o(s5, "createContextScope");
  o(Wm, "composeContextScopes");
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
import * as Rr from "react";
function St(e) {
  let t = Rr.useRef(e);
  return Rr.useEffect(() => {
    t.current = e;
  }), Rr.useMemo(() => (...r) => t.current?.(...r), []);
}
var f5 = C(() => {
  o(St, "useCallbackRef");
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-direction/dist/index.mjs
import * as Jn from "react";
import { jsx as pR } from "react/jsx-runtime";
function d5(e) {
  let t = Jn.useContext(Um);
  return e || t || "ltr";
}
var Um, p5 = C(() => {
  Um = Jn.createContext(void 0);
  o(d5, "useDirection");
});

// ../node_modules/@radix-ui/number/dist/index.mjs
function m5(e, [t, r]) {
  return Math.min(r, Math.max(t, e));
}
var h5 = C(() => {
  o(m5, "clamp");
});

// ../node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/primitive/dist/index.mjs
function Ct(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ o(function(a) {
    if (e?.(a), r === !1 || !a.defaultPrevented)
      return t?.(a);
  }, "handleEvent");
}
var g5 = C(() => {
  o(Ct, "composeEventHandlers");
});

// ../node_modules/@radix-ui/react-scroll-area/dist/index.mjs
import * as I from "react";
import * as w5 from "react";
import { Fragment as Gm, jsx as U, jsxs as Ym } from "react/jsx-runtime";
function qm(e, t) {
  return w5.useReducer((r, n) => t[r][n] ?? r, e);
}
function eo(e) {
  return e ? parseInt(e, 10) : 0;
}
function I5(e, t) {
  let r = e / t;
  return isNaN(r) ? 0 : r;
}
function to(e) {
  let t = I5(e.viewport, e.content), r = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, n = (e.scrollbar.size - r) * t;
  return Math.max(n, 18);
}
function nh(e, t, r, n = "ltr") {
  let a = to(r), i = a / 2, c = t || i, l = a - c, s = r.scrollbar.paddingStart + c, u = r.scrollbar.size - r.scrollbar.paddingEnd - l, f = r.
  content - r.viewport, d = n === "ltr" ? [0, f] : [f * -1, 0];
  return z5([s, u], d)(e);
}
function v5(e, t, r = "ltr") {
  let n = to(t), a = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, i = t.scrollbar.size - a, c = t.content - t.viewport, l = i - n, s = r ===
  "ltr" ? [0, c] : [c * -1, 0], u = m5(e, s);
  return z5([0, c], [0, l])(u);
}
function z5(e, t) {
  return (r) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    let n = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + n * (r - e[0]);
  };
}
function T5(e, t) {
  return e > 0 && e < t;
}
function ro(e, t) {
  let r = St(e), n = I.useRef(0);
  return I.useEffect(() => () => window.clearTimeout(n.current), []), I.useCallback(() => {
    window.clearTimeout(n.current), n.current = window.setTimeout(r, t);
  }, [r, t]);
}
function xr(e, t) {
  let r = St(t);
  sn(() => {
    let n = 0;
    if (e) {
      let a = new ResizeObserver(() => {
        cancelAnimationFrame(n), n = window.requestAnimationFrame(r);
      });
      return a.observe(e), () => {
        window.cancelAnimationFrame(n), a.unobserve(e);
      };
    }
  }, [e, r]);
}
function ah(e, t) {
  let { asChild: r, children: n } = e;
  if (!r) return typeof t == "function" ? t(n) : t;
  let a = I.Children.only(n);
  return I.cloneElement(a, {
    children: typeof t == "function" ? t(a.props.children) : t
  });
}
var ni, b5, zR, Xm, $e, y5, R5, x5, ot, E5, Zm, Km, S5, oi, Jm, Qm, eh, C5, M5, Qn, A5, th, ai, L5, rh, oh, H5, P5, k5, O5, B5, N5 = C(() => {
  "use client";
  o5();
  c5();
  u5();
  Zn();
  f5();
  p5();
  ri();
  h5();
  g5();
  o(qm, "useStateMachine");
  ni = "ScrollArea", [b5, zR] = s5(ni), [Xm, $e] = b5(ni), y5 = I.forwardRef(
    (e, t) => {
      let {
        __scopeScrollArea: r,
        type: n = "hover",
        dir: a,
        scrollHideDelay: i = 600,
        ...c
      } = e, [l, s] = I.useState(null), [u, f] = I.useState(null), [d, m] = I.useState(null), [v, y] = I.useState(null), [p, h] = I.useState(
      null), [g, w] = I.useState(0), [b, x] = I.useState(0), [E, R] = I.useState(!1), [S, A] = I.useState(!1), M = ct(t, (P) => s(P)), L = d5(
      a);
      return /* @__PURE__ */ U(
        Xm,
        {
          scope: r,
          type: n,
          dir: L,
          scrollHideDelay: i,
          scrollArea: l,
          viewport: u,
          onViewportChange: f,
          content: d,
          onContentChange: m,
          scrollbarX: v,
          onScrollbarXChange: y,
          scrollbarXEnabled: E,
          onScrollbarXEnabledChange: R,
          scrollbarY: p,
          onScrollbarYChange: h,
          scrollbarYEnabled: S,
          onScrollbarYEnabledChange: A,
          onCornerWidthChange: w,
          onCornerHeightChange: x,
          children: /* @__PURE__ */ U(
            br.div,
            {
              dir: L,
              ...c,
              ref: M,
              style: {
                position: "relative",
                // Pass corner sizes as CSS vars to reduce re-renders of context consumers
                "--radix-scroll-area-corner-width": g + "px",
                "--radix-scroll-area-corner-height": b + "px",
                ...e.style
              }
            }
          )
        }
      );
    }
  );
  y5.displayName = ni;
  R5 = "ScrollAreaViewport", x5 = I.forwardRef(
    (e, t) => {
      let { __scopeScrollArea: r, children: n, asChild: a, nonce: i, ...c } = e, l = $e(R5, r), s = I.useRef(null), u = ct(t, s, l.onViewportChange);
      return /* @__PURE__ */ Ym(Gm, { children: [
        /* @__PURE__ */ U(
          "style",
          {
            dangerouslySetInnerHTML: {
              __html: `
[data-radix-scroll-area-viewport] {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
[data-radix-scroll-area-viewport]::-webkit-scrollbar {
  display: none;
}
:where([data-radix-scroll-area-viewport]) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
:where([data-radix-scroll-area-content]) {
  flex-grow: 1;
}
`
            },
            nonce: i
          }
        ),
        /* @__PURE__ */ U(
          br.div,
          {
            "data-radix-scroll-area-viewport": "",
            ...c,
            asChild: a,
            ref: u,
            style: {
              /**
               * We don't support `visible` because the intention is to have at least one scrollbar
               * if this component is used and `visible` will behave like `auto` in that case
               * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
               *
               * We don't handle `auto` because the intention is for the native implementation
               * to be hidden if using this component. We just want to ensure the node is scrollable
               * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
               * the browser from having to work out whether to render native scrollbars or not,
               * we tell it to with the intention of hiding them in CSS.
               */
              overflowX: l.scrollbarXEnabled ? "scroll" : "hidden",
              overflowY: l.scrollbarYEnabled ? "scroll" : "hidden",
              ...e.style
            },
            children: ah({ asChild: a, children: n }, (f) => /* @__PURE__ */ U(
              "div",
              {
                "data-radix-scroll-area-content": "",
                ref: l.onContentChange,
                style: { minWidth: l.scrollbarXEnabled ? "fit-content" : void 0 },
                children: f
              }
            ))
          }
        )
      ] });
    }
  );
  x5.displayName = R5;
  ot = "ScrollAreaScrollbar", E5 = I.forwardRef(
    (e, t) => {
      let { forceMount: r, ...n } = e, a = $e(ot, e.__scopeScrollArea), { onScrollbarXEnabledChange: i, onScrollbarYEnabledChange: c } = a, l = e.
      orientation === "horizontal";
      return I.useEffect(() => (l ? i(!0) : c(!0), () => {
        l ? i(!1) : c(!1);
      }), [l, i, c]), a.type === "hover" ? /* @__PURE__ */ U(Zm, { ...n, ref: t, forceMount: r }) : a.type === "scroll" ? /* @__PURE__ */ U(
      Km, { ...n, ref: t, forceMount: r }) : a.type === "auto" ? /* @__PURE__ */ U(S5, { ...n, ref: t, forceMount: r }) : a.type === "always" ?
      /* @__PURE__ */ U(oi, { ...n, ref: t }) : null;
    }
  );
  E5.displayName = ot;
  Zm = I.forwardRef((e, t) => {
    let { forceMount: r, ...n } = e, a = $e(ot, e.__scopeScrollArea), [i, c] = I.useState(!1);
    return I.useEffect(() => {
      let l = a.scrollArea, s = 0;
      if (l) {
        let u = /* @__PURE__ */ o(() => {
          window.clearTimeout(s), c(!0);
        }, "handlePointerEnter"), f = /* @__PURE__ */ o(() => {
          s = window.setTimeout(() => c(!1), a.scrollHideDelay);
        }, "handlePointerLeave");
        return l.addEventListener("pointerenter", u), l.addEventListener("pointerleave", f), () => {
          window.clearTimeout(s), l.removeEventListener("pointerenter", u), l.removeEventListener("pointerleave", f);
        };
      }
    }, [a.scrollArea, a.scrollHideDelay]), /* @__PURE__ */ U(yr, { present: r || i, children: /* @__PURE__ */ U(
      S5,
      {
        "data-state": i ? "visible" : "hidden",
        ...n,
        ref: t
      }
    ) });
  }), Km = I.forwardRef((e, t) => {
    let { forceMount: r, ...n } = e, a = $e(ot, e.__scopeScrollArea), i = e.orientation === "horizontal", c = ro(() => s("SCROLL_END"), 100),
    [l, s] = qm("hidden", {
      hidden: {
        SCROLL: "scrolling"
      },
      scrolling: {
        SCROLL_END: "idle",
        POINTER_ENTER: "interacting"
      },
      interacting: {
        SCROLL: "interacting",
        POINTER_LEAVE: "idle"
      },
      idle: {
        HIDE: "hidden",
        SCROLL: "scrolling",
        POINTER_ENTER: "interacting"
      }
    });
    return I.useEffect(() => {
      if (l === "idle") {
        let u = window.setTimeout(() => s("HIDE"), a.scrollHideDelay);
        return () => window.clearTimeout(u);
      }
    }, [l, a.scrollHideDelay, s]), I.useEffect(() => {
      let u = a.viewport, f = i ? "scrollLeft" : "scrollTop";
      if (u) {
        let d = u[f], m = /* @__PURE__ */ o(() => {
          let v = u[f];
          d !== v && (s("SCROLL"), c()), d = v;
        }, "handleScroll");
        return u.addEventListener("scroll", m), () => u.removeEventListener("scroll", m);
      }
    }, [a.viewport, i, s, c]), /* @__PURE__ */ U(yr, { present: r || l !== "hidden", children: /* @__PURE__ */ U(
      oi,
      {
        "data-state": l === "hidden" ? "hidden" : "visible",
        ...n,
        ref: t,
        onPointerEnter: Ct(e.onPointerEnter, () => s("POINTER_ENTER")),
        onPointerLeave: Ct(e.onPointerLeave, () => s("POINTER_LEAVE"))
      }
    ) });
  }), S5 = I.forwardRef((e, t) => {
    let r = $e(ot, e.__scopeScrollArea), { forceMount: n, ...a } = e, [i, c] = I.useState(!1), l = e.orientation === "horizontal", s = ro(() => {
      if (r.viewport) {
        let u = r.viewport.offsetWidth < r.viewport.scrollWidth, f = r.viewport.offsetHeight < r.viewport.scrollHeight;
        c(l ? u : f);
      }
    }, 10);
    return xr(r.viewport, s), xr(r.content, s), /* @__PURE__ */ U(yr, { present: n || i, children: /* @__PURE__ */ U(
      oi,
      {
        "data-state": i ? "visible" : "hidden",
        ...a,
        ref: t
      }
    ) });
  }), oi = I.forwardRef((e, t) => {
    let { orientation: r = "vertical", ...n } = e, a = $e(ot, e.__scopeScrollArea), i = I.useRef(null), c = I.useRef(0), [l, s] = I.useState(
    {
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
    }), u = I5(l.viewport, l.content), f = {
      ...n,
      sizes: l,
      onSizesChange: s,
      hasThumb: u > 0 && u < 1,
      onThumbChange: /* @__PURE__ */ o((m) => i.current = m, "onThumbChange"),
      onThumbPointerUp: /* @__PURE__ */ o(() => c.current = 0, "onThumbPointerUp"),
      onThumbPointerDown: /* @__PURE__ */ o((m) => c.current = m, "onThumbPointerDown")
    };
    function d(m, v) {
      return nh(m, c.current, l, v);
    }
    return o(d, "getScrollPosition"), r === "horizontal" ? /* @__PURE__ */ U(
      Jm,
      {
        ...f,
        ref: t,
        onThumbPositionChange: /* @__PURE__ */ o(() => {
          if (a.viewport && i.current) {
            let m = a.viewport.scrollLeft, v = v5(m, l, a.dir);
            i.current.style.transform = `translate3d(${v}px, 0, 0)`;
          }
        }, "onThumbPositionChange"),
        onWheelScroll: /* @__PURE__ */ o((m) => {
          a.viewport && (a.viewport.scrollLeft = m);
        }, "onWheelScroll"),
        onDragScroll: /* @__PURE__ */ o((m) => {
          a.viewport && (a.viewport.scrollLeft = d(m, a.dir));
        }, "onDragScroll")
      }
    ) : r === "vertical" ? /* @__PURE__ */ U(
      Qm,
      {
        ...f,
        ref: t,
        onThumbPositionChange: /* @__PURE__ */ o(() => {
          if (a.viewport && i.current) {
            let m = a.viewport.scrollTop, v = v5(m, l);
            i.current.style.transform = `translate3d(0, ${v}px, 0)`;
          }
        }, "onThumbPositionChange"),
        onWheelScroll: /* @__PURE__ */ o((m) => {
          a.viewport && (a.viewport.scrollTop = m);
        }, "onWheelScroll"),
        onDragScroll: /* @__PURE__ */ o((m) => {
          a.viewport && (a.viewport.scrollTop = d(m));
        }, "onDragScroll")
      }
    ) : null;
  }), Jm = I.forwardRef((e, t) => {
    let { sizes: r, onSizesChange: n, ...a } = e, i = $e(ot, e.__scopeScrollArea), [c, l] = I.useState(), s = I.useRef(null), u = ct(t, s, i.
    onScrollbarXChange);
    return I.useEffect(() => {
      s.current && l(getComputedStyle(s.current));
    }, [s]), /* @__PURE__ */ U(
      M5,
      {
        "data-orientation": "horizontal",
        ...a,
        ref: u,
        sizes: r,
        style: {
          bottom: 0,
          left: i.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
          right: i.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
          "--radix-scroll-area-thumb-width": to(r) + "px",
          ...e.style
        },
        onThumbPointerDown: /* @__PURE__ */ o((f) => e.onThumbPointerDown(f.x), "onThumbPointerDown"),
        onDragScroll: /* @__PURE__ */ o((f) => e.onDragScroll(f.x), "onDragScroll"),
        onWheelScroll: /* @__PURE__ */ o((f, d) => {
          if (i.viewport) {
            let m = i.viewport.scrollLeft + f.deltaX;
            e.onWheelScroll(m), T5(m, d) && f.preventDefault();
          }
        }, "onWheelScroll"),
        onResize: /* @__PURE__ */ o(() => {
          s.current && i.viewport && c && n({
            content: i.viewport.scrollWidth,
            viewport: i.viewport.offsetWidth,
            scrollbar: {
              size: s.current.clientWidth,
              paddingStart: eo(c.paddingLeft),
              paddingEnd: eo(c.paddingRight)
            }
          });
        }, "onResize")
      }
    );
  }), Qm = I.forwardRef((e, t) => {
    let { sizes: r, onSizesChange: n, ...a } = e, i = $e(ot, e.__scopeScrollArea), [c, l] = I.useState(), s = I.useRef(null), u = ct(t, s, i.
    onScrollbarYChange);
    return I.useEffect(() => {
      s.current && l(getComputedStyle(s.current));
    }, [s]), /* @__PURE__ */ U(
      M5,
      {
        "data-orientation": "vertical",
        ...a,
        ref: u,
        sizes: r,
        style: {
          top: 0,
          right: i.dir === "ltr" ? 0 : void 0,
          left: i.dir === "rtl" ? 0 : void 0,
          bottom: "var(--radix-scroll-area-corner-height)",
          "--radix-scroll-area-thumb-height": to(r) + "px",
          ...e.style
        },
        onThumbPointerDown: /* @__PURE__ */ o((f) => e.onThumbPointerDown(f.y), "onThumbPointerDown"),
        onDragScroll: /* @__PURE__ */ o((f) => e.onDragScroll(f.y), "onDragScroll"),
        onWheelScroll: /* @__PURE__ */ o((f, d) => {
          if (i.viewport) {
            let m = i.viewport.scrollTop + f.deltaY;
            e.onWheelScroll(m), T5(m, d) && f.preventDefault();
          }
        }, "onWheelScroll"),
        onResize: /* @__PURE__ */ o(() => {
          s.current && i.viewport && c && n({
            content: i.viewport.scrollHeight,
            viewport: i.viewport.offsetHeight,
            scrollbar: {
              size: s.current.clientHeight,
              paddingStart: eo(c.paddingTop),
              paddingEnd: eo(c.paddingBottom)
            }
          });
        }, "onResize")
      }
    );
  }), [eh, C5] = b5(ot), M5 = I.forwardRef((e, t) => {
    let {
      __scopeScrollArea: r,
      sizes: n,
      hasThumb: a,
      onThumbChange: i,
      onThumbPointerUp: c,
      onThumbPointerDown: l,
      onThumbPositionChange: s,
      onDragScroll: u,
      onWheelScroll: f,
      onResize: d,
      ...m
    } = e, v = $e(ot, r), [y, p] = I.useState(null), h = ct(t, (M) => p(M)), g = I.useRef(null), w = I.useRef(""), b = v.viewport, x = n.content -
    n.viewport, E = St(f), R = St(s), S = ro(d, 10);
    function A(M) {
      if (g.current) {
        let L = M.clientX - g.current.left, P = M.clientY - g.current.top;
        u({ x: L, y: P });
      }
    }
    return o(A, "handleDragScroll"), I.useEffect(() => {
      let M = /* @__PURE__ */ o((L) => {
        let P = L.target;
        y?.contains(P) && E(L, x);
      }, "handleWheel");
      return document.addEventListener("wheel", M, { passive: !1 }), () => document.removeEventListener("wheel", M, { passive: !1 });
    }, [b, y, x, E]), I.useEffect(R, [n, R]), xr(y, S), xr(v.content, S), /* @__PURE__ */ U(
      eh,
      {
        scope: r,
        scrollbar: y,
        hasThumb: a,
        onThumbChange: St(i),
        onThumbPointerUp: St(c),
        onThumbPositionChange: R,
        onThumbPointerDown: St(l),
        children: /* @__PURE__ */ U(
          br.div,
          {
            ...m,
            ref: h,
            style: { position: "absolute", ...m.style },
            onPointerDown: Ct(e.onPointerDown, (M) => {
              M.button === 0 && (M.target.setPointerCapture(M.pointerId), g.current = y.getBoundingClientRect(), w.current = document.body.style.
              webkitUserSelect, document.body.style.webkitUserSelect = "none", v.viewport && (v.viewport.style.scrollBehavior = "auto"), A(M));
            }),
            onPointerMove: Ct(e.onPointerMove, A),
            onPointerUp: Ct(e.onPointerUp, (M) => {
              let L = M.target;
              L.hasPointerCapture(M.pointerId) && L.releasePointerCapture(M.pointerId), document.body.style.webkitUserSelect = w.current, v.
              viewport && (v.viewport.style.scrollBehavior = ""), g.current = null;
            })
          }
        )
      }
    );
  }), Qn = "ScrollAreaThumb", A5 = I.forwardRef(
    (e, t) => {
      let { forceMount: r, ...n } = e, a = C5(Qn, e.__scopeScrollArea);
      return /* @__PURE__ */ U(yr, { present: r || a.hasThumb, children: /* @__PURE__ */ U(th, { ref: t, ...n }) });
    }
  ), th = I.forwardRef(
    (e, t) => {
      let { __scopeScrollArea: r, style: n, ...a } = e, i = $e(Qn, r), c = C5(Qn, r), { onThumbPositionChange: l } = c, s = ct(
        t,
        (d) => c.onThumbChange(d)
      ), u = I.useRef(), f = ro(() => {
        u.current && (u.current(), u.current = void 0);
      }, 100);
      return I.useEffect(() => {
        let d = i.viewport;
        if (d) {
          let m = /* @__PURE__ */ o(() => {
            if (f(), !u.current) {
              let v = oh(d, l);
              u.current = v, l();
            }
          }, "handleScroll");
          return l(), d.addEventListener("scroll", m), () => d.removeEventListener("scroll", m);
        }
      }, [i.viewport, f, l]), /* @__PURE__ */ U(
        br.div,
        {
          "data-state": c.hasThumb ? "visible" : "hidden",
          ...a,
          ref: s,
          style: {
            width: "var(--radix-scroll-area-thumb-width)",
            height: "var(--radix-scroll-area-thumb-height)",
            ...n
          },
          onPointerDownCapture: Ct(e.onPointerDownCapture, (d) => {
            let v = d.target.getBoundingClientRect(), y = d.clientX - v.left, p = d.clientY - v.top;
            c.onThumbPointerDown({ x: y, y: p });
          }),
          onPointerUp: Ct(e.onPointerUp, c.onThumbPointerUp)
        }
      );
    }
  );
  A5.displayName = Qn;
  ai = "ScrollAreaCorner", L5 = I.forwardRef(
    (e, t) => {
      let r = $e(ai, e.__scopeScrollArea), n = !!(r.scrollbarX && r.scrollbarY);
      return r.type !== "scroll" && n ? /* @__PURE__ */ U(rh, { ...e, ref: t }) : null;
    }
  );
  L5.displayName = ai;
  rh = I.forwardRef((e, t) => {
    let { __scopeScrollArea: r, ...n } = e, a = $e(ai, r), [i, c] = I.useState(0), [l, s] = I.useState(0), u = !!(i && l);
    return xr(a.scrollbarX, () => {
      let f = a.scrollbarX?.offsetHeight || 0;
      a.onCornerHeightChange(f), s(f);
    }), xr(a.scrollbarY, () => {
      let f = a.scrollbarY?.offsetWidth || 0;
      a.onCornerWidthChange(f), c(f);
    }), u ? /* @__PURE__ */ U(
      br.div,
      {
        ...n,
        ref: t,
        style: {
          width: i,
          height: l,
          position: "absolute",
          right: a.dir === "ltr" ? 0 : void 0,
          left: a.dir === "rtl" ? 0 : void 0,
          bottom: 0,
          ...e.style
        }
      }
    ) : null;
  });
  o(eo, "toInt");
  o(I5, "getThumbRatio");
  o(to, "getThumbSize");
  o(nh, "getScrollPositionFromPointer");
  o(v5, "getThumbOffsetFromScroll");
  o(z5, "linearScale");
  o(T5, "isScrollingWithinScrollbarBounds");
  oh = /* @__PURE__ */ o((e, t = () => {
  }) => {
    let r = { left: e.scrollLeft, top: e.scrollTop }, n = 0;
    return (/* @__PURE__ */ o(function a() {
      let i = { left: e.scrollLeft, top: e.scrollTop }, c = r.left !== i.left, l = r.top !== i.top;
      (c || l) && t(), r = i, n = window.requestAnimationFrame(a);
    }, "loop"))(), () => window.cancelAnimationFrame(n);
  }, "addUnlinkedScrollListener");
  o(ro, "useDebounceCallback");
  o(xr, "useResizeObserver");
  o(ah, "getSubtree");
  H5 = y5, P5 = x5, k5 = E5, O5 = A5, B5 = L5;
});

// src/components/components/ScrollArea/ScrollArea.tsx
import qt, { forwardRef as lh } from "react";
import { styled as no } from "storybook/theming";
var ch, sh, F5, D5, Er, oo = C(() => {
  "use strict";
  N5();
  ch = no(H5)(
    ({ scrollbarsize: e, offset: t }) => ({
      width: "100%",
      height: "100%",
      overflow: "hidden",
      "--scrollbar-size": `${e + t}px`,
      "--radix-scroll-area-thumb-width": `${e}px`
    })
  ), sh = no(P5)({
    width: "100%",
    height: "100%"
  }), F5 = no(k5)(({ offset: e, horizontal: t, vertical: r }) => ({
    display: "flex",
    userSelect: "none",
    // ensures no selection
    touchAction: "none",
    // disable browser handling of all panning and zooming gestures on touch devices
    background: "transparent",
    transition: "all 0.2s ease-out",
    borderRadius: "var(--scrollbar-size)",
    zIndex: 1,
    '&[data-orientation="vertical"]': {
      width: "var(--scrollbar-size)",
      paddingRight: e,
      marginTop: e,
      marginBottom: t === "true" && r === "true" ? 0 : e
    },
    '&[data-orientation="horizontal"]': {
      flexDirection: "column",
      height: "var(--scrollbar-size)",
      paddingBottom: e,
      marginLeft: e,
      marginRight: t === "true" && r === "true" ? 0 : e
    }
  })), D5 = no(O5)(({ theme: e }) => ({
    flex: 1,
    background: e.textMutedColor,
    opacity: 0.5,
    borderRadius: "var(--scrollbar-size)",
    position: "relative",
    transition: "opacity 0.2s ease-out",
    "&:hover": { opacity: 0.8 },
    /* increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html */
    "::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "100%",
      height: "100%"
    }
  })), Er = lh(
    ({ children: e, horizontal: t = !1, vertical: r = !1, offset: n = 2, scrollbarSize: a = 6, className: i }, c) => /* @__PURE__ */ qt.createElement(
    ch, { scrollbarsize: a, offset: n, className: i }, /* @__PURE__ */ qt.createElement(sh, { ref: c }, e), t && /* @__PURE__ */ qt.createElement(
      F5,
      {
        orientation: "horizontal",
        offset: n,
        horizontal: t.toString(),
        vertical: r.toString()
      },
      /* @__PURE__ */ qt.createElement(D5, null)
    ), r && /* @__PURE__ */ qt.createElement(
      F5,
      {
        orientation: "vertical",
        offset: n,
        horizontal: t.toString(),
        vertical: r.toString()
      },
      /* @__PURE__ */ qt.createElement(D5, null)
    ), t && r && /* @__PURE__ */ qt.createElement(B5, null))
  );
  Er.displayName = "ScrollArea";
});

// src/components/components/syntaxhighlighter/syntaxhighlighter.tsx
var li = {};
Qr(li, {
  SyntaxHighlighter: () => dn,
  createCopyToClipboardFunction: () => ii,
  default: () => Eh,
  supportedLanguages: () => $5
});
import fn, { useCallback as uh, useEffect as fh, useState as _5 } from "react";
import { logger as dh } from "storybook/internal/client-logger";
import { global as ph } from "@storybook/global";
import { styled as io } from "storybook/theming";
function ii() {
  return ao.navigator?.clipboard ? async (e) => {
    try {
      await ao.top?.navigator.clipboard.writeText(e);
    } catch {
      await ao.navigator.clipboard.writeText(e);
    }
  } : async (e) => {
    let t = un.createElement("TEXTAREA"), r = un.activeElement;
    t.value = e, un.body.appendChild(t), t.select(), un.execCommand("copy"), un.body.removeChild(t), r.focus();
  };
}
var V5, un, ao, $5, mh, hh, gh, vh, wh, bh, yh, j5, Rh, xh, dn, Eh, pn = C(() => {
  "use strict";
  V5 = ge(rn(), 1);
  r1();
  l1();
  u1();
  h1();
  y1();
  C1();
  I1();
  k1();
  N1();
  j1();
  q1();
  K1();
  t1();
  Ka();
  oo();
  ({ document: un, window: ao } = ph), $5 = {
    jsextra: b1,
    jsx: L1,
    json: S1,
    yml: Z1,
    md: P1,
    bash: i1,
    css: s1,
    html: B1,
    tsx: $1,
    typescript: U1,
    graphql: m1
  };
  Object.entries($5).forEach(([e, t]) => {
    Xn.registerLanguage(e, t);
  });
  mh = (0, V5.default)(2)(
    (e) => Object.entries(e.code || {}).reduce((t, [r, n]) => ({ ...t, [`* .${r}`]: n }), {})
  ), hh = ii();
  o(ii, "createCopyToClipboardFunction");
  gh = io.div(
    ({ theme: e }) => ({
      position: "relative",
      overflow: "hidden",
      color: e.color.defaultText
    }),
    ({ theme: e, bordered: t }) => t ? {
      border: `1px solid ${e.appBorderColor}`,
      borderRadius: e.borderRadius,
      background: e.background.content
    } : {},
    ({ showLineNumbers: e }) => e ? {
      // use the before pseudo element to display line numbers
      ".react-syntax-highlighter-line-number::before": {
        content: "attr(data-line-number)"
      }
    } : {}
  ), vh = /* @__PURE__ */ o(({ children: e, className: t }) => /* @__PURE__ */ fn.createElement(Er, { horizontal: !0, vertical: !0, className: t },
  e), "UnstyledScroller"), wh = io(vh)(
    {
      position: "relative"
    },
    ({ theme: e }) => mh(e)
  ), bh = io.pre(({ theme: e, padded: t }) => ({
    display: "flex",
    justifyContent: "flex-start",
    margin: 0,
    padding: t ? e.layoutMargin : 0
  })), yh = io.div(({ theme: e }) => ({
    flex: 1,
    paddingLeft: 2,
    // TODO: To match theming/global.ts for now
    paddingRight: e.layoutMargin,
    opacity: 1,
    fontFamily: e.typography.fonts.mono
  })), j5 = /* @__PURE__ */ o((e) => {
    let t = [...e.children], r = t[0], n = r.children[0].value, a = {
      ...r,
      // empty the line-number element
      children: [],
      properties: {
        ...r.properties,
        // add a data-line-number attribute to line-number element, so we can access the line number with `content: attr(data-line-number)`
        "data-line-number": n,
        // remove the 'userSelect: none' style, which will produce extra empty lines when copy-pasting in firefox
        style: { ...r.properties.style, userSelect: "auto" }
      }
    };
    return t[0] = a, { ...e, children: t };
  }, "processLineNumber"), Rh = /* @__PURE__ */ o(({ rows: e, stylesheet: t, useInlineStyles: r }) => e.map((n, a) => $t({
    node: j5(n),
    stylesheet: t,
    useInlineStyles: r,
    key: `code-segement${a}`
  })), "defaultRenderer"), xh = /* @__PURE__ */ o((e, t) => t ? e ? ({ rows: r, ...n }) => e({ rows: r.map((a) => j5(a)), ...n }) : Rh : e, "\
wrapRenderer"), dn = /* @__PURE__ */ o(({
    children: e,
    language: t = "jsx",
    copyable: r = !1,
    bordered: n = !1,
    padded: a = !1,
    format: i = !0,
    formatter: c = void 0,
    className: l = void 0,
    showLineNumbers: s = !1,
    ...u
  }) => {
    if (typeof e != "string" || !e.trim())
      return null;
    let [f, d] = _5("");
    fh(() => {
      c ? c(i, e).then(d) : d(e.trim());
    }, [e, i, c]);
    let [m, v] = _5(!1), y = uh(
      (h) => {
        h.preventDefault(), hh(f).then(() => {
          v(!0), ao.setTimeout(() => v(!1), 1500);
        }).catch(dh.error);
      },
      [f]
    ), p = xh(u.renderer, s);
    return /* @__PURE__ */ fn.createElement(
      gh,
      {
        bordered: n,
        padded: a,
        showLineNumbers: s,
        className: l
      },
      /* @__PURE__ */ fn.createElement(wh, null, /* @__PURE__ */ fn.createElement(
        Xn,
        {
          padded: a || n,
          language: t,
          showLineNumbers: s,
          showInlineLineNumbers: s,
          useInlineStyles: !1,
          PreTag: bh,
          CodeTag: yh,
          lineNumberContainerStyle: {},
          ...u,
          renderer: p
        },
        f
      )),
      r ? /* @__PURE__ */ fn.createElement(Za, { actionItems: [{ title: m ? "Copied" : "Copy", onClick: y }] }) : null
    );
  }, "SyntaxHighlighter");
  dn.registerLanguage = (...e) => Xn.registerLanguage(...e);
  Eh = dn;
});

// ../node_modules/ts-dedent/esm/index.js
function K5(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  var n = Array.from(typeof e == "string" ? [e] : e);
  n[n.length - 1] = n[n.length - 1].replace(/\r?\n([\t ]*)$/, "");
  var a = n.reduce(function(l, s) {
    var u = s.match(/\n([\t ]+|(?!\s).)/g);
    return u ? l.concat(u.map(function(f) {
      var d, m;
      return (m = (d = f.match(/[\t ]/g)) === null || d === void 0 ? void 0 : d.length) !== null && m !== void 0 ? m : 0;
    })) : l;
  }, []);
  if (a.length) {
    var i = new RegExp(`
[	 ]{` + Math.min.apply(Math, a) + "}", "g");
    n = n.map(function(l) {
      return l.replace(i, `
`);
    });
  }
  n[0] = n[0].replace(/^\r?\n/, "");
  var c = n[0];
  return t.forEach(function(l, s) {
    var u = c.match(/(?:^|\n)( *)$/), f = u ? u[1] : "", d = l;
    typeof l == "string" && l.includes(`
`) && (d = String(l).split(`
`).map(function(m, v) {
      return v === 0 ? m : "" + f + m;
    }).join(`
`)), c += d + n[s + 1];
  }), c;
}
var J5 = C(() => {
  o(K5, "dedent");
});

// src/components/components/syntaxhighlighter/formatter.ts
var eu = {};
Qr(eu, {
  formatter: () => ig
});
var Q5, ig, tu = C(() => {
  "use strict";
  Q5 = ge(rn(), 1);
  J5();
  ig = (0, Q5.default)(2)(async (e, t) => e === !1 ? t : K5(t));
});

// ../node_modules/react-popper/lib/esm/utils.js
import * as zo from "react";
var Il, zl, $f = C(() => {
  Il = /* @__PURE__ */ o(function(t) {
    return t.reduce(function(r, n) {
      var a = n[0], i = n[1];
      return r[a] = i, r;
    }, {});
  }, "fromEntries"), zl = typeof window < "u" && window.document && window.document.createElement ? zo.useLayoutEffect : zo.useEffect;
});

// ../node_modules/@popperjs/core/lib/enums.js
var te, se, ae, ne, To, It, dt, er, jf, Ho, Nr, Wf, Tl, Po, p7, m7, h7, g7, v7, w7, b7, y7, R7, Uf, Be = C(() => {
  te = "top", se = "bottom", ae = "right", ne = "left", To = "auto", It = [te, se, ae, ne], dt = "start", er = "end", jf = "clippingParents",
  Ho = "viewport", Nr = "popper", Wf = "reference", Tl = /* @__PURE__ */ It.reduce(function(e, t) {
    return e.concat([t + "-" + dt, t + "-" + er]);
  }, []), Po = /* @__PURE__ */ [].concat(It, [To]).reduce(function(e, t) {
    return e.concat([t, t + "-" + dt, t + "-" + er]);
  }, []), p7 = "beforeRead", m7 = "read", h7 = "afterRead", g7 = "beforeMain", v7 = "main", w7 = "afterMain", b7 = "beforeWrite", y7 = "writ\
e", R7 = "afterWrite", Uf = [p7, m7, h7, g7, v7, w7, b7, y7, R7];
});

// ../node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function pe(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
var zt = C(() => {
  o(pe, "getNodeName");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function Z(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
var et = C(() => {
  o(Z, "getWindow");
});

// ../node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function qe(e) {
  var t = Z(e).Element;
  return e instanceof t || e instanceof Element;
}
function ue(e) {
  var t = Z(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Fr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Z(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
var Ne = C(() => {
  et();
  o(qe, "isElement");
  o(ue, "isHTMLElement");
  o(Fr, "isShadowRoot");
});

// ../node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function x7(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, a = t.attributes[r] || {}, i = t.elements[r];
    !ue(i) || !pe(i) || (Object.assign(i.style, n), Object.keys(a).forEach(function(c) {
      var l = a[c];
      l === !1 ? i.removeAttribute(c) : i.setAttribute(c, l === !0 ? "" : l);
    }));
  });
}
function E7(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow),
  function() {
    Object.keys(t.elements).forEach(function(n) {
      var a = t.elements[n], i = t.attributes[n] || {}, c = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]), l = c.reduce(function(s, u) {
        return s[u] = "", s;
      }, {});
      !ue(a) || !pe(a) || (Object.assign(a.style, l), Object.keys(i).forEach(function(s) {
        a.removeAttribute(s);
      }));
    });
  };
}
var qf, Gf = C(() => {
  zt();
  Ne();
  o(x7, "applyStyles");
  o(E7, "effect");
  qf = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: x7,
    effect: E7,
    requires: ["computeStyles"]
  };
});

// ../node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function me(e) {
  return e.split("-")[0];
}
var Tt = C(() => {
  o(me, "getBasePlacement");
});

// ../node_modules/@popperjs/core/lib/utils/math.js
var tt, tr, pt, Ht = C(() => {
  tt = Math.max, tr = Math.min, pt = Math.round;
});

// ../node_modules/@popperjs/core/lib/utils/userAgent.js
function Dr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
var Hl = C(() => {
  o(Dr, "getUAString");
});

// ../node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function yn() {
  return !/^((?!chrome|android).)*safari/i.test(Dr());
}
var Pl = C(() => {
  Hl();
  o(yn, "isLayoutViewport");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function Ge(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), a = 1, i = 1;
  t && ue(e) && (a = e.offsetWidth > 0 && pt(n.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && pt(n.height) / e.offsetHeight || 1);
  var c = qe(e) ? Z(e) : window, l = c.visualViewport, s = !yn() && r, u = (n.left + (s && l ? l.offsetLeft : 0)) / a, f = (n.top + (s && l ?
  l.offsetTop : 0)) / i, d = n.width / a, m = n.height / i;
  return {
    width: d,
    height: m,
    top: f,
    right: u + d,
    bottom: f + m,
    left: u,
    x: u,
    y: f
  };
}
var _r = C(() => {
  Ne();
  Ht();
  et();
  Pl();
  o(Ge, "getBoundingClientRect");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function rr(e) {
  var t = Ge(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
var ko = C(() => {
  _r();
  o(rr, "getLayoutRect");
});

// ../node_modules/@popperjs/core/lib/dom-utils/contains.js
function Rn(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Fr(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
var kl = C(() => {
  Ne();
  o(Rn, "contains");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function Se(e) {
  return Z(e).getComputedStyle(e);
}
var Vr = C(() => {
  et();
  o(Se, "getComputedStyle");
});

// ../node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function Ol(e) {
  return ["table", "td", "th"].indexOf(pe(e)) >= 0;
}
var Yf = C(() => {
  zt();
  o(Ol, "isTableElement");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function we(e) {
  return ((qe(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
var mt = C(() => {
  Ne();
  o(we, "getDocumentElement");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function ht(e) {
  return pe(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Fr(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    we(e)
  );
}
var xn = C(() => {
  zt();
  mt();
  Ne();
  o(ht, "getParentNode");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function Xf(e) {
  return !ue(e) || // https://github.com/popperjs/popper-core/issues/837
  Se(e).position === "fixed" ? null : e.offsetParent;
}
function S7(e) {
  var t = /firefox/i.test(Dr()), r = /Trident/i.test(Dr());
  if (r && ue(e)) {
    var n = Se(e);
    if (n.position === "fixed")
      return null;
  }
  var a = ht(e);
  for (Fr(a) && (a = a.host); ue(a) && ["html", "body"].indexOf(pe(a)) < 0; ) {
    var i = Se(a);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !==
    -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return a;
    a = a.parentNode;
  }
  return null;
}
function rt(e) {
  for (var t = Z(e), r = Xf(e); r && Ol(r) && Se(r).position === "static"; )
    r = Xf(r);
  return r && (pe(r) === "html" || pe(r) === "body" && Se(r).position === "static") ? t : r || S7(e) || t;
}
var $r = C(() => {
  et();
  zt();
  Vr();
  Ne();
  Yf();
  xn();
  Hl();
  o(Xf, "getTrueOffsetParent");
  o(S7, "getContainingBlock");
  o(rt, "getOffsetParent");
});

// ../node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function nr(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
var Oo = C(() => {
  o(nr, "getMainAxisFromPlacement");
});

// ../node_modules/@popperjs/core/lib/utils/within.js
function or(e, t, r) {
  return tt(e, tr(t, r));
}
function Zf(e, t, r) {
  var n = or(e, t, r);
  return n > r ? r : n;
}
var Bl = C(() => {
  Ht();
  o(or, "within");
  o(Zf, "withinMaxClamp");
});

// ../node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function En() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
var Nl = C(() => {
  o(En, "getFreshSideObject");
});

// ../node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function Sn(e) {
  return Object.assign({}, En(), e);
}
var Fl = C(() => {
  Nl();
  o(Sn, "mergePaddingObject");
});

// ../node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function Cn(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var Dl = C(() => {
  o(Cn, "expandToHashMap");
});

// ../node_modules/@popperjs/core/lib/modifiers/arrow.js
function M7(e) {
  var t, r = e.state, n = e.name, a = e.options, i = r.elements.arrow, c = r.modifiersData.popperOffsets, l = me(r.placement), s = nr(l), u = [
  ne, ae].indexOf(l) >= 0, f = u ? "height" : "width";
  if (!(!i || !c)) {
    var d = C7(a.padding, r), m = rr(i), v = s === "y" ? te : ne, y = s === "y" ? se : ae, p = r.rects.reference[f] + r.rects.reference[s] -
    c[s] - r.rects.popper[f], h = c[s] - r.rects.reference[s], g = rt(i), w = g ? s === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, b = p /
    2 - h / 2, x = d[v], E = w - m[f] - d[y], R = w / 2 - m[f] / 2 + b, S = or(x, R, E), A = s;
    r.modifiersData[n] = (t = {}, t[A] = S, t.centerOffset = S - R, t);
  }
}
function A7(e) {
  var t = e.state, r = e.options, n = r.element, a = n === void 0 ? "[data-popper-arrow]" : n;
  a != null && (typeof a == "string" && (a = t.elements.popper.querySelector(a), !a) || Rn(t.elements.popper, a) && (t.elements.arrow = a));
}
var C7, Kf, Jf = C(() => {
  Tt();
  ko();
  kl();
  $r();
  Oo();
  Bl();
  Fl();
  Dl();
  Be();
  C7 = /* @__PURE__ */ o(function(t, r) {
    return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
      placement: r.placement
    })) : t, Sn(typeof t != "number" ? t : Cn(t, It));
  }, "toPaddingObject");
  o(M7, "arrow");
  o(A7, "effect");
  Kf = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: M7,
    effect: A7,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
  };
});

// ../node_modules/@popperjs/core/lib/utils/getVariation.js
function Ye(e) {
  return e.split("-")[1];
}
var jr = C(() => {
  o(Ye, "getVariation");
});

// ../node_modules/@popperjs/core/lib/modifiers/computeStyles.js
function I7(e, t) {
  var r = e.x, n = e.y, a = t.devicePixelRatio || 1;
  return {
    x: pt(r * a) / a || 0,
    y: pt(n * a) / a || 0
  };
}
function Qf(e) {
  var t, r = e.popper, n = e.popperRect, a = e.placement, i = e.variation, c = e.offsets, l = e.position, s = e.gpuAcceleration, u = e.adaptive,
  f = e.roundOffsets, d = e.isFixed, m = c.x, v = m === void 0 ? 0 : m, y = c.y, p = y === void 0 ? 0 : y, h = typeof f == "function" ? f({
    x: v,
    y: p
  }) : {
    x: v,
    y: p
  };
  v = h.x, p = h.y;
  var g = c.hasOwnProperty("x"), w = c.hasOwnProperty("y"), b = ne, x = te, E = window;
  if (u) {
    var R = rt(r), S = "clientHeight", A = "clientWidth";
    if (R === Z(r) && (R = we(r), Se(R).position !== "static" && l === "absolute" && (S = "scrollHeight", A = "scrollWidth")), R = R, a === te ||
    (a === ne || a === ae) && i === er) {
      x = se;
      var M = d && R === E && E.visualViewport ? E.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        R[S]
      );
      p -= M - n.height, p *= s ? 1 : -1;
    }
    if (a === ne || (a === te || a === se) && i === er) {
      b = ae;
      var L = d && R === E && E.visualViewport ? E.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        R[A]
      );
      v -= L - n.width, v *= s ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: l
  }, u && L7), _ = f === !0 ? I7({
    x: v,
    y: p
  }, Z(r)) : {
    x: v,
    y: p
  };
  if (v = _.x, p = _.y, s) {
    var D;
    return Object.assign({}, P, (D = {}, D[x] = w ? "0" : "", D[b] = g ? "0" : "", D.transform = (E.devicePixelRatio || 1) <= 1 ? "translate\
(" + v + "px, " + p + "px)" : "translate3d(" + v + "px, " + p + "px, 0)", D));
  }
  return Object.assign({}, P, (t = {}, t[x] = w ? p + "px" : "", t[b] = g ? v + "px" : "", t.transform = "", t));
}
function z7(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, a = n === void 0 ? !0 : n, i = r.adaptive, c = i === void 0 ? !0 : i, l = r.roundOffsets,
  s = l === void 0 ? !0 : l, u = {
    placement: me(t.placement),
    variation: Ye(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: a,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Qf(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: c,
    roundOffsets: s
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Qf(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: s
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
var L7, ed, td = C(() => {
  Be();
  $r();
  et();
  mt();
  Vr();
  Tt();
  jr();
  Ht();
  L7 = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
  };
  o(I7, "roundOffsetsByDPR");
  o(Qf, "mapToStyles");
  o(z7, "computeStyles");
  ed = {
    name: "computeStyles",
    enabled: !0,
    phase: "beforeWrite",
    fn: z7,
    data: {}
  };
});

// ../node_modules/@popperjs/core/lib/modifiers/eventListeners.js
function T7(e) {
  var t = e.state, r = e.instance, n = e.options, a = n.scroll, i = a === void 0 ? !0 : a, c = n.resize, l = c === void 0 ? !0 : c, s = Z(t.
  elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(f) {
    f.addEventListener("scroll", r.update, Bo);
  }), l && s.addEventListener("resize", r.update, Bo), function() {
    i && u.forEach(function(f) {
      f.removeEventListener("scroll", r.update, Bo);
    }), l && s.removeEventListener("resize", r.update, Bo);
  };
}
var Bo, rd, nd = C(() => {
  et();
  Bo = {
    passive: !0
  };
  o(T7, "effect");
  rd = {
    name: "eventListeners",
    enabled: !0,
    phase: "write",
    fn: /* @__PURE__ */ o(function() {
    }, "fn"),
    effect: T7,
    data: {}
  };
});

// ../node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
function Wr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return H7[t];
  });
}
var H7, od = C(() => {
  H7 = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  o(Wr, "getOppositePlacement");
});

// ../node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
function No(e) {
  return e.replace(/start|end/g, function(t) {
    return P7[t];
  });
}
var P7, ad = C(() => {
  P7 = {
    start: "end",
    end: "start"
  };
  o(No, "getOppositeVariationPlacement");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function ar(e) {
  var t = Z(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
var Fo = C(() => {
  et();
  o(ar, "getWindowScroll");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function ir(e) {
  return Ge(we(e)).left + ar(e).scrollLeft;
}
var Do = C(() => {
  _r();
  mt();
  Fo();
  o(ir, "getWindowScrollBarX");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function _l(e, t) {
  var r = Z(e), n = we(e), a = r.visualViewport, i = n.clientWidth, c = n.clientHeight, l = 0, s = 0;
  if (a) {
    i = a.width, c = a.height;
    var u = yn();
    (u || !u && t === "fixed") && (l = a.offsetLeft, s = a.offsetTop);
  }
  return {
    width: i,
    height: c,
    x: l + ir(e),
    y: s
  };
}
var id = C(() => {
  et();
  mt();
  Do();
  Pl();
  o(_l, "getViewportRect");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function Vl(e) {
  var t, r = we(e), n = ar(e), a = (t = e.ownerDocument) == null ? void 0 : t.body, i = tt(r.scrollWidth, r.clientWidth, a ? a.scrollWidth :
  0, a ? a.clientWidth : 0), c = tt(r.scrollHeight, r.clientHeight, a ? a.scrollHeight : 0, a ? a.clientHeight : 0), l = -n.scrollLeft + ir(
  e), s = -n.scrollTop;
  return Se(a || r).direction === "rtl" && (l += tt(r.clientWidth, a ? a.clientWidth : 0) - i), {
    width: i,
    height: c,
    x: l,
    y: s
  };
}
var ld = C(() => {
  mt();
  Vr();
  Do();
  Fo();
  Ht();
  o(Vl, "getDocumentRect");
});

// ../node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function lr(e) {
  var t = Se(e), r = t.overflow, n = t.overflowX, a = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + a + n);
}
var _o = C(() => {
  Vr();
  o(lr, "isScrollParent");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function Vo(e) {
  return ["html", "body", "#document"].indexOf(pe(e)) >= 0 ? e.ownerDocument.body : ue(e) && lr(e) ? e : Vo(ht(e));
}
var cd = C(() => {
  xn();
  _o();
  zt();
  Ne();
  o(Vo, "getScrollParent");
});

// ../node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function Pt(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = Vo(e), a = n === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Z(n), c = a ? [i].concat(i.visualViewport || [], lr(n) ? n :
  []) : n, l = t.concat(c);
  return a ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Pt(ht(c)))
  );
}
var $l = C(() => {
  cd();
  xn();
  et();
  _o();
  o(Pt, "listScrollParents");
});

// ../node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function Ur(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
var jl = C(() => {
  o(Ur, "rectToClientRect");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function k7(e, t) {
  var r = Ge(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.
  width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function sd(e, t, r) {
  return t === Ho ? Ur(_l(e, r)) : qe(t) ? k7(t, r) : Ur(Vl(we(e)));
}
function O7(e) {
  var t = Pt(ht(e)), r = ["absolute", "fixed"].indexOf(Se(e).position) >= 0, n = r && ue(e) ? rt(e) : e;
  return qe(n) ? t.filter(function(a) {
    return qe(a) && Rn(a, n) && pe(a) !== "body";
  }) : [];
}
function Wl(e, t, r, n) {
  var a = t === "clippingParents" ? O7(e) : [].concat(t), i = [].concat(a, [r]), c = i[0], l = i.reduce(function(s, u) {
    var f = sd(e, u, n);
    return s.top = tt(f.top, s.top), s.right = tr(f.right, s.right), s.bottom = tr(f.bottom, s.bottom), s.left = tt(f.left, s.left), s;
  }, sd(e, c, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
var ud = C(() => {
  Be();
  id();
  ld();
  $l();
  $r();
  mt();
  Vr();
  Ne();
  _r();
  xn();
  kl();
  zt();
  jl();
  Ht();
  o(k7, "getInnerBoundingClientRect");
  o(sd, "getClientRectFromMixedType");
  o(O7, "getClippingParents");
  o(Wl, "getClippingRect");
});

// ../node_modules/@popperjs/core/lib/utils/computeOffsets.js
function Mn(e) {
  var t = e.reference, r = e.element, n = e.placement, a = n ? me(n) : null, i = n ? Ye(n) : null, c = t.x + t.width / 2 - r.width / 2, l = t.
  y + t.height / 2 - r.height / 2, s;
  switch (a) {
    case te:
      s = {
        x: c,
        y: t.y - r.height
      };
      break;
    case se:
      s = {
        x: c,
        y: t.y + t.height
      };
      break;
    case ae:
      s = {
        x: t.x + t.width,
        y: l
      };
      break;
    case ne:
      s = {
        x: t.x - r.width,
        y: l
      };
      break;
    default:
      s = {
        x: t.x,
        y: t.y
      };
  }
  var u = a ? nr(a) : null;
  if (u != null) {
    var f = u === "y" ? "height" : "width";
    switch (i) {
      case dt:
        s[u] = s[u] - (t[f] / 2 - r[f] / 2);
        break;
      case er:
        s[u] = s[u] + (t[f] / 2 - r[f] / 2);
        break;
      default:
    }
  }
  return s;
}
var Ul = C(() => {
  Tt();
  jr();
  Oo();
  Be();
  o(Mn, "computeOffsets");
});

// ../node_modules/@popperjs/core/lib/utils/detectOverflow.js
function nt(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, a = n === void 0 ? e.placement : n, i = r.strategy, c = i === void 0 ? e.strategy : i, l = r.boundary, s = l ===
  void 0 ? jf : l, u = r.rootBoundary, f = u === void 0 ? Ho : u, d = r.elementContext, m = d === void 0 ? Nr : d, v = r.altBoundary, y = v ===
  void 0 ? !1 : v, p = r.padding, h = p === void 0 ? 0 : p, g = Sn(typeof h != "number" ? h : Cn(h, It)), w = m === Nr ? Wf : Nr, b = e.rects.
  popper, x = e.elements[y ? w : m], E = Wl(qe(x) ? x : x.contextElement || we(e.elements.popper), s, f, c), R = Ge(e.elements.reference), S = Mn(
  {
    reference: R,
    element: b,
    strategy: "absolute",
    placement: a
  }), A = Ur(Object.assign({}, b, S)), M = m === Nr ? A : R, L = {
    top: E.top - M.top + g.top,
    bottom: M.bottom - E.bottom + g.bottom,
    left: E.left - M.left + g.left,
    right: M.right - E.right + g.right
  }, P = e.modifiersData.offset;
  if (m === Nr && P) {
    var _ = P[a];
    Object.keys(L).forEach(function(D) {
      var K = [ae, se].indexOf(D) >= 0 ? 1 : -1, T = [te, se].indexOf(D) >= 0 ? "y" : "x";
      L[D] += _[T] * K;
    });
  }
  return L;
}
var An = C(() => {
  ud();
  mt();
  _r();
  Ul();
  jl();
  Be();
  Ne();
  Fl();
  Dl();
  o(nt, "detectOverflow");
});

// ../node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function ql(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, a = r.boundary, i = r.rootBoundary, c = r.padding, l = r.flipVariations, s = r.allowedAutoPlacements, u = s ===
  void 0 ? Po : s, f = Ye(n), d = f ? l ? Tl : Tl.filter(function(y) {
    return Ye(y) === f;
  }) : It, m = d.filter(function(y) {
    return u.indexOf(y) >= 0;
  });
  m.length === 0 && (m = d);
  var v = m.reduce(function(y, p) {
    return y[p] = nt(e, {
      placement: p,
      boundary: a,
      rootBoundary: i,
      padding: c
    })[me(p)], y;
  }, {});
  return Object.keys(v).sort(function(y, p) {
    return v[y] - v[p];
  });
}
var fd = C(() => {
  jr();
  Be();
  An();
  Tt();
  o(ql, "computeAutoPlacement");
});

// ../node_modules/@popperjs/core/lib/modifiers/flip.js
function B7(e) {
  if (me(e) === To)
    return [];
  var t = Wr(e);
  return [No(e), t, No(t)];
}
function N7(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var a = r.mainAxis, i = a === void 0 ? !0 : a, c = r.altAxis, l = c === void 0 ? !0 : c, s = r.fallbackPlacements, u = r.padding, f = r.
    boundary, d = r.rootBoundary, m = r.altBoundary, v = r.flipVariations, y = v === void 0 ? !0 : v, p = r.allowedAutoPlacements, h = t.options.
    placement, g = me(h), w = g === h, b = s || (w || !y ? [Wr(h)] : B7(h)), x = [h].concat(b).reduce(function(he, fe) {
      return he.concat(me(fe) === To ? ql(t, {
        placement: fe,
        boundary: f,
        rootBoundary: d,
        padding: u,
        flipVariations: y,
        allowedAutoPlacements: p
      }) : fe);
    }, []), E = t.rects.reference, R = t.rects.popper, S = /* @__PURE__ */ new Map(), A = !0, M = x[0], L = 0; L < x.length; L++) {
      var P = x[L], _ = me(P), D = Ye(P) === dt, K = [te, se].indexOf(_) >= 0, T = K ? "width" : "height", z = nt(t, {
        placement: P,
        boundary: f,
        rootBoundary: d,
        altBoundary: m,
        padding: u
      }), k = K ? D ? ae : ne : D ? se : te;
      E[T] > R[T] && (k = Wr(k));
      var $ = Wr(k), F = [];
      if (i && F.push(z[_] <= 0), l && F.push(z[k] <= 0, z[$] <= 0), F.every(function(he) {
        return he;
      })) {
        M = P, A = !1;
        break;
      }
      S.set(P, F);
    }
    if (A)
      for (var j = y ? 3 : 1, O = /* @__PURE__ */ o(function(fe) {
        var de = x.find(function(be) {
          var Me = S.get(be);
          if (Me)
            return Me.slice(0, fe).every(function(Nt) {
              return Nt;
            });
        });
        if (de)
          return M = de, "break";
      }, "_loop"), G = j; G > 0; G--) {
        var Ce = O(G);
        if (Ce === "break") break;
      }
    t.placement !== M && (t.modifiersData[n]._skip = !0, t.placement = M, t.reset = !0);
  }
}
var dd, pd = C(() => {
  od();
  Tt();
  ad();
  An();
  fd();
  Be();
  jr();
  o(B7, "getExpandedFallbackPlacements");
  o(N7, "flip");
  dd = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: N7,
    requiresIfExists: ["offset"],
    data: {
      _skip: !1
    }
  };
});

// ../node_modules/@popperjs/core/lib/modifiers/hide.js
function md(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function hd(e) {
  return [te, ae, se, ne].some(function(t) {
    return e[t] >= 0;
  });
}
function F7(e) {
  var t = e.state, r = e.name, n = t.rects.reference, a = t.rects.popper, i = t.modifiersData.preventOverflow, c = nt(t, {
    elementContext: "reference"
  }), l = nt(t, {
    altBoundary: !0
  }), s = md(c, n), u = md(l, a, i), f = hd(s), d = hd(u);
  t.modifiersData[r] = {
    referenceClippingOffsets: s,
    popperEscapeOffsets: u,
    isReferenceHidden: f,
    hasPopperEscaped: d
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": d
  });
}
var gd, vd = C(() => {
  Be();
  An();
  o(md, "getSideOffsets");
  o(hd, "isAnySideFullyClipped");
  o(F7, "hide");
  gd = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: F7
  };
});

// ../node_modules/@popperjs/core/lib/modifiers/offset.js
function D7(e, t, r) {
  var n = me(e), a = [ne, te].indexOf(n) >= 0 ? -1 : 1, i = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, c = i[0], l = i[1];
  return c = c || 0, l = (l || 0) * a, [ne, ae].indexOf(n) >= 0 ? {
    x: l,
    y: c
  } : {
    x: c,
    y: l
  };
}
function _7(e) {
  var t = e.state, r = e.options, n = e.name, a = r.offset, i = a === void 0 ? [0, 0] : a, c = Po.reduce(function(f, d) {
    return f[d] = D7(d, t.rects, i), f;
  }, {}), l = c[t.placement], s = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += s, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] =
  c;
}
var wd, bd = C(() => {
  Tt();
  Be();
  o(D7, "distanceAndSkiddingToXY");
  o(_7, "offset");
  wd = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: _7
  };
});

// ../node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function V7(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = Mn({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
var yd, Rd = C(() => {
  Ul();
  o(V7, "popperOffsets");
  yd = {
    name: "popperOffsets",
    enabled: !0,
    phase: "read",
    fn: V7,
    data: {}
  };
});

// ../node_modules/@popperjs/core/lib/utils/getAltAxis.js
function Gl(e) {
  return e === "x" ? "y" : "x";
}
var xd = C(() => {
  o(Gl, "getAltAxis");
});

// ../node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function $7(e) {
  var t = e.state, r = e.options, n = e.name, a = r.mainAxis, i = a === void 0 ? !0 : a, c = r.altAxis, l = c === void 0 ? !1 : c, s = r.boundary,
  u = r.rootBoundary, f = r.altBoundary, d = r.padding, m = r.tether, v = m === void 0 ? !0 : m, y = r.tetherOffset, p = y === void 0 ? 0 : y,
  h = nt(t, {
    boundary: s,
    rootBoundary: u,
    padding: d,
    altBoundary: f
  }), g = me(t.placement), w = Ye(t.placement), b = !w, x = nr(g), E = Gl(x), R = t.modifiersData.popperOffsets, S = t.rects.reference, A = t.
  rects.popper, M = typeof p == "function" ? p(Object.assign({}, t.rects, {
    placement: t.placement
  })) : p, L = typeof M == "number" ? {
    mainAxis: M,
    altAxis: M
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, M), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, _ = {
    x: 0,
    y: 0
  };
  if (R) {
    if (i) {
      var D, K = x === "y" ? te : ne, T = x === "y" ? se : ae, z = x === "y" ? "height" : "width", k = R[x], $ = k + h[K], F = k - h[T], j = v ?
      -A[z] / 2 : 0, O = w === dt ? S[z] : A[z], G = w === dt ? -A[z] : -S[z], Ce = t.elements.arrow, he = v && Ce ? rr(Ce) : {
        width: 0,
        height: 0
      }, fe = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : En(), de = fe[K], be = fe[T], Me = or(0, S[z],
      he[z]), Nt = b ? S[z] / 2 - j - Me - de - L.mainAxis : O - Me - de - L.mainAxis, Kr = b ? -S[z] / 2 + j + Me + be + L.mainAxis : G + Me +
      be + L.mainAxis, Ko = t.elements.arrow && rt(t.elements.arrow), wp = Ko ? x === "y" ? Ko.clientTop || 0 : Ko.clientLeft || 0 : 0, E0 = (D =
      P?.[x]) != null ? D : 0, bp = k + Nt - E0 - wp, yp = k + Kr - E0, S0 = or(v ? tr($, bp) : $, k, v ? tt(F, yp) : F);
      R[x] = S0, _[x] = S0 - k;
    }
    if (l) {
      var C0, Rp = x === "x" ? te : ne, xp = x === "x" ? se : ae, Ft = R[E], Hn = E === "y" ? "height" : "width", M0 = Ft + h[Rp], A0 = Ft -
      h[xp], Jo = [te, ne].indexOf(g) !== -1, L0 = (C0 = P?.[E]) != null ? C0 : 0, I0 = Jo ? M0 : Ft - S[Hn] - A[Hn] - L0 + L.altAxis, z0 = Jo ?
      Ft + S[Hn] + A[Hn] - L0 - L.altAxis : A0, T0 = v && Jo ? Zf(I0, Ft, z0) : or(v ? I0 : M0, Ft, v ? z0 : A0);
      R[E] = T0, _[E] = T0 - Ft;
    }
    t.modifiersData[n] = _;
  }
}
var Ed, Sd = C(() => {
  Be();
  Tt();
  Oo();
  xd();
  Bl();
  ko();
  $r();
  An();
  jr();
  Nl();
  Ht();
  o($7, "preventOverflow");
  Ed = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: $7,
    requiresIfExists: ["offset"]
  };
});

// ../node_modules/@popperjs/core/lib/modifiers/index.js
var Yl = C(() => {
});

// ../node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function Xl(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
var Cd = C(() => {
  o(Xl, "getHTMLElementScroll");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function Zl(e) {
  return e === Z(e) || !ue(e) ? ar(e) : Xl(e);
}
var Md = C(() => {
  Fo();
  et();
  Ne();
  Cd();
  o(Zl, "getNodeScroll");
});

// ../node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function j7(e) {
  var t = e.getBoundingClientRect(), r = pt(t.width) / e.offsetWidth || 1, n = pt(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Kl(e, t, r) {
  r === void 0 && (r = !1);
  var n = ue(t), a = ue(t) && j7(t), i = we(t), c = Ge(e, a, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((pe(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  lr(i)) && (l = Zl(t)), ue(t) ? (s = Ge(t, !0), s.x += t.clientLeft, s.y += t.clientTop) : i && (s.x = ir(i))), {
    x: c.left + l.scrollLeft - s.x,
    y: c.top + l.scrollTop - s.y,
    width: c.width,
    height: c.height
  };
}
var Ad = C(() => {
  _r();
  Md();
  zt();
  Ne();
  Do();
  mt();
  _o();
  Ht();
  o(j7, "isElementScaled");
  o(Kl, "getCompositeRect");
});

// ../node_modules/@popperjs/core/lib/utils/orderModifiers.js
function W7(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function a(i) {
    r.add(i.name);
    var c = [].concat(i.requires || [], i.requiresIfExists || []);
    c.forEach(function(l) {
      if (!r.has(l)) {
        var s = t.get(l);
        s && a(s);
      }
    }), n.push(i);
  }
  return o(a, "sort"), e.forEach(function(i) {
    r.has(i.name) || a(i);
  }), n;
}
function Jl(e) {
  var t = W7(e);
  return Uf.reduce(function(r, n) {
    return r.concat(t.filter(function(a) {
      return a.phase === n;
    }));
  }, []);
}
var Ld = C(() => {
  Be();
  o(W7, "order");
  o(Jl, "orderModifiers");
});

// ../node_modules/@popperjs/core/lib/utils/debounce.js
function Ql(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
var Id = C(() => {
  o(Ql, "debounce");
});

// ../node_modules/@popperjs/core/lib/utils/mergeByName.js
function e0(e) {
  var t = e.reduce(function(r, n) {
    var a = r[n.name];
    return r[n.name] = a ? Object.assign({}, a, n, {
      options: Object.assign({}, a.options, n.options),
      data: Object.assign({}, a.data, n.data)
    }) : n, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var zd = C(() => {
  o(e0, "mergeByName");
});

// ../node_modules/@popperjs/core/lib/createPopper.js
function Hd() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Pd(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, a = t.defaultOptions, i = a === void 0 ? Td : a;
  return /* @__PURE__ */ o(function(l, s, u) {
    u === void 0 && (u = i);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Td, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: s
      },
      attributes: {},
      styles: {}
    }, d = [], m = !1, v = {
      state: f,
      setOptions: /* @__PURE__ */ o(function(g) {
        var w = typeof g == "function" ? g(f.options) : g;
        p(), f.options = Object.assign({}, i, f.options, w), f.scrollParents = {
          reference: qe(l) ? Pt(l) : l.contextElement ? Pt(l.contextElement) : [],
          popper: Pt(s)
        };
        var b = Jl(e0([].concat(n, f.options.modifiers)));
        return f.orderedModifiers = b.filter(function(x) {
          return x.enabled;
        }), y(), v.update();
      }, "setOptions"),
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: /* @__PURE__ */ o(function() {
        if (!m) {
          var g = f.elements, w = g.reference, b = g.popper;
          if (Hd(w, b)) {
            f.rects = {
              reference: Kl(w, rt(b), f.options.strategy === "fixed"),
              popper: rr(b)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(L) {
              return f.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var x = 0; x < f.orderedModifiers.length; x++) {
              if (f.reset === !0) {
                f.reset = !1, x = -1;
                continue;
              }
              var E = f.orderedModifiers[x], R = E.fn, S = E.options, A = S === void 0 ? {} : S, M = E.name;
              typeof R == "function" && (f = R({
                state: f,
                options: A,
                name: M,
                instance: v
              }) || f);
            }
          }
        }
      }, "forceUpdate"),
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Ql(function() {
        return new Promise(function(h) {
          v.forceUpdate(), h(f);
        });
      }),
      destroy: /* @__PURE__ */ o(function() {
        p(), m = !0;
      }, "destroy")
    };
    if (!Hd(l, s))
      return v;
    v.setOptions(u).then(function(h) {
      !m && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function y() {
      f.orderedModifiers.forEach(function(h) {
        var g = h.name, w = h.options, b = w === void 0 ? {} : w, x = h.effect;
        if (typeof x == "function") {
          var E = x({
            state: f,
            name: g,
            instance: v,
            options: b
          }), R = /* @__PURE__ */ o(function() {
          }, "noopFn");
          d.push(E || R);
        }
      });
    }
    o(y, "runModifierEffects");
    function p() {
      d.forEach(function(h) {
        return h();
      }), d = [];
    }
    return o(p, "cleanupModifierEffects"), v;
  }, "createPopper");
}
var Td, kd = C(() => {
  Ad();
  ko();
  $l();
  $r();
  Ld();
  Id();
  zd();
  Ne();
  Td = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
  };
  o(Hd, "areValidElements");
  o(Pd, "popperGenerator");
});

// ../node_modules/@popperjs/core/lib/popper.js
var U7, t0, Od = C(() => {
  kd();
  nd();
  Rd();
  td();
  Gf();
  bd();
  pd();
  Sd();
  Jf();
  vd();
  Yl();
  U7 = [rd, yd, ed, qf, wd, dd, Ed, Kf, gd], t0 = /* @__PURE__ */ Pd({
    defaultModifiers: U7
  });
});

// ../node_modules/@popperjs/core/lib/index.js
var Bd = C(() => {
  Be();
  Yl();
  Od();
});

// ../node_modules/react-fast-compare/index.js
var Fd = H((VP, Nd) => {
  var q7 = typeof Element < "u", G7 = typeof Map == "function", Y7 = typeof Set == "function", X7 = typeof ArrayBuffer == "function" && !!ArrayBuffer.
  isView;
  function $o(e, t) {
    if (e === t) return !0;
    if (e && t && typeof e == "object" && typeof t == "object") {
      if (e.constructor !== t.constructor) return !1;
      var r, n, a;
      if (Array.isArray(e)) {
        if (r = e.length, r != t.length) return !1;
        for (n = r; n-- !== 0; )
          if (!$o(e[n], t[n])) return !1;
        return !0;
      }
      var i;
      if (G7 && e instanceof Map && t instanceof Map) {
        if (e.size !== t.size) return !1;
        for (i = e.entries(); !(n = i.next()).done; )
          if (!t.has(n.value[0])) return !1;
        for (i = e.entries(); !(n = i.next()).done; )
          if (!$o(n.value[1], t.get(n.value[0]))) return !1;
        return !0;
      }
      if (Y7 && e instanceof Set && t instanceof Set) {
        if (e.size !== t.size) return !1;
        for (i = e.entries(); !(n = i.next()).done; )
          if (!t.has(n.value[0])) return !1;
        return !0;
      }
      if (X7 && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
        if (r = e.length, r != t.length) return !1;
        for (n = r; n-- !== 0; )
          if (e[n] !== t[n]) return !1;
        return !0;
      }
      if (e.constructor === RegExp) return e.source === t.source && e.flags === t.flags;
      if (e.valueOf !== Object.prototype.valueOf && typeof e.valueOf == "function" && typeof t.valueOf == "function") return e.valueOf() ===
      t.valueOf();
      if (e.toString !== Object.prototype.toString && typeof e.toString == "function" && typeof t.toString == "function") return e.toString() ===
      t.toString();
      if (a = Object.keys(e), r = a.length, r !== Object.keys(t).length) return !1;
      for (n = r; n-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(t, a[n])) return !1;
      if (q7 && e instanceof Element) return !1;
      for (n = r; n-- !== 0; )
        if (!((a[n] === "_owner" || a[n] === "__v" || a[n] === "__o") && e.$$typeof) && !$o(e[a[n]], t[a[n]]))
          return !1;
      return !0;
    }
    return e !== e && t !== t;
  }
  o($o, "equal");
  Nd.exports = /* @__PURE__ */ o(function(t, r) {
    try {
      return $o(t, r);
    } catch (n) {
      if ((n.message || "").match(/stack|recursion/i))
        return console.warn("react-fast-compare cannot handle circular refs"), !1;
      throw n;
    }
  }, "isEqual");
});

// ../node_modules/react-popper/lib/esm/usePopper.js
import * as kt from "react";
import * as Dd from "react-dom";
var _d, Z7, r0, Vd = C(() => {
  Bd();
  _d = ge(Fd());
  $f();
  Z7 = [], r0 = /* @__PURE__ */ o(function(t, r, n) {
    n === void 0 && (n = {});
    var a = kt.useRef(null), i = {
      onFirstUpdate: n.onFirstUpdate,
      placement: n.placement || "bottom",
      strategy: n.strategy || "absolute",
      modifiers: n.modifiers || Z7
    }, c = kt.useState({
      styles: {
        popper: {
          position: i.strategy,
          left: "0",
          top: "0"
        },
        arrow: {
          position: "absolute"
        }
      },
      attributes: {}
    }), l = c[0], s = c[1], u = kt.useMemo(function() {
      return {
        name: "updateState",
        enabled: !0,
        phase: "write",
        fn: /* @__PURE__ */ o(function(v) {
          var y = v.state, p = Object.keys(y.elements);
          Dd.flushSync(function() {
            s({
              styles: Il(p.map(function(h) {
                return [h, y.styles[h] || {}];
              })),
              attributes: Il(p.map(function(h) {
                return [h, y.attributes[h]];
              }))
            });
          });
        }, "fn"),
        requires: ["computeStyles"]
      };
    }, []), f = kt.useMemo(function() {
      var m = {
        onFirstUpdate: i.onFirstUpdate,
        placement: i.placement,
        strategy: i.strategy,
        modifiers: [].concat(i.modifiers, [u, {
          name: "applyStyles",
          enabled: !1
        }])
      };
      return (0, _d.default)(a.current, m) ? a.current || m : (a.current = m, m);
    }, [i.onFirstUpdate, i.placement, i.strategy, i.modifiers, u]), d = kt.useRef();
    return zl(function() {
      d.current && d.current.setOptions(f);
    }, [f]), zl(function() {
      if (!(t == null || r == null)) {
        var m = n.createPopper || t0, v = m(t, r, f);
        return d.current = v, function() {
          v.destroy(), d.current = null;
        };
      }
    }, [t, r, n.createPopper]), {
      state: d.current ? d.current.state : null,
      styles: l.styles,
      attributes: l.attributes,
      update: d.current ? d.current.update : null,
      forceUpdate: d.current ? d.current.forceUpdate : null
    };
  }, "usePopper");
});

// ../node_modules/react-popper/lib/esm/index.js
var $d = C(() => {
  Vd();
});

// ../node_modules/react-popper-tooltip/dist/esm/react-popper-tooltip.js
import * as V from "react";
function Ud(e) {
  var t = V.useRef(e);
  return t.current = e, V.useCallback(function() {
    return t.current;
  }, []);
}
function J7(e) {
  var t = e.initial, r = e.value, n = e.onChange, a = n === void 0 ? K7 : n;
  if (t === void 0 && r === void 0)
    throw new TypeError('Either "value" or "initial" variable must be set. Now both are undefined');
  var i = V.useState(t), c = i[0], l = i[1], s = Ud(c), u = V.useCallback(function(d) {
    var m = s(), v = typeof d == "function" ? d(m) : d;
    typeof v.persist == "function" && v.persist(), l(v), typeof a == "function" && a(v);
  }, [s, a]), f = r !== void 0;
  return [f ? r : c, f ? a : u];
}
function qd(e, t) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), function() {
    return {
      width: 0,
      height: 0,
      top: t,
      right: e,
      bottom: t,
      left: e,
      x: 0,
      y: 0,
      toJSON: /* @__PURE__ */ o(function() {
        return null;
      }, "toJSON")
    };
  };
}
function Gd(e, t) {
  var r, n, a;
  e === void 0 && (e = {}), t === void 0 && (t = {});
  var i = Object.keys(Wd).reduce(function(T, z) {
    var k;
    return W({}, T, (k = {}, k[z] = T[z] !== void 0 ? T[z] : Wd[z], k));
  }, e), c = V.useMemo(
    function() {
      return [{
        name: "offset",
        options: {
          offset: i.offset
        }
      }];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(i.offset) ? i.offset : []
  ), l = W({}, t, {
    placement: t.placement || i.placement,
    modifiers: t.modifiers || c
  }), s = V.useState(null), u = s[0], f = s[1], d = V.useState(null), m = d[0], v = d[1], y = J7({
    initial: i.defaultVisible,
    value: i.visible,
    onChange: i.onVisibleChange
  }), p = y[0], h = y[1], g = V.useRef();
  V.useEffect(function() {
    return function() {
      return clearTimeout(g.current);
    };
  }, []);
  var w = r0(i.followCursor ? jd : u, m, l), b = w.styles, x = w.attributes, E = pr(w, Q7), R = E.update, S = Ud({
    visible: p,
    triggerRef: u,
    tooltipRef: m,
    finalConfig: i
  }), A = V.useCallback(
    function(T) {
      return Array.isArray(i.trigger) ? i.trigger.includes(T) : i.trigger === T;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(i.trigger) ? i.trigger : [i.trigger]
  ), M = V.useCallback(function() {
    clearTimeout(g.current), g.current = window.setTimeout(function() {
      return h(!1);
    }, i.delayHide);
  }, [i.delayHide, h]), L = V.useCallback(function() {
    clearTimeout(g.current), g.current = window.setTimeout(function() {
      return h(!0);
    }, i.delayShow);
  }, [i.delayShow, h]), P = V.useCallback(function() {
    S().visible ? M() : L();
  }, [S, M, L]);
  V.useEffect(function() {
    if (S().finalConfig.closeOnOutsideClick) {
      var T = /* @__PURE__ */ o(function(k) {
        var $, F = S(), j = F.tooltipRef, O = F.triggerRef, G = (k.composedPath == null || ($ = k.composedPath()) == null ? void 0 : $[0]) ||
        k.target;
        G instanceof Node && j != null && O != null && !j.contains(G) && !O.contains(G) && M();
      }, "handleClickOutside");
      return document.addEventListener("mousedown", T), function() {
        return document.removeEventListener("mousedown", T);
      };
    }
  }, [S, M]), V.useEffect(function() {
    if (!(u == null || !A("click")))
      return u.addEventListener("click", P), function() {
        return u.removeEventListener("click", P);
      };
  }, [u, A, P]), V.useEffect(function() {
    if (!(u == null || !A("double-click")))
      return u.addEventListener("dblclick", P), function() {
        return u.removeEventListener("dblclick", P);
      };
  }, [u, A, P]), V.useEffect(function() {
    if (!(u == null || !A("right-click"))) {
      var T = /* @__PURE__ */ o(function(k) {
        k.preventDefault(), P();
      }, "preventDefaultAndToggle");
      return u.addEventListener("contextmenu", T), function() {
        return u.removeEventListener("contextmenu", T);
      };
    }
  }, [u, A, P]), V.useEffect(function() {
    if (!(u == null || !A("focus")))
      return u.addEventListener("focus", L), u.addEventListener("blur", M), function() {
        u.removeEventListener("focus", L), u.removeEventListener("blur", M);
      };
  }, [u, A, L, M]), V.useEffect(function() {
    if (!(u == null || !A("hover")))
      return u.addEventListener("mouseenter", L), u.addEventListener("mouseleave", M), function() {
        u.removeEventListener("mouseenter", L), u.removeEventListener("mouseleave", M);
      };
  }, [u, A, L, M]), V.useEffect(function() {
    if (!(m == null || !A("hover") || !S().finalConfig.interactive))
      return m.addEventListener("mouseenter", L), m.addEventListener("mouseleave", M), function() {
        m.removeEventListener("mouseenter", L), m.removeEventListener("mouseleave", M);
      };
  }, [m, A, L, M, S]);
  var _ = E == null || (r = E.state) == null || (n = r.modifiersData) == null || (a = n.hide) == null ? void 0 : a.isReferenceHidden;
  V.useEffect(function() {
    i.closeOnTriggerHidden && _ && M();
  }, [i.closeOnTriggerHidden, M, _]), V.useEffect(function() {
    if (!i.followCursor || u == null) return;
    function T(z) {
      var k = z.clientX, $ = z.clientY;
      jd.getBoundingClientRect = qd(k, $), R?.();
    }
    return o(T, "setMousePosition"), u.addEventListener("mousemove", T), function() {
      return u.removeEventListener("mousemove", T);
    };
  }, [i.followCursor, u, R]), V.useEffect(function() {
    if (!(m == null || R == null || i.mutationObserverOptions == null)) {
      var T = new MutationObserver(R);
      return T.observe(m, i.mutationObserverOptions), function() {
        return T.disconnect();
      };
    }
  }, [i.mutationObserverOptions, m, R]);
  var D = /* @__PURE__ */ o(function(z) {
    return z === void 0 && (z = {}), W({}, z, {
      style: W({}, z.style, b.popper)
    }, x.popper, {
      "data-popper-interactive": i.interactive
    });
  }, "getTooltipProps"), K = /* @__PURE__ */ o(function(z) {
    return z === void 0 && (z = {}), W({}, z, x.arrow, {
      style: W({}, z.style, b.arrow),
      "data-popper-arrow": !0
    });
  }, "getArrowProps");
  return W({
    getArrowProps: K,
    getTooltipProps: D,
    setTooltipRef: v,
    setTriggerRef: f,
    tooltipRef: m,
    triggerRef: u,
    visible: p
  }, E);
}
var K7, Q7, jd, Wd, Yd = C(() => {
  Fn();
  en();
  $d();
  o(Ud, "useGetLatest");
  K7 = /* @__PURE__ */ o(function() {
  }, "noop");
  o(J7, "useControlledState");
  o(qd, "generateBoundingClientRect");
  Q7 = ["styles", "attributes"], jd = {
    getBoundingClientRect: qd()
  }, Wd = {
    closeOnOutsideClick: !0,
    closeOnTriggerHidden: !1,
    defaultVisible: !1,
    delayHide: 0,
    delayShow: 0,
    followCursor: !1,
    interactive: !1,
    mutationObserverOptions: {
      attributes: !0,
      childList: !0,
      subtree: !0
    },
    offset: [0, 6],
    trigger: "hover"
  };
  o(Gd, "usePopperTooltip");
});

// src/components/components/tooltip/Tooltip.tsx
import n0 from "react";
import { lighten as Ln, styled as Zd } from "storybook/theming";
var Xd, Xe, Ot, e6, t6, o0, Kd = C(() => {
  "use strict";
  Xd = ge(rn(), 1), Xe = (0, Xd.default)(1e3)(
    (e, t, r, n = 0) => t.split("-")[0] === e ? r : n
  ), Ot = 8, e6 = Zd.div(
    {
      position: "absolute",
      borderStyle: "solid"
    },
    ({ placement: e }) => {
      let t = 0, r = 0;
      switch (!0) {
        case (e.startsWith("left") || e.startsWith("right")): {
          r = 8;
          break;
        }
        case (e.startsWith("top") || e.startsWith("bottom")): {
          t = 8;
          break;
        }
        default:
      }
      return { transform: `translate3d(${t}px, ${r}px, 0px)` };
    },
    ({ theme: e, color: t, placement: r }) => ({
      bottom: `${Xe("top", r, `${Ot * -1}px`, "auto")}`,
      top: `${Xe("bottom", r, `${Ot * -1}px`, "auto")}`,
      right: `${Xe("left", r, `${Ot * -1}px`, "auto")}`,
      left: `${Xe("right", r, `${Ot * -1}px`, "auto")}`,
      borderBottomWidth: `${Xe("top", r, "0", Ot)}px`,
      borderTopWidth: `${Xe("bottom", r, "0", Ot)}px`,
      borderRightWidth: `${Xe("left", r, "0", Ot)}px`,
      borderLeftWidth: `${Xe("right", r, "0", Ot)}px`,
      borderTopColor: Xe(
        "top",
        r,
        e.color[t] || t || e.base === "light" ? Ln(e.background.app) : e.background.app,
        "transparent"
      ),
      borderBottomColor: Xe(
        "bottom",
        r,
        e.color[t] || t || e.base === "light" ? Ln(e.background.app) : e.background.app,
        "transparent"
      ),
      borderLeftColor: Xe(
        "left",
        r,
        e.color[t] || t || e.base === "light" ? Ln(e.background.app) : e.background.app,
        "transparent"
      ),
      borderRightColor: Xe(
        "right",
        r,
        e.color[t] || t || e.base === "light" ? Ln(e.background.app) : e.background.app,
        "transparent"
      )
    })
  ), t6 = Zd.div(
    ({ hidden: e }) => ({
      display: e ? "none" : "inline-block",
      zIndex: 2147483647,
      colorScheme: "light dark"
    }),
    ({ theme: e, color: t, hasChrome: r }) => r ? {
      background: t && e.color[t] || t || e.base === "light" ? Ln(e.background.app) : e.background.app,
      filter: `
            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))
            drop-shadow(0 1px 3px rgba(0,0,0,0.1))
          `,
      borderRadius: e.appBorderRadius + 2,
      fontSize: e.typography.size.s1
    } : {}
  ), o0 = n0.forwardRef(
    ({
      placement: e = "top",
      hasChrome: t = !0,
      children: r,
      arrowProps: n = {},
      tooltipRef: a,
      color: i,
      withArrows: c,
      ...l
    }, s) => /* @__PURE__ */ n0.createElement(t6, { "data-testid": "tooltip", hasChrome: t, ref: s, ...l, color: i }, t && c && /* @__PURE__ */ n0.
    createElement(e6, { placement: e, ...n, color: i }), r)
  );
  o0.displayName = "Tooltip";
});

// src/components/components/tooltip/WithTooltip.tsx
var i0 = {};
Qr(i0, {
  WithToolTipState: () => a0,
  WithTooltip: () => a0,
  WithTooltipPure: () => Qd
});
import In, { useCallback as r6, useEffect as n6, useState as o6 } from "react";
import a6 from "react-dom";
import { global as i6 } from "@storybook/global";
import { styled as Jd } from "storybook/theming";
var jo, l6, c6, Qd, a0, Wo = C(() => {
  "use strict";
  Yd();
  Kd();
  ({ document: jo } = i6), l6 = Jd.div`
  display: inline-block;
  cursor: ${(e) => e.trigger === "hover" || e.trigger?.includes("hover") ? "default" : "pointer"};
`, c6 = Jd.g`
  cursor: ${(e) => e.trigger === "hover" || e.trigger?.includes("hover") ? "default" : "pointer"};
`, Qd = /* @__PURE__ */ o(({
    svg: e = !1,
    trigger: t = "click",
    closeOnOutsideClick: r = !1,
    placement: n = "top",
    modifiers: a = [
      {
        name: "preventOverflow",
        options: {
          padding: 8
        }
      },
      {
        name: "offset",
        options: {
          offset: [8, 8]
        }
      },
      {
        name: "arrow",
        options: {
          padding: 8
        }
      }
    ],
    hasChrome: i = !0,
    defaultVisible: c = !1,
    withArrows: l,
    offset: s,
    tooltip: u,
    children: f,
    closeOnTriggerHidden: d,
    mutationObserverOptions: m,
    delayHide: v = t === "hover" ? 200 : 0,
    visible: y,
    interactive: p,
    delayShow: h = t === "hover" ? 400 : 0,
    strategy: g,
    followCursor: w,
    onVisibleChange: b,
    ...x
  }) => {
    let E = e ? c6 : l6, {
      getArrowProps: R,
      getTooltipProps: S,
      setTooltipRef: A,
      setTriggerRef: M,
      visible: L,
      state: P
    } = Gd(
      {
        trigger: t,
        placement: n,
        defaultVisible: c,
        delayHide: v,
        interactive: p,
        closeOnOutsideClick: r,
        closeOnTriggerHidden: d,
        onVisibleChange: b,
        delayShow: h,
        followCursor: w,
        mutationObserverOptions: m,
        visible: y,
        offset: s
      },
      {
        modifiers: a,
        strategy: g
      }
    ), _ = L ? /* @__PURE__ */ In.createElement(
      o0,
      {
        placement: P?.placement,
        ref: A,
        hasChrome: i,
        arrowProps: R(),
        withArrows: l,
        ...S()
      },
      typeof u == "function" ? u({ onHide: /* @__PURE__ */ o(() => b(!1), "onHide") }) : u
    ) : null;
    return /* @__PURE__ */ In.createElement(In.Fragment, null, /* @__PURE__ */ In.createElement(E, { trigger: t, ref: M, ...x }, f), L && a6.
    createPortal(_, jo.body));
  }, "WithTooltipPure"), a0 = /* @__PURE__ */ o(({
    startOpen: e = !1,
    onVisibleChange: t,
    ...r
  }) => {
    let [n, a] = o6(e), i = r6(
      (c) => {
        t && t(c) === !1 || a(c);
      },
      [t]
    );
    return n6(() => {
      let c = /* @__PURE__ */ o(() => i(!1), "hide");
      jo.addEventListener("keydown", c, !1);
      let l = Array.from(jo.getElementsByTagName("iframe")), s = [];
      return l.forEach((u) => {
        let f = /* @__PURE__ */ o(() => {
          try {
            u.contentWindow.document && (u.contentWindow.document.addEventListener("click", c), s.push(() => {
              try {
                u.contentWindow.document.removeEventListener("click", c);
              } catch {
              }
            }));
          } catch {
          }
        }, "bind");
        f(), u.addEventListener("load", f), s.push(() => {
          u.removeEventListener("load", f);
        });
      }), () => {
        jo.removeEventListener("keydown", c), s.forEach((u) => {
          u();
        });
      };
    }), /* @__PURE__ */ In.createElement(Qd, { ...r, visible: n, onVisibleChange: i });
  }, "WithToolTipState");
});

// src/components/index.ts
import { createElement as Dw, forwardRef as _w } from "react";

// src/components/components/typography/components.tsx
import ee from "react";

// src/components/components/typography/DocumentFormatting.tsx
var J = /* @__PURE__ */ o(({ ...e }, t) => {
  let r = [e.class, e.className];
  return delete e.class, e.className = ["sbdocs", `sbdocs-${t}`, ...r].filter(Boolean).join(" "), e;
}, "nameSpaceClassNames");

// src/components/components/typography/ResetWrapper.tsx
import { styled as m2 } from "storybook/theming";

// ../node_modules/polished/dist/polished.esm.js
en();
P0();

// ../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
kn();
function k0(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, vt(e, t);
}
o(k0, "_inheritsLoose");

// ../node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js
O0();
kn();

// ../node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function B0(e) {
  try {
    return Function.toString.call(e).indexOf("[native code]") !== -1;
  } catch {
    return typeof e == "function";
  }
}
o(B0, "_isNativeFunction");

// ../node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function Qo() {
  try {
    var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch {
  }
  return (Qo = /* @__PURE__ */ o(function() {
    return !!e;
  }, "_isNativeReflectConstruct"))();
}
o(Qo, "_isNativeReflectConstruct");

// ../node_modules/@babel/runtime/helpers/esm/construct.js
kn();
function N0(e, t, r) {
  if (Qo()) return Reflect.construct.apply(null, arguments);
  var n = [null];
  n.push.apply(n, t);
  var a = new (e.bind.apply(e, n))();
  return r && vt(a, r.prototype), a;
}
o(N0, "_construct");

// ../node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js
function Bn(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Bn = /* @__PURE__ */ o(function(n) {
    if (n === null || !B0(n)) return n;
    if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
    if (t !== void 0) {
      if (t.has(n)) return t.get(n);
      t.set(n, a);
    }
    function a() {
      return N0(n, arguments, On(this).constructor);
    }
    return o(a, "Wrapper"), a.prototype = Object.create(n.prototype, {
      constructor: {
        value: a,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), vt(a, n);
  }, "_wrapNativeSuper"), Bn(e);
}
o(Bn, "_wrapNativeSuper");

// ../node_modules/polished/dist/polished.esm.js
var Ip = {
  1: `Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0\
.4, lightness: 0.75 }).

`,
  2: `Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, satura\
tion: 0.4, lightness: 0.75, alpha: 0.7 }).

`,
  3: `Passed an incorrect argument to a color function, please pass a string representation of a color.

`,
  4: `Couldn't generate valid rgb string from %s, it returned %s.

`,
  5: `Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,
  6: `Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, bl\
ue: 100 }).

`,
  7: `Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: \
205, blue: 100, alpha: 0.75 }).

`,
  8: `Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,
  9: `Please provide a number of steps to the modularScale helper.

`,
  10: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  11: `Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,
  12: `Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,
  13: `Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,
  14: `Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  15: `Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,
  16: `You must provide a template to this method.

`,
  17: `You passed an unsupported selector state to this method.

`,
  18: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  19: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  20: `expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  21: "expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  22: "expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",
  23: `fontFace expects a name of a font-family.

`,
  24: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  25: `fontFace expects localFonts to be an array.

`,
  26: `fontFace expects fileFormats to be an array.

`,
  27: `radialGradient requries at least 2 color-stops to properly render.

`,
  28: `Please supply a filename to retinaImage() as the first argument.

`,
  29: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  30: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  31: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,
  32: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,
  33: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,
  34: `borderRadius expects a radius value as a string or number as the second argument.

`,
  35: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  36: `Property must be a string value.

`,
  37: `Syntax Error at %s.

`,
  38: `Formula contains a function that needs parentheses at %s.

`,
  39: `Formula is missing closing parenthesis at %s.

`,
  40: `Formula has too many closing parentheses at %s.

`,
  41: `All values in a formula must have the same unit or be unitless.

`,
  42: `Please provide a number of steps to the modularScale helper.

`,
  43: `Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,
  44: `Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,
  45: `Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,
  46: `Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,
  47: `minScreen and maxScreen must be provided as stringified numbers with the same units.

`,
  48: `fromSize and toSize must be provided as stringified numbers with the same units.

`,
  49: `Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,
  50: `Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,
  51: `Expects the first argument object to have the properties prop, fromSize, and toSize.

`,
  52: `fontFace expects either the path to the font file(s) or a name of a local copy.

`,
  53: `fontFace expects localFonts to be an array.

`,
  54: `fontFace expects fileFormats to be an array.

`,
  55: `fontFace expects a name of a font-family.

`,
  56: `linearGradient requries at least 2 color-stops to properly render.

`,
  57: `radialGradient requries at least 2 color-stops to properly render.

`,
  58: `Please supply a filename to retinaImage() as the first argument.

`,
  59: `Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,
  60: "Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",
  61: `Property must be a string value.

`,
  62: `borderRadius expects a radius value as a string or number as the second argument.

`,
  63: `borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,
  64: `The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,
  65: `To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animatio\
n please supply them in simple values, e.g. animation('rotate', '2s').

`,
  66: `The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,
  67: `You must provide a template to this method.

`,
  68: `You passed an unsupported selector state to this method.

`,
  69: `Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,
  70: `Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,
  71: `Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,
  72: `Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,
  73: `Please provide a valid CSS variable.

`,
  74: `CSS variable not found and no default was provided.

`,
  75: `important requires a valid style object, got a %s instead.

`,
  76: `fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,
  77: `remToPx expects a value in "rem" but you provided it in "%s".

`,
  78: `base must be set in "px" or "%" but you set it in "%s".
`
};
function zp() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  var n = t[0], a = [], i;
  for (i = 1; i < t.length; i += 1)
    a.push(t[i]);
  return a.forEach(function(c) {
    n = n.replace(/%[a-z]/, c);
  }), n;
}
o(zp, "format");
var Ae = /* @__PURE__ */ function(e) {
  k0(t, e);
  function t(r) {
    for (var n, a = arguments.length, i = new Array(a > 1 ? a - 1 : 0), c = 1; c < a; c++)
      i[c - 1] = arguments[c];
    return n = e.call(this, zp.apply(void 0, [Ip[r]].concat(i))) || this, H0(n);
  }
  return o(t, "PolishedError"), t;
}(/* @__PURE__ */ Bn(Error));
function F0(e, t) {
  return e.substr(-t.length) === t;
}
o(F0, "endsWith");
var Tp = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
function D0(e) {
  if (typeof e != "string") return e;
  var t = e.match(Tp);
  return t ? parseFloat(e) : e;
}
o(D0, "stripUnit");
var Hp = /* @__PURE__ */ o(function(t) {
  return function(r, n) {
    n === void 0 && (n = "16px");
    var a = r, i = n;
    if (typeof r == "string") {
      if (!F0(r, "px"))
        throw new Ae(69, t, r);
      a = D0(r);
    }
    if (typeof n == "string") {
      if (!F0(n, "px"))
        throw new Ae(70, t, n);
      i = D0(n);
    }
    if (typeof a == "string")
      throw new Ae(71, r, t);
    if (typeof i == "string")
      throw new Ae(72, n, t);
    return "" + a / i + t;
  };
}, "pxtoFactory"), V0 = Hp, S8 = V0("em");
var C8 = V0("rem");
function ea(e) {
  return Math.round(e * 255);
}
o(ea, "colorToInt");
function Pp(e, t, r) {
  return ea(e) + "," + ea(t) + "," + ea(r);
}
o(Pp, "convertToInt");
function tn(e, t, r, n) {
  if (n === void 0 && (n = Pp), t === 0)
    return n(r, r, r);
  var a = (e % 360 + 360) % 360 / 60, i = (1 - Math.abs(2 * r - 1)) * t, c = i * (1 - Math.abs(a % 2 - 1)), l = 0, s = 0, u = 0;
  a >= 0 && a < 1 ? (l = i, s = c) : a >= 1 && a < 2 ? (l = c, s = i) : a >= 2 && a < 3 ? (s = i, u = c) : a >= 3 && a < 4 ? (s = c, u = i) :
  a >= 4 && a < 5 ? (l = c, u = i) : a >= 5 && a < 6 && (l = i, u = c);
  var f = r - i / 2, d = l + f, m = s + f, v = u + f;
  return n(d, m, v);
}
o(tn, "hslToRgb");
var _0 = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "639",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
function kp(e) {
  if (typeof e != "string") return e;
  var t = e.toLowerCase();
  return _0[t] ? "#" + _0[t] : e;
}
o(kp, "nameToHex");
var Op = /^#[a-fA-F0-9]{6}$/, Bp = /^#[a-fA-F0-9]{8}$/, Np = /^#[a-fA-F0-9]{3}$/, Fp = /^#[a-fA-F0-9]{4}$/, ta = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,
Dp = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i, _p = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,
Vp = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
function fr(e) {
  if (typeof e != "string")
    throw new Ae(3);
  var t = kp(e);
  if (t.match(Op))
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16)
    };
  if (t.match(Bp)) {
    var r = parseFloat((parseInt("" + t[7] + t[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[2], 16),
      green: parseInt("" + t[3] + t[4], 16),
      blue: parseInt("" + t[5] + t[6], 16),
      alpha: r
    };
  }
  if (t.match(Np))
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16)
    };
  if (t.match(Fp)) {
    var n = parseFloat((parseInt("" + t[4] + t[4], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + t[1] + t[1], 16),
      green: parseInt("" + t[2] + t[2], 16),
      blue: parseInt("" + t[3] + t[3], 16),
      alpha: n
    };
  }
  var a = ta.exec(t);
  if (a)
    return {
      red: parseInt("" + a[1], 10),
      green: parseInt("" + a[2], 10),
      blue: parseInt("" + a[3], 10)
    };
  var i = Dp.exec(t.substring(0, 50));
  if (i)
    return {
      red: parseInt("" + i[1], 10),
      green: parseInt("" + i[2], 10),
      blue: parseInt("" + i[3], 10),
      alpha: parseFloat("" + i[4]) > 1 ? parseFloat("" + i[4]) / 100 : parseFloat("" + i[4])
    };
  var c = _p.exec(t);
  if (c) {
    var l = parseInt("" + c[1], 10), s = parseInt("" + c[2], 10) / 100, u = parseInt("" + c[3], 10) / 100, f = "rgb(" + tn(l, s, u) + ")", d = ta.
    exec(f);
    if (!d)
      throw new Ae(4, t, f);
    return {
      red: parseInt("" + d[1], 10),
      green: parseInt("" + d[2], 10),
      blue: parseInt("" + d[3], 10)
    };
  }
  var m = Vp.exec(t.substring(0, 50));
  if (m) {
    var v = parseInt("" + m[1], 10), y = parseInt("" + m[2], 10) / 100, p = parseInt("" + m[3], 10) / 100, h = "rgb(" + tn(v, y, p) + ")", g = ta.
    exec(h);
    if (!g)
      throw new Ae(4, t, h);
    return {
      red: parseInt("" + g[1], 10),
      green: parseInt("" + g[2], 10),
      blue: parseInt("" + g[3], 10),
      alpha: parseFloat("" + m[4]) > 1 ? parseFloat("" + m[4]) / 100 : parseFloat("" + m[4])
    };
  }
  throw new Ae(5);
}
o(fr, "parseToRgb");
function $p(e) {
  var t = e.red / 255, r = e.green / 255, n = e.blue / 255, a = Math.max(t, r, n), i = Math.min(t, r, n), c = (a + i) / 2;
  if (a === i)
    return e.alpha !== void 0 ? {
      hue: 0,
      saturation: 0,
      lightness: c,
      alpha: e.alpha
    } : {
      hue: 0,
      saturation: 0,
      lightness: c
    };
  var l, s = a - i, u = c > 0.5 ? s / (2 - a - i) : s / (a + i);
  switch (a) {
    case t:
      l = (r - n) / s + (r < n ? 6 : 0);
      break;
    case r:
      l = (n - t) / s + 2;
      break;
    default:
      l = (t - r) / s + 4;
      break;
  }
  return l *= 60, e.alpha !== void 0 ? {
    hue: l,
    saturation: u,
    lightness: c,
    alpha: e.alpha
  } : {
    hue: l,
    saturation: u,
    lightness: c
  };
}
o($p, "rgbToHsl");
function wt(e) {
  return $p(fr(e));
}
o(wt, "parseToHsl");
var jp = /* @__PURE__ */ o(function(t) {
  return t.length === 7 && t[1] === t[2] && t[3] === t[4] && t[5] === t[6] ? "#" + t[1] + t[3] + t[5] : t;
}, "reduceHexValue"), na = jp;
function Dt(e) {
  var t = e.toString(16);
  return t.length === 1 ? "0" + t : t;
}
o(Dt, "numberToHex");
function ra(e) {
  return Dt(Math.round(e * 255));
}
o(ra, "colorToHex");
function Wp(e, t, r) {
  return na("#" + ra(e) + ra(t) + ra(r));
}
o(Wp, "convertToHex");
function Nn(e, t, r) {
  return tn(e, t, r, Wp);
}
o(Nn, "hslToHex");
function Up(e, t, r) {
  if (typeof e == "number" && typeof t == "number" && typeof r == "number")
    return Nn(e, t, r);
  if (typeof e == "object" && t === void 0 && r === void 0)
    return Nn(e.hue, e.saturation, e.lightness);
  throw new Ae(1);
}
o(Up, "hsl");
function qp(e, t, r, n) {
  if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof n == "number")
    return n >= 1 ? Nn(e, t, r) : "rgba(" + tn(e, t, r) + "," + n + ")";
  if (typeof e == "object" && t === void 0 && r === void 0 && n === void 0)
    return e.alpha >= 1 ? Nn(e.hue, e.saturation, e.lightness) : "rgba(" + tn(e.hue, e.saturation, e.lightness) + "," + e.alpha + ")";
  throw new Ae(2);
}
o(qp, "hsla");
function oa(e, t, r) {
  if (typeof e == "number" && typeof t == "number" && typeof r == "number")
    return na("#" + Dt(e) + Dt(t) + Dt(r));
  if (typeof e == "object" && t === void 0 && r === void 0)
    return na("#" + Dt(e.red) + Dt(e.green) + Dt(e.blue));
  throw new Ae(6);
}
o(oa, "rgb");
function _t(e, t, r, n) {
  if (typeof e == "string" && typeof t == "number") {
    var a = fr(e);
    return "rgba(" + a.red + "," + a.green + "," + a.blue + "," + t + ")";
  } else {
    if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof n == "number")
      return n >= 1 ? oa(e, t, r) : "rgba(" + e + "," + t + "," + r + "," + n + ")";
    if (typeof e == "object" && t === void 0 && r === void 0 && n === void 0)
      return e.alpha >= 1 ? oa(e.red, e.green, e.blue) : "rgba(" + e.red + "," + e.green + "," + e.blue + "," + e.alpha + ")";
  }
  throw new Ae(7);
}
o(_t, "rgba");
var Gp = /* @__PURE__ */ o(function(t) {
  return typeof t.red == "number" && typeof t.green == "number" && typeof t.blue == "number" && (typeof t.alpha != "number" || typeof t.alpha >
  "u");
}, "isRgb"), Yp = /* @__PURE__ */ o(function(t) {
  return typeof t.red == "number" && typeof t.green == "number" && typeof t.blue == "number" && typeof t.alpha == "number";
}, "isRgba"), Xp = /* @__PURE__ */ o(function(t) {
  return typeof t.hue == "number" && typeof t.saturation == "number" && typeof t.lightness == "number" && (typeof t.alpha != "number" || typeof t.
  alpha > "u");
}, "isHsl"), Zp = /* @__PURE__ */ o(function(t) {
  return typeof t.hue == "number" && typeof t.saturation == "number" && typeof t.lightness == "number" && typeof t.alpha == "number";
}, "isHsla");
function bt(e) {
  if (typeof e != "object") throw new Ae(8);
  if (Yp(e)) return _t(e);
  if (Gp(e)) return oa(e);
  if (Zp(e)) return qp(e);
  if (Xp(e)) return Up(e);
  throw new Ae(8);
}
o(bt, "toColorString");
function $0(e, t, r) {
  return /* @__PURE__ */ o(function() {
    var a = r.concat(Array.prototype.slice.call(arguments));
    return a.length >= t ? e.apply(this, a) : $0(e, t, a);
  }, "fn");
}
o($0, "curried");
function ke(e) {
  return $0(e, e.length, []);
}
o(ke, "curry");
function Kp(e, t) {
  if (t === "transparent") return t;
  var r = wt(t);
  return bt(W({}, r, {
    hue: r.hue + parseFloat(e)
  }));
}
o(Kp, "adjustHue");
var M8 = ke(Kp);
function dr(e, t, r) {
  return Math.max(e, Math.min(t, r));
}
o(dr, "guard");
function Jp(e, t) {
  if (t === "transparent") return t;
  var r = wt(t);
  return bt(W({}, r, {
    lightness: dr(0, 1, r.lightness - parseFloat(e))
  }));
}
o(Jp, "darken");
var Qp = ke(Jp), yt = Qp;
function e2(e, t) {
  if (t === "transparent") return t;
  var r = wt(t);
  return bt(W({}, r, {
    saturation: dr(0, 1, r.saturation - parseFloat(e))
  }));
}
o(e2, "desaturate");
var A8 = ke(e2);
function t2(e, t) {
  if (t === "transparent") return t;
  var r = wt(t);
  return bt(W({}, r, {
    lightness: dr(0, 1, r.lightness + parseFloat(e))
  }));
}
o(t2, "lighten");
var r2 = ke(t2), aa = r2;
function n2(e, t, r) {
  if (t === "transparent") return r;
  if (r === "transparent") return t;
  if (e === 0) return r;
  var n = fr(t), a = W({}, n, {
    alpha: typeof n.alpha == "number" ? n.alpha : 1
  }), i = fr(r), c = W({}, i, {
    alpha: typeof i.alpha == "number" ? i.alpha : 1
  }), l = a.alpha - c.alpha, s = parseFloat(e) * 2 - 1, u = s * l === -1 ? s : s + l, f = 1 + s * l, d = (u / f + 1) / 2, m = 1 - d, v = {
    red: Math.floor(a.red * d + c.red * m),
    green: Math.floor(a.green * d + c.green * m),
    blue: Math.floor(a.blue * d + c.blue * m),
    alpha: a.alpha * parseFloat(e) + c.alpha * (1 - parseFloat(e))
  };
  return _t(v);
}
o(n2, "mix");
var o2 = ke(n2), j0 = o2;
function a2(e, t) {
  if (t === "transparent") return t;
  var r = fr(t), n = typeof r.alpha == "number" ? r.alpha : 1, a = W({}, r, {
    alpha: dr(0, 1, (n * 100 + parseFloat(e) * 100) / 100)
  });
  return _t(a);
}
o(a2, "opacify");
var L8 = ke(a2);
function i2(e, t) {
  if (t === "transparent") return t;
  var r = wt(t);
  return bt(W({}, r, {
    saturation: dr(0, 1, r.saturation + parseFloat(e))
  }));
}
o(i2, "saturate");
var I8 = ke(i2);
function l2(e, t) {
  return t === "transparent" ? t : bt(W({}, wt(t), {
    hue: parseFloat(e)
  }));
}
o(l2, "setHue");
var z8 = ke(l2);
function c2(e, t) {
  return t === "transparent" ? t : bt(W({}, wt(t), {
    lightness: parseFloat(e)
  }));
}
o(c2, "setLightness");
var T8 = ke(c2);
function s2(e, t) {
  return t === "transparent" ? t : bt(W({}, wt(t), {
    saturation: parseFloat(e)
  }));
}
o(s2, "setSaturation");
var H8 = ke(s2);
function u2(e, t) {
  return t === "transparent" ? t : j0(parseFloat(e), "rgb(0, 0, 0)", t);
}
o(u2, "shade");
var P8 = ke(u2);
function f2(e, t) {
  return t === "transparent" ? t : j0(parseFloat(e), "rgb(255, 255, 255)", t);
}
o(f2, "tint");
var k8 = ke(f2);
function d2(e, t) {
  if (t === "transparent") return t;
  var r = fr(t), n = typeof r.alpha == "number" ? r.alpha : 1, a = W({}, r, {
    alpha: dr(0, 1, +(n * 100 - parseFloat(e) * 100).toFixed(2) / 100)
  });
  return _t(a);
}
o(d2, "transparentize");
var p2 = ke(d2), ye = p2;

// src/components/components/typography/lib/common.tsx
var De = /* @__PURE__ */ o(({ theme: e }) => ({
  margin: "20px 0 8px",
  padding: 0,
  cursor: "text",
  position: "relative",
  color: e.color.defaultText,
  "&:first-of-type": {
    marginTop: 0,
    paddingTop: 0
  },
  "&:hover a.anchor": {
    textDecoration: "none"
  },
  "& tt, & code": {
    fontSize: "inherit"
  }
}), "headerCommon"), lt = /* @__PURE__ */ o(({ theme: e }) => ({
  lineHeight: 1,
  margin: "0 2px",
  padding: "3px 5px",
  whiteSpace: "nowrap",
  borderRadius: 3,
  fontSize: e.typography.size.s2 - 1,
  border: e.base === "light" ? `1px solid ${e.color.mediumlight}` : `1px solid ${e.color.darker}`,
  color: e.base === "light" ? ye(0.1, e.color.defaultText) : ye(0.3, e.color.defaultText),
  backgroundColor: e.base === "light" ? e.color.lighter : e.color.border
}), "codeCommon"), N = /* @__PURE__ */ o(({ theme: e }) => ({
  fontFamily: e.typography.fonts.base,
  fontSize: e.typography.size.s3,
  margin: 0,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
  WebkitOverflowScrolling: "touch"
}), "withReset"), Le = {
  margin: "16px 0"
};

// src/components/components/typography/ResetWrapper.tsx
var W0 = m2.div(N);

// src/components/components/typography/elements/A.tsx
import { styled as g2 } from "storybook/theming";

// src/components/components/typography/elements/Link.tsx
import h2 from "react";
var U0 = /* @__PURE__ */ o(({
  href: e = "",
  ...t
}) => {
  let n = /^\//.test(e) ? `./?path=${e}` : e, i = /^#.*/.test(e) ? "_self" : "_top";
  return /* @__PURE__ */ h2.createElement("a", { href: n, target: i, ...t });
}, "Link");

// src/components/components/typography/elements/A.tsx
var ia = g2(U0)(N, ({ theme: e }) => ({
  fontSize: "inherit",
  lineHeight: "24px",
  color: e.color.secondary,
  textDecoration: "none",
  "&.absent": {
    color: "#cc0000"
  },
  "&.anchor": {
    display: "block",
    paddingLeft: 30,
    marginLeft: -30,
    cursor: "pointer",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0
  }
}));

// src/components/components/typography/elements/Blockquote.tsx
import { styled as v2 } from "storybook/theming";
var la = v2.blockquote(N, Le, ({ theme: e }) => ({
  borderLeft: `4px solid ${e.color.medium}`,
  padding: "0 15px",
  color: e.color.dark,
  "& > :first-of-type": {
    marginTop: 0
  },
  "& > :last-child": {
    marginBottom: 0
  }
}));

// src/components/components/typography/elements/Code.tsx
pn();
import U5, { Children as Sh } from "react";
import { styled as q5 } from "storybook/theming";

// src/components/components/typography/lib/isReactChildString.tsx
var W5 = /* @__PURE__ */ o((e) => typeof e == "string", "isReactChildString");

// src/components/components/typography/elements/Code.tsx
var Ch = /[\n\r]/g, Mh = q5.code(
  ({ theme: e }) => ({
    // from reset
    fontFamily: e.typography.fonts.mono,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    display: "inline-block",
    paddingLeft: 2,
    paddingRight: 2,
    verticalAlign: "baseline",
    color: "inherit"
  }),
  lt
), Ah = q5(dn)(({ theme: e }) => ({
  // DocBlocks-specific styling and overrides
  fontFamily: e.typography.fonts.mono,
  fontSize: `${e.typography.size.s2 - 1}px`,
  lineHeight: "19px",
  margin: "25px 0 40px",
  borderRadius: e.appBorderRadius,
  boxShadow: e.base === "light" ? "rgba(0, 0, 0, 0.10) 0 1px 3px 0" : "rgba(0, 0, 0, 0.20) 0 2px 5px 0",
  "pre.prismjs": {
    padding: 20,
    background: "inherit"
  }
})), ci = /* @__PURE__ */ o(({
  className: e,
  children: t,
  ...r
}) => {
  let n = (e || "").match(/lang-(\S+)/), a = Sh.toArray(t);
  return a.filter(W5).some((c) => c.match(Ch)) ? /* @__PURE__ */ U5.createElement(
    Ah,
    {
      bordered: !0,
      copyable: !0,
      language: n?.[1] ?? "text",
      format: !1,
      ...r
    },
    t
  ) : /* @__PURE__ */ U5.createElement(Mh, { ...r, className: e }, a);
}, "Code");

// src/components/components/typography/elements/DL.tsx
import { styled as Lh } from "storybook/theming";
var si = Lh.dl(N, Le, {
  padding: 0,
  "& dt": {
    fontSize: "14px",
    fontWeight: "bold",
    fontStyle: "italic",
    padding: 0,
    margin: "16px 0 4px"
  },
  "& dt:first-of-type": {
    padding: 0
  },
  "& dt > :first-of-type": {
    marginTop: 0
  },
  "& dt > :last-child": {
    marginBottom: 0
  },
  "& dd": {
    margin: "0 0 16px",
    padding: "0 15px"
  },
  "& dd > :first-of-type": {
    marginTop: 0
  },
  "& dd > :last-child": {
    marginBottom: 0
  }
});

// src/components/components/typography/elements/Div.tsx
import { styled as Ih } from "storybook/theming";
var ui = Ih.div(N);

// src/components/components/typography/elements/H1.tsx
import { styled as zh } from "storybook/theming";
var fi = zh.h1(N, De, ({ theme: e }) => ({
  fontSize: `${e.typography.size.l1}px`,
  fontWeight: e.typography.weight.bold
}));

// src/components/components/typography/elements/H2.tsx
import { styled as Th } from "storybook/theming";
var di = Th.h2(N, De, ({ theme: e }) => ({
  fontSize: `${e.typography.size.m2}px`,
  paddingBottom: 4,
  borderBottom: `1px solid ${e.appBorderColor}`
}));

// src/components/components/typography/elements/H3.tsx
import { styled as Hh } from "storybook/theming";
var pi = Hh.h3(N, De, ({ theme: e }) => ({
  fontSize: `${e.typography.size.m1}px`
}));

// src/components/components/typography/elements/H4.tsx
import { styled as Ph } from "storybook/theming";
var mi = Ph.h4(N, De, ({ theme: e }) => ({
  fontSize: `${e.typography.size.s3}px`
}));

// src/components/components/typography/elements/H5.tsx
import { styled as kh } from "storybook/theming";
var hi = kh.h5(N, De, ({ theme: e }) => ({
  fontSize: `${e.typography.size.s2}px`
}));

// src/components/components/typography/elements/H6.tsx
import { styled as Oh } from "storybook/theming";
var gi = Oh.h6(N, De, ({ theme: e }) => ({
  fontSize: `${e.typography.size.s2}px`,
  color: e.color.dark
}));

// src/components/components/typography/elements/HR.tsx
import { styled as Bh } from "storybook/theming";
var vi = Bh.hr(({ theme: e }) => ({
  border: "0 none",
  borderTop: `1px solid ${e.appBorderColor}`,
  height: 4,
  padding: 0
}));

// src/components/components/typography/elements/Img.tsx
import { styled as Nh } from "storybook/theming";
var wi = Nh.img({
  maxWidth: "100%"
});

// src/components/components/typography/elements/LI.tsx
import { styled as Fh } from "storybook/theming";
var bi = Fh.li(N, ({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  color: e.color.defaultText,
  lineHeight: "24px",
  "& + li": {
    marginTop: ".25em"
  },
  "& ul, & ol": {
    marginTop: ".25em",
    marginBottom: 0
  },
  "& code": lt({ theme: e })
}));

// src/components/components/typography/elements/OL.tsx
import { styled as Dh } from "storybook/theming";
var _h = {
  paddingLeft: 30,
  "& :first-of-type": {
    marginTop: 0
  },
  "& :last-child": {
    marginBottom: 0
  }
}, yi = Dh.ol(N, Le, _h, {
  listStyle: "decimal"
});

// src/components/components/typography/elements/P.tsx
import { styled as Vh } from "storybook/theming";
var Ri = Vh.p(N, Le, ({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  lineHeight: "24px",
  color: e.color.defaultText,
  "& code": lt({ theme: e })
}));

// src/components/components/typography/elements/Pre.tsx
import { styled as $h } from "storybook/theming";
var xi = $h.pre(N, Le, ({ theme: e }) => ({
  // reset
  fontFamily: e.typography.fonts.mono,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  lineHeight: "18px",
  padding: "11px 1rem",
  whiteSpace: "pre-wrap",
  color: "inherit",
  borderRadius: 3,
  margin: "1rem 0",
  "&:not(.prismjs)": {
    background: "transparent",
    border: "none",
    borderRadius: 0,
    padding: 0,
    margin: 0
  },
  "& pre, &.prismjs": {
    padding: 15,
    margin: 0,
    whiteSpace: "pre-wrap",
    color: "inherit",
    fontSize: "13px",
    lineHeight: "19px",
    code: {
      color: "inherit",
      fontSize: "inherit"
    }
  },
  "& code": {
    whiteSpace: "pre"
  },
  "& code, & tt": {
    border: "none"
  }
}));

// src/components/components/typography/elements/Span.tsx
import { styled as jh } from "storybook/theming";
var Ei = jh.span(N, ({ theme: e }) => ({
  "&.frame": {
    display: "block",
    overflow: "hidden",
    "& > span": {
      border: `1px solid ${e.color.medium}`,
      display: "block",
      float: "left",
      overflow: "hidden",
      margin: "13px 0 0",
      padding: 7,
      width: "auto"
    },
    "& span img": {
      display: "block",
      float: "left"
    },
    "& span span": {
      clear: "both",
      color: e.color.darkest,
      display: "block",
      padding: "5px 0 0"
    }
  },
  "&.align-center": {
    display: "block",
    overflow: "hidden",
    clear: "both",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px auto 0",
      textAlign: "center"
    },
    "& span img": {
      margin: "0 auto",
      textAlign: "center"
    }
  },
  "&.align-right": {
    display: "block",
    overflow: "hidden",
    clear: "both",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px 0 0",
      textAlign: "right"
    },
    "& span img": {
      margin: 0,
      textAlign: "right"
    }
  },
  "&.float-left": {
    display: "block",
    marginRight: 13,
    overflow: "hidden",
    float: "left",
    "& span": {
      margin: "13px 0 0"
    }
  },
  "&.float-right": {
    display: "block",
    marginLeft: 13,
    overflow: "hidden",
    float: "right",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px auto 0",
      textAlign: "right"
    }
  }
}));

// src/components/components/typography/elements/TT.tsx
import { styled as Wh } from "storybook/theming";
var Si = Wh.title(lt);

// src/components/components/typography/elements/Table.tsx
import { styled as Uh } from "storybook/theming";
var Ci = Uh.table(N, Le, ({ theme: e }) => ({
  fontSize: e.typography.size.s2,
  lineHeight: "24px",
  padding: 0,
  borderCollapse: "collapse",
  "& tr": {
    borderTop: `1px solid ${e.appBorderColor}`,
    backgroundColor: e.appContentBg,
    margin: 0,
    padding: 0
  },
  "& tr:nth-of-type(2n)": {
    backgroundColor: e.base === "dark" ? e.color.darker : e.color.lighter
  },
  "& tr th": {
    fontWeight: "bold",
    color: e.color.defaultText,
    border: `1px solid ${e.appBorderColor}`,
    margin: 0,
    padding: "6px 13px"
  },
  "& tr td": {
    border: `1px solid ${e.appBorderColor}`,
    color: e.color.defaultText,
    margin: 0,
    padding: "6px 13px"
  },
  "& tr th :first-of-type, & tr td :first-of-type": {
    marginTop: 0
  },
  "& tr th :last-child, & tr td :last-child": {
    marginBottom: 0
  }
}));

// src/components/components/typography/elements/UL.tsx
import { styled as qh } from "storybook/theming";
var Gh = {
  paddingLeft: 30,
  "& :first-of-type": {
    marginTop: 0
  },
  "& :last-child": {
    marginBottom: 0
  }
}, Mi = qh.ul(N, Le, Gh, { listStyle: "disc" });

// src/components/components/typography/components.tsx
var Ai = {
  h1: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(fi, { ...J(e, "h1") }), "h1"),
  h2: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(di, { ...J(e, "h2") }), "h2"),
  h3: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(pi, { ...J(e, "h3") }), "h3"),
  h4: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(mi, { ...J(e, "h4") }), "h4"),
  h5: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(hi, { ...J(e, "h5") }), "h5"),
  h6: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(gi, { ...J(e, "h6") }), "h6"),
  pre: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(xi, { ...J(e, "pre") }), "pre"),
  a: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(ia, { ...J(e, "a") }), "a"),
  hr: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(vi, { ...J(e, "hr") }), "hr"),
  dl: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(si, { ...J(e, "dl") }), "dl"),
  blockquote: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(la, { ...J(e, "blockquote") }), "blockquote"),
  table: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(Ci, { ...J(e, "table") }), "table"),
  img: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(wi, { ...J(e, "img") }), "img"),
  div: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(ui, { ...J(e, "div") }), "div"),
  span: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(Ei, { ...J(e, "span") }), "span"),
  li: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(bi, { ...J(e, "li") }), "li"),
  ul: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(Mi, { ...J(e, "ul") }), "ul"),
  ol: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(yi, { ...J(e, "ol") }), "ol"),
  p: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(Ri, { ...J(e, "p") }), "p"),
  code: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(ci, { ...J(e, "code") }), "code"),
  tt: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(Si, { ...J(e, "tt") }), "tt"),
  resetwrapper: /* @__PURE__ */ o((e) => /* @__PURE__ */ ee.createElement(W0, { ...J(e, "resetwrapper") }), "resetwrapper")
};

// src/components/components/Badge/Badge.tsx
import Xh from "react";
import { styled as Zh } from "storybook/theming";
var Kh = Zh.div(
  ({ theme: e, compact: t }) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: e.typography.size.s1,
    fontWeight: e.typography.weight.bold,
    lineHeight: "12px",
    minWidth: 20,
    borderRadius: 20,
    padding: t ? "4px 7px" : "4px 10px"
  }),
  {
    svg: {
      height: 12,
      width: 12,
      marginRight: 4,
      marginTop: -2,
      path: {
        fill: "currentColor"
      }
    }
  },
  ({ theme: e, status: t }) => {
    switch (t) {
      case "critical":
        return {
          color: e.color.critical,
          background: e.background.critical
        };
      case "negative":
        return {
          color: e.color.negativeText,
          background: e.background.negative,
          boxShadow: e.base === "light" ? `inset 0 0 0 1px ${ye(0.9, e.color.negativeText)}` : "none"
        };
      case "warning":
        return {
          color: e.color.warningText,
          background: e.background.warning,
          boxShadow: e.base === "light" ? `inset 0 0 0 1px ${ye(0.9, e.color.warningText)}` : "none"
        };
      case "neutral":
        return {
          color: e.textMutedColor,
          background: e.base === "light" ? e.background.app : e.barBg,
          boxShadow: `inset 0 0 0 1px ${ye(0.8, e.textMutedColor)}`
        };
      case "positive":
        return {
          color: e.color.positiveText,
          background: e.background.positive,
          boxShadow: e.base === "light" ? `inset 0 0 0 1px ${ye(0.9, e.color.positiveText)}` : "none"
        };
      case "active":
        return {
          color: e.color.secondary,
          background: e.background.hoverable,
          boxShadow: `inset 0 0 0 1px ${ye(0.9, e.color.secondary)}`
        };
      default:
        return {};
    }
  }
), Jh = /* @__PURE__ */ o(({ ...e }) => /* @__PURE__ */ Xh.createElement(Kh, { ...e }), "Badge");

// src/components/components/typography/link/link.tsx
import Li from "react";

// ../node_modules/@storybook/icons/dist/index.mjs
import * as Ze from "react";
var G5 = /* @__PURE__ */ Ze.forwardRef(({ color: e = "currentColor", size: t = 14, ...r }, n) => /* @__PURE__ */ Ze.createElement(
  "svg",
  {
    width: t,
    height: t,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ref: n,
    ...r
  },
  /* @__PURE__ */ Ze.createElement(
    "path",
    {
      d: "M10.139 8.725l1.36-1.323a.568.568 0 00.151-.54.534.534 0 00-.377-.396l-2.705-.708 2.22-4.976a.568.568 0 00-.15-.666.497.497 0 00-.\
648.008L5.464 4.05l.708.71 2.848-2.47-1.64 3.677.697.697 2.164.567-.81.787.708.708zM2.523 6.6a.566.566 0 00-.177.544.534.534 0 00.382.41l2.7\
82.721-1.494 5.013a.563.563 0 00.217.627.496.496 0 00.629-.06l3.843-3.736-.708-.707-2.51 2.44 1.137-3.814-.685-.685-2.125-.55.844-.731-.71-.\
71L2.524 6.6zM1.854 1.146a.5.5 0 10-.708.708l11 11a.5.5 0 00.708-.708l-11-11z",
      fill: e
    }
  )
));
var Y5 = /* @__PURE__ */ Ze.forwardRef(({ color: e = "currentColor", size: t = 14, ...r }, n) => /* @__PURE__ */ Ze.createElement(
  "svg",
  {
    width: t,
    height: t,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ref: n,
    ...r
  },
  /* @__PURE__ */ Ze.createElement(
    "path",
    {
      d: "M1.854 1.146a.5.5 0 10-.708.708L6.293 7l-5.147 5.146a.5.5 0 00.708.708L7 7.707l5.146 5.147a.5.5 0 00.708-.708L7.707 7l5.147-5.146a\
.5.5 0 00-.708-.708L7 6.293 1.854 1.146z",
      fill: e
    }
  )
));
var X5 = /* @__PURE__ */ Ze.forwardRef(({ color: e = "currentColor", size: t = 14, ...r }, n) => /* @__PURE__ */ Ze.createElement(
  "svg",
  {
    width: t,
    height: t,
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ref: n,
    ...r
  },
  /* @__PURE__ */ Ze.createElement(
    "path",
    {
      d: "M11.104 7.354l-5.5 5.5a.5.5 0 01-.708-.708L10.043 7 4.896 1.854a.5.5 0 11.708-.708l5.5 5.5a.5.5 0 010 .708z",
      fill: e
    }
  )
));

// src/components/components/typography/link/link.tsx
import { styled as Z5 } from "storybook/theming";
var Qh = 0, eg = /* @__PURE__ */ o((e) => e.button === Qh && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey, "isPlainLeftClick"), tg = /* @__PURE__ */ o(
(e, t) => {
  eg(e) && (e.preventDefault(), t(e));
}, "cancelled"), rg = Z5.span(
  ({ withArrow: e }) => e ? {
    "> svg:last-of-type": {
      height: "0.7em",
      width: "0.7em",
      marginRight: 0,
      marginLeft: "0.25em",
      bottom: "auto",
      verticalAlign: "inherit"
    }
  } : {},
  ({ containsIcon: e }) => e ? {
    svg: {
      height: "1em",
      width: "1em",
      verticalAlign: "middle",
      position: "relative",
      bottom: 0,
      marginRight: 0
    }
  } : {}
), ng = Z5.a(
  ({ theme: e }) => ({
    display: "inline-block",
    transition: "all 150ms ease-out",
    textDecoration: "none",
    color: e.color.secondary,
    "&:hover, &:focus": {
      cursor: "pointer",
      color: yt(0.07, e.color.secondary),
      "svg path:not([fill])": {
        fill: yt(0.07, e.color.secondary)
      }
    },
    "&:active": {
      color: yt(0.1, e.color.secondary),
      "svg path:not([fill])": {
        fill: yt(0.1, e.color.secondary)
      }
    },
    svg: {
      display: "inline-block",
      height: "1em",
      width: "1em",
      verticalAlign: "text-top",
      position: "relative",
      bottom: "-0.125em",
      marginRight: "0.4em",
      "& path": {
        fill: e.color.secondary
      }
    }
  }),
  ({ theme: e, secondary: t, tertiary: r }) => {
    let n;
    return t && (n = [e.textMutedColor, e.color.dark, e.color.darker]), r && (n = [e.color.dark, e.color.darkest, e.textMutedColor]), n ? {
      color: n[0],
      "svg path:not([fill])": {
        fill: n[0]
      },
      "&:hover": {
        color: n[1],
        "svg path:not([fill])": {
          fill: n[1]
        }
      },
      "&:active": {
        color: n[2],
        "svg path:not([fill])": {
          fill: n[2]
        }
      }
    } : {};
  },
  ({ nochrome: e }) => e ? {
    color: "inherit",
    "&:hover, &:active": {
      color: "inherit",
      textDecoration: "underline"
    }
  } : {},
  ({ theme: e, inverse: t }) => t ? {
    color: e.color.lightest,
    ":not([fill])": {
      fill: e.color.lightest
    },
    "&:hover": {
      color: e.color.lighter,
      "svg path:not([fill])": {
        fill: e.color.lighter
      }
    },
    "&:active": {
      color: e.color.light,
      "svg path:not([fill])": {
        fill: e.color.light
      }
    }
  } : {},
  ({ isButton: e }) => e ? {
    border: 0,
    borderRadius: 0,
    background: "none",
    padding: 0,
    fontSize: "inherit"
  } : {}
), Ii = /* @__PURE__ */ o(({
  cancel: e = !0,
  children: t,
  onClick: r = void 0,
  withArrow: n = !1,
  containsIcon: a = !1,
  className: i = void 0,
  style: c = void 0,
  ...l
}) => /* @__PURE__ */ Li.createElement(
  ng,
  {
    ...l,
    onClick: r && e ? (s) => tg(s, r) : r,
    className: i
  },
  /* @__PURE__ */ Li.createElement(rg, { withArrow: n, containsIcon: a }, t, n && /* @__PURE__ */ Li.createElement(X5, null))
), "Link");

// src/components/components/typography/DocumentWrapper.tsx
import { styled as og } from "storybook/theming";
var ag = og.div(({ theme: e }) => ({
  fontSize: `${e.typography.size.s2}px`,
  lineHeight: "1.6",
  h1: {
    fontSize: `${e.typography.size.l1}px`,
    fontWeight: e.typography.weight.bold
  },
  h2: {
    fontSize: `${e.typography.size.m2}px`,
    borderBottom: `1px solid ${e.appBorderColor}`
  },
  h3: {
    fontSize: `${e.typography.size.m1}px`
  },
  h4: {
    fontSize: `${e.typography.size.s3}px`
  },
  h5: {
    fontSize: `${e.typography.size.s2}px`
  },
  h6: {
    fontSize: `${e.typography.size.s2}px`,
    color: e.color.dark
  },
  "pre:not(.prismjs)": {
    background: "transparent",
    border: "none",
    borderRadius: 0,
    padding: 0,
    margin: 0
  },
  "pre pre, pre.prismjs": {
    padding: 15,
    margin: 0,
    whiteSpace: "pre-wrap",
    color: "inherit",
    fontSize: "13px",
    lineHeight: "19px"
  },
  "pre pre code, pre.prismjs code": {
    color: "inherit",
    fontSize: "inherit"
  },
  "pre code": {
    margin: 0,
    padding: 0,
    whiteSpace: "pre",
    border: "none",
    background: "transparent"
  },
  "pre code, pre tt": {
    backgroundColor: "transparent",
    border: "none"
  },
  /* GitHub inspired Markdown styles loosely from https://gist.github.com/tuzz/3331384 */
  "body > *:first-of-type": {
    marginTop: "0 !important"
  },
  "body > *:last-child": {
    marginBottom: "0 !important"
  },
  a: {
    color: e.color.secondary,
    textDecoration: "none"
  },
  "a.absent": {
    color: "#cc0000"
  },
  "a.anchor": {
    display: "block",
    paddingLeft: 30,
    marginLeft: -30,
    cursor: "pointer",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0
  },
  "h1, h2, h3, h4, h5, h6": {
    margin: "20px 0 10px",
    padding: 0,
    cursor: "text",
    position: "relative",
    "&:first-of-type": {
      marginTop: 0,
      paddingTop: 0
    },
    "&:hover a.anchor": {
      textDecoration: "none"
    },
    "& tt, & code": {
      fontSize: "inherit"
    }
  },
  "h1:first-of-type + h2": {
    marginTop: 0,
    paddingTop: 0
  },
  "p, blockquote, ul, ol, dl, li, table, pre": {
    margin: "15px 0"
  },
  hr: {
    border: "0 none",
    borderTop: `1px solid ${e.appBorderColor}`,
    height: 4,
    padding: 0
  },
  "body > h1:first-of-type, body > h2:first-of-type, body > h3:first-of-type, body > h4:first-of-type, body > h5:first-of-type, body > h6:fi\
rst-of-type": {
    marginTop: 0,
    paddingTop: 0
  },
  "body > h1:first-of-type + h2": {
    marginTop: 0,
    paddingTop: 0
  },
  "a:first-of-type h1, a:first-of-type h2, a:first-of-type h3, a:first-of-type h4, a:first-of-type h5, a:first-of-type h6": {
    marginTop: 0,
    paddingTop: 0
  },
  "h1 p, h2 p, h3 p, h4 p, h5 p, h6 p": {
    marginTop: 0
  },
  "li p.first": {
    display: "inline-block"
  },
  "ul, ol": {
    paddingLeft: 30,
    "& :first-of-type": {
      marginTop: 0
    },
    "& :last-child": {
      marginBottom: 0
    }
  },
  dl: {
    padding: 0
  },
  "dl dt": {
    fontSize: "14px",
    fontWeight: "bold",
    fontStyle: "italic",
    margin: "0 0 15px",
    padding: "0 15px",
    "&:first-of-type": {
      padding: 0
    },
    "& > :first-of-type": {
      marginTop: 0
    },
    "& > :last-child": {
      marginBottom: 0
    }
  },
  blockquote: {
    borderLeft: `4px solid ${e.color.medium}`,
    padding: "0 15px",
    color: e.color.dark,
    "& > :first-of-type": {
      marginTop: 0
    },
    "& > :last-child": {
      marginBottom: 0
    }
  },
  table: {
    padding: 0,
    borderCollapse: "collapse",
    "& tr": {
      borderTop: `1px solid ${e.appBorderColor}`,
      backgroundColor: "white",
      margin: 0,
      padding: 0,
      "& th": {
        fontWeight: "bold",
        border: `1px solid ${e.appBorderColor}`,
        textAlign: "left",
        margin: 0,
        padding: "6px 13px"
      },
      "& td": {
        border: `1px solid ${e.appBorderColor}`,
        textAlign: "left",
        margin: 0,
        padding: "6px 13px"
      },
      "&:nth-of-type(2n)": {
        backgroundColor: e.color.lighter
      },
      "& th :first-of-type, & td :first-of-type": {
        marginTop: 0
      },
      "& th :last-child, & td :last-child": {
        marginBottom: 0
      }
    }
  },
  img: {
    maxWidth: "100%"
  },
  "span.frame": {
    display: "block",
    overflow: "hidden",
    "& > span": {
      border: `1px solid ${e.color.medium}`,
      display: "block",
      float: "left",
      overflow: "hidden",
      margin: "13px 0 0",
      padding: 7,
      width: "auto"
    },
    "& span img": {
      display: "block",
      float: "left"
    },
    "& span span": {
      clear: "both",
      color: e.color.darkest,
      display: "block",
      padding: "5px 0 0"
    }
  },
  "span.align-center": {
    display: "block",
    overflow: "hidden",
    clear: "both",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px auto 0",
      textAlign: "center"
    },
    "& span img": {
      margin: "0 auto",
      textAlign: "center"
    }
  },
  "span.align-right": {
    display: "block",
    overflow: "hidden",
    clear: "both",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px 0 0",
      textAlign: "right"
    },
    "& span img": {
      margin: 0,
      textAlign: "right"
    }
  },
  "span.float-left": {
    display: "block",
    marginRight: 13,
    overflow: "hidden",
    float: "left",
    "& span": {
      margin: "13px 0 0"
    }
  },
  "span.float-right": {
    display: "block",
    marginLeft: 13,
    overflow: "hidden",
    float: "right",
    "& > span": {
      display: "block",
      overflow: "hidden",
      margin: "13px auto 0",
      textAlign: "right"
    }
  },
  "code, tt": {
    margin: "0 2px",
    padding: "0 5px",
    whiteSpace: "nowrap",
    border: `1px solid ${e.color.mediumlight}`,
    backgroundColor: e.color.lighter,
    borderRadius: 3,
    color: e.base === "dark" ? e.color.darkest : e.color.dark
  }
}));

// src/components/components/syntaxhighlighter/lazy-syntaxhighlighter.tsx
import Sr, { Suspense as lg, lazy as ru } from "react";
var Gt = [], Cr = null, cg = ru(async () => {
  let { SyntaxHighlighter: e } = await Promise.resolve().then(() => (pn(), li));
  return Gt.length > 0 && (Gt.forEach((t) => {
    e.registerLanguage(...t);
  }), Gt = []), Cr === null && (Cr = e), {
    default: /* @__PURE__ */ o((t) => /* @__PURE__ */ Sr.createElement(e, { ...t }), "default")
  };
}), sg = ru(async () => {
  let [{ SyntaxHighlighter: e }, { formatter: t }] = await Promise.all([
    Promise.resolve().then(() => (pn(), li)),
    Promise.resolve().then(() => (tu(), eu))
  ]);
  return Gt.length > 0 && (Gt.forEach((r) => {
    e.registerLanguage(...r);
  }), Gt = []), Cr === null && (Cr = e), {
    default: /* @__PURE__ */ o((r) => /* @__PURE__ */ Sr.createElement(e, { ...r, formatter: t }), "default")
  };
}), nu = /* @__PURE__ */ o((e) => /* @__PURE__ */ Sr.createElement(lg, { fallback: /* @__PURE__ */ Sr.createElement("div", null) }, e.format !==
!1 ? /* @__PURE__ */ Sr.createElement(sg, { ...e }) : /* @__PURE__ */ Sr.createElement(cg, { ...e })), "SyntaxHighlighter");
nu.registerLanguage = (...e) => {
  if (Cr !== null) {
    Cr.registerLanguage(...e);
    return;
  }
  Gt.push(e);
};

// src/components/index.ts
pn();
Ka();

// src/components/components/Modal/Modal.tsx
import Pr from "react";

// ../node_modules/@radix-ui/react-dialog/dist/index.mjs
var Eo = {};
Qr(Eo, {
  Close: () => gl,
  Content: () => pl,
  Description: () => hl,
  Dialog: () => Qi,
  DialogClose: () => cl,
  DialogContent: () => ol,
  DialogDescription: () => ll,
  DialogOverlay: () => nl,
  DialogPortal: () => rl,
  DialogTitle: () => il,
  DialogTrigger: () => el,
  Overlay: () => dl,
  Portal: () => fl,
  Root: () => ul,
  Title: () => ml,
  Trigger: () => Tv,
  WarningProvider: () => Av,
  createDialogScope: () => yv
});
import * as q from "react";

// ../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/primitive/dist/index.mjs
function Mr(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ o(function(a) {
    if (e?.(a), r === !1 || !a.defaultPrevented)
      return t?.(a);
  }, "handleEvent");
}
o(Mr, "composeEventHandlers");

// ../node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as au from "react";
function ou(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
o(ou, "setRef");
function Yt(...e) {
  return (t) => {
    let r = !1, n = e.map((a) => {
      let i = ou(a, t);
      return !r && typeof i == "function" && (r = !0), i;
    });
    if (r)
      return () => {
        for (let a = 0; a < n.length; a++) {
          let i = n[a];
          typeof i == "function" ? i() : ou(e[a], null);
        }
      };
  };
}
o(Yt, "composeRefs");
function Ke(...e) {
  return au.useCallback(Yt(...e), e);
}
o(Ke, "useComposedRefs");

// ../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-context/dist/index.mjs
import * as je from "react";
import { jsx as iu } from "react/jsx-runtime";
function lu(e, t) {
  let r = je.createContext(t), n = /* @__PURE__ */ o((i) => {
    let { children: c, ...l } = i, s = je.useMemo(() => l, Object.values(l));
    return /* @__PURE__ */ iu(r.Provider, { value: s, children: c });
  }, "Provider");
  n.displayName = e + "Provider";
  function a(i) {
    let c = je.useContext(r);
    if (c) return c;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return o(a, "useContext2"), [n, a];
}
o(lu, "createContext2");
function cu(e, t = []) {
  let r = [];
  function n(i, c) {
    let l = je.createContext(c), s = r.length;
    r = [...r, c];
    let u = /* @__PURE__ */ o((d) => {
      let { scope: m, children: v, ...y } = d, p = m?.[e]?.[s] || l, h = je.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ iu(p.Provider, { value: h, children: v });
    }, "Provider");
    u.displayName = i + "Provider";
    function f(d, m) {
      let v = m?.[e]?.[s] || l, y = je.useContext(v);
      if (y) return y;
      if (c !== void 0) return c;
      throw new Error(`\`${d}\` must be used within \`${i}\``);
    }
    return o(f, "useContext2"), [u, f];
  }
  o(n, "createContext3");
  let a = /* @__PURE__ */ o(() => {
    let i = r.map((c) => je.createContext(c));
    return /* @__PURE__ */ o(function(l) {
      let s = l?.[e] || i;
      return je.useMemo(
        () => ({ [`__scope${e}`]: { ...l, [e]: s } }),
        [l, s]
      );
    }, "useScope");
  }, "createScope");
  return a.scopeName = e, [n, ug(a, ...t)];
}
o(cu, "createContextScope");
function ug(...e) {
  let t = e[0];
  if (e.length === 1) return t;
  let r = /* @__PURE__ */ o(() => {
    let n = e.map((a) => ({
      useScope: a(),
      scopeName: a.scopeName
    }));
    return /* @__PURE__ */ o(function(i) {
      let c = n.reduce((l, { useScope: s, scopeName: u }) => {
        let d = s(i)[`__scope${u}`];
        return { ...l, ...d };
      }, {});
      return je.useMemo(() => ({ [`__scope${t.scopeName}`]: c }), [c]);
    }, "useComposedScopes");
  }, "createScope");
  return r.scopeName = t.scopeName, r;
}
o(ug, "composeContextScopes");

// ../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-id/dist/index.mjs
import * as zi from "react";

// ../node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
import * as su from "react";
var ut = globalThis?.document ? su.useLayoutEffect : () => {
};

// ../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-id/dist/index.mjs
var fg = zi[" useId ".trim().toString()] || (() => {
}), dg = 0;
function lo(e) {
  let [t, r] = zi.useState(fg());
  return ut(() => {
    e || r((n) => n ?? String(dg++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
o(lo, "useId");

// ../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
import * as We from "react";
import * as co from "react";
var pg = We[" useInsertionEffect ".trim().toString()] || ut;
function uu({
  prop: e,
  defaultProp: t,
  onChange: r = /* @__PURE__ */ o(() => {
  }, "onChange"),
  caller: n
}) {
  let [a, i, c] = mg({
    defaultProp: t,
    onChange: r
  }), l = e !== void 0, s = l ? e : a;
  {
    let f = We.useRef(e !== void 0);
    We.useEffect(() => {
      let d = f.current;
      d !== l && console.warn(
        `${n} is changing from ${d ? "controlled" : "uncontrolled"} to ${l ? "controlled" : "uncontrolled"}. Components should not switch fr\
om controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), f.current = l;
    }, [l, n]);
  }
  let u = We.useCallback(
    (f) => {
      if (l) {
        let d = hg(f) ? f(e) : f;
        d !== e && c.current?.(d);
      } else
        i(f);
    },
    [l, e, i, c]
  );
  return [s, u];
}
o(uu, "useControllableState");
function mg({
  defaultProp: e,
  onChange: t
}) {
  let [r, n] = We.useState(e), a = We.useRef(r), i = We.useRef(t);
  return pg(() => {
    i.current = t;
  }, [t]), We.useEffect(() => {
    a.current !== r && (i.current?.(r), a.current = r);
  }, [r, a]), [r, n, i];
}
o(mg, "useUncontrolledState");
function hg(e) {
  return typeof e == "function";
}
o(hg, "isFunction");
var fS = Symbol("RADIX:SYNC_STATE");

// ../node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import * as Q from "react";

// ../node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/primitive/dist/index.mjs
function so(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return /* @__PURE__ */ o(function(a) {
    if (e?.(a), r === !1 || !a.defaultPrevented)
      return t?.(a);
  }, "handleEvent");
}
o(so, "composeEventHandlers");

// ../node_modules/@radix-ui/react-primitive/dist/index.mjs
import * as pu from "react";
import * as mu from "react-dom";

// ../node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot/dist/index.mjs
import * as ie from "react";
import { Fragment as wS, jsx as fu } from "react/jsx-runtime";
// @__NO_SIDE_EFFECTS__
function du(e) {
  let t = /* @__PURE__ */ gg(e), r = ie.forwardRef((n, a) => {
    let { children: i, ...c } = n, l = ie.Children.toArray(i), s = l.find(wg);
    if (s) {
      let u = s.props.children, f = l.map((d) => d === s ? ie.Children.count(u) > 1 ? ie.Children.only(null) : ie.isValidElement(u) ? u.props.
      children : null : d);
      return /* @__PURE__ */ fu(t, { ...c, ref: a, children: ie.isValidElement(u) ? ie.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ fu(t, { ...c, ref: a, children: i });
  });
  return r.displayName = `${e}.Slot`, r;
}
o(du, "createSlot");
// @__NO_SIDE_EFFECTS__
function gg(e) {
  let t = ie.forwardRef((r, n) => {
    let { children: a, ...i } = r;
    if (ie.isValidElement(a)) {
      let c = yg(a), l = bg(i, a.props);
      return a.type !== ie.Fragment && (l.ref = n ? Yt(n, c) : c), ie.cloneElement(a, l);
    }
    return ie.Children.count(a) > 1 ? ie.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
o(gg, "createSlotClone");
var vg = Symbol("radix.slottable");
function wg(e) {
  return ie.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === vg;
}
o(wg, "isSlottable");
function bg(e, t) {
  let r = { ...t };
  for (let n in t) {
    let a = e[n], i = t[n];
    /^on[A-Z]/.test(n) ? a && i ? r[n] = (...l) => {
      i(...l), a(...l);
    } : a && (r[n] = a) : n === "style" ? r[n] = { ...a, ...i } : n === "className" && (r[n] = [a, i].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
o(bg, "mergeProps");
function yg(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref :
  e.props.ref || e.ref);
}
o(yg, "getElementRef");

// ../node_modules/@radix-ui/react-primitive/dist/index.mjs
import { jsx as Rg } from "react/jsx-runtime";
var xg = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Oe = xg.reduce((e, t) => {
  let r = du(`Primitive.${t}`), n = pu.forwardRef((a, i) => {
    let { asChild: c, ...l } = a, s = c ? r : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ Rg(s, { ...l, ref: i });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function hu(e, t) {
  e && mu.flushSync(() => e.dispatchEvent(t));
}
o(hu, "dispatchDiscreteCustomEvent");

// ../node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
import * as Ar from "react";
function Mt(e) {
  let t = Ar.useRef(e);
  return Ar.useEffect(() => {
    t.current = e;
  }), Ar.useMemo(() => (...r) => t.current?.(...r), []);
}
o(Mt, "useCallbackRef");

// ../node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
import * as gu from "react";
function vu(e, t = globalThis?.document) {
  let r = Mt(e);
  gu.useEffect(() => {
    let n = /* @__PURE__ */ o((a) => {
      a.key === "Escape" && r(a);
    }, "handleKeyDown");
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
o(vu, "useEscapeKeydown");

// ../node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
import { jsx as yu } from "react/jsx-runtime";
var Eg = "DismissableLayer", Ti = "dismissableLayer.update", Sg = "dismissableLayer.pointerDownOutside", Cg = "dismissableLayer.focusOutside",
wu, Ru = Q.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Hi = Q.forwardRef(
  (e, t) => {
    let {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: a,
      onFocusOutside: i,
      onInteractOutside: c,
      onDismiss: l,
      ...s
    } = e, u = Q.useContext(Ru), [f, d] = Q.useState(null), m = f?.ownerDocument ?? globalThis?.document, [, v] = Q.useState({}), y = Ke(t, (S) => d(
    S)), p = Array.from(u.layers), [h] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), g = p.indexOf(h), w = f ? p.indexOf(f) : -1,
    b = u.layersWithOutsidePointerEventsDisabled.size > 0, x = w >= g, E = Lg((S) => {
      let A = S.target, M = [...u.branches].some((L) => L.contains(A));
      !x || M || (a?.(S), c?.(S), S.defaultPrevented || l?.());
    }, m), R = Ig((S) => {
      let A = S.target;
      [...u.branches].some((L) => L.contains(A)) || (i?.(S), c?.(S), S.defaultPrevented || l?.());
    }, m);
    return vu((S) => {
      w === u.layers.size - 1 && (n?.(S), !S.defaultPrevented && l && (S.preventDefault(), l()));
    }, m), Q.useEffect(() => {
      if (f)
        return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (wu = m.body.style.pointerEvents, m.body.style.pointerEvents = "\
none"), u.layersWithOutsidePointerEventsDisabled.add(f)), u.layers.add(f), bu(), () => {
          r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = wu);
        };
    }, [f, m, r, u]), Q.useEffect(() => () => {
      f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), bu());
    }, [f, u]), Q.useEffect(() => {
      let S = /* @__PURE__ */ o(() => v({}), "handleUpdate");
      return document.addEventListener(Ti, S), () => document.removeEventListener(Ti, S);
    }, []), /* @__PURE__ */ yu(
      Oe.div,
      {
        ...s,
        ref: y,
        style: {
          pointerEvents: b ? x ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: so(e.onFocusCapture, R.onFocusCapture),
        onBlurCapture: so(e.onBlurCapture, R.onBlurCapture),
        onPointerDownCapture: so(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
Hi.displayName = Eg;
var Mg = "DismissableLayerBranch", Ag = Q.forwardRef((e, t) => {
  let r = Q.useContext(Ru), n = Q.useRef(null), a = Ke(t, n);
  return Q.useEffect(() => {
    let i = n.current;
    if (i)
      return r.branches.add(i), () => {
        r.branches.delete(i);
      };
  }, [r.branches]), /* @__PURE__ */ yu(Oe.div, { ...e, ref: a });
});
Ag.displayName = Mg;
function Lg(e, t = globalThis?.document) {
  let r = Mt(e), n = Q.useRef(!1), a = Q.useRef(() => {
  });
  return Q.useEffect(() => {
    let i = /* @__PURE__ */ o((l) => {
      if (l.target && !n.current) {
        let u = /* @__PURE__ */ o(function() {
          xu(
            Sg,
            r,
            f,
            { discrete: !0 }
          );
        }, "handleAndDispatchPointerDownOutsideEvent2");
        var s = u;
        let f = { originalEvent: l };
        l.pointerType === "touch" ? (t.removeEventListener("click", a.current), a.current = u, t.addEventListener("click", a.current, { once: !0 })) :
        u();
      } else
        t.removeEventListener("click", a.current);
      n.current = !1;
    }, "handlePointerDown"), c = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(c), t.removeEventListener("pointerdown", i), t.removeEventListener("click", a.current);
    };
  }, [t, r]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ o(() => n.current = !0, "onPointerDownCapture")
  };
}
o(Lg, "usePointerDownOutside");
function Ig(e, t = globalThis?.document) {
  let r = Mt(e), n = Q.useRef(!1);
  return Q.useEffect(() => {
    let a = /* @__PURE__ */ o((i) => {
      i.target && !n.current && xu(Cg, r, { originalEvent: i }, {
        discrete: !1
      });
    }, "handleFocus");
    return t.addEventListener("focusin", a), () => t.removeEventListener("focusin", a);
  }, [t, r]), {
    onFocusCapture: /* @__PURE__ */ o(() => n.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ o(() => n.current = !1, "onBlurCapture")
  };
}
o(Ig, "useFocusOutside");
function bu() {
  let e = new CustomEvent(Ti);
  document.dispatchEvent(e);
}
o(bu, "dispatchUpdate");
function xu(e, t, r, { discrete: n }) {
  let a = r.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && a.addEventListener(e, t, { once: !0 }), n ? hu(a, i) : a.dispatchEvent(i);
}
o(xu, "handleAndDispatchCustomEvent");

// ../node_modules/@radix-ui/react-focus-scope/dist/index.mjs
import * as Ue from "react";
import { jsx as zg } from "react/jsx-runtime";
var Pi = "focusScope.autoFocusOnMount", ki = "focusScope.autoFocusOnUnmount", Eu = { bubbles: !1, cancelable: !0 }, Tg = "FocusScope", Oi = Ue.forwardRef(
(e, t) => {
  let {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: a,
    onUnmountAutoFocus: i,
    ...c
  } = e, [l, s] = Ue.useState(null), u = Mt(a), f = Mt(i), d = Ue.useRef(null), m = Ke(t, (p) => s(p)), v = Ue.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  Ue.useEffect(() => {
    if (n) {
      let w = /* @__PURE__ */ o(function(R) {
        if (v.paused || !l) return;
        let S = R.target;
        l.contains(S) ? d.current = S : At(d.current, { select: !0 });
      }, "handleFocusIn2"), b = /* @__PURE__ */ o(function(R) {
        if (v.paused || !l) return;
        let S = R.relatedTarget;
        S !== null && (l.contains(S) || At(d.current, { select: !0 }));
      }, "handleFocusOut2"), x = /* @__PURE__ */ o(function(R) {
        if (document.activeElement === document.body)
          for (let A of R)
            A.removedNodes.length > 0 && At(l);
      }, "handleMutations2");
      var p = w, h = b, g = x;
      document.addEventListener("focusin", w), document.addEventListener("focusout", b);
      let E = new MutationObserver(x);
      return l && E.observe(l, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", w), document.removeEventListener("focusout", b), E.disconnect();
      };
    }
  }, [n, l, v.paused]), Ue.useEffect(() => {
    if (l) {
      Cu.add(v);
      let p = document.activeElement;
      if (!l.contains(p)) {
        let g = new CustomEvent(Pi, Eu);
        l.addEventListener(Pi, u), l.dispatchEvent(g), g.defaultPrevented || (Hg(Ng(Au(l)), { select: !0 }), document.activeElement === p &&
        At(l));
      }
      return () => {
        l.removeEventListener(Pi, u), setTimeout(() => {
          let g = new CustomEvent(ki, Eu);
          l.addEventListener(ki, f), l.dispatchEvent(g), g.defaultPrevented || At(p ?? document.body, { select: !0 }), l.removeEventListener(
          ki, f), Cu.remove(v);
        }, 0);
      };
    }
  }, [l, u, f, v]);
  let y = Ue.useCallback(
    (p) => {
      if (!r && !n || v.paused) return;
      let h = p.key === "Tab" && !p.altKey && !p.ctrlKey && !p.metaKey, g = document.activeElement;
      if (h && g) {
        let w = p.currentTarget, [b, x] = Pg(w);
        b && x ? !p.shiftKey && g === x ? (p.preventDefault(), r && At(b, { select: !0 })) : p.shiftKey && g === b && (p.preventDefault(), r &&
        At(x, { select: !0 })) : g === w && p.preventDefault();
      }
    },
    [r, n, v.paused]
  );
  return /* @__PURE__ */ zg(Oe.div, { tabIndex: -1, ...c, ref: m, onKeyDown: y });
});
Oi.displayName = Tg;
function Hg(e, { select: t = !1 } = {}) {
  let r = document.activeElement;
  for (let n of e)
    if (At(n, { select: t }), document.activeElement !== r) return;
}
o(Hg, "focusFirst");
function Pg(e) {
  let t = Au(e), r = Su(t, e), n = Su(t.reverse(), e);
  return [r, n];
}
o(Pg, "getTabbableEdges");
function Au(e) {
  let t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ o((n) => {
      let a = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || a ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
o(Au, "getTabbableCandidates");
function Su(e, t) {
  for (let r of e)
    if (!kg(r, { upTo: t })) return r;
}
o(Su, "findVisible");
function kg(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
o(kg, "isHidden");
function Og(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
o(Og, "isSelectableInput");
function At(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    let r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && Og(e) && t && e.select();
  }
}
o(At, "focus");
var Cu = Bg();
function Bg() {
  let e = [];
  return {
    add(t) {
      let r = e[0];
      t !== r && r?.pause(), e = Mu(e, t), e.unshift(t);
    },
    remove(t) {
      e = Mu(e, t), e[0]?.resume();
    }
  };
}
o(Bg, "createFocusScopesStack");
function Mu(e, t) {
  let r = [...e], n = r.indexOf(t);
  return n !== -1 && r.splice(n, 1), r;
}
o(Mu, "arrayRemove");
function Ng(e) {
  return e.filter((t) => t.tagName !== "A");
}
o(Ng, "removeLinks");

// ../node_modules/@radix-ui/react-portal/dist/index.mjs
import * as uo from "react";
import Fg from "react-dom";
import { jsx as Dg } from "react/jsx-runtime";
var _g = "Portal", Bi = uo.forwardRef((e, t) => {
  let { container: r, ...n } = e, [a, i] = uo.useState(!1);
  ut(() => i(!0), []);
  let c = r || a && globalThis?.document?.body;
  return c ? Fg.createPortal(/* @__PURE__ */ Dg(Oe.div, { ...n, ref: t }), c) : null;
});
Bi.displayName = _g;

// ../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-presence/dist/index.mjs
import * as Te from "react";
import * as Lu from "react";
function Vg(e, t) {
  return Lu.useReducer((r, n) => t[r][n] ?? r, e);
}
o(Vg, "useStateMachine");
var mn = /* @__PURE__ */ o((e) => {
  let { present: t, children: r } = e, n = $g(t), a = typeof r == "function" ? r({ present: n.isPresent }) : Te.Children.only(r), i = Ke(n.ref,
  jg(a));
  return typeof r == "function" || n.isPresent ? Te.cloneElement(a, { ref: i }) : null;
}, "Presence");
mn.displayName = "Presence";
function $g(e) {
  let [t, r] = Te.useState(), n = Te.useRef(null), a = Te.useRef(e), i = Te.useRef("none"), c = e ? "mounted" : "unmounted", [l, s] = Vg(c, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return Te.useEffect(() => {
    let u = fo(n.current);
    i.current = l === "mounted" ? u : "none";
  }, [l]), ut(() => {
    let u = n.current, f = a.current;
    if (f !== e) {
      let m = i.current, v = fo(u);
      e ? s("MOUNT") : v === "none" || u?.display === "none" ? s("UNMOUNT") : s(f && m !== v ? "ANIMATION_OUT" : "UNMOUNT"), a.current = e;
    }
  }, [e, s]), ut(() => {
    if (t) {
      let u, f = t.ownerDocument.defaultView ?? window, d = /* @__PURE__ */ o((v) => {
        let p = fo(n.current).includes(v.animationName);
        if (v.target === t && p && (s("ANIMATION_END"), !a.current)) {
          let h = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = h);
          });
        }
      }, "handleAnimationEnd"), m = /* @__PURE__ */ o((v) => {
        v.target === t && (i.current = fo(n.current));
      }, "handleAnimationStart");
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", d), t.removeEventListener("a\
nimationend", d);
      };
    } else
      s("ANIMATION_END");
  }, [t, s]), {
    isPresent: ["mounted", "unmountSuspended"].includes(l),
    ref: Te.useCallback((u) => {
      n.current = u ? getComputedStyle(u) : null, r(u);
    }, [])
  };
}
o($g, "usePresence");
function fo(e) {
  return e?.animationName || "none";
}
o(fo, "getAnimationName");
function jg(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref :
  e.props.ref || e.ref);
}
o(jg, "getElementRef");

// ../node_modules/@radix-ui/react-focus-guards/dist/index.mjs
import * as zu from "react";
var Ni = 0;
function Tu() {
  zu.useEffect(() => {
    let e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Iu()), document.body.insertAdjacentElement("beforeend", e[1] ?? Iu()), Ni++,
    () => {
      Ni === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Ni--;
    };
  }, []);
}
o(Tu, "useFocusGuards");
function Iu() {
  let e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "\
fixed", e.style.pointerEvents = "none", e;
}
o(Iu, "createFocusGuard");

// ../node_modules/tslib/tslib.es6.mjs
var He = /* @__PURE__ */ o(function() {
  return He = Object.assign || /* @__PURE__ */ o(function(t) {
    for (var r, n = 1, a = arguments.length; n < a; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, "__assign"), He.apply(this, arguments);
}, "__assign");
function po(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
      t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
}
o(po, "__rest");
function Hu(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, a = t.length, i; n < a; n++)
    (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
o(Hu, "__spreadArray");

// ../node_modules/react-remove-scroll/dist/es2015/Combination.js
import * as wo from "react";

// ../node_modules/react-remove-scroll/dist/es2015/UI.js
import * as Re from "react";

// ../node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var Xt = "right-scroll-bar-position", Zt = "width-before-scroll-bar", Fi = "with-scroll-bars-hidden", Di = "--removed-body-scroll-bar-size";

// ../node_modules/use-callback-ref/dist/es2015/assignRef.js
function mo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
o(mo, "assignRef");

// ../node_modules/use-callback-ref/dist/es2015/useRef.js
import { useState as Wg } from "react";
function Pu(e, t) {
  var r = Wg(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(n) {
          var a = r.value;
          a !== n && (r.value = n, r.callback(n, a));
        }
      }
    };
  })[0];
  return r.callback = t, r.facade;
}
o(Pu, "useCallbackRef");

// ../node_modules/use-callback-ref/dist/es2015/useMergeRef.js
import * as ho from "react";
var Ug = typeof window < "u" ? ho.useLayoutEffect : ho.useEffect, ku = /* @__PURE__ */ new WeakMap();
function _i(e, t) {
  var r = Pu(t || null, function(n) {
    return e.forEach(function(a) {
      return mo(a, n);
    });
  });
  return Ug(function() {
    var n = ku.get(r);
    if (n) {
      var a = new Set(n), i = new Set(e), c = r.current;
      a.forEach(function(l) {
        i.has(l) || mo(l, null);
      }), i.forEach(function(l) {
        a.has(l) || mo(l, c);
      });
    }
    ku.set(r, e);
  }, [e]), r;
}
o(_i, "useMergeRefs");

// ../node_modules/use-sidecar/dist/es2015/medium.js
function qg(e) {
  return e;
}
o(qg, "ItoI");
function Gg(e, t) {
  t === void 0 && (t = qg);
  var r = [], n = !1, a = {
    read: /* @__PURE__ */ o(function() {
      if (n)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : e;
    }, "read"),
    useMedium: /* @__PURE__ */ o(function(i) {
      var c = t(i, n);
      return r.push(c), function() {
        r = r.filter(function(l) {
          return l !== c;
        });
      };
    }, "useMedium"),
    assignSyncMedium: /* @__PURE__ */ o(function(i) {
      for (n = !0; r.length; ) {
        var c = r;
        r = [], c.forEach(i);
      }
      r = {
        push: /* @__PURE__ */ o(function(l) {
          return i(l);
        }, "push"),
        filter: /* @__PURE__ */ o(function() {
          return r;
        }, "filter")
      };
    }, "assignSyncMedium"),
    assignMedium: /* @__PURE__ */ o(function(i) {
      n = !0;
      var c = [];
      if (r.length) {
        var l = r;
        r = [], l.forEach(i), c = r;
      }
      var s = /* @__PURE__ */ o(function() {
        var f = c;
        c = [], f.forEach(i);
      }, "executeQueue"), u = /* @__PURE__ */ o(function() {
        return Promise.resolve().then(s);
      }, "cycle");
      u(), r = {
        push: /* @__PURE__ */ o(function(f) {
          c.push(f), u();
        }, "push"),
        filter: /* @__PURE__ */ o(function(f) {
          return c = c.filter(f), r;
        }, "filter")
      };
    }, "assignMedium")
  };
  return a;
}
o(Gg, "innerCreateMedium");
function Vi(e) {
  e === void 0 && (e = {});
  var t = Gg(null);
  return t.options = He({ async: !0, ssr: !1 }, e), t;
}
o(Vi, "createSidecarMedium");

// ../node_modules/use-sidecar/dist/es2015/exports.js
import * as Ou from "react";
var Bu = /* @__PURE__ */ o(function(e) {
  var t = e.sideCar, r = po(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return Ou.createElement(n, He({}, r));
}, "SideCar");
Bu.isSideCarExport = !0;
function $i(e, t) {
  return e.useMedium(t), Bu;
}
o($i, "exportSidecar");

// ../node_modules/react-remove-scroll/dist/es2015/medium.js
var go = Vi();

// ../node_modules/react-remove-scroll/dist/es2015/UI.js
var ji = /* @__PURE__ */ o(function() {
}, "nothing"), hn = Re.forwardRef(function(e, t) {
  var r = Re.useRef(null), n = Re.useState({
    onScrollCapture: ji,
    onWheelCapture: ji,
    onTouchMoveCapture: ji
  }), a = n[0], i = n[1], c = e.forwardProps, l = e.children, s = e.className, u = e.removeScrollBar, f = e.enabled, d = e.shards, m = e.sideCar,
  v = e.noIsolation, y = e.inert, p = e.allowPinchZoom, h = e.as, g = h === void 0 ? "div" : h, w = e.gapMode, b = po(e, ["forwardProps", "c\
hildren", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), x = m,
  E = _i([r, t]), R = He(He({}, b), a);
  return Re.createElement(
    Re.Fragment,
    null,
    f && Re.createElement(x, { sideCar: go, removeScrollBar: u, shards: d, noIsolation: v, inert: y, setCallbacks: i, allowPinchZoom: !!p, lockRef: r,
    gapMode: w }),
    c ? Re.cloneElement(Re.Children.only(l), He(He({}, R), { ref: E })) : Re.createElement(g, He({}, R, { className: s, ref: E }), l)
  );
});
hn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
hn.classNames = {
  fullWidth: Zt,
  zeroRight: Xt
};

// ../node_modules/react-remove-scroll/dist/es2015/SideEffect.js
import * as X from "react";

// ../node_modules/react-remove-scroll-bar/dist/es2015/component.js
import * as Ir from "react";

// ../node_modules/react-style-singleton/dist/es2015/hook.js
import * as Du from "react";

// ../node_modules/get-nonce/dist/es2015/index.js
var Nu;
var Fu = /* @__PURE__ */ o(function() {
  if (Nu)
    return Nu;
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
}, "getNonce");

// ../node_modules/react-style-singleton/dist/es2015/singleton.js
function Yg() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Fu();
  return t && e.setAttribute("nonce", t), e;
}
o(Yg, "makeStyleTag");
function Xg(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
o(Xg, "injectStyles");
function Zg(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
o(Zg, "insertStyleTag");
var Wi = /* @__PURE__ */ o(function() {
  var e = 0, t = null;
  return {
    add: /* @__PURE__ */ o(function(r) {
      e == 0 && (t = Yg()) && (Xg(t, r), Zg(t)), e++;
    }, "add"),
    remove: /* @__PURE__ */ o(function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }, "remove")
  };
}, "stylesheetSingleton");

// ../node_modules/react-style-singleton/dist/es2015/hook.js
var Ui = /* @__PURE__ */ o(function() {
  var e = Wi();
  return function(t, r) {
    Du.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, "styleHookSingleton");

// ../node_modules/react-style-singleton/dist/es2015/component.js
var gn = /* @__PURE__ */ o(function() {
  var e = Ui(), t = /* @__PURE__ */ o(function(r) {
    var n = r.styles, a = r.dynamic;
    return e(n, a), null;
  }, "Sheet");
  return t;
}, "styleSingleton");

// ../node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var Kg = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, qi = /* @__PURE__ */ o(function(e) {
  return parseInt(e || "", 10) || 0;
}, "parse"), Jg = /* @__PURE__ */ o(function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" :
  "marginTop"], a = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [qi(r), qi(n), qi(a)];
}, "getOffset"), Gi = /* @__PURE__ */ o(function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Kg;
  var t = Jg(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, "getGapWidth");

// ../node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Qg = gn(), Lr = "data-scroll-locked", ev = /* @__PURE__ */ o(function(e, t, r, n) {
  var a = e.left, i = e.top, c = e.right, l = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(Fi, ` {
   overflow: hidden `).concat(n, `;
   padding-right: `).concat(l, "px ").concat(n, `;
  }
  body[`).concat(Lr, `] {
    overflow: hidden `).concat(n, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(n, ";"),
    r === "margin" && `
    padding-left: `.concat(a, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(c, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(l, "px ").concat(n, `;
    `),
    r === "padding" && "padding-right: ".concat(l, "px ").concat(n, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Xt, ` {
    right: `).concat(l, "px ").concat(n, `;
  }
  
  .`).concat(Zt, ` {
    margin-right: `).concat(l, "px ").concat(n, `;
  }
  
  .`).concat(Xt, " .").concat(Xt, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(Zt, " .").concat(Zt, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(Lr, `] {
    `).concat(Di, ": ").concat(l, `px;
  }
`);
}, "getStyles"), _u = /* @__PURE__ */ o(function() {
  var e = parseInt(document.body.getAttribute(Lr) || "0", 10);
  return isFinite(e) ? e : 0;
}, "getCurrentUseCounter"), tv = /* @__PURE__ */ o(function() {
  Ir.useEffect(function() {
    return document.body.setAttribute(Lr, (_u() + 1).toString()), function() {
      var e = _u() - 1;
      e <= 0 ? document.body.removeAttribute(Lr) : document.body.setAttribute(Lr, e.toString());
    };
  }, []);
}, "useLockAttribute"), Yi = /* @__PURE__ */ o(function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, a = n === void 0 ? "margin" : n;
  tv();
  var i = Ir.useMemo(function() {
    return Gi(a);
  }, [a]);
  return Ir.createElement(Qg, { styles: ev(i, !t, a, r ? "" : "!important") });
}, "RemoveScrollBar");

// ../node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var Xi = !1;
if (typeof window < "u")
  try {
    vn = Object.defineProperty({}, "passive", {
      get: /* @__PURE__ */ o(function() {
        return Xi = !0, !0;
      }, "get")
    }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn);
  } catch {
    Xi = !1;
  }
var vn, Kt = Xi ? { passive: !1 } : !1;

// ../node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var rv = /* @__PURE__ */ o(function(e) {
  return e.tagName === "TEXTAREA";
}, "alwaysContainsScroll"), Vu = /* @__PURE__ */ o(function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !rv(e) && r[t] === "visible")
  );
}, "elementCanBeScrolled"), nv = /* @__PURE__ */ o(function(e) {
  return Vu(e, "overflowY");
}, "elementCouldBeVScrolled"), ov = /* @__PURE__ */ o(function(e) {
  return Vu(e, "overflowX");
}, "elementCouldBeHScrolled"), Zi = /* @__PURE__ */ o(function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var a = $u(e, n);
    if (a) {
      var i = ju(e, n), c = i[1], l = i[2];
      if (c > l)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, "locationCouldBeScrolled"), av = /* @__PURE__ */ o(function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, "getVScrollVariables"), iv = /* @__PURE__ */ o(function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, "getHScrollVariables"), $u = /* @__PURE__ */ o(function(e, t) {
  return e === "v" ? nv(t) : ov(t);
}, "elementCouldBeScrolled"), ju = /* @__PURE__ */ o(function(e, t) {
  return e === "v" ? av(t) : iv(t);
}, "getScrollVariables"), lv = /* @__PURE__ */ o(function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, "getDirectionFactor"), Wu = /* @__PURE__ */ o(function(e, t, r, n, a) {
  var i = lv(e, window.getComputedStyle(t).direction), c = i * n, l = r.target, s = t.contains(l), u = !1, f = c > 0, d = 0, m = 0;
  do {
    var v = ju(e, l), y = v[0], p = v[1], h = v[2], g = p - h - i * y;
    (y || g) && $u(e, l) && (d += g, m += y), l instanceof ShadowRoot ? l = l.host : l = l.parentNode;
  } while (
    // portaled content
    !s && l !== document.body || // self content
    s && (t.contains(l) || t === l)
  );
  return (f && (a && Math.abs(d) < 1 || !a && c > d) || !f && (a && Math.abs(m) < 1 || !a && -c > m)) && (u = !0), u;
}, "handleScroll");

// ../node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var vo = /* @__PURE__ */ o(function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, "getTouchXY"), Uu = /* @__PURE__ */ o(function(e) {
  return [e.deltaX, e.deltaY];
}, "getDeltaXY"), qu = /* @__PURE__ */ o(function(e) {
  return e && "current" in e ? e.current : e;
}, "extractRef"), cv = /* @__PURE__ */ o(function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, "deltaCompare"), sv = /* @__PURE__ */ o(function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, "generateStyle"), uv = 0, zr = [];
function Gu(e) {
  var t = X.useRef([]), r = X.useRef([0, 0]), n = X.useRef(), a = X.useState(uv++)[0], i = X.useState(gn)[0], c = X.useRef(e);
  X.useEffect(function() {
    c.current = e;
  }, [e]), X.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(a));
      var p = Hu([e.lockRef.current], (e.shards || []).map(qu), !0).filter(Boolean);
      return p.forEach(function(h) {
        return h.classList.add("allow-interactivity-".concat(a));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(a)), p.forEach(function(h) {
          return h.classList.remove("allow-interactivity-".concat(a));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var l = X.useCallback(function(p, h) {
    if ("touches" in p && p.touches.length === 2 || p.type === "wheel" && p.ctrlKey)
      return !c.current.allowPinchZoom;
    var g = vo(p), w = r.current, b = "deltaX" in p ? p.deltaX : w[0] - g[0], x = "deltaY" in p ? p.deltaY : w[1] - g[1], E, R = p.target, S = Math.
    abs(b) > Math.abs(x) ? "h" : "v";
    if ("touches" in p && S === "h" && R.type === "range")
      return !1;
    var A = Zi(S, R);
    if (!A)
      return !0;
    if (A ? E = S : (E = S === "v" ? "h" : "v", A = Zi(S, R)), !A)
      return !1;
    if (!n.current && "changedTouches" in p && (b || x) && (n.current = E), !E)
      return !0;
    var M = n.current || E;
    return Wu(M, h, p, M === "h" ? b : x, !0);
  }, []), s = X.useCallback(function(p) {
    var h = p;
    if (!(!zr.length || zr[zr.length - 1] !== i)) {
      var g = "deltaY" in h ? Uu(h) : vo(h), w = t.current.filter(function(E) {
        return E.name === h.type && (E.target === h.target || h.target === E.shadowParent) && cv(E.delta, g);
      })[0];
      if (w && w.should) {
        h.cancelable && h.preventDefault();
        return;
      }
      if (!w) {
        var b = (c.current.shards || []).map(qu).filter(Boolean).filter(function(E) {
          return E.contains(h.target);
        }), x = b.length > 0 ? l(h, b[0]) : !c.current.noIsolation;
        x && h.cancelable && h.preventDefault();
      }
    }
  }, []), u = X.useCallback(function(p, h, g, w) {
    var b = { name: p, delta: h, target: g, should: w, shadowParent: fv(g) };
    t.current.push(b), setTimeout(function() {
      t.current = t.current.filter(function(x) {
        return x !== b;
      });
    }, 1);
  }, []), f = X.useCallback(function(p) {
    r.current = vo(p), n.current = void 0;
  }, []), d = X.useCallback(function(p) {
    u(p.type, Uu(p), p.target, l(p, e.lockRef.current));
  }, []), m = X.useCallback(function(p) {
    u(p.type, vo(p), p.target, l(p, e.lockRef.current));
  }, []);
  X.useEffect(function() {
    return zr.push(i), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", s, Kt), document.addEventListener("touchmove", s, Kt), document.addEventListener("touchstart", f,
    Kt), function() {
      zr = zr.filter(function(p) {
        return p !== i;
      }), document.removeEventListener("wheel", s, Kt), document.removeEventListener("touchmove", s, Kt), document.removeEventListener("touc\
hstart", f, Kt);
    };
  }, []);
  var v = e.removeScrollBar, y = e.inert;
  return X.createElement(
    X.Fragment,
    null,
    y ? X.createElement(i, { styles: sv(a) }) : null,
    v ? X.createElement(Yi, { gapMode: e.gapMode }) : null
  );
}
o(Gu, "RemoveScrollSideCar");
function fv(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
o(fv, "getOutermostShadowParent");

// ../node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Yu = $i(go, Gu);

// ../node_modules/react-remove-scroll/dist/es2015/Combination.js
var Xu = wo.forwardRef(function(e, t) {
  return wo.createElement(hn, He({}, e, { ref: t, sideCar: Yu }));
});
Xu.classNames = hn.classNames;
var Ki = Xu;

// ../node_modules/aria-hidden/dist/es2015/index.js
var dv = /* @__PURE__ */ o(function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, "getDefaultParent"), Tr = /* @__PURE__ */ new WeakMap(), bo = /* @__PURE__ */ new WeakMap(), yo = {}, Ji = 0, Zu = /* @__PURE__ */ o(function(e) {
  return e && (e.host || Zu(e.parentNode));
}, "unwrapHost"), pv = /* @__PURE__ */ o(function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = Zu(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, "correctTargets"), mv = /* @__PURE__ */ o(function(e, t, r, n) {
  var a = pv(t, Array.isArray(e) ? e : [e]);
  yo[r] || (yo[r] = /* @__PURE__ */ new WeakMap());
  var i = yo[r], c = [], l = /* @__PURE__ */ new Set(), s = new Set(a), u = /* @__PURE__ */ o(function(d) {
    !d || l.has(d) || (l.add(d), u(d.parentNode));
  }, "keep");
  a.forEach(u);
  var f = /* @__PURE__ */ o(function(d) {
    !d || s.has(d) || Array.prototype.forEach.call(d.children, function(m) {
      if (l.has(m))
        f(m);
      else
        try {
          var v = m.getAttribute(n), y = v !== null && v !== "false", p = (Tr.get(m) || 0) + 1, h = (i.get(m) || 0) + 1;
          Tr.set(m, p), i.set(m, h), c.push(m), p === 1 && y && bo.set(m, !0), h === 1 && m.setAttribute(r, "true"), y || m.setAttribute(n, "\
true");
        } catch (g) {
          console.error("aria-hidden: cannot operate on ", m, g);
        }
    });
  }, "deep");
  return f(t), l.clear(), Ji++, function() {
    c.forEach(function(d) {
      var m = Tr.get(d) - 1, v = i.get(d) - 1;
      Tr.set(d, m), i.set(d, v), m || (bo.has(d) || d.removeAttribute(n), bo.delete(d)), v || d.removeAttribute(r);
    }), Ji--, Ji || (Tr = /* @__PURE__ */ new WeakMap(), Tr = /* @__PURE__ */ new WeakMap(), bo = /* @__PURE__ */ new WeakMap(), yo = {});
  };
}, "applyAttributeToOthers"), Ku = /* @__PURE__ */ o(function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), a = t || dv(e);
  return a ? (n.push.apply(n, Array.from(a.querySelectorAll("[aria-live]"))), mv(n, a, r, "aria-hidden")) : function() {
    return null;
  };
}, "hideOthers");

// ../node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs
import * as le from "react";
import { Fragment as zM, jsx as Ju } from "react/jsx-runtime";
// @__NO_SIDE_EFFECTS__
function Qu(e) {
  let t = /* @__PURE__ */ hv(e), r = le.forwardRef((n, a) => {
    let { children: i, ...c } = n, l = le.Children.toArray(i), s = l.find(vv);
    if (s) {
      let u = s.props.children, f = l.map((d) => d === s ? le.Children.count(u) > 1 ? le.Children.only(null) : le.isValidElement(u) ? u.props.
      children : null : d);
      return /* @__PURE__ */ Ju(t, { ...c, ref: a, children: le.isValidElement(u) ? le.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ Ju(t, { ...c, ref: a, children: i });
  });
  return r.displayName = `${e}.Slot`, r;
}
o(Qu, "createSlot");
// @__NO_SIDE_EFFECTS__
function hv(e) {
  let t = le.forwardRef((r, n) => {
    let { children: a, ...i } = r;
    if (le.isValidElement(a)) {
      let c = bv(a), l = wv(i, a.props);
      return a.type !== le.Fragment && (l.ref = n ? Yt(n, c) : c), le.cloneElement(a, l);
    }
    return le.Children.count(a) > 1 ? le.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
o(hv, "createSlotClone");
var gv = Symbol("radix.slottable");
function vv(e) {
  return le.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === gv;
}
o(vv, "isSlottable");
function wv(e, t) {
  let r = { ...t };
  for (let n in t) {
    let a = e[n], i = t[n];
    /^on[A-Z]/.test(n) ? a && i ? r[n] = (...l) => {
      i(...l), a(...l);
    } : a && (r[n] = a) : n === "style" ? r[n] = { ...a, ...i } : n === "className" && (r[n] = [a, i].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
o(wv, "mergeProps");
function bv(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref :
  e.props.ref || e.ref);
}
o(bv, "getElementRef");

// ../node_modules/@radix-ui/react-dialog/dist/index.mjs
import { Fragment as ef, jsx as re, jsxs as tf } from "react/jsx-runtime";
var xo = "Dialog", [rf, yv] = cu(xo), [Rv, Je] = rf(xo), Qi = /* @__PURE__ */ o((e) => {
  let {
    __scopeDialog: t,
    children: r,
    open: n,
    defaultOpen: a,
    onOpenChange: i,
    modal: c = !0
  } = e, l = q.useRef(null), s = q.useRef(null), [u, f] = uu({
    prop: n,
    defaultProp: a ?? !1,
    onChange: i,
    caller: xo
  });
  return /* @__PURE__ */ re(
    Rv,
    {
      scope: t,
      triggerRef: l,
      contentRef: s,
      contentId: lo(),
      titleId: lo(),
      descriptionId: lo(),
      open: u,
      onOpenChange: f,
      onOpenToggle: q.useCallback(() => f((d) => !d), [f]),
      modal: c,
      children: r
    }
  );
}, "Dialog");
Qi.displayName = xo;
var nf = "DialogTrigger", el = q.forwardRef(
  (e, t) => {
    let { __scopeDialog: r, ...n } = e, a = Je(nf, r), i = Ke(t, a.triggerRef);
    return /* @__PURE__ */ re(
      Oe.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a.open,
        "aria-controls": a.contentId,
        "data-state": sl(a.open),
        ...n,
        ref: i,
        onClick: Mr(e.onClick, a.onOpenToggle)
      }
    );
  }
);
el.displayName = nf;
var tl = "DialogPortal", [xv, of] = rf(tl, {
  forceMount: void 0
}), rl = /* @__PURE__ */ o((e) => {
  let { __scopeDialog: t, forceMount: r, children: n, container: a } = e, i = Je(tl, t);
  return /* @__PURE__ */ re(xv, { scope: t, forceMount: r, children: q.Children.map(n, (c) => /* @__PURE__ */ re(mn, { present: r || i.open,
  children: /* @__PURE__ */ re(Bi, { asChild: !0, container: a, children: c }) })) });
}, "DialogPortal");
rl.displayName = tl;
var Ro = "DialogOverlay", nl = q.forwardRef(
  (e, t) => {
    let r = of(Ro, e.__scopeDialog), { forceMount: n = r.forceMount, ...a } = e, i = Je(Ro, e.__scopeDialog);
    return i.modal ? /* @__PURE__ */ re(mn, { present: n || i.open, children: /* @__PURE__ */ re(Sv, { ...a, ref: t }) }) : null;
  }
);
nl.displayName = Ro;
var Ev = Qu("DialogOverlay.RemoveScroll"), Sv = q.forwardRef(
  (e, t) => {
    let { __scopeDialog: r, ...n } = e, a = Je(Ro, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ re(Ki, { as: Ev, allowPinchZoom: !0, shards: [a.contentRef], children: /* @__PURE__ */ re(
        Oe.div,
        {
          "data-state": sl(a.open),
          ...n,
          ref: t,
          style: { pointerEvents: "auto", ...n.style }
        }
      ) })
    );
  }
), Jt = "DialogContent", ol = q.forwardRef(
  (e, t) => {
    let r = of(Jt, e.__scopeDialog), { forceMount: n = r.forceMount, ...a } = e, i = Je(Jt, e.__scopeDialog);
    return /* @__PURE__ */ re(mn, { present: n || i.open, children: i.modal ? /* @__PURE__ */ re(Cv, { ...a, ref: t }) : /* @__PURE__ */ re(
    Mv, { ...a, ref: t }) });
  }
);
ol.displayName = Jt;
var Cv = q.forwardRef(
  (e, t) => {
    let r = Je(Jt, e.__scopeDialog), n = q.useRef(null), a = Ke(t, r.contentRef, n);
    return q.useEffect(() => {
      let i = n.current;
      if (i) return Ku(i);
    }, []), /* @__PURE__ */ re(
      af,
      {
        ...e,
        ref: a,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Mr(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: Mr(e.onPointerDownOutside, (i) => {
          let c = i.detail.originalEvent, l = c.button === 0 && c.ctrlKey === !0;
          (c.button === 2 || l) && i.preventDefault();
        }),
        onFocusOutside: Mr(
          e.onFocusOutside,
          (i) => i.preventDefault()
        )
      }
    );
  }
), Mv = q.forwardRef(
  (e, t) => {
    let r = Je(Jt, e.__scopeDialog), n = q.useRef(!1), a = q.useRef(!1);
    return /* @__PURE__ */ re(
      af,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: /* @__PURE__ */ o((i) => {
          e.onCloseAutoFocus?.(i), i.defaultPrevented || (n.current || r.triggerRef.current?.focus(), i.preventDefault()), n.current = !1, a.
          current = !1;
        }, "onCloseAutoFocus"),
        onInteractOutside: /* @__PURE__ */ o((i) => {
          e.onInteractOutside?.(i), i.defaultPrevented || (n.current = !0, i.detail.originalEvent.type === "pointerdown" && (a.current = !0));
          let c = i.target;
          r.triggerRef.current?.contains(c) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && a.current && i.preventDefault();
        }, "onInteractOutside")
      }
    );
  }
), af = q.forwardRef(
  (e, t) => {
    let { __scopeDialog: r, trapFocus: n, onOpenAutoFocus: a, onCloseAutoFocus: i, ...c } = e, l = Je(Jt, r), s = q.useRef(null), u = Ke(t, s);
    return Tu(), /* @__PURE__ */ tf(ef, { children: [
      /* @__PURE__ */ re(
        Oi,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: a,
          onUnmountAutoFocus: i,
          children: /* @__PURE__ */ re(
            Hi,
            {
              role: "dialog",
              id: l.contentId,
              "aria-describedby": l.descriptionId,
              "aria-labelledby": l.titleId,
              "data-state": sl(l.open),
              ...c,
              ref: u,
              onDismiss: /* @__PURE__ */ o(() => l.onOpenChange(!1), "onDismiss")
            }
          )
        }
      ),
      /* @__PURE__ */ tf(ef, { children: [
        /* @__PURE__ */ re(Lv, { titleId: l.titleId }),
        /* @__PURE__ */ re(zv, { contentRef: s, descriptionId: l.descriptionId })
      ] })
    ] });
  }
), al = "DialogTitle", il = q.forwardRef(
  (e, t) => {
    let { __scopeDialog: r, ...n } = e, a = Je(al, r);
    return /* @__PURE__ */ re(Oe.h2, { id: a.titleId, ...n, ref: t });
  }
);
il.displayName = al;
var lf = "DialogDescription", ll = q.forwardRef(
  (e, t) => {
    let { __scopeDialog: r, ...n } = e, a = Je(lf, r);
    return /* @__PURE__ */ re(Oe.p, { id: a.descriptionId, ...n, ref: t });
  }
);
ll.displayName = lf;
var cf = "DialogClose", cl = q.forwardRef(
  (e, t) => {
    let { __scopeDialog: r, ...n } = e, a = Je(cf, r);
    return /* @__PURE__ */ re(
      Oe.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: Mr(e.onClick, () => a.onOpenChange(!1))
      }
    );
  }
);
cl.displayName = cf;
function sl(e) {
  return e ? "open" : "closed";
}
o(sl, "getState");
var sf = "DialogTitleWarning", [Av, uf] = lu(sf, {
  contentName: Jt,
  titleName: al,
  docsSlug: "dialog"
}), Lv = /* @__PURE__ */ o(({ titleId: e }) => {
  let t = uf(sf), r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return q.useEffect(() => {
    e && (document.getElementById(e) || console.error(r));
  }, [r, e]), null;
}, "TitleWarning"), Iv = "DialogDescriptionWarning", zv = /* @__PURE__ */ o(({ contentRef: e, descriptionId: t }) => {
  let n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${uf(Iv).contentName}}.`;
  return q.useEffect(() => {
    let a = e.current?.getAttribute("aria-describedby");
    t && a && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, "DescriptionWarning"), ul = Qi, Tv = el, fl = rl, dl = nl, pl = ol, ml = il, hl = ll, gl = cl;

// src/components/components/Modal/Modal.styled.tsx
var yl = {};
Qr(yl, {
  Actions: () => Qv,
  CloseButton: () => mf,
  Col: () => gf,
  Container: () => bl,
  Content: () => Xv,
  Description: () => Jv,
  Error: () => e3,
  ErrorWrapper: () => vf,
  Header: () => Zv,
  Overlay: () => wl,
  Row: () => hf,
  Title: () => Kv
});
import Lt from "react";
import { keyframes as vl, styled as ft } from "storybook/theming";

// src/components/components/IconButton/IconButton.tsx
import Uv, { forwardRef as qv } from "react";

// src/components/components/Button/Button.tsx
import Fv, { forwardRef as Dv, useEffect as _v, useState as Vv } from "react";

// ../node_modules/@radix-ui/react-slot/dist/index.mjs
import * as ce from "react";
import { Fragment as KM, jsx as ff } from "react/jsx-runtime";
// @__NO_SIDE_EFFECTS__
function Hv(e) {
  let t = /* @__PURE__ */ Pv(e), r = ce.forwardRef((n, a) => {
    let { children: i, ...c } = n, l = ce.Children.toArray(i), s = l.find(Ov);
    if (s) {
      let u = s.props.children, f = l.map((d) => d === s ? ce.Children.count(u) > 1 ? ce.Children.only(null) : ce.isValidElement(u) ? u.props.
      children : null : d);
      return /* @__PURE__ */ ff(t, { ...c, ref: a, children: ce.isValidElement(u) ? ce.cloneElement(u, void 0, f) : null });
    }
    return /* @__PURE__ */ ff(t, { ...c, ref: a, children: i });
  });
  return r.displayName = `${e}.Slot`, r;
}
o(Hv, "createSlot");
var df = /* @__PURE__ */ Hv("Slot");
// @__NO_SIDE_EFFECTS__
function Pv(e) {
  let t = ce.forwardRef((r, n) => {
    let { children: a, ...i } = r;
    if (ce.isValidElement(a)) {
      let c = Nv(a), l = Bv(i, a.props);
      return a.type !== ce.Fragment && (l.ref = n ? Yt(n, c) : c), ce.cloneElement(a, l);
    }
    return ce.Children.count(a) > 1 ? ce.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
o(Pv, "createSlotClone");
var kv = Symbol("radix.slottable");
function Ov(e) {
  return ce.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === kv;
}
o(Ov, "isSlottable");
function Bv(e, t) {
  let r = { ...t };
  for (let n in t) {
    let a = e[n], i = t[n];
    /^on[A-Z]/.test(n) ? a && i ? r[n] = (...l) => {
      let s = i(...l);
      return a(...l), s;
    } : a && (r[n] = a) : n === "style" ? r[n] = { ...a, ...i } : n === "className" && (r[n] = [a, i].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
o(Bv, "mergeProps");
function Nv(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref :
  e.props.ref || e.ref);
}
o(Nv, "getElementRef");

// src/components/components/Button/Button.tsx
import { isPropValid as $v, styled as jv } from "storybook/theming";
var Hr = Dv(
  ({
    asChild: e = !1,
    animation: t = "none",
    size: r = "small",
    variant: n = "outline",
    padding: a = "medium",
    disabled: i = !1,
    active: c = !1,
    onClick: l,
    ...s
  }, u) => {
    let f = "button";
    e && (f = df);
    let [d, m] = Vv(!1), v = /* @__PURE__ */ o((y) => {
      l && l(y), t !== "none" && m(!0);
    }, "handleClick");
    return _v(() => {
      let y = setTimeout(() => {
        d && m(!1);
      }, 1e3);
      return () => clearTimeout(y);
    }, [d]), /* @__PURE__ */ Fv.createElement(
      Wv,
      {
        as: f,
        ref: u,
        variant: n,
        size: r,
        padding: a,
        disabled: i,
        active: c,
        animating: d,
        animation: t,
        onClick: v,
        ...s
      }
    );
  }
);
Hr.displayName = "Button";
var Wv = jv("button", {
  shouldForwardProp: /* @__PURE__ */ o((e) => $v(e), "shouldForwardProp")
})(({ theme: e, variant: t, size: r, disabled: n, active: a, animating: i, animation: c = "none", padding: l }) => ({
  border: 0,
  cursor: n ? "not-allowed" : "pointer",
  display: "inline-flex",
  gap: "6px",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  padding: l === "none" ? 0 : l === "small" && r === "small" ? "0 7px" : l === "small" && r === "medium" ? "0 9px" : r === "small" ? "0 10px" :
  r === "medium" ? "0 12px" : 0,
  height: r === "small" ? "28px" : "32px",
  position: "relative",
  textAlign: "center",
  textDecoration: "none",
  transitionProperty: "background, box-shadow",
  transitionDuration: "150ms",
  transitionTimingFunction: "ease-out",
  verticalAlign: "top",
  whiteSpace: "nowrap",
  userSelect: "none",
  opacity: n ? 0.5 : 1,
  margin: 0,
  fontSize: `${e.typography.size.s1}px`,
  fontWeight: e.typography.weight.bold,
  lineHeight: "1",
  background: t === "solid" ? e.color.secondary : t === "outline" ? e.button.background : t === "ghost" && a ? e.background.hoverable : "tra\
nsparent",
  ...t === "ghost" ? {
    // This is a hack to apply bar styles to the button as soon as it is part of a bar
    // It is a temporary solution until we have implemented Theming 2.0.
    ".sb-bar &": {
      background: a ? ye(0.9, e.barTextColor) : "transparent",
      color: a ? e.barSelectedColor : e.barTextColor,
      "&:hover": {
        color: e.barHoverColor,
        background: ye(0.86, e.barHoverColor)
      },
      "&:active": {
        color: e.barSelectedColor,
        background: ye(0.9, e.barSelectedColor)
      },
      "&:focus": {
        boxShadow: `${_t(e.barHoverColor, 1)} 0 0 0 1px inset`,
        outline: "none"
      }
    }
  } : {},
  color: t === "solid" ? e.color.lightest : t === "outline" ? e.input.color : t === "ghost" && a ? e.color.secondary : t === "ghost" ? e.color.
  mediumdark : e.input.color,
  boxShadow: t === "outline" ? `${e.button.border} 0 0 0 1px inset` : "none",
  borderRadius: e.input.borderRadius,
  // Making sure that the button never shrinks below its minimum size
  flexShrink: 0,
  "&:hover": {
    color: t === "ghost" ? e.color.secondary : void 0,
    background: (() => {
      let s = e.color.secondary;
      return t === "solid" && (s = e.color.secondary), t === "outline" && (s = e.button.background), t === "ghost" ? ye(0.86, e.color.secondary) :
      e.base === "light" ? yt(0.02, s) : aa(0.03, s);
    })()
  },
  "&:active": {
    color: t === "ghost" ? e.color.secondary : void 0,
    background: (() => {
      let s = e.color.secondary;
      return t === "solid" && (s = e.color.secondary), t === "outline" && (s = e.button.background), t === "ghost" ? e.background.hoverable :
      e.base === "light" ? yt(0.02, s) : aa(0.03, s);
    })()
  },
  "&:focus": {
    boxShadow: `${_t(e.color.secondary, 1)} 0 0 0 1px inset`,
    outline: "none"
  },
  "> svg": {
    animation: i && c !== "none" ? `${e.animation[c]} 1000ms ease-out` : ""
  }
}));

// src/components/components/IconButton/IconButton.tsx
var So = qv(
  ({ padding: e = "small", variant: t = "ghost", ...r }, n) => /* @__PURE__ */ Uv.createElement(Hr, { padding: e, variant: t, ref: n, ...r })
);
So.displayName = "IconButton";

// src/components/components/Modal/Modal.styled.tsx
var pf = vl({
  from: { opacity: 0 },
  to: { opacity: 1 }
}), Gv = vl({
  from: { maxHeight: 0 },
  to: {}
}), Yv = vl({
  from: {
    opacity: 0,
    transform: "translate(-50%, -50%) scale(0.9)"
  },
  to: {
    opacity: 1,
    transform: "translate(-50%, -50%) scale(1)"
  }
}), wl = ft.div({
  backdropFilter: "blur(24px)",
  position: "fixed",
  inset: 0,
  width: "100%",
  height: "100%",
  zIndex: 10,
  animation: `${pf} 200ms`
}), bl = ft.div(
  ({ theme: e, width: t, height: r }) => ({
    backgroundColor: e.background.bar,
    borderRadius: 6,
    boxShadow: "0px 4px 67px 0px #00000040",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: t ?? 740,
    height: r ?? "auto",
    maxWidth: "calc(100% - 40px)",
    maxHeight: "85vh",
    overflow: "auto",
    zIndex: 11,
    animation: `${Yv} 200ms`,
    "&:focus-visible": {
      outline: "none"
    }
  })
), mf = /* @__PURE__ */ o((e) => /* @__PURE__ */ Lt.createElement(gl, { asChild: !0 }, /* @__PURE__ */ Lt.createElement(So, { "aria-label": "\
Close", ...e }, /* @__PURE__ */ Lt.createElement(Y5, null))), "CloseButton"), Xv = ft.div({
  display: "flex",
  flexDirection: "column",
  margin: 16,
  gap: 16
}), hf = ft.div({
  display: "flex",
  justifyContent: "space-between",
  gap: 16
}), gf = ft.div({
  display: "flex",
  flexDirection: "column",
  gap: 4
}), Zv = /* @__PURE__ */ o((e) => /* @__PURE__ */ Lt.createElement(hf, null, /* @__PURE__ */ Lt.createElement(gf, { ...e }), /* @__PURE__ */ Lt.
createElement(mf, null)), "Header"), Kv = ft(ml)(({ theme: e }) => ({
  margin: 0,
  fontSize: e.typography.size.s3,
  fontWeight: e.typography.weight.bold
})), Jv = ft(hl)(({ theme: e }) => ({
  position: "relative",
  zIndex: 1,
  margin: 0,
  fontSize: e.typography.size.s2
})), Qv = ft.div({
  display: "flex",
  flexDirection: "row-reverse",
  gap: 8
}), vf = ft.div(({ theme: e }) => ({
  maxHeight: 100,
  overflow: "auto",
  animation: `${Gv} 300ms, ${pf} 300ms`,
  backgroundColor: e.background.critical,
  color: e.color.lightest,
  fontSize: e.typography.size.s2,
  "& > div": {
    position: "relative",
    padding: "8px 16px"
  }
})), e3 = /* @__PURE__ */ o(({
  children: e,
  ...t
}) => /* @__PURE__ */ Lt.createElement(vf, { ...t }, /* @__PURE__ */ Lt.createElement("div", null, e)), "Error");

// src/components/components/Modal/Modal.tsx
function t3({
  children: e,
  width: t,
  height: r,
  onEscapeKeyDown: n,
  onInteractOutside: a = /* @__PURE__ */ o((u) => u.preventDefault(), "onInteractOutside"),
  className: i,
  container: c,
  portalSelector: l,
  ...s
}) {
  let u = c ?? (l ? document.querySelector(l) : null) ?? document.body;
  return /* @__PURE__ */ Pr.createElement(ul, { ...s }, /* @__PURE__ */ Pr.createElement(fl, { container: u }, /* @__PURE__ */ Pr.createElement(
  dl, { asChild: !0 }, /* @__PURE__ */ Pr.createElement(wl, null)), /* @__PURE__ */ Pr.createElement(
    pl,
    {
      asChild: !0,
      onInteractOutside: a,
      onEscapeKeyDown: n
    },
    /* @__PURE__ */ Pr.createElement(bl, { className: i, width: t, height: r }, e)
  )));
}
o(t3, "BaseModal");
var r3 = Object.assign(t3, yl, { Dialog: Eo });

// src/components/components/spaced/Spaced.tsx
import n3 from "react";
import { ignoreSsrWarning as wf, styled as o3 } from "storybook/theming";
var a3 = /* @__PURE__ */ o((e) => typeof e == "number" ? e : Number(e), "toNumber"), i3 = o3.div(
  ({ theme: e, col: t, row: r = 1 }) => t ? {
    display: "inline-block",
    verticalAlign: "inherit",
    "& > *": {
      marginLeft: t * e.layoutMargin,
      verticalAlign: "inherit"
    },
    [`& > *:first-child${wf}`]: {
      marginLeft: 0
    }
  } : {
    "& > *": {
      marginTop: r * e.layoutMargin
    },
    [`& > *:first-child${wf}`]: {
      marginTop: 0
    }
  },
  ({ theme: e, outer: t, col: r, row: n }) => {
    switch (!0) {
      case !!(t && r):
        return {
          marginLeft: t * e.layoutMargin,
          marginRight: t * e.layoutMargin
        };
      case !!(t && n):
        return {
          marginTop: t * e.layoutMargin,
          marginBottom: t * e.layoutMargin
        };
      default:
        return {};
    }
  }
), l3 = /* @__PURE__ */ o(({ col: e, row: t, outer: r, children: n, ...a }) => {
  let i = a3(typeof r == "number" || !r ? r : e || t);
  return /* @__PURE__ */ n3.createElement(i3, { col: e, row: t, outer: i, ...a }, n);
}, "Spaced");

// src/components/components/placeholder/placeholder.tsx
import Rl, { Children as c3 } from "react";
import { styled as xl } from "storybook/theming";
var s3 = xl.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold
})), u3 = xl.div(), f3 = xl.div(({ theme: e }) => ({
  padding: 30,
  textAlign: "center",
  color: e.color.defaultText,
  fontSize: e.typography.size.s2 - 1
})), d3 = /* @__PURE__ */ o(({ children: e, ...t }) => {
  let [r, n] = c3.toArray(e);
  return /* @__PURE__ */ Rl.createElement(f3, { ...t }, /* @__PURE__ */ Rl.createElement(s3, null, r), n && /* @__PURE__ */ Rl.createElement(
  u3, null, n));
}, "Placeholder");

// src/components/index.ts
oo();

// src/components/components/Zoom/ZoomElement.tsx
import yf, { useCallback as g3, useEffect as v3, useRef as w3, useState as b3 } from "react";
import { styled as y3 } from "storybook/theming";

// ../node_modules/use-resize-observer/dist/bundle.esm.js
import { useRef as Qt, useEffect as El, useCallback as Sl, useState as p3, useMemo as m3 } from "react";
function h3(e, t) {
  var r = Qt(null), n = Qt(null);
  n.current = t;
  var a = Qt(null);
  El(function() {
    i();
  });
  var i = Sl(function() {
    var c = a.current, l = n.current, s = c || (l ? l instanceof Element ? l : l.current : null);
    r.current && r.current.element === s && r.current.subscriber === e || (r.current && r.current.cleanup && r.current.cleanup(), r.current =
    {
      element: s,
      subscriber: e,
      // Only calling the subscriber, if there's an actual element to report.
      // Setting cleanup to undefined unless a subscriber returns one, as an existing cleanup function would've been just called.
      cleanup: s ? e(s) : void 0
    });
  }, [e]);
  return El(function() {
    return function() {
      r.current && r.current.cleanup && (r.current.cleanup(), r.current = null);
    };
  }, []), Sl(function(c) {
    a.current = c, i();
  }, [i]);
}
o(h3, "useResolvedElement");
function bf(e, t, r) {
  return e[t] ? e[t][0] ? e[t][0][r] : (
    // TS complains about this, because the RO entry type follows the spec and does not reflect Firefox's current
    // behaviour of returning objects instead of arrays for `borderBoxSize` and `contentBoxSize`.
    // @ts-ignore
    e[t][r]
  ) : t === "contentBoxSize" ? e.contentRect[r === "inlineSize" ? "width" : "height"] : void 0;
}
o(bf, "extractSize");
function Co(e) {
  e === void 0 && (e = {});
  var t = e.onResize, r = Qt(void 0);
  r.current = t;
  var n = e.round || Math.round, a = Qt(), i = p3({
    width: void 0,
    height: void 0
  }), c = i[0], l = i[1], s = Qt(!1);
  El(function() {
    return s.current = !1, function() {
      s.current = !0;
    };
  }, []);
  var u = Qt({
    width: void 0,
    height: void 0
  }), f = h3(Sl(function(d) {
    return (!a.current || a.current.box !== e.box || a.current.round !== n) && (a.current = {
      box: e.box,
      round: n,
      instance: new ResizeObserver(function(m) {
        var v = m[0], y = e.box === "border-box" ? "borderBoxSize" : e.box === "device-pixel-content-box" ? "devicePixelContentBoxSize" : "c\
ontentBoxSize", p = bf(v, y, "inlineSize"), h = bf(v, y, "blockSize"), g = p ? n(p) : void 0, w = h ? n(h) : void 0;
        if (u.current.width !== g || u.current.height !== w) {
          var b = {
            width: g,
            height: w
          };
          u.current.width = g, u.current.height = w, r.current ? r.current(b) : s.current || l(b);
        }
      })
    }), a.current.instance.observe(d, {
      box: e.box
    }), function() {
      a.current && a.current.instance.unobserve(d);
    };
  }, [e.box, n]), e.ref);
  return m3(function() {
    return {
      ref: f,
      width: c.width,
      height: c.height
    };
  }, [f, c.width, c.height]);
}
o(Co, "useResizeObserver");

// src/components/components/Zoom/ZoomElement.tsx
var R3 = y3.div(
  ({ centered: e = !1, scale: t = 1, elementHeight: r }) => ({
    height: r || "auto",
    transformOrigin: e ? "center top" : "left top",
    transform: `scale(${1 / t})`
  })
);
function Rf({ centered: e, scale: t, children: r }) {
  let n = w3(null), [a, i] = b3(0), c = g3(
    ({ height: l }) => {
      l && i(l / t);
    },
    [t]
  );
  return v3(() => {
    n.current && i(n.current.getBoundingClientRect().height);
  }, [t]), Co({
    ref: n,
    onResize: c
  }), /* @__PURE__ */ yf.createElement(R3, { centered: e, scale: t, elementHeight: a }, /* @__PURE__ */ yf.createElement("div", { ref: n, className: "\
innerZoomElementWrapper" }, r));
}
o(Rf, "ZoomElement");

// src/components/components/Zoom/ZoomIFrame.tsx
import xf, { Component as x3 } from "react";
var Cl = class Cl extends x3 {
  constructor() {
    super(...arguments);
    // @ts-expect-error (non strict)
    this.iframe = null;
  }
  componentDidMount() {
    let { iFrameRef: r } = this.props;
    this.iframe = r.current;
  }
  shouldComponentUpdate(r) {
    let { scale: n, active: a } = this.props;
    return n !== r.scale && this.setIframeInnerZoom(r.scale), a !== r.active && this.iframe.setAttribute("data-is-storybook", r.active ? "tr\
ue" : "false"), r.children.props.src !== this.props.children.props.src;
  }
  setIframeInnerZoom(r) {
    try {
      Object.assign(this.iframe.contentDocument.body.style, {
        width: `${r * 100}%`,
        height: `${r * 100}%`,
        transform: `scale(${1 / r})`,
        transformOrigin: "top left"
      });
    } catch {
      this.setIframeZoom(r);
    }
  }
  setIframeZoom(r) {
    Object.assign(this.iframe.style, {
      width: `${r * 100}%`,
      height: `${r * 100}%`,
      transform: `scale(${1 / r})`,
      transformOrigin: "top left"
    });
  }
  render() {
    let { children: r } = this.props;
    return /* @__PURE__ */ xf.createElement(xf.Fragment, null, r);
  }
};
o(Cl, "ZoomIFrame");
var Mo = Cl;

// src/components/components/Zoom/Zoom.tsx
var E3 = {
  Element: Rf,
  IFrame: Mo
};

// src/components/components/ErrorFormatter/ErrorFormatter.tsx
import Pe, { Fragment as kr } from "react";
import { global as S3 } from "@storybook/global";
import { styled as Ml } from "storybook/theming";
var { document: C3 } = S3, M3 = Ml.strong(({ theme: e }) => ({
  color: e.color.orange
})), A3 = Ml.strong(({ theme: e }) => ({
  color: e.color.ancillary,
  textDecoration: "underline"
})), Ef = Ml.em(({ theme: e }) => ({
  color: e.textMutedColor
})), L3 = /(Error): (.*)\n/, I3 = /at (?:(.*) )?\(?(.+)\)?/, z3 = /([^@]+)?(?:\/<)?@(.+)?/, T3 = /([^@]+)?@(.+)?/, H3 = /* @__PURE__ */ o(({
error: e }) => {
  if (!e)
    return /* @__PURE__ */ Pe.createElement(kr, null, "This error has no stack or message");
  if (!e.stack)
    return /* @__PURE__ */ Pe.createElement(kr, null, e.message || "This error has no stack or message");
  let t = e.stack.toString();
  t && e.message && !t.includes(e.message) && (t = `Error: ${e.message}

${t}`);
  let r = t.match(L3);
  if (!r)
    return /* @__PURE__ */ Pe.createElement(kr, null, t);
  let [, n, a] = r, i = t.split(/\n/).slice(1), [, ...c] = i.map((l) => {
    let s = l.match(I3) || l.match(z3) || l.match(T3);
    return s ? {
      name: (s[1] || "").replace("/<", ""),
      location: s[2].replace(C3.location.origin, "")
    } : null;
  }).filter(Boolean);
  return /* @__PURE__ */ Pe.createElement(kr, null, /* @__PURE__ */ Pe.createElement("span", null, n), ": ", /* @__PURE__ */ Pe.createElement(
  M3, null, a), /* @__PURE__ */ Pe.createElement("br", null), c.map(
    (l, s) => l?.name ? /* @__PURE__ */ Pe.createElement(kr, { key: s }, "  ", "at ", /* @__PURE__ */ Pe.createElement(A3, null, l.name), " \
(", /* @__PURE__ */ Pe.createElement(Ef, null, l.location), ")", /* @__PURE__ */ Pe.createElement("br", null)) : /* @__PURE__ */ Pe.createElement(
    kr, { key: s }, "  ", "at ", /* @__PURE__ */ Pe.createElement(Ef, null, l?.location), /* @__PURE__ */ Pe.createElement("br", null))
  ));
}, "ErrorFormatter");

// src/components/components/Form/Form.tsx
import { styled as f7 } from "storybook/theming";

// src/components/components/Form/Checkbox.tsx
import P3 from "react";
import { color as wn, styled as k3 } from "storybook/internal/theming";
var O3 = k3.input({
  appearance: "none",
  display: "grid",
  placeContent: "center",
  width: 14,
  height: 14,
  flexShrink: 0,
  margin: 0,
  border: `1px solid ${wn.border}`,
  borderRadius: 2,
  backgroundColor: "white",
  transition: "background-color 0.1s",
  "&:enabled": {
    cursor: "pointer"
  },
  "&:disabled": {
    backgroundColor: wn.medium
  },
  "&:disabled:checked, &:disabled:indeterminate": {
    backgroundColor: wn.mediumdark
  },
  "&:checked, &:indeterminate": {
    backgroundColor: wn.secondary
  },
  "&:checked::before": {
    content: '""',
    width: 14,
    height: 14,
    background: `no-repeat center url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Cpath fill='n\
one' stroke='%23fff' stroke-width='2' d='m3 7 2.5 2.5L11 4'/%3E%3C/svg%3E")`
  },
  "&:indeterminate::before": {
    content: '""',
    width: 8,
    height: 2,
    background: "white"
  },
  "&:enabled:focus-visible": {
    outline: `1px solid ${wn.secondary}`,
    outlineOffset: 1
  }
}), Sf = /* @__PURE__ */ o((e) => /* @__PURE__ */ P3.createElement(O3, { ...e, type: "checkbox" }), "Checkbox");

// src/components/components/Form/Field.tsx
import Al from "react";
import { styled as Cf } from "storybook/theming";
var B3 = Cf.label(({ theme: e }) => ({
  display: "flex",
  borderBottom: `1px solid ${e.appBorderColor}`,
  margin: "0 15px",
  padding: "8px 0",
  "&:last-child": {
    marginBottom: "3rem"
  }
})), N3 = Cf.span(({ theme: e }) => ({
  minWidth: 100,
  fontWeight: e.typography.weight.bold,
  marginRight: 15,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  lineHeight: "16px"
})), Mf = /* @__PURE__ */ o(({ label: e, children: t, ...r }) => /* @__PURE__ */ Al.createElement(B3, { ...r }, e ? /* @__PURE__ */ Al.createElement(
N3, null, /* @__PURE__ */ Al.createElement("span", null, e)) : null, t), "Field");

// src/components/components/Form/Input.tsx
import D3 from "react";
import { forwardRef as _3 } from "react";
import { styled as V3 } from "storybook/theming";

// src/components/components/Form/styles.ts
var Or = /* @__PURE__ */ o(({ size: e }) => {
  switch (e) {
    case "100%":
      return { width: "100%" };
    case "flex":
      return { flex: 1 };
    case "auto":
    default:
      return { display: "inline" };
  }
}, "sizes"), Ao = /* @__PURE__ */ o(({
  align: e
}) => {
  switch (e) {
    case "end":
      return { textAlign: "right" };
    case "center":
      return { textAlign: "center" };
    case "start":
    default:
      return { textAlign: "left" };
  }
}, "alignment"), Lo = /* @__PURE__ */ o(({
  valid: e,
  theme: t
}) => {
  switch (e) {
    case "valid":
      return { boxShadow: `${t.color.positive} 0 0 0 1px inset !important` };
    case "error":
      return { boxShadow: `${t.color.negative} 0 0 0 1px inset !important` };
    case "warn":
      return {
        boxShadow: `${t.color.warning} 0 0 0 1px inset`
      };
    case void 0:
    case null:
    default:
      return {};
  }
}, "validation"), F3 = {
  // resets
  appearance: "none",
  border: "0 none",
  boxSizing: "inherit",
  display: " block",
  margin: " 0",
  background: "transparent",
  padding: 0,
  fontSize: "inherit",
  position: "relative"
}, Io = /* @__PURE__ */ o(({ theme: e }) => ({
  ...F3,
  transition: "box-shadow 200ms ease-out, opacity 200ms ease-out",
  color: e.input.color || "inherit",
  background: e.input.background,
  boxShadow: `${e.input.border} 0 0 0 1px inset`,
  borderRadius: e.input.borderRadius,
  fontSize: e.typography.size.s2 - 1,
  lineHeight: "20px",
  padding: "6px 10px",
  // 32
  boxSizing: "border-box",
  height: 32,
  '&[type="file"]': {
    height: "auto"
  },
  "&:focus": {
    boxShadow: `${e.color.secondary} 0 0 0 1px inset`,
    outline: "none",
    "@media (forced-colors: active)": {
      outline: "1px solid highlight"
    }
  },
  "&[disabled]": {
    cursor: "not-allowed",
    opacity: 0.5
  },
  "&:-webkit-autofill": { WebkitBoxShadow: `0 0 0 3em ${e.color.lightest} inset` },
  "&::placeholder": {
    color: e.textMutedColor,
    opacity: 1
  }
}), "styles");

// src/components/components/Form/Input.tsx
var Af = Object.assign(
  V3(
    _3(/* @__PURE__ */ o(function({ size: t, valid: r, align: n, ...a }, i) {
      return /* @__PURE__ */ D3.createElement("input", { ...a, ref: i });
    }, "Input"))
  )(Io, Or, Ao, Lo, {
    minHeight: 32
  }),
  {
    displayName: "Input"
  }
);

// src/components/components/Form/Radio.tsx
import $3 from "react";
import { color as bn, styled as j3 } from "storybook/internal/theming";
var W3 = j3.input({
  appearance: "none",
  display: "grid",
  placeContent: "center",
  width: 16,
  height: 16,
  flexShrink: 0,
  margin: -1,
  border: `1px solid ${bn.border}`,
  borderRadius: 8,
  backgroundColor: "white",
  transition: "background-color 0.1s",
  "&:enabled": {
    cursor: "pointer"
  },
  "&:disabled": {
    backgroundColor: bn.medium
  },
  "&:disabled:checked": {
    backgroundColor: bn.mediumdark
  },
  "&:checked": {
    backgroundColor: bn.secondary,
    boxShadow: "inset 0 0 0 2px white"
  },
  "&:enabled:focus-visible": {
    outline: `1px solid ${bn.secondary}`,
    outlineOffset: 1
  }
}), Lf = /* @__PURE__ */ o((e) => /* @__PURE__ */ $3.createElement(W3, { ...e, type: "radio" }), "Radio");

// src/components/components/Form/Select.tsx
import Br from "react";
import { lighten as U3, styled as q3 } from "storybook/theming";

// src/preview-api/modules/preview-web/render/animation-utils.ts
function If() {
  try {
    return (
      // @ts-expect-error This property exists in Vitest browser mode
      !!globalThis.__vitest_browser__ || !!globalThis.window?.navigator?.userAgent?.match(/StorybookTestRunner/)
    );
  } catch {
    return !1;
  }
}
o(If, "isTestEnvironment");

// src/components/components/Form/Select.tsx
var G3 = q3.select(Or, ({ theme: e }) => ({
  appearance: "none",
  background: `calc(100% - 12px) center no-repeat url("data:image/svg+xml,%3Csvg width='8' height='4' viewBox='0 0 8 4' fill='none' xmlns='h\
ttp://www.w3.org/2000/svg'%3E%3Cpath d='M1.30303 0.196815C1.13566 0.0294472 0.864304 0.0294472 0.696937 0.196815C0.529569 0.364182 0.529569 \
0.635539 0.696937 0.802906L3.69694 3.80291C3.8643 3.97027 4.13566 3.97027 4.30303 3.80291L7.30303 0.802906C7.4704 0.635539 7.4704 0.364182 7\
.30303 0.196815C7.13566 0.0294473 6.8643 0.0294473 6.69694 0.196815L3.99998 2.89377L1.30303 0.196815Z' fill='%2373828C'/%3E%3C/svg%3E%0A")`,
  backgroundSize: 10,
  padding: "6px 30px 6px 10px",
  "@supports (appearance: base-select)": {
    appearance: "base-select",
    background: e.input.background,
    padding: "6px 10px"
  },
  transition: "box-shadow 200ms ease-out, opacity 200ms ease-out",
  color: e.input.color || "inherit",
  boxShadow: `${e.input.border} 0 0 0 1px inset`,
  borderRadius: e.input.borderRadius,
  fontSize: e.typography.size.s2 - 1,
  lineHeight: "20px",
  boxSizing: "border-box",
  border: "none",
  cursor: "pointer",
  "& > button": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 8,
    "& > svg": {
      width: 14,
      height: 14,
      color: e.color.mediumdark
    }
  },
  "&:has(option:not([hidden]):checked)": {
    color: e.color.defaultText
  },
  "&:focus-visible, &:focus-within": {
    outline: "none",
    boxShadow: `${e.color.secondary} 0 0 0 1px inset`
  },
  "&::picker-icon": {
    display: "none"
  },
  "&::picker(select)": {
    appearance: "base-select",
    border: "1px solid #e4e4e7",
    padding: 4,
    marginTop: 4,
    background: e.base === "light" ? U3(e.background.app) : e.background.app,
    filter: `
      drop-shadow(0 5px 5px rgba(0,0,0,0.05))
      drop-shadow(0 0 3px rgba(0,0,0,0.1))
    `,
    borderRadius: e.appBorderRadius + 2,
    fontSize: e.typography.size.s1,
    cursor: "default",
    transition: "opacity 100ms ease-in-out, transform 100ms ease-in-out",
    transformOrigin: "top",
    transform: "translateY(0)",
    opacity: 1,
    "@starting-style": {
      transform: "translateY(-0.25rem) scale(0.95)",
      opacity: 0
    }
  },
  "& optgroup label": {
    display: "block",
    padding: "3px 6px"
  },
  "& option": {
    lineHeight: "18px",
    padding: "7px 10px",
    borderRadius: 4,
    outline: "none",
    cursor: "pointer",
    color: e.color.defaultText,
    "&::checkmark": {
      display: "none"
    },
    "&:hover, &:focus-visible": {
      backgroundColor: e.background.hoverable
    },
    "&:checked": {
      color: e.color.secondary,
      fontWeight: e.typography.weight.bold
    },
    "&:disabled": {
      backgroundColor: "transparent",
      cursor: "default",
      color: e.color.defaultText
    }
  }
})), zf = /* @__PURE__ */ o(({ children: e, ...t }) => (
  // @ts-expect-error Weird props mismatch
  /* @__PURE__ */ Br.createElement(G3, { ...t }, !If() && /* @__PURE__ */ Br.createElement("button", null, /* @__PURE__ */ Br.createElement(
  "selectedcontent", null), /* @__PURE__ */ Br.createElement(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    },
    /* @__PURE__ */ Br.createElement("path", { d: "m6 9 6 6 6-6" })
  )), /* @__PURE__ */ Br.createElement("optgroup", null, e))
), "Select");

// src/components/components/Form/Textarea.tsx
import c7, { forwardRef as s7 } from "react";

// ../node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.esm.js
en();
Fn();
import * as Qe from "react";

// ../node_modules/use-latest/dist/use-latest.esm.js
import X3 from "react";

// ../node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js
import { useLayoutEffect as Y3 } from "react";
var Tf = Y3;

// ../node_modules/use-latest/dist/use-latest.esm.js
var Hf = /* @__PURE__ */ o(function(t) {
  var r = X3.useRef(t);
  return Tf(function() {
    r.current = t;
  }), r;
}, "useLatest");

// ../node_modules/use-composed-ref/dist/use-composed-ref.esm.js
import Pf from "react";
var kf = /* @__PURE__ */ o(function(t, r) {
  if (typeof t == "function") {
    t(r);
    return;
  }
  t.current = r;
}, "updateRef"), Of = /* @__PURE__ */ o(function(t, r) {
  var n = Pf.useRef();
  return Pf.useCallback(function(a) {
    t.current = a, n.current && kf(n.current, null), n.current = r, r && kf(r, a);
  }, [r]);
}, "useComposedRef");

// ../node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.esm.js
var Bf = {
  "min-height": "0",
  "max-height": "none",
  height: "0",
  visibility: "hidden",
  overflow: "hidden",
  position: "absolute",
  "z-index": "-1000",
  top: "0",
  right: "0",
  display: "block"
}, Z3 = /* @__PURE__ */ o(function(t) {
  Object.keys(Bf).forEach(function(r) {
    t.style.setProperty(r, Bf[r], "important");
  });
}, "forceHiddenStyles"), Nf = Z3, Ee = null, Ff = /* @__PURE__ */ o(function(t, r) {
  var n = t.scrollHeight;
  return r.sizingStyle.boxSizing === "border-box" ? n + r.borderSize : n - r.paddingSize;
}, "getHeight");
function K3(e, t, r, n) {
  r === void 0 && (r = 1), n === void 0 && (n = 1 / 0), Ee || (Ee = document.createElement("textarea"), Ee.setAttribute("tabindex", "-1"), Ee.
  setAttribute("aria-hidden", "true"), Nf(Ee)), Ee.parentNode === null && document.body.appendChild(Ee);
  var a = e.paddingSize, i = e.borderSize, c = e.sizingStyle, l = c.boxSizing;
  Object.keys(c).forEach(function(m) {
    var v = m;
    Ee.style[v] = c[v];
  }), Nf(Ee), Ee.value = t;
  var s = Ff(Ee, e);
  Ee.value = t, s = Ff(Ee, e), Ee.value = "x";
  var u = Ee.scrollHeight - a, f = u * r;
  l === "border-box" && (f = f + a + i), s = Math.max(f, s);
  var d = u * n;
  return l === "border-box" && (d = d + a + i), s = Math.min(d, s), [s, u];
}
o(K3, "calculateNodeHeight");
var Df = /* @__PURE__ */ o(function() {
}, "noop"), J3 = /* @__PURE__ */ o(function(t, r) {
  return t.reduce(function(n, a) {
    return n[a] = r[a], n;
  }, {});
}, "pick"), Q3 = [
  "borderBottomWidth",
  "borderLeftWidth",
  "borderRightWidth",
  "borderTopWidth",
  "boxSizing",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "letterSpacing",
  "lineHeight",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  // non-standard
  "tabSize",
  "textIndent",
  // non-standard
  "textRendering",
  "textTransform",
  "width",
  "wordBreak",
  "wordSpacing",
  "scrollbarGutter"
], e7 = !!document.documentElement.currentStyle, t7 = /* @__PURE__ */ o(function(t) {
  var r = window.getComputedStyle(t);
  if (r === null)
    return null;
  var n = J3(Q3, r), a = n.boxSizing;
  if (a === "")
    return null;
  e7 && a === "border-box" && (n.width = parseFloat(n.width) + parseFloat(n.borderRightWidth) + parseFloat(n.borderLeftWidth) + parseFloat(n.
  paddingRight) + parseFloat(n.paddingLeft) + "px");
  var i = parseFloat(n.paddingBottom) + parseFloat(n.paddingTop), c = parseFloat(n.borderBottomWidth) + parseFloat(n.borderTopWidth);
  return {
    sizingStyle: n,
    paddingSize: i,
    borderSize: c
  };
}, "getSizingData"), r7 = t7;
function Ll(e, t, r) {
  var n = Hf(r);
  Qe.useLayoutEffect(function() {
    var a = /* @__PURE__ */ o(function(c) {
      return n.current(c);
    }, "handler");
    if (e)
      return e.addEventListener(t, a), function() {
        return e.removeEventListener(t, a);
      };
  }, []);
}
o(Ll, "useListener");
var n7 = /* @__PURE__ */ o(function(t, r) {
  Ll(document.body, "reset", function(n) {
    t.current.form === n.target && r(n);
  });
}, "useFormResetListener"), o7 = /* @__PURE__ */ o(function(t) {
  Ll(window, "resize", t);
}, "useWindowResizeListener"), a7 = /* @__PURE__ */ o(function(t) {
  Ll(document.fonts, "loadingdone", t);
}, "useFontsLoadedListener"), i7 = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"], l7 = /* @__PURE__ */ o(function(t, r) {
  var n = t.cacheMeasurements, a = t.maxRows, i = t.minRows, c = t.onChange, l = c === void 0 ? Df : c, s = t.onHeightChange, u = s === void 0 ?
  Df : s, f = pr(t, i7), d = f.value !== void 0, m = Qe.useRef(null), v = Of(m, r), y = Qe.useRef(0), p = Qe.useRef(), h = /* @__PURE__ */ o(
  function() {
    var b = m.current, x = n && p.current ? p.current : r7(b);
    if (x) {
      p.current = x;
      var E = K3(x, b.value || b.placeholder || "x", i, a), R = E[0], S = E[1];
      y.current !== R && (y.current = R, b.style.setProperty("height", R + "px", "important"), u(R, {
        rowHeight: S
      }));
    }
  }, "resizeTextarea"), g = /* @__PURE__ */ o(function(b) {
    d || h(), l(b);
  }, "handleChange");
  return Qe.useLayoutEffect(h), n7(m, function() {
    if (!d) {
      var w = m.current.value;
      requestAnimationFrame(function() {
        var b = m.current;
        b && w !== b.value && h();
      });
    }
  }), o7(h), a7(h), /* @__PURE__ */ Qe.createElement("textarea", W({}, f, {
    onChange: g,
    ref: v
  }));
}, "TextareaAutosize"), _f = /* @__PURE__ */ Qe.forwardRef(l7);

// src/components/components/Form/Textarea.tsx
import { styled as u7 } from "storybook/theming";
var Vf = Object.assign(
  u7(
    s7(/* @__PURE__ */ o(function({ size: t, valid: r, align: n, ...a }, i) {
      return /* @__PURE__ */ c7.createElement(_f, { ...a, ref: i });
    }, "Textarea"))
  )(Io, Or, Ao, Lo, ({ height: e = 400 }) => ({
    overflow: "visible",
    maxHeight: e
  })),
  {
    displayName: "Textarea"
  }
);

// src/components/components/Form/Form.tsx
var d7 = Object.assign(
  f7.form({
    boxSizing: "border-box",
    width: "100%"
  }),
  {
    Field: Mf,
    Input: Af,
    Select: zf,
    Textarea: Vf,
    Button: Hr,
    Checkbox: Sf,
    Radio: Lf
  }
);

// src/components/components/tooltip/lazy-WithTooltip.tsx
import qr, { Suspense as ep, lazy as tp } from "react";
var s6 = tp(
  () => Promise.resolve().then(() => (Wo(), i0)).then((e) => ({ default: e.WithTooltip }))
), u6 = /* @__PURE__ */ o((e) => /* @__PURE__ */ qr.createElement(ep, { fallback: /* @__PURE__ */ qr.createElement("div", null) }, /* @__PURE__ */ qr.
createElement(s6, { ...e })), "WithTooltip"), f6 = tp(
  () => Promise.resolve().then(() => (Wo(), i0)).then((e) => ({ default: e.WithTooltipPure }))
), d6 = /* @__PURE__ */ o((e) => /* @__PURE__ */ qr.createElement(ep, { fallback: /* @__PURE__ */ qr.createElement("div", null) }, /* @__PURE__ */ qr.
createElement(f6, { ...e })), "WithTooltipPure");

// src/components/components/tooltip/TooltipMessage.tsx
import Gr from "react";
import { styled as zn } from "storybook/theming";
var p6 = zn.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold
})), m6 = zn.span(), h6 = zn.div(({ theme: e }) => ({
  marginTop: 8,
  textAlign: "center",
  "> *": {
    margin: "0 8px",
    fontWeight: e.typography.weight.bold
  }
})), g6 = zn.div(({ theme: e }) => ({
  color: e.color.defaultText,
  lineHeight: "18px"
})), v6 = zn.div({
  padding: 15,
  width: 280,
  boxSizing: "border-box"
}), w6 = /* @__PURE__ */ o(({ title: e, desc: t, links: r }) => /* @__PURE__ */ Gr.createElement(v6, null, /* @__PURE__ */ Gr.createElement(
g6, null, e && /* @__PURE__ */ Gr.createElement(p6, null, e), t && /* @__PURE__ */ Gr.createElement(m6, null, t)), r && /* @__PURE__ */ Gr.createElement(
h6, null, r.map(({ title: n, ...a }) => /* @__PURE__ */ Gr.createElement(Ii, { ...a, key: n }, n)))), "TooltipMessage");

// src/components/components/tooltip/TooltipNote.tsx
import b6 from "react";
import { styled as y6 } from "storybook/theming";
var R6 = y6.div(({ theme: e }) => ({
  padding: "2px 6px",
  lineHeight: "16px",
  fontSize: 10,
  fontWeight: e.typography.weight.bold,
  color: e.color.lightest,
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.3)",
  borderRadius: 4,
  whiteSpace: "nowrap",
  pointerEvents: "none",
  zIndex: -1,
  background: e.base === "light" ? "rgba(60, 60, 60, 0.9)" : "rgba(0, 0, 0, 0.95)",
  margin: 6
})), x6 = /* @__PURE__ */ o(({ note: e, ...t }) => /* @__PURE__ */ b6.createElement(R6, { ...t }, e), "TooltipNote");

// src/components/components/tooltip/TooltipLinkList.tsx
import Tn, { Fragment as T6, useCallback as H6 } from "react";
import { styled as np } from "storybook/theming";

// src/components/components/tooltip/ListItem.tsx
var rp = ge(rn(), 1);
import at from "react";
import { styled as Yr } from "storybook/theming";
var E6 = Yr(({ active: e, loading: t, disabled: r, ...n }) => /* @__PURE__ */ at.createElement("span", { ...n }))(
  ({ theme: e }) => ({
    color: e.color.defaultText,
    // Previously was theme.typography.weight.normal but this weight does not exists in Theme
    fontWeight: e.typography.weight.regular
  }),
  ({ active: e, theme: t }) => e ? {
    color: t.color.secondary,
    fontWeight: t.typography.weight.bold
  } : {},
  ({ loading: e, theme: t }) => e ? {
    display: "inline-block",
    flex: "none",
    ...t.animation.inlineGlow
  } : {},
  ({ disabled: e, theme: t }) => e ? {
    color: t.textMutedColor
  } : {}
), S6 = Yr.span({
  display: "flex",
  "& svg": {
    height: 12,
    width: 12,
    margin: "3px 0",
    verticalAlign: "top"
  },
  "& path": {
    fill: "inherit"
  }
}), C6 = Yr.span(
  {
    flex: 1,
    textAlign: "left",
    display: "flex",
    flexDirection: "column"
  },
  ({ isIndented: e }) => e ? { marginLeft: 24 } : {}
), M6 = Yr.span(
  ({ theme: e }) => ({
    fontSize: "11px",
    lineHeight: "14px"
  }),
  ({ active: e, theme: t }) => e ? {
    color: t.color.secondary
  } : {},
  ({ theme: e, disabled: t }) => t ? {
    color: e.textMutedColor
  } : {}
), A6 = Yr.span(
  ({ active: e, theme: t }) => e ? {
    color: t.color.secondary
  } : {},
  () => ({
    display: "flex",
    maxWidth: 14
  })
), L6 = Yr.div(
  ({ theme: e }) => ({
    width: "100%",
    border: "none",
    borderRadius: e.appBorderRadius,
    background: "none",
    fontSize: e.typography.size.s1,
    transition: "all 150ms ease-out",
    color: e.color.dark,
    textDecoration: "none",
    justifyContent: "space-between",
    lineHeight: "18px",
    padding: "7px 10px",
    display: "flex",
    alignItems: "center",
    "& > * + *": {
      paddingLeft: 10
    }
  }),
  ({ theme: e, href: t, onClick: r }) => (t || r) && {
    cursor: "pointer",
    "&:hover": {
      background: e.background.hoverable
    },
    "&:hover svg": {
      opacity: 1
    }
  },
  ({ theme: e, as: t }) => t === "label" && {
    "&:has(input:not(:disabled))": {
      cursor: "pointer",
      "&:hover": {
        background: e.background.hoverable
      }
    }
  },
  ({ disabled: e }) => e && { cursor: "not-allowed" }
), I6 = (0, rp.default)(100)(({ onClick: e, input: t, href: r, LinkWrapper: n }) => ({
  ...e && {
    as: "button",
    onClick: e
  },
  ...t && {
    as: "label"
  },
  ...r && {
    as: "a",
    href: r,
    ...n && {
      as: n,
      to: r
    }
  }
})), z6 = /* @__PURE__ */ o((e) => {
  let {
    loading: t = !1,
    title: r = /* @__PURE__ */ at.createElement("span", null, "Loading state"),
    center: n = null,
    right: a = null,
    active: i = !1,
    disabled: c = !1,
    isIndented: l = !1,
    href: s = void 0,
    onClick: u = void 0,
    icon: f,
    input: d,
    LinkWrapper: m = void 0,
    ...v
  } = e, y = { active: i, disabled: c }, p = I6(e), h = f || d;
  return /* @__PURE__ */ at.createElement(L6, { ...v, ...y, ...p }, /* @__PURE__ */ at.createElement(at.Fragment, null, h && /* @__PURE__ */ at.
  createElement(A6, { ...y }, h), r || n ? /* @__PURE__ */ at.createElement(C6, { isIndented: l && !h }, r && /* @__PURE__ */ at.createElement(
  E6, { ...y, loading: t }, r), n && /* @__PURE__ */ at.createElement(M6, { ...y }, n)) : null, a && /* @__PURE__ */ at.createElement(S6, { ...y },
  a)));
}, "ListItem"), l0 = z6;

// src/components/components/tooltip/TooltipLinkList.tsx
var P6 = np.div(
  {
    minWidth: 180,
    overflow: "hidden",
    overflowY: "auto",
    maxHeight: 15.5 * 32 + 8
    // 15.5 items at 32px each + 8px padding
  },
  ({ theme: e }) => ({
    borderRadius: e.appBorderRadius + 2
  }),
  ({ theme: e }) => e.base === "dark" ? { background: e.background.content } : {}
), k6 = np.div(({ theme: e }) => ({
  padding: 4,
  "& + &": {
    borderTop: `1px solid ${e.appBorderColor}`
  }
})), O6 = /* @__PURE__ */ o(({ id: e, onClick: t, ...r }) => {
  let { active: n, disabled: a, title: i, href: c } = r, l = H6(
    (s) => t?.(s, { id: e, active: n, disabled: a, title: i, href: c }),
    [t, e, n, a, i, c]
  );
  return /* @__PURE__ */ Tn.createElement(l0, { id: `list-item-${e}`, ...r, ...t && { onClick: l } });
}, "Item"), c0 = /* @__PURE__ */ o(({ links: e, LinkWrapper: t, ...r }) => {
  let n = Array.isArray(e[0]) ? e : [e], a = n.some(
    (i) => i.some((c) => "icon" in c && c.icon || "input" in c && c.input)
  );
  return /* @__PURE__ */ Tn.createElement(P6, { ...r }, n.filter((i) => i.length).map((i, c) => /* @__PURE__ */ Tn.createElement(k6, { key: i.
  map((l) => l.id).join(`~${c}~`) }, i.map((l) => "content" in l ? /* @__PURE__ */ Tn.createElement(T6, { key: l.id }, l.content) : /* @__PURE__ */ Tn.
  createElement(O6, { key: l.id, isIndented: a, LinkWrapper: t, ...l })))));
}, "TooltipLinkList");

// src/components/components/tabs/tabs.tsx
import Fe, { Component as up, memo as rw, useMemo as nw } from "react";
import { sanitize as ow } from "storybook/internal/csf";
import { styled as g0 } from "storybook/theming";

// src/components/components/bar/bar.tsx
oo();
import Xr, { Children as B6 } from "react";
import { styled as u0 } from "storybook/theming";
var s0 = u0.div(
  {
    display: "flex",
    whiteSpace: "nowrap",
    flexBasis: "auto",
    marginLeft: 3,
    marginRight: 10
  },
  ({ scrollable: e }) => e ? { flexShrink: 0 } : {},
  ({ left: e }) => e ? {
    "& > *": {
      marginLeft: 4
    }
  } : {},
  ({ right: e }) => e ? {
    gap: 6
  } : {}
);
s0.displayName = "Side";
var N6 = /* @__PURE__ */ o(({ children: e, className: t, scrollable: r }) => r ? /* @__PURE__ */ Xr.createElement(Er, { vertical: !1, className: t },
e) : /* @__PURE__ */ Xr.createElement("div", { className: t }, e), "UnstyledBar"), f0 = u0(N6)(
  ({ backgroundColor: e, theme: t, scrollable: r = !0 }) => ({
    color: t.barTextColor,
    width: "100%",
    minHeight: 40,
    flexShrink: 0,
    scrollbarColor: `${t.barTextColor} ${e || t.barBg}`,
    scrollbarWidth: "thin",
    overflow: r ? "auto" : "hidden",
    overflowY: "hidden"
  }),
  ({ theme: e, border: t = !1 }) => t ? {
    boxShadow: `${e.appBorderColor}  0 -1px 0 0 inset`,
    background: e.barBg
  } : {}
);
f0.displayName = "Bar";
var F6 = u0.div(({ bgColor: e }) => ({
  display: "flex",
  justifyContent: "space-between",
  position: "relative",
  flexWrap: "nowrap",
  flexShrink: 0,
  height: 40,
  backgroundColor: e || ""
})), Uo = /* @__PURE__ */ o(({ children: e, backgroundColor: t, className: r, ...n }) => {
  let [a, i] = B6.toArray(e);
  return /* @__PURE__ */ Xr.createElement(f0, { backgroundColor: t, className: `sb-bar ${r}`, ...n }, /* @__PURE__ */ Xr.createElement(F6, {
  bgColor: t }, /* @__PURE__ */ Xr.createElement(s0, { scrollable: n.scrollable, left: !0 }, a), i ? /* @__PURE__ */ Xr.createElement(s0, { right: !0 },
  i) : null));
}, "FlexBar");
Uo.displayName = "FlexBar";

// src/components/components/bar/button.tsx
import op, { forwardRef as D6 } from "react";
import { isPropValid as _6, styled as V6 } from "storybook/theming";
var $6 = /* @__PURE__ */ o((e) => typeof e.props.href == "string", "isLink"), j6 = /* @__PURE__ */ o((e) => typeof e.props.href != "string",
"isButton");
function W6({ children: e, ...t }, r) {
  let n = { props: t, ref: r };
  if ($6(n))
    return /* @__PURE__ */ op.createElement("a", { ref: n.ref, ...n.props }, e);
  if (j6(n))
    return /* @__PURE__ */ op.createElement("button", { ref: n.ref, type: "button", ...n.props }, e);
  throw new Error("invalid props");
}
o(W6, "ForwardRefFunction");
var ap = D6(W6);
ap.displayName = "ButtonOrLink";
var cr = V6(ap, { shouldForwardProp: _6 })(
  {
    whiteSpace: "normal",
    display: "inline-flex",
    overflow: "hidden",
    verticalAlign: "top",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textDecoration: "none",
    "&:empty": {
      display: "none"
    },
    "&[hidden]": {
      display: "none"
    }
  },
  ({ theme: e }) => ({
    padding: "0 15px",
    transition: "color 0.2s linear, border-bottom-color 0.2s linear",
    height: 40,
    lineHeight: "12px",
    cursor: "pointer",
    background: "transparent",
    border: "0 solid transparent",
    borderTop: "3px solid transparent",
    borderBottom: "3px solid transparent",
    fontWeight: "bold",
    fontSize: 13,
    "&:focus": {
      outline: "0 none",
      borderBottomColor: e.barSelectedColor
    }
  }),
  ({ active: e, textColor: t, theme: r }) => e ? {
    color: t || r.barSelectedColor,
    borderBottomColor: r.barSelectedColor
  } : {
    color: t || r.barTextColor,
    borderBottomColor: "transparent",
    "&:hover": {
      color: r.barHoverColor
    }
  }
);
cr.displayName = "TabButton";

// src/components/components/tabs/EmptyTabContent.tsx
import qo from "react";
import { styled as Go } from "storybook/theming";
var U6 = Go.div(({ theme: e }) => ({
  height: "100%",
  display: "flex",
  padding: 30,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: 15,
  background: e.background.content
})), q6 = Go.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  maxWidth: 415
}), G6 = Go.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.bold,
  fontSize: e.typography.size.s2 - 1,
  textAlign: "center",
  color: e.textColor
})), Y6 = Go.div(({ theme: e }) => ({
  fontWeight: e.typography.weight.regular,
  fontSize: e.typography.size.s2 - 1,
  textAlign: "center",
  color: e.textMutedColor
})), Yo = /* @__PURE__ */ o(({ title: e, description: t, footer: r }) => /* @__PURE__ */ qo.createElement(U6, null, /* @__PURE__ */ qo.createElement(
q6, null, /* @__PURE__ */ qo.createElement(G6, null, e), t && /* @__PURE__ */ qo.createElement(Y6, null, t)), r), "EmptyTabContent");

// src/components/components/tabs/tabs.helpers.tsx
import X6, { Children as Z6 } from "react";
import { styled as K6 } from "storybook/theming";
var d0 = K6.div(
  ({ active: e }) => e ? { display: "block" } : { display: "none" }
), ip = /* @__PURE__ */ o((e) => Z6.toArray(e).map(
  // @ts-expect-error (non strict)
  ({
    props: { title: t, id: r, color: n, children: a }
  }) => {
    let i = Array.isArray(
      a
    ) ? a[0] : a;
    return {
      title: t,
      id: r,
      ...n ? { color: n } : {},
      render: typeof i == "function" ? i : ({ active: l }) => /* @__PURE__ */ X6.createElement(d0, { active: l, role: "tabpanel" }, i)
    };
  }
), "childrenToList");

// src/components/components/tabs/tabs.hooks.tsx
import sr, { useCallback as lp, useLayoutEffect as J6, useRef as Xo, useState as p0 } from "react";
import { sanitize as Q6 } from "storybook/internal/csf";
import { styled as cp } from "storybook/theming";
Wo();
var ew = cp.span(({ theme: e, isActive: t }) => ({
  display: "inline-block",
  width: 0,
  height: 0,
  marginLeft: 8,
  color: t ? e.color.secondary : e.color.mediumdark,
  borderRight: "3px solid transparent",
  borderLeft: "3px solid transparent",
  borderTop: "3px solid",
  transition: "transform .1s ease-out"
})), tw = cp(cr)(({ active: e, theme: t, preActive: r }) => `
    color: ${r || e ? t.barSelectedColor : t.barTextColor};
    .addon-collapsible-icon {
      color: ${r || e ? t.barSelectedColor : t.barTextColor};
    }
    &:hover {
      color: ${t.barHoverColor};
      .addon-collapsible-icon {
        color: ${t.barHoverColor};
      }
    }
  `);
function sp(e) {
  let t = Xo(), r = Xo(), n = Xo(/* @__PURE__ */ new Map()), { width: a = 1 } = Co({
    // @ts-expect-error (non strict)
    ref: t
  }), [i, c] = p0(e), [l, s] = p0([]), u = Xo(e), f = lp(
    ({
      menuName: m,
      actions: v
    }) => {
      let y = l.some(({ active: g }) => g), [p, h] = p0(!1);
      return /* @__PURE__ */ sr.createElement(sr.Fragment, null, /* @__PURE__ */ sr.createElement(
        a0,
        {
          interactive: !0,
          visible: p,
          onVisibleChange: h,
          placement: "bottom",
          delayHide: 100,
          tooltip: /* @__PURE__ */ sr.createElement(
            c0,
            {
              links: l.map(({ title: g, id: w, color: b, active: x }) => ({
                id: w,
                title: g,
                color: b,
                active: x,
                onClick: /* @__PURE__ */ o((E) => {
                  E.preventDefault(), v.onSelect(w);
                }, "onClick")
              }))
            }
          )
        },
        /* @__PURE__ */ sr.createElement(
          tw,
          {
            id: "addons-menu-button",
            ref: r,
            active: y,
            preActive: p,
            style: { visibility: l.length ? "visible" : "hidden" },
            "aria-hidden": !l.length,
            className: "tabbutton",
            type: "button",
            role: "tab"
          },
          m,
          /* @__PURE__ */ sr.createElement(
            ew,
            {
              className: "addon-collapsible-icon",
              isActive: y || p
            }
          )
        )
      ), l.map(({ title: g, id: w, color: b }, x) => {
        let E = `index-${x}`;
        return /* @__PURE__ */ sr.createElement(
          cr,
          {
            id: `tabbutton-${Q6(w) ?? E}`,
            style: { visibility: "hidden" },
            "aria-hidden": !0,
            tabIndex: -1,
            ref: (R) => {
              n.current.set(w, R);
            },
            className: "tabbutton",
            type: "button",
            key: w,
            textColor: b,
            role: "tab"
          },
          g
        );
      }));
    },
    [l]
  ), d = lp(() => {
    if (!t.current || !r.current)
      return;
    let { x: m, width: v } = t.current.getBoundingClientRect(), { width: y } = r.current.getBoundingClientRect(), p = l.length ? m + v - y :
    m + v, h = [], g = 0, w = e.filter((b) => {
      let { id: x } = b, E = n.current.get(x), { width: R = 0 } = E?.getBoundingClientRect() || {}, S = m + g + R > p;
      return (!S || !E) && h.push(b), g += R, S;
    });
    (h.length !== i.length || u.current !== e) && (c(h), s(w), u.current = e);
  }, [l.length, e, i]);
  return J6(d, [d, a]), {
    tabRefs: n,
    addonsRef: r,
    tabBarRef: t,
    visibleList: i,
    invisibleList: l,
    AddonTab: f
  };
}
o(sp, "useList");

// src/components/components/tabs/tabs.tsx
var aw = "/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */", iw = g0.div(
  ({ theme: e, bordered: t }) => t ? {
    backgroundClip: "padding-box",
    border: `1px solid ${e.appBorderColor}`,
    borderRadius: e.appBorderRadius,
    overflow: "hidden",
    boxSizing: "border-box"
  } : {},
  ({ absolute: e }) => e ? {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column"
  } : {
    display: "block"
  }
), v0 = g0.div({
  overflow: "hidden",
  "&:first-of-type": {
    marginLeft: -3
  },
  whiteSpace: "nowrap",
  flexGrow: 1
});
v0.displayName = "TabBar";
var lw = g0.div(
  {
    display: "block",
    position: "relative",
    container: "tab-content / inline-size"
  },
  ({ theme: e }) => ({
    fontSize: e.typography.size.s2 - 1,
    background: e.background.content
  }),
  ({ bordered: e, theme: t }) => e ? {
    borderRadius: `0 0 ${t.appBorderRadius - 1}px ${t.appBorderRadius - 1}px`
  } : {},
  ({ absolute: e, bordered: t }) => e ? {
    height: `calc(100% - ${t ? 42 : 40}px)`,
    position: "absolute",
    left: 0 + (t ? 1 : 0),
    right: 0 + (t ? 1 : 0),
    bottom: 0 + (t ? 1 : 0),
    top: 40 + (t ? 1 : 0),
    overflow: "auto",
    [`& > *:first-child${aw}`]: {
      position: "absolute",
      left: 0 + (t ? 1 : 0),
      right: 0 + (t ? 1 : 0),
      bottom: 0 + (t ? 1 : 0),
      top: 0 + (t ? 1 : 0),
      height: `calc(100% - ${t ? 2 : 0}px)`,
      overflow: "auto"
    }
  } : {}
), cw = /* @__PURE__ */ o(({ active: e, render: t, children: r }) => /* @__PURE__ */ Fe.createElement(d0, { active: e }, t ? t() : r), "TabW\
rapper");
var b0 = class b0 extends up {
  constructor(t) {
    super(t), this.state = { hasError: !1 };
  }
  static getDerivedStateFromError() {
    return { hasError: !0 };
  }
  componentDidCatch(t, r) {
    console.error("Error rendering addon panel"), console.error(t), console.error(r.componentStack);
  }
  render() {
    return this.state.hasError && this.props.active ? /* @__PURE__ */ Fe.createElement(
      Yo,
      {
        title: "This addon has errors",
        description: "Check your browser logs and addon code to pinpoint what went wrong. This issue was not caused by Storybook."
      }
    ) : this.props.children;
  }
};
o(b0, "TabErrorBoundary");
var m0 = b0, w0 = rw(
  ({
    children: e,
    selected: t = null,
    actions: r,
    absolute: n = !1,
    bordered: a = !1,
    tools: i = null,
    backgroundColor: c,
    id: l = null,
    menuName: s = "Tabs",
    emptyState: u,
    showToolsWhenEmpty: f
  }) => {
    let d = nw(
      () => ip(e).map((g, w) => ({
        ...g,
        active: t ? g.id === t : w === 0
      })),
      [e, t]
    ), { visibleList: m, tabBarRef: v, tabRefs: y, AddonTab: p } = sp(d), h = u ?? /* @__PURE__ */ Fe.createElement(Yo, { title: "Nothing fo\
und" });
    return !f && d.length === 0 ? h : (
      // @ts-expect-error (non strict)
      /* @__PURE__ */ Fe.createElement(iw, { absolute: n, bordered: a, id: l }, /* @__PURE__ */ Fe.createElement(Uo, { scrollable: !1, border: !0,
      backgroundColor: c }, /* @__PURE__ */ Fe.createElement(v0, { style: { whiteSpace: "normal" }, ref: v, role: "tablist" }, m.map(({ title: g,
      id: w, active: b, color: x }, E) => {
        let R = `index-${E}`;
        return /* @__PURE__ */ Fe.createElement(
          cr,
          {
            id: `tabbutton-${ow(w) ?? R}`,
            ref: (S) => {
              y.current.set(w, S);
            },
            className: `tabbutton ${b ? "tabbutton-active" : ""}`,
            type: "button",
            key: w,
            active: b,
            textColor: x,
            onClick: (S) => {
              S.preventDefault(), r.onSelect(w);
            },
            role: "tab"
          },
          typeof g == "function" ? /* @__PURE__ */ Fe.createElement("title", null) : g
        );
      }), /* @__PURE__ */ Fe.createElement(p, { menuName: s, actions: r })), i), /* @__PURE__ */ Fe.createElement(lw, { id: "panel-tab-conte\
nt", bordered: a, absolute: n }, d.length ? d.map(({ id: g, active: w, render: b }) => /* @__PURE__ */ Fe.createElement(m0, { key: g, active: w },
      Fe.createElement(b, { active: w }, null))) : h))
    );
  }
);
w0.displayName = "Tabs";
var Zo = class Zo extends up {
  constructor(r) {
    super(r);
    this.handlers = {
      onSelect: /* @__PURE__ */ o((r) => this.setState({ selected: r }), "onSelect")
    };
    this.state = {
      selected: r.initial
    };
  }
  render() {
    let { bordered: r = !1, absolute: n = !1, children: a, backgroundColor: i, menuName: c } = this.props, { selected: l } = this.state;
    return /* @__PURE__ */ Fe.createElement(
      w0,
      {
        bordered: r,
        absolute: n,
        selected: l,
        backgroundColor: i,
        menuName: c,
        actions: this.handlers
      },
      a
    );
  }
};
o(Zo, "TabsState"), Zo.defaultProps = {
  children: [],
  // @ts-expect-error (non strict)
  initial: null,
  absolute: !1,
  bordered: !1,
  backgroundColor: "",
  // @ts-expect-error (non strict)
  menuName: void 0
};
var h0 = Zo;

// src/components/components/bar/separator.tsx
import fp, { Fragment as sw } from "react";
import { styled as uw } from "storybook/theming";
var y0 = uw.span(
  ({ theme: e }) => ({
    width: 1,
    height: 20,
    background: e.appBorderColor,
    marginLeft: 2,
    marginRight: 2
  }),
  ({ force: e }) => e ? {} : {
    "& + &": {
      display: "none"
    }
  }
);
y0.displayName = "Separator";
var fw = /* @__PURE__ */ o((e) => e.reduce(
  (t, r, n) => r ? /* @__PURE__ */ fp.createElement(sw, { key: r.id || r.key || `f-${n}` }, t, n > 0 ? /* @__PURE__ */ fp.createElement(y0, {
  key: `s-${n}` }) : null, r.render() || r) : t,
  null
), "interleaveSeparators");

// src/components/components/addon-panel/addon-panel.tsx
import dw, { useEffect as pw, useRef as mw } from "react";
var hw = /* @__PURE__ */ o((e) => {
  let t = mw();
  return pw(() => {
    t.current = e;
  }, [e]), t.current;
}, "usePrevious"), gw = /* @__PURE__ */ o((e, t) => {
  let r = hw(t);
  return e ? t : r;
}, "useUpdate"), vw = /* @__PURE__ */ o(({ active: e, children: t }) => (
  // the hidden attribute is an valid html element that's both accessible and works to visually hide content
  /* @__PURE__ */ dw.createElement("div", { hidden: !e }, gw(e, t))
), "AddonPanel");

// src/components/brand/StorybookLogo.tsx
import it from "react";
var ww = /* @__PURE__ */ o(({ alt: e, ...t }) => /* @__PURE__ */ it.createElement("svg", { width: "200px", height: "40px", viewBox: "0 0 200\
 40", ...t, role: "img" }, e ? /* @__PURE__ */ it.createElement("title", null, e) : null, /* @__PURE__ */ it.createElement("defs", null, /* @__PURE__ */ it.
createElement(
  "path",
  {
    d: "M1.2 36.9L0 3.9c0-1.1.8-2 1.9-2.1l28-1.8a2 2 0 0 1 2.2 1.9 2 2 0 0 1 0 .1v36a2 2 0 0 1-2 2 2 2 0 0 1-.1 0L3.2 38.8a2 2 0 0 1-2-2z",
    id: "a"
  }
)), /* @__PURE__ */ it.createElement("g", { fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ it.createElement(
  "path",
  {
    d: "M53.3 31.7c-1.7 0-3.4-.3-5-.7-1.5-.5-2.8-1.1-3.9-2l1.6-3.5c2.2 1.5 4.6 2.3 7.3 2.3 1.5 0 2.5-.2 3.3-.7.7-.5 1.1-1 1.1-1.9 0-.7-.3-1.\
3-1-1.7s-2-.8-3.7-1.2c-2-.4-3.6-.9-4.8-1.5-1.1-.5-2-1.2-2.6-2-.5-1-.8-2-.8-3.2 0-1.4.4-2.6 1.2-3.6.7-1.1 1.8-2 3.2-2.6 1.3-.6 2.9-.9 4.7-.9 \
1.6 0 3.1.3 4.6.7 1.5.5 2.7 1.1 3.5 2l-1.6 3.5c-2-1.5-4.2-2.3-6.5-2.3-1.3 0-2.3.2-3 .8-.8.5-1.2 1.1-1.2 2 0 .5.2 1 .5 1.3.2.3.7.6 1.4.9l2.9.\
8c2.9.6 5 1.4 6.2 2.4a5 5 0 0 1 2 4.2 6 6 0 0 1-2.5 5c-1.7 1.2-4 1.9-7 1.9zm21-3.6l1.4-.1-.2 3.5-1.9.1c-2.4 0-4.1-.5-5.2-1.5-1.1-1-1.6-2.7-1\
.6-4.8v-6h-3v-3.6h3V11h4.8v4.6h4v3.6h-4v6c0 1.8.9 2.8 2.6 2.8zm11.1 3.5c-1.6 0-3-.3-4.3-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6.4-3 1-4.\
3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.3-1 1.7 0 3.2.3 4.4 1a7 7 0 0 1 3 2.8c.6 1.2 1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-2.7 1-4.\
4 1zm0-3.6c2.4 0 3.6-1.6 3.6-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.6-1c-2.3 0-3.5 1.4-3.5 4.4 0 3 1.2 4.6 3.5 4.6zm21.7-8.8l-2.7.3c-1.3.2-2\
.3.5-2.8 1.2-.6.6-.9 1.4-.9 2.5v8.2H96V15.7h4.6v2.6c.8-1.8 2.5-2.8 5-3h1.3l.3 4zm14-3.5h4.8L116.4 37h-4.9l3-6.6-6.4-14.8h5l4 10 4-10zm16-.4c\
1.4 0 2.6.3 3.6 1 1 .6 1.9 1.6 2.5 2.8.6 1.2.9 2.7.9 4.3 0 1.6-.3 3-1 4.3a6.9 6.9 0 0 1-2.4 2.9c-1 .7-2.2 1-3.6 1-1 0-2-.2-3-.7-.8-.4-1.5-1-\
2-1.9v2.4h-4.7V8.8h4.8v9c.5-.8 1.2-1.4 2-1.9.9-.4 1.8-.6 3-.6zM135.7 28c1.1 0 2-.4 2.6-1.2.6-.8 1-2 1-3.4 0-1.5-.4-2.5-1-3.3s-1.5-1.1-2.6-1.\
1-2 .3-2.6 1.1c-.6.8-1 2-1 3.3 0 1.5.4 2.6 1 3.4.6.8 1.5 1.2 2.6 1.2zm18.9 3.6c-1.7 0-3.2-.3-4.4-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6\
.4-3 1-4.3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.4-1 1.6 0 3 .3 4.3 1a7 7 0 0 1 3 2.8c.6 1.2 1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-\
2.7 1-4.3 1zm0-3.6c2.3 0 3.5-1.6 3.5-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.5-1c-2.4 0-3.6 1.4-3.6 4.4 0 3 1.2 4.6 3.6 4.6zm18 3.6c-1.7 0-3.\
2-.3-4.4-1a7 7 0 0 1-3-2.8c-.6-1.3-1-2.7-1-4.4 0-1.6.4-3 1-4.3a7 7 0 0 1 3-2.8c1.2-.7 2.7-1 4.4-1 1.6 0 3 .3 4.4 1a7 7 0 0 1 2.9 2.8c.6 1.2 \
1 2.7 1 4.3 0 1.7-.4 3.1-1 4.4a7 7 0 0 1-3 2.8c-1.2.7-2.7 1-4.3 1zm0-3.6c2.3 0 3.5-1.6 3.5-4.6 0-1.5-.3-2.6-1-3.4a3.2 3.2 0 0 0-2.5-1c-2.4 0\
-3.6 1.4-3.6 4.4 0 3 1.2 4.6 3.6 4.6zm27.4 3.4h-6l-6-7v7h-4.8V8.8h4.9v13.6l5.8-6.7h5.7l-6.6 7.5 7 8.2z",
    fill: "currentColor"
  }
), /* @__PURE__ */ it.createElement("mask", { id: "b", fill: "#fff" }, /* @__PURE__ */ it.createElement("use", { xlinkHref: "#a" })), /* @__PURE__ */ it.
createElement("use", { fill: "#FF4785", fillRule: "nonzero", xlinkHref: "#a" }), /* @__PURE__ */ it.createElement(
  "path",
  {
    d: "M23.7 5L24 .2l3.9-.3.1 4.8a.3.3 0 0 1-.5.2L26 3.8l-1.7 1.4a.3.3 0 0 1-.5-.3zm-5 10c0 .9 5.3.5 6 0 0-5.4-2.8-8.2-8-8.2-5.3 0-8.2 2.8-\
8.2 7.1 0 7.4 10 7.6 10 11.6 0 1.2-.5 1.9-1.8 1.9-1.6 0-2.2-.9-2.1-3.6 0-.6-6.1-.8-6.3 0-.5 6.7 3.7 8.6 8.5 8.6 4.6 0 8.3-2.5 8.3-7 0-7.9-10\
.2-7.7-10.2-11.6 0-1.6 1.2-1.8 2-1.8.6 0 2 0 1.9 3z",
    fill: "#FFF",
    fillRule: "nonzero",
    mask: "url(#b)"
  }
))), "StorybookLogo");

// src/components/brand/StorybookIcon.tsx
import Zr from "react";
var bw = /* @__PURE__ */ o((e) => /* @__PURE__ */ Zr.createElement("svg", { viewBox: "0 0 64 64", ...e }, /* @__PURE__ */ Zr.createElement("\
title", null, "Storybook icon"), /* @__PURE__ */ Zr.createElement("g", { id: "Artboard", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "\
evenodd" }, /* @__PURE__ */ Zr.createElement(
  "path",
  {
    d: "M8.04798541,58.7875918 L6.07908839,6.32540407 C6.01406344,4.5927838 7.34257463,3.12440831 9.07303814,3.01625434 L53.6958037,0.227331\
489 C55.457209,0.117243658 56.974354,1.45590096 57.0844418,3.21730626 C57.0885895,3.28366922 57.0906648,3.35014546 57.0906648,3.41663791 L57\
.0906648,60.5834697 C57.0906648,62.3483119 55.6599776,63.7789992 53.8951354,63.7789992 C53.847325,63.7789992 53.7995207,63.7779262 53.751758\
5,63.775781 L11.0978899,61.8600599 C9.43669044,61.7854501 8.11034889,60.4492961 8.04798541,58.7875918 Z",
    id: "path-1",
    fill: "#FF4785",
    fillRule: "nonzero"
  }
), /* @__PURE__ */ Zr.createElement(
  "path",
  {
    d: "M35.9095005,24.1768792 C35.9095005,25.420127 44.2838488,24.8242707 45.4080313,23.9509748 C45.4080313,15.4847538 40.8652557,11.035887\
8 32.5466666,11.0358878 C24.2280775,11.0358878 19.5673077,15.553972 19.5673077,22.3311017 C19.5673077,34.1346028 35.4965208,34.3605071 35.49\
65208,40.7987804 C35.4965208,42.606015 34.6115646,43.6790606 32.6646607,43.6790606 C30.127786,43.6790606 29.1248356,42.3834613 29.2428298,37\
.9783269 C29.2428298,37.0226907 19.5673077,36.7247626 19.2723223,37.9783269 C18.5211693,48.6535354 25.1720308,51.7326752 32.7826549,51.73267\
52 C40.1572906,51.7326752 45.939005,47.8018145 45.939005,40.6858282 C45.939005,28.035186 29.7738035,28.3740425 29.7738035,22.1051974 C29.773\
8035,19.5637737 31.6617103,19.2249173 32.7826549,19.2249173 C33.9625966,19.2249173 36.0864917,19.4328883 35.9095005,24.1768792 Z",
    id: "path9_fill-path",
    fill: "#FFFFFF",
    fillRule: "nonzero"
  }
), /* @__PURE__ */ Zr.createElement(
  "path",
  {
    d: "M44.0461638,0.830433986 L50.1874092,0.446606143 L50.443532,7.7810017 C50.4527198,8.04410717 50.2468789,8.26484453 49.9837734,8.27403\
237 C49.871115,8.27796649 49.7607078,8.24184808 49.6721567,8.17209069 L47.3089847,6.3104681 L44.5110468,8.43287463 C44.3012992,8.591981 44.0\
022839,8.55092814 43.8431776,8.34118051 C43.7762017,8.25288717 43.742082,8.14401677 43.7466857,8.03329059 L44.0461638,0.830433986 Z",
    id: "Path",
    fill: "#FFFFFF"
  }
))), "StorybookIcon");

// src/components/components/Loader/Loader.tsx
import gt from "react";
import { keyframes as Rw, styled as ur } from "storybook/theming";

// src/components/components/shared/animation.ts
import { keyframes as yw } from "storybook/theming";
var dp = yw`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

// src/components/components/Loader/Loader.tsx
var xw = ur.div(({ size: e = 32 }) => ({
  borderRadius: "50%",
  cursor: "progress",
  display: "inline-block",
  overflow: "hidden",
  position: "absolute",
  transition: "all 200ms ease-out",
  verticalAlign: "top",
  top: "50%",
  left: "50%",
  marginTop: -(e / 2),
  marginLeft: -(e / 2),
  height: e,
  width: e,
  zIndex: 4,
  borderWidth: 2,
  borderStyle: "solid",
  borderColor: "rgba(97, 97, 97, 0.29)",
  borderTopColor: "rgb(100,100,100)",
  animation: `${dp} 0.7s linear infinite`,
  mixBlendMode: "difference"
})), pp = ur.div({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%"
}), Ew = ur.div(({ theme: e }) => ({
  position: "relative",
  width: "80%",
  marginBottom: "0.75rem",
  maxWidth: 300,
  height: 5,
  borderRadius: 5,
  background: ye(0.8, e.color.secondary),
  overflow: "hidden",
  cursor: "progress"
})), Sw = ur.div(({ theme: e }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  background: e.color.secondary
})), mp = ur.div(({ theme: e }) => ({
  minHeight: "2em",
  fontSize: `${e.typography.size.s1}px`,
  color: e.textMutedColor
})), Cw = ur(G5)(({ theme: e }) => ({
  width: 20,
  height: 20,
  marginBottom: "0.5rem",
  color: e.textMutedColor
})), Mw = Rw`
  from { content: "..." }
  33% { content: "." }
  66% { content: ".." }
  to { content: "..." }
`, Aw = ur.span({
  "&::after": {
    content: "'...'",
    animation: `${Mw} 1s linear infinite`,
    animationDelay: "1s",
    display: "inline-block",
    width: "1em",
    height: "auto"
  }
}), Lw = /* @__PURE__ */ o(({ progress: e, error: t, size: r, ...n }) => {
  if (t)
    return /* @__PURE__ */ gt.createElement(pp, { "aria-label": t.toString(), "aria-live": "polite", role: "status", ...n }, /* @__PURE__ */ gt.
    createElement(Cw, null), /* @__PURE__ */ gt.createElement(mp, null, t.message));
  if (e) {
    let { value: a, modules: i } = e, { message: c } = e;
    return i && (c += ` ${i.complete} / ${i.total} modules`), /* @__PURE__ */ gt.createElement(
      pp,
      {
        "aria-label": "Content is loading...",
        "aria-live": "polite",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": a * 100,
        "aria-valuetext": c,
        role: "progressbar",
        ...n
      },
      /* @__PURE__ */ gt.createElement(Ew, null, /* @__PURE__ */ gt.createElement(Sw, { style: { width: `${a * 100}%` } })),
      /* @__PURE__ */ gt.createElement(mp, null, c, a < 1 && /* @__PURE__ */ gt.createElement(Aw, { key: c }))
    );
  }
  return /* @__PURE__ */ gt.createElement(
    xw,
    {
      "aria-label": "Content is loading...",
      "aria-live": "polite",
      role: "status",
      size: r,
      ...n
    }
  );
}, "Loader");

// src/components/components/ProgressSpinner/ProgressSpinner.tsx
import Bt from "react";
import { keyframes as Iw, styled as gp } from "storybook/theming";
var R0 = "http://www.w3.org/2000/svg", zw = Iw({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
}), hp = gp.div(({ size: e }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minWidth: e,
  minHeight: e
})), x0 = gp.svg(
  ({ size: e, width: t }) => ({
    position: "absolute",
    width: `${e}px!important`,
    height: `${e}px!important`,
    transform: "rotate(-90deg)",
    circle: {
      r: (e - Math.ceil(t)) / 2,
      cx: e / 2,
      cy: e / 2,
      opacity: 0.15,
      fill: "transparent",
      stroke: "currentColor",
      strokeWidth: t,
      strokeLinecap: "round",
      strokeDasharray: Math.PI * (e - Math.ceil(t))
    }
  }),
  ({ progress: e }) => e && {
    circle: {
      opacity: 0.75
    }
  },
  ({ spinner: e }) => e && {
    animation: `${zw} 1s linear infinite`,
    circle: {
      opacity: 0.25
    }
  }
), Tw = /* @__PURE__ */ o(({
  percentage: e = void 0,
  running: t = !0,
  size: r = 24,
  width: n = 1.5,
  children: a = null,
  ...i
}) => typeof e == "number" ? /* @__PURE__ */ Bt.createElement(hp, { size: r, ...i }, a, /* @__PURE__ */ Bt.createElement(x0, { size: r, width: n,
xmlns: R0 }, /* @__PURE__ */ Bt.createElement("circle", null)), t && /* @__PURE__ */ Bt.createElement(x0, { size: r, width: n, xmlns: R0, spinner: !0 },
/* @__PURE__ */ Bt.createElement("circle", { strokeDashoffset: Math.PI * (r - Math.ceil(n)) * (1 - e / 100) })), /* @__PURE__ */ Bt.createElement(
x0, { size: r, width: n, xmlns: R0, progress: !0 }, /* @__PURE__ */ Bt.createElement("circle", { strokeDashoffset: Math.PI * (r - Math.ceil(
n)) * (1 - e / 100) }))) : /* @__PURE__ */ Bt.createElement(hp, { size: r, ...i }, a), "ProgressSpinner");

// src/components/components/utils/getStoryHref.ts
function Hw(e) {
  let t = {}, r = e.split("&");
  for (let n = 0; n < r.length; n++) {
    let a = r[n].split("=");
    t[decodeURIComponent(a[0])] = decodeURIComponent(a[1] || "");
  }
  return t;
}
o(Hw, "parseQuery");
var Pw = /* @__PURE__ */ o((e, t, r = {}) => {
  let [n, a] = e.split("?"), i = a ? {
    ...Hw(a),
    ...r,
    id: t
  } : {
    ...r,
    id: t
  };
  return `${n}?${Object.entries(i).map((c) => `${c[0]}=${c[1]}`).join("&")}`;
}, "getStoryHref");

// src/components/components/clipboard/ClipboardCode.tsx
import kw from "react";
import { color as Ow, styled as Bw, typography as vp } from "storybook/theming";
var Nw = Bw.pre`
  line-height: 18px;
  padding: 11px 1rem;
  white-space: pre-wrap;
  background: rgba(0, 0, 0, 0.05);
  color: ${Ow.darkest};
  border-radius: 3px;
  margin: 1rem 0;
  width: 100%;
  display: block;
  overflow: hidden;
  font-family: ${vp.fonts.mono};
  font-size: ${vp.size.s2 - 1}px;
`, Fw = /* @__PURE__ */ o(({ code: e, ...t }) => /* @__PURE__ */ kw.createElement(Nw, { id: "clipboard-code", ...t }, e), "ClipboardCode");

// src/components/index.ts
var qO = Ai, Vw = {};
Object.keys(Ai).forEach((e) => {
  Vw[e] = _w((t, r) => Dw(e, { ...t, ref: r }));
});
export {
  ia as A,
  Za as ActionBar,
  vw as AddonPanel,
  Jh as Badge,
  f0 as Bar,
  la as Blockquote,
  Hr as Button,
  Fw as ClipboardCode,
  ci as Code,
  si as DL,
  ui as Div,
  ag as DocumentWrapper,
  Yo as EmptyTabContent,
  H3 as ErrorFormatter,
  Uo as FlexBar,
  d7 as Form,
  fi as H1,
  di as H2,
  pi as H3,
  mi as H4,
  hi as H5,
  gi as H6,
  vi as HR,
  So as IconButton,
  wi as Img,
  bi as LI,
  Ii as Link,
  l0 as ListItem,
  Lw as Loader,
  r3 as Modal,
  yi as OL,
  Ri as P,
  d3 as Placeholder,
  xi as Pre,
  Tw as ProgressSpinner,
  W0 as ResetWrapper,
  Er as ScrollArea,
  y0 as Separator,
  l3 as Spaced,
  Ei as Span,
  bw as StorybookIcon,
  ww as StorybookLogo,
  nu as SyntaxHighlighter,
  Si as TT,
  v0 as TabBar,
  cr as TabButton,
  cw as TabWrapper,
  Ci as Table,
  w0 as Tabs,
  h0 as TabsState,
  c0 as TooltipLinkList,
  w6 as TooltipMessage,
  x6 as TooltipNote,
  Mi as UL,
  u6 as WithTooltip,
  d6 as WithTooltipPure,
  E3 as Zoom,
  lt as codeCommon,
  qO as components,
  ii as createCopyToClipboardFunction,
  Pw as getStoryHref,
  fw as interleaveSeparators,
  J as nameSpaceClassNames,
  Vw as resetComponents,
  N as withReset
};
