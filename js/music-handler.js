// ============================================
// MUSIC HANDLER
// ============================================

class MusicHandler {
    constructor() {
        this.audio = document.getElementById('backgroundMusic');
        this.isPlaying = false;
        this.wasPlayingBeforeMenu = false;
        
        // Get toggle buttons
        this.toggleButtons = document.querySelectorAll('#musicToggle, #menuMusicToggle');
        
        // Animation interval for random bar heights
        this.animationInterval = null;
        
        // Load state from localStorage
        this.loadState();
        
        // Initialize SVG visualizers
        this.createVisualizers();
        
        // Get all audio visualizers (after creation)
        this.visualizers = document.querySelectorAll('.audio-visualizer');
        
        // Initialize
        this.init();
    }

    createVisualizers() {
        // Create SVG visualizer element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('audio-visualizer');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 40 24');
        svg.setAttribute('fill', 'none');

        // Create 4 bars
        const barPositions = [0 , 10, 20, 30];
        barPositions.forEach((x, index) => {
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.classList.add('audio-bar', `bar-${index + 1}`);
            rect.setAttribute('x', String(x));
            rect.setAttribute('y', '20');
            rect.setAttribute('width', '5');
            rect.setAttribute('height', '3');
            rect.setAttribute('fill', 'currentColor');
            rect.setAttribute('rx', '1.5');
            svg.appendChild(rect);
        });

        // Clone SVG for each toggle button
        this.toggleButtons.forEach(button => {
            if (button) {
                // Remove existing SVG if any
                const existingSvg = button.querySelector('svg');
                if (existingSvg) {
                    existingSvg.remove();
                }
                // Append cloned SVG
                button.appendChild(svg.cloneNode(true));
            }
        });
    }

    init() {
        // Add event listeners to all toggle buttons
        this.toggleButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', () => this.toggle());
            }
        });

        // Restore music position from previous page
        this.restorePosition();

        // Auto-play on load if music was playing before
        if (this.isPlaying) {
            this.play(false); // No animation on initial load
        } else {
            // Update visualizers to show off state initially (no animation on load)
            this.updateVisualizers(false);
        }

        // Handle audio events
        if (this.audio) {
            this.audio.addEventListener('ended', () => {
                // Loop is handled by the loop attribute, but just in case
                this.audio.currentTime = 0;
                this.audio.play();
            });

            this.audio.addEventListener('error', (e) => {
                console.warn('Audio error:', e);
            });

            // Save position periodically while playing
            this.audio.addEventListener('timeupdate', () => {
                if (this.isPlaying) {
                    this.savePosition();
                }
            });
        }

        // Save position before page unload
        window.addEventListener('beforeunload', () => {
            this.savePosition();
        });

        // Save position when page is hidden (mobile browsers)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.savePosition();
            }
        });
    }

    updateVisualizers(animate = true) {
        this.visualizers.forEach(visualizer => {
            const bars = visualizer.querySelectorAll('.audio-bar');
            
            // Remove all state classes
            visualizer.classList.remove('audio-on', 'audio-off', 'audio-transitioning');
            
            // Store current and target values for each bar
            const targetStates = [];
            bars.forEach((bar, index) => {
                const currentY = parseFloat(bar.getAttribute('y')) || 20;
                const currentHeight = parseFloat(bar.getAttribute('height')) || 2;
                
                if (this.isPlaying) {
                    // État ON - Visualiseur avec hauteurs différentes
                    const heights = [4, 6.5, 12, 9];
                    const yPositions = [15, 12.5, 7, 10];
                    targetStates.push({
                        y: yPositions[index],
                        height: heights[index]
                    });
                } else {
                    // État OFF - Toutes les barres petites
                    targetStates.push({
                        y: 20,
                        height: 3
                    });
                }
            });
            
            if (animate) {
                // Add transitioning class for animation
                visualizer.classList.add('audio-transitioning');
                
                // Store initial values
                const initialStates = [];
                bars.forEach((bar) => {
                    initialStates.push({
                        y: parseFloat(bar.getAttribute('y')) || 20,
                        height: parseFloat(bar.getAttribute('height')) || 2
                    });
                });
                
                // Animate bars with requestAnimationFrame
                const startTime = performance.now();
                const duration = 300; // ms
                
                const animateBars = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Easing function (ease-out)
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    
                    bars.forEach((bar, index) => {
                        const initial = initialStates[index];
                        const target = targetStates[index];
                        
                        const newY = initial.y + (target.y - initial.y) * easeProgress;
                        const newHeight = initial.height + (target.height - initial.height) * easeProgress;
                        
                        bar.setAttribute('y', newY);
                        bar.setAttribute('height', newHeight);
                    });
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateBars);
                    } else {
                        // Animation complete - set final values
                        bars.forEach((bar, index) => {
                            const target = targetStates[index];
                            bar.setAttribute('y', target.y);
                            bar.setAttribute('height', target.height);
                        });
                        visualizer.classList.remove('audio-transitioning');
                    }
                };
                
                requestAnimationFrame(animateBars);
            } else {
                // No animation - set values directly
                bars.forEach((bar, index) => {
                    const target = targetStates[index];
                    bar.setAttribute('y', target.y);
                    bar.setAttribute('height', target.height);
                });
            }
            
            // Add state class
            visualizer.classList.add(this.isPlaying ? 'audio-on' : 'audio-off');
        });
    }

    play(animate = true) {
        if (this.audio) {
            // Restore position before playing if not already set
            if (this.audio.currentTime === 0) {
                this.restorePosition();
            }
            
            this.audio.play().catch(error => {
                console.warn('Autoplay prevented:', error);
                // User interaction required - will play on first toggle
            });
            this.isPlaying = true;
            this.saveState();
            this.updateVisualizers(animate);
            this.startRandomAnimation();
        }
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
            this.saveState();
            this.stopRandomAnimation();
            this.updateVisualizers(true);
        }
    }

    startRandomAnimation() {
        // Stop any existing animation
        this.stopRandomAnimation();
        
        // Start animation immediately
        this.updateRandomBarHeights();
        
        // Set interval to update every 0.30 seconds (300ms)
        this.animationInterval = setInterval(() => {
            if (this.isPlaying) {
                this.updateRandomBarHeights();
            }
        }, 300);
    }

    stopRandomAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    updateRandomBarHeights() {
        this.visualizers.forEach(visualizer => {
            const bars = visualizer.querySelectorAll('.audio-bar');
            
            bars.forEach((bar, index) => {
                // Generate random height between 7.5 and 20
                const randomHeight = Math.random() * (20 - 5) + 7.5;
                
                // Calculate y position: bottom of viewBox is at y=24
                // So y position = 24 - height (bars grow upward from bottom)
                const y = 24 - randomHeight;
                
                // Apply transition with stagger delay (0.05s = 50ms per bar)
                const delay = index * 75;
                bar.style.transition = `y 0.3s ease, height 0.3s ease`;
                bar.style.transitionDelay = `${delay}ms`;
                
                // Set new values
                bar.setAttribute('y', String(y));
                bar.setAttribute('height', String(randomHeight));
            });
        });
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    saveState() {
        localStorage.setItem('musicPlaying', this.isPlaying ? 'true' : 'false');
    }

    loadState() {
        const saved = localStorage.getItem('musicPlaying');
        if (saved !== null) {
            this.isPlaying = saved === 'true';
        } else {
            // Default: start with music OFF
            this.isPlaying = false;
        }
    }

    savePosition() {
        if (this.audio) {
            localStorage.setItem('musicPosition', this.audio.currentTime.toString());
        }
    }

    restorePosition() {
        if (this.audio) {
            const savedPosition = localStorage.getItem('musicPosition');
            if (savedPosition !== null) {
                const position = parseFloat(savedPosition);
                // Only restore if position is valid
                if (!isNaN(position) && position > 0) {
                    // Wait for audio to be ready before setting position
                    const setPosition = () => {
                        // Check if duration is available and position is valid
                        if (this.audio.duration && position < this.audio.duration) {
                            this.audio.currentTime = position;
                        } else if (!this.audio.duration) {
                            // If duration not available yet, set position anyway (will be clamped by browser)
                            this.audio.currentTime = position;
                        }
                    };

                    if (this.audio.readyState >= 2) {
                        // Metadata is loaded, set position immediately
                        setPosition();
                    } else {
                        // Wait for metadata to load
                        this.audio.addEventListener('loadedmetadata', setPosition, { once: true });
                    }
                }
            }
        }
    }
}

// Initialize music handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MusicHandler();
});

