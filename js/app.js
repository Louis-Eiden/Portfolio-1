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

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

/* --------------- Event Listeners --------------- */

window.addEventListener("scroll", () => {
  activeLink();
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

/* --------------- Details Filter Animation --------------- */
let detailsMixer = mixitup(".details", {
  selectors: {
    target: ".details-grid, .swiper-wrapper",
    control: ".details-filter",
  },
  load: {
    filter: ".details-grid:first-child, .swiper-wrapper:first-child",
  },
  animation: {
    enable: false,
  },
});

/* --------------- Portfolio Filter Animation --------------- */

let portfolioMixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
    control: ".portfolio-filter",
  },
  animation: {
    duration: 500,
  },
});

/* --------------- Modal Slideshow Animation --------------- */

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
  changeImage(currentPort, currentIndex);
});

// next image
next_btn.addEventListener("click", () => {
  if (currentIndex === portImages.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentPort, currentIndex);
});

// change image
function changeImage(port, index) {
  images.forEach((img) => img.classList.remove("showImage"));
  portImages = document.querySelectorAll(`.${port}-img`);
  portImages[index].classList.add("showImage");
}

/* --------------- Details Swiper --------------- */
const detailsSwiper = new Swiper(".details-swiper", {
  loop: false,
  autoplay: false,
  on: {
    init: function () {
      const detailsCards = document.querySelectorAll(".details-card");
      detailsCards.forEach(function (card) {
        card.addEventListener("click", function () {
          let slideIndex = parseInt(card.dataset.slideIndex);
          detailsSwiper.slideTo(slideIndex);
        });
      });
    },
  },
});

/* --------------- Testimonials Swiper --------------- */
const testimonialsSwiper = new Swiper(".testimonials-swiper", {
  loop: true,
  speed: 500,
  autoplay: true,
  pagination: {
    el: ".testimonials-pagination",
    clickable: true,
  },
});

/* --------------- Change Active Link On Scroll --------------- */

function activeLink() {
  // get all sections with a id
  let sections = document.querySelectorAll("section[id]");
  // create an array from the sections nodeList
  let passedSection = Array.from(sections)
    .map((sct, i) => {
      // return an object with the id and the distance from the bottom of the header
      return {
        y: sct.getBoundingClientRect().top - header.offsetHeight,
        id: i,
      };
    })
    .filter((sct) => sct.y <= 0); // filter out the sections that are above the header

  let currSectionID = passedSection.at(-1).id; // get the last section in the array

  links.forEach((l) => l.classList.remove("active")); // remove active class from all links
  links[currSectionID].classList.add("active"); // add active class to the current link
}

activeLink();

/* --------------- Change Page Theme --------------- */

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    toggle_btn.classList.replace("uil-moon", "uil-sun");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sun", "uil-moon");
    localStorage.setItem("dark", 0);
  }
}

toggle_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
});

/* --------------- Open & Close Navbar Menu --------------- */

hamburger.addEventListener("click", () => {
  document.body.classList.toggle("open");
  document.body.classList.toggle("stopScrolling");
});

links.forEach((link) =>
  link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
  })
);
