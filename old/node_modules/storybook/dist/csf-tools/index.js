import ESM_COMPAT_Module from "node:module";
import { fileURLToPath as ESM_COMPAT_fileURLToPath } from 'node:url';
import { dirname as ESM_COMPAT_dirname } from 'node:path';
const __filename = ESM_COMPAT_fileURLToPath(import.meta.url);
const __dirname = ESM_COMPAT_dirname(__filename);
const require = ESM_COMPAT_Module.createRequire(import.meta.url);
var ke = Object.create;
var X = Object.defineProperty;
var Ve = Object.getOwnPropertyDescriptor;
var Ae = Object.getOwnPropertyNames;
var $e = Object.getPrototypeOf, Me = Object.prototype.hasOwnProperty;
var f = (s, e) => X(s, "name", { value: e, configurable: !0 });
var Re = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports);
var Le = (s, e, i, t) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let r of Ae(e))
      !Me.call(s, r) && r !== i && X(s, r, { get: () => e[r], enumerable: !(t = Ve(e, r)) || t.enumerable });
  return s;
};
var L = (s, e, i) => (i = s != null ? ke($e(s)) : {}, Le(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !s || !s.__esModule ? X(i, "default", { value: s, enumerable: !0 }) : i,
  s
));

// ../node_modules/ts-dedent/dist/index.js
var k = Re((T) => {
  "use strict";
  Object.defineProperty(T, "__esModule", { value: !0 });
  T.dedent = void 0;
  function se(s) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    var t = Array.from(typeof s == "string" ? [s] : s);
    t[t.length - 1] = t[t.length - 1].replace(/\r?\n([\t ]*)$/, "");
    var r = t.reduce(function(c, p) {
      var d = p.match(/\n([\t ]+|(?!\s).)/g);
      return d ? c.concat(d.map(function(u) {
        var g, b;
        return (b = (g = u.match(/[\t ]/g)) === null || g === void 0 ? void 0 : g.length) !== null && b !== void 0 ? b : 0;
      })) : c;
    }, []);
    if (r.length) {
      var a = new RegExp(`
[	 ]{` + Math.min.apply(Math, r) + "}", "g");
      t = t.map(function(c) {
        return c.replace(a, `
`);
      });
    }
    t[0] = t[0].replace(/^\r?\n/, "");
    var o = t[0];
    return e.forEach(function(c, p) {
      var d = o.match(/(?:^|\n)( *)$/), u = d ? d[1] : "", g = c;
      typeof c == "string" && c.includes(`
`) && (g = String(c).split(`
`).map(function(b, y) {
        return y === 0 ? b : "" + u + b;
      }).join(`
`)), o += g + t[p + 1];
    }), o;
  }
  f(se, "dedent");
  T.dedent = se;
  T.default = se;
});

// src/csf-tools/CsfFile.ts
var P = L(k(), 1);
import { readFile as Ue, writeFile as qe } from "node:fs/promises";
import {
  BabelFileClass as Be,
  babelParse as fe,
  generate as We,
  recast as de,
  types as l,
  traverse as Ge
} from "storybook/internal/babel";
import { isExportStory as ne, storyNameFromExport as oe, toId as ze } from "storybook/internal/csf";
import { logger as ae } from "storybook/internal/node-logger";

// src/csf-tools/findVarInitialization.ts
import { types as V } from "storybook/internal/babel";
var O = /* @__PURE__ */ f((s, e) => {
  let i = null, t = null;
  return e.body.find((r) => (V.isVariableDeclaration(r) ? t = r.declarations : V.isExportNamedDeclaration(r) && V.isVariableDeclaration(r.declaration) &&
  (t = r.declaration.declarations), t && t.find((a) => V.isVariableDeclarator(a) && V.isIdentifier(a.id) && a.id.name === s ? (i = a.init, !0) :
  !1))), i;
}, "findVarInitialization");

// src/csf-tools/CsfFile.ts
var Xe = /\/preview(.(js|jsx|mjs|ts|tsx))?$/, Ke = /* @__PURE__ */ f((s) => Xe.test(s), "isValidPreviewPath");
function Je(s) {
  if (l.isArrayExpression(s))
    return s.elements.map((e) => {
      if (l.isStringLiteral(e))
        return e.value;
      throw new Error(`Expected string literal: ${e}`);
    });
  if (l.isStringLiteral(s))
    return new RegExp(s.value);
  if (l.isRegExpLiteral(s))
    return new RegExp(s.pattern, s.flags);
  throw new Error(`Unknown include/exclude: ${s}`);
}
f(Je, "parseIncludeExclude");
function le(s) {
  if (!l.isArrayExpression(s))
    throw new Error("CSF: Expected tags array");
  return s.elements.map((e) => {
    if (l.isStringLiteral(e))
      return e.value;
    throw new Error("CSF: Expected tag to be string literal");
  });
}
f(le, "parseTags");
var v = /* @__PURE__ */ f((s, e) => {
  let i = "";
  if (s.loc) {
    let { line: t, column: r } = s.loc?.start || {};
    i = `(line ${t}, col ${r})`;
  }
  return `${e || ""} ${i}`.trim();
}, "formatLocation"), Qe = /* @__PURE__ */ f((s) => Ze.test(s), "isModuleMock"), ce = /* @__PURE__ */ f((s, e, i) => {
  let t = s;
  if (l.isCallExpression(s)) {
    let { callee: r, arguments: a } = s;
    if (l.isProgram(e) && l.isMemberExpression(r) && l.isIdentifier(r.object) && l.isIdentifier(r.property) && r.property.name === "bind" &&
    (a.length === 0 || a.length === 1 && l.isObjectExpression(a[0]) && a[0].properties.length === 0)) {
      let o = r.object.name, c = O(o, e);
      c && (i._templates[o] = c, t = c);
    }
  }
  return l.isArrowFunctionExpression(t) || l.isFunctionDeclaration(t) ? t.params.length > 0 : !1;
}, "isArgsStory"), He = /* @__PURE__ */ f((s) => {
  if (l.isArrayExpression(s))
    return s.elements.map((e) => {
      if (l.isStringLiteral(e))
        return e.value;
      throw new Error(`Expected string literal named export: ${e}`);
    });
  throw new Error(`Expected array of string literals: ${s}`);
}, "parseExportsOrder"), pe = /* @__PURE__ */ f((s, e) => e.reduce(
  (i, t) => {
    let r = s[t];
    return r && (i[t] = r), i;
  },
  {}
), "sortExports"), Ye = /* @__PURE__ */ f((s) => {
  if (l.isArrowFunctionExpression(s) || l.isFunctionDeclaration(s) || l.isObjectMethod(s)) {
    let e = s.params;
    if (e.length >= 1) {
      let [i] = e;
      if (l.isObjectPattern(i))
        return !!i.properties.find((t) => {
          if (l.isObjectProperty(t) && l.isIdentifier(t.key))
            return t.key.name === "mount";
        });
    }
  }
  return !1;
}, "hasMount"), Ze = /^[.\/#].*\.mock($|\.[^.]*$)/i, U = class extends Error {
  static {
    f(this, "NoMetaError");
  }
  constructor(e, i, t) {
    let r = e.trim();
    super(P.dedent`
      CSF: ${r} ${v(i, t)}
      
      More info: https://storybook.js.org/docs/writing-stories?ref=error#default-export
    `), this.name = this.constructor.name;
  }
}, K = class extends Error {
  static {
    f(this, "MultipleMetaError");
  }
  constructor(e, i, t) {
    let r = `${e} ${v(i, t)}`.trim();
    super(P.dedent`
      CSF: ${e} ${v(i, t)}
      
      More info: https://storybook.js.org/docs/writing-stories?ref=error#default-export
    `), this.name = this.constructor.name;
  }
}, q = class extends Error {
  static {
    f(this, "MixedFactoryError");
  }
  constructor(e, i, t) {
    let r = `${e} ${v(i, t)}`.trim();
    super(P.dedent`
      CSF: ${e} ${v(i, t)}
      
      More info: https://storybook.js.org/docs/writing-stories?ref=error#default-export
    `), this.name = this.constructor.name;
  }
}, B = class extends Error {
  static {
    f(this, "BadMetaError");
  }
  constructor(e, i, t) {
    let r = "".trim();
    super(P.dedent`
      CSF: ${e} ${v(i, t)}
      
      More info: https://storybook.js.org/docs/writing-stories?ref=error#default-export
    `), this.name = this.constructor.name;
  }
}, J = class {
  constructor(e, i, t) {
    this._stories = {};
    this._metaAnnotations = {};
    this._storyExports = {};
    this._storyPaths = {};
    this._storyStatements = {};
    this._storyAnnotations = {};
    this._templates = {};
    this._ast = e, this._file = t, this._options = i, this.imports = [];
  }
  static {
    f(this, "CsfFile");
  }
  _parseTitle(e) {
    let i = l.isIdentifier(e) ? O(e.name, this._ast.program) : e;
    if (l.isStringLiteral(i))
      return i.value;
    if (l.isTSSatisfiesExpression(i) && l.isStringLiteral(i.expression))
      return i.expression.value;
    throw new Error(P.dedent`
      CSF: unexpected dynamic title ${v(i, this._options.fileName)}

      More info: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#string-literal-titles
    `);
  }
  _parseMeta(e, i) {
    if (this._metaNode)
      throw new K("multiple meta objects", e, this._options.fileName);
    this._metaNode = e;
    let t = {};
    e.properties.forEach((r) => {
      if (l.isIdentifier(r.key)) {
        let a = l.isObjectMethod(r) ? r : r.value;
        if (this._metaAnnotations[r.key.name] = a, r.key.name === "title")
          t.title = this._parseTitle(r.value);
        else if (["includeStories", "excludeStories"].includes(r.key.name))
          t[r.key.name] = Je(r.value);
        else if (r.key.name === "component") {
          let o = r.value;
          if (l.isIdentifier(o)) {
            let p = o.name, d = i.body.find(
              (u) => l.isImportDeclaration(u) && u.specifiers.find((g) => g.local.name === p)
            );
            if (d) {
              let { source: u } = d;
              l.isStringLiteral(u) && (this._rawComponentPath = u.value);
            }
          }
          let { code: c } = de.print(r.value, {});
          t.component = c;
        } else if (r.key.name === "tags") {
          let o = r.value;
          l.isIdentifier(o) && (o = O(o.name, this._ast.program)), t.tags = le(o);
        } else if (r.key.name === "id")
          if (l.isStringLiteral(r.value))
            t.id = r.value.value;
          else
            throw new Error(`Unexpected component id: ${r.value}`);
      }
    }), this._meta = t;
  }
  getStoryExport(e) {
    let i = this._storyExports[e];
    if (i = l.isVariableDeclarator(i) ? i.init : i, l.isCallExpression(i)) {
      let { callee: t, arguments: r } = i;
      if (l.isMemberExpression(t) && l.isIdentifier(t.object) && l.isIdentifier(t.property) && t.property.name === "bind" && (r.length === 0 ||
      r.length === 1 && l.isObjectExpression(r[0]) && r[0].properties.length === 0)) {
        let { name: a } = t.object;
        i = this._templates[a];
      }
    }
    return i;
  }
  parse() {
    let e = this;
    if (Ge(this._ast, {
      ExportDefaultDeclaration: {
        enter(t) {
          let { node: r, parent: a } = t, o = l.isIdentifier(r.declaration) && l.isProgram(a);
          if (e._options.transformInlineMeta && !o && l.isExpression(r.declaration)) {
            let d = t.scope.generateUidIdentifier("meta");
            e._metaVariableName = d.name;
            let u = [
              l.variableDeclaration("const", [l.variableDeclarator(d, r.declaration)]),
              l.exportDefaultDeclaration(d)
            ];
            u.forEach((g) => g.loc = t.node.loc), t.replaceWithMultiple(u);
            return;
          }
          let c, p;
          if (o) {
            let d = r.declaration.name;
            e._metaVariableName = d;
            let u = /* @__PURE__ */ f((g) => l.isIdentifier(g.id) && g.id.name === d, "isVariableDeclarator");
            e._metaStatement = e._ast.program.body.find(
              (g) => l.isVariableDeclaration(g) && g.declarations.find(u)
            ), p = (e?._metaStatement?.declarations || []).find(
              u
            )?.init;
          } else
            e._metaStatement = r, p = r.declaration;
          if (l.isObjectExpression(p) ? c = p : /* export default { ... } as Meta<...> */ /* export default { ... } satisfies Meta<...> */ (l.
          isTSAsExpression(p) || l.isTSSatisfiesExpression(p)) && l.isObjectExpression(p.expression) ? c = p.expression : (
            // export default { ... } satisfies Meta as Meta<...>
            l.isTSAsExpression(p) && l.isTSSatisfiesExpression(p.expression) && l.isObjectExpression(p.expression.expression) && (c = p.expression.
            expression)
          ), c && l.isProgram(a) && e._parseMeta(c, a), e._metaStatement && !e._metaNode)
            throw new U(
              "default export must be an object",
              e._metaStatement,
              e._options.fileName
            );
          e._metaPath = t;
        }
      },
      ExportNamedDeclaration: {
        enter(t) {
          let { node: r, parent: a } = t, o;
          l.isVariableDeclaration(r.declaration) ? o = r.declaration.declarations.filter((c) => l.isVariableDeclarator(c)) : l.isFunctionDeclaration(
          r.declaration) && (o = [r.declaration]), o ? o.forEach((c) => {
            if (l.isIdentifier(c.id)) {
              let p = !1, { name: d } = c.id;
              if (d === "__namedExportsOrder" && l.isVariableDeclarator(c)) {
                e._namedExportsOrder = He(c.init);
                return;
              }
              e._storyExports[d] = c, e._storyPaths[d] = t, e._storyStatements[d] = r;
              let u = oe(d);
              e._storyAnnotations[d] ? ae.warn(
                `Unexpected annotations for "${d}" before story declaration`
              ) : e._storyAnnotations[d] = {};
              let g;
              if (l.isVariableDeclarator(c) ? l.isTSAsExpression(c.init) && l.isTSSatisfiesExpression(c.init.expression) ? g = c.init.expression.
              expression : l.isTSAsExpression(c.init) || l.isTSSatisfiesExpression(c.init) ? g = c.init.expression : g = c.init : g = c, l.isCallExpression(
              g) && l.isMemberExpression(g.callee) && l.isIdentifier(g.callee.property) && (g.callee.property.name === "story" || g.callee.property.
              name === "extend") && (p = !0, g = g.arguments[0]), e._metaIsFactory && !p)
                throw new q(
                  "expected factory story",
                  g,
                  e._options.fileName
                );
              if (!e._metaIsFactory && p)
                throw e._metaNode ? new q(
                  "expected non-factory story",
                  g,
                  e._options.fileName
                ) : new B(
                  "meta() factory must be imported from .storybook/preview configuration",
                  g,
                  e._options.fileName
                );
              let b = {};
              l.isObjectExpression(g) ? (b.__isArgsStory = !0, g.properties.forEach((y) => {
                if (l.isIdentifier(y.key)) {
                  let j = y.key.name;
                  if (l.isObjectMethod(y))
                    e._storyAnnotations[d][j] = y;
                  else {
                    if (y.key.name === "render")
                      b.__isArgsStory = ce(
                        y.value,
                        a,
                        e
                      );
                    else if (y.key.name === "name" && l.isStringLiteral(y.value))
                      u = y.value.value;
                    else if (y.key.name === "storyName" && l.isStringLiteral(y.value))
                      ae.warn(
                        `Unexpected usage of "storyName" in "${d}". Please use "name" instead.`
                      );
                    else if (y.key.name === "parameters" && l.isObjectExpression(y.value)) {
                      let z = y.value.properties.find(
                        (h) => l.isObjectProperty(h) && l.isIdentifier(h.key) && h.key.name === "__id"
                      );
                      z && (b.__id = z.value.value);
                    }
                    e._storyAnnotations[d][y.key.name] = y.value;
                  }
                }
              })) : b.__isArgsStory = ce(g, a, e), e._stories[d] = {
                id: "FIXME",
                name: u,
                parameters: b,
                __stats: {
                  factory: p
                }
              };
            }
          }) : r.specifiers.length > 0 && r.specifiers.forEach((c) => {
            if (l.isExportSpecifier(c) && l.isIdentifier(c.exported)) {
              let { name: p } = c.exported, { name: d } = c.local, u = l.isProgram(a) ? O(d, a) : c.local;
              if (p === "default") {
                let g;
                l.isObjectExpression(u) ? g = u : /* export default { ... } as Meta<...> */ /* export default { ... } satisfies Meta<...> */ (l.
                isTSAsExpression(u) || l.isTSSatisfiesExpression(u)) && l.isObjectExpression(u.expression) ? g = u.expression : (
                  // export default { ... } satisfies Meta as Meta<...>
                  l.isTSAsExpression(u) && l.isTSSatisfiesExpression(u.expression) && l.isObjectExpression(u.expression.expression) && (g = u.
                  expression.expression)
                ), g && l.isProgram(a) && e._parseMeta(g, a);
              } else {
                let g = {}, b = u;
                l.isObjectExpression(b) && b.properties.forEach((y) => {
                  l.isIdentifier(y.key) && (g[y.key.name] = y.value);
                }), e._storyAnnotations[p] = g, e._storyStatements[p] = u, e._storyPaths[p] = t, e._stories[p] = {
                  id: "FIXME",
                  name: p,
                  localName: d,
                  parameters: {},
                  __stats: {}
                };
              }
            }
          });
        }
      },
      ExpressionStatement: {
        enter({ node: t, parent: r }) {
          let { expression: a } = t;
          if (l.isProgram(r) && l.isAssignmentExpression(a) && l.isMemberExpression(a.left) && l.isIdentifier(a.left.object) && l.isIdentifier(
          a.left.property)) {
            let o = a.left.object.name, c = a.left.property.name, p = a.right;
            if (e._storyAnnotations[o] && (c === "story" && l.isObjectExpression(p) ? p.properties.forEach((d) => {
              l.isIdentifier(d.key) && (e._storyAnnotations[o][d.key.name] = d.value);
            }) : e._storyAnnotations[o][c] = p), c === "storyName" && l.isStringLiteral(p)) {
              let d = p.value, u = e._stories[o];
              if (!u)
                return;
              u.name = d;
            }
          }
        }
      },
      CallExpression: {
        enter(t) {
          let { node: r } = t, { callee: a } = r;
          if (l.isIdentifier(a) && a.name === "storiesOf")
            throw new Error(P.dedent`
              Unexpected \`storiesOf\` usage: ${v(r, e._options.fileName)}.

              SB8 does not support \`storiesOf\`.
            `);
          if (l.isMemberExpression(a) && l.isIdentifier(a.property) && a.property.name === "meta" && l.isIdentifier(a.object) && r.arguments.
          length > 0) {
            let c = t.scope.getBinding(a.object.name)?.path?.parentPath?.node;
            if (l.isImportDeclaration(c))
              if (Ke(c.source.value)) {
                let p = r.arguments[0];
                e._metaVariableName = a.property.name, e._metaIsFactory = !0, e._parseMeta(p, e._ast.program);
              } else
                throw new B(
                  "meta() factory must be imported from .storybook/preview configuration",
                  c,
                  e._options.fileName
                );
          }
        }
      },
      ImportDeclaration: {
        enter({ node: t }) {
          let { source: r } = t;
          if (l.isStringLiteral(r))
            e.imports.push(r.value);
          else
            throw new Error("CSF: unexpected import source");
        }
      }
    }), !e._meta)
      throw new U("missing default export", e._ast, e._options.fileName);
    let i = Object.entries(e._stories);
    if (e._meta.title = this._options.makeTitle(e._meta?.title), e._metaAnnotations.play && (e._meta.tags = [...e._meta.tags || [], "play-fn"]),
    e._stories = i.reduce(
      (t, [r, a]) => {
        if (!ne(r, e._meta))
          return t;
        let o = a.parameters?.__id ?? ze(e._meta?.id || e._meta?.title, oe(r)), c = { ...a.parameters, __id: o }, { includeStories: p } = e.
        _meta || {};
        r === "__page" && (i.length === 1 || Array.isArray(p) && p.length === 1) && (c.docsOnly = !0), t[r] = { ...a, id: o, parameters: c };
        let d = e._storyAnnotations[r], { tags: u, play: g } = d;
        if (u) {
          let j = l.isIdentifier(u) ? O(u.name, this._ast.program) : u;
          t[r].tags = le(j);
        }
        g && (t[r].tags = [...t[r].tags || [], "play-fn"]);
        let b = t[r].__stats;
        ["play", "render", "loaders", "beforeEach", "globals", "tags"].forEach((j) => {
          b[j] = !!d[j] || !!e._metaAnnotations[j];
        });
        let y = e.getStoryExport(r);
        return b.storyFn = !!(l.isArrowFunctionExpression(y) || l.isFunctionDeclaration(y)), b.mount = Ye(d.play ?? e._metaAnnotations.play),
        b.moduleMock = !!e.imports.find((j) => Qe(j)), t;
      },
      {}
    ), Object.keys(e._storyExports).forEach((t) => {
      ne(t, e._meta) || (delete e._storyExports[t], delete e._storyAnnotations[t], delete e._storyStatements[t]);
    }), e._namedExportsOrder) {
      let t = Object.keys(e._storyExports);
      e._storyExports = pe(e._storyExports, e._namedExportsOrder), e._stories = pe(e._stories, e._namedExportsOrder);
      let r = Object.keys(e._storyExports);
      if (t.length !== r.length)
        throw new Error(
          `Missing exports after sort: ${t.filter(
            (a) => !r.includes(a)
          )}`
        );
    }
    return e;
  }
  get meta() {
    return this._meta;
  }
  get stories() {
    return Object.values(this._stories);
  }
  get indexInputs() {
    let { fileName: e } = this._options;
    if (!e)
      throw new Error(
        P.dedent`Cannot automatically create index inputs with CsfFile.indexInputs because the CsfFile instance was created without a the fileName option.
        Either add the fileName option when creating the CsfFile instance, or create the index inputs manually.`
      );
    return Object.entries(this._stories).map(([i, t]) => {
      let r = [...this._meta?.tags ?? [], ...t.tags ?? []];
      return {
        type: "story",
        importPath: e,
        rawComponentPath: this._rawComponentPath,
        exportName: i,
        name: t.name,
        title: this.meta?.title,
        metaId: this.meta?.id,
        tags: r,
        __id: t.id,
        __stats: t.__stats
      };
    });
  }
}, et = /* @__PURE__ */ f(({
  code: s,
  filename: e = "",
  ast: i
}) => new Be({ filename: e }, { code: s, ast: i ?? fe(s) }), "babelParseFile"), Q = /* @__PURE__ */ f((s, e) => {
  let i = fe(s), t = et({ code: s, filename: e.fileName, ast: i });
  return new J(i, e, t);
}, "loadCsf"), me = /* @__PURE__ */ f((s, e = { sourceMaps: !1 }, i) => {
  let t = We(s._ast, e, i);
  return e.sourceMaps ? t : t.code;
}, "formatCsf"), tt = /* @__PURE__ */ f((s, e = {}) => de.print(s._ast, e), "printCsf"), Ft = /* @__PURE__ */ f(async (s, e) => {
  let i = (await Ue(s, "utf-8")).toString();
  return Q(i, { ...e, fileName: s });
}, "readCsf"), Ct = /* @__PURE__ */ f(async (s, e) => {
  if (!(e || s._options.fileName))
    throw new Error("Please specify a fileName for writeCsf");
  await qe(e, tt(s).code);
}, "writeCsf");

// src/csf-tools/ConfigFile.ts
var ye = L(k(), 1);
import { readFile as rt, writeFile as it } from "node:fs/promises";
import {
  babelParse as xe,
  generate as ue,
  recast as st,
  types as n,
  traverse as ge
} from "storybook/internal/babel";
import { logger as H } from "storybook/internal/node-logger";
var Y = /* @__PURE__ */ f(({
  expectedType: s,
  foundType: e,
  node: i
}) => ye.dedent`
      CSF Parsing error: Expected '${s}' but found '${e}' instead in '${i?.type}'.
    `, "getCsfParsingErrorMessage"), N = /* @__PURE__ */ f((s) => n.isIdentifier(s.key) ? s.key.name : n.isStringLiteral(s.key) ? s.key.value :
null, "propKey"), W = /* @__PURE__ */ f((s) => n.isTSAsExpression(s) || n.isTSSatisfiesExpression(s) ? W(s.expression) : s, "unwrap"), be = /* @__PURE__ */ f(
(s, e) => {
  if (s.length === 0)
    return e;
  if (n.isObjectExpression(e)) {
    let [i, ...t] = s, r = e.properties.find((a) => N(a) === i);
    if (r)
      return be(t, r.value);
  }
}, "_getPath"), Ee = /* @__PURE__ */ f((s, e) => {
  if (s.length === 0) {
    if (n.isObjectExpression(e))
      return e.properties;
    throw new Error("Expected object expression");
  }
  if (n.isObjectExpression(e)) {
    let [i, ...t] = s, r = e.properties.find((a) => N(a) === i);
    if (r)
      return t.length === 0 ? e.properties : Ee(t, r.value);
  }
}, "_getPathProperties"), G = /* @__PURE__ */ f((s, e) => {
  let i = null, t = null;
  return e.body.find((r) => (n.isVariableDeclaration(r) ? t = r.declarations : n.isExportNamedDeclaration(r) && n.isVariableDeclaration(r.declaration) &&
  (t = r.declaration.declarations), t && t.find((a) => n.isVariableDeclarator(a) && n.isIdentifier(a.id) && a.id.name === s ? (i = a, !0) : !1))),
  i;
}, "_findVarDeclarator"), I = /* @__PURE__ */ f((s, e) => G(s, e)?.init, "_findVarInitialization"), $ = /* @__PURE__ */ f((s, e) => {
  if (s.length === 0)
    return e;
  let [i, ...t] = s, r = $(t, e);
  return n.objectExpression([n.objectProperty(n.identifier(i), r)]);
}, "_makeObjectExpression"), A = /* @__PURE__ */ f((s, e, i) => {
  let [t, ...r] = s, a = i.properties.find(
    (o) => N(o) === t
  );
  a ? n.isObjectExpression(a.value) && r.length > 0 ? A(r, e, a.value) : a.value = $(r, e) : i.properties.push(
    n.objectProperty(n.identifier(t), $(r, e))
  );
}, "_updateExportNode"), Z = class {
  constructor(e, i, t) {
    this._exports = {};
    // FIXME: this is a hack. this is only used in the case where the user is
    // modifying a named export that's a scalar. The _exports map is not suitable
    // for that. But rather than refactor the whole thing, we just use this as a stopgap.
    this._exportDecls = {};
    this.hasDefaultExport = !1;
    this._ast = e, this._code = i, this.fileName = t;
  }
  static {
    f(this, "ConfigFile");
  }
  _parseExportsObject(e) {
    this._exportsObject = e, e.properties.forEach((i) => {
      let t = N(i);
      if (t) {
        let r = i.value;
        n.isIdentifier(r) && (r = I(r.name, this._ast.program)), this._exports[t] = r;
      }
    });
  }
  parse() {
    let e = this;
    return ge(this._ast, {
      ExportDefaultDeclaration: {
        enter({ node: i, parent: t }) {
          e.hasDefaultExport = !0;
          let r = n.isIdentifier(i.declaration) && n.isProgram(t) ? I(i.declaration.name, t) : i.declaration;
          r = W(r), n.isCallExpression(r) && n.isObjectExpression(r.arguments[0]) && (r = r.arguments[0]), n.isObjectExpression(r) ? e._parseExportsObject(
          r) : H.warn(
            Y({
              expectedType: "ObjectExpression",
              foundType: r?.type,
              node: r || i.declaration
            })
          );
        }
      },
      ExportNamedDeclaration: {
        enter({ node: i, parent: t }) {
          if (n.isVariableDeclaration(i.declaration))
            i.declaration.declarations.forEach((r) => {
              if (n.isVariableDeclarator(r) && n.isIdentifier(r.id)) {
                let { name: a } = r.id, o = r.init;
                n.isIdentifier(o) && (o = I(o.name, t)), e._exports[a] = o, e._exportDecls[a] = r;
              }
            });
          else if (n.isFunctionDeclaration(i.declaration)) {
            let r = i.declaration;
            if (n.isIdentifier(r.id)) {
              let { name: a } = r.id;
              e._exportDecls[a] = r;
            }
          } else i.specifiers ? i.specifiers.forEach((r) => {
            if (n.isExportSpecifier(r) && n.isIdentifier(r.local) && n.isIdentifier(r.exported)) {
              let { name: a } = r.local, { name: o } = r.exported, c = G(a, t);
              c && (e._exports[o] = c.init, e._exportDecls[o] = c);
            }
          }) : H.warn(
            Y({
              expectedType: "VariableDeclaration",
              foundType: i.declaration?.type,
              node: i.declaration
            })
          );
        }
      },
      ExpressionStatement: {
        enter({ node: i, parent: t }) {
          if (n.isAssignmentExpression(i.expression) && i.expression.operator === "=") {
            let { left: r, right: a } = i.expression;
            if (n.isMemberExpression(r) && n.isIdentifier(r.object) && r.object.name === "module" && n.isIdentifier(r.property) && r.property.
            name === "exports") {
              let o = a;
              n.isIdentifier(a) && (o = I(a.name, t)), o = W(o), n.isObjectExpression(o) ? (e._exportsObject = o, o.properties.forEach((c) => {
                let p = N(c);
                if (p) {
                  let d = c.value;
                  n.isIdentifier(d) && (d = I(
                    d.name,
                    t
                  )), e._exports[p] = d;
                }
              })) : H.warn(
                Y({
                  expectedType: "ObjectExpression",
                  foundType: o?.type,
                  node: o
                })
              );
            }
          }
        }
      },
      CallExpression: {
        enter: /* @__PURE__ */ f(({ node: i }) => {
          n.isIdentifier(i.callee) && i.callee.name === "definePreview" && i.arguments.length === 1 && n.isObjectExpression(i.arguments[0]) &&
          e._parseExportsObject(i.arguments[0]);
        }, "enter")
      }
    }), e;
  }
  getFieldNode(e) {
    let [i, ...t] = e, r = this._exports[i];
    if (r)
      return be(t, r);
  }
  getFieldProperties(e) {
    let [i, ...t] = e, r = this._exports[i];
    if (r)
      return Ee(t, r);
  }
  getFieldValue(e) {
    let i = this.getFieldNode(e);
    if (i) {
      let { code: t } = ue(i, {});
      return (0, eval)(`(() => (${t}))()`);
    }
  }
  getSafeFieldValue(e) {
    try {
      return this.getFieldValue(e);
    } catch {
    }
  }
  setFieldNode(e, i) {
    let [t, ...r] = e, a = this._exports[t];
    if (this._exportsObject) {
      let p = this._exportsObject.properties.find((d) => N(d) === t);
      if (p && n.isIdentifier(p.value)) {
        let d = G(p.value.name, this._ast.program);
        if (d && n.isObjectExpression(d.init)) {
          A(r, i, d.init);
          return;
        }
      }
      A(e, i, this._exportsObject), this._exports[e[0]] = i;
      return;
    }
    if (a && n.isObjectExpression(a) && r.length > 0) {
      A(r, i, a);
      return;
    }
    let o = G(t, this._ast.program);
    if (o && n.isObjectExpression(o.init)) {
      A(r, i, o.init);
      return;
    }
    if (a && r.length === 0 && this._exportDecls[e[0]]) {
      let c = this._exportDecls[e[0]];
      n.isVariableDeclarator(c) && (c.init = $([], i));
    } else {
      if (this.hasDefaultExport)
        throw new Error(
          `Could not set the "${e.join(
            "."
          )}" field as the default export is not an object in this file.`
        );
      {
        let c = $(r, i), p = n.exportNamedDeclaration(
          n.variableDeclaration("const", [n.variableDeclarator(n.identifier(t), c)])
        );
        this._exports[t] = c, this._ast.program.body.push(p);
      }
    }
  }
  /**
   * @example
   *
   * ```ts
   * // 1. { framework: 'framework-name' }
   * // 2. { framework: { name: 'framework-name', options: {} }
   * getNameFromPath(['framework']); // => 'framework-name'
   * ```
   *
   * @returns The name of a node in a given path, supporting the following formats:
   */
  getNameFromPath(e) {
    let i = this.getFieldNode(e);
    if (i)
      return this._getPresetValue(i, "name");
  }
  /**
   * Returns an array of names of a node in a given path, supporting the following formats:
   *
   * @example
   *
   * ```ts
   * const config = {
   *   addons: ['first-addon', { name: 'second-addon', options: {} }],
   * };
   * // => ['first-addon', 'second-addon']
   * getNamesFromPath(['addons']);
   * ```
   */
  getNamesFromPath(e) {
    let i = this.getFieldNode(e);
    if (!i)
      return;
    let t = [];
    return n.isArrayExpression(i) && i.elements.forEach((r) => {
      t.push(this._getPresetValue(r, "name"));
    }), t;
  }
  _getPnpWrappedValue(e) {
    if (n.isCallExpression(e)) {
      let i = e.arguments[0];
      if (n.isStringLiteral(i))
        return i.value;
    }
  }
  /**
   * Given a node and a fallback property, returns a **non-evaluated** string value of the node.
   *
   * 1. `{ node: 'value' }`
   * 2. `{ node: { fallbackProperty: 'value' } }`
   */
  _getPresetValue(e, i) {
    let t;
    if (n.isStringLiteral(e) ? t = e.value : n.isObjectExpression(e) ? e.properties.forEach((r) => {
      n.isObjectProperty(r) && n.isIdentifier(r.key) && r.key.name === i && (n.isStringLiteral(r.value) ? t = r.value.value : t = this._getPnpWrappedValue(
      r.value)), n.isObjectProperty(r) && n.isStringLiteral(r.key) && r.key.value === "name" && n.isStringLiteral(r.value) && (t = r.value.value);
    }) : n.isCallExpression(e) && (t = this._getPnpWrappedValue(e)), !t)
      throw new Error(
        `The given node must be a string literal or an object expression with a "${i}" property that is a string literal.`
      );
    return t;
  }
  removeField(e) {
    let i = /* @__PURE__ */ f((r, a) => {
      let o = r.findIndex(
        (c) => n.isIdentifier(c.key) && c.key.name === a || n.isStringLiteral(c.key) && c.key.value === a
      );
      o >= 0 && r.splice(o, 1);
    }, "removeProperty");
    if (e.length === 1) {
      let r = !1;
      if (this._ast.program.body.forEach((a) => {
        if (n.isExportNamedDeclaration(a) && n.isVariableDeclaration(a.declaration)) {
          let o = a.declaration.declarations[0];
          n.isIdentifier(o.id) && o.id.name === e[0] && (this._ast.program.body.splice(this._ast.program.body.indexOf(a), 1), r = !0);
        }
        if (n.isExportDefaultDeclaration(a)) {
          let o = a.declaration;
          if (n.isIdentifier(o) && (o = I(o.name, this._ast.program)), o = W(o), n.isObjectExpression(o)) {
            let c = o.properties;
            i(c, e[0]), r = !0;
          }
        }
        if (n.isExpressionStatement(a) && n.isAssignmentExpression(a.expression) && n.isMemberExpression(a.expression.left) && n.isIdentifier(
        a.expression.left.object) && a.expression.left.object.name === "module" && n.isIdentifier(a.expression.left.property) && a.expression.
        left.property.name === "exports" && n.isObjectExpression(a.expression.right)) {
          let o = a.expression.right.properties;
          i(o, e[0]), r = !0;
        }
      }), r)
        return;
    }
    let t = this.getFieldProperties(e);
    if (t) {
      let r = e.at(-1);
      i(t, r);
    }
  }
  appendValueToArray(e, i) {
    let t = this.valueToNode(i);
    t && this.appendNodeToArray(e, t);
  }
  appendNodeToArray(e, i) {
    let t = this.getFieldNode(e);
    if (!t)
      this.setFieldNode(e, n.arrayExpression([i]));
    else if (n.isArrayExpression(t))
      t.elements.push(i);
    else
      throw new Error(`Expected array at '${e.join(".")}', got '${t.type}'`);
  }
  /**
   * Specialized helper to remove addons or other array entries that can either be strings or
   * objects with a name property.
   */
  removeEntryFromArray(e, i) {
    let t = this.getFieldNode(e);
    if (t)
      if (n.isArrayExpression(t)) {
        let r = t.elements.findIndex((a) => n.isStringLiteral(a) ? a.value === i : n.isObjectExpression(a) ? this._getPresetValue(a, "name") ===
        i : this._getPnpWrappedValue(a) === i);
        if (r >= 0)
          t.elements.splice(r, 1);
        else
          throw new Error(`Could not find '${i}' in array at '${e.join(".")}'`);
      } else
        throw new Error(`Expected array at '${e.join(".")}', got '${t.type}'`);
  }
  _inferQuotes() {
    if (!this._quotes) {
      let e = (this._ast.tokens || []).slice(0, 500).reduce(
        (i, t) => (t.type.label === "string" && (i[this._code[t.start]] += 1), i),
        { "'": 0, '"': 0 }
      );
      this._quotes = e["'"] > e['"'] ? "single" : "double";
    }
    return this._quotes;
  }
  valueToNode(e) {
    let i = this._inferQuotes(), t;
    if (i === "single") {
      let { code: r } = ue(n.valueToNode(e), { jsescOption: { quotes: i } }), a = xe(`const __x = ${r}`);
      ge(a, {
        VariableDeclaration: {
          enter({ node: o }) {
            o.declarations.length === 1 && n.isVariableDeclarator(o.declarations[0]) && n.isIdentifier(o.declarations[0].id) && o.declarations[0].
            id.name === "__x" && (t = o.declarations[0].init);
          }
        }
      });
    } else
      t = n.valueToNode(e);
    return t;
  }
  setFieldValue(e, i) {
    let t = this.valueToNode(i);
    if (!t)
      throw new Error(`Unexpected value ${JSON.stringify(i)}`);
    this.setFieldNode(e, t);
  }
  getBodyDeclarations() {
    return this._ast.program.body;
  }
  setBodyDeclaration(e) {
    this._ast.program.body.push(e);
  }
  /**
   * Import specifiers for a specific require import
   *
   * @example
   *
   * ```ts
   * // const { foo } = require('bar');
   * setRequireImport(['foo'], 'bar');
   *
   * // const foo = require('bar');
   * setRequireImport('foo', 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to set. If a string is passed in, a default
   *   import will be set. Otherwise, an array of named imports will be set
   * @param fromImport - The module to import from
   */
  setRequireImport(e, i) {
    let t = this._ast.program.body.find((o) => {
      let c = n.isVariableDeclaration(o) && o.declarations.length === 1 && n.isVariableDeclarator(o.declarations[0]) && n.isCallExpression(o.
      declarations[0].init) && n.isIdentifier(o.declarations[0].init.callee) && o.declarations[0].init.callee.name === "require" && n.isStringLiteral(
      o.declarations[0].init.arguments[0]) && (o.declarations[0].init.arguments[0].value === i || o.declarations[0].init.arguments[0].value ===
      i.split("node:")[1]);
      return c && (i = o.declarations[0].init.arguments[0].value), c;
    }), r = /* @__PURE__ */ f((o) => n.isObjectPattern(t?.declarations[0].id) && t?.declarations[0].id.properties.find(
      (c) => n.isObjectProperty(c) && n.isIdentifier(c.key) && c.key.name === o
    ), "hasRequireSpecifier"), a = /* @__PURE__ */ f((o, c) => o.declarations.length === 1 && n.isVariableDeclarator(o.declarations[0]) && n.
    isIdentifier(o.declarations[0].id) && o.declarations[0].id.name === c, "hasDefaultRequireSpecifier");
    if (typeof e == "string") {
      let o = /* @__PURE__ */ f(() => {
        this._ast.program.body.unshift(
          n.variableDeclaration("const", [
            n.variableDeclarator(
              n.identifier(e),
              n.callExpression(n.identifier("require"), [n.stringLiteral(i)])
            )
          ])
        );
      }, "addDefaultRequireSpecifier");
      t && a(t, e) || o();
    } else t ? e.forEach((o) => {
      r(o) || t.declarations[0].id.properties.push(
        n.objectProperty(n.identifier(o), n.identifier(o), void 0, !0)
      );
    }) : this._ast.program.body.unshift(
      n.variableDeclaration("const", [
        n.variableDeclarator(
          n.objectPattern(
            e.map(
              (o) => n.objectProperty(n.identifier(o), n.identifier(o), void 0, !0)
            )
          ),
          n.callExpression(n.identifier("require"), [n.stringLiteral(i)])
        )
      ])
    );
  }
  /**
   * Set import specifiers for a given import statement.
   *
   * Does not support setting type imports (yet)
   *
   * @example
   *
   * ```ts
   * // import { foo } from 'bar';
   * setImport(['foo'], 'bar');
   *
   * // import foo from 'bar';
   * setImport('foo', 'bar');
   *
   * // import * as foo from 'bar';
   * setImport({ namespace: 'foo' }, 'bar');
   *
   * // import 'bar';
   * setImport(null, 'bar');
   * ```
   *
   * @param importSpecifiers - The import specifiers to set. If a string is passed in, a default
   *   import will be set. Otherwise, an array of named imports will be set
   * @param fromImport - The module to import from
   */
  setImport(e, i) {
    let t = this._ast.program.body.find((p) => {
      let d = n.isImportDeclaration(p) && (p.source.value === i || p.source.value === i.split("node:")[1]);
      return d && (i = p.source.value), d;
    }), r = /* @__PURE__ */ f((p) => n.importSpecifier(n.identifier(p), n.identifier(p)), "getNewImportSpecifier"), a = /* @__PURE__ */ f((p, d) => p.
    specifiers.find(
      (u) => n.isImportSpecifier(u) && n.isIdentifier(u.imported) && u.imported.name === d
    ), "hasImportSpecifier"), o = /* @__PURE__ */ f((p, d) => p.specifiers.find(
      (u) => n.isImportNamespaceSpecifier(u) && n.isIdentifier(u.local) && u.local.name === d
    ), "hasNamespaceImportSpecifier");
    e === null ? t || this._ast.program.body.unshift(n.importDeclaration([], n.stringLiteral(i))) : typeof e == "string" ? t ? (/* @__PURE__ */ f(
    (p, d) => p.specifiers.find(
      (u) => n.isImportDefaultSpecifier(u) && n.isIdentifier(u.local) && u.local.name === d
    ), "hasDefaultImportSpecifier"))(t, e) || t.specifiers.push(
      n.importDefaultSpecifier(n.identifier(e))
    ) : this._ast.program.body.unshift(
      n.importDeclaration(
        [n.importDefaultSpecifier(n.identifier(e))],
        n.stringLiteral(i)
      )
    ) : Array.isArray(e) ? t ? e.forEach((p) => {
      a(t, p) || t.specifiers.push(r(p));
    }) : this._ast.program.body.unshift(
      n.importDeclaration(
        e.map(r),
        n.stringLiteral(i)
      )
    ) : e.namespace && (t ? o(t, e.namespace) || t.specifiers.push(
      n.importNamespaceSpecifier(n.identifier(e.namespace))
    ) : this._ast.program.body.unshift(
      n.importDeclaration(
        [n.importNamespaceSpecifier(n.identifier(e.namespace))],
        n.stringLiteral(i)
      )
    ));
  }
}, nt = /* @__PURE__ */ f((s, e) => {
  let i = xe(s);
  return new Z(i, s, e);
}, "loadConfig"), ot = /* @__PURE__ */ f((s) => at(s).code, "formatConfig"), at = /* @__PURE__ */ f((s, e = {}) => st.print(s._ast, e), "pri\
ntConfig"), Mt = /* @__PURE__ */ f(async (s) => {
  let e = (await rt(s, "utf-8")).toString();
  return nt(e, s).parse();
}, "readConfig"), Rt = /* @__PURE__ */ f(async (s, e) => {
  let i = e || s.fileName;
  if (!i)
    throw new Error("Please specify a fileName for writeConfig");
  await it(i, ot(s));
}, "writeConfig"), Lt = /* @__PURE__ */ f((s) => !!s._ast.program.body.find((i) => n.isImportDeclaration(i) && i.source.value.includes("@sto\
rybook") && i.specifiers.some((t) => n.isImportSpecifier(t) && n.isIdentifier(t.imported) && t.imported.name === "definePreview")), "isCsfFa\
ctoryPreview");

// src/csf-tools/getStorySortParameter.ts
var je = L(k(), 1);
import { babelParse as lt, generate as he, types as E, traverse as ct } from "storybook/internal/babel";
import { logger as pt } from "storybook/internal/node-logger";
var ee = /* @__PURE__ */ f((s, e) => {
  let i;
  return s.properties.forEach((t) => {
    E.isIdentifier(t.key) && t.key.name === e && (i = t.value);
  }), i;
}, "getValue"), te = /* @__PURE__ */ f((s) => {
  let e = M(s);
  if (E.isArrayExpression(e))
    return e.elements.map((i) => te(i));
  if (E.isObjectExpression(e))
    return e.properties.reduce((i, t) => (E.isIdentifier(t.key) && (i[t.key.name] = te(t.value)), i), {});
  if (E.isLiteral(e))
    return e.value;
  if (E.isIdentifier(e))
    return w(e.name, !0);
  throw new Error(`Unknown node type ${e.type}`);
}, "parseValue"), w = /* @__PURE__ */ f((s, e) => {
  let i = je.dedent`
    Unexpected '${s}'. Parameter 'options.storySort' should be defined inline e.g.:

    export default {
      parameters: {
        options: {
          storySort: <array | object | function>
        },
      },
    };
  `;
  if (e)
    throw new Error(i);
  pt.log(i);
}, "unsupported"), M = /* @__PURE__ */ f((s) => E.isTSAsExpression(s) || E.isTSSatisfiesExpression(s) ? s.expression : s, "stripTSModifiers"),
Se = /* @__PURE__ */ f((s) => {
  let e = M(s);
  if (E.isObjectExpression(e)) {
    let i = ee(e, "options");
    if (i) {
      if (E.isObjectExpression(i))
        return ee(i, "storySort");
      w("options", !0);
    }
  }
}, "parseParameters"), _e = /* @__PURE__ */ f((s, e) => {
  let i = M(s);
  if (E.isObjectExpression(i)) {
    let t = ee(i, "parameters");
    if (E.isIdentifier(t) && (t = O(t.name, e)), t)
      return Se(t);
  } else
    w("default", !0);
}, "parseDefault"), zt = /* @__PURE__ */ f((s) => {
  if (!s.includes("storySort"))
    return;
  let e, i = lt(s);
  if (ct(i, {
    ExportNamedDeclaration: {
      enter({ node: t }) {
        E.isVariableDeclaration(t.declaration) ? t.declaration.declarations.forEach((r) => {
          if (E.isVariableDeclarator(r) && E.isIdentifier(r.id)) {
            let { name: a } = r.id;
            if (a === "parameters" && r.init) {
              let o = M(r.init);
              e = Se(o);
            }
          }
        }) : t.specifiers.forEach((r) => {
          E.isIdentifier(r.exported) && r.exported.name === "parameters" && w("parameters", !1);
        });
      }
    },
    ExportDefaultDeclaration: {
      enter({ node: t }) {
        let r = t.declaration;
        E.isIdentifier(r) && (r = O(r.name, i.program)), r = M(r), E.isCallExpression(r) && E.isObjectExpression(r.arguments?.[0]) ? e = _e(
        r.arguments[0], i.program) : E.isObjectExpression(r) ? e = _e(r, i.program) : w("default", !1);
      }
    }
  }), !!e) {
    if (E.isArrowFunctionExpression(e)) {
      let { code: t } = he(e, {});
      return (0, eval)(t);
    }
    if (E.isFunctionExpression(e)) {
      let { code: t } = he(e, {}), r = e.id?.name, a = `(a, b) => {
      ${t};
      return ${r}(a, b)
    }`;
      return (0, eval)(a);
    }
    return E.isLiteral(e) || E.isArrayExpression(e) || E.isObjectExpression(e) ? te(e) : w("storySort", !0);
  }
}, "getStorySortParameter");

// src/csf-tools/enrichCsf.ts
import { generate as ft, types as x } from "storybook/internal/babel";
var dt = /* @__PURE__ */ f((s, e, i, t) => {
  let r = e.getStoryExport(i), a = x.isCallExpression(r) && x.isMemberExpression(r.callee) && x.isIdentifier(r.callee.object) && r.callee.object.
  name === "meta", o = !t?.disableSource && ut(r), c = !t?.disableDescription && Pe(e._storyStatements[i]), p = [], d = a ? x.memberExpression(
  x.identifier(i), x.identifier("input")) : x.identifier(i), u = x.memberExpression(d, x.identifier("parameters"));
  p.push(x.spreadElement(u));
  let g = x.optionalMemberExpression(
    u,
    x.identifier("docs"),
    !1,
    !0
  ), b = [];
  if (o) {
    let y = x.optionalMemberExpression(
      g,
      x.identifier("source"),
      !1,
      !0
    );
    b.push(
      x.objectProperty(
        x.identifier("source"),
        x.objectExpression([
          x.objectProperty(x.identifier("originalSource"), x.stringLiteral(o)),
          x.spreadElement(y)
        ])
      )
    );
  }
  if (c) {
    let y = x.optionalMemberExpression(
      g,
      x.identifier("description"),
      !1,
      !0
    );
    b.push(
      x.objectProperty(
        x.identifier("description"),
        x.objectExpression([
          x.objectProperty(x.identifier("story"), x.stringLiteral(c)),
          x.spreadElement(y)
        ])
      )
    );
  }
  if (b.length > 0) {
    p.push(
      x.objectProperty(
        x.identifier("docs"),
        x.objectExpression([x.spreadElement(g), ...b])
      )
    );
    let y = x.expressionStatement(
      x.assignmentExpression("=", u, x.objectExpression(p))
    );
    s._ast.program.body.push(y);
  }
}, "enrichCsfStory"), Oe = /* @__PURE__ */ f((s, e, i) => {
  if (!e.length) {
    s.properties.find(
      (p) => x.isObjectProperty(p) && x.isIdentifier(p.key) && p.key.name === "component"
    ) || s.properties.unshift(i);
    return;
  }
  let [t, ...r] = e, a = s.properties.find(
    (c) => x.isObjectProperty(c) && x.isIdentifier(c.key) && c.key.name === t && x.isObjectExpression(c.value)
  ), o;
  a ? o = a.value : (o = x.objectExpression([]), s.properties.push(x.objectProperty(x.identifier(t), o))), Oe(o, r, i);
}, "addComponentDescription"), mt = /* @__PURE__ */ f((s, e, i) => {
  let t = !i?.disableDescription && Pe(e._metaStatement);
  if (t) {
    let r = s._metaNode;
    r && x.isObjectExpression(r) && Oe(
      r,
      ["parameters", "docs", "description"],
      x.objectProperty(x.identifier("component"), x.stringLiteral(t))
    );
  }
}, "enrichCsfMeta"), Qt = /* @__PURE__ */ f((s, e, i) => {
  mt(s, e, i), Object.keys(s._storyExports).forEach((t) => {
    dt(s, e, t, i);
  });
}, "enrichCsf"), ut = /* @__PURE__ */ f((s) => {
  let e = x.isVariableDeclarator(s) ? s.init : s, { code: i } = ft(e, {});
  return i;
}, "extractSource"), Pe = /* @__PURE__ */ f((s) => s?.leadingComments ? s.leadingComments.map((i) => i.type === "CommentLine" || !i.value.startsWith(
"*") ? null : i.value.split(`
`).map((t) => t.replace(/^(\s+)?(\*+)?(\s)?/, "")).join(`
`).trim()).filter(Boolean).join(`
`) : "", "extractDescription");

// src/csf-tools/index.ts
import { babelParse as dr } from "storybook/internal/babel";

// src/csf-tools/vitest-plugin/transformer.ts
var re = L(k(), 1);
import { types as m } from "storybook/internal/babel";
import { getStoryTitle as gt } from "storybook/internal/common";
import { combineTags as xt } from "storybook/internal/csf";
import { logger as ve } from "storybook/internal/node-logger";
var yt = /* @__PURE__ */ f((s, e) => !(e.include.length && !e.include.some((i) => s?.includes(i)) || e.exclude.some((i) => s?.includes(i))),
"isValidTest");
async function bt({
  code: s,
  fileName: e,
  configDir: i,
  stories: t,
  tagsFilter: r,
  previewLevelTags: a = []
}) {
  let o = Q(s, {
    fileName: e,
    transformInlineMeta: !0,
    makeTitle: /* @__PURE__ */ f((h) => {
      let S = gt({
        storyFilePath: e,
        configDir: i,
        stories: t,
        userTitle: h
      }) || "unknown";
      return S === "unknown" && ve.warn(
        re.dedent`
            [Storybook]: Could not calculate story title for "${e}".
            Please make sure that this file matches the globs included in the "stories" field in your Storybook configuration at "${i}".
          `
      ), S;
    }, "makeTitle")
  }).parse(), c = o._ast, p = o._metaVariableName, d = o._metaNode, u = d.properties.find(
    (h) => m.isObjectProperty(h) && m.isIdentifier(h.key) && h.key.name === "title"
  ), g = m.stringLiteral(o._meta?.title || "unknown");
  if (u ? m.isObjectProperty(u) && (u.value = g) : d.properties.push(m.objectProperty(m.identifier("title"), g)), !d || !o._meta)
    throw new Error(
      `The Storybook vitest plugin could not detect the meta (default export) object in the story file. 

Please make sure you have a default export with the meta object. If you are using a different export format that is not supported, please fi\
le an issue with details about your use case.`
    );
  let b = {};
  Object.keys(o._stories).map((h) => {
    let S = xt(
      "test",
      "dev",
      ...a,
      ...o.meta?.tags || [],
      ...o._stories[h].tags || []
    );
    yt(S, r) && (b[h] = o._storyStatements[h]);
  });
  let y = o._file.path.scope.generateUidIdentifier("test"), j = o._file.path.scope.generateUidIdentifier("describe");
  if (Object.keys(b).length === 0) {
    let h = m.expressionStatement(
      m.callExpression(m.memberExpression(j, m.identifier("skip")), [
        m.stringLiteral("No valid tests found")
      ])
    );
    c.program.body.push(h);
    let S = [
      m.importDeclaration(
        [
          m.importSpecifier(y, m.identifier("test")),
          m.importSpecifier(j, m.identifier("describe"))
        ],
        m.stringLiteral("vitest")
      )
    ];
    c.program.body.unshift(...S);
  } else {
    let ie = function() {
      let _ = o._file.path.scope.generateUidIdentifier("isRunningFromThisFile"), D = m.memberExpression(
        m.callExpression(m.memberExpression(h, m.identifier("getState")), []),
        m.identifier("testPath")
      ), F = m.memberExpression(
        m.memberExpression(m.identifier("globalThis"), m.identifier("__vitest_worker__")),
        m.identifier("filepath")
      ), C = m.logicalExpression(
        "??",
        // TODO: switch order of testPathProperty and filePathProperty when the bug is fixed
        // https://github.com/vitest-dev/vitest/issues/6367 (or probably just use testPathProperty)
        F,
        D
      ), R = m.callExpression(
        m.memberExpression(
          m.callExpression(m.identifier("convertToFilePath"), [
            m.memberExpression(
              m.memberExpression(m.identifier("import"), m.identifier("meta")),
              m.identifier("url")
            )
          ]),
          m.identifier("includes")
        ),
        [C]
      );
      return { isRunningFromThisFileDeclaration: m.variableDeclaration("const", [
        m.variableDeclarator(_, R)
      ]), isRunningFromThisFileId: _ };
    };
    var z = ie;
    f(ie, "getTestGuardDeclaration");
    let h = o._file.path.scope.generateUidIdentifier("expect"), S = o._file.path.scope.generateUidIdentifier("testStory"), De = m.identifier(
    JSON.stringify(r.skip)), { isRunningFromThisFileDeclaration: Ie, isRunningFromThisFileId: Ne } = ie();
    c.program.body.push(Ie);
    let we = /* @__PURE__ */ f(({
      localName: _,
      exportName: D,
      testTitle: F,
      node: C
    }) => {
      let R = m.expressionStatement(
        m.callExpression(y, [
          m.stringLiteral(F),
          m.callExpression(S, [
            m.stringLiteral(D),
            m.identifier(_),
            m.identifier(p),
            De
          ])
        ])
      );
      return R.loc = C.loc, R;
    }, "getTestStatementForStory"), Fe = Object.entries(b).map(([_, D]) => {
      if (D === null) {
        ve.warn(
          re.dedent`
            [Storybook]: Could not transform "${_}" story into test at "${e}".
            Please make sure to define stories in the same file and not re-export stories coming from other files".
          `
        );
        return;
      }
      let F = o._stories[_].localName ?? _, C = o._stories[_].name ?? _;
      return we({ testTitle: C, localName: F, exportName: _, node: D });
    }).filter((_) => !!_), Ce = m.ifStatement(Ne, m.blockStatement(Fe));
    c.program.body.push(Ce);
    let Te = [
      m.importDeclaration(
        [
          m.importSpecifier(y, m.identifier("test")),
          m.importSpecifier(h, m.identifier("expect"))
        ],
        m.stringLiteral("vitest")
      ),
      m.importDeclaration(
        [
          m.importSpecifier(S, m.identifier("testStory")),
          m.importSpecifier(m.identifier("convertToFilePath"), m.identifier("convertToFilePath"))
        ],
        m.stringLiteral("@storybook/addon-vitest/internal/test-utils")
      )
    ];
    c.program.body.unshift(...Te);
  }
  return me(o, { sourceMaps: !0, sourceFileName: e }, s);
}
f(bt, "vitestTransform");
export {
  B as BadMetaError,
  Z as ConfigFile,
  J as CsfFile,
  q as MixedFactoryError,
  K as MultipleMetaError,
  U as NoMetaError,
  dr as babelParse,
  et as babelParseFile,
  Qt as enrichCsf,
  mt as enrichCsfMeta,
  dt as enrichCsfStory,
  Pe as extractDescription,
  ut as extractSource,
  ot as formatConfig,
  me as formatCsf,
  zt as getStorySortParameter,
  Lt as isCsfFactoryPreview,
  Qe as isModuleMock,
  Ke as isValidPreviewPath,
  nt as loadConfig,
  Q as loadCsf,
  at as printConfig,
  tt as printCsf,
  Mt as readConfig,
  Ft as readCsf,
  bt as vitestTransform,
  Rt as writeConfig,
  Ct as writeCsf
};
