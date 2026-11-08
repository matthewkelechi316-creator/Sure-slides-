const params = new URLSearchParams(location.search);
const mode = params.get("mode") === "alpha" ? "alpha" : "full";

const stage = document.getElementById("stage");
stage.className = mode;

function render(s) {
  if (!s) return;

  document.getElementById("slideTitle").textContent = s.title || "";
  document.getElementById("slideBody").textContent = s.body || "";

  stage.style.color = s.theme === "light" ? "#252525" : "#fff";

  if (mode === "full") {
    stage.style.background =
      s.theme === "midnight"
        ? "linear-gradient(135deg,#101a31,#253c5a)"
        : s.theme === "light"
        ? "linear-gradient(135deg,#eee9dd,#c9c0ad)"
        : "radial-gradient(ellipse at 50% 38%,#514635 0,#25211d 43%,#101318 100%)";
  }
}

if (window.sureSlides) {
  window.sureSlides.onSlide(render);
}
