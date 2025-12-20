// Celebration function
document.getElementById('celebrateBtn').addEventListener('click', function() {
    // Visual effects
    this.innerHTML = '🎉 Congratulations! 🎉';
    this.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    // Create confetti
    createConfetti();
    
    // Play success sound (optional)
    playSuccessSound();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        this.innerHTML = '🎊 Click to Celebrate!';
        this.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
    }, 3000);
});

// Create confetti animation
function createConfetti() {
    const colors = ['#0070f3', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        
        // Animation
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 3000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remove after animation
        animation.onfinish = () => confetti.remove();
    }
}

// Play success sound (uses Web Audio API)
function playSuccessSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio not supported, continue silently
    }
}

// Animate checklist items one by one
document.addEventListener('DOMContentLoaded', () => {
    const checklistItems = document.querySelectorAll('.checklist li');
    
    checklistItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
    
    // Update live status
    updateStatus();
});

// Update deployment status
function updateStatus() {
    const statusText = document.querySelector('.status-text');
    const infoItems = document.querySelectorAll('.info-item .value');
    
    // Simulate live updates
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Update last deployed time
        if (infoItems[3]) {
            infoItems[3].textContent = timeString;
        }
    }, 60000); // Update every minute
}

// Add click effects to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});
