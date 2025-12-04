// vite.config.ts
import { defineConfig } from "file:///D:/hddata/t-v5/vue-image-label-master/vue-image-label-master/node_modules/.pnpm/vite@4.5.14/node_modules/vite/dist/node/index.js";
import { createVuePlugin } from "file:///D:/hddata/t-v5/vue-image-label-master/vue-image-label-master/node_modules/.pnpm/vite-plugin-vue2@2.0.3_loda_300dd636274f932b71f51d8b570d08e2/node_modules/vite-plugin-vue2/dist/index.js";
import libCss from "file:///D:/hddata/t-v5/vue-image-label-master/vue-image-label-master/node_modules/.pnpm/vite-plugin-libcss@1.1.2_vite@4.5.14/node_modules/vite-plugin-libcss/index.js";
import dts from "file:///D:/hddata/t-v5/vue-image-label-master/vue-image-label-master/node_modules/.pnpm/vite-plugin-dts@2.0.0-beta.3_rollup@3.29.5_vite@4.5.14/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "D:\\hddata\\t-v5\\vue-image-label-master\\vue-image-label-master";
var vite_config_default = defineConfig({
  plugins: [createVuePlugin({ jsx: false }), libCss(), dts({
    beforeWriteFile: (filePath, content) => ({
      filePath: filePath.replace(/src/, ""),
      content
    })
  })],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "packages/image-label.vue"),
      name: "VueImageLabel",
      fileName: (format) => `vue-image-label.${format}.js`
    },
    rollupOptions: {
      // 那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxoZGRhdGFcXFxcdC12NVxcXFx2dWUtaW1hZ2UtbGFiZWwtbWFzdGVyXFxcXHZ1ZS1pbWFnZS1sYWJlbC1tYXN0ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGhkZGF0YVxcXFx0LXY1XFxcXHZ1ZS1pbWFnZS1sYWJlbC1tYXN0ZXJcXFxcdnVlLWltYWdlLWxhYmVsLW1hc3RlclxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovaGRkYXRhL3QtdjUvdnVlLWltYWdlLWxhYmVsLW1hc3Rlci92dWUtaW1hZ2UtbGFiZWwtbWFzdGVyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGNyZWF0ZVZ1ZVBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZTInXG5pbXBvcnQgbGliQ3NzIGZyb20gJ3ZpdGUtcGx1Z2luLWxpYmNzcyc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW2NyZWF0ZVZ1ZVBsdWdpbih7IGpzeDogZmFsc2UgfSksIGxpYkNzcygpLCBkdHMoe1xuICAgIGJlZm9yZVdyaXRlRmlsZTogKGZpbGVQYXRoLCBjb250ZW50KSA9PiAoe1xuICAgICAgZmlsZVBhdGg6IGZpbGVQYXRoLnJlcGxhY2UoL3NyYy8sICcnKSxcbiAgICAgIGNvbnRlbnRcbiAgICB9KVxuICB9KV0sXG4gIGJ1aWxkOiB7XG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwicGFja2FnZXMvaW1hZ2UtbGFiZWwudnVlXCIpLFxuICAgICAgbmFtZTogXCJWdWVJbWFnZUxhYmVsXCIsXG4gICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHZ1ZS1pbWFnZS1sYWJlbC4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gXHU5MEEzXHU0RTlCXHU0RjYwXHU0RTBEXHU2MEYzXHU2MjUzXHU1MzA1XHU4RkRCXHU1RTkzXHU3Njg0XHU0RjlEXHU4RDU2XG4gICAgICBleHRlcm5hbDogW1widnVlXCJdLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIFx1NTcyOCBVTUQgXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGXHU0RTBCXHU0RTNBXHU4RkQ5XHU0RTlCXHU1OTE2XHU5MEU4XHU1MzE2XHU3Njg0XHU0RjlEXHU4RDU2XHU2M0QwXHU0RjlCXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6IFwiVnVlXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdYLFNBQVMsb0JBQW9CO0FBQzdZLFNBQVMsdUJBQXVCO0FBQ2hDLE9BQU8sWUFBWTtBQUNuQixPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBSnhCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLE1BQU0sQ0FBQyxHQUFHLE9BQU8sR0FBRyxJQUFJO0FBQUEsSUFDdkQsaUJBQWlCLENBQUMsVUFBVSxhQUFhO0FBQUEsTUFDdkMsVUFBVSxTQUFTLFFBQVEsT0FBTyxFQUFFO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDLENBQUM7QUFBQSxFQUNGLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVywwQkFBMEI7QUFBQSxNQUNwRCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVyxtQkFBbUIsTUFBTTtBQUFBLElBQ2pEO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVUsQ0FBQyxLQUFLO0FBQUEsTUFDaEIsUUFBUTtBQUFBO0FBQUEsUUFFTixTQUFTO0FBQUEsVUFDUCxLQUFLO0FBQUEsUUFDUDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
