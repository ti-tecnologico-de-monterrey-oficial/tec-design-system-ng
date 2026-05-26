"use strict";
var E = Object.defineProperty;
var K = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var H = Object.prototype.hasOwnProperty;
var u = (o, t) => E(o, "name", { value: t, configurable: !0 });
var V = (o, t) => {
  for (var e in t)
    E(o, e, { get: t[e], enumerable: !0 });
}, Y = (o, t, e, i) => {
  if (t && typeof t == "object" || typeof t == "function")
    for (let n of z(t))
      !H.call(o, n) && n !== e && E(o, n, { get: () => t[n], enumerable: !(i = K(t, n)) || i.enumerable });
  return o;
};
var J = (o) => Y(E({}, "__esModule", { value: !0 }), o);

// src/core-server/presets/webpack/loaders/webpack-automock-loader.ts
var gt = {};
V(gt, {
  default: () => W
});
module.exports = J(gt);

// ../node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var Q = 44, X = 59, D = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", $ = new Uint8Array(64), Z = new Uint8Array(128);
for (let o = 0; o < D.length; o++) {
  let t = D.charCodeAt(o);
  $[o] = t, Z[t] = o;
}
function w(o, t, e) {
  let i = t - e;
  i = i < 0 ? -i << 1 | 1 : i << 1;
  do {
    let n = i & 31;
    i >>>= 5, i > 0 && (n |= 32), o.write($[n]);
  } while (i > 0);
  return t;
}
u(w, "encodeInteger");
var j = 1024 * 16, M = typeof TextDecoder < "u" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer < "u" ? {
  decode(o) {
    return Buffer.from(o.buffer, o.byteOffset, o.byteLength).toString();
  }
} : {
  decode(o) {
    let t = "";
    for (let e = 0; e < o.length; e++)
      t += String.fromCharCode(o[e]);
    return t;
  }
}, tt = class {
  static {
    u(this, "StringWriter");
  }
  constructor() {
    this.pos = 0, this.out = "", this.buffer = new Uint8Array(j);
  }
  write(o) {
    let { buffer: t } = this;
    t[this.pos++] = o, this.pos === j && (this.out += M.decode(t), this.pos = 0);
  }
  flush() {
    let { buffer: o, out: t, pos: e } = this;
    return e > 0 ? t + M.decode(o.subarray(0, e)) : t;
  }
};
function T(o) {
  let t = new tt(), e = 0, i = 0, n = 0, r = 0;
  for (let s = 0; s < o.length; s++) {
    let l = o[s];
    if (s > 0 && t.write(X), l.length === 0) continue;
    let a = 0;
    for (let h = 0; h < l.length; h++) {
      let f = l[h];
      h > 0 && t.write(Q), a = w(t, f[0], a), f.length !== 1 && (e = w(t, f[1], e), i = w(t, f[2], i), n = w(t, f[3], n), f.length !== 4 && (r =
      w(t, f[4], r)));
    }
  }
  return t.flush();
}
u(T, "encode");

// ../node_modules/magic-string/dist/magic-string.es.mjs
var I = class o {
  static {
    u(this, "BitSet");
  }
  constructor(t) {
    this.bits = t instanceof o ? t.bits.slice() : [];
  }
  add(t) {
    this.bits[t >> 5] |= 1 << (t & 31);
  }
  has(t) {
    return !!(this.bits[t >> 5] & 1 << (t & 31));
  }
}, L = class o {
  static {
    u(this, "Chunk");
  }
  constructor(t, e, i) {
    this.start = t, this.end = e, this.original = i, this.intro = "", this.outro = "", this.content = i, this.storeName = !1, this.edited = !1,
    this.previous = null, this.next = null;
  }
  appendLeft(t) {
    this.outro += t;
  }
  appendRight(t) {
    this.intro = this.intro + t;
  }
  clone() {
    let t = new o(this.start, this.end, this.original);
    return t.intro = this.intro, t.outro = this.outro, t.content = this.content, t.storeName = this.storeName, t.edited = this.edited, t;
  }
  contains(t) {
    return this.start < t && t < this.end;
  }
  eachNext(t) {
    let e = this;
    for (; e; )
      t(e), e = e.next;
  }
  eachPrevious(t) {
    let e = this;
    for (; e; )
      t(e), e = e.previous;
  }
  edit(t, e, i) {
    return this.content = t, i || (this.intro = "", this.outro = ""), this.storeName = e, this.edited = !0, this;
  }
  prependLeft(t) {
    this.outro = t + this.outro;
  }
  prependRight(t) {
    this.intro = t + this.intro;
  }
  reset() {
    this.intro = "", this.outro = "", this.edited && (this.content = this.original, this.storeName = !1, this.edited = !1);
  }
  split(t) {
    let e = t - this.start, i = this.original.slice(0, e), n = this.original.slice(e);
    this.original = i;
    let r = new o(t, this.end, n);
    return r.outro = this.outro, this.outro = "", this.end = t, this.edited ? (r.edit("", !1), this.content = "") : this.content = i, r.next =
    this.next, r.next && (r.next.previous = r), r.previous = this, this.next = r, r;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(t) {
    if (this.outro = this.outro.replace(t, ""), this.outro.length) return !0;
    let e = this.content.replace(t, "");
    if (e.length)
      return e !== this.content && (this.split(this.start + e.length).edit("", void 0, !0), this.edited && this.edit(e, this.storeName, !0)),
      !0;
    if (this.edit("", void 0, !0), this.intro = this.intro.replace(t, ""), this.intro.length) return !0;
  }
  trimStart(t) {
    if (this.intro = this.intro.replace(t, ""), this.intro.length) return !0;
    let e = this.content.replace(t, "");
    if (e.length) {
      if (e !== this.content) {
        let i = this.split(this.end - e.length);
        this.edited && i.edit(e, this.storeName, !0), this.edit("", void 0, !0);
      }
      return !0;
    } else if (this.edit("", void 0, !0), this.outro = this.outro.replace(t, ""), this.outro.length) return !0;
  }
};
function et() {
  return typeof globalThis < "u" && typeof globalThis.btoa == "function" ? (o) => globalThis.btoa(unescape(encodeURIComponent(o))) : typeof Buffer ==
  "function" ? (o) => Buffer.from(o, "utf-8").toString("base64") : () => {
    throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
  };
}
u(et, "getBtoa");
var it = /* @__PURE__ */ et(), R = class {
  static {
    u(this, "SourceMap");
  }
  constructor(t) {
    this.version = 3, this.file = t.file, this.sources = t.sources, this.sourcesContent = t.sourcesContent, this.names = t.names, this.mappings =
    T(t.mappings), typeof t.x_google_ignoreList < "u" && (this.x_google_ignoreList = t.x_google_ignoreList), typeof t.debugId < "u" && (this.
    debugId = t.debugId);
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + it(this.toString());
  }
};
function nt(o) {
  let t = o.split(`
`), e = t.filter((r) => /^\t+/.test(r)), i = t.filter((r) => /^ {2,}/.test(r));
  if (e.length === 0 && i.length === 0)
    return null;
  if (e.length >= i.length)
    return "	";
  let n = i.reduce((r, s) => {
    let l = /^ +/.exec(s)[0].length;
    return Math.min(l, r);
  }, 1 / 0);
  return new Array(n + 1).join(" ");
}
u(nt, "guessIndent");
function rt(o, t) {
  let e = o.split(/[/\\]/), i = t.split(/[/\\]/);
  for (e.pop(); e[0] === i[0]; )
    e.shift(), i.shift();
  if (e.length) {
    let n = e.length;
    for (; n--; ) e[n] = "..";
  }
  return e.concat(i).join("/");
}
u(rt, "getRelativePath");
var st = Object.prototype.toString;
function ot(o) {
  return st.call(o) === "[object Object]";
}
u(ot, "isObject");
function B(o) {
  let t = o.split(`
`), e = [];
  for (let i = 0, n = 0; i < t.length; i++)
    e.push(n), n += t[i].length + 1;
  return /* @__PURE__ */ u(function(n) {
    let r = 0, s = e.length;
    for (; r < s; ) {
      let h = r + s >> 1;
      n < e[h] ? s = h : r = h + 1;
    }
    let l = r - 1, a = n - e[l];
    return { line: l, column: a };
  }, "locate");
}
u(B, "getLocator");
var lt = /\w/, A = class {
  static {
    u(this, "Mappings");
  }
  constructor(t) {
    this.hires = t, this.generatedCodeLine = 0, this.generatedCodeColumn = 0, this.raw = [], this.rawSegments = this.raw[this.generatedCodeLine] =
    [], this.pending = null;
  }
  addEdit(t, e, i, n) {
    if (e.length) {
      let r = e.length - 1, s = e.indexOf(`
`, 0), l = -1;
      for (; s >= 0 && r > s; ) {
        let h = [this.generatedCodeColumn, t, i.line, i.column];
        n >= 0 && h.push(n), this.rawSegments.push(h), this.generatedCodeLine += 1, this.raw[this.generatedCodeLine] = this.rawSegments = [],
        this.generatedCodeColumn = 0, l = s, s = e.indexOf(`
`, s + 1);
      }
      let a = [this.generatedCodeColumn, t, i.line, i.column];
      n >= 0 && a.push(n), this.rawSegments.push(a), this.advance(e.slice(l + 1));
    } else this.pending && (this.rawSegments.push(this.pending), this.advance(e));
    this.pending = null;
  }
  addUneditedChunk(t, e, i, n, r) {
    let s = e.start, l = !0, a = !1;
    for (; s < e.end; ) {
      if (i[s] === `
`)
        n.line += 1, n.column = 0, this.generatedCodeLine += 1, this.raw[this.generatedCodeLine] = this.rawSegments = [], this.generatedCodeColumn =
        0, l = !0, a = !1;
      else {
        if (this.hires || l || r.has(s)) {
          let h = [this.generatedCodeColumn, t, n.line, n.column];
          this.hires === "boundary" ? lt.test(i[s]) ? a || (this.rawSegments.push(h), a = !0) : (this.rawSegments.push(h), a = !1) : this.rawSegments.
          push(h);
        }
        n.column += 1, this.generatedCodeColumn += 1, l = !1;
      }
      s += 1;
    }
    this.pending = null;
  }
  advance(t) {
    if (!t) return;
    let e = t.split(`
`);
    if (e.length > 1) {
      for (let i = 0; i < e.length - 1; i++)
        this.generatedCodeLine++, this.raw[this.generatedCodeLine] = this.rawSegments = [];
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += e[e.length - 1].length;
  }
}, _ = `
`, b = {
  insertLeft: !1,
  insertRight: !1,
  storeName: !1
}, N = class o {
  static {
    u(this, "MagicString");
  }
  constructor(t, e = {}) {
    let i = new L(0, t.length, t);
    Object.defineProperties(this, {
      original: { writable: !0, value: t },
      outro: { writable: !0, value: "" },
      intro: { writable: !0, value: "" },
      firstChunk: { writable: !0, value: i },
      lastChunk: { writable: !0, value: i },
      lastSearchedChunk: { writable: !0, value: i },
      byStart: { writable: !0, value: {} },
      byEnd: { writable: !0, value: {} },
      filename: { writable: !0, value: e.filename },
      indentExclusionRanges: { writable: !0, value: e.indentExclusionRanges },
      sourcemapLocations: { writable: !0, value: new I() },
      storedNames: { writable: !0, value: {} },
      indentStr: { writable: !0, value: void 0 },
      ignoreList: { writable: !0, value: e.ignoreList },
      offset: { writable: !0, value: e.offset || 0 }
    }), this.byStart[0] = i, this.byEnd[t.length] = i;
  }
  addSourcemapLocation(t) {
    this.sourcemapLocations.add(t);
  }
  append(t) {
    if (typeof t != "string") throw new TypeError("outro content must be a string");
    return this.outro += t, this;
  }
  appendLeft(t, e) {
    if (t = t + this.offset, typeof e != "string") throw new TypeError("inserted content must be a string");
    this._split(t);
    let i = this.byEnd[t];
    return i ? i.appendLeft(e) : this.intro += e, this;
  }
  appendRight(t, e) {
    if (t = t + this.offset, typeof e != "string") throw new TypeError("inserted content must be a string");
    this._split(t);
    let i = this.byStart[t];
    return i ? i.appendRight(e) : this.outro += e, this;
  }
  clone() {
    let t = new o(this.original, { filename: this.filename, offset: this.offset }), e = this.firstChunk, i = t.firstChunk = t.lastSearchedChunk =
    e.clone();
    for (; e; ) {
      t.byStart[i.start] = i, t.byEnd[i.end] = i;
      let n = e.next, r = n && n.clone();
      r && (i.next = r, r.previous = i, i = r), e = n;
    }
    return t.lastChunk = i, this.indentExclusionRanges && (t.indentExclusionRanges = this.indentExclusionRanges.slice()), t.sourcemapLocations =
    new I(this.sourcemapLocations), t.intro = this.intro, t.outro = this.outro, t;
  }
  generateDecodedMap(t) {
    t = t || {};
    let e = 0, i = Object.keys(this.storedNames), n = new A(t.hires), r = B(this.original);
    return this.intro && n.advance(this.intro), this.firstChunk.eachNext((s) => {
      let l = r(s.start);
      s.intro.length && n.advance(s.intro), s.edited ? n.addEdit(
        e,
        s.content,
        l,
        s.storeName ? i.indexOf(s.original) : -1
      ) : n.addUneditedChunk(e, s, this.original, l, this.sourcemapLocations), s.outro.length && n.advance(s.outro);
    }), this.outro && n.advance(this.outro), {
      file: t.file ? t.file.split(/[/\\]/).pop() : void 0,
      sources: [
        t.source ? rt(t.file || "", t.source) : t.file || ""
      ],
      sourcesContent: t.includeContent ? [this.original] : void 0,
      names: i,
      mappings: n.raw,
      x_google_ignoreList: this.ignoreList ? [e] : void 0
    };
  }
  generateMap(t) {
    return new R(this.generateDecodedMap(t));
  }
  _ensureindentStr() {
    this.indentStr === void 0 && (this.indentStr = nt(this.original));
  }
  _getRawIndentString() {
    return this._ensureindentStr(), this.indentStr;
  }
  getIndentString() {
    return this._ensureindentStr(), this.indentStr === null ? "	" : this.indentStr;
  }
  indent(t, e) {
    let i = /^[^\r\n]/gm;
    if (ot(t) && (e = t, t = void 0), t === void 0 && (this._ensureindentStr(), t = this.indentStr || "	"), t === "") return this;
    e = e || {};
    let n = {};
    e.exclude && (typeof e.exclude[0] == "number" ? [e.exclude] : e.exclude).forEach((f) => {
      for (let C = f[0]; C < f[1]; C += 1)
        n[C] = !0;
    });
    let r = e.indentStart !== !1, s = /* @__PURE__ */ u((h) => r ? `${t}${h}` : (r = !0, h), "replacer");
    this.intro = this.intro.replace(i, s);
    let l = 0, a = this.firstChunk;
    for (; a; ) {
      let h = a.end;
      if (a.edited)
        n[l] || (a.content = a.content.replace(i, s), a.content.length && (r = a.content[a.content.length - 1] === `
`));
      else
        for (l = a.start; l < h; ) {
          if (!n[l]) {
            let f = this.original[l];
            f === `
` ? r = !0 : f !== "\r" && r && (r = !1, l === a.start || (this._splitChunk(a, l), a = a.next), a.prependRight(t));
          }
          l += 1;
        }
      l = a.end, a = a.next;
    }
    return this.outro = this.outro.replace(i, s), this;
  }
  insert() {
    throw new Error(
      "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
    );
  }
  insertLeft(t, e) {
    return b.insertLeft || (console.warn(
      "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
    ), b.insertLeft = !0), this.appendLeft(t, e);
  }
  insertRight(t, e) {
    return b.insertRight || (console.warn(
      "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
    ), b.insertRight = !0), this.prependRight(t, e);
  }
  move(t, e, i) {
    if (t = t + this.offset, e = e + this.offset, i = i + this.offset, i >= t && i <= e) throw new Error("Cannot move a selection inside its\
elf");
    this._split(t), this._split(e), this._split(i);
    let n = this.byStart[t], r = this.byEnd[e], s = n.previous, l = r.next, a = this.byStart[i];
    if (!a && r === this.lastChunk) return this;
    let h = a ? a.previous : this.lastChunk;
    return s && (s.next = l), l && (l.previous = s), h && (h.next = n), a && (a.previous = r), n.previous || (this.firstChunk = r.next), r.next ||
    (this.lastChunk = n.previous, this.lastChunk.next = null), n.previous = h, r.next = a || null, h || (this.firstChunk = n), a || (this.lastChunk =
    r), this;
  }
  overwrite(t, e, i, n) {
    return n = n || {}, this.update(t, e, i, { ...n, overwrite: !n.contentOnly });
  }
  update(t, e, i, n) {
    if (t = t + this.offset, e = e + this.offset, typeof i != "string") throw new TypeError("replacement content must be a string");
    if (this.original.length !== 0) {
      for (; t < 0; ) t += this.original.length;
      for (; e < 0; ) e += this.original.length;
    }
    if (e > this.original.length) throw new Error("end is out of bounds");
    if (t === e)
      throw new Error(
        "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
      );
    this._split(t), this._split(e), n === !0 && (b.storeName || (console.warn(
      "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
    ), b.storeName = !0), n = { storeName: !0 });
    let r = n !== void 0 ? n.storeName : !1, s = n !== void 0 ? n.overwrite : !1;
    if (r) {
      let h = this.original.slice(t, e);
      Object.defineProperty(this.storedNames, h, {
        writable: !0,
        value: !0,
        enumerable: !0
      });
    }
    let l = this.byStart[t], a = this.byEnd[e];
    if (l) {
      let h = l;
      for (; h !== a; ) {
        if (h.next !== this.byStart[h.end])
          throw new Error("Cannot overwrite across a split point");
        h = h.next, h.edit("", !1);
      }
      l.edit(i, r, !s);
    } else {
      let h = new L(t, e, "").edit(i, r);
      a.next = h, h.previous = a;
    }
    return this;
  }
  prepend(t) {
    if (typeof t != "string") throw new TypeError("outro content must be a string");
    return this.intro = t + this.intro, this;
  }
  prependLeft(t, e) {
    if (t = t + this.offset, typeof e != "string") throw new TypeError("inserted content must be a string");
    this._split(t);
    let i = this.byEnd[t];
    return i ? i.prependLeft(e) : this.intro = e + this.intro, this;
  }
  prependRight(t, e) {
    if (t = t + this.offset, typeof e != "string") throw new TypeError("inserted content must be a string");
    this._split(t);
    let i = this.byStart[t];
    return i ? i.prependRight(e) : this.outro = e + this.outro, this;
  }
  remove(t, e) {
    if (t = t + this.offset, e = e + this.offset, this.original.length !== 0) {
      for (; t < 0; ) t += this.original.length;
      for (; e < 0; ) e += this.original.length;
    }
    if (t === e) return this;
    if (t < 0 || e > this.original.length) throw new Error("Character is out of bounds");
    if (t > e) throw new Error("end must be greater than start");
    this._split(t), this._split(e);
    let i = this.byStart[t];
    for (; i; )
      i.intro = "", i.outro = "", i.edit(""), i = e > i.end ? this.byStart[i.end] : null;
    return this;
  }
  reset(t, e) {
    if (t = t + this.offset, e = e + this.offset, this.original.length !== 0) {
      for (; t < 0; ) t += this.original.length;
      for (; e < 0; ) e += this.original.length;
    }
    if (t === e) return this;
    if (t < 0 || e > this.original.length) throw new Error("Character is out of bounds");
    if (t > e) throw new Error("end must be greater than start");
    this._split(t), this._split(e);
    let i = this.byStart[t];
    for (; i; )
      i.reset(), i = e > i.end ? this.byStart[i.end] : null;
    return this;
  }
  lastChar() {
    if (this.outro.length) return this.outro[this.outro.length - 1];
    let t = this.lastChunk;
    do {
      if (t.outro.length) return t.outro[t.outro.length - 1];
      if (t.content.length) return t.content[t.content.length - 1];
      if (t.intro.length) return t.intro[t.intro.length - 1];
    } while (t = t.previous);
    return this.intro.length ? this.intro[this.intro.length - 1] : "";
  }
  lastLine() {
    let t = this.outro.lastIndexOf(_);
    if (t !== -1) return this.outro.substr(t + 1);
    let e = this.outro, i = this.lastChunk;
    do {
      if (i.outro.length > 0) {
        if (t = i.outro.lastIndexOf(_), t !== -1) return i.outro.substr(t + 1) + e;
        e = i.outro + e;
      }
      if (i.content.length > 0) {
        if (t = i.content.lastIndexOf(_), t !== -1) return i.content.substr(t + 1) + e;
        e = i.content + e;
      }
      if (i.intro.length > 0) {
        if (t = i.intro.lastIndexOf(_), t !== -1) return i.intro.substr(t + 1) + e;
        e = i.intro + e;
      }
    } while (i = i.previous);
    return t = this.intro.lastIndexOf(_), t !== -1 ? this.intro.substr(t + 1) + e : this.intro + e;
  }
  slice(t = 0, e = this.original.length - this.offset) {
    if (t = t + this.offset, e = e + this.offset, this.original.length !== 0) {
      for (; t < 0; ) t += this.original.length;
      for (; e < 0; ) e += this.original.length;
    }
    let i = "", n = this.firstChunk;
    for (; n && (n.start > t || n.end <= t); ) {
      if (n.start < e && n.end >= e)
        return i;
      n = n.next;
    }
    if (n && n.edited && n.start !== t)
      throw new Error(`Cannot use replaced character ${t} as slice start anchor.`);
    let r = n;
    for (; n; ) {
      n.intro && (r !== n || n.start === t) && (i += n.intro);
      let s = n.start < e && n.end >= e;
      if (s && n.edited && n.end !== e)
        throw new Error(`Cannot use replaced character ${e} as slice end anchor.`);
      let l = r === n ? t - n.start : 0, a = s ? n.content.length + e - n.end : n.content.length;
      if (i += n.content.slice(l, a), n.outro && (!s || n.end === e) && (i += n.outro), s)
        break;
      n = n.next;
    }
    return i;
  }
  // TODO deprecate this? not really very useful
  snip(t, e) {
    let i = this.clone();
    return i.remove(0, t), i.remove(e, i.original.length), i;
  }
  _split(t) {
    if (this.byStart[t] || this.byEnd[t]) return;
    let e = this.lastSearchedChunk, i = e, n = t > e.end;
    for (; e; ) {
      if (e.contains(t)) return this._splitChunk(e, t);
      if (e = n ? this.byStart[e.end] : this.byEnd[e.start], e === i) return;
      i = e;
    }
  }
  _splitChunk(t, e) {
    if (t.edited && t.content.length) {
      let n = B(this.original)(e);
      throw new Error(
        `Cannot split a chunk that has already been edited (${n.line}:${n.column} \u2013 "${t.original}")`
      );
    }
    let i = t.split(e);
    return this.byEnd[e] = t, this.byStart[e] = i, this.byEnd[i.end] = i, t === this.lastChunk && (this.lastChunk = i), this.lastSearchedChunk =
    t, !0;
  }
  toString() {
    let t = this.intro, e = this.firstChunk;
    for (; e; )
      t += e.toString(), e = e.next;
    return t + this.outro;
  }
  isEmpty() {
    let t = this.firstChunk;
    do
      if (t.intro.length && t.intro.trim() || t.content.length && t.content.trim() || t.outro.length && t.outro.trim())
        return !1;
    while (t = t.next);
    return !0;
  }
  length() {
    let t = this.firstChunk, e = 0;
    do
      e += t.intro.length + t.content.length + t.outro.length;
    while (t = t.next);
    return e;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(t) {
    return this.trimStart(t).trimEnd(t);
  }
  trimEndAborted(t) {
    let e = new RegExp((t || "\\s") + "+$");
    if (this.outro = this.outro.replace(e, ""), this.outro.length) return !0;
    let i = this.lastChunk;
    do {
      let n = i.end, r = i.trimEnd(e);
      if (i.end !== n && (this.lastChunk === i && (this.lastChunk = i.next), this.byEnd[i.end] = i, this.byStart[i.next.start] = i.next, this.
      byEnd[i.next.end] = i.next), r) return !0;
      i = i.previous;
    } while (i);
    return !1;
  }
  trimEnd(t) {
    return this.trimEndAborted(t), this;
  }
  trimStartAborted(t) {
    let e = new RegExp("^" + (t || "\\s") + "+");
    if (this.intro = this.intro.replace(e, ""), this.intro.length) return !0;
    let i = this.firstChunk;
    do {
      let n = i.end, r = i.trimStart(e);
      if (i.end !== n && (i === this.lastChunk && (this.lastChunk = i.next), this.byEnd[i.end] = i, this.byStart[i.next.start] = i.next, this.
      byEnd[i.next.end] = i.next), r) return !0;
      i = i.next;
    } while (i);
    return !1;
  }
  trimStart(t) {
    return this.trimStartAborted(t), this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(t, e) {
    function i(r, s) {
      return typeof e == "string" ? e.replace(/\$(\$|&|\d+)/g, (l, a) => a === "$" ? "$" : a === "&" ? r[0] : +a < r.length ? r[+a] : `$${a}`) :
      e(...r, r.index, s, r.groups);
    }
    u(i, "getReplacement");
    function n(r, s) {
      let l, a = [];
      for (; l = r.exec(s); )
        a.push(l);
      return a;
    }
    if (u(n, "matchAll"), t.global)
      n(t, this.original).forEach((s) => {
        if (s.index != null) {
          let l = i(s, this.original);
          l !== s[0] && this.overwrite(s.index, s.index + s[0].length, l);
        }
      });
    else {
      let r = this.original.match(t);
      if (r && r.index != null) {
        let s = i(r, this.original);
        s !== r[0] && this.overwrite(r.index, r.index + r[0].length, s);
      }
    }
    return this;
  }
  _replaceString(t, e) {
    let { original: i } = this, n = i.indexOf(t);
    return n !== -1 && (typeof e == "function" && (e = e(t, n, i)), t !== e && this.overwrite(n, n + t.length, e)), this;
  }
  replace(t, e) {
    return typeof t == "string" ? this._replaceString(t, e) : this._replaceRegexp(t, e);
  }
  _replaceAllString(t, e) {
    let { original: i } = this, n = t.length;
    for (let r = i.indexOf(t); r !== -1; r = i.indexOf(t, r + n)) {
      let s = i.slice(r, r + n), l = e;
      typeof e == "function" && (l = e(s, r, i)), s !== l && this.overwrite(r, r + n, l);
    }
    return this;
  }
  replaceAll(t, e) {
    if (typeof t == "string")
      return this._replaceAllString(t, e);
    if (!t.global)
      throw new TypeError(
        "MagicString.prototype.replaceAll called with a non-global RegExp argument"
      );
    return this._replaceRegexp(t, e);
  }
};

// src/core-server/presets/vitePlugins/vite-inject-mocker/constants.ts
var F = "__vitest_mocker__";

// src/core-server/mocking-utils/esmWalker.ts
function v(o) {
  return o.type === "Identifier" ? o.name : o.raw;
}
u(v, "getArbitraryModuleIdentifier");

// src/core-server/mocking-utils/automock.ts
function U(o, t, e) {
  return ut(o, t ? "autospy" : "automock", e, {
    globalThisAccessor: JSON.stringify(F)
  });
}
u(U, "getAutomockCode");
function ut(o, t, e, i = {}) {
  let n = i.globalThisAccessor || '"__vitest_mocker__"', r = e(o), s = new N(o), l = [], a = 0;
  for (let g of r.body) {
    if (g.type === "ExportAllDeclaration")
      throw new Error(
        "automocking files with `export *` is not supported in browser mode because it cannot be statically analysed"
      );
    if (g.type === "ExportNamedDeclaration") {
      let y = function(c) {
        if (c.type === "Identifier")
          l.push({ name: c.name });
        else if (c.type === "ArrayPattern")
          c.elements.forEach((m) => {
            m && y(m);
          });
        else if (c.type === "ObjectPattern")
          c.properties.forEach((m) => {
            m.type === "RestElement" ? y(m) : m.type === "Property" && y(m.value);
          });
        else if (c.type === "RestElement")
          y(c.argument);
        else {
          if (c.type === "AssignmentPattern")
            throw new Error("AssignmentPattern is not supported. Please open a new bug report.");
          if (c.type === "MemberExpression")
            throw new Error("MemberExpression is not supported. Please open a new bug report.");
        }
      };
      var mt = y;
      u(y, "traversePattern");
      let d = g, p = d.declaration;
      p && (p.type === "FunctionDeclaration" ? l.push({ name: p.id.name }) : p.type === "VariableDeclaration" ? p.declarations.forEach((c) => {
        y(c.id);
      }) : p.type === "ClassDeclaration" && l.push({ name: p.id.name }), s.remove(d.start, p.start));
      let x = d.specifiers || [], O = d.source;
      if (!O && x.length)
        x.forEach((c) => {
          l.push({
            alias: v(c.exported),
            name: v(c.local)
          });
        }), s.remove(d.start, d.end);
      else if (O && x.length) {
        let c = [];
        x.forEach((S) => {
          let k = `__vitest_imported_${a++}__`;
          c.push([v(S.local), k]), l.push({
            name: k,
            alias: v(S.exported)
          });
        });
        let m = `import { ${c.map(([S, k]) => `${S} as ${k}`).join(", ")} } from '${O.value}'`;
        s.overwrite(d.start, d.end, m);
      }
    }
    if (g.type === "ExportDefaultDeclaration") {
      let d = g, p = d.declaration;
      l.push({ name: "__vitest_default", alias: "default" }), s.overwrite(d.start, p.start, "const __vitest_default = ");
    }
  }
  let h = `
const __vitest_current_es_module__ = {
  __esModule: true,
  ${l.map(({ name: g }) => `["${g}"]: ${g},`).join(`
  `)}
}
const __vitest_mocked_module__ = globalThis[${n}].mockObject(__vitest_current_es_module__, "${t}")
`, f = l.map(({ name: g }, d) => `const __vitest_mocked_${d}__ = __vitest_mocked_module__["${g}"]`).join(`
`), G = `
export {
${l.map(({ name: g, alias: d }, p) => `  __vitest_mocked_${p}__ as ${d || g},`).join(`
`)}
}
`;
  return s.append(h + f + G), s;
}
u(ut, "automockModule");

// src/core-server/mocking-utils/extract.ts
var ct = require("node:fs"), P = require("storybook/internal/babel"), ft = require("storybook/internal/node-logger"), dt = require("storybook/internal/telemetry"),
pt = require("esbuild");
var q = /* @__PURE__ */ u((o) => P.parser.parse(o, {
  sourceType: "module",
  // Enable plugins to handle modern JavaScript features, including TSX.
  plugins: ["typescript", "jsx", "classProperties", "objectRestSpread"],
  errorRecovery: !0
}).program, "babelParser");

// src/core-server/presets/webpack/loaders/webpack-automock-loader.ts
function W(o) {
  let e = this.getOptions().spy === "true";
  return U(o, e, q).toString();
}
u(W, "webpackAutomockLoader");
