class HourglassGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        // Game state
        this.gameRunning = false;
        this.gamePaused = false;
        this.score = 0;
        this.level = 1;
        this.timer = 30;
        this.gameStartTime = 0;
        
        // Hourglass properties
        this.hourglassX = this.width / 2;
        this.hourglassY = this.height / 2;
        this.hourglassWidth = 120;
        this.hourglassHeight = 200;
        this.isFlipped = false;
        this.flipAnimation = 0;
        this.lastFlipTime = 0;
        
        // Sand properties
        this.particles = [];
        this.maxParticles = 200;
        this.sandLevel = 1.0; // 1.0 = full top, 0.0 = full bottom
        this.sandFlowRate = 0.001;
        this.gravityStrength = 0.5;
        
        // Special particles
        this.goldParticles = [];
        this.collectibleParticles = [];
        
        // Animation
        this.animationId = null;
        this.lastTime = 0;
        
        // Event listeners
        this.setupEventListeners();
        
        // Initialize game
        this.initGame();
        this.gameLoop();
    }
    
    setupEventListeners() {
        // Game controls
        document.getElementById('flipBtn').addEventListener('click', () => this.flipHourglass());
        document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
        document.getElementById('playAgainBtn').addEventListener('click', () => this.restartGame());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    this.flipHourglass();
                    break;
                case 'KeyP':
                    this.togglePause();
                    break;
                case 'KeyR':
                    this.restartGame();
                    break;
            }
        });
        
        // Canvas click for particle collection
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.collectParticlesAt(x, y);
        });
    }
    
    initGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.score = 0;
        this.level = 1;
        this.timer = 30;
        this.gameStartTime = Date.now();
        this.isFlipped = false;
        this.flipAnimation = 0;
        this.sandLevel = 1.0;
        this.particles = [];
        this.goldParticles = [];
        this.collectibleParticles = [];
        
        this.updateUI();
        this.hideGameOverModal();
        
        // Start timer
        this.startTimer();
        
        // Initialize particles
        this.initializeParticles();
    }
    
    initializeParticles() {
        for (let i = 0; i < this.maxParticles * this.sandLevel; i++) {
            this.particles.push(this.createSandParticle());
        }
    }
    
    createSandParticle() {
        const topBulbX = this.hourglassX;
        const topBulbY = this.hourglassY - this.hourglassHeight / 4;
        const bulbRadius = this.hourglassWidth / 2;
        
        // Random position within the top bulb
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * bulbRadius * 0.8;
        
        return {
            x: topBulbX + Math.cos(angle) * radius,
            y: topBulbY + Math.random() * bulbRadius - bulbRadius / 2,
            vx: (Math.random() - 0.5) * 0.5,
            vy: Math.random() * 0.5,
            size: Math.random() * 2 + 1,
            color: this.getSandColor(),
            life: 1.0,
            inTopBulb: true
        };
    }
    
    createGoldParticle() {
        const x = this.hourglassX + (Math.random() - 0.5) * this.hourglassWidth;
        const y = this.hourglassY - this.hourglassHeight / 4;
        
        return {
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2 + 1,
            size: Math.random() * 3 + 2,
            color: '#FFD700',
            sparkle: Math.random() * Math.PI * 2,
            collected: false
        };
    }
    
    getSandColor() {
        const colors = ['#DEB887', '#D2B48C', '#F4A460', '#CD853F', '#BC9A6A'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    flipHourglass() {
        if (!this.gameRunning || this.gamePaused) return;
        
        const currentTime = Date.now();
        if (currentTime - this.lastFlipTime < 500) return; // Prevent spam clicking
        
        this.lastFlipTime = currentTime;
        this.isFlipped = !this.isFlipped;
        this.flipAnimation = 1.0;
        
        // Add bonus points for timing
        this.score += 10 * this.level;
        
        // Create gold particles on flip
        if (Math.random() < 0.3) {
            this.goldParticles.push(this.createGoldParticle());
        }
        
        // Visual feedback
        this.addVisualFeedback();
        
        this.updateUI();
    }
    
    addVisualFeedback() {
        const flipBtn = document.getElementById('flipBtn');
        flipBtn.classList.add('pulse');
        setTimeout(() => flipBtn.classList.remove('pulse'), 300);
    }
    
    togglePause() {
        if (!this.gameRunning) return;
        
        this.gamePaused = !this.gamePaused;
        const pauseBtn = document.getElementById('pauseBtn');
        pauseBtn.textContent = this.gamePaused ? '▶️ Resume' : '⏸️ Pause';
    }
    
    restartGame() {
        this.initGame();
    }
    
    startTimer() {
        const timerInterval = setInterval(() => {
            if (!this.gameRunning || this.gamePaused) return;
            
            this.timer--;
            this.updateUI();
            
            if (this.timer <= 0) {
                this.endGame();
                clearInterval(timerInterval);
            }
            
            // Level progression
            if (this.timer % 10 === 0 && this.timer > 0) {
                this.level++;
                this.timer += 5; // Bonus time for leveling up
                this.sandFlowRate += 0.0005;
                this.gravityStrength += 0.1;
                this.updateUI();
            }
        }, 1000);
    }
    
    updateParticles(deltaTime) {
        // Update sand particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Apply gravity
            const gravity = this.isFlipped ? -this.gravityStrength : this.gravityStrength;
            particle.vy += gravity * deltaTime * 60;
            
            // Update position
            particle.x += particle.vx * deltaTime * 60;
            particle.y += particle.vy * deltaTime * 60;
            
            // Apply air resistance
            particle.vx *= 0.99;
            particle.vy *= 0.995;
            
            // Check hourglass boundaries
            this.checkHourglassBoundaries(particle);
            
            // Remove particles that are out of bounds
            if (particle.y > this.height + 50 || particle.y < -50) {
                this.particles.splice(i, 1);
            }
        }
        
        // Update gold particles
        for (let i = this.goldParticles.length - 1; i >= 0; i--) {
            const particle = this.goldParticles[i];
            
            if (!particle.collected) {
                particle.vy += 0.2;
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.sparkle += 0.1;
                
                // Remove if out of bounds
                if (particle.y > this.height + 50) {
                    this.goldParticles.splice(i, 1);
                }
            }
        }
        
        // Spawn new particles
        if (this.particles.length < this.maxParticles && Math.random() < this.sandFlowRate * this.level) {
            this.particles.push(this.createSandParticle());
        }
    }
    
    checkHourglassBoundaries(particle) {
        const centerX = this.hourglassX;
        const centerY = this.hourglassY;
        const width = this.hourglassWidth;
        const height = this.hourglassHeight;
        
        // Top bulb
        const topBulbY = centerY - height / 4;
        const topBulbRadius = width / 2;
        
        // Bottom bulb
        const bottomBulbY = centerY + height / 4;
        const bottomBulbRadius = width / 2;
        
        // Neck
        const neckWidth = width / 6;
        const neckY = centerY;
        
        // Check if particle is in top bulb
        const distToTop = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - topBulbY) ** 2);
        if (distToTop < topBulbRadius) {
            particle.inTopBulb = true;
        }
        
        // Check if particle is in bottom bulb
        const distToBottom = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - bottomBulbY) ** 2);
        if (distToBottom < bottomBulbRadius) {
            particle.inTopBulb = false;
        }
        
        // Collision with hourglass walls
        if (particle.inTopBulb) {
            if (distToTop > topBulbRadius - particle.size) {
                const angle = Math.atan2(particle.y - topBulbY, particle.x - centerX);
                particle.x = centerX + Math.cos(angle) * (topBulbRadius - particle.size);
                particle.y = topBulbY + Math.sin(angle) * (topBulbRadius - particle.size);
                particle.vx *= -0.3;
                particle.vy *= -0.3;
            }
        } else {
            if (distToBottom > bottomBulbRadius - particle.size) {
                const angle = Math.atan2(particle.y - bottomBulbY, particle.x - centerX);
                particle.x = centerX + Math.cos(angle) * (bottomBulbRadius - particle.size);
                particle.y = bottomBulbY + Math.sin(angle) * (bottomBulbRadius - particle.size);
                particle.vx *= -0.3;
                particle.vy *= -0.3;
            }
        }
        
        // Neck collision
        if (Math.abs(particle.y - neckY) < 10 && Math.abs(particle.x - centerX) > neckWidth / 2) {
            particle.x = centerX + Math.sign(particle.x - centerX) * neckWidth / 2;
            particle.vx *= -0.5;
        }
    }
    
    collectParticlesAt(x, y) {
        const collectRadius = 30;
        
        // Collect gold particles
        for (let particle of this.goldParticles) {
            if (!particle.collected) {
                const dist = Math.sqrt((x - particle.x) ** 2 + (y - particle.y) ** 2);
                if (dist < collectRadius) {
                    particle.collected = true;
                    this.score += 50 * this.level;
                    this.timer += 2; // Bonus time
                    this.updateUI();
                    
                    // Visual effect
                    this.createCollectionEffect(particle.x, particle.y);
                }
            }
        }
    }
    
    createCollectionEffect(x, y) {
        // Create sparkle effect
        for (let i = 0; i < 5; i++) {
            this.collectibleParticles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                size: Math.random() * 3 + 1,
                color: '#FFD700'
            });
        }
    }
    
    drawHourglass() {
        const ctx = this.ctx;
        const x = this.hourglassX;
        const y = this.hourglassY;
        const width = this.hourglassWidth;
        const height = this.hourglassHeight;
        
        // Apply flip animation
        ctx.save();
        ctx.translate(x, y);
        
        if (this.flipAnimation > 0) {
            const rotation = this.flipAnimation * Math.PI;
            ctx.rotate(rotation);
            this.flipAnimation *= 0.9;
            if (this.flipAnimation < 0.01) this.flipAnimation = 0;
        }
        
        // Draw hourglass frame
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 4;
        ctx.fillStyle = 'rgba(139, 69, 19, 0.1)';
        
        // Top bulb
        ctx.beginPath();
        ctx.arc(0, -height / 4, width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Bottom bulb
        ctx.beginPath();
        ctx.arc(0, height / 4, width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        // Neck
        ctx.beginPath();
        ctx.moveTo(-width / 6, -10);
        ctx.lineTo(-width / 6, 10);
        ctx.lineTo(width / 6, 10);
        ctx.lineTo(width / 6, -10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Decorative rings
        ctx.strokeStyle = '#A0522D';
        ctx.lineWidth = 2;
        
        for (let i = 0; i < 3; i++) {
            const ringY = -height / 2 + 10 + i * 15;
            ctx.beginPath();
            ctx.arc(0, ringY, width / 2 + 5, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(0, height / 2 - 10 - i * 15, width / 2 + 5, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
    drawParticles() {
        const ctx = this.ctx;
        
        // Draw sand particles
        for (let particle of this.particles) {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw gold particles
        for (let particle of this.goldParticles) {
            if (!particle.collected) {
                const sparkleSize = 2 + Math.sin(particle.sparkle) * 1;
                
                ctx.fillStyle = particle.color;
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size + sparkleSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
                
                // Sparkle effect
                ctx.strokeStyle = '#FFF';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particle.x - 8, particle.y);
                ctx.lineTo(particle.x + 8, particle.y);
                ctx.moveTo(particle.x, particle.y - 8);
                ctx.lineTo(particle.x, particle.y + 8);
                ctx.stroke();
            }
        }
        
        // Draw collection effects
        for (let i = this.collectibleParticles.length - 1; i >= 0; i--) {
            const particle = this.collectibleParticles[i];
            
            ctx.fillStyle = `rgba(255, 215, 0, ${particle.life})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.05;
            particle.size *= 0.98;
            
            if (particle.life <= 0) {
                this.collectibleParticles.splice(i, 1);
            }
        }
    }
    
    drawBackground() {
        const ctx = this.ctx;
        
        // Gradient background
        const gradient = ctx.createRadialGradient(
            this.width / 2, this.height / 2, 0,
            this.width / 2, this.height / 2, this.width / 2
        );
        gradient.addColorStop(0, '#E6F3FF');
        gradient.addColorStop(1, '#B8E0D2');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);
        
        // Decorative elements
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < 5; i++) {
            const x = (i * 200 + 100) % this.width;
            const y = 50 + Math.sin(Date.now() * 0.001 + i) * 30;
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('timer').textContent = this.timer;
    }
    
    endGame() {
        this.gameRunning = false;
        this.showGameOverModal();
    }
    
    showGameOverModal() {
        const modal = document.getElementById('gameOverModal');
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        modal.classList.remove('hidden');
        
        // Shake animation for game over
        const gameContainer = document.querySelector('.game-container');
        gameContainer.classList.add('shake');
        setTimeout(() => gameContainer.classList.remove('shake'), 500);
    }
    
    hideGameOverModal() {
        document.getElementById('gameOverModal').classList.add('hidden');
    }
    
    gameLoop(currentTime = 0) {
        if (!this.lastTime) this.lastTime = currentTime;
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw game elements
        this.drawBackground();
        this.drawHourglass();
        
        if (this.gameRunning && !this.gamePaused) {
            this.updateParticles(deltaTime);
        }
        
        this.drawParticles();
        
        // Continue game loop
        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new HourglassGame();
});