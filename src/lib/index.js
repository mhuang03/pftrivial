import { generateTriviality } from "./utils";

const renderNewTriviality = (t) => {
  if (!t) t = generateTriviality();

  document.getElementById("intro").innerText = `Proof is trivial! ${t.degr} ${t.method} ${t.adj1Vowel ? "an" : "a"}`;
  document.getElementById("hint").innerText = `${t.use} ${t.thmNoThe ? "" : "the "}`;
  for (let field of ["adj1", "adj2", "cont", "noun1", "noun2", "thm"]) {
    let elem = document.getElementById(field);
    elem.innerText = t[field];
    elem.href = `https://mathworld.wolfram.com/search/?query=${encodeURIComponent(t[field])}`;
    elem.title = `Search for \"${t[field]}\" on Wolfram MathWorld`;
  }

  // escape all fields of t in case they contain special characters
  for (let field of Object.keys(t)) {
    t[field] = encodeURIComponent(t[field]);
  }

  let b64 = btoa(JSON.stringify(t));
  let url = new URL(window.location.href);
  url.searchParams.set("t", b64);
  document.getElementById("share").setAttribute("data-url", url.toString());
};

window.addEventListener("DOMContentLoaded", () => {
  // try parsing query param t
  let url = new URL(window.location.href);
  let b64 = url.searchParams.get("t");
  let t = null;
  if (b64) {
    try {
      t = JSON.parse(atob(b64));
      // unescape all fields of t
      for (let field of Object.keys(t)) {
        t[field] = decodeURIComponent(t[field]);
      }
    } catch (e) {
      // remove invalid t param from url
      url.searchParams.delete("t");
      history.replaceState(null, "", url.toString());
    }
  } else {
    t = generateTriviality();
  }
  renderNewTriviality(t);

  const reloadButton = document.getElementById("reload");
  reloadButton.addEventListener("click", (e) => {
    e.preventDefault();
    renderNewTriviality();
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

  const shareButton = document.getElementById("share");
  shareButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: "Proof is Trivial!",
        text: "Check out this proof!",
        url: shareButton.getAttribute("data-url"),
      });
    } else {
      navigator.clipboard.writeText(shareButton.getAttribute("data-url")).then(() => {
        // show copied message tooltip
        let tooltip = document.getElementById("copysuccess");
        tooltip.classList.add("show");
        setTimeout(() => {
          tooltip.classList.remove("show");
        }, 2000);
      });
    }
  });
});
