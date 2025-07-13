/**
 * This script handles the unveiling curtain animation and reveals the product carousel.
 * It assumes the fabric cloth image is wrapped in a container with id 'fabricCurtainContainer'
 * and the product carousel section has id 'productCarouselSection'.
 */

document.addEventListener('DOMContentLoaded', () => {
    const fabricCurtainContainer = document.getElementById('fabricCurtainContainer');
    const productCarouselSection = document.getElementById('productCarouselSection');
    const carouselTrack = document.getElementById('productCarousel');
    let isUnveiledStory = false;

    if (!fabricCurtainContainer || !productCarouselSection || !carouselTrack) {
        console.warn('Unveil carousel elements not found.');
        return;
    }

    // Initially hide the product carousel section
    productCarouselSection.style.display = 'none';

    // Add click event to "How We Started" fabric curtain container to trigger unveiling
    fabricCurtainContainer.addEventListener('click', () => {
        if (isUnveiledStory) return;
        isUnveiledStory = true;

        // Add curtain open animation class
        fabricCurtainContainer.classList.add('curtain-open');

        // After animation ends, hide curtain elements and show carousel
        fabricCurtainContainer.addEventListener('animationend', () => {
            const curtainLeft = fabricCurtainContainer.querySelector('.curtain-left');
            const curtainRight = fabricCurtainContainer.querySelector('.curtain-right');
            if (curtainLeft) curtainLeft.style.display = 'none';
            if (curtainRight) curtainRight.style.display = 'none';

            productCarouselSection.style.display = 'block';
            startCarouselAutoPlay();
        }, { once: true });
    });

    // Carousel auto-play logic
    let animationFrameId;
    const scrollSpeed = 0.5; // pixels per frame

    function startCarouselAutoPlay() {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        // Initialize transform style to ensure getTranslateX works correctly
        carouselTrack.style.transform = 'translateX(0px)';

        // Start smooth continuous scroll only (no interval slide change)
        smoothScroll();
    }

    function smoothScroll() {
        // Horizontal carousel smooth scroll
        const totalWidth = carouselTrack.scrollWidth;
        const visibleWidth = carouselTrack.offsetWidth;
        let currentTransformX = getTranslateX(carouselTrack);
        currentTransformX -= scrollSpeed;

        // Debug logs
        console.log('currentTransformX:', currentTransformX, 'totalWidth:', totalWidth, 'visibleWidth:', visibleWidth);

        if (Math.abs(currentTransformX) >= (totalWidth - visibleWidth)) {
            currentTransformX = 0; // reset to start smoothly
        }
        carouselTrack.style.transform = `translateX(${currentTransformX}px)`;

        animationFrameId = requestAnimationFrame(smoothScroll);
    }

    function getTranslateX(element) {
        const style = window.getComputedStyle(element);
        if (style.transform === 'none') {
            return 0;
        }
        try {
            const matrix = new WebKitCSSMatrix(style.transform);
            return matrix.m41;
        } catch (e) {
            return 0;
        }
    }

    function getTranslateY(element) {
        const style = window.getComputedStyle(element);
        const matrix = new WebKitCSSMatrix(style.transform);
        return matrix.m42;
    }

    // Optional: Pause autoplay on mouse enter and resume on mouse leave
    productCarouselSection.addEventListener('mouseenter', () => {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    });

    productCarouselSection.addEventListener('mouseleave', () => {
        startCarouselAutoPlay();
    });

    // Optional: Pause autoplay on mouse enter and resume on mouse leave
    productCarouselSection.addEventListener('mouseenter', () => {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    });

    productCarouselSection.addEventListener('mouseleave', () => {
        startCarouselAutoPlay();
    });

    // Carousel slide control
    let currentSlide = 0;
    const slides = carouselTrack.children;
    const totalSlides = slides.length;

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth;
        carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
});
