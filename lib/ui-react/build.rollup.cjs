const postcss = require('rollup-plugin-postcss');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const url = require('@rollup/plugin-url');
const svg = require('@svgr/rollup');
const { cpSync } = require('fs');
const { resolve } = require('path');

function copyAssetsPlugin() {
  return {
    name: 'copy-assets',
    writeBundle() {
      const assets = [
        { src: 'fonts', dest: 'assets/fonts' },
        { src: 'images', dest: 'assets/images' },
        { src: 'svg', dest: 'assets/svg' },
        { src: 'i18n', dest: 'assets/i18n' },
      ];

      assets.forEach(({ src, dest }) => {
        const sourceDir = resolve(__dirname, `src/assets/${src}`);
        const targetDir = resolve(__dirname, `../../dist/lib/ui-react/${dest}`);
        try {
          cpSync(sourceDir, targetDir, { recursive: true });
        } catch (err) {
          if (err.code !== 'ENOENT') {
            console.warn(`Warning: Could not copy ${src}: ${err.message}`);
          }
        }
      });
    },
  };
}

module.exports = {
  input: './src/index.ts',
  output: {
    dir: '../../dist/lib/ui-react',
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
    copyAssetsPlugin(),
  ],
};
