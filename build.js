import fs from "node:fs";
import pug from "pug";
import esbuild from "esbuild";

// handle DEV behavior
if (process.argv.length > 3) {
  console.error("Expected at most one argument!");
  process.exit(1);
}
const DEV = process.argv.length == 3 && process.argv[2] === "dev";

// create output folders if nonexistent
fs.mkdirSync("./public", { recursive: true });
fs.mkdirSync("./netlify/functions", { recursive: true });

// compile html
let html = pug.compileFile("./pug/index.pug")({ DEV });
fs.writeFileSync("./public/index.html", html, "utf8");
fs.copyFileSync("./public/index.html", "./public/404.html");

// compile js
await esbuild.build({
  entryPoints: [
    { in: "./lib/index.js", out: "./public/index" },
    { in: "./lib/api.js", out: "./netlify/functions/api" },
  ],
  outdir: "./",
  bundle: true,
  write: true,
  minify: true,
});

// copy over static files
fs.cpSync("./static/", "./public/", { recursive: true, overwrite: true });
