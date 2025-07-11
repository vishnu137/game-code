# How to Run the Games

This workspace contains two games that you can run in your web browser.

## 🎮 Available Games

### 1. Hourglass Game ⏳ (Complete & Ready to Play)
**Location**: `hourglass_game.html`

**How to Run**:
```bash
# Option 1: Open directly in browser
xdg-open hourglass_game.html

# Option 2: Start a simple web server
python3 -m http.server 8000
# Then open: http://localhost:8000/hourglass_game.html

# Option 3: Use Node.js server (if available)
npx serve .
# Then open the provided URL and navigate to hourglass_game.html
```

**Game Features**:
- Realistic particle physics with sand simulation
- Strategic hourglass flipping mechanics
- Gold particle collection for bonus points
- Progressive difficulty levels
- Touch/mobile support

**Controls**:
- **Mouse**: Click "Flip Hourglass" button or canvas
- **Keyboard**: Space (flip), P (pause), R (restart)

### 2. 2048 Game (Incomplete - Missing HTML file)
**Available Files**: 
- `2048game.css` - Styling
- `2048game.js` - Game logic

**Status**: ⚠️ **Missing HTML file** - Cannot run without creating one

## 🚀 Quick Start

### For Hourglass Game:
1. **Simplest Method**: Double-click `hourglass_game.html` in your file manager
2. **Via Terminal**: Run `xdg-open hourglass_game.html` from the workspace directory
3. **With Web Server**: Start a local server for better performance

### Recommended: Using a Local Web Server

```bash
# Navigate to workspace
cd /workspace

# Start Python server
python3 -m http.server 8000

# Open in browser
# Go to: http://localhost:8000/hourglass_game.html
```

## 🔧 Browser Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- HTML5 Canvas support
- JavaScript enabled
- Recommended: Latest browser versions for best performance

## 📱 Device Support

- ✅ **Desktop**: Full feature support
- ✅ **Mobile**: Touch controls and responsive design
- ✅ **Tablet**: Optimized UI scaling

## 🎯 Game Objectives

### Hourglass Game:
- Keep the timer from reaching zero
- Flip the hourglass strategically to collect particles
- Collect gold particles for bonus points and time
- Survive as long as possible and achieve high scores

## 🛠️ Troubleshooting

### Common Issues:
1. **Game won't load**: Ensure JavaScript is enabled
2. **Poor performance**: Close other browser tabs, try Chrome
3. **File not found**: Make sure you're in the correct directory (`/workspace`)

### Performance Tips:
- Use a local web server instead of opening files directly
- Close unnecessary applications
- Use hardware acceleration in browser settings

---

**Ready to play! Start with the Hourglass Game for immediate fun! ⏳**