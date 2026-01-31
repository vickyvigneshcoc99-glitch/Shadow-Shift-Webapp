# Shadow Shift

**SHADOW SHIFT** is a full-stack, dimension-switching 2D platformer built with React, Vite, and Express. It features 4 levels, smooth physics, and a custom Service Worker for PWA offline play. Optimized for Desktop and Android with mobile touch controls and a scoreboard API.

## 🎮 Game Features

-   **Dimension Shifting**: Switch between **Light** and **Shadow** worlds to alter level geometry instantly.
-   **4 Challenging Levels**: Tutorial Valley, Moving Meadows, Spike Canyon, and The Gauntlet.
-   **PWA & Offline Support**: Installable on Android/iOS with full offline gameplay capabilities via custom Service Workers.
-   **Native-like Controls**: Virtual D-Pad and Action buttons optimized for touch screens.
-   **Dynamic Physics**: Custom engine with particle effects, wall jumps, and dash mechanics.
-   **Backend Integration**: Node.js/Express server for score tracking and health monitoring.

## 📂 Project Structure

```
shadow-shift-game/
├── client/                 # Frontend (React + Vite)
│   ├── public/             # Static assets, PWA manifest, Service Worker
│   └── src/
│       ├── components/     # Game.jsx (Canvas logic), Login.jsx
│       └── styles/         # CSS for UI and animations
├── server/                 # Backend (Node.js + Express)
│   └── index.js            # API routes and static file serving
└── package.json            # Root scripts for concurrent execution
```

## 🕹️ Controls

### Desktop
-   **Arrow Keys**: Move
-   **Space**: Jump
-   **Shift**: Dimension Switch
-   **Z**: Dash

### Mobile
-   **Touch D-Pad**: Move Left/Right
-   **Touch Buttons**: Jump, Dash, Switch
-   **Fullscreen**: Logic handles device rotation and immersive mode.

## 🚀 Getting Started

### Prerequisites
-   Node.js (v14+ recommended)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/shadow-shift.git
    cd shadow-shift-game
    ```

2.  Install dependencies (Root, Client, and Server):
    ```bash
    npm run install-all
    ```

### local Development

To start the full-stack environment (React Client + Express Server):

```bash
npm start
```
-   **Game**: `http://localhost:5173`
-   **API**: `http://localhost:3000`

## 🛠️ Tech Stack

-   **Frontend**: React 18, Vite, HTML5 Canvas API
-   **Backend**: Node.js, Express.js
-   **PWA**: Web App Manifest, Service Workers
-   **Styling**: Pure CSS3 (Animations, Glassmorphism)
