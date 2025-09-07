const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }
}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

document.querySelectorAll('.copy-email').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const email = e.currentTarget.dataset.email;
    navigator.clipboard.writeText(email).then(() => {
      // Show a subtle feedback message
      const notice = document.createElement('div');
      notice.textContent = `Copied: ${email}`;
      notice.style.position = 'fixed';
      notice.style.bottom = '20px';
      notice.style.right = '20px';
      notice.style.background = 'rgba(0,0,0,0.8)';
      notice.style.color = '#fff';
      notice.style.padding = '8px 12px';
      notice.style.borderRadius = '4px';
      notice.style.fontSize = '1.4rem';
      notice.style.zIndex = 9999;
      document.body.appendChild(notice);
      setTimeout(() => notice.remove(), 2000);
    });
  });
});

const previewImages = document.querySelectorAll('.repository__image, .resume__image');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

previewImages.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
  });
});

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    // Close lightbox if clicked outside the image
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });
}