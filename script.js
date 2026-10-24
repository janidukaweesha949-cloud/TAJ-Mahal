// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        setTimeout(() => preloader.style.display = 'none', 600);
    }, 2200);
});

// ===== Language System =====
let currentLang = 'si';

function switchLanguage(lang) {
    currentLang = lang;
    const htmlRoot = document.getElementById('html-root');
    
    // Update body class for font
    if (lang === 'en') {
        document.body.classList.add('lang-en');
        htmlRoot.setAttribute('lang', 'en');
    } else {
        document.body.classList.remove('lang-en');
        htmlRoot.setAttribute('lang', 'si');
    }
    
    // Update all elements with data-si and data-en
    document.querySelectorAll('[data-si][data-en]').forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            el.textContent = text;
        }
    });

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

document.getElementById('btnSinhala').addEventListener('click', () => switchLanguage('si'));
document.getElementById('btnEnglish').addEventListener('click', () => switchLanguage('en'));

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});

// ===== Slideshow =====
const slides = document.querySelectorAll('.slide');
const slideDots = document.getElementById('slideDots');
let currentSlide = 0;
let slideInterval;

// Create dots
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('slide-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    slideDots.appendChild(dot);
});

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.slide-dot')[currentSlide].classList.remove('active');
    
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.slide-dot')[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

document.getElementById('nextSlide').addEventListener('click', () => {
    nextSlide();
    resetSlideInterval();
});

document.getElementById('prevSlide').addEventListener('click', () => {
    prevSlide();
    resetSlideInterval();
});

function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

startSlideInterval();

// ===== Gallery Lightbox =====
const galleryImages = [
    { src: 'images/taj_mahal_hero.jpg', captionSi: 'හිරු උදාව සමඟ තාජ් මහල්', captionEn: 'Taj Mahal at Sunrise' },
    { src: 'images/taj_mahal_night.jpg', captionSi: 'රාත්‍රියේ තාජ් මහල්', captionEn: 'Taj Mahal at Night' },
    { src: 'images/taj_mahal_interior.jpg', captionSi: 'තාජ් මහල් අභ්‍යන්තරය', captionEn: 'Taj Mahal Interior' },
    { src: 'images/taj_mahal_garden.jpg', captionSi: 'මුඝල් උද්‍යානය', captionEn: 'Mughal Gardens' },
    { src: 'images/taj_mahal_architecture.jpg', captionSi: 'වාස්තු විද්‍යාත්මක විස්තර', captionEn: 'Architectural Details' },
    { src: 'images/shah_jahan_mumtaz.jpg', captionSi: 'ෂාහ් ජහාන් සහ මුම්තාස් මහල්', captionEn: 'Shah Jahan & Mumtaz Mahal' }
];

let currentLightbox = 0;

function openLightbox(index) {
    currentLightbox = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    
    img.src = galleryImages[index].src;
    caption.textContent = currentLang === 'si' ? galleryImages[index].captionSi : galleryImages[index].captionEn;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeLightbox(direction) {
    currentLightbox += direction;
    if (currentLightbox >= galleryImages.length) currentLightbox = 0;
    if (currentLightbox < 0) currentLightbox = galleryImages.length - 1;
    
    const img = document.getElementById('lightboxImage');
    const caption = document.getElementById('lightboxCaption');
    
    img.src = galleryImages[currentLightbox].src;
    caption.textContent = currentLang === 'si' ? galleryImages[currentLightbox].captionSi : galleryImages[currentLightbox].captionEn;
}

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeLightbox(-1);
        if (e.key === 'ArrowRight') changeLightbox(1);
    }
});

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    observer.observe(card);
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== Floating Particles =====
function createParticles() {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        document.body.appendChild(particle);
    }
}

createParticles();

// ===== Smooth Scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Touch Swipe for Slideshow =====
let touchStartX = 0;
let touchEndX = 0;

const heroSection = document.getElementById('home');

heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        resetSlideInterval();
    }
}

// Make functions available globally for onclick handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.changeLightbox = changeLightbox;
