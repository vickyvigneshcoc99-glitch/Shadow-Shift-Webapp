# Shadow Shift - Platformer Game

A dimension-hopping platformer game built with React and Canvas.

## Features

- Smooth character movement and physics
- Dimension switching mechanic (Light & Shadow worlds)
- Different platforms in each dimension
- Collectible items
- Score tracking
- Responsive controls

## Controls

- **Arrow Keys (← →)**: Move left/right
- **SPACE**: Jump
- **SHIFT**: Switch between Light and Shadow dimensions

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The game will automatically open at `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
shadow-shift-game/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   └── Game.jsx     # Main game component
│   ├── styles/          # CSS files
│   │   ├── index.css
│   │   ├── App.css
│   │   └── Game.css
│   ├── assets/          # Images, sounds (future)
│   ├── utils/           # Helper functions (future)
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## Future Enhancements

- Multiple levels with increasing difficulty
- Enemy AI and obstacles
- Power-ups and special abilities
- Sound effects and music
- Level editor
- High score leaderboard
- Mobile touch controls

## Technologies Used

- React 18
- Vite (build tool)
- Canvas API (for game rendering)
- CSS3 (for styling)

---

Made with ❤️ using React
