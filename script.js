// Menu toggle for mobile
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

// Smooth scroll function
function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Close menu on link click (mobile)
document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
  });
});