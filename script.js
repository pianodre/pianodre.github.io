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

// Load navigation when the page loads
document.addEventListener('DOMContentLoaded', loadNavigation);
