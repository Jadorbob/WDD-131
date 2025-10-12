const menuButton = document.querySelector(".menu-button");
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);


function handleResize() {
  const menu = document.querySelector(".menu");
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize();
window.addEventListener("resize", handleResize);

// ------------------------------------------------------

const gallery = document.querySelector('.gallery');
const modal = document.createElement('div');

modal.classList.add('modal');
modal.style.display = 'none';
modal.innerHTML = `
    <span class="close">&times;</span>
    <img class="modal-content" src="">
`;
document.body.appendChild(modal);

const modalImg = modal.querySelector('.modal-content');
const closeBtn = modal.querySelector('.close');

gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const smallSrc = e.target.getAttribute('src');
        const fullSrc = smallSrc.replace('-sm', '-full'); 
        modalImg.src = fullSrc;
        modal.style.display = 'flex';
    }
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});