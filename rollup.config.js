// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'output',
    format: 'es',
		interop: 'auto'
  },
  plugins: [typescript(), nodeResolve()]
};