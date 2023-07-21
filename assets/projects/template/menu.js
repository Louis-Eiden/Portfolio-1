document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");

  // Stop animation initially
  nav.style.animationPlayState = "paused";
  // Toggle animation on click
  document.querySelector(".hamburger-icon").onclick = () => {
    if (nav.classList[1] === undefined || nav.classList[1] === "slideOut") {
      nav.classList.remove("slideOut");
      nav.classList.add("slideIn");
      nav.style.animationPlayState = "running";
    } else {
      nav.classList.remove("slideIn");
      nav.classList.add("slideOut");
      nav.style.animationPlayState = "running";
    }
  };
});
