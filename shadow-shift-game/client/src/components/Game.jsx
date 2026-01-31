import React, { useEffect, useRef, useState } from 'react'
import '../styles/Game.css'

const Game = ({ username, onExit }) => {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [dimension, setDimension] = useState('light')
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [levelComplete, setLevelComplete] = useState(false)

  // Use a ref for keys so event listeners always access current state without re-binding
  const keysRef = useRef({
    ArrowLeft: false,
    ArrowRight: false,
    Space: false,
    Shift: false,
    KeyZ: false // Dash
  })

  // Touch state for UI feedback
  const [touchState, setTouchState] = useState({
    left: false,
    right: false,
    jump: false,
    dash: false,
    switch: false
  })

  // Particles
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Internal resolution (game logic units)
    canvas.width = 900
    canvas.height = 600

    // Level configurations
    const levels = {
      1: {
        name: "Tutorial Valley",
        lightPlatforms: [
          { x: 0, y: 550, width: 900, height: 50 },
          { x: 200, y: 450, width: 150, height: 20 },
          { x: 450, y: 350, width: 150, height: 20 },
          { x: 700, y: 250, width: 150, height: 20 },
        ],
        shadowPlatforms: [
          { x: 0, y: 550, width: 900, height: 50 },
          { x: 150, y: 400, width: 150, height: 20 },
          { x: 500, y: 300, width: 150, height: 20 },
          { x: 250, y: 200, width: 150, height: 20 },
        ],
        movingPlatforms: [],
        spikes: [],
        collectibles: [
          { x: 250, y: 410, collected: false },
          { x: 500, y: 310, collected: false },
        ],
        goal: { x: 800, y: 200, width: 40, height: 40 }
      },
      2: {
        name: "Moving Meadows",
        lightPlatforms: [
          { x: 0, y: 550, width: 200, height: 50 },
          { x: 400, y: 450, width: 150, height: 20 },
          { x: 700, y: 350, width: 150, height: 20 },
        ],
        shadowPlatforms: [
          { x: 0, y: 550, width: 200, height: 50 },
          { x: 300, y: 400, width: 150, height: 20 },
          { x: 600, y: 300, width: 150, height: 20 },
        ],
        movingPlatforms: [
          { x: 200, y: 500, width: 120, height: 20, speedX: 2, direction: 1, range: 200, startX: 200 },
          { x: 550, y: 250, width: 120, height: 20, speedX: 1.5, direction: 1, range: 150, startX: 550 },
        ],
        spikes: [
          { x: 220, y: 530, width: 160, height: 20 },
        ],
        collectibles: [
          { x: 450, y: 410, collected: false },
          { x: 750, y: 310, collected: false },
          { x: 610, y: 210, collected: false },
        ],
        goal: { x: 820, y: 300, width: 40, height: 40 }
      },
      3: {
        name: "Spike Canyon",
        lightPlatforms: [
          { x: 0, y: 550, width: 150, height: 50 },
          { x: 300, y: 450, width: 120, height: 20 },
          { x: 550, y: 350, width: 120, height: 20 },
          { x: 750, y: 250, width: 120, height: 20 },
        ],
        shadowPlatforms: [
          { x: 0, y: 550, width: 150, height: 50 },
          { x: 200, y: 400, width: 120, height: 20 },
          { x: 450, y: 300, width: 120, height: 20 },
          { x: 700, y: 200, width: 120, height: 20 },
        ],
        movingPlatforms: [
          { x: 150, y: 500, width: 100, height: 20, speedX: 2.5, direction: 1, range: 120, startX: 150 },
          { x: 420, y: 350, width: 100, height: 20, speedY: 2, direction: 1, range: 100, startY: 350, vertical: true },
        ],
        spikes: [
          { x: 170, y: 530, width: 110, height: 20 },
          { x: 320, y: 530, width: 220, height: 20 },
          { x: 580, y: 530, width: 160, height: 20 },
        ],
        collectibles: [
          { x: 350, y: 410, collected: false },
          { x: 600, y: 310, collected: false },
          { x: 480, y: 210, collected: false },
        ],
        goal: { x: 830, y: 150, width: 40, height: 40 }
      },
      4: {
        name: "The Gauntlet",
        lightPlatforms: [
          { x: 0, y: 550, width: 120, height: 50 },
          { x: 250, y: 450, width: 100, height: 20 },
          { x: 500, y: 350, width: 100, height: 20 },
          { x: 700, y: 250, width: 100, height: 20 },
        ],
        shadowPlatforms: [
          { x: 0, y: 550, width: 120, height: 50 },
          { x: 180, y: 400, width: 100, height: 20 },
          { x: 400, y: 300, width: 100, height: 20 },
          { x: 650, y: 200, width: 100, height: 20 },
        ],
        movingPlatforms: [
          { x: 120, y: 500, width: 100, height: 20, speedX: 3, direction: 1, range: 100, startX: 120 },
          { x: 350, y: 400, width: 100, height: 20, speedY: 2.5, direction: 1, range: 120, startY: 400, vertical: true },
          { x: 550, y: 200, width: 80, height: 20, speedX: 2, direction: 1, range: 80, startX: 550 },
        ],
        spikes: [
          { x: 140, y: 530, width: 90, height: 20 },
          { x: 270, y: 530, width: 220, height: 20 },
          { x: 520, y: 530, width: 160, height: 20 },
          { x: 720, y: 530, width: 100, height: 20 },
        ],
        collectibles: [
          { x: 280, y: 410, collected: false },
          { x: 530, y: 310, collected: false },
          { x: 730, y: 210, collected: false },
          { x: 680, y: 160, collected: false },
        ],
        goal: { x: 830, y: 150, width: 40, height: 40 }
      }
    }

    const levelData = levels[currentLevel]

    // Player object
    const player = {
      x: 50,
      y: 500,
      width: 28,
      height: 28,
      velocityY: 0,
      velocityX: 0,
      speed: 4.5,
      jumpPower: 11,
      gravity: 0.45,
      onGround: false,
      isMoving: false,
      isDashing: false,
      dashCooldown: 0,
      direction: 1,
      invincible: false,
      invincibleTime: 0
    }

    let collectibles = levelData.collectibles.map(c => ({ ...c }))

    // Particle class
    class Particle {
      constructor(x, y, color, speed, size, life) {
        this.x = x
        this.y = y
        this.color = color
        this.vx = (Math.random() - 0.5) * speed
        this.vy = (Math.random() - 0.5) * speed
        this.size = size
        this.life = life
        this.maxLife = life
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life--
        this.size *= 0.95
      }

      draw(ctx) {
        ctx.globalAlpha = this.life / this.maxLife
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.size, this.size)
        ctx.globalAlpha = 1
      }
    }

    const createParticles = (x, y, count, color) => {
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(x, y, color, 5, Math.random() * 5 + 2, 30))
      }
    }

    const handleKeyDown = (e) => {
      // Prevent default scrolling for game keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault()
      }

      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keysRef.current.Shift = true
      if (e.code === 'Space') keysRef.current.Space = true
      if (e.code === 'ArrowLeft') keysRef.current.ArrowLeft = true
      if (e.code === 'ArrowRight') keysRef.current.ArrowRight = true
      if (e.code === 'KeyZ') keysRef.current.KeyZ = true

      if ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') && !e.repeat) {
        setDimension(prev => prev === 'light' ? 'shadow' : 'light')
        createParticles(player.x, player.y, 10, '#FFF')
      }
    }

    const handleKeyUp = (e) => {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keysRef.current.Shift = false
      if (e.code === 'Space') keysRef.current.Space = false
      if (e.code === 'ArrowLeft') keysRef.current.ArrowLeft = false
      if (e.code === 'ArrowRight') keysRef.current.ArrowRight = false
      if (e.code === 'KeyZ') keysRef.current.KeyZ = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const checkCollision = (rect1, rect2) => {
      return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    }

    const resetPlayer = () => {
      player.x = 50
      player.y = 500
      player.velocityY = 0
      player.velocityX = 0
      player.invincible = true
      player.invincibleTime = 60
      createParticles(player.x, player.y, 20, '#FF0000')

      setLives(prev => {
        const newLives = prev - 1
        if (newLives <= 0) {
          setGameOver(true)
        }
        return newLives
      })
    }

    let frameCount = 0
    let animationId

    const gameLoop = () => {
      if (gameOver || levelComplete) return

      frameCount++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      if (dimension === 'light') {
        gradient.addColorStop(0, '#87CEEB')
        gradient.addColorStop(1, '#E0F6FF')
      } else {
        gradient.addColorStop(0, '#0f0f1e')
        gradient.addColorStop(1, '#1a1a3e')
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update moving platforms
      levelData.movingPlatforms.forEach(platform => {
        if (platform.vertical) {
          platform.y += platform.speedY * platform.direction
          if (platform.y <= platform.startY - platform.range || platform.y >= platform.startY) {
            platform.direction *= -1
          }
        } else {
          platform.x += platform.speedX * platform.direction
          if (platform.x <= platform.startX - platform.range || platform.x >= platform.startX + platform.range) {
            platform.direction *= -1
          }
        }
      })

      const currentPlatforms = dimension === 'light' ? levelData.lightPlatforms : levelData.shadowPlatforms

      // Draw static platforms with shadow
      ctx.fillStyle = dimension === 'light' ? '#8B4513' : '#4a4a6a'
      currentPlatforms.forEach(platform => {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
        ctx.shadowBlur = 5
        ctx.shadowOffsetY = 3
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
      })

      // Draw moving platforms
      ctx.fillStyle = dimension === 'light' ? '#CD853F' : '#6a5a8a'
      levelData.movingPlatforms.forEach(platform => {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
        ctx.shadowBlur = 5
        ctx.shadowOffsetY = 3
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height)
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
      })

      // Draw spikes
      levelData.spikes.forEach(spike => {
        ctx.fillStyle = '#DC143C'
        const spikeCount = Math.floor(spike.width / 20)
        for (let i = 0; i < spikeCount; i++) {
          ctx.beginPath()
          ctx.moveTo(spike.x + i * 20, spike.y + spike.height)
          ctx.lineTo(spike.x + i * 20 + 10, spike.y)
          ctx.lineTo(spike.x + i * 20 + 20, spike.y + spike.height)
          ctx.fill()
        }
      })

      // Draw collectibles with animation
      collectibles.forEach(item => {
        if (!item.collected) {
          const pulse = Math.sin(frameCount * 0.1) * 2
          ctx.fillStyle = '#FFD700'
          ctx.shadowColor = '#FFA500'
          ctx.shadowBlur = 10 + pulse
          ctx.beginPath()
          ctx.arc(item.x, item.y, 10 + pulse, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      // Draw goal with animation
      const goalPulse = Math.sin(frameCount * 0.05) * 5
      ctx.fillStyle = '#00FF00'
      ctx.shadowColor = '#00FF00'
      ctx.shadowBlur = 20 + goalPulse
      ctx.fillRect(levelData.goal.x - goalPulse / 2, levelData.goal.y - goalPulse / 2,
        levelData.goal.width + goalPulse, levelData.goal.height + goalPulse)
      ctx.shadowBlur = 0

      // --- PLAYER PHYSICS & LOGIC ---

      // Dash Logic
      if (player.dashCooldown > 0) player.dashCooldown--

      if (keysRef.current.KeyZ && player.dashCooldown === 0 && !player.isDashing) {
        player.isDashing = true
        player.dashCooldown = 60 // 1 second cooldown
        player.velocityX = player.direction * 15 // Dash speed
        player.velocityY = 0 // cancel gravity momentarily
        createParticles(player.x, player.y, 10, '#FFF')
      }

      if (player.isDashing) {
        player.velocityX *= 0.9 // Friction slows dash
        if (Math.abs(player.velocityX) < player.speed) {
          player.isDashing = false
        }
      } else {
        // Normal Movement
        if (keysRef.current.ArrowLeft) {
          player.velocityX = Math.max(player.velocityX - 0.5, -player.speed)
          player.direction = -1
          player.isMoving = true
        } else if (keysRef.current.ArrowRight) {
          player.velocityX = Math.min(player.velocityX + 0.5, player.speed)
          player.direction = 1
          player.isMoving = true
        } else {
          player.velocityX *= 0.8
          if (Math.abs(player.velocityX) < 0.1) {
            player.velocityX = 0
            player.isMoving = false
          }
        }
      }

      // Jump
      if (keysRef.current.Space && player.onGround) {
        player.velocityY = -player.jumpPower
        player.onGround = false
        createParticles(player.x + player.width / 2, player.y + player.height, 5, '#FFF')
      }

      player.velocityY += player.gravity
      player.x += player.velocityX
      player.y += player.velocityY

      // Platform collision
      player.onGround = false
      const allPlatforms = [...currentPlatforms, ...levelData.movingPlatforms]

      allPlatforms.forEach(platform => {
        if (checkCollision(
          { x: player.x, y: player.y + player.velocityY, width: player.width, height: player.height },
          platform
        ) && player.velocityY >= 0) {
          // just landed
          if (!player.onGround && player.velocityY > 1) {
            createParticles(player.x + player.width / 2, platform.y, 5, 'rgba(255,255,255,0.5)')
          }

          player.y = platform.y - player.height
          player.velocityY = 0
          player.onGround = true

          // Move with moving platform
          if (platform.speedX) {
            player.x += platform.speedX * platform.direction
          }
        }
      })

      // Spike collision
      if (!player.invincible && !player.isDashing) { // Invincible during dash? Maybe too OP, keep regular invincible
        levelData.spikes.forEach(spike => {
          if (checkCollision(player, spike)) {
            resetPlayer()
          }
        })
      }

      if (player.invincible) {
        player.invincibleTime--
        if (player.invincibleTime <= 0) {
          player.invincible = false
        }
      }

      // Collect items
      collectibles.forEach(item => {
        if (!item.collected && checkCollision(player, { x: item.x - 10, y: item.y - 10, width: 20, height: 20 })) {
          item.collected = true
          setScore(prev => prev + 10)
          createParticles(item.x, item.y, 15, '#FFD700')
        }
      })

      // Goal collision
      if (checkCollision(player, levelData.goal)) {
        setLevelComplete(true)
      }

      // Boundaries
      if (player.x < 0) player.x = 0
      if (player.x + player.width > canvas.width) player.x = canvas.width - player.width
      if (player.y > canvas.height) {
        resetPlayer()
      }

      // Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.update()
        p.draw(ctx)
        if (p.life <= 0) {
          particlesRef.current.splice(i, 1)
        }
      }

      // Draw player with animation
      if (!player.invincible || frameCount % 10 < 5) {
        ctx.fillStyle = dimension === 'light' ? '#FF6B6B' : '#9B59B6'

        if (player.isDashing) {
          ctx.fillStyle = '#FFF' // Flash white when dashing
          // Dash trail
          createParticles(player.x + player.width / 2, player.y + player.height / 2, 1, dimension === 'light' ? '#FF6B6B' : '#9B59B6')
        }

        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
        ctx.shadowBlur = 5
        ctx.shadowOffsetY = 2

        // Body
        ctx.fillRect(player.x, player.y, player.width, player.height)

        // Eyes
        ctx.fillStyle = '#FFF'
        const lookDir = player.direction > 0 ? 1 : 0
        ctx.fillRect(player.x + 7 + (lookDir * 5), player.y + 7, 5, 5)
        ctx.fillRect(player.x + 16 + (lookDir * 5), player.y + 7, 5, 5)

        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
      }

      animationId = requestAnimationFrame(gameLoop)
    }

    animationId = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [dimension, currentLevel, gameOver, levelComplete])

  const nextLevel = () => {
    if (currentLevel < 4) {
      const newScore = score + 50
      setCurrentLevel(prev => prev + 1)
      setLevelComplete(false)
      setScore(newScore)

      // Save stats
      const bestScore = localStorage.getItem('bestScore') || 0
      if (newScore > bestScore) {
        localStorage.setItem('bestScore', newScore)
      }
      const levelsCompleted = localStorage.getItem('levelsCompleted') || 0
      if (currentLevel > levelsCompleted) {
        localStorage.setItem('levelsCompleted', currentLevel)
      }
    } else {
      // Game completed
      const finalScore = score + 100
      setScore(finalScore)
      const bestScore = localStorage.getItem('bestScore') || 0
      if (finalScore > bestScore) {
        localStorage.setItem('bestScore', finalScore)
      }
      localStorage.setItem('levelsCompleted', '4')
      alert('🎉 Congratulations! You completed all levels! 🎉')
      resetGame()
    }
  }

  const resetGame = () => {
    setCurrentLevel(1)
    setScore(0)
    setLives(3)
    setGameOver(false)
    setLevelComplete(false)
  }

  const levelNames = {
    1: "Tutorial Valley",
    2: "Moving Meadows",
    3: "Spike Canyon",
    4: "The Gauntlet"
  }

  // Touch Handlers
  const handleTouchStart = (action) => (e) => {
    e.preventDefault() // prevent mouse emulation
    setTouchState(prev => ({ ...prev, [action]: true }))

    if (action === 'left') keysRef.current.ArrowLeft = true
    if (action === 'right') keysRef.current.ArrowRight = true
    if (action === 'jump') keysRef.current.Space = true
    if (action === 'dash') keysRef.current.KeyZ = true
    if (action === 'switch') {
      keysRef.current.Shift = true
      setDimension(prev => prev === 'light' ? 'shadow' : 'light')
    }
  }

  const handleTouchEnd = (action) => (e) => {
    e.preventDefault()
    setTouchState(prev => ({ ...prev, [action]: false }))

    if (action === 'left') keysRef.current.ArrowLeft = false
    if (action === 'right') keysRef.current.ArrowRight = false
    if (action === 'jump') keysRef.current.Space = false
    if (action === 'dash') keysRef.current.KeyZ = false
    if (action === 'switch') keysRef.current.Shift = false
  }

  return (
    <div className="game-container">
      <div className="rotate-warning">
        <div className="rotate-icon">📱➡️</div>
        <p>Please Rotate Your Device</p>
      </div>
      <div className="game-info">
        <button onClick={onExit} className="exit-btn" title="Back to Menu">
          ← Menu
        </button>
        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(e => console.log(e));
            } else {
              document.exitFullscreen();
            }
          }}
          className="exit-btn"
          style={{ marginLeft: '10px' }}
          title="Toggle Fullscreen"
        >
          ⛶
        </button>
        <div className="stat">Level: {currentLevel}</div>
        <div className="stat">❤️ {lives}</div>
        <div className="stat">Score: {score}</div>
        <div className="stat dimension">
          {dimension === 'light' ? '☀️' : '🌙'}
        </div>
      </div>

      <canvas ref={canvasRef} className="game-canvas" />

      {/* ON-SCREEN CONTROLS */}
      <div className="touch-controls">
        <div className="d-pad">
          <div
            className={`touch-btn left ${touchState.left ? 'active' : ''}`}
            onTouchStart={handleTouchStart('left')}
            onTouchEnd={handleTouchEnd('left')}
            onMouseDown={handleTouchStart('left')} // for testing on desktop
            onMouseUp={handleTouchEnd('left')}
          >
            ←
          </div>
          <div
            className={`touch-btn right ${touchState.right ? 'active' : ''}`}
            onTouchStart={handleTouchStart('right')}
            onTouchEnd={handleTouchEnd('right')}
            onMouseDown={handleTouchStart('right')}
            onMouseUp={handleTouchEnd('right')}
          >
            →
          </div>
        </div>

        <div className="controls-hint">
          Keyboard: Arrows to Move, Space to Jump, Shift to Switch, Z to Dash
        </div>

        <div className="action-buttons">
          {/* 
            User requested to remove Switch and Dash buttons.
            Keeping logic but hiding UI.
          */}
          <div
            className={`touch-btn jump ${touchState.jump ? 'active' : ''}`}
            onTouchStart={handleTouchStart('jump')}
            onTouchEnd={handleTouchEnd('jump')}
            onMouseDown={handleTouchStart('jump')}
            onMouseUp={handleTouchEnd('jump')}
            style={{ width: '90px', height: '90px' }} // Make jump button bigger
          >
            ⬆️
          </div>
        </div>
      </div>

      {gameOver && (
        <div className="overlay">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <button onClick={resetGame} className="restart-btn">Try Again</button>
        </div>
      )}

      {levelComplete && (
        <div className="overlay">
          <h2>Level Complete!</h2>
          <p>Score: {score}</p>
          <button onClick={nextLevel} className="next-btn">
            {currentLevel < 4 ? 'Next Level' : 'Play Again'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Game
