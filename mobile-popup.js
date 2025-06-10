// Mobile popup detection and display script
// Using a simpler approach with direct DOM manipulation

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if the user is on a mobile device
    function isMobile() {
        // Check user agent for mobile devices
        const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Check screen width (anything under 650px is considered mobile)
        const mobileWidth = window.innerWidth <= 650;
        
        console.log('Mobile detection - UserAgent:', mobileUserAgent, 'Width:', window.innerWidth);
        
        return mobileUserAgent || mobileWidth;
    }
    
    // Only proceed if on mobile
    if (isMobile()) {
        console.log('Mobile device detected, showing popup');
        
        // Create the popup elements
        const popup = document.createElement('div');
        popup.className = 'mobile-popup';
        popup.id = 'mobilePopup';
        
        popup.innerHTML = `
            <div class="mobile-popup-content">
                <h3>Optimal Viewing Experience</h3>
                <p>For the best experience, please view this website on a desktop or laptop computer, or in full screen mode if you're on a smaller device.</p>
                <button id="mobilePopupClose">Continue Anyway</button>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(popup);
        
        // Set initial opacity to 0
        popup.style.opacity = '0';
        
        // Show popup after a short delay
        setTimeout(function() {
            popup.style.opacity = '1';
            
            // Set up the close button with direct event handler
            const closeButton = document.getElementById('mobilePopupClose');
            if (closeButton) {
                // Make sure the button is very clickable
                closeButton.style.cursor = 'pointer';
                closeButton.style.position = 'relative';
                closeButton.style.zIndex = '10000';
                closeButton.style.userSelect = 'none';
                
                // Add click event with both standard and touch events
                ['click', 'touchend'].forEach(function(evt) {
                    closeButton.addEventListener(evt, function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Close button clicked/touched');
                        
                        // Hide popup
                        popup.style.opacity = '0';
                        
                        // Remove from DOM after transition
                        setTimeout(function() {
                            if (popup.parentNode) {
                                popup.parentNode.removeChild(popup);
                                console.log('Popup removed');
                            }
                        }, 300);
                        
                        return false;
                    });
                });
            }
        }, 300);
    }
});

// Backup check on window load
window.addEventListener('load', function() {
    // If popup doesn't exist yet and we're on mobile, create it
    if (!document.getElementById('mobilePopup') && 
        (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         window.innerWidth <= 650)) {
        
        // Create popup with simpler approach
        const popup = document.createElement('div');
        popup.className = 'mobile-popup';
        popup.id = 'mobilePopup';
        popup.style.opacity = '1'; // Make visible immediately
        
        popup.innerHTML = `
            <div class="mobile-popup-content">
                <h3>Optimal Viewing Experience</h3>
                <p>For the best experience, please view this website on a desktop or laptop computer, or in full screen mode if you're on a smaller device.</p>
                <button id="mobilePopupCloseBackup">Continue Anyway</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Set up close button immediately
        const closeButton = document.getElementById('mobilePopupCloseBackup');
        if (closeButton) {
            closeButton.onclick = function() {
                popup.style.opacity = '0';
                setTimeout(function() {
                    document.body.removeChild(popup);
                }, 300);
            };
        }
    }
});
