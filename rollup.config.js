import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import svgr from "@svgr/rollup";
import alias from "@rollup/plugin-alias";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "./dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    // Add alias plugin to resolve @/* paths
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    }),
    resolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".svg"],
    }),
    commonjs(),
    // Handle SVG imports with ?react suffix
    {
      name: "svg-react-query",
      resolveId(source) {
        if (source.endsWith(".svg?react")) {
          return source;
        }
        return null;
      },
      load(id) {
        if (id.endsWith(".svg?react")) {
          // Remove ?react and let svgr handle it
          return null;
        }
        return null;
      },
      transform(code, id) {
        if (id.endsWith(".svg?react")) {
          // This will be handled by svgr plugin
          return null;
        }
        return null;
      },
    },
    svgr({
      include: "**/*.svg",
      ref: true,
      svgoConfig: {
        plugins: [
          {
            name: "removeViewBox",
            active: false,
          },
        ],
      },
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false, // Already handled by build:types
    }),
    postcss({
      extract: false,
      modules: true,
      use: ["sass"],
    }),
  ],
  external: ["react", "react-dom"],
};
