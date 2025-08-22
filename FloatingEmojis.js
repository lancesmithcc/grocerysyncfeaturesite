// FloatingEmojis.js - Converted from TypeScript component
// Dramatically reduce number of emojis for performance
const emojis = ['🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓','🫐','🥝','🍅','🫒','🥥','🥑','🍆','🥔','🥕','🌽','🌶️','🫑','🥒','🥬','🥦','🧄','🧅','🍄','🥜','🌰','🍞','🥐','🥖','🫓','🥨','🥯','🥞','🧇','🧀','🍖','🍗','🥩','🥓','🍔','🍟','🍕'];

class FloatingEmojis {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        if (!this.container) return;

        // Set container styles
        Object.assign(this.container.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            pointerEvents: 'none',
            zIndex: '0',
            overflow: 'hidden'
        });

        // Create floating emojis
        emojis.forEach((emoji, idx) => {
            const emojiElement = document.createElement('div');
            emojiElement.textContent = emoji;
            emojiElement.className = 'floating-emoji text-sm absolute opacity-100 blur-[0.5px]';
            emojiElement.style.left = `${Math.random() * 100}%`;
            emojiElement.style.top = `${Math.random() * 100}%`;
            this.container.appendChild(emojiElement);
        });

        this.animateEmojis();
    }

    animateEmojis() {
        const emojiElements = this.container.querySelectorAll('.floating-emoji');

        emojiElements.forEach(el => {
            // Set initial random positions and scale
            gsap.set(el, {
                x: Math.random() * window.innerWidth * 0.8,
                y: Math.random() * window.innerHeight * 0.8,
                scale: 0.9 + Math.random() * 1.5 // Initial scale between 0.9 and 2.4
            });

            // Create random animation path for each emoji
            const randomX = () => (Math.random() - 0.5) * window.innerWidth * 0.3;
            const randomY = () => (Math.random() - 0.5) * window.innerHeight * 0.3;
            const randomScale = () => 0.9 + Math.random() * 1.5; // Random scale between 0.9 and 2.4

            // Create a timeline for each emoji with random bouncing motion and scaling
            const tl = gsap.timeline({repeat: -1, yoyo: true});

            // Add 4-6 random waypoints
            const waypoints = 4 + Math.floor(Math.random() * 4);
            for (let i = 0; i < waypoints; i++) {
                tl.to(el, {
                    x: `+=${randomX()}`,
                    y: `+=${randomY()}`,
                    scale: randomScale(), // Add random scale to animation
                    duration: 10 + Math.random() * 20,
                    ease: "sine.inOut",
                });
            }
        });
    }
}

// Initialize when GSAP is loaded
function initFloatingEmojis() {
    if (typeof gsap !== 'undefined') {
        new FloatingEmojis('floating-emojis');
    } else {
        // Retry after a short delay if GSAP isn't loaded yet
        setTimeout(initFloatingEmojis, 100);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initFloatingEmojis);
