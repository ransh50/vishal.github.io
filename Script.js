// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('open');
    document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
});

function closeNav() {
    navToggle.classList.remove('active');
    navMobile.classList.remove('open');
    document.body.style.overflow = '';
}

// Close mobile nav on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeNav();
    }
});

// Google Sheets Web App URL - REPLACE WITH YOUR URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySL0OyIFi8eDicv-t4A1cm8YjLhWYAOnwlKLNwDxBboUzca6Ve-Zx_E69MFuCaak06iQ/exec';

// Form Submit Handler
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    const message = document.getElementById('formMessage');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    btn.classList.add('btn-loading');
    btn.disabled = true;
    message.innerHTML = '<span style="color: var(--on-dark-variant);">Sending transmission...</span>';
    
    try {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // Success
        btn.classList.remove('btn-loading');
        btn.disabled = false;
        btn.innerHTML = `
            Transmission Sent ✓
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
        `;
        btn.style.background = '#4ade80';
        
        message.innerHTML = '<span style="color: #4ade80; font-weight: 600;">✓ Message received! We\'ll respond within 24 hours.</span>';
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            btn.innerHTML = `
                Send Transmission
                <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
            `;
            btn.style.background = '';
            message.innerHTML = '';
        }, 5000);
        
    } catch (error) {
        // Error
        btn.classList.remove('btn-loading');
        btn.disabled = false;
        message.innerHTML = '<span style="color: var(--error);">⚠ Error sending message. Please try again.</span>';
        
        console.error('Form submission error:', error);
    }
});

// Filter Chips
document.querySelectorAll('.filter-bar .chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-bar .chip').forEach(c => {
            c.classList.remove('chip-yellow', 'active');
            c.classList.add('chip-outline');
        });
        chip.classList.remove('chip-outline');
        chip.classList.add('chip-yellow', 'active');
    });
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Nav scroll effect
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.85)';
    }

    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});