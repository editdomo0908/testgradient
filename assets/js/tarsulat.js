  //////////////////////////
// script.js
let lastScrollTop = 0; // Variable to keep track of the last scroll position
const groupImage = document.getElementById('groupImage2');

// Set the initial opacity
window.addEventListener('load', function() {
    groupImage.style.opacity = 0.3; // Initial opacity

    // Function to handle scroll event
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Get current scroll position

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            groupImage.style.opacity = 0.7; // Set opacity to 0.6
        } else {
            // Scrolling up
            groupImage.style.opacity = 0.4; // Set opacity back to 0.3
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Update last scroll position
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});


/////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const cardsRows = document.querySelectorAll('#company .col');
    const windowHeight = window.innerHeight; // Get the height of the window
    let triggeredRows = 0; // To keep track of which rows have been triggered

    // Function to check scroll position
    function checkScroll() {
        const scrollPosition = window.scrollY; // Get the current scroll position

        // Define trigger points based on the window height
        const triggerPoint1 = windowHeight / 2; // First trigger point (show first 3 cards)
        const triggerPoint2 = triggerPoint1 + 300; // Second trigger point (show next 3 cards)
        const triggerPoint3 = triggerPoint2 + 300; // Third trigger point (show last 3 cards)

        // Check if the user has scrolled past the first trigger point
        if (scrollPosition >= triggerPoint1 && triggeredRows === 0) {
            cardsRows.forEach((card, index) => {
                if (index < 3) { // Only apply to the first 3 cards
                    card.classList.add('visible'); // Add class to trigger animation
                }
            });
            triggeredRows = 1; // Update the triggered row count
        }

        // Check if the user has scrolled past the second trigger point
        else if (scrollPosition >= triggerPoint2 && triggeredRows === 1) {
            cardsRows.forEach((card, index) => {
                if (index >= 3 && index < 6) { // Next 3 cards
                    card.classList.add('visible'); // Add class to trigger animation
                }
            });
            triggeredRows = 2; // Update the triggered row count
        }

        // Check if the user has scrolled past the third trigger point
        else if (scrollPosition >= triggerPoint3 && triggeredRows === 2) {
            cardsRows.forEach((card, index) => {
                if (index >= 6) { // Last 3 cards
                    card.classList.add('visible'); // Add class to trigger animation
                }
            });
            triggeredRows = 3; // Update the triggered row count
        }

        // Handle scrolling back up to reveal the cards again
        if (scrollPosition < triggerPoint1 && triggeredRows > 0) {
            cardsRows.forEach((card, index) => {
                if (index < 3) { // First 3 cards
                    card.classList.remove('visible'); // Remove class to reset animation
                }
            });
            triggeredRows = 0; // Reset the triggered row count
        } else if (scrollPosition < triggerPoint2 && triggeredRows > 1) {
            cardsRows.forEach((card, index) => {
                if (index >= 3 && index < 6) { // Next 3 cards
                    card.classList.remove('visible'); // Remove class to reset animation
                }
            });
            triggeredRows = 1; // Update the triggered row count
        } else if (scrollPosition < triggerPoint3 && triggeredRows > 2) {
            cardsRows.forEach((card, index) => {
                if (index >= 6) { // Last 3 cards
                    card.classList.remove('visible'); // Remove class to reset animation
                }
            });
            triggeredRows = 2; // Update the triggered row count
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', checkScroll);
});
