// vite.config.js
import { defineConfig } from "file:///C:/Users/Tedz/OneDrive/Desktop/React%20Project/react-cookbook/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Tedz/OneDrive/Desktop/React%20Project/react-cookbook/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/Users/Tedz/OneDrive/Desktop/React%20Project/react-cookbook/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/Tedz/OneDrive/Desktop/React%20Project/react-cookbook/node_modules/autoprefixer/lib/autoprefixer.js";
var vite_config_default = defineConfig({
  plugins: [
    react({
      // Add this for better compatibility with Bun
      jsxRuntime: "classic"
    })
  ],
  server: {
    port: 8080,
    // Enable faster HMR with Bun
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 3e3
    },
    watch: {
      usePolling: true
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer()
      ]
    }
  },
  // Optimize for Bun's module system
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      supported: {
        bigint: true
      }
    }
  },
  // Enable faster builds with Bun
  build: {
    target: "es2020",
    minify: "terser",
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUZWR6XFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcUmVhY3QgUHJvamVjdFxcXFxyZWFjdC1jb29rYm9va1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVGVkelxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFJlYWN0IFByb2plY3RcXFxccmVhY3QtY29va2Jvb2tcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1RlZHovT25lRHJpdmUvRGVza3RvcC9SZWFjdCUyMFByb2plY3QvcmVhY3QtY29va2Jvb2svdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAgLy8gQWRkIHRoaXMgZm9yIGJldHRlciBjb21wYXRpYmlsaXR5IHdpdGggQnVuXG4gICAgICBqc3hSdW50aW1lOiAnY2xhc3NpYydcbiAgICB9KVxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4MDgwLFxuICAgIC8vIEVuYWJsZSBmYXN0ZXIgSE1SIHdpdGggQnVuXG4gICAgaG1yOiB7XG4gICAgICBwcm90b2NvbDogJ3dzJyxcbiAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgcG9ydDogMzAwMFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IHRydWVcbiAgICB9XG4gIH0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdGFpbHdpbmRjc3MoKSxcbiAgICAgICAgYXV0b3ByZWZpeGVyKCksXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIC8vIE9wdGltaXplIGZvciBCdW4ncyBtb2R1bGUgc3lzdGVtXG4gIG9wdGltaXplRGVwczoge1xuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICB0YXJnZXQ6ICdlczIwMjAnLFxuICAgICAgc3VwcG9ydGVkOiB7IFxuICAgICAgICBiaWdpbnQ6IHRydWUgXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIC8vIEVuYWJsZSBmYXN0ZXIgYnVpbGRzIHdpdGggQnVuXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1YLFNBQVMsb0JBQW9CO0FBQ2haLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjtBQUd6QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUE7QUFBQSxNQUVKLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUVOLEtBQUs7QUFBQSxNQUNILFVBQVU7QUFBQSxNQUNWLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1osZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsUUFDVCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
