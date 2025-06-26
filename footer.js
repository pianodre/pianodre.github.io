// Function to load and insert the footer
async function loadFooter() {
    try {
        // Add cache-busting parameter to prevent caching
        const timestamp = new Date().getTime();
        const response = await fetch(`footer.html?v=${timestamp}`);
        const footerContent = await response.text();
        document.body.insertAdjacentHTML('beforeend', footerContent);
        
        // Initialize footer animations after it's loaded
        initFooterAnimations();
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Function to initialize footer animations
function initFooterAnimations() {
    // Wait a small amount of time to ensure the footer is in the DOM
    setTimeout(() => {
        const footerLeft = document.querySelector('.footer-left');
        const footerRight = document.querySelector('.footer-right');
        
        if (!footerLeft || !footerRight) return;
        
        // Create an Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If the element is in the viewport
                if (entry.isIntersecting) {
                    // Animate both sides simultaneously
                    if (entry.target === footerLeft) {
                        footerLeft.classList.add('animate');
                        footerRight.classList.add('animate');
                    }
                    
                    // Stop observing once it's animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // Trigger when at least 20% of the element is visible
        });
        
        // Observe the footer left element (we only need to observe one element)
        observer.observe(footerLeft);
    }, 300);
}

// Load footer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
});