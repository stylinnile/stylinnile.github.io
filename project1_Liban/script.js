// Modified JavaScript
const sections = document.querySelectorAll('.section');
const aestheticImage = document.getElementById('aestheticImage');
const gradient1 = document.getElementById('gradient1');
const gradient2 = document.getElementById('gradient2');
let activeGradient = 1;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const newImage = entry.target.getAttribute('data-image');
      const newGradient = entry.target.getAttribute('data-gradient');

      if (!aestheticImage.src.includes(newImage)) {
        // Fade out current image
        aestheticImage.style.opacity = 0;

        // Cross-fade the backgrounds
        if (activeGradient === 1) {
          gradient2.style.background = newGradient;
          gradient2.style.opacity = 1;
          gradient1.style.opacity = 0;
          activeGradient = 2;
        } else {
          gradient1.style.background = newGradient;
          gradient1.style.opacity = 1;
          gradient2.style.opacity = 0;
          activeGradient = 1;
        }

        // Update image
        setTimeout(() => {
          aestheticImage.src = newImage;
          aestheticImage.style.opacity = 1;
        }, 500);
      }
    }
  });
}, { threshold: 0.5 });

// Initialize first gradient
gradient1.style.background = document.querySelector('.section').getAttribute('data-gradient');

// Observe each section
sections.forEach(section => observer.observe(section));
