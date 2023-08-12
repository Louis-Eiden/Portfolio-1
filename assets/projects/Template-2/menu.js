document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const hamburgerIcon = document.getElementById("hamburger-icon");

  // Toggle animation on click
  hamburgerIcon.onclick = () => {
    if (nav.classList[1] === undefined || nav.classList[1] === "slideIn") {
      nav.classList.remove("slideIn");
      nav.classList.add("slideOut");
      hamburgerIcon.classList.remove("close");
      hamburgerIcon.classList.add("open");
    } else {
      nav.classList.remove("slideOut");
      nav.classList.add("slideIn");
      hamburgerIcon.classList.remove("open");
      hamburgerIcon.classList.add("close");
    }
  };
});
