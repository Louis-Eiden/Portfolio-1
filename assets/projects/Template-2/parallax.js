document.addEventListener("DOMContentLoaded", function () {
  const parallax_el = document.querySelectorAll(".parallax");
  const main = document.querySelector("main");

  let xValue = 0,
    yValue = 0;
 
  let rotateDeg = 0;

  let timeline;

  function update(cursorPosition) {
    parallax_el.forEach((el) => {
      let speedx = el.dataset.speedx;
      let speedy = el.dataset.speedy;
      let speedz = el.dataset.speedz;
      let rotatey = el.dataset.rotatey;

      let isInLeft =
        parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

      let zValue =
        (cursorPosition - parseFloat(getComputedStyle(el).left)) *
        isInLeft *
        0.1;

      el.style.transform = `
      rotateY(${rotateDeg * rotatey}deg)
      perspective(2300px) 
      translateX(calc(-50% + ${-xValue * speedx}px)) 
      translateY(calc(-50% + ${yValue * speedy}px)) 
      translateZ(${zValue * speedz}px)`;
    });
  }

  update(0);

  window.addEventListener("mousemove", (e) => {

    if (timeline.isActive()) return;

    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDeg = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX);
  });

  
  if (window.innerWidth >= 725) {
    main.style.maxHeight = `${window.innerWidth * 0.6}px`;
  } else {
    main.style.maxHeight = `${window.innerWidth * 1.6}px`;
  }

  /* GSAP Animation */

  function playAnimation(animationType) {
    
    timeline = gsap.timeline();

    /* Background and Flowers */
    Array.from(parallax_el)
    .filter(el => !el.classList.contains('text'))
    .forEach((el) => {
      timeline.from(
        el,
        {
          y: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
          duration: 2.5,
          ease: "power3.out",
        }, "1"  );
    });

    // desktop-specific animation
    if (animationType === "desktop") {

      /* Text */
      timeline.from(".text h1", {
        y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 300,
        duration: 2,
      }, "2.5")
      .from(".text h2", {
          opacity: 0,
          y: -150,
          duration: 1.5,
        }, "3")

        /* Navbar */
      .from(".hide", {
          opacity: 0,
          duration: 1.5,
        }, "3");

    // mobile-specific animation
    } else if (animationType === "mobile") {

      /* Text */
      timeline.from(".text h1", {
        y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 100,
        duration: 2,
      }, "0.5")
      .from(".text h2", {
          opacity: 0,
          y: -50,
          duration: 1.5,
        }, "0.75")

        /* Navbar */
      .from(".hide", {
          opacity: 0,
          duration: 1.5,
        }, "0.75");
    }
  }


    // Detect device type and play corresponding animation
    function detectAndPlay() {
      if (window.matchMedia("(max-width: 768px)").matches) {
        // Mobile device
        playAnimation("mobile");
      } else {
        // Desktop and tablet devices
        playAnimation("desktop");
      }
    }

    detectAndPlay();
});


