import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
// import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    // dynamicImportVars({
    //   //这里配置插件在那个文件夹内生效 这里是在router文件夹内生效
    //  include:["node_modules"],
    //  //这里是哪些文件夹内不生效
    //  exclude:[],
    //  //插件在遇到错误时会退出构建过程。如果您将此选项设置为 true，它将引发警告，并且保持代码不变。
    //  warnOnError:false
    // }),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
    }),
  ],
});
