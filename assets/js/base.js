
document.addEventListener('DOMContentLoaded', function() {
    // Log for confirmation
    console.log('DOM fully loaded');

    // Show the loading container initially
    const loadingContainer = document.getElementById('loading-container');
    if (loadingContainer) {
        // Make sure the loading container is visible
        loadingContainer.style.display = 'block';
    }

    // Wait for 2 seconds before hiding the loading container and showing content
    setTimeout(function() {
        // Hide the loading container
        if (loadingContainer) {
            loadingContainer.style.display = 'none'; // Hide it
            loadingContainer.remove(); // Remove it from the DOM
        }

        // Show the content
        document.getElementById('content').style.display = 'block';
    });  // 2000 milliseconds (2 seconds)
});



////////////////////////////////////////////////////////////////
let circle1 = document.querySelector('.circle1');
let circle2 = document.querySelector('.circle2');

// Set specific initial colors using hex values or color names
const initialColorCircle1 = "#B6A6CA";  // Initial color for circle1 (Red)
const initialColorCircle2 = "#370926";  // Initial color for circle2 (Steel Blue)

// Set specific target colors using hex values or color names
const targetColorCircle1 = "#370926";   // Target color for circle1 (Yellow)
const targetColorCircle2 = "#B6A6CA";   // Target color for circle2 (Orange)

window.addEventListener('scroll', () => {
    let scrollValue = window.scrollY;

    // Size of the circles based on scroll value
    let size = 150 + scrollValue * 0.75;

    // Clip-path to update size of the circles
    circle1.style.clipPath = `circle(${size}px at 0 0)`;
    circle2.style.clipPath = `circle(${size}px at 100% 100%)`;

    // If the circles have started growing (scrollValue > 0), start changing the color
    if (scrollValue > 0) {
        // Calculate the scroll ratio (as a percentage of the total scrollable area)
        let scrollRatio = Math.min(scrollValue / document.body.scrollHeight, 1);

        // Interpolate between the initial and target colors for circle1
        let color1 = interpolateColors(initialColorCircle1, targetColorCircle1, scrollRatio);
        // Interpolate between the initial and target colors for circle2
        let color2 = interpolateColors(initialColorCircle2, targetColorCircle2, scrollRatio);

        // Update the background color of both circles
        circle1.style.backgroundColor = color1;
        circle2.style.backgroundColor = color2;
    }
});

// Helper function to interpolate between two colors (hex format)
function interpolateColors(colorStart, colorEnd, ratio) {
    // Convert hex color to RGB
    function hexToRgb(hex) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    }

    // Convert RGB to hex format
    function rgbToHex(r, g, b) {
        return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
    }

    // Get the RGB values for start and end colors
    let startColor = hexToRgb(colorStart);
    let endColor = hexToRgb(colorEnd);

    // Interpolate each RGB component
    let r = Math.round(startColor.r + (endColor.r - startColor.r) * ratio);
    let g = Math.round(startColor.g + (endColor.g - startColor.g) * ratio);
    let b = Math.round(startColor.b + (endColor.b - startColor.b) * ratio);

    // Return the resulting color as hex
    return rgbToHex(r, g, b);
}




//////////////////////////





document.addEventListener('DOMContentLoaded', function () {
    const circle = document.querySelector('.gradient-circle');
    const mainTitle = document.querySelector('.logo-text .main-title');
    const subtitle = document.querySelector('.logo-text .subtitle');
    const locationText = document.querySelector('.logo-text .location');

    const colors = ['#878ca9','#A09ABC','#DCE0D9','#B6A6CA','#BC9FA9', '#D0B3C5' ];
    const colorCount = colors.length;

    let maxSize, minSize, initialSize;
    const initialTop = 170;
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
            maxSize = 120; minSize = 100; initialLeft = 180; shrunkLeft = 200;
        } else if (windowWidth < 550) {
            maxSize = 120; minSize = 100; initialLeft = 280; shrunkLeft = 280;
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



////////////////////////////////////////////////////////////////vision


window.addEventListener('scroll', handleScrollAnimation);

let isScaled = false;  // Track if the image has scaled up
let hasFadedOut = false; // Track if the image and heading2 have faded out

function handleScrollAnimation() {
  const scrollPosition = window.scrollY + window.innerHeight;
  const visionSection = document.getElementById('vision-section');
  const portfolioSection = document.querySelector('.portfolio'); // Ensure this section exists in your HTML

  const visionTop = visionSection.offsetTop;
  const visionHeight = visionSection.offsetHeight;
  const portfolioTop = portfolioSection ? portfolioSection.offsetTop : Infinity;

  // Calculate scroll progress within the vision section
  const scrollProgress = (scrollPosition - visionTop) / visionHeight;

  const heading1 = document.getElementById('heading1');
  const heading2 = document.getElementById('heading2');
  const groupImage = document.getElementById('groupImage');

  // Handle animations when at the top of the page
  if (window.scrollY === 0) {
    heading1.classList.remove('visible');
    heading2.classList.remove('visible');
    groupImage.classList.remove('scaled');
    groupImage.classList.remove('normal');
    groupImage.classList.remove('visible');
    isScaled = false;
    hasFadedOut = false;
    return; // Exit early to avoid unnecessary checks
  }

  // Fade in heading1 and groupImage when scrolling down
  if (scrollProgress >= 0.3 && scrollProgress < 0.9) {
    heading1.classList.add('visible');
    groupImage.classList.add('visible');
    heading2.classList.remove('visible');
    groupImage.classList.remove('scaled');
    groupImage.classList.add('normal');
  } else if (scrollProgress >= 0.7 && scrollProgress < 1) {
    // Fade in heading2, start scaling image and reduce opacity
    heading1.classList.remove('visible');
    heading2.classList.add('visible');
    groupImage.classList.remove('normal');
    groupImage.classList.add('scaled');
  }

  // Keep the image scaled up after passing the breakpoint (scrollProgress >= 0.8)
  if (scrollProgress >= 0.9 && !isScaled) {
    isScaled = true;  // Mark that the image has scaled up
    groupImage.classList.add('scaled');
    heading2.classList.add('visible');
  }

  // If scrolling back up, reverse scaling and reappear heading1
  if (scrollPosition < portfolioTop && isScaled && scrollProgress < 0.6) {
    // Ensure image only shrinks back after passing the portfolio section
    groupImage.classList.remove('scaled');
    groupImage.classList.add('normal');
    heading1.classList.add('visible');
    heading2.classList.remove('visible');
    isScaled = false;  // Reset scaling state
  }

  // When entering the portfolio section, fade everything out (except image scale)
  if (scrollPosition >= portfolioTop) {
    heading2.classList.remove('visible');
    groupImage.classList.add('hidden');
    groupImage.style.opacity = '0'; // Fade the image out when portfolio section is reached
    hasFadedOut = true;
  }

  // When scrolling back up, reappear heading2 and group image (fade in)
  if (scrollPosition < portfolioTop && hasFadedOut && scrollProgress >= 0.6) {
    heading2.classList.add('visible');
    groupImage.classList.add('scaled');
    groupImage.style.opacity = '1'; // Restore image opacity when scrolling back up
    hasFadedOut = false;
  }



















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
    wave1.style.fill = '#8d7e9f';
    wave2.style.transform = 'scale(1) translateX(0px)';
    wave2.style.fill = '#8d7e9f';
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
}