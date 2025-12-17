document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid-3');
    if (!grid) return;

    // Data Array
    const baseCardData = [
        {
            title: 'Gerson-Receitas',
            subtitle: 'App de Receitas',
            image: './imagens/receitas.png',
            url: 'https://gerson-gomes.github.io/app-de-receitas/'
        },
        {
            title: 'Burger Project',
            subtitle: 'React Application',
            image: './imagens/burgerReact.png',
            url: 'https://burger-react-nine.vercel.app/'
        },
        {
            title: 'Game Arena',
            subtitle: 'Pygame Project',
            image: './imagens/arena.png',
            url: 'https://gerson-gomes.github.io/Cube-Arena/'
        },

    ];

    const cardData = [...baseCardData, ...baseCardData, ...baseCardData];

    // Render Cards
    cardData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="image-placeholder" style="background-image: url('${data.image}'); background-size: cover; background-position: center;"><a class="card-link" href="${data.url}" target="_blank"></a></div>
            <div class="card-content">
                <h3>${data.title}</h3>
                <span>${data.subtitle}</span>
            </div>
        `;
        grid.appendChild(card);
    });

    // Animation Logic
    const cards = Array.from(grid.querySelectorAll('.card'));
    if (cards.length === 0) return;

    let isPaused = false;
    let offsets = cards.map(() => 0);
    const speed = 1; // Pixels per frame

    // Hover pause logic
    grid.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    grid.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    function loop() {
        // Validation for Mobile (< 768px)
        if (window.innerWidth < 768) {
            // Reset transforms to allow native scrolling
            cards.forEach(card => card.style.transform = 'none');
            // Reset offsets
            offsets = cards.map(() => 0);
            
            requestAnimationFrame(loop);
            return;
        }

        if (!isPaused) {
            // Get current dimensions
            const gap = parseFloat(getComputedStyle(grid).gap) || 0;
            // Ensure we have width
            if (cards[0].offsetWidth === 0) {
                requestAnimationFrame(loop);
                return;
            }

            const cardWidth = cards[0].offsetWidth;
            const totalItemWidth = cardWidth + gap;
            const totalWidth = cards.length * totalItemWidth;

            cards.forEach((card, index) => {
                // Update offset
                offsets[index] -= speed;

                // Calculate visual position relative to the container start
                // The item's natural layout position is (index * totalItemWidth)
                const layoutX = index * totalItemWidth;
                const visualX = layoutX + offsets[index];

                // Check if the card has fully exited to the left
                // A card is "out" if its right edge (visualX + cardWidth) is < 0 
                if (visualX < -cardWidth) {
                    offsets[index] += totalWidth;
                }

                card.style.transform = `translateX(${offsets[index]}px)`;
            });
        }
        requestAnimationFrame(loop);
    }

    // Start the loop
    requestAnimationFrame(loop);

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved user preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Save preference
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
