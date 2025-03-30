// Intro Text Animation
document.addEventListener("DOMContentLoaded", () => {
    const introText = document.getElementById("intro-text");
    const introScreen = document.getElementById("intro");

    // Languages for the intro text
    const languages = [
        "Cześć", "Hola", "Bonjour", "こんにちは", "മലയാളം", "Guten Tag", "Привет", "Ciao", "你好",
        "नमस्ते", "안녕하세요", "مرحبًا", "Hej", "Hello"
    ];
    let index = 0;

    // Function to cycle through the languages rapidly
    function changeText() {
        introText.textContent = languages[index];
        index++;

        if (index < languages.length) {
            setTimeout(changeText, 100); // Rapid switch every 100ms
        } else {
            setTimeout(() => {
                introScreen.classList.add("hide-intro"); // Fade out intro
            }, 500);
        }
    }

    changeText(); // Start immediately
});

// Stars
document.addEventListener("DOMContentLoaded", () => {
    const starContainer = document.getElementById("stars-container");
    const numStars = 50; // Number of stars to generate

    // Function to create stars
    function createStars() {
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement("div");
            star.className = "star";

            // Random size between 0.8px and 2px
            const size = `${Math.random() * 1.2 + 0.8}px`;
            star.style.width = size;
            star.style.height = size;

            // Random opacity between 0.4 and 1 for twinkle effect
            star.style.opacity = Math.random() * 0.6 + 0.4;

            // Random initial position
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;

            // Random animation duration for natural float and twinkle effect
            const floatDuration = Math.random() * 15 + 25; // Float duration between 25s - 40s
            const twinkleDuration = Math.random() * 5 + 10; // Twinkle duration between 10s - 15s

            // Apply animations for floating and twinkling
            star.style.animation = `floatStars ${floatDuration}s ease-in-out infinite alternate, twinkle ${twinkleDuration}s infinite alternate`;

            // Add the star to the container
            starContainer.appendChild(star);
        }
    }

    createStars(); // Create stars on page load
});

// Skills
document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const skillCards = document.querySelectorAll(".skill-card");

    categories.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".category.active").classList.remove("active");
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");
            skillCards.forEach(card => {
                if (filter === "all" || card.classList.contains(filter)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

// Timeline
document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");

    function revealOnScroll() {
        timelineItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run on load in case items are already in view
});

document.getElementById("back-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Function to generate a random refined color (avoiding LGBTQ-associated colors)
function getRandomRefinedColor() {
    const refinedColors = [
        '#D35D6E', // Deep Rose
        '#3B9E82', // Forest Green
        '#F29C11', // Amber Yellow
        '#4A90E2', // Sky Blue
        '#2C3E50', // Midnight Blue
        '#F35A5C', // Coral Red
        '#8E44AD', // Purple Orchid
        '#16A085', // Emerald Green
        '#F1C40F', // Bright Gold
        '#1ABC9C'  // Turquoise
    ];
    return refinedColors[Math.floor(Math.random() * refinedColors.length)];
}

// Function to create a light trail following the mouse
function createTrail(e) {
    const trail = document.createElement('div');
    trail.classList.add('trail');

    // Set initial position based on mouse position
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY + window.scrollY}px`; // Account for scroll position

    // Styling
    trail.style.position = 'absolute'; // Allow trail to move with the scroll
    trail.style.width = '20px';
    trail.style.height = '20px';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.transform = 'scale(0)';
    trail.style.opacity = '1';
    trail.style.backgroundColor = getRandomRefinedColor();
    trail.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';

    // Append the trail to the body
    document.body.appendChild(trail);

    // Animate the trail
    setTimeout(() => {
        trail.style.transform = 'scale(4)';
        trail.style.opacity = '0';
    }, 10);

    // Remove trail after animation ends
    setTimeout(() => {
        trail.remove();
    }, 800);
}

// Trigger the trail effect when mouse moves
document.addEventListener('mousemove', (e) => {
    createTrail(e);
});
