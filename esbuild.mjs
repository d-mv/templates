/* eslint-disable no-console */
import { build } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";

build({
  entryPoints: [{ in: "./src/index.mjs", out: "index.js" }],
  outdir: "./dist",
  minify: true,
  bundle: true,
  platform: "node",
  target: "node16",
  plugins: [esbuildPluginPino({ transports: ["pino", "pino-pretty"] })]
})
  .catch((reason) => {
    console.log(`Build caught error:`);
    console.dir(reason, { depth: 15, color: true });
    process.exit(1);
  })
  .finally(() => {
    console.log("Build is done.");
  });
