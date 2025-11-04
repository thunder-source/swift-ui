import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import replace from "@rollup/plugin-replace"; // <-- rollup replace for extra safety

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    define: {
      // Make sure process.env.NODE_ENV is a literal string for DCE/treeshaking
      "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development"),
    },
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        svgrOptions: {
          icon: true,
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              "removeXMLNS",
              "removeDoctype",
              "removeComments",
            ],
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
    },
    build: {
      target: "es2019",                 // modern target but widely compatible
      chunkSizeWarningLimit: 1200,
      cssCodeSplit: true,
      minify: "terser",
      reportCompressedSize: false,
      terserOptions: {
        parse: {},
        compress: {
          drop_console: true,
          drop_debugger: true,
          dead_code: true,
          // enable aggressive inlining/dce where safe
          passes: 3,
          // remove pure functions used for logging
          pure_funcs: ["console.info", "console.debug", "console.warn"],
        },
        mangle: true,
        format: {
          comments: false,
        },
      },
      rollupOptions: {
        // Add the replace plugin to rollup pipeline so any libs using process.env.* see it
        plugins: [
          replace({
            preventAssignment: true,
            "process.env.NODE_ENV": JSON.stringify(isProd ? "production" : "development"),
          }),
        ],
        output: {
          manualChunks: (id) => {
            if (id.includes(".svg")) {
              if (id.includes("/assets/svg/header/")) return "svg-header";
              if (id.includes("/assets/svg/sidebar/")) return "svg-sidebar";
              if (id.includes("/assets/svg/icons/")) return "svg-icons";
              const parts = id.split("/assets/svg/");
              if (parts.length > 1) {
                const subdir = parts[1].split("/")[0];
                if (subdir) return `svg-${subdir}`;
              }
              return "svg-other";
            }

            if (id.includes("/src/components/base/svgIcon/")) return "base-svgIcon-component";

            if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) return "react-core";

            if (id.includes("node_modules/react-router") || id.includes("node_modules/react-router-dom")) return "router";

            if (id.includes("node_modules/recharts") || id.includes("node_modules/d3")) return "charts";

            if (id.includes("node_modules/date-fns")) return "date-utils";

            if (id.includes("/src/components/ui/")) {
              if (id.includes("/buttons/") || id.includes("/inputs/")) return "ui-controls";
              if (id.includes("/modals/") || id.includes("/dialogs/")) return "ui-overlays";
              if (id.includes("/tables/") || id.includes("/grids/")) return "ui-data";
              return "ui-other";
            }

            if (id.includes("/src/components/base/")) {
              const parts = id.split("/src/components/base/")[1]?.split("/");
              if (parts && parts.length > 0) {
                const componentType = parts[0];
                if (componentType) return `base-${componentType}`;
              }
              return "base-components-other";
            }

            if (id.includes("/src/components/custom/")) {
              const parts = id.split("/src/components/custom/")[1]?.split("/");
              if (parts && parts.length > 0) {
                const componentType = parts[0];
                if (componentType) return `custom-${componentType}`;
              }
              return "custom-components-other";
            }

            if (id.includes("/src/pages/")) {
              const pageName = id.split("/src/pages/")[1]?.split("/")[0];
              if (pageName) return `page-${pageName}`;
              return "pages";
            }

            if (id.includes("node_modules/")) return "vendor";
          },
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
