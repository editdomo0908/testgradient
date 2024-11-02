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
    const cards = document.querySelectorAll('.swim-in');
    const windowHeight = window.innerHeight; // Get the height of the window

    // Function to check scroll position
    function checkScroll() {
        const scrollPosition = window.scrollY; // Get the current scroll position
        
        // If the user has scrolled down at least half the window height
        if (scrollPosition >= windowHeight / 2 + 300) {
            cards.forEach(card => {
                card.classList.add('visible'); // Add class to trigger animation
            });
            window.removeEventListener('scroll', checkScroll); // Remove listener after triggering
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', checkScroll);
});
