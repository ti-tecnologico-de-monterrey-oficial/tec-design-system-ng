const g = "2.0.10", e = {}, f = (t) => {
  const { type: n, currentTarget: c } = t;
  e[n].forEach((a, s) => {
    c === s && a.forEach((o, i) => {
      i.apply(s, [t]), typeof o == "object" && o.once && r(s, n, i, o);
    });
  });
}, E = (t, n, c, a) => {
  e[n] || (e[n] = /* @__PURE__ */ new Map());
  const s = e[n];
  s.has(t) || s.set(t, /* @__PURE__ */ new Map());
  const o = s.get(
    t
  ), { size: i } = o;
  o.set(c, a), i || t.addEventListener(
    n,
    f,
    a
  );
}, r = (t, n, c, a) => {
  const s = e[n], o = s && s.get(t), i = o && o.get(c), d = i !== void 0 ? i : a;
  o && o.has(c) && o.delete(c), s && (!o || !o.size) && s.delete(t), (!s || !s.size) && delete e[n], (!o || !o.size) && t.removeEventListener(
    n,
    f,
    d
  );
}, M = E, p = r;
export {
  E as addListener,
  f as globalListener,
  p as off,
  M as on,
  e as registry,
  r as removeListener,
  g as version
};
//# sourceMappingURL=event-listener.mjs.map
