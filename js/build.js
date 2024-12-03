import fs from "node:fs";

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
console.log(data_str);
