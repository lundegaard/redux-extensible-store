import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es'

export default {
  input: 'src/index.js',
  output: {
    name: 'redux-extensible-store',
    format: 'umd',
    exports: 'named',
    file: 'dist/index.js',
  },
  plugins: [
    babel({
      babelrc: false,
      presets: ['react'],
      plugins: ['babel-plugin-transform-object-rest-spread'],
    }),
    commonjs(),
    nodeResolve(),
    uglify({}, minify),
  ],
  external: ['redux'],
};
