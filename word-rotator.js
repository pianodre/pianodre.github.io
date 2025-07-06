document.addEventListener('DOMContentLoaded', function() {
    // Complete phrases to cycle through
    const phrases = [
        { prefix: 'Cyber', highlight: 'security', suffix: ' on your terms' },
        { prefix: 'Cyber', highlight: ' insurance', suffix: ' on your terms' },
        { prefix: 'Cyber', highlight: ' infrastructure', suffix: ' on your terms' },
        { prefix: 'Cyber', highlight: ' support/IT', suffix: ' on your terms' }
    ];
    let currentIndex = 0;
    const taglineContainer = document.getElementById('tagline-container');
    
    // Remove any existing content to prevent duplication
    taglineContainer.innerHTML = '';
    
    // Initial setup
    function setupInitialPhrase() {
        const currentPhrase = phrases[currentIndex];
        
        // Create the structure
        const prefixSpan = document.createElement('span');
        prefixSpan.className = 'tagline-static';
        
        const highlightSpan = document.createElement('span');
        highlightSpan.className = 'highlight-security';
        
        const suffixSpan = document.createElement('span');
        suffixSpan.className = 'tagline-static';
        
        taglineContainer.appendChild(prefixSpan);
        taglineContainer.appendChild(highlightSpan);
        taglineContainer.appendChild(suffixSpan);
        
        // Add letters with initial animation
        addLettersToSpan(currentPhrase.prefix, prefixSpan, true);
        addLettersToSpan(currentPhrase.highlight, highlightSpan, true);
        addLettersToSpan(currentPhrase.suffix, suffixSpan, true);
    }
    
    // Add letters to a span element
    function addLettersToSpan(text, spanElement, animate) {
        // Preserve whitespace by adding a non-breaking space when text starts with a space
        if (text.startsWith(' ')) {
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'letter space';
            spaceSpan.innerHTML = '&nbsp;';
            spaceSpan.style.display = 'inline-block';
            spaceSpan.style.width = '0.3em';
            spanElement.appendChild(spaceSpan);
            // Remove the leading space from text for processing
            text = text.substring(1);
        }
        
        for (let i = 0; i < text.length; i++) {
            const letterSpan = document.createElement('span');
            letterSpan.className = 'letter';
            letterSpan.textContent = text[i];
            letterSpan.style.display = 'inline-block';
            letterSpan.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            if (animate) {
                letterSpan.style.transform = 'rotate(360deg) scale(0)';
                setTimeout(() => {
                    letterSpan.style.transform = 'rotate(0deg) scale(1)';
                }, i * 40);
            } else {
                letterSpan.style.transform = 'rotate(0deg) scale(1)';
            }
            
            spanElement.appendChild(letterSpan);
        }
    }
    
    // Function to update the phrase with spiral animation
    function updatePhrase() {
        // Get the next phrase
        currentIndex = (currentIndex + 1) % phrases.length;
        const nextPhrase = phrases[currentIndex];
        
        // Get the current spans
        const spans = taglineContainer.children;
        const prefixSpan = spans[0];
        const highlightSpan = spans[1];
        const suffixSpan = spans[2];
        
        // Animate out current letters
        const allLetters = taglineContainer.querySelectorAll('.letter');
        allLetters.forEach((letter) => {
            // Only modify transform, not opacity
            letter.style.transform = `rotate(${Math.random() * 720 - 360}deg) scale(0)`;
        });
        
        // After letters have spun out, update content
        setTimeout(() => {
            // Clear spans
            prefixSpan.innerHTML = '';
            highlightSpan.innerHTML = '';
            suffixSpan.innerHTML = '';
            
            // Add new letters
            addLettersToSpan(nextPhrase.prefix, prefixSpan, true);
            addLettersToSpan(nextPhrase.highlight, highlightSpan, true);
            addLettersToSpan(nextPhrase.suffix, suffixSpan, true);
        }, 500); // Wait for spin-out animation to complete
    }
    
    // Initialize
    setupInitialPhrase();
    
    // Start the rotation
    setInterval(updatePhrase, 5000); // Change phrase every 5 seconds
});

