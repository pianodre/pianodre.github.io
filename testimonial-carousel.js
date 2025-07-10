document.addEventListener('DOMContentLoaded', function() {
    // Get all testimonial slides
    const slides = document.querySelectorAll('.testimonial-slide');
    let isAnimating = false;
    
    // Set up click handlers for all prev/next buttons
    document.querySelectorAll('.testimonial-arrow').forEach(arrow => {
        arrow.addEventListener('click', function() {
            // Prevent rapid clicking
            if (isAnimating) return;
            isAnimating = true;
            
            // Find the currently active slide
            const activeSlide = document.querySelector('.testimonial-slide.active');
            let nextSlide;
            
            // Determine which slide to show next based on arrow direction
            if (this.classList.contains('prev-arrow')) {
                // Go to previous slide or loop to the last slide
                nextSlide = activeSlide.previousElementSibling || slides[slides.length - 1];
            } else {
                // Go to next slide or loop to the first slide
                nextSlide = activeSlide.nextElementSibling || slides[0];
            }
            
            // Get the content elements
            const activeContent = activeSlide.querySelector('.testimonial-content');
            const nextContent = nextSlide.querySelector('.testimonial-content');
            
            // Get the reviewer name elements
            const activeReviewerName = activeSlide.querySelector('.reviewer-name');
            const nextReviewerName = nextSlide.querySelector('.reviewer-name');
            
            // Fade out the active content and reviewer name
            activeContent.style.opacity = '0';
            activeContent.style.transition = 'opacity 0.3s';
            activeReviewerName.style.opacity = '0';
            activeReviewerName.style.transition = 'opacity 0.3s';
            
            // After content fades out, switch slides without animation and fade in new content
            setTimeout(() => {
                // Hide the current slide without animation
                activeSlide.style.display = 'none';
                activeSlide.classList.remove('active');
                
                // Show the next slide without animation
                nextSlide.style.display = 'block';
                nextSlide.classList.add('active');
                nextContent.style.opacity = '0';
                
                // Force browser to recognize the new state before fading in
                setTimeout(() => {
                    nextContent.style.opacity = '1';
                    nextContent.style.transition = 'opacity 0.3s';
                    nextReviewerName.style.opacity = '1';
                    nextReviewerName.style.transition = 'opacity 0.3s';
                    
                    // Reset animation flag after transition completes
                    setTimeout(() => {
                        isAnimating = false;
                        // Reset display property to use CSS rules
                        activeSlide.style.display = '';
                    }, 300);
                }, 10);
            }, 300);
        });
    });
    
    // Initialize all content elements to be visible
    document.querySelectorAll('.testimonial-content, .reviewer-name').forEach(element => {
        element.style.opacity = '1';
        element.style.transition = 'opacity 0.3s';
    });
});
