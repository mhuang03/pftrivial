import fs from "node:fs";
import pug from "pug";

if (process.argv.length > 3) {
  console.error("Expected at most one argument!");
  process.exit(1);
}
const DEV = process.argv.length == 3 && process.argv[2] === "dev";

let data = {};

const readWords = (fName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`words/${fName}.txt`, "utf8", (err, fileContents) => {
      if (err) reject(err);
      else {
        data[fName] = fileContents.trim().split(/\r?\n/);
        resolve();
      }
    });
  });
};

await ["adjectives", "containments", "degraders", "methods", "nounsOther", "nounsSetlike", "theorems", "uses"].reduce(
  (prev, curr) => {
    return prev.then(() => readWords(curr)).catch((e) => console.log(e));
  },
  Promise.resolve()
);

let data_str = JSON.stringify(data, null, 0);
let html = pug.compileFile("pug/index.pug")({ data_str, DEV });

fs.writeFileSync("public/index.html", html, "utf8");
fs.copyFileSync("public/index.html", "public/404.html");

if (!DEV) {
  let apijs = fs.readFileSync("netlify/functions/api.js", "utf8");
  apijs = apijs.replace("const data = null;", `const data = ${data_str};`);
  fs.writeFileSync("netlify/functions/api.js", apijs, "utf8");
}
