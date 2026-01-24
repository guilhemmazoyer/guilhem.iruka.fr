// ============================================
// MAIN JAVASCRIPT
// ============================================

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const menuOverlay = document.getElementById('menuOverlay');
const menuLinks = document.querySelectorAll('.menu-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (menuClose) {
    menuClose.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close menu when clicking on a link
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Toggle menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay) {
        const isMenuOpen = menuOverlay.classList.contains('active');
        if (isMenuOpen) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});

// Live Time Update (Paris timezone)
function updateTime() {
    const timeElement = document.getElementById('footerTime');
    if (timeElement) {
        // Get current time in Paris timezone
        const now = new Date();
        const parisTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Paris"}));
        const hours = String(parisTime.getHours()).padStart(2, '0');
        const minutes = String(parisTime.getMinutes()).padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes} France`;
    }
}

// Update time every minute
updateTime();
setInterval(updateTime, 60000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
});

