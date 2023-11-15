import react from "@vitejs/plugin-react-swc";
import postcssNesting from "postcss-nesting";
import { defineConfig, loadEnv } from "vite";
import { inject, minify } from "vite-plugin-parse-html";
// import viteTsConfigPaths from 'vite-tsconfig-paths';
import autoprefixer from "autoprefixer";
import { resolve } from "path";

const ENV_VARS_PREFIX = "ENV_";

console.error = (messages, ...rest) => {
  if (messages?.message?.includes("Duplicate atom key")) {
    return;
  }

  console.warn(messages, ...rest);
};

export default defineConfig(({ mode }) => {
  const envs = { ...loadEnv(mode, __dirname, ENV_VARS_PREFIX), NODE_ENV: mode };

  const isDevelopment = mode === "development";

  return {
    test: {
      environment: "jsdom",
    },
    globals: true,
    define: { envs },
    esbuild: {
      define: { global: "globalThis" },
    },
    envPrefix: ENV_VARS_PREFIX,
    build: {
      chunkSizeWarningLimit: 100_000, // 100kb
    },
    server: {
      port: 3000,
      host: "127.0.0.1",
      proxy: {
        [`/api/v${envs["ENV_API_VERSION"]}`]: {
          target: envs["ENV_API_URL"],
          changeOrigin: true,
        },
      },
    },
    plugins: [
      inject({ path: `${__dirname}/index.html` }),
      minify({ isMinify: true }),
      react(),
      // viteTsConfigPaths({ root: './' }),
    ],
    resolve: {
      alias: {
        "@components": resolve(__dirname, "src", "shared", "components"),
        "@shared": resolve(__dirname, "src", "shared"),
        "@hooks": resolve(__dirname, "src", "shared", "hooks"),
        "@assets": resolve(__dirname, "src", "assets"),
        "@tools": resolve(__dirname, "src", "shared", "tools"),
        "@entities": resolve(__dirname, "src", "entities"),
        "@pages": resolve(__dirname, "src", "pages"),
        "@types": resolve(__dirname, "src", "shared", "types"),
      },
    },

    css: {
      modules: {
        generateScopedName: isDevelopment ? "[name]__[local]__[hash:base64:5]" : "[hash:base64:5]",
      },
      postcss: {
        plugins: [postcssNesting(), autoprefixer()],
      },
    },
  };
});
