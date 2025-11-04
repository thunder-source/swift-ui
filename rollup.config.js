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
      inlineDynamicImports: true,
    },
    {
      file: "./dist/index.esm.js",
      format: "esm",
      sourcemap: true,
      inlineDynamicImports: true,
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
      resolveId(source, importer) {
        if (source.endsWith(".svg?react")) {
          // Remove ?react and resolve the actual .svg file
          const actualPath = source.replace("?react", "");
          return this.resolve(actualPath, importer, { skipSelf: true });
        }
        return null;
      }
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
      tsconfig: "./tsconfig.app.json",
      declaration: false, // Already handled by build:types
      compilerOptions: {
        noEmit: false,
        outDir: "./dist"
      }
    }),
    postcss({
      extract: false,
      modules: true,
      use: ["sass"],
    }),
  ],
  external: ["react", "react-dom"],
};
