// ===================================
// FLOATING HEARTS BACKGROUND
// ===================================

function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    const heartEmoji = '💜';
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmoji;
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (6-10 seconds)
        const duration = 6 + Math.random() * 4;
        heart.style.animationDuration = duration + 's';
        
        // Random animation delay
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, (duration + 5) * 1000);
    }
    
    // Create hearts periodically
    setInterval(createHeart, 1000);
}

// Initialize floating hearts on page load
document.addEventListener('DOMContentLoaded', createFloatingHearts);

// ===================================
// MODAL FUNCTIONALITY
// ===================================

/**
 * Open a modal by ID
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close a modal by ID
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Close modal when clicking outside content
 */
document.addEventListener('click', function(event) {
    // Check if click is on a modal overlay (not the content)
    if (event.target.classList.contains('modal')) {
        const modal = event.target;
        const modalId = modal.id;
        closeModal(modalId);
    }
});

/**
 * Close modal with Escape key
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Find and close all open modals
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// ===================================
// IMAGE ZOOM FUNCTIONALITY
// ===================================

/**
 * Toggle zoom on image containers
 */
function toggleZoom(element) {
    element.classList.toggle('zoomed');
    
    if (element.classList.contains('zoomed')) {
        element.style.position = 'fixed';
        element.style.top = '50%';
        element.style.left = '50%';
        element.style.transform = 'translate(-50%, -50%)';
        element.style.zIndex = '10000';
        element.style.maxWidth = '90vw';
        element.style.maxHeight = '90vh';
        document.body.style.overflow = 'hidden';
    } else {
        element.style.position = 'static';
        element.style.transform = 'none';
        element.style.zIndex = 'auto';
        element.style.maxWidth = '100%';
        document.body.style.overflow = 'auto';
    }
}

// ===================================
// PINCH ZOOM FOR MOBILE
// ===================================

let initialDistance = 0;
let initialScale = 1;

document.addEventListener('touchstart', function(event) {
    if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        
        initialDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        
        // Check if touching an image
        const imageElement = event.target.closest('.modal-image');
        if (imageElement) {
            initialScale = imageElement.offsetWidth / imageElement.naturalWidth;
        }
    }
}, false);

document.addEventListener('touchmove', function(event) {
    if (event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        
        const currentDistance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );
        
        const scale = currentDistance / initialDistance;
        const imageElement = event.target.closest('.modal-image');
        
        if (imageElement && scale > 1) {
            imageElement.style.transform = `scale(${scale * initialScale})`;
            event.preventDefault();
        }
    }
}, false);

document.addEventListener('touchend', function(event) {
    if (event.touches.length < 2) {
        const imageElement = document.querySelector('.modal-image');
        if (imageElement) {
            imageElement.style.transform = 'scale(1)';
        }
    }
}, false);

// ===================================
// SMOOTH SCROLL INDICATOR
// ===================================

/**
 * Smooth scroll to cards section when clicking scroll indicator
 */
document.addEventListener('click', function(event) {
    if (event.target.closest('.scroll-indicator')) {
        const cardsSection = document.querySelector('.cards-container');
        cardsSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Hide scroll indicator after user scrolls past hero
window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero');
    
    if (scrollIndicator && heroSection) {
        const heroBottom = heroSection.offsetHeight;
        if (window.scrollY > heroBottom * 0.5) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// ===================================
// CONTENT EDITABLE ENHANCEMENTS
// ===================================

/**
 * Preserve formatting when editing content
 */
document.querySelectorAll('[contenteditable="true"]').forEach(element => {
    element.addEventListener('paste', function(event) {
        // Prevent default paste behavior
        event.preventDefault();
        
        // Get plain text from clipboard
        const text = event.clipboardData.getData('text/plain');
        
        // Insert as plain text
        document.execCommand('insertText', false, text);
    });
});

// ===================================
// INITIALIZATION
// ===================================

// Add smooth transitions on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});
