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
  let thm = selectRandom(data["theorems"]);

  return { degr: degr[0], method, adj1: adj1[0], adj1Vowel: adj1[1], cont, noun1, adj2: adj2[0], noun2, use, thm };
};

const renderNewTriviality = () => {
  let t = generateTriviality();
  document.getElementById("intro").innerText = `Proof is trivial! ${t.degr} ${t.method} ${t.adj1Vowel ? "an" : "a"}`;
  document.getElementById("hint").innerText = `(Hint: ${t.use} the ${t.thm})`;
  for (let field of ["adj1", "adj2", "cont", "noun1", "noun2"]) {
    document.getElementById(field).innerText = t[field];
  }
};

window.addEventListener("DOMContentLoaded", renderNewTriviality);
const reloadButton = document.getElementById("reload");
reloadButton.addEventListener("click", (e) => {
  e.preventDefault();
  renderNewTriviality();
  reloadButton.blur();
});
