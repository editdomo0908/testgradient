document.addEventListener('DOMContentLoaded', function () {
    const circle = document.querySelector('.gradient-circle');
    const mainTitle = document.querySelector('.logo-text .main-title');
    const subtitle = document.querySelector('.logo-text .subtitle');
    const locationText = document.querySelector('.logo-text .location');

    const colors = ['#562648', '#a8a8a8', '#777eade3', '#a8a8a8', '#a99047', '#a99047'];
    const colorCount = colors.length;

    let maxSize, minSize, initialSize;
    const initialTop = 100; // Fixed top position
    let initialLeft; // This will be set based on screen size
    let shrunkLeft; // Position for the shrunk circle
    let isMinSizeReached = false; // Track if min size has been reached

    const originalFontSizes = {
        mainTitle: parseFloat(window.getComputedStyle(mainTitle).fontSize),
        subtitle: parseFloat(window.getComputedStyle(subtitle).fontSize),
        location: parseFloat(window.getComputedStyle(locationText).fontSize),
    };

    function updateSizes() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 500) {
            maxSize = 180; minSize = 120; initialLeft = 250; shrunkLeft = 250; // Adjust shrunk position for small screens
        } else if (windowWidth < 750) {
            maxSize = 200; minSize = 150; initialLeft = 250; shrunkLeft = 350; // Adjust shrunk position for medium screens
        } else if (windowWidth < 1000) {
            maxSize = 250; minSize = 150; initialLeft = 500; shrunkLeft = 700; // Adjust shrunk position for larger screens
        } else if (windowWidth < 1440) {
            maxSize = 300; minSize = 150; initialLeft = 600; shrunkLeft = 900; // Adjust shrunk position for large screens
        } else {
            maxSize = 350; minSize = 150; initialLeft = 800; shrunkLeft = 1250; // Adjust shrunk position for extra large screens
        }
        initialSize = maxSize;
        repositionCircle();
    }

    function handleScroll() {
        const windowHeight = window.innerHeight;
        let scrollPosition = Math.min(window.scrollY, document.documentElement.scrollHeight - windowHeight);

        const index = Math.floor(scrollPosition / (windowHeight / colorCount)) % colorCount;
        const gradientColors = colors.slice(index, index + 5).concat(colors.slice(0, Math.max(0, index + 5 - colorCount))).join(', ');
        circle.style.background = `linear-gradient(90deg, ${gradientColors})`;

        let newSize = maxSize - (scrollPosition / 300) * (maxSize - minSize);
        newSize = Math.max(minSize, Math.min(newSize, maxSize));

        // Check if the minimum size has been reached
        if (newSize === minSize) {
            if (!isMinSizeReached) {
                isMinSizeReached = true; // Set flag to true when min size is reached
                // Move circle to the calculated shrunk left position with a smooth transition
                circle.style.transition = 'left 0.5s ease'; // Add transition effect
                circle.style.left = `${shrunkLeft}px`; // Move circle to the calculated shrunk left position
            }
        } else {
            isMinSizeReached = false; // Reset flag if not at min size
            circle.style.transition = 'left 0.5s ease'; // Ensure there's a transition for the return
            circle.style.left = `${initialLeft}px`; // Reset to initial left position
        }

        adjustCircleSize(newSize);
    }

    function adjustCircleSize(newSize) {
        circle.style.position = 'fixed'; // Keep the circle in a fixed position
        circle.style.top = `${initialTop}px`; // Maintain the top position
        circle.style.width = `${newSize}px`;
        circle.style.height = `${newSize}px`;
        
        // Update font sizes as the circle size changes
        updateFontSizes(newSize);
    }

    function updateFontSizes(newSize) {
        const shrinkFactor = newSize / initialSize;
        mainTitle.style.fontSize = `${Math.max(originalFontSizes.mainTitle * shrinkFactor, 14)}px`;
        subtitle.style.fontSize = `${Math.max(originalFontSizes.subtitle * shrinkFactor, 10)}px`;
        locationText.style.fontSize = `${Math.max(originalFontSizes.location * shrinkFactor, 12)}px`;
    }

    function repositionCircle() {
        circle.style.position = 'fixed'; // Fix the position of the circle
        circle.style.left = `${initialLeft}px`; // Set fixed left position
        circle.style.top = `${initialTop}px`; // Keep fixed top position
        circle.style.width = `${initialSize}px`; // Set the size
        circle.style.height = `${initialSize}px`; // Set the size
        
        // Update font sizes for initial positioning
        updateFontSizes(initialSize);
    }

    // Show the circle after a short delay
    circle.classList.remove('visible'); // Initially hidden
    setTimeout(() => {
        circle.classList.add('visible'); // Add visible class after delay
        adjustCircleSize(initialSize); // Set the initial size and update font sizes
    }, 100); // Delay in milliseconds

    updateSizes();

    // Debounce resize event
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSizes(); // Adjust size based on new window size
            handleScroll(); // Adjust for scrolling
        }, 100); // Adjust delay as needed
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set the correct sizes
});


//////////////////////////////////////////////////////////
//INTRO TEXTS //////

// Select elements
const aboutTitle = document.getElementById('aboutTitle');
const heading1 = document.getElementById('heading1');
const heading2 = document.getElementById('heading2');
const groupImage = document.querySelector('.group-img');
const visionSection = document.getElementById('vision-section');
const portfolioSection = document.querySelector('.portfolio');

// Track visibility state
let portfolioVisible = false;

// Function to handle scroll events
function handleScroll() {
    const sectionTop = visionSection.getBoundingClientRect().top;
    const portfolioTop = portfolioSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Check if the vision section is in the viewport
    if (sectionTop < windowHeight && sectionTop > 0) {
        // Fade in "Rólunk" when the vision section is partially visible
        if (sectionTop < windowHeight / 2 && aboutTitle.classList.contains('hidden')) {
            aboutTitle.classList.remove('hidden');
            aboutTitle.classList.add('visible');
        }

        // Determine scroll progress within the vision section
        const scrollProgress = (windowHeight - sectionTop) / windowHeight;

        // Fade in heading1 and group image at appropriate scroll progress
        if (scrollProgress > 0.3 && scrollProgress <= 0.9) {
            if (heading1.classList.contains('hidden')) {
                heading1.classList.remove('hidden');
                heading1.classList.add('visible');
            }

            if (groupImage.classList.contains('hidden')) {
                groupImage.classList.remove('hidden');
                groupImage.classList.add('visible');
            }

            // Ensure heading2 is hidden during this phase
            if (heading2.classList.contains('visible')) {
                heading2.classList.remove('visible');
                heading2.classList.add('hidden');
            }
        }

        // Fade in heading2 when heading1 and group image are fully visible
        if (scrollProgress > 0.9) {
            if (heading2.classList.contains('hidden')) {
                heading2.classList.remove('hidden');
                heading2.classList.add('visible');
            }

            if (heading1.classList.contains('visible')) {
                heading1.classList.remove('visible');
                heading1.classList.add('hidden');
            }
        }
    }

    // Fade out all elements as soon as the portfolio section becomes visible
    if (portfolioTop < windowHeight && !portfolioVisible) {
        // Mark portfolio as visible
        portfolioVisible = true;

        // Fade out all visible elements
        [aboutTitle, heading1, heading2, groupImage].forEach((el) => {
            if (el.classList.contains('visible')) {
                el.classList.remove('visible');
                el.classList.add('hidden');
            }
        });
    }

    // Fade elements back in when scrolling up and the portfolio section is no longer visible
    if (portfolioTop + 100  >= windowHeight && portfolioVisible) {
        // Mark portfolio as not visible
        portfolioVisible = false;

        // Fade in heading2 and groupImage, then heading1 as user scrolls up
        if (heading2.classList.contains('hidden')) {
            heading2.classList.remove('hidden');
            heading2.classList.add('visible');
        }

        if (groupImage.classList.contains('hidden')) {
            groupImage.classList.remove('hidden');
            groupImage.classList.add('visible');
        }

        // Hide heading1 on scroll up to maintain sequence until user fully scrolls up to previous trigger points
        if (!heading1.classList.contains('hidden')) {
            heading1.classList.add('hidden');
        }
    }
}

// Event listener for scroll events
window.addEventListener('scroll', handleScroll);



////////WAVE////////////////////////////////    

// Select both wave elements
const wave1 = document.querySelector('.wave1');
const wave2 = document.querySelector('.wave2');

// Element to act as the trigger (e.g., start of the second section)
const triggerElement = document.querySelector('#productions');

// Function to animate both waves
function animateBothWaves() {
  // Apply the animation to both waves
  wave1.style.transform = 'scale(1.2) translateX(00px)';
  wave1.style.fill = '#777ead';
  wave2.style.transform = 'scale(1.2) translateX(0px)';
  wave2.style.fill = '#777ead';

  // Reset after 2 seconds
  setTimeout(() => {
    wave1.style.transform = 'scale(1) translateX(0px)';
    wave1.style.fill = '#000000';
    wave2.style.transform = 'scale(1) translateX(0px)';
    wave2.style.fill = '#000000';
  }, 2000);
}

// Observer to watch the trigger element
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateBothWaves();
    }
  });
}, {
  root: null,
  threshold: 0.1 // Adjust as needed
});

// Start observing the trigger element
observer.observe(triggerElement);




////////////////////////////////////////
///FILTERING

// Function to filter items by data-id
function filterById(id) {
    const items = document.querySelectorAll('.choice');
    
    items.forEach(item => {
      // Check if item data-id matches the selected id
      if (item.getAttribute('data-id') === id.toString()) {
        item.style.display = 'block';  // Show matching items
      } else {
        item.style.display = 'none';  // Hide non-matching items
      }
    });
  }
  
  // Function to show all items
  function showAll() {
    const items = document.querySelectorAll('.choice');
    
    items.forEach(item => {
      item.style.display = 'block';  // Show all items
    });
  }
  


////////////////////////////////POP_UP


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




//////////////////POP UP FILTER

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
