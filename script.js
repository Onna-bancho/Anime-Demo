// Smooth scroll for anchor links (About, Contact)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Email form validation and real sending logic
const emailForm = document.querySelector('form');
if (emailForm) {
  emailForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = emailForm.querySelector('input[type="email"]').value;
    const message = emailForm.querySelector('textarea').value;
    if (!email || !message) {
      alert('Please fill out both fields.');
      return;
    }
    // Real sending logic using Formspree (free email API)
    try {
      const response = await fetch('https://formspree.io/f/mnqykqzj', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, message })
      });
      if (response.ok) {
        alert('Thank you for contacting us, Otaku! We will reply soon.');
        emailForm.reset();
      } else {
        alert('Sorry, there was a problem sending your message. Please try again later.');
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.');
    }
  });
}

// Responsive navbar toggle (if you add a hamburger menu for mobile)
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
}

// Simple carousel functionality (for your .carousel-track)
const carouselTrack = document.querySelector('.carousel-track');
if (carouselTrack) {
  let scrollAmount = 0;
  const scrollStep = 300; // Adjust as needed
  document.getElementById('carousel-next')?.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: scrollStep, behavior: 'smooth' });
  });
  document.getElementById('carousel-prev')?.addEventListener('click', () => {
    carouselTrack.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  });
}

// Optional: Animate social icons on hover
document.querySelectorAll('.bg-black .absolute a').forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    icon.classList.add('scale-110');
  });
  icon.addEventListener('mouseleave', () => {
    icon.classList.remove('scale-110');
  });
});

// Search button functionality
const searchBtn = document.querySelector('button[aria-label="Search"]');
if (searchBtn) {
  searchBtn.addEventListener('click', function() {
    const query = prompt('Enter anime name to search:');
    if (query) {
      // Real search logic: highlight matching anime cards
      let found = false;
      document.querySelectorAll('.anime-card, .grid > div').forEach(card => {
        const title = card.querySelector('h3');
        if (title && title.textContent.toLowerCase().includes(query.toLowerCase())) {
          card.classList.add('ring-4', 'ring-pink-500');
          found = true;
        } else {
          card.classList.remove('ring-4', 'ring-pink-500');
        }
      });
      if (!found) {
        alert('No matching anime found!');
      }
    }
  });
}

// Log In button functionality
const loginBtn = document.querySelector('a:contains("Log In")');
if (loginBtn) {
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Log In functionality coming soon!');
    // Redirect or show modal for login here
  });
}

// Sign Up button functionality
const signupBtn = document.querySelector('a:contains("Sign Up")');
if (signupBtn) {
  signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Sign Up functionality coming soon!');
    // Redirect or show modal for signup here
  });
}