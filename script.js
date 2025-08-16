    // --- Utility Functions ---
    function smoothScrollTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
    }
    function updateLike(btn) {
    let countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent, 10) || 0;
    count++;
    countSpan.textContent = count;
    btn.classList.add('bg-pink-600');
    setTimeout(() => btn.classList.remove('bg-pink-600'), 300);
    }
    function updateRating(card, value) {
    let ratingSpan = card.querySelector('.rating-value');
    ratingSpan.textContent = value;
    ratingSpan.classList.add('text-pink-500');
    setTimeout(() => ratingSpan.classList.remove('text-pink-500'), 300);
    }
    function adjustAnimeCards() {
    document.querySelectorAll('.grid > div').forEach(card => {
        card.classList.add('anime-card');
    });
    }

    // --- Navigation & Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        }
    });
    });
    const homeLink = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Home');
    if (homeLink) {
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    }
    const aboutLink = document.querySelector('a[href="#why-anime"]');
    if (aboutLink) {
    aboutLink.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollTo('#why-anime');
    });
    }
    const contactLink = document.querySelector('a[href="#email-us"]');
    if (contactLink) {
    contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollTo('#email-us');
    });
    }

    // --- Navbar Toggle (for mobile) ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
    });
    }

    // --- Social Icons ---
    document.querySelectorAll('.bg-black .absolute a').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.classList.add('scale-110');
    });
    icon.addEventListener('mouseleave', () => {
        icon.classList.remove('scale-110');
    });
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        const label = icon.getAttribute('aria-label');
        if (label === 'Twitter') {
        window.open('https://twitter.com', '_blank');
        } else if (label === 'Instagram') {
        window.open('https://instagram.com', '_blank');
        } else if (label === 'Discord') {
        window.open('https://discord.com', '_blank');
        }
    });
    });

    // --- Carousel ---
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
    let scrollAmount = 0;
    const scrollStep = 300;
    if (!document.getElementById('carousel-next')) {
        const nextBtn = document.createElement('button');
        nextBtn.id = 'carousel-next';
        nextBtn.textContent = 'Next';
        nextBtn.className = 'absolute right-2 top-1/2 bg-pink-500 text-white px-3 py-1 rounded-full';
        carouselTrack.parentElement.appendChild(nextBtn);
        nextBtn.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });
    }
    if (!document.getElementById('carousel-prev')) {
        const prevBtn = document.createElement('button');
        prevBtn.id = 'carousel-prev';
        prevBtn.textContent = 'Prev';
        prevBtn.className = 'absolute left-2 top-1/2 bg-pink-500 text-white px-3 py-1 rounded-full';
        carouselTrack.parentElement.appendChild(prevBtn);
        prevBtn.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });
    }
    }

    // --- Search ---
    const searchBtn = document.querySelector('button[aria-label="Search"]');
    if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const query = prompt('Enter anime name to search:');
        if (query) {
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

    // --- Log In / Sign Up ---
    const loginBtn = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Log In');
    if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Log In functionality coming soon!');
    });
    }
    const signupBtn = Array.from(document.querySelectorAll('a')).find(a => a.textContent.trim() === 'Sign Up');
    if (signupBtn) {
    signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Sign Up functionality coming soon!');
    });
    }

    // --- Like & Rating Buttons ---
    document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        updateLike(btn);
    });
    });
    document.querySelectorAll('.rate-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = btn.closest('div.flex-1') || btn.closest('div.p-4');
        updateRating(card, btn.getAttribute('data-rate'));
    });
    });
    adjustAnimeCards();

    // --- Email Us Form ---
    const emailForm = document.querySelector('form[action*="formspree"]');
    if (emailForm) {
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = emailForm.querySelector('input[type="email"]').value;
        const message = emailForm.querySelector('textarea').value;
        if (!email || !message) {
        alert('Please fill out both fields.');
        return;
        }
        try {
        const response = await fetch(emailForm.action, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, message })
        });
        if (response.ok) {
            alert('Thank you for contacting us, Otaku! Your message was sent to Anime Demo Gmail.');
            emailForm.reset();
        } else {
            alert('Sorry, there was a problem sending your message. Please try again later.');
        }
        } catch (error) {
        alert('Network error. Please check your connection and try again.');
        }
    });
    }

    // --- Direct email link ---
    const directEmailLink = document.querySelector('a[href^="mailto:"]');
    if (directEmailLink) {
    directEmailLink.addEventListener('click', function(e) {
        // Let browser handle mailto link
    });
    }