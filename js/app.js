/* --------------- Grab elements from DOM --------------- */

const header = document.querySelector("header");
const navbar = document.querySelector(".navbar");

const container = document.querySelector(".about .container");
const content = container.children[0];
const topIcon = document.querySelector(".top-icon");
const bottomIcon = document.querySelector(".bottom-icon");

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
  aboutArrows();
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

/* --------------- About Section --------------- */

function aboutArrows() {
  // get the about section offset top
  const aboutOffsetTop = document.querySelector(".about").offsetTop;
  console.log("aboutOffsetTop", aboutOffsetTop);
  // check if the user has scrolled to the about section
  const scrollTop = document.documentElement.scrollTop;
  console.log("scrollTop", scrollTop);
  if (scrollTop >= aboutOffsetTop) {
    topIcon.style.display = "block";
  } else {
    topIcon.style.display = "none";
  }
  // check if the user has scrolled past the about section
  const aboutHeight = document.querySelector(".about").offsetHeight;
  console.log("aboutHeight", aboutHeight);
  if (scrollTop >= aboutOffsetTop + aboutHeight) {
    bottomIcon.style.display = "block";
  } else {
    bottomIcon.style.display = "none";
  }
}

container.addEventListener("scroll", function () {
  const scrollTop = container.scrollTop;
  const containerHeight = container.offsetHeight;
  const contentHeight = content.offsetHeight;

  if (scrollTop <= 250) {
    topIcon.style.display = "block";
  } else {
    topIcon.style.display = "none";
  }

  if (scrollTop >= contentHeight - 250) {
    bottomIcon.style.display = "block";
  } else {
    bottomIcon.style.display = "none";
  }
});

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

/* --------------- Timeline Scroll --------------- */

const timespans = document.querySelectorAll(".timespan");
const scrollContainer = document.querySelector(".about .container");
let scrolling = false;

// Function to check if an element is in the middle of the viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const middleViewport = viewportHeight / 2;

  return rect.top <= middleViewport && rect.bottom >= middleViewport;
}

// Function to remove the active class from all timespan elements
function removeActiveClass() {
  timespans.forEach((timespan) => {
    console.log("remove active class");
    timespan.classList.remove("active");
  });
}

// Function to set the active class to the timespan element in the middle of the viewport
function setActiveClass() {
  removeActiveClass();

  timespans.forEach((timespan) => {
    if (isElementInViewport(timespan)) {
      timespan.classList.add("active");
      const slideIndex = parseInt(timespan.dataset.slideIndex);
      timelineSwiper.slideTo(slideIndex);
    }
  });
}

// Function to scroll to a timespan element
function scrollToTimespan(timespan) {
  scrolling = true;
  timespan.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

// Call the setActiveClass function initially on window load and on scroll
// window.addEventListener("load", setActiveClass);

scrollContainer.addEventListener("scroll", scrollHandler);
scrollContainer.addEventListener("scrollend", () => {
  debounce(scrollEndHandler, 100);
});

function scrollEndHandler() {
  scrolling = false;
}

function scrollHandler() {
  if (!scrolling) {
    window.requestAnimationFrame(function () {
      setActiveClass();
    });
  }
}

function debounce(method, delay) {
  clearTimeout(method._tId);
  method._tId = setTimeout(function () {
    method();
  }, delay);
}

/* --------------- Timeline Swiper --------------- */

const timelineSwiper = new Swiper(".timeline-swiper", {
  loop: false,
  autoplay: false,
  on: {
    // init: function () {
    //   const timeline = document.querySelectorAll(".timespan");
    //   timeline.forEach(function (timespan) {
    //     timespan.addEventListener("click", function () {
    //       // Remove active class from all timespans
    //       timeline.forEach(function (item) {
    //         item.classList.remove("active");
    //       });

    //       // Add active class to the clicked timespan
    //       timespan.classList.add("active");

    //       // Scroll to the clicked timespan
    //       scrollToTimespan(timespan);

    //       // Slide to the corresponding slide
    //       let slideIndex = parseInt(timespan.dataset.slideIndex);
    //       timelineSwiper.slideTo(slideIndex);
    //     });
    //   });
    // },
    slideChange: function () {
      const timeline = document.querySelectorAll(".timespan");
      const activeSlideIndex = timelineSwiper.activeIndex;

      // Remove active class from all timespans
      timeline.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add active class to the corresponding timespan of the active slide
      timeline[activeSlideIndex].classList.add("active");

      // Scroll to the corresponding timespan
      const activeTimespan = timeline[activeSlideIndex];
      scrollToTimespan(activeTimespan);
    },
  },
});

/* --------------- Details Swiper --------------- */
const detailsSwiper = new Swiper(".details-swiper", {
  loop: false,
  autoplay: false,
  pagination: {
    el: ".details-pagination",
    clickable: true,
  },
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
    slideChange: function () {
      const detailsCards = document.querySelectorAll(".details-card");
      const activeSlideIndex = detailsSwiper.activeIndex;

      // Remove active class from all timespans
      detailsCards.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add active class to the corresponding timespan of the active slide
      detailsCards[activeSlideIndex].classList.add("active");
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
