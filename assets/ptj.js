/*==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animateElements = document.querySelectorAll('.animate-on-scroll');
animateElements.forEach(el => {
  observer.observe(el);
});

/*==================== TYPING ANIMATION ====================*/
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  element.style.borderRight = '2px solid var(--first-color)';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Blinking cursor effect
      setTimeout(() => {
        element.style.borderRight = 'none';
      }, 1000);
    }
  }
  type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const titleElement = document.querySelector('.home__title');
  if (titleElement) {
    const text = titleElement.textContent;
    titleElement.classList.add('typing-animation');
    setTimeout(() => {
      typeWriter(titleElement, text, 80);
    }, 1000);
  }
});

/*==================== PORTFOLIO IMAGE LOADING ANIMATION ====================*/
function addImageLoadingAnimation() {
  const portfolioImages = document.querySelectorAll('.portfolio__img');
  
  portfolioImages.forEach(img => {
    img.addEventListener('load', function() {
      this.parentElement.classList.remove('loading');
      this.style.opacity = '1';
      this.style.transform = 'scale(1)';
    });
    
    // Initial state
    img.style.opacity = '0';
    img.style.transform = 'scale(0.8)';
    img.style.transition = 'all 0.5s ease';
  });
}

/*==================== ENHANCED SCROLL ANIMATIONS ====================*/
function addScrollAnimations() {
  // Animate qualification timeline items
  const qualificationItems = document.querySelectorAll('.qualification__data');
  
  const qualificationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, index * 200);
      }
    });
  }, { threshold: 0.3 });
  
  qualificationItems.forEach(item => {
    qualificationObserver.observe(item);
  });
}

/*==================== SMOOTH SCROLLING ENHANCEMENT ====================*/
function enhanceSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/*==================== PARTICLE BACKGROUND EFFECT ====================*/
function createParticleEffect() {
  const homeSection = document.querySelector('.home');
  if (!homeSection) return;
  
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particles';
  particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `;
  
  homeSection.style.position = 'relative';
  homeSection.appendChild(particleContainer);
  
  // Create floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--first-color);
      border-radius: 50%;
      opacity: 0.1;
      animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    particleContainer.appendChild(particle);
  }
  
  // Add particle animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.1;
      }
      90% {
        opacity: 0.1;
      }
      100% {
        transform: translateY(-100px) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

/*==================== INITIALIZE ALL ANIMATIONS ====================*/
document.addEventListener('DOMContentLoaded', function() {
  addImageLoadingAnimation();
  addScrollAnimations();
  enhanceSmoothScrolling();
  createParticleEffect();
  
  // Add loading screen fade out
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);
});

/*==================== DYNAMIC THEME TRANSITION ====================*/
function enhanceThemeTransition() {
  const themeButton = document.getElementById('theme-button');
  
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      document.body.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }
}

// Initialize theme enhancements
enhanceThemeTransition();

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*======================= ACCORD SKILLS ======================*/

const skillsContent = document.getElementsByClassName("skills__content"),
  skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
  let itemClass = this.parentNode.className;

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills__content skills__close";
  }
  if (itemClass === "skills__content skills__close") {
    this.parentNode.className = "skills__content skills__open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

/*============== Qualification Skills ===============*/

/*const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')
tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)
        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('qualification__active')
        })
        target.classList.add('qualification__active')
        tab.forEach(tab =>{
            tab.classList.remove('qualification__active')
        })
        tab.classList.add('qualification__active')
    })
})      
*/

/*======================= Services Modal ===================*/
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

/*==================== ENHANCED PORTFOLIO SWIPER ===================*/
var swiper = new Swiper(".portfolio__container", {
  cssMode: true,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 15,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL up ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme,
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme,
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
