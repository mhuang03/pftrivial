import { data } from "./data";

const addRandomDigit = (str) => str.replaceAll("#", () => Math.floor(Math.random() * 9) + 1);

const getRandom = (...lists) => {
  let length = lists.map((l) => l.length).reduce((a, b) => a + b, 0);
  let k = Math.floor(Math.random() * length);
  for (let l of lists) {
    if (k >= l.length) k -= l.length;
    else return addRandomDigit(l[k]);
  }
};

const produceVariant = (str, isVariant) => {
  return isVariant
    ? str.replaceAll(/\((.*)\)/g, "$1").replaceAll(/\[(.*)\]/g, "")
    : str.replaceAll(/\((.*)\)/g, "").replaceAll(/\[(.*)\]/g, "$1");
};

const extractVariantInfo = (str) => {
  return str.charAt(0) == "*" ? [str.substring(1, str.length), true] : [str, false];
};

export const generateTriviality = () => {
  let degr = extractVariantInfo(getRandom(data["degraders"]));
  let method = produceVariant(getRandom(data["methods"]), degr[1]);
  let adj1 = extractVariantInfo(getRandom(data["adjectives"]));
  let adj2 = extractVariantInfo(getRandom(data["adjectives"]));
  let cont = getRandom(data["containments"]);
  let noun1 = produceVariant(getRandom(data["nounsSetlike"]), false);
  let noun2 = produceVariant(getRandom(data["nounsSetlike"], data["nounsOther"]), true);
  let use = getRandom(data["uses"]);
  let thm = extractVariantInfo(getRandom(data["theorems"]));

  return {
    degr: degr[0],
    method,
    adj1: adj1[0],
    adj1Vowel: adj1[1],
    cont,
    noun1,
    adj2: adj2[0],
    noun2,
    use,
    thm: thm[0],
    thmNoThe: thm[1],
  };
};
