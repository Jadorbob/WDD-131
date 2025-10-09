const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('change');
  nav.classList.toggle('open');
});