document.addEventListener('DOMContentLoaded', function () {
    const circle = document.querySelector('.gradient-circle');
    const mainTitle = document.querySelector('.logo-text .main-title');
    const subtitle = document.querySelector('.logo-text .subtitle');
    const locationText = document.querySelector('.logo-text .location');

    const colors = ['#878ca9','#A09ABC','#DCE0D9','#B6A6CA','#BC9FA9', '#D0B3C5' ];
    const colorCount = colors.length;

    let maxSize, minSize, initialSize;
    const initialTop = 130;
    let initialLeft;
    let shrunkLeft;
    let isMinSizeReached = false;
    let isLeftReset = false;  // Track when the circle has moved back to initial left

    const originalFontSizes = {
        mainTitle: parseFloat(window.getComputedStyle(mainTitle).fontSize),
        subtitle: parseFloat(window.getComputedStyle(subtitle).fontSize),
        location: parseFloat(window.getComputedStyle(locationText).fontSize),
    };

    function updateSizes() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 400) {
            maxSize = 150; minSize = 120; initialLeft = 180; shrunkLeft = 230;
        } else if (windowWidth < 550) {
            maxSize = 180; minSize = 120; initialLeft = 280; shrunkLeft = 280;
        } else if (windowWidth < 750) {
            maxSize = 200; minSize = 150; initialLeft = 250; shrunkLeft = 250;
        } else if (windowWidth < 1000) {
            maxSize = 250; minSize = 150; initialLeft = 500; shrunkLeft = 700;
        } else if (windowWidth < 1440) {
            maxSize = 300; minSize = 150; initialLeft = 600; shrunkLeft = 900;
        } else {
            maxSize = 350; minSize = 150; initialLeft = 800; shrunkLeft = 1250;
        }
        initialSize = maxSize;
        repositionCircle();
    }

    function handleScroll() {
        const windowHeight = window.innerHeight;
        const scrollPosition = Math.min(window.scrollY, document.documentElement.scrollHeight - windowHeight);

        const index = Math.floor(scrollPosition / (windowHeight / colorCount)) % colorCount;
        const gradientColors = colors.slice(index, index + 5).concat(colors.slice(0, Math.max(0, index + 5 - colorCount))).join(', ');
        circle.style.background = `linear-gradient(90deg, ${gradientColors})`;

        let newSize = maxSize - (scrollPosition / 300) * (maxSize - minSize);
        newSize = Math.max(minSize, Math.min(newSize, maxSize));

        const triggerPosition = windowHeight / 3;

        if (scrollPosition >= 300) {
            // Shrink to minimum size and move to shrunkLeft when scrolling down
            if (!isMinSizeReached) {
                isMinSizeReached = true;
                isLeftReset = false; // Reset left tracking
                circle.style.transition = 'left 0.5s ease';
                circle.style.left = `${shrunkLeft}px`;
            }
        } else {
            // Start moving back to initialLeft only when the scroll position is close enough to the top (1/3 of window height from the top)
            if (isMinSizeReached && scrollPosition <= triggerPosition && !isLeftReset) {
                isMinSizeReached = false;
                isLeftReset = true; // Set left reset to true once it's back to the initial position
                circle.style.transition = 'left 0.5s ease';
                circle.style.left = `${initialLeft}px`;
            }

            // Begin expanding to max size only after reaching initialLeft and once it's scrolled up within 130px of the top
            if (isLeftReset && scrollPosition <= initialTop) {
                newSize = maxSize;
            }
        }

        adjustCircleSize(newSize);
    }

    function adjustCircleSize(newSize) {
        circle.style.position = 'fixed';
        circle.style.top = `${initialTop}px`;
        circle.style.width = `${newSize}px`;
        circle.style.height = `${newSize}px`;
        updateFontSizes(newSize);
    }

    function updateFontSizes(newSize) {
        const shrinkFactor = newSize / initialSize;
        mainTitle.style.fontSize = `${Math.max(originalFontSizes.mainTitle * shrinkFactor, 14)}px`;
        subtitle.style.fontSize = `${Math.max(originalFontSizes.subtitle * shrinkFactor, 10)}px`;
        locationText.style.fontSize = `${Math.max(originalFontSizes.location * shrinkFactor, 12)}px`;
    }

    function repositionCircle() {
        circle.style.position = 'fixed';
        circle.style.left = `${initialLeft}px`;
        circle.style.top = `${initialTop}px`;
        circle.style.width = `${initialSize}px`;
        circle.style.height = `${initialSize}px`;
        updateFontSizes(initialSize);
    }

    circle.classList.remove('visible');
    setTimeout(() => {
        circle.classList.add('visible');
        adjustCircleSize(initialSize);
    }, 100);

    updateSizes();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSizes();
            handleScroll();
        }, 100);
    });

    // Throttle scroll event handler for better performance
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScroll >= 50) { // Throttle for every 50ms
            handleScroll();
            lastScroll = now;
        }
    });

    handleScroll();
});


//////////////////////////////////////////////////////////// Select elements
// Select elements
const aboutTitle = document.getElementById('aboutTitle');
const heading1 = document.getElementById('heading1');
const heading2 = document.getElementById('heading2');
const groupImage = document.querySelector('.group-img');
const visionSection = document.getElementById('vision-section');
const portfolioSection = document.querySelector('.portfolio');

// Track visibility state
let portfolioVisible = false;

// Function to reset visibility classes
function resetVisibility() {
    [aboutTitle, heading1, heading2, groupImage].forEach((el) => {
        el.classList.remove('visible', 'visible-blur');
        el.classList.add('hidden');
        el.dataset.visible = "false";
    });
}

// Function to handle scroll events
function handleScroll() {
    const sectionTop = visionSection.getBoundingClientRect().top;
    const portfolioTop = portfolioSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Reset animations when scrolled back to the top
    if (window.scrollY === 0) {
        resetVisibility();
        portfolioVisible = false;
        return;
    }

    // Check if the vision section is in the viewport
    if (sectionTop < windowHeight && sectionTop > 0) {
        // Fade in aboutTitle as soon as the vision section becomes visible
        if (aboutTitle.classList.contains('hidden')) {
            aboutTitle.classList.remove('hidden');
            aboutTitle.classList.add('visible');
            aboutTitle.dataset.visible = "true";
        }

        // Determine scroll progress within the vision section
        const scrollProgress = (windowHeight - sectionTop) / windowHeight;

        // Fade in heading1 and delay groupImage for a slower fade-in effect
        if (scrollProgress > 0.3 && scrollProgress <= 0.95) {
            if (heading1.classList.contains('hidden')) {
                heading1.classList.remove('hidden');
                heading1.classList.add('visible');
                heading1.dataset.visible = "true";
            }

            // Ensure groupImage fades in after heading1
            setTimeout(() => {
                if (groupImage.classList.contains('hidden') && heading1.dataset.visible === "true") {
                    groupImage.classList.remove('hidden');
                    groupImage.classList.add('visible-blur');
                    groupImage.dataset.visible = "true";
                }
            }, 600); // Increased delay for a slower fade-in effect

            // Ensure heading2 is hidden during this phase
            if (heading2.classList.contains('visible')) {
                heading2.classList.remove('visible');
                heading2.classList.add('hidden');
                heading2.dataset.visible = "false";
            }
        }

        // Fade in heading2 when heading1 and groupImage are fully visible
        if (scrollProgress > 0.95) {
            if (heading2.classList.contains('hidden')) {
                heading2.classList.remove('hidden');
                heading2.classList.add('visible');
                heading2.dataset.visible = "true";
            }

            if (heading1.classList.contains('visible')) {
                heading1.classList.remove('visible');
                heading1.classList.add('hidden');
                heading1.dataset.visible = "false";
            }
        }
    }

    // Fade out all elements as soon as the portfolio section becomes visible
    if (portfolioTop < windowHeight && !portfolioVisible) {
        portfolioVisible = true;
        [aboutTitle, heading1, heading2, groupImage].forEach((el) => {
            el.classList.remove('visible', 'visible-blur');
            el.classList.add('hidden');
            el.dataset.visible = "false";
        });
    }

    // Fade elements back in when scrolling up and the portfolio section is no longer visible
    if (portfolioTop + 100 >= windowHeight && portfolioVisible) {
        portfolioVisible = false;

        if (heading2.classList.contains('hidden')) {
            heading2.classList.remove('hidden');
            heading2.classList.add('visible');
            heading2.dataset.visible = "true";
        }

        if (groupImage.classList.contains('hidden') || !groupImage.classList.contains('visible-blur')) {
            groupImage.classList.remove('hidden');
            setTimeout(() => {
                groupImage.classList.add('visible-blur');
                groupImage.dataset.visible = "true";
            }, 600); // Consistent delay when scrolling up
        }

        if (!heading1.classList.contains('hidden')) {
            heading1.classList.add('hidden');
            heading1.dataset.visible = "false";
        }
    }
}

// Initial visibility setup for elements
resetVisibility();

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
  wave1.style.fill = '#370926';
  wave2.style.transform = 'scale(1.2) translateX(0px)';
  wave2.style.fill = '#370926';

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
///FILTERING on landing page

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
