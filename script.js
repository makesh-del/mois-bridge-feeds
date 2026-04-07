// ===========================
// SMOOTH SCROLLING & NAVIGATION
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// CTA BUTTON - WHATSAPP INTEGRATION
// ===========================

document.querySelector('.cta-button').addEventListener('click', function() {
    openWhatsApp('Order Animal Feeds');
});

document.querySelectorAll('.product-button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.closest('.product-card').querySelector('h3').textContent;
        openWhatsApp(`I am interested in: ${productName}`);
    });
});

function openWhatsApp(message) {
    // Replace with actual WhatsApp number
    const phoneNumber = '254723552716'; // Format: country code + number without +
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// ===========================
// FORM SUBMISSION
// ===========================

const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        if (!name || !phone || !message) {
            alert('Please fill in all required fields (Name, Phone, and Message)');
            return;
        }
        
        // Create message for WhatsApp
        const whatsappMessage = `Hello! I'm ${name}.\n\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\n\nMessage: ${message}`;
        
        // Send via WhatsApp
        const phoneNumber = '254723552716';
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Show success message
        alert('Thank you for your message! Opening WhatsApp to send your inquiry...');
        
        // Open WhatsApp in new window
        window.open(whatsappURL, '_blank');
        
        // Reset form
        this.reset();
    });
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===========================
// ANIMATION ON SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards and service cards
document.querySelectorAll('.product-card, .service-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// MOBILE MENU TOGGLE (if needed for future expansion)
// ===========================

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Format phone number for WhatsApp
function formatPhoneNumber(phone) {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // If it starts with 0, replace with country code
    if (cleaned.startsWith('0')) {
        return '254' + cleaned.substring(1);
    }
    
    // If it doesn't start with country code, add it
    if (!cleaned.startsWith('254')) {
        return '254' + cleaned;
    }
    
    return cleaned;
}

// Log page analytics (can be extended with actual analytics)
console.log('Moi\'s Bridge Animal Feeds - Website loaded successfully');
console.log('Current time:', new Date().toLocaleString());
