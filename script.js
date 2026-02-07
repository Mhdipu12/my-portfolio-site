// Smooth entrance animation using Intersection Observer

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = 'translateY(40px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});
/* =============================
   HERO TYPING ANIMATION
============================= */

const typingElement = document.getElementById("typing-text");

const words = [
  "Data Science ",
  "Web3 ",
  "Crypto Enthusiast "
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex++);
  }

  let typingSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 1500;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();