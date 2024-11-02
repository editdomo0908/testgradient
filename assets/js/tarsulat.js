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
    const cards = document.querySelectorAll('#company .col');
    const windowHeight = window.innerHeight; // Get the height of the window

    // Function to check scroll position
    function checkScroll() {
        const scrollPosition = window.scrollY; // Get the current scroll position

        if (window.innerWidth >= 768) { // For larger screens
            // Trigger animation for each row
            cards.forEach((card, index) => {
                const rowIndex = Math.floor(index / 3); // Adjust row index for 3 columns per row
                const triggerPoint = (rowIndex + 1) * 300; // Trigger each row after scrolling 300px
                
                // Check for scroll down
                if (scrollPosition >= triggerPoint && !card.classList.contains('visible')) {
                    card.classList.add('visible'); // Add class to trigger animation
                }

                // Check for scroll up
                if (scrollPosition < triggerPoint && card.classList.contains('visible')) {
                    card.classList.remove('visible'); // Remove class to reset animation
                }
            });
        } else { // For mobile screens
            cards.forEach((card, index) => {
                const triggerPoint = (index + 1) * 450; // Each card triggers 200px after the previous one
                
                // Check for scroll down
                if (scrollPosition >= triggerPoint - (windowHeight / 2) && !card.classList.contains('visible')) {
                    card.classList.add('visible'); // Add class to trigger animation
                }

                // Check for scroll up
                if (scrollPosition < triggerPoint - (windowHeight / 2) && card.classList.contains('visible')) {
                    card.classList.remove('visible'); // Remove class to reset animation
                }
            });
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', checkScroll);

    // Trigger initial animation for cards based on window size
    window.dispatchEvent(new Event('scroll'));
});
