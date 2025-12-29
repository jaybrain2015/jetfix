// Gallery Filter Functionality

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter gallery items
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get filter category
            const filterValue = button.getAttribute('data-filter');

            // Filter items with animation
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');

                // Hide all items first
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, index * 50);
                    } else {
                        item.classList.add('hidden');
                    }
                }, 200);
            });
        });
    });

    // Add transition styles to gallery items
    galleryItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Gallery item click handler (for future lightbox implementation)
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const overlay = item.querySelector('.gallery-overlay');
            const title = overlay.querySelector('h3').textContent;
            const description = overlay.querySelector('p').textContent;

            console.log(`Gallery item clicked: ${title} - ${description}`);
            // You can add lightbox functionality here in the future
        });
    });
});

// Count animation for stats (when in view)
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;

                // Check if it's a number (handles formats like "2500+" or "98%")
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const hasSlash = text.includes('/');

                if (!hasSlash) {
                    const numberMatch = text.match(/\d+/);
                    if (numberMatch) {
                        const finalNumber = parseInt(numberMatch[0]);
                        animateNumber(target, 0, finalNumber, 2000, hasPlus, hasPercent);
                    }
                }

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
};

function animateNumber(element, start, end, duration, hasPlus, hasPercent) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);

        let displayText = current.toString();
        if (hasPlus) displayText += '+';
        if (hasPercent) displayText += '%';

        element.textContent = displayText;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            let finalText = end.toString();
            if (hasPlus) finalText += '+';
            if (hasPercent) finalText += '%';
            element.textContent = finalText;
        }
    }

    requestAnimationFrame(update);
}

// Initialize stats animation
if (document.querySelector('.stat-number')) {
    animateStats();
}
