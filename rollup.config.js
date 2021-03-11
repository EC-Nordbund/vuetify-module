import commonjs from "@rollup/plugin-commonjs";
import node from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";
import { terser } from "rollup-plugin-terser";

export default {
  input: {
    index: 'src/index.ts'
  },
  output: {
    dir: 'dist'
  },
  plugins: [
    node(),
    commonjs(),
    esbuild(),
    terser()
  ]
}