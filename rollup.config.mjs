import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import svgr from "@svgr/rollup";
import alias from "@rollup/plugin-alias";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// Source map configuration: full maps in dev, hidden maps in production
// hidden-source-map generates .map files but doesn't reference them in the bundle
// This keeps bundles smaller while still providing debugging capability if needed
const sourcemapConfig = isProduction ? 'hidden' : true;

export default {
  input: "src/index.ts",
  output: [
    {
      file: "./dist/index.js",
      format: "cjs",
      sourcemap: sourcemapConfig,
      inlineDynamicImports: true, // Keep true for CJS if we want a single file, or false for splitting. Usually CJS libraries are single file or split. Let's keep it true for now but minify.
    },
    {
      file: "./dist/index.esm.js",
      format: "esm",
      sourcemap: sourcemapConfig,
      inlineDynamicImports: true, // ESM usually benefits from splitting but for a library single file is often expected unless using entry points.
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
      tsconfig: "./tsconfig.build.json",
      declaration: false, // Already handled by build:types
      compilerOptions: {
        noEmit: false,
        outDir: "./dist",
        declaration: false,
        declarationMap: false,
        declarationDir: null,
      }
    }),
    postcss({
      extract: "styles.css",
      minimize: true,
      modules: false,
      use: {
        sass: null,
        stylus: null,
        less: null,
      },
      config: {
        path: "./postcss.config.cjs",
      },
      extensions: [".css"],
      inject: false,
    }),
    terser(), // Minify the output
    visualizer({
      filename: "bundle-analysis.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  external: (id) => {
    // Mark React dependencies and @radix-ui/* packages as external
    if (id.startsWith("@radix-ui/")) return true;
    const externals = ["react", "react-dom", "react-router-dom", "react-redux"];
    return externals.includes(id);
  },
};
