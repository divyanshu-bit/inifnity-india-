// Mock data for products and company info
const mockData = {
    products: [
        {
            id: 'feather',
            name: 'Feather Flag',
            description: 'Our feather flags are sleek and eye-catching, perfect to be used for indoor as well as outdoor promotions, swaying with the wind and stealing the show.',
            features: ['Indoor/Outdoor', 'Wind Resistant', 'Lightweight', 'Easy Setup'],
            price: 'Starting from ₹1,500',
            image: 'https://images.pexels.com/photos/5625046/pexels-photo-5625046.jpeg'
        },
        {
            id: 'teardrop',
            name: 'Teardrop Flag',
            description: 'This flag provides consistent branding visibility even in windy conditions because it is designed to maintain its distinctive shape under all circumstances.',
            features: ['Shape Retention', 'All Weather', 'Durable', 'Professional Look'],
            price: 'Starting from ₹1,800',
            image: 'https://images.pexels.com/photos/5625049/pexels-photo-5625049.jpeg'
        },
        {
            id: 'advertising',
            name: 'Advertising Flag',
            description: 'Perfect for retail, events, and seasonal promotions, these customizable flags are made to draw attention to deals, goods, or services.',
            features: ['Customizable', 'Retail Ready', 'High Impact', 'Versatile'],
            price: 'Starting from ₹1,200',
            image: 'https://images.pexels.com/photos/11186982/pexels-photo-11186982.jpeg'
        },
        {
            id: 'printed',
            name: 'Printed Flag',
            description: 'Fully personalized printed flags with vivid, high-quality images that are ideal for informational displays, events, or branding.',
            features: ['High Quality Print', 'Personalized', 'Vivid Colors', 'Custom Design'],
            price: 'Starting from ₹2,000',
            image: 'https://images.unsplash.com/photo-1600453267314-8414ff04f420?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxwcm9tb3Rpb25hbCUyMGZsYWdzfGVufDB8fHxyZWR8MTc1MjIxNDMzOXww&ixlib=rb-4.1.0&q=85'
        },
        {
            id: 'beach',
            name: 'Beach Flag',
            description: 'Beach flags are a striking marketing tool that is ideal for outdoor advertising in public areas such as parks, beaches, roadside areas, trade exhibitions, and public gatherings.',
            features: ['Outdoor Optimized', 'High Visibility', 'Weather Resistant', 'Portable'],
            price: 'Starting from ₹1,600',
            image: 'https://images.unsplash.com/photo-1630312874843-53f1295ae463?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxmbGFnJTIwbWFudWZhY3R1cmluZ3xlbnwwfHx8cmVkfDE3NTIyMTQzNDV8MA&ixlib=rb-4.1.0&q=85'
        }
    ],
    testimonials: [
        {
            name: 'Rajesh Kumar',
            company: 'Delhi Retail Group',
            text: 'Infinity India transformed our store visibility with their stunning feather flags. Sales increased by 40% within the first month!',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            company: 'Event Management Co.',
            text: 'Their beach flags made our outdoor events stand out. Professional quality and excellent customer service.',
            rating: 5
        },
        {
            name: 'Amit Patel',
            company: 'Auto Dealership',
            text: 'The teardrop flags maintain their shape perfectly even in strong winds. Great investment for our showroom.',
            rating: 5
        }
    ],
    stats: {
        clientsServed: 20000,
        industriesServed: 500,
        flagsDelivered: 200000,
        yearsFounded: 2015
    }
};

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeProductInteractions();
    initializeCounterAnimations();
    initializeLazyLoading();
    initializeSmoothScroll();
    
    // Hide loading screen after animations are set up
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hide');
        }
    }, 1000);

    // Add curtain click handler to hide "Tap to Unveil" text
    const curtainContainer = document.getElementById('fabricCurtainContainer');
    const curtainText = curtainContainer ? curtainContainer.querySelector('.curtain-text') : null;
    if (curtainContainer && curtainText) {
        curtainContainer.addEventListener('click', () => {
            curtainText.style.display = 'none';
            // Optionally, you can add code here to trigger the curtain unveiling animation
            curtainContainer.classList.add('curtain-open');
        });
    }
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
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
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements that should animate on scroll
    document.querySelectorAll('.story-item, .product-card, .benefit-card, .industry-item').forEach(el => {
        observer.observe(el);
    });
}

// Product interactions
function initializeProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.btn-primary');
        const productId = card.dataset.product;
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Learn more button click
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showProductModal(productId);
            });
        }
    });
}

// Show product modal with details
function showProductModal(productId) {
    const product = mockData.products.find(p => p.id === productId);
    if (!product) return;

    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                <div class="modal-body">
                    <img src="${product.image}" alt="${product.name}" class="modal-image">
                    <div class="modal-info">
                        <h2>${product.name}</h2>
                        <p class="modal-description">${product.description}</p>
                        <div class="modal-features">
                            <h3>Features:</h3>
                            <ul>
                                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-price">${product.price}</div>
                        <div class="modal-actions">
                            <button class="btn btn-primary" onclick="handleQuoteRequest('${product.id}')">Get Quote</button>
                            <button class="btn btn-secondary" onclick="closeModal()">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    const modalStyles = `
        <style>
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                animation: fadeIn 0.3s ease-out forwards;
            }
            
            .modal-content {
                background: white;
                border-radius: 20px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.9);
                animation: scaleIn 0.3s ease-out 0.1s forwards;
            }
            
            .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                z-index: 10001;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: #f0f0f0;
                color: #dc2626;
            }
            
            .modal-body {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                padding: 2rem;
            }
            
            .modal-image {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 15px;
            }
            
            .modal-info h2 {
                font-size: 2rem;
                font-weight: 800;
                margin-bottom: 1rem;
                color: #1a1a1a;
            }
            
            .modal-description {
                color: #666;
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .modal-features h3 {
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                color: #1a1a1a;
            }
            
            .modal-features ul {
                list-style: none;
                padding: 0;
            }
            
            .modal-features li {
                padding: 0.5rem 0;
                border-bottom: 1px solid #f0f0f0;
                color: #666;
            }
            
            .modal-features li:before {
                content: "✓";
                color: #dc2626;
                margin-right: 0.5rem;
                font-weight: bold;
            }
            
            .modal-price {
                font-size: 1.5rem;
                font-weight: 700;
                color: #dc2626;
                margin: 1.5rem 0;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                to { transform: scale(1); }
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }
                
                .modal-image {
                    height: 200px;
                }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', modalStyles);
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Handle quote request
function handleQuoteRequest(productId) {
    const product = mockData.products.find(p => p.id === productId);
    alert(`Quote request sent for ${product.name}!\n\nOur team will contact you within 24 hours with a detailed quote.\n\nThank you for choosing Infinity India!`);
    closeModal();
}

// Counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const targetValues = [
        mockData.stats.clientsServed,
        mockData.stats.industriesServed,
        mockData.stats.flagsDelivered
    ];

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, targetValues);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, targetValues) {
    const counters = Array.from(document.querySelectorAll('.stat-number'));
    const index = counters.indexOf(element);
    const targetValue = targetValues[index];
    let currentValue = 0;
    const increment = targetValue / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        
        // Format the number display with K and M suffixes
        if (targetValue >= 1000000) {
            element.textContent = (currentValue / 1000000).toFixed(1) + 'M+';
        } else if (targetValue >= 1000) {
            element.textContent = Math.floor(currentValue / 1000) + 'K+';
        } else {
            element.textContent = Math.floor(currentValue) + '+';
        }
    }, stepTime);
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Button interactions
document.addEventListener('click', function(e) {
    // Hero buttons
    if (e.target.textContent === 'Explore Products') {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }
    
    if (e.target.textContent === 'Our Story') {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }
    
    // CTA button
    if (e.target.textContent === 'Get Started Today') {
        showContactForm();
    }
});

// Show contact form
function showContactForm() {
    const contactFormHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                <div class="contact-form-container">
                    <h2>Get Your Custom Quote</h2>
                    <p>Tell us about your project and we'll get back to you within 24 hours!</p>
                    <form class="contact-form" onsubmit="handleContactSubmit(event)">
                        <div class="form-group">
                            <input type="text" id="name" name="name" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" required>
                        </div>
                        <div class="form-group">
                            <select id="product" name="product" required>
                                <option value="">Select Flag Type</option>
                                <option value="feather">Feather Flag</option>
                                <option value="teardrop">Teardrop Flag</option>
                                <option value="advertising">Advertising Flag</option>
                                <option value="printed">Printed Flag</option>
                                <option value="beach">Beach Flag</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <textarea id="message" name="message" placeholder="Tell us about your requirements..." rows="4" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Send Quote Request</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', contactFormHTML);
    
    // Add contact form styles
    const contactFormStyles = `
        <style>
            .contact-form-container {
                padding: 2rem;
                max-width: 500px;
                margin: 0 auto;
            }
            
            .contact-form-container h2 {
                font-size: 2rem;
                font-weight: 800;
                margin-bottom: 1rem;
                color: #1a1a1a;
                text-align: center;
            }
            
            .contact-form-container p {
                color: #666;
                text-align: center;
                margin-bottom: 2rem;
            }
            
            .form-group {
                margin-bottom: 1.5rem;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 1rem;
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
                background: white;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #dc2626;
            }
            
            .form-group textarea {
                resize: vertical;
                min-height: 120px;
            }
            
            .contact-form button {
                width: 100%;
                padding: 1rem 2rem;
                font-size: 1.1rem;
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', contactFormStyles);
}

// Handle contact form submission
function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        product: formData.get('product'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert(`Thank you ${data.name}!\n\nYour quote request has been received. Our team will contact you within 24 hours.\n\nProduct: ${data.product}\nPhone: ${data.phone}\nEmail: ${data.email}`);
        closeModal();
    }, 2000);
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            hero.style.backgroundPosition = `${x}% ${y}%`;
        }
    }
});

// Add floating animation to some elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.benefit-icon, .story-icon');
    
    floatingElements.forEach((element, index) => {
        element.style.animation = `float 3s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Add floating keyframes
const floatingStyles = `
    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', floatingStyles);

// Initialize floating animations after DOM is loaded
setTimeout(addFloatingAnimation, 1000);

// Services Carousel Functionality
let currentSlide = 0;
let totalSlides = 6; // Number of indicator dots (grouping 8 services into 6 views)
let isAutoPlaying = true;
let autoPlayInterval;

function initializeServicesCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel) return;
    
    // Calculate responsive slides
    updateCarouselConfig();
    
    // Add event listeners
    prevBtn.addEventListener('click', () => {
        pauseAutoPlay();
        previousSlide();
        resumeAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        pauseAutoPlay();
        nextSlide();
        resumeAutoPlay();
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            pauseAutoPlay();
            goToSlide(index);
            resumeAutoPlay();
        });
    });
    
    // Pause on hover
    carousel.addEventListener('mouseenter', pauseAutoPlay);
    carousel.addEventListener('mouseleave', resumeAutoPlay);
    
    // Touch/swipe support
    initializeTouchSupport();
    
    // Window resize handler
    window.addEventListener('resize', updateCarouselConfig);
    
    // Start auto-play
    startAutoPlay();
}

function updateCarouselConfig() {
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth <= 768) {
        totalSlides = 8; // Show 1 per slide on mobile
    } else if (viewportWidth <= 1024) {
        totalSlides = 4; // Show 2 per slide on tablet
    } else {
        totalSlides = 6; // Show 3 per slide on desktop, with some overlap
    }
    
    updateCarouselIndicators();
}

function updateCarouselIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    indicatorsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('span');
        indicator.className = `indicator ${i === currentSlide ? 'active' : ''}`;
        indicator.dataset.slide = i;
        indicator.addEventListener('click', () => {
            pauseAutoPlay();
            goToSlide(i);
            resumeAutoPlay();
        });
        indicatorsContainer.appendChild(indicator);
    }
}

function updateCarousel() {
    const carousel = document.getElementById('servicesCarousel');
    const viewportWidth = window.innerWidth;
    let translateX = 0;
    
    if (viewportWidth <= 768) {
        // Mobile: 1 card per slide
        translateX = currentSlide * -100;
    } else if (viewportWidth <= 1024) {
        // Tablet: 2 cards per slide
        translateX = currentSlide * -50;
    } else {
        // Desktop: 3 cards per slide with smooth scrolling
        translateX = currentSlide * -33.333;
    }
    
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function startAutoPlay() {
    if (!isAutoPlaying) return;
    
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 4000); // Change slide every 4 seconds
}

function pauseAutoPlay() {
    isAutoPlaying = false;
    clearInterval(autoPlayInterval);
}

function resumeAutoPlay() {
    isAutoPlaying = true;
    startAutoPlay();
}

function initializeTouchSupport() {
    const carousel = document.getElementById('servicesCarousel');
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        pauseAutoPlay();
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        
        // Optional: Add visual feedback during drag
        const deltaX = currentX - startX;
        const sensitivity = 0.3;
        carousel.style.transform = `translateX(${carousel.style.transform.replace('translateX(', '').replace('%)', '') * 1 + deltaX * sensitivity}%)`;
    });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const deltaX = currentX - startX;
        const threshold = 50;
        
        if (Math.abs(deltaX) > threshold) {
            if (deltaX > 0) {
                previousSlide();
            } else {
                nextSlide();
            }
        } else {
            updateCarousel(); // Snap back to current position
        }
        
        resumeAutoPlay();
    });
}

// Service card hover effects
function initializeServiceCardEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.2), 0 0 20px rgba(220, 38, 38, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Enhanced intersection observer for carousel
function initializeCarouselScrollAnimations() {
    const carouselSection = document.querySelector('.services-carousel-section');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start carousel animations
                const serviceCards = entry.target.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Start auto-play when in view
                if (!isAutoPlaying) {
                    resumeAutoPlay();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (carouselSection) {
        observer.observe(carouselSection);
    }
}

// Add these to the main initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeProductInteractions();
    initializeCounterAnimations();
    initializeLazyLoading();
    initializeSmoothScroll();
    initializeServicesCarousel();
    initializeServiceCardEffects();
    initializeCarouselScrollAnimations();
    
    // Hide loading screen after animations are set up
    setTimeout(() => {
        const loading = document.querySelector('.loading');
        if (loading) {
            loading.classList.add('hide');
        }
    }, 1000);
});

// Add some console messages for developers
console.log('🚩 Infinity India Website Loaded Successfully!');
console.log('📞 Contact: info@infinityindia.com');
console.log('🎯 Premium Flag Manufacturing Since 2015');