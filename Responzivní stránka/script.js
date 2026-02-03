// 1. Vytvořím constantu pro ikonu menu
const menuIcon = document.querySelector(".menu-icon");

const navMenu = document.querySelector("nav ul");

// 3. Přidáme posluchač který raguje na kliknutí
menuIcon.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// 4. Když kliknu na odkaz, menu se samo zavře
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});
// Zavřít menu, když kliknU mimo něj
document.addEventListener("click", (event) => {
  if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
    navMenu.classList.remove("active");
  }
});
