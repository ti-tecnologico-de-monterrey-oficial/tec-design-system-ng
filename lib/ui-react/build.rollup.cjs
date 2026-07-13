const postcss = require('rollup-plugin-postcss');
const { babel } = require('@rollup/plugin-babel');
const json = require('@rollup/plugin-json');
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
  input: {
    index: './src/index.ts',
    client: './src/client.ts',
  },
  output: {
    dir: '../../dist/lib/ui-react',
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].js',
    banner(chunk) {
      return chunk.name === 'client' ? "'use client';" : '';
    },
  },
  external: [
    'react',
    'react-dom',
    'react/jsx-dev-runtime',
    'react/jsx-runtime',
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
    json(),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: /node_modules/,
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    copyAssetsPlugin(),
  ],
};
