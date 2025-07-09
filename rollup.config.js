import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default defineConfig([
  // UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/umd/html-truncate.js',
      format: 'umd',
      name: 'HtmlTruncate',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        outDir: 'dist/umd',
        declaration: false,
        declarationMap: false,
      }),
    ],
  },
  // UMD minified build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/umd/html-truncate.min.js',
      format: 'umd',
      name: 'HtmlTruncate',
      sourcemap: true,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        outDir: 'dist/umd',
        declaration: false,
        declarationMap: false,
      }),
      terser(),
    ],
  },
]);
