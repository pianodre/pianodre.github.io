// Function to load and insert the footer
async function loadFooter() {
    try {
        // Add cache-busting parameter to prevent caching
        const timestamp = new Date().getTime();
        const response = await fetch(`footer.html?v=${timestamp}`);
        const footerContent = await response.text();
        document.body.insertAdjacentHTML('beforeend', footerContent);
    } catch (error) {
        console.error('Error loading footer:', error);
    }
}

// Load footer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
});