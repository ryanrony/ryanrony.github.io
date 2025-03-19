// JavaScript for the clicker game
let count = 0;
const clickableElement = document.getElementById('clickable');
const counterElement = document.getElementById('counter');
const screenElement = document.getElementById('screen');

// Show intro text 1.5 seconds after the page loads
setTimeout(showIntroText, 750); // 1500 milliseconds = 1.5 seconds

// Function to display intro text
function showIntroText() {
    const words = ["PUNCH", "THE", "TV"];
    let delay = 0;

    words.forEach((word, index) => {
        setTimeout(() => {
            const introText = document.createElement('div');
            introText.classList.add('intro-text');
            introText.textContent = word;
            document.body.appendChild(introText);

            // Add screen shake
            screenShake();

            // Remove text after 0.5 seconds
            setTimeout(() => {
                if (word === "TV") {
                    introText.classList.add('fade-out'); // Fade out only "TV"
                    setTimeout(() => introText.remove(), 200); // Remove after fade
                } else {
                    introText.remove(); // Remove "PUNCH" and "THE" immediately
                }
            }, 500); // Each word stays for 0.5 seconds
        }, delay);

        delay += 500; // Delay between words (0.5 seconds)
    });
}


// Function to display "KEEP GOING" text
// JavaScript for the clicker game

// List of messages for different milestones
const messages = [
    { milestone: 10, text: ["YESSS", "SURRRR"], unique: true }, // Unique message for 10 clicks
    { milestone: 50, text: ["SKIBBIDY", "RIZZ"] }, // Random message for every 50 clicks
    { milestone: 50, text: ["HELL", "YEAH"] },
    { milestone: 50, text: ["SMASH", "THE", "TV"] },
    { milestone: 50, text: ["BOOM", "SHAKALAKA"] },
    { milestone: 50, text: ["OOOOOOOOOOOOOOOOOHHHHHHHHHHHHH"] },
    { milestone: 50, text: ["PUNCH", "HARDER"] },
];

// Function to display text with screen shake
function displayText(words) {
    let delay = 0;

    words.forEach((word, index) => {
        setTimeout(() => {
            const textElement = document.createElement('div');
            textElement.classList.add('keep-going-text');
            textElement.textContent = word;
            document.body.appendChild(textElement);

            // Add screen shake


            // Remove text after 0.5 seconds
            setTimeout(() => {
                textElement.classList.add('fade-out'); // Fade out
                setTimeout(() => textElement.remove(), 500); // Remove after fade
            }, 500); // Each word stays for 0.3 seconds
        }, delay);

        delay += 600; // Delay between words (0.5 seconds)
    });
}

// Function to check milestones and display messages
function checkMilestones() {
    for (const message of messages) {
        if (count === message.milestone || (count % message.milestone === 0 && !message.unique)) {
            if (count === 10 && message.unique) {
                displayText(message.text); // Show "YESSS SURRRR" only once at 10 clicks
            } else if (count % 50 === 0 && !message.unique) {
                const randomMessage = messages.filter(m => m.milestone === 50 && !m.unique);
                const selectedMessage = randomMessage[Math.floor(Math.random() * randomMessage.length)];
                displayText(selectedMessage.text); // Show a random message every 50 clicks
            }
            break; // Stop checking after the first matching milestone
        }
    }
}

clickableElement.addEventListener('click', function (event) {
    count++;
    counterElement.textContent = count;

    // Add shake effect
    screenShake();

    // Add pixel-like particle effect
    createParticles(event.clientX, event.clientY);

    // Check for milestones and display messages
    checkMilestones();

    // Special effect every 10 or 50 clicks
    if (count === 10 || count % 50 === 0) {
        triggerExplosion(event.clientX, event.clientY);
        triggerScreenRipple(event.clientX, event.clientY); // New ripple effect
    }
});

// Screen shake function
function screenShake() {
    let intensity = 3; /* Intensity of the shake */
    let duration = 100; /* Duration of the shake */
    let start = Date.now();

    function shake() {
        let elapsed = Date.now() - start;
        if (elapsed < duration) {
            let x = (Math.random() * intensity * 2 - intensity) + 'px';
            let y = (Math.random() * intensity * 2 - intensity) + 'px';
            screenElement.style.transform = `translate(${x}, ${y})`;
            requestAnimationFrame(shake);
        } else {
            screenElement.style.transform = 'translate(0, 0)';
        }
    }
    shake();
}

// Particle creation function
function createParticles(x, y) {
    for (let i = 0; i < 20; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');

        // 15% chance for red particles
        if (Math.random() < 0.15) {
            particle.classList.add('red');
        }

        document.body.appendChild(particle);

        // Randomize particle movement
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 100 + 50; /* Spread distance */
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Red explosion effect
function triggerExplosion(x, y) {
    for (let i = 0; i < 50; i++) {
        let particle = document.createElement('div');
        particle.classList.add('explosion-particle');
        document.body.appendChild(particle);

        // Randomize particle movement
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 200 + 100; /* Larger spread distance */
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// New effect: Screen ripple
function triggerScreenRipple(x, y) {
    let ripple = document.createElement('div');
    ripple.classList.add('screen-ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 500);
}

// Screen shake function
function screenShake() {
    let intensity = 3; /* Intensity of the shake */
    let duration = 100; /* Duration of the shake */
    let start = Date.now();

    function shake() {
        let elapsed = Date.now() - start;
        if (elapsed < duration) {
            let x = (Math.random() * intensity * 2 - intensity) + 'px';
            let y = (Math.random() * intensity * 2 - intensity) + 'px';
            screenElement.style.transform = `translate(${x}, ${y})`;
            requestAnimationFrame(shake);
        } else {
            screenElement.style.transform = 'translate(0, 0)';
        }
    }
    shake();
}

// Particle creation function
function createParticles(x, y) {
    for (let i = 0; i < 20; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');

        // 15% chance for red particles
        if (Math.random() < 0.15) {
            particle.classList.add('red');
        }

        document.body.appendChild(particle);

        // Randomize particle movement
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 100 + 50; /* Spread distance */
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Red explosion effect
function triggerExplosion(x, y) {
    for (let i = 0; i < 50; i++) {
        let particle = document.createElement('div');
        particle.classList.add('explosion-particle');
        document.body.appendChild(particle);

        // Randomize particle movement
        let angle = Math.random() * 2 * Math.PI;
        let distance = Math.random() * 200 + 100; /* Larger spread distance */
        particle.style.setProperty('--x', Math.cos(angle) * distance + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * distance + 'px');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// New effect: Screen ripple
function triggerScreenRipple(x, y) {
    let ripple = document.createElement('div');
    ripple.classList.add('screen-ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    document.body.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 500);
}


// Variables for CPS calculation
let clickTimes = []; // Array to store timestamps of clicks
const cpsValueElement = document.getElementById('cps-value');
const datetimeValueElement = document.getElementById('datetime-value');

// Function to update clicks per second
function updateCPS() {
    const now = Date.now();
    const oneSecondAgo = now - 1000;

    // Filter clicks that happened in the last second
    clickTimes = clickTimes.filter(time => time > oneSecondAgo);

    // Update CPS display
    cpsValueElement.textContent = clickTimes.length;
}

// Function to update date and time in a retro format


// Update CPS and date/time every second
setInterval(() => {
    updateCPS();
    updateDateTime();
}, 1000);

// Add click event listener to track clicks
clickableElement.addEventListener('click', function () {
    clickTimes.push(Date.now()); // Record the time of the click
});
