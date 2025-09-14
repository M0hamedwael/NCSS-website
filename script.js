document.addEventListener('DOMContentLoaded', () =>{
  navigationInit()
  activeLinkInit()
  initachievements()
});

function navigationInit(){
const navbar = document.getElementById("navbar")
const navitem = document.querySelectorAll(".nav-link")
const logotext = document.querySelectorAll(".logo-text")
const bar = document.querySelectorAll(".bar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
let ticking = false

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
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

    function initachievements(){
      const openBtn = document.getElementById("openModal");
    const overlay = document.getElementById("achievement-overlay");
    const modal = document.getElementById("modalBox");
    const closeBtn = document.getElementById("achievement-closeBtn");
    };
    function handleAchievementOverlay(event) {
      const card = event.target.closest(".card-wrapper")
      const cardoverlay = card.querySelector(".achievement-overlay")
      const modal = card.querySelector(".modal")
      cardoverlay.classList.add("active");
      setTimeout(() => modal.classList.add("active"), 50);
    };
    function handleAchievementclose(event){
      const modal = event.target.closest(".modal")
      const overlay = event.target.closest(".achievement-overlay")
      modal.classList.remove("active");
      setTimeout(() => overlay.classList.remove("active"), 400);
    }
    function handleoverlayclose(e){
      const overlay = e.target.closest(".achievement-overlay")
      const modal = overlay.querySelector(".modal") 
      if (e.target === overlay) {
        modal.classList.remove("active");
        setTimeout(() => overlay.classList.remove("active"), 400);
      }
    }
    