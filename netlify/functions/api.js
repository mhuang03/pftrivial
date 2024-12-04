const data = null;
data["nounsAll"] = data["nounsSetlike"].concat(data["nounsOther"]);

const selectRandom = (list) => {
  let i = Math.floor(Math.random() * list.length);
  return list[i];
};

const produceVariant = (str, isVariant) => {
  return isVariant
    ? str.replaceAll(/\((.*)\)/g, "$1").replaceAll(/\[(.*)\]/g, "")
    : str.replaceAll(/\((.*)\)/g, "").replaceAll(/\[(.*)\]/g, "$1");
};

const extractVariantInfo = (str) => {
  return str.charAt(0) == "*" ? [str.substring(1, str.length), true] : [str, false];
};

const generateTriviality = () => {
  let degr = extractVariantInfo(selectRandom(data["degraders"]));
  let method = produceVariant(selectRandom(data["methods"]), degr[1]);
  let adj1 = extractVariantInfo(selectRandom(data["adjectives"]));
  let adj2 = extractVariantInfo(selectRandom(data["adjectives"]));
  let cont = selectRandom(data["containments"]);
  let noun1 = produceVariant(selectRandom(data["nounsSetlike"]), false);
  let noun2 = produceVariant(selectRandom(data["nounsAll"]), true);
  let use = selectRandom(data["uses"]);
  let thm = extractVariantInfo(selectRandom(data["theorems"]));

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

export default async (req, context) => {
  let t = generateTriviality();
  return new Response(JSON.stringify(t, null, 0), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const config = {
  path: "/api",
};
