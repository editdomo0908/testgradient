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
                const triggerPoint = (rowIndex + 1) * 350; // Trigger each row after scrolling 300px
                
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






////////////////////////////////POP_UP from landing //////////////////////////////////


// Get the popup, close button, and open link elements
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.close-popup-button');
const openPopupLink = document.getElementById('openPopupLink');

// Function to show the popup
openPopupLink.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default link behavior
  popup.style.display = 'flex'; // Show the popup
});

// Function to close the popup
closeButton.addEventListener('click', () => {
  popup.style.display = 'none'; // Hide the popup
});

// Optional: Close the popup when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none'; // Hide the popup if clicked outside
  }
});




//////////////////POP UP FILTER on CALENDAR //////////////////

// Function to filter cards by data-id
function filterById2(id) {
    const cards = document.querySelectorAll('.calendar-card');
    cards.forEach(card => {
      if (card.getAttribute('data-id') === String(id)) {
        card.style.display = 'block'; // Show the card if it matches the filter
      } else {
        card.style.display = 'none'; // Hide the card if it doesn't match
      }
    });
  }
  
  // Function to show all cards
  function showAll1() {
    const cards = document.querySelectorAll('.calendar-card');
    cards.forEach(card => {
      card.style.display = 'block'; // Show all cards
    });
  }
  
  ///////Calendar opens popup

  // Select the open and close buttons
const openPopupButton1 = document.getElementById('openPopupButton');
const closePopupButton1 = document.querySelector('.close-popup-button');
const popup1 = document.querySelector('.popup');

// Function to open the pop-up
openPopupButton1.addEventListener('click', function() {
    popup1.style.display = 'flex'; // Show the pop-up
});

// Function to close the pop-up
closePopupButton1.addEventListener('click', function() {
    popup1.style.display = 'none'; // Hide the pop-up
});

// Optional: Close pop-up when clicking outside of it
popup1.addEventListener('click', function(e) {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});
