/* --------------- Grab elements from DOM --------------- */

/* Navbar */
const header = document.querySelector("header");
const navbar = document.querySelector(".navbar");
const links = document.querySelectorAll(".nav-link");

const theme_btn = document.querySelector(".theme");
const language_btn = document.querySelector(".language");
const english = document.querySelectorAll(".EN");
const german = document.querySelectorAll(".DE");

const hamburger = document.querySelector(".hamburger");

/* About Section */
const container = document.querySelector(".about .container");
const content = container.children[0];
const topIcon = document.querySelector(".top-icon");
const bottomIcon = document.querySelector(".bottom-icon");
const tinyhouseIcon = document.querySelectorAll(".tinyhouse-icon");
const tinyhouseImages = document.querySelectorAll(".tinyhouse-img");

/* Skill Section */
const first_skill = document.querySelector(".skill:first-child");
const sk_counter = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

/* Services Section */
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

/* Portfolio Section */
const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

/* --------------- Event Listeners --------------- */

window.addEventListener("scroll", () => {
  activeLink();
  activeAbout();
  aboutArrows();
  if (!skillsPlayed) skillsCounter();
  if (!mlPlayed) mlCounter();
});

/* --------------- Sticky Navbar --------------- */

function stickyNavbar() {
  header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* --------------- Showcase Section Reveal Animation --------------- */

let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/* --------------- About Section --------------- */

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

// set overflow to scroll when the user has scrolled to the about section
function activeAbout() {
  // get the about section offset top
  const aboutOffsetTop = document.querySelector(".about").offsetTop;
  // check if the user has scrolled to the about section
  const scrollTop = document.documentElement.scrollTop;
  if (scrollTop >= aboutOffsetTop) {
    container.style.overflowY = "scroll";
  } else {
    container.style.overflowY = "hidden";
  }
  // check if the user has scrolled past the about section
  const aboutHeight = document.querySelector(".about").offsetHeight;
  if (scrollTop >= aboutOffsetTop + aboutHeight / 2) {
    container.style.overflowY = "hidden";
  }
}

activeAbout();

// show the arrows when the user has scrolled to the about section
function aboutArrows() {
  // get the about section offset top
  const aboutOffsetTop = document.querySelector(".about").offsetTop;
  // check if the user has scrolled to the about section
  const scrollTop = document.documentElement.scrollTop;
  if (scrollTop >= aboutOffsetTop) {
    topIcon.style.display = "block";
  } else {
    topIcon.style.display = "none";
  }
  // check if the user has scrolled past the about section
  const aboutHeight = document.querySelector(".about").offsetHeight;
  if (scrollTop >= aboutOffsetTop + aboutHeight) {
    bottomIcon.style.display = "block";
  } else {
    bottomIcon.style.display = "none";
  }
}

aboutArrows();

/* --------------- Skills Progress Bar Animation --------------- */

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
    target: ".details-grid, .swiper",
    control: ".details-filter",
  },
  load: {
    filter: ".details-grid:first-child, .frontend",
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
  load: {
    filter: ".fav",
  },
  animation: {
    duration: 500,
  },
});

/* --------------- Portfolio Modal Slideshow Animation --------------- */

let currentIndex = 0;
let currentPort = "";
let portImages = [];

// open modal for Tinyhouse project
tinyhouseIcon.forEach((icon, i) =>
icon.addEventListener("click", () => {
  console.log("clicked");
  prt_section.classList.add("open");
  document.body.classList.add("stopScrolling");
  currentPort = "tinyhouse";
  console.log(currentPort);

  changeImage(currentPort, currentIndex);
})
);

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

/* --------------- Frontend Swiper --------------- */
const frontendSwiper = new Swiper(".frontend-swiper", {
  loop: false,
  autoplay: false,
  spaceBetween: 60, // space between slides in px
  pagination: {
    el: ".frontend-pagination",
    clickable: true,
  },
  on: {
    init: function () {
      const frontendCards = document.querySelectorAll(
        ".frontend .details-card"
      );
      console.log(frontendCards);
      frontendCards.forEach(function (card) {
        card.addEventListener("click", function () {
          console.log("clicked");
          console.log(card);
          let slideIndex = parseInt(card.dataset.slideIndex);
          frontendSwiper.slideTo(slideIndex);
        });
      });
    },
    slideChange: function () {
      const frontendCards = document.querySelectorAll(
        ".frontend .details-card"
      );
      const activeSlideIndex = frontendSwiper.activeIndex;

      // Remove active class from all timespans
      frontendCards.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add active class to the corresponding timespan of the active slide
      frontendCards[activeSlideIndex].classList.add("active");
    },
  },
});

/* --------------- Backend Swiper --------------- */
const backendSwiper = new Swiper(".backend-swiper", {
  loop: false,
  autoplay: false,
  spaceBetween: 60, // space between slides in px
  pagination: {
    el: ".backend-pagination",
    clickable: true,
  },
  on: {
    init: function () {
      const backendCards = document.querySelectorAll(".backend .details-card");
      console.log(backendCards);
      backendCards.forEach(function (card) {
        card.addEventListener("click", function () {
          console.log("clicked");
          console.log(card);
          let slideIndex = parseInt(card.dataset.slideIndex);
          backendSwiper.slideTo(slideIndex);
        });
      });
    },
    slideChange: function () {
      const backendCards = document.querySelectorAll(".backend .details-card");
      const activeSlideIndex = backendSwiper.activeIndex;

      // Remove active class from all timespans
      backendCards.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add active class to the corresponding timespan of the active slide
      backendCards[activeSlideIndex].classList.add("active");
    },
  },
});

/* --------------- Database Swiper --------------- */
const databaseSwiper = new Swiper(".database-swiper", {
  loop: false,
  autoplay: false,
  spaceBetween: 60, // space between slides in px
  pagination: {
    el: ".database-pagination",
    clickable: true,
  },
  on: {
    init: function () {
      const databaseCards = document.querySelectorAll(
        ".database .details-card"
      );
      console.log(databaseCards);
      databaseCards.forEach(function (card) {
        card.addEventListener("click", function () {
          console.log("clicked");
          console.log(card);
          let slideIndex = parseInt(card.dataset.slideIndex);
          databaseSwiper.slideTo(slideIndex);
        });
      });
    },
    slideChange: function () {
      const databaseCards = document.querySelectorAll(
        ".database .details-card"
      );
      const activeSlideIndex = databaseSwiper.activeIndex;

      // Remove active class from all timespans
      databaseCards.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add active class to the corresponding timespan of the active slide
      databaseCards[activeSlideIndex].classList.add("active");
    },
  },
});

/* --------------- Server Swiper --------------- */
const serverSwiper = new Swiper(".server-swiper", {
  loop: false,
  autoplay: false,
  spaceBetween: 60, // space between slides in px
  pagination: {
    el: ".server-pagination",
    clickable: true,
  },
  on: {
    init: function () {
      const serverCards = document.querySelectorAll(".server .details-card");
      console.log(serverCards);
      serverCards.forEach(function (card) {
        card.addEventListener("click", function () {
          console.log("clicked");
          console.log(card);
          let slideIndex = parseInt(card.dataset.slideIndex);
          serverSwiper.slideTo(slideIndex);
        });
      });
    },
    slideChange: function () {
      const serverCards = document.querySelectorAll(".server .details-card");
      const activeSlideIndex = serverSwiper.activeIndex;

      // Remove active class from all timespans
      serverCards.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add active class to the corresponding timespan of the active slide
      serverCards[activeSlideIndex].classList.add("active");
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
    theme_btn.classList.replace("uil-moon", "uil-sun");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    theme_btn.classList.replace("uil-sun", "uil-moon");
    localStorage.setItem("dark", 0);
  }
}

theme_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
});

/* --------------- Change Page Language --------------- */

let firstLanguage = localStorage.getItem("english");

changeLanguage(+firstLanguage);

function changeLanguage(isEnglish) {
  // Convert NodeList to an array using the spread operator
  const englishElements = [...english];
  const germanElements = [...german];

  if (isEnglish) {
    englishElements.forEach((element) => {
      element.style.display = "block";
    });
    germanElements.forEach((element) => {
      element.style.display = "none";
    });
    language_btn.innerHTML = "DE";
    localStorage.setItem("english", 1);
  } else {
    englishElements.forEach((element) => {
      element.style.display = "none";
    });
    germanElements.forEach((element) => {
      element.style.display = "block";
    });
    language_btn.innerHTML = "EN";
    localStorage.setItem("english", 0);
  }
}

language_btn.addEventListener("click", () => {
  console.log("clicked");
  changeLanguage(english[0].style.display === "none");
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
