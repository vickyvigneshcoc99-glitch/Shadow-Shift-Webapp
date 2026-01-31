import React, { useState, useEffect } from 'react'
import Login from './components/Login'
import Game from './components/Game'
import './styles/App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('shadowShiftUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUsername(user.username)
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (name) => {
    setUsername(name)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('shadowShiftUser')
    setIsLoggedIn(false)
    setGameStarted(false)
    setUsername('')
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      {!gameStarted ? (
        <div className="menu">
          <div className="menu-header">
            <h1 className="welcome-title">
              Welcome, <span className="username-highlight">{username}</span>!
            </h1>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
          
          <div className="game-logo">
            <h1 className="main-title">Shadow Shift</h1>
            <div className="title-underline"></div>
          </div>
          
          <p className="game-description">
            Master the art of dimension switching to conquer 4 challenging levels!
          </p>
          
          <div className="controls-info">
            <div className="control-item">
              <span className="control-key">←→</span>
              <span className="control-label">Move</span>
            </div>
            <div className="control-item">
              <span className="control-key">SPACE</span>
              <span className="control-label">Jump</span>
            </div>
            <div className="control-item">
              <span className="control-key">SHIFT</span>
              <span className="control-label">Switch</span>
            </div>
          </div>
          
          <button onClick={() => setGameStarted(true)} className="start-btn">
            <span className="btn-text">Start Adventure</span>
            <div className="btn-ripple"></div>
          </button>
          
          <div className="stats-preview">
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <div className="stat-label">Best Score</div>
                <div className="stat-value">{localStorage.getItem('bestScore') || '0'}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <div className="stat-label">Levels Completed</div>
                <div className="stat-value">{localStorage.getItem('levelsCompleted') || '0'}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Game username={username} onExit={() => setGameStarted(false)} />
      )}
    </div>
  )
}

export default App
