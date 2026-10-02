"use strict";

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  const header =
    document.getElementById("header");

  const navMenu =
    document.getElementById("nav-menu");

  const menuToggle =
    document.getElementById("menu-toggle");

  const themeToggle =
    document.getElementById("theme-toggle");

  const typingText =
    document.getElementById("typing-text");

  const backToTop =
    document.getElementById("back-to-top");

  const contactForm =
    document.getElementById("contact-form");

  const formStatus =
    document.getElementById("form-status");

  const cursorGlow =
    document.getElementById("cursor-glow");

  const currentYear =
    document.getElementById("current-year");

  const navLinks =
    document.querySelectorAll(".nav-link");

  const sections =
    document.querySelectorAll("main section[id]");

  const revealItems =
    document.querySelectorAll(".reveal");

  const counters =
    document.querySelectorAll(".counter");

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const projectCards =
    document.querySelectorAll(".project-card");


  /* ==============================
     MOBILE MENU
     ============================== */

  const closeMenu = () => {

    navMenu.classList.remove("open");

    body.classList.remove("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.innerHTML =
      '<i class="fa-solid fa-bars"></i>';
  };


  menuToggle.addEventListener("click", () => {

    const isOpen =
      navMenu.classList.toggle("open");

    body.classList.toggle(
      "menu-open",
      isOpen
    );

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.innerHTML =
      isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

  });


  navLinks.forEach(link => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  /* ==============================
     THEME
     ============================== */

  const themeStorageKey =
    "riasad-portfolio-theme";

  const savedTheme =
    localStorage.getItem(
      themeStorageKey
    );

  const systemPrefersDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;


  if (
    savedTheme === "dark" ||
    (!savedTheme && systemPrefersDark)
  ) {

    body.classList.add(
      "dark-theme"
    );
  }


  const themeIcon =
    themeToggle.querySelector("i");


  const updateThemeIcon = () => {

    const isDark =
      body.classList.contains(
        "dark-theme"
      );

    themeIcon.className =
      isDark
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";

  };


  updateThemeIcon();


  themeToggle.addEventListener(
    "click",
    () => {

      body.classList.toggle(
        "dark-theme"
      );

      const theme =
        body.classList.contains(
          "dark-theme"
        )
          ? "dark"
          : "light";

      localStorage.setItem(
        themeStorageKey,
        theme
      );

      updateThemeIcon();

    }
  );


  /* ==============================
     TYPING TEXT
     ============================== */

  const phrases = [

    "CSE Student",

    "Information Systems Major",

    "IT Intern • Jamuna Bank PLC",

    "Data Analysis Enthusiast",

    "Machine Learning Learner",

    "Web & Database Developer"

  ];


  let phraseIndex = 0;

  let characterIndex = 0;

  let deleting = false;


  const typeText = () => {

    const phrase =
      phrases[phraseIndex];


    if (!deleting) {

      characterIndex++;

      typingText.textContent =
        phrase.substring(
          0,
          characterIndex
        );


      if (
        characterIndex ===
        phrase.length
      ) {

        deleting = true;

        setTimeout(
          typeText,
          1200
        );

        return;
      }

    } else {

      characterIndex--;

      typingText.textContent =
        phrase.substring(
          0,
          characterIndex
        );


      if (
        characterIndex === 0
      ) {

        deleting = false;

        phraseIndex =
          (phraseIndex + 1)
          % phrases.length;

      }

    }


    setTimeout(
      typeText,
      deleting ? 45 : 85
    );

  };


  typeText();


  /* ==============================
     HEADER & ACTIVE NAV
     ============================== */

  const updateScrollState = () => {

    const scrollY =
      window.scrollY;


    header.classList.toggle(
      "scrolled",
      scrollY > 20
    );


    backToTop.classList.toggle(
      "show",
      scrollY > 500
    );


    let currentSection =
      "home";


    sections.forEach(section => {

      const top =
        section.offsetTop - 160;

      const bottom =
        top +
        section.offsetHeight;


      if (
        scrollY >= top &&
        scrollY < bottom
      ) {

        currentSection =
          section.id;
      }

    });


    navLinks.forEach(link => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") ===
          `#${currentSection}`
      );

    });

  };


  window.addEventListener(
    "scroll",
    updateScrollState
  );


  updateScrollState();


  /* ==============================
     BACK TO TOP
     ============================== */

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


  /* ==============================
     REVEAL ANIMATION
     ============================== */

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target.classList.add(
              "show"
            );

          }

        });

      },
      {
        threshold: 0.1
      }
    );


  revealItems.forEach(item => {

    revealObserver.observe(item);

  });


  /* ==============================
     COUNTER
     ============================== */

  counters.forEach(counter => {

    const target =
      Number(
        counter.dataset.target
      );

    let current = 0;

    const increment =
      Math.max(
        target / 40,
        1
      );


    const updateCounter = () => {

      current += increment;


      if (
        current < target
      ) {

        counter.textContent =
          Math.floor(current);

        requestAnimationFrame(
          updateCounter
        );

      } else {

        counter.textContent =
          target;
      }

    };


    updateCounter();

  });


  /* ==============================
     PROGRESS BARS
     ============================== */

  const progressBars =
    document.querySelectorAll(
      ".skill-progress, .progress-track span"
    );


  const progressObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            const width =
              entry.target
                .dataset.width;

            if (width) {

              entry.target.style.width =
                width;

            }

          }

        });

      },
      {
        threshold: 0.2
      }
    );


  progressBars.forEach(bar => {

    progressObserver.observe(bar);

  });


  /* ==============================
     PROJECT FILTER
     ============================== */

  filterButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(btn => {

          btn.classList.remove(
            "active"
          );

        });


        button.classList.add(
          "active"
        );


        const filter =
          button.dataset.filter;


        projectCards.forEach(card => {

          const category =
            card.dataset.category;


          if (
            filter === "all" ||
            category === filter
          ) {

            card.classList.remove(
              "hidden"
            );

          } else {

            card.classList.add(
              "hidden"
            );

          }

        });

      }
    );

  });


  /* ==============================
     CONTACT FORM
     ============================== */

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const name =
          document
            .getElementById("name")
            .value
            .trim();

        const email =
          document
            .getElementById("email")
            .value
            .trim();

        const subject =
          document
            .getElementById("subject")
            .value
            .trim();

        const message =
          document
            .getElementById("message")
            .value
            .trim();


        if (
          !name ||
          !email ||
          !subject ||
          !message
        ) {

          formStatus.textContent =
            "Please fill in all fields.";

          formStatus.className =
            "form-status error";

          return;
        }


        const emailBody =
          `Hello Riasad,

${message}

Sender: ${name}
Email: ${email}`;


        const mailto =
          `mailto:riasadchowdhury30@gmail.com?subject=${encodeURIComponent(
            subject
          )}&body=${encodeURIComponent(
            emailBody
          )}`;


        formStatus.textContent =
          "Opening your email application...";

        formStatus.className =
          "form-status success";


        window.location.href =
          mailto;

      }
    );

  }


  /* ==============================
     CURSOR GLOW
     ============================== */

  if (cursorGlow) {

    document.addEventListener(
      "mousemove",
      event => {

        cursorGlow.style.left =
          event.clientX + "px";

        cursorGlow.style.top =
          event.clientY + "px";

        cursorGlow.style.opacity =
          "1";

      }
    );

  }


  /* ==============================
     FOOTER YEAR
     ============================== */

  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }

});