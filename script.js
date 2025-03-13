// DOM Elements
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const closeMenu = document.getElementById('closeMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const eventsList = document.getElementById('eventsList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const currentYearEl = document.getElementById('currentYear');

// Set current year in footer
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// Sample event data
const events = [
    {
        id: 1,
        title: "Nevada State Championship",
        date: "April 15, 2025",
        location: "Bootleg Canyon, Boulder City, NV",
        description: "State championship race with categories for all age groups and skill levels."
    },
    {
        id: 2,
        title: "Desert Dash Series - Race 1",
        date: "May 10, 2025",
        location: "Blue Diamond Trails, Las Vegas, NV",
        description: "First race in the Desert Dash Series featuring technical singletrack and fast descents."
    },
    {
        id: 3,
        title: "Junior Development Camp",
        date: "June 5-7, 2025",
        location: "Mt. Charleston, Las Vegas, NV",
        description: "Three-day skills camp for junior riders focusing on technical skills and race preparation."
    },
    {
        id: 4,
        title: "Summer Night Series",
        date: "July 12, 2025",
        location: "Sunset Park, Las Vegas, NV",
        description: "Evening race under the lights. Great for beginners and experienced riders alike."
    }
];

// Header scroll effect
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu functionality
menuToggle.addEventListener('click', () => {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Load events dynamically
let visibleEvents = 2;

function renderEvents() {
    eventsList.innerHTML = events.slice(0, visibleEvents).map(event => `
        <div class="event-card">
            <h3 class="event-title">${event.title}</h3>
            <div class="event-meta">
                <i class="far fa-calendar"></i> <span>${event.date}</span>
            </div>
            <div class="event-meta">
                <i class="fas fa-map-marker-alt"></i> <span>${event.location}</span>
            </div>
            <p class="event-description">${event.description}</p>
        </div>
    `).join('');

    // Hide load more button if all events are shown
    loadMoreContainer.style.display = visibleEvents >= events.length ? 'none' : 'block';
}

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        visibleEvents = Math.min(visibleEvents + 2, events.length);
        renderEvents();
    });
}

// Contact form submission (Formspree)
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        let formData = new FormData(contactForm);

        try {
            let response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                formSuccess.style.display = 'block';
                contactForm.reset();
                setTimeout(() => formSuccess.style.display = 'none', 5000);
            } else {
                alert("Error: Form submission failed.");
            }
        } catch (error) {
            alert("Error: Network issue or Formspree problem.");
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', renderEvents);