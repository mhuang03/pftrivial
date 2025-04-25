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

  let url = new URL(window.location.href);
  if (t.slug) {
    url.searchParams.set("s", t.slug);
    url.searchParams.delete("t");
  }
  document.getElementById("share").setAttribute("data-url", url.toString());
  // history.replaceState({}, document.title, url.toString());
};

window.addEventListener("DOMContentLoaded", () => {
  let url = new URL(window.location.href);
  let t;

  if (url.searchParams.has("s")) {
    let slug = url.searchParams.get("s");
    try {
      t = generateTriviality(slug);
    } catch (e) {
      t = generateTriviality();
      // remove invalid slug from url
      url.searchParams.delete("s");
      history.replaceState({}, document.title, url.toString());
    }
  } else if (url.searchParams.has("t")) {
    // backwards compatibility
    try {
      t = JSON.parse(atob(url.searchParams.get("t")));
      for (let field of Object.keys(t)) {
        if (field == "adj1Vowel" || field == "thmNoThe") continue; // boolean fields
        t[field] = decodeURIComponent(t[field]);
      }
    } catch (e) {
      t = generateTriviality();
      // remove invalid slug from url
      url.searchParams.delete("t");
      history.replaceState({}, document.title, url.toString());
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
