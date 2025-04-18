import { generateTriviality } from "./utils";

const renderNewTriviality = () => {
  let t = generateTriviality();
  document.getElementById("intro").innerText = `Proof is trivial! ${t.degr} ${t.method} ${t.adj1Vowel ? "an" : "a"}`;
  document.getElementById("hint").innerText = `(Hint: ${t.use} ${t.thmNoThe ? "" : "the "}${t.thm})`;
  for (let field of ["adj1", "adj2", "cont", "noun1", "noun2"]) {
    document.getElementById(field).innerText = t[field];
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
