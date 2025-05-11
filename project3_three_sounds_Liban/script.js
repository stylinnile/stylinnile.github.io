// script.js
document.addEventListener("DOMContentLoaded", () => {
  const video           = document.getElementById("player");
  const toggle          = document.getElementById("playToggle");
  const buttonContainer = document.querySelector(".button-container");
  const buttons = {
    elliot: document.getElementById("btn-elliot"),
    glen:   document.getElementById("btn-glen"),
    leo:    document.getElementById("btn-leo"),
    sister: document.getElementById("btn-sister"),
  };

  // ─── Play / Pause Toggle ─────────────────────────────────────────────
  toggle.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      toggle.textContent = "⏸️";
      toggle.setAttribute("aria-label", "Pause");
    } else {
      video.pause();
      toggle.textContent = "▶️";
      toggle.setAttribute("aria-label", "Play");
    }
  });

  // Fade-out the toggle after idle when playing
  let idleTimeout;
  video.addEventListener("play", () => {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      toggle.style.opacity = 0;
    }, 2000);
  });
  video.addEventListener("pause", () => {
    clearTimeout(idleTimeout);
    toggle.style.opacity = 1;
  });
  video.addEventListener("mousemove", () => {
    clearTimeout(idleTimeout);
    toggle.style.opacity = 1;
    if (!video.paused) {
      idleTimeout = setTimeout(() => {
        toggle.style.opacity = 0;
      }, 2000);
    }
  });
  // Ensure toggle reappears at end of any video
  video.addEventListener("ended", () => {
    toggle.textContent = "▶️";
    toggle.style.opacity = 1;
  });

  // ─── Intro End → Reveal Choices ──────────────────────────────────────
  video.addEventListener("ended", () => {
    if (video.currentSrc.includes("videos/intro.mp4")) {
      buttonContainer.classList.remove("hidden");
    }
  });

  // ─── Play Outro + Redirect ───────────────────────────────────────────
  function playOutro(key) {
  const paths = {
    elliot: "videos/elliot_outro.mp4",
    glen:   "videos/glen_outro.mp4",
    leo:    "videos/leo_outro.mp4",
    sister: "videos/sister_outro.mp4",
  };

  // hide the choice buttons
  buttonContainer.classList.add("hidden");

  // load the new source
  video.querySelector("source").src = paths[key];
  video.load();

  // play and immediately update our custom toggle
  video.play().then(() => {
    toggle.textContent = "⏸️";
    toggle.setAttribute("aria-label", "Pause");
  });

  // after it ends, redirect …
  video.addEventListener("ended", () => {
    setTimeout(() => {
      window.location.href = "credits.html";
    }, 2000);
  }, { once: true });
}

  // ─── Wire Up Choice Buttons ──────────────────────────────────────────
  buttons.elliot.addEventListener("click", () => playOutro("elliot"));
  buttons.glen  .addEventListener("click", () => playOutro("glen"));
  buttons.leo   .addEventListener("click", () => playOutro("leo"));
  buttons.sister.addEventListener("click", () => playOutro("sister"));
});
