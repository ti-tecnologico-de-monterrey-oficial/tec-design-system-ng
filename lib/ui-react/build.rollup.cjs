const postcss = require('rollup-plugin-postcss');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const url = require('@rollup/plugin-url');
const svg = require('@svgr/rollup');

module.exports = {
  input: './src/index.ts',
  output: {
    dir: './dist',
    format: 'esm',
    sourcemap: true,
  },
  external: [
    'react',
    'react-dom',
    'react/jsx-dev-runtime',
    'react/jsx-runtime',
    '@ti-tecnologico-de-monterrey-oficial/core/component/badge',
  ],
  plugins: [
    postcss({
      extract: true,
      use: ['sass'],
    }),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'],
    }),
    svg({
      svgo: false,
      titleProp: true,
      ref: true,
    }),
    url({
      limit: 10000,
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: /node_modules/,
    }),
  ],
};
