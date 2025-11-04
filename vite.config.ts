import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      // Configure SVGR to optimize SVGs
      svgrOptions: {
        icon: true, // Make SVGs more optimized
        svgo: true, // Enable SVG optimization
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // Disable plugins that might affect icon appearance
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
    include: ["react", "react-dom", "react-router-dom"], // Pre-bundle these dependencies
  },
  build: {
    // Set a higher warning limit for SVG assets
    chunkSizeWarningLimit: 1200, // Increased to accommodate large SVGs
    minify: "terser", // Use terser for better minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Use a function for more dynamic and granular chunk splitting
        manualChunks: (id) => {
          // Handle SVG files - split by directory to avoid one large SVG chunk
          if (id.includes(".svg")) {
            if (id.includes("/assets/svg/header/")) {
              return "svg-header";
            }
            if (id.includes("/assets/svg/sidebar/")) {
              return "svg-sidebar";
            }
            if (id.includes("/assets/svg/icons/")) {
              return "svg-icons";
            }
            // Get the directory name for other SVGs
            const parts = id.split("/assets/svg/");
            if (parts.length > 1) {
              const subdir = parts[1].split("/")[0];
              if (subdir) {
                return `svg-${subdir}`;
              }
            }
            return "svg-other";
          }

          // Handle SVG Icon component specifically
          if (id.includes("/src/components/base/svgIcon/")) {
            return "base-svgIcon-component";
          }

          // Core React libraries
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-core";
          }

          // React Router
          if (
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/react-router-dom")
          ) {
            return "router";
          }

          // UI libraries and components
          if (
            id.includes("node_modules/recharts") ||
            id.includes("node_modules/d3")
          ) {
            return "charts";
          }

          // Date handling libraries
          if (id.includes("node_modules/date-fns")) {
            return "date-utils";
          }

          // Split our own UI components
          if (id.includes("/src/components/ui/")) {
            // Further split UI components by type
            if (id.includes("/buttons/") || id.includes("/inputs/")) {
              return "ui-controls";
            }
            if (id.includes("/modals/") || id.includes("/dialogs/")) {
              return "ui-overlays";
            }
            if (id.includes("/tables/") || id.includes("/grids/")) {
              return "ui-data";
            }
            return "ui-other";
          }

          // Split base components by category
          if (id.includes("/src/components/base/")) {
            // Extract component type from path
            const parts = id.split("/src/components/base/")[1]?.split("/");
            if (parts && parts.length > 0) {
              const componentType = parts[0];
              if (componentType) {
                return `base-${componentType}`;
              }
            }
            return "base-components-other";
          }

          // Split custom components
          if (id.includes("/src/components/custom/")) {
            // Extract component type from path
            const parts = id.split("/src/components/custom/")[1]?.split("/");
            if (parts && parts.length > 0) {
              const componentType = parts[0];
              if (componentType) {
                return `custom-${componentType}`;
              }
            }
            return "custom-components-other";
          }

          // Split by feature/page
          if (id.includes("/src/pages/")) {
            // Extract the page name from the path
            const pageName = id.split("/src/pages/")[1]?.split("/")[0];
            if (pageName) {
              return `page-${pageName}`;
            }
            return "pages";
          }

          // Other node_modules
          if (id.includes("node_modules/")) {
            return "vendor";
          }
        },
        // Customize chunk naming format
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
