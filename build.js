import fs from "node:fs";
import pug from "pug";
import esbuild from "esbuild";

// handle DEV behavior
// if (process.argv.length > 3) {
//   console.error("Expected at most one argument!");
//   process.exit(1);
// }
// const DEV = process.argv.length == 3 && process.argv[2] === "dev";

// create public folder if nonexistent
fs.mkdirSync("./public", { recursive: true });

// compile js
await esbuild.build({
  entryPoints: ["./src/lib/index.js"],
  outdir: "./src/template/build",
  bundle: true,
  write: true,
  minify: true,
});
await esbuild.build({
  entryPoints: ["./src/lib/api.js"],
  outdir: "./netlify/functions",
  bundle: true,
  write: true,
  minify: true,
  platform: "node",
  format: "esm",
});

// compile css
await esbuild.build({
  entryPoints: ["./src/template/index.css"],
  outdir: "./src/template/build",
  bundle: true,
  write: true,
  minify: true,
});

// compile html
let html = pug.compileFile("./src/template/index.pug")();
fs.writeFileSync("./public/index.html", html, "utf8");
fs.copyFileSync("./public/index.html", "./public/404.html");

// copy over static files
fs.cpSync("./src/static/", "./public/", { recursive: true, overwrite: true });
