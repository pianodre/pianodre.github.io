document.addEventListener('DOMContentLoaded', function() {
    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in view
            if (entry.isIntersecting) {
                // Get the delay from the data attribute
                const delay = parseFloat(entry.target.getAttribute('data-delay') || 0);
                
                // Add the revealed class after the specified delay
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay * 1000);
                
                // Stop observing the element after it's been revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Element is considered in view when it's just barely visible
        threshold: 0.01,
        // Add a small rootMargin to trigger even before the element enters the viewport
        rootMargin: '0px 0px 20px 0px'
    });

    // Observe all elements with the reveal-element class
    document.querySelectorAll('.reveal-element').forEach(element => {
        observer.observe(element);
    });
});
