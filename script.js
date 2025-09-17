document.addEventListener('DOMContentLoaded', () =>{
  navigationInit()
  activeLinkInit()
  initResponsiveFeatures()
});

// Initialize responsive features
function initResponsiveFeatures() {

  
  // Add touch support for mobile
  addTouchSupport();
  
  // Handle viewport changes
  handleViewportChanges();
}




// Add touch support for mobile devices
function addTouchSupport() {
  // Add touch event listeners for better mobile interaction
  const touchElements = document.querySelectorAll('.card, .btn, .nav-link');
  touchElements.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('touchend', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// Handle viewport changes and orientation changes
function handleViewportChanges() {
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      // Recalculate slider positions
      document.querySelectorAll('.slider').forEach(slider => {
        if (slider.imageSlider) {
          slider.imageSlider.updateSlider();
        }
      });
    }, 250);
  });
  
  // Handle orientation change
  window.addEventListener('orientationchange', function() {
    setTimeout(function() {
      // Recalculate layouts after orientation change
      document.querySelectorAll('.slider').forEach(slider => {
        if (slider.imageSlider) {
          slider.imageSlider.updateSlider();
        }
      });
    }, 500);
  });
}

function navigationInit(){
const navbar = document.getElementById("navbar")
const navitem = document.querySelectorAll(".nav-link")
const logotext = document.querySelectorAll(".logo-text")
const bar = document.querySelectorAll(".bar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
let ticking = false

// Mobile navigation toggle
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navitem.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", function() {

  if (this.window.scrollY) {
    navbar.classList.add("scrolled");
    navitem.forEach(item => {item.classList.add("scrolled")});
    logotext.forEach(item => {item.classList.add("scrolled")});
    bar.forEach(item => {item.classList.add("scrolled")});
    navMenu.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled");
    navitem.forEach(item => {item.classList.remove("scrolled")});
    logotext.forEach(item => {item.classList.remove("scrolled")});
    bar.forEach(item => {item.classList.remove("scrolled")});
    navMenu.classList.remove("scrolled")
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