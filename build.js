import fs from "node:fs";
import pug from "pug";

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

await ["adjectives", "intros", "nounsOther", "nounsSetlike"].reduce((prev, curr) => {
  return prev.then(() => readWords(curr)).catch((e) => console.log(e));
}, Promise.resolve());

let data_str = JSON.stringify(data, null, 0);
let html = pug.compileFile("pug/index.pug")({ data_str });

fs.writeFileSync("public/index.html", html, "utf8");
fs.copyFileSync("public/index.html", "public/404.html");

let apijs = fs.readFileSync("netlify/functions/api.js", "utf8");
apijs.replace("const data = null;", `const data = "${data_str}";`);
fs.writeFileSync("netlify/functions/api.js", apijs, "utf8");
