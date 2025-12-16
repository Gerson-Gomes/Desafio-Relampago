document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid-3');
    if (!grid) return;

    // Data Array
    const cardData = [
        {
            title: 'Nærøyfjorden',
            subtitle: 'Norway',
            colorClass: 'color-1'
        },
        {
            title: 'Antelope Canyon',
            subtitle: 'United States',
            colorClass: 'color-2'
        },
        {
            title: 'Grossglockner',
            subtitle: 'Austria',
            colorClass: 'color-3'
        }
    ];

    // Render Cards
    cardData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="image-placeholder ${data.colorClass}"></div>
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

    function loop() {
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
});
