// Function to load and insert the navigation bar
async function loadNavigation() {
    try {
        // Add cache-busting parameter to prevent caching
        const timestamp = new Date().getTime();
        const response = await fetch(`nav.html?v=${timestamp}`);
        const navContent = await response.text();
        document.body.insertAdjacentHTML('afterbegin', navContent);
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

// Initialize the technology partners carousel
function initTechCarousel() {
    const carousel = document.getElementById('techCarousel');
    const prevBtn = document.getElementById('techPrevBtn');
    const nextBtn = document.getElementById('techNextBtn');
    
    if (!carousel || !prevBtn || !nextBtn) return; // Exit if elements don't exist
    
    const partnerBoxes = carousel.querySelectorAll('.tech-partner-box');
    const boxWidth = partnerBoxes[0]?.offsetWidth || 0;
    const gap = 20; // Gap between items (should match CSS)
    const visibleItems = 4; // Number of items visible at once
    const scrollAmount = boxWidth + gap;
    let currentPosition = 0;
    const maxScroll = (partnerBoxes.length - visibleItems) * scrollAmount;
    
    // Update button visibility based on scroll position
    function updateButtonVisibility() {
        prevBtn.style.display = currentPosition <= 0 ? 'none' : 'flex';
        nextBtn.style.display = currentPosition >= maxScroll ? 'none' : 'flex';
    }
    
    // Initialize button visibility
    updateButtonVisibility();
    
    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        currentPosition = Math.max(0, currentPosition - scrollAmount);
        carousel.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
        });
        updateButtonVisibility();
    });
    
    // Next button click handler
    nextBtn.addEventListener('click', () => {
        currentPosition = Math.min(maxScroll, currentPosition + scrollAmount);
        carousel.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
        });
        updateButtonVisibility();
    });
    
    // Handle responsive changes
    window.addEventListener('resize', () => {
        // Recalculate dimensions on window resize
        const newBoxWidth = partnerBoxes[0]?.offsetWidth || 0;
        const newScrollAmount = newBoxWidth + gap;
        
        // Adjust for different number of visible items on different screen sizes
        let newVisibleItems = 4; // Default for desktop
        
        if (window.innerWidth <= 480) {
            newVisibleItems = 1;
        } else if (window.innerWidth <= 768) {
            newVisibleItems = 2;
        } else if (window.innerWidth <= 992) {
            newVisibleItems = 3;
        }
        
        const newMaxScroll = (partnerBoxes.length - newVisibleItems) * newScrollAmount;
        
        // Reset position if we're beyond the new max scroll
        if (currentPosition > newMaxScroll) {
            currentPosition = newMaxScroll;
            carousel.scrollTo({
                left: currentPosition,
                behavior: 'auto'
            });
        }
        
        updateButtonVisibility();
    });
}

// Function to set active navigation based on current page
function setActiveNavigation() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Wait for navigation to be loaded
    setTimeout(() => {
        // Get all navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        const dropdowns = document.querySelectorAll('.nav-links .dropdown');
        
        // Check each link
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
                
                // If this is inside a dropdown, mark the parent dropdown as active
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    parentDropdown.classList.add('active');
                }
            }
        });
        
        // Special case handling for sections
        if (currentPage === 'BlackCloak.html' || currentPage === 'seniors.html') {
            // Find the Cybersecurity dropdown
            const cyberSecDropdown = Array.from(dropdowns).find(dropdown => {
                return dropdown.querySelector('.dropbtn').textContent === 'Cybersecurity';
            });
            if (cyberSecDropdown) cyberSecDropdown.classList.add('active');
        }
        
        if (currentPage === 'cyber-insurance.html') {
            // Find the Cyber Insurance link
            const cyberInsLink = Array.from(document.querySelectorAll('.nav-links > a.nav-item')).find(link => {
                return link.textContent === 'Cyber Insurance';
            });
            if (cyberInsLink) cyberInsLink.classList.add('active');
        }
        
        if (currentPage === 'it-support.html') {
            // Find the IT Support link
            const itSupportLink = Array.from(document.querySelectorAll('.nav-links > a.nav-item')).find(link => {
                return link.textContent === 'IT Support';
            });
            if (itSupportLink) itSupportLink.classList.add('active');
        }
        
        if (currentPage === 'contact.html' || currentPage === 'quote.html') {
            // Find the Information dropdown
            const infoDropdown = Array.from(dropdowns).find(dropdown => {
                return dropdown.querySelector('.dropbtn').textContent === 'Information';
            });
            if (infoDropdown) infoDropdown.classList.add('active');
        }
    }, 100); // Small delay to ensure navigation is loaded
}

// Load navigation and initialize carousels when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadNavigation().then(() => {
        setActiveNavigation();
    });
    initTechCarousel();
});
