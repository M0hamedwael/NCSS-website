document.addEventListener('DOMContentLoaded', () =>{
  navigationInit()
  activeLinkInit()
});

function navigationInit(){
const navbar = document.getElementById("navbar")
const navitem = document.querySelectorAll(".nav-link")
const logotext = document.querySelectorAll(".logo-text")
const bar = document.querySelectorAll(".bar");
let ticking = false

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
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

// Achievements page
    function toggleAchievement(e) {
  const achievement = e.currentTarget; // the div with class="achievement"
  achievement.classList.toggle("active");
}