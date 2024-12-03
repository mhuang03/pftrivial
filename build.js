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
let inlinejs = fs.readFileSync("static/index.js", "utf8");
let inlinecss = fs.readFileSync("static/index.css", "utf8");
let html = pug.compileFile("pug/index.pug")({ data_str, inlinejs });

const errorLogger = (err) => {
  if (err) throw err;
};
fs.writeFile("public/index.html", html, "utf8", errorLogger);
fs.copyFile("static/index.js", "public/index.js", errorLogger);
fs.copyFile("static/index.css", "public/index.css", errorLogger);
