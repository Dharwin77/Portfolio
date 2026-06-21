import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Use esbuild (not terser) — terser was breaking React module initialization
    // in the vendor chunk (createContext error). esbuild is safe and fast.
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("lottie-web") || id.includes("lottie-react")) {
              return "vendor-lottie";
            }
            if (id.includes("react-dom") || id.includes("react/")) {
              return "vendor-react";
            }
            if (id.includes("@radix-ui")) {
              return "vendor-radix";
            }
            if (id.includes("lucide-react") || id.includes("@heroicons")) {
              return "vendor-icons";
            }
            if (id.includes("emailjs") || id.includes("@emailjs")) {
              return "vendor-emailjs";
            }
            return "vendor";
          }
        },
      },
    },
  },
}));
