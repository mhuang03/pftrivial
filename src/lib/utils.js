import { data } from "./data";
import { intToB64, b64ToInt } from "./b64";

const addRandomDigit = (str, digs) => {
  return str.replaceAll("#", () => {
    let d = Math.floor(Math.random() * 9) + 1;
    digs.push(d);
    return d;
  });
};

const addNextDigit = (str, digs) => {
  return str.replaceAll("#", () => {
    if (digs.length == 0) return "#";
    let d = digs.shift();
    return d;
  });
};

const produceVariant = (str, isVariant) => {
  return isVariant
    ? str.replaceAll(/\((.*)\)/g, "$1").replaceAll(/\[(.*)\]/g, "")
    : str.replaceAll(/\((.*)\)/g, "").replaceAll(/\[(.*)\]/g, "$1");
};

const extractVariantInfo = (str) => {
  return str.charAt(0) == "*" ? [str.substring(1, str.length), true] : [str, false];
};

const generateRandomIndices = () => {
  let noun2List = 0;
  let noun2 = Math.floor(Math.random() * (data["nounsSetlike"].length + data["nounsOther"].length));
  if (noun2 >= data["nounsSetlike"].length) {
    noun2List = 1;
    noun2 -= data["nounsSetlike"].length;
  }

  return {
    degr: Math.floor(Math.random() * data["degraders"].length),
    method: Math.floor(Math.random() * data["methods"].length),
    adj1: Math.floor(Math.random() * data["adjectives"].length),
    adj2: Math.floor(Math.random() * data["adjectives"].length),
    cont: Math.floor(Math.random() * data["containments"].length),
    noun1: Math.floor(Math.random() * data["nounsSetlike"].length),
    noun2,
    noun2List,
    use: Math.floor(Math.random() * data["uses"].length),
    thm: Math.floor(Math.random() * data["theorems"].length),
  };
};

/*
  b64 encoding:
    [degr, method, cont, use] each 1 char (4 total)
    [thm, adj1, adj2, noun1, noun2] each 2 chars (10 total)
    [digs, noun2List] 3 chars
      where up to 5 digs are concatenated with noun2List (0 = nounsSetlike, 1 = nounsOther)
*/
const encodeSlug = (idx, digs) => {
  let slug = "";
  for (let field of ["degr", "method", "cont", "use"]) {
    slug += intToB64(idx[field], 1);
  }
  for (let field of ["thm", "adj1", "adj2", "noun1", "noun2"]) {
    slug += intToB64(idx[field], 2);
  }
  let misc = digs.join("") + idx.noun2List.toString();
  slug += intToB64(parseInt(misc, 10), 3);
  return slug;
};

const decodeSlug = (slug) => {
  let misc = slug.substring(14, slug.length);
  let miscInt = b64ToInt(misc);
  let miscStr = miscInt.toString();

  let noun2List = miscInt & 1;
  let digs = miscStr
    .substring(0, miscStr.length - 1)
    .split("")
    .map((d) => parseInt(d, 10));

  let idx = {
    degr: b64ToInt(slug.substring(0, 1)),
    method: b64ToInt(slug.substring(1, 2)),
    cont: b64ToInt(slug.substring(2, 3)),
    use: b64ToInt(slug.substring(3, 4)),
    thm: b64ToInt(slug.substring(4, 6)),
    adj1: b64ToInt(slug.substring(6, 8)),
    adj2: b64ToInt(slug.substring(8, 10)),
    noun1: b64ToInt(slug.substring(10, 12)),
    noun2: b64ToInt(slug.substring(12, 14)),
    noun2List,
  };

  return [idx, digs];
};

export const generateTriviality = (slug) => {
  let idx, digs;
  let handleAddDigit = addRandomDigit;

  if (slug) {
    [idx, digs] = decodeSlug(slug);
    handleAddDigit = addNextDigit;
  } else {
    idx = generateRandomIndices();
    digs = [];
  }

  let degr = extractVariantInfo(data["degraders"][idx.degr]);
  let method = produceVariant(data["methods"][idx.method], degr[1]);
  let adj1 = extractVariantInfo(handleAddDigit(data["adjectives"][idx.adj1], digs));
  let adj2 = extractVariantInfo(handleAddDigit(data["adjectives"][idx.adj2], digs));
  let cont = data["containments"][idx.cont];
  let noun1 = produceVariant(handleAddDigit(data["nounsSetlike"][idx.noun1], digs), false);
  let noun2List = idx.noun2List == 0 ? data["nounsSetlike"] : data["nounsOther"];
  let noun2 = produceVariant(handleAddDigit(noun2List[idx.noun2], digs), true);
  let use = data["uses"][idx.use];
  let thm = extractVariantInfo(data["theorems"][idx.thm]);

  if (!slug) slug = encodeSlug(idx, digs);

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
    slug,
  };
};
