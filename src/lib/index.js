import { generateTriviality } from "./utils";

const renderNewTriviality = () => {
  let t = generateTriviality();
  document.getElementById("intro").innerText = `Proof is trivial! ${t.degr} ${t.method} ${t.adj1Vowel ? "an" : "a"}`;
  document.getElementById("hint").innerText = `${t.use} ${t.thmNoThe ? "" : "the "}`;
  for (let field of ["adj1", "adj2", "cont", "noun1", "noun2", "thm"]) {
    let elem = document.getElementById(field);
    elem.innerText = t[field];
    elem.href = `https://mathworld.wolfram.com/search/?query=${encodeURIComponent(t[field])}`;
    elem.title = `Search for \"${t[field]}\" on Wolfram MathWorld`;
  }
};

window.addEventListener("DOMContentLoaded", () => {
  renderNewTriviality();

  const reloadButton = document.getElementById("reload");
  reloadButton.addEventListener("click", (e) => {
    e.preventDefault();
    renderNewTriviality();
    // reloadButton.blur();
  });

  reloadButton.addEventListener("mousedown", (e) => {
    e.preventDefault();
    let tim = setTimeout(() => {
      let int = setInterval(renderNewTriviality, 100);
      document.addEventListener("mouseup", (e2) => {
        e2.preventDefault();
        clearInterval(int);
      });
    }, 500);
    document.addEventListener("mouseup", (e3) => {
      e3.preventDefault();
      clearTimeout(tim);
    });
  });
});
