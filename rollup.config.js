import esbuild from "rollup-plugin-esbuild";
import dts from "rollup-plugin-dts";

export default [{
  input: {
    index: 'src/index.ts'
  },
  output: {
    dir: 'dist'
  },
  plugins: [
    esbuild()
  ]
}, {
  input: "./type-dist/index.d.ts",
  output: [
    {
      file: "dist/index.d.ts", format: "es"
    }
  ],
  plugins: [dts()],
}]