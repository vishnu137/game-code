# ⏳ HTML5 Hourglass Game

A beautiful and interactive hourglass game built with HTML5 Canvas, featuring realistic particle physics, stunning animations, and engaging gameplay mechanics.

## 🎮 Game Features

### Visual Features
- **Realistic Hourglass Animation**: Beautifully rendered hourglass with smooth flip animations
- **Particle Physics**: Hundreds of sand particles with realistic gravity and collision detection
- **Dynamic Backgrounds**: Gradient backgrounds with floating decorative elements
- **Special Effects**: Sparkle effects, collection animations, and visual feedback
- **Responsive Design**: Works on desktop and mobile devices

### Gameplay Features
- **Flip Mechanics**: Click to flip the hourglass and reverse gravity
- **Gold Particles**: Collect special golden particles for bonus points and time
- **Level Progression**: Increasing difficulty with faster sand flow and stronger gravity
- **Timing Challenges**: Strategic flipping to maximize score and survival time
- **Score System**: Points for flips, gold collection, and level progression

### Controls
- **Mouse**: Click "Flip Hourglass" button or click on canvas to collect gold particles
- **Keyboard Shortcuts**:
  - `Space` - Flip the hourglass
  - `P` - Pause/Resume game
  - `R` - Restart game

## 🎯 How to Play

1. **Objective**: Keep the game running by flipping the hourglass strategically while collecting gold particles for bonus points.

2. **Basic Mechanics**:
   - Sand particles fall due to gravity
   - Flip the hourglass to reverse gravity direction
   - Each flip gives you points based on your current level
   - Timer counts down - don't let it reach zero!

3. **Special Elements**:
   - **Gold Particles**: Sparkly golden particles that appear randomly
   - **Collection**: Click near gold particles to collect them
   - **Bonuses**: Gold particles give 50 × level points and +2 seconds

4. **Level Progression**:
   - Every 10 seconds, level increases
   - Higher levels = faster sand flow and stronger gravity
   - Each level up gives +5 bonus seconds

5. **Scoring**:
   - Flip hourglass: 10 × level points
   - Collect gold particle: 50 × level points + 2 seconds
   - Survive longer for higher scores

## 🚀 Getting Started

### Quick Start
1. Open `hourglass_game.html` in any modern web browser
2. Click "Flip Hourglass" to start playing
3. Use mouse clicks and keyboard controls to play

### Files Included
- `hourglass_game.html` - Main game page with canvas and UI
- `hourglass_game.css` - Complete styling with animations and responsive design
- `hourglass_game.js` - Game engine with physics, graphics, and game logic

### Browser Requirements
- Modern web browser with HTML5 Canvas support
- JavaScript enabled
- Recommended: Chrome, Firefox, Safari, Edge (latest versions)

## 🎨 Technical Features

### Graphics & Animation
- HTML5 Canvas 2D rendering
- Smooth 60 FPS animations using requestAnimationFrame
- Particle system with realistic physics
- CSS3 animations for UI elements
- Gradient backgrounds and shadow effects

### Physics Engine
- Gravity simulation with variable strength
- Particle collision detection with hourglass boundaries
- Air resistance and velocity damping
- Realistic sand flow through hourglass neck

### Game Architecture
- Object-oriented design with ES6 classes
- Modular code structure for easy modification
- Event-driven input handling
- Responsive game loop with delta time calculations

## 🎮 Game Tips

1. **Timing is Key**: Don't flip too quickly - plan your moves strategically
2. **Watch for Gold**: Gold particles appear randomly during flips
3. **Level Management**: Higher levels are more challenging but give more points
4. **Collection Strategy**: Click near gold particles to collect them efficiently
5. **Survival Focus**: Keep an eye on the timer - collecting gold gives bonus time

## 🛠️ Customization

The game is built with modularity in mind. You can easily customize:

### Game Parameters (in `hourglass_game.js`)
```javascript
this.maxParticles = 200;        // Number of sand particles
this.sandFlowRate = 0.001;      // How fast sand spawns
this.gravityStrength = 0.5;     // Gravity force
this.timer = 30;                // Starting time
```

### Visual Styling (in `hourglass_game.css`)
- Colors and gradients
- Animation speeds and effects
- UI layout and positioning
- Responsive breakpoints

### Game Mechanics
- Scoring system
- Level progression
- Particle behavior
- Special effects

## 📱 Mobile Support

The game includes full mobile support with:
- Touch controls for flipping and collecting
- Responsive canvas scaling
- Mobile-optimized UI layout
- Touch-friendly button sizes

## 🎯 Future Enhancements

Potential features for future versions:
- Sound effects and background music
- Power-ups and special abilities
- Multiple hourglass designs
- Leaderboard system
- Achievement system
- Multiplayer mode

## 🐛 Troubleshooting

### Common Issues
1. **Game not loading**: Ensure JavaScript is enabled in your browser
2. **Poor performance**: Try reducing particle count in game settings
3. **Canvas not displaying**: Check browser HTML5 Canvas support
4. **Controls not working**: Verify JavaScript console for errors

### Performance Tips
- Close unnecessary browser tabs
- Use hardware acceleration if available
- Update your browser to the latest version

## 📄 License

This game is open source and free to use, modify, and distribute. Perfect for learning HTML5 game development or as a base for your own projects.

---

**Enjoy playing the Hourglass Game! ⏳**

*Challenge yourself to achieve the highest score and reach the highest level!*