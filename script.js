document.addEventListener('DOMContentLoaded', () =>{
  navigationInit()
  activeLinkInit()
  mobileTouchInit()
});

function navigationInit(){
const navbar = document.getElementById("navbar")
const navitem = document.querySelectorAll(".nav-link")
const logotext = document.querySelectorAll(".logo-text")
const bar = document.querySelectorAll(".bar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
let ticking = false

// Enhanced hamburger menu with touch support and accessibility
hamburger.addEventListener("click", () => {
  const isExpanded = navMenu.classList.contains("active");
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
  
  // Update ARIA attributes for accessibility
  hamburger.setAttribute("aria-expanded", !isExpanded);
  
  // Prevent body scroll when menu is open
  if (!isExpanded) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

// Keyboard navigation for hamburger menu
hamburger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    hamburger.click();
  }
});

// Close menu when clicking on nav links (mobile) and keyboard navigation
navitem.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 767) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
  
  // Keyboard navigation for menu items
  link.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      link.click();
    }
  });
});

// Close menu when clicking on mobile contact button
const mobileContactBtn = document.querySelector('.nav-contact-btn');
if (mobileContactBtn) {
  mobileContactBtn.addEventListener("click", () => {
    if (window.innerWidth <= 767) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
  
  // Keyboard navigation for mobile contact button
  mobileContactBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      mobileContactBtn.click();
    }
  });
}

// Close menu when clicking outside (mobile)
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 767) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }
});

// Close menu on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 767) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
});

window.addEventListener("scroll", function() {

  if (this.window.scrollY) {
    navbar.classList.add("scrolled");
    navitem.forEach(item => {item.classList.add("scrolled")});
    logotext.forEach(item => {item.classList.add("scrolled")});
    bar.forEach(item => {item.classList.add("scrolled")});
  } else {
    navbar.classList.remove("scrolled");
    navitem.forEach(item => {item.classList.remove("scrolled")});
    logotext.forEach(item => {item.classList.remove("scrolled")});
    bar.forEach(item => {item.classList.remove("scrolled")});
  }
});
};

function activeLinkInit(){
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  // اسم الصفحة الحالي (مثلاً about.html)
  let currentPage = window.location.pathname.split("/").pop().toLowerCase();

  if (!currentPage || currentPage === "/") {
    currentPage = "index.html"; // لو الرئيسية
  }

  console.log("📌 Current page:", currentPage); // للتشخيص

  // لف على كل اللينكات
  document.querySelectorAll(".nav-link").forEach(link => {
    const linkHref = link.getAttribute("href").toLowerCase();
    console.log("👉 Checking link:", linkHref);

    if (linkHref === currentPage) {
      link.classList.add("active");
      console.log("✅ Active applied on:", linkHref);
    }
  });
};

// ===== MOBILE TOUCH INTERACTIONS =====
/*
 * MOBILE COMPATIBILITY JAVASCRIPT IMPROVEMENTS:
 * 
 * 1. TOUCH DETECTION:
 *    - Detects touch-capable devices using modern APIs
 *    - Adds 'touch-device' class to body for CSS targeting
 * 
 * 2. TOUCH EVENT HANDLERS:
 *    - touchstart: Adds visual feedback during touch
 *    - touchend: Triggers mobile-specific interactions (like overlay reveal)
 *    - touchcancel: Cleans up touch state if interrupted
 * 
 * 3. SCROLL ANIMATIONS:
 *    - Uses Intersection Observer for performance
 *    - Triggers animations when elements enter viewport
 *    - Provides engaging mobile experience without hover
 * 
 * 4. HAMBURGER MENU ENHANCEMENTS:
 *    - Prevents body scroll when menu is open
 *    - Auto-closes on navigation link clicks
 *    - Closes when clicking outside menu
 *    - Responsive to window resize events
 */
function mobileTouchInit() {
  // Detect if device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    // Add touch-friendly classes to body
    document.body.classList.add('touch-device');
    
    // Enhanced touch interactions for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      // Add touch event listeners
      item.addEventListener('touchstart', function(e) {
        this.classList.add('touching');
      }, { passive: true });
      
      item.addEventListener('touchend', function(e) {
        this.classList.remove('touching');
        // Trigger overlay on tap for mobile
        const overlay = this.querySelector('.gallery-overlay');
        if (overlay) {
          overlay.classList.toggle('mobile-active');
        }
      }, { passive: true });
      
      item.addEventListener('touchcancel', function(e) {
        this.classList.remove('touching');
      }, { passive: true });
    });
    
    // Enhanced touch interactions for academic cards
    const academicCards = document.querySelectorAll('.academic-card');
    academicCards.forEach(card => {
      card.addEventListener('touchstart', function(e) {
        this.classList.add('touching');
      }, { passive: true });
      
      card.addEventListener('touchend', function(e) {
        this.classList.remove('touching');
      }, { passive: true });
      
      card.addEventListener('touchcancel', function(e) {
        this.classList.remove('touching');
      }, { passive: true });
    });
    
    // Enhanced touch interactions for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('touchstart', function(e) {
        this.classList.add('touching');
      }, { passive: true });
      
      button.addEventListener('touchend', function(e) {
        this.classList.remove('touching');
      }, { passive: true });
      
      button.addEventListener('touchcancel', function(e) {
        this.classList.remove('touching');
      }, { passive: true });
    });
  }
  
  // Add scroll-based animations for mobile
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll('.gallery-item, .academic-card, .about-text, .stats');
  animateElements.forEach(el => {
    observer.observe(el);
  });
}
// staff page
function handleStaffclick(e){
  const object = e.target.closest(".staff-member")
  const staffitem = e.target.closest('.staff-item')
  staffitem.classList.toggle('active')
  object.classList.toggle('active')
  object.children[1].classList.toggle('active')
}

// academics page
    function toggleAchievement(e) {
  const achievement = e.currentTarget; // the div with class="achievement"
  achievement.classList.toggle("active");
}
function handleexpanded(event){
  const card = event.target.closest('.card')
   card.classList.toggle('expanded');
}
// campus slider
class ImageSlider {
      constructor(sliderElement) {
        this.slider = sliderElement;
        this.slides = this.slider.querySelector('.slides');
        this.totalSlides = this.slides.children.length;
        this.controls = this.slider.querySelector('.controls');
        this.index = 0;
        this.timeoutId = null;

        this.initControls();
        this.startAutoSlide();

        window.addEventListener('resize', () => this.updateSlider());
      }

      getSlideWidth() {
        return this.slides.children[0].clientWidth;
      }

      initControls() {
        for (let i = 0; i < this.totalSlides; i++) {
          const btn = document.createElement('div');
          btn.classList.add('control-btn');
          if (i === 0) btn.classList.add('active');
          btn.addEventListener('click', () => {
            this.index = i;
            this.updateSlider();
            this.resetAutoSlide();
          });
          this.controls.appendChild(btn);
        }
      }

      updateSlider() {
        const slideWidth = this.getSlideWidth();
        this.slides.style.transform = `translateX(-${this.index * slideWidth}px)`;
        this.controls.querySelectorAll('.control-btn').forEach((btn, i) => {
          btn.classList.toggle('active', i === this.index);
        });
      }

      nextSlide() {
        this.index = (this.index + 1) % this.totalSlides;
        this.updateSlider();
      }

      getRandomDelay(min = 3000, max = 4000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      startAutoSlide() {
        const run = () => {
          this.nextSlide();
          this.timeoutId = setTimeout(run, this.getRandomDelay());
        };
        this.timeoutId = setTimeout(run, this.getRandomDelay());
      }

      resetAutoSlide() {
        clearTimeout(this.timeoutId);
        this.startAutoSlide();
      }
    }

    // Initialize all sliders
    document.querySelectorAll('.slider').forEach(sliderEl => {
      new ImageSlider(sliderEl);
    });