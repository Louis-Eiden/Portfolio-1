/* --------------- Grab elements from DOM --------------- */

const header = document.querySelector("header");
const navbar = document.querySelector(".navbar");

const first_skill = document.querySelector(".skill:first-child");
const sk_counter = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

/* --------------- Event Listeners --------------- */

window.addEventListener("scroll", () => {
  if (!skillsPlayed) skillsCounter();
  if (!mlPlayed) mlCounter();
});

/* --------------- Utils --------------- */

// Check if element has reached the bottom of the viewport
function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;

  if (window.innerHeight >= topPosition + el.offsetHeight) return true;
  return false;
}

// Update the counter by 1 until it reaches the target number
function updateCount(num, maxNum) {
  let currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

/* --------------- Sticky Navbar --------------- */

function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* --------------- Reveal Animation --------------- */

let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/* --------------- Skills Progress Bar Animation --------------- */

let skillsPlayed = false;

// Animate the progress bar
function skillsCounter() {
  if (!hasReached(first_skill)) return;

  skillsPlayed = true;

  sk_counter.forEach((c, i) => {
    let target = +c.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCount(c, target);
    }, 400);
  });

  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}

/* --------------- Services Counter Animation --------------- */

let mlPlayed = false;

function mlCounter() {
  if (!hasReached(ml_section)) return;
  mlPlayed = true;
  ml_counters.forEach((c) => {
    let target = +c.dataset.target;

    setTimeout(() => {
      updateCount(c, target);
    }, 400);
  });
}

/* --------------- Portfolio Filter Animation --------------- */

let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

/* --------------- Modal Pop Up Animation Animation --------------- */

let currentIndex = 0;
let currentPort = "";
let portImages = [];

// open modal
zoom_icons.forEach((icon, i) =>
  icon.addEventListener("click", () => {
    const prt_card = icon.parentElement.parentElement.parentElement;

    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");

    currentPort = prt_card.classList[2];
    changeImage(currentPort, currentIndex);
  })
);

// close modal
modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
  currentIndex = 0;
});

// prev image
prev_btn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = portImages.length - 1;
  } else {
    currentIndex--;
  }
  console.log("currentIndex:", currentIndex);
  console.log("portImages", portImages.length);
  changeImage(currentPort, currentIndex);
});

// next image
next_btn.addEventListener("click", () => {
  if (currentIndex === portImages.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  console.log("currentIndex:", currentIndex);
  console.log("portImages", portImages.length);
  changeImage(currentPort, currentIndex);
});

// change image
function changeImage(port, index) {
  images.forEach((img) => img.classList.remove("showImage"));
  portImages = document.querySelectorAll(`.${port}-img`);
  portImages[index].classList.add("showImage");
}

/* --------------- Swiper --------------- */

const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 500,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* --------------- Change Active Link On Scroll --------------- */

/* --------------- Change Page Theme --------------- */

/* --------------- Open & Close Navbar Menu --------------- */
