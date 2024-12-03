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

const extractVowelInfo = (str) => {
  return str.charAt(0) == "*" ? [str.substring(1, str.length), true] : [str, false];
};

const generateTriviality = () => {
  let adj1 = extractVowelInfo(selectRandom(data["adjectives"]));
  let adj2 = extractVowelInfo(selectRandom(data["adjectives"]));
  let noun1 = produceVariant(selectRandom(data["nounsSetlike"]), false);
  let noun2 = produceVariant(selectRandom(data["nounsAll"]), true);
  let intro = produceVariant(selectRandom(data["intros"]), adj1[1]);

  return { intro, adj1: adj1[0], adj2: adj2[0], noun1, noun2 };
};

const renderNewTriviality = () => {
  let t = generateTriviality();
  document.getElementById("intro").innerText = `Proof is trivial! ${t.intro}`;
  for (let field of ["adj1", "adj2", "noun1", "noun2"]) {
    document.getElementById(field).innerText = t[field];
  }
};

window.addEventListener("DOMContentLoaded", renderNewTriviality);
document.getElementById("reload").addEventListener("click", (e) => {
  renderNewTriviality();
  e.blur();
});
