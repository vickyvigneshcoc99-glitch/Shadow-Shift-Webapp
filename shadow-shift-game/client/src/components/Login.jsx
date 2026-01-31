import React, { useState } from 'react'
import '../styles/Login.css'

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    
    if (isSignUp && !formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (isSignUp && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Save to localStorage (simple demo - use real backend in production)
    if (isSignUp) {
      localStorage.setItem('shadowShiftUser', JSON.stringify({
        username: formData.username,
        email: formData.email
      }))
    }
    
    // Login successful
    onLogin(formData.username)
  }

  const handleGuestLogin = () => {
    onLogin('Guest')
  }

  return (
    <div className="login-container">
      {/* Animated background particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}></div>
        ))}
      </div>

      {/* Floating shapes */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Login card */}
      <div className={`login-card ${isSignUp ? 'signup-mode' : ''}`}>
        <div className="card-header">
          <h1 className="game-title">
            <span className="title-shadow">Shadow</span>
            <span className="title-shift">Shift</span>
          </h1>
          <p className="subtitle">Dimension-Hopping Platformer</p>
        </div>

        <div className="form-container">
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${!isSignUp ? 'active' : ''}`}
              onClick={() => setIsSignUp(false)}
            >
              Login
            </button>
            <button 
              className={`tab-btn ${isSignUp ? 'active' : ''}`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
            <div className={`tab-indicator ${isSignUp ? 'right' : 'left'}`}></div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="username"
                  placeholder=" "
                  value={formData.username}
                  onChange={handleChange}
                  className={errors.username ? 'error' : ''}
                />
                <label>Username</label>
                <div className="input-icon">👤</div>
              </div>
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            {isSignUp && (
              <div className="input-group slide-in">
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  <label>Email</label>
                  <div className="input-icon">📧</div>
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            )}

            <div className="input-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  name="password"
                  placeholder=" "
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                <label>Password</label>
                <div className="input-icon">🔒</div>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="submit-btn">
              <span>{isSignUp ? 'Create Account' : 'Start Playing'}</span>
              <div className="btn-glow"></div>
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button onClick={handleGuestLogin} className="guest-btn">
            <span>🎮 Play as Guest</span>
          </button>

          <div className="social-login">
            <button className="social-btn google">
              <span>G</span>
            </button>
            <button className="social-btn facebook">
              <span>f</span>
            </button>
            <button className="social-btn twitter">
              <span>𝕏</span>
            </button>
          </div>
        </div>

        {/* Decorative game character */}
        <div className="character-preview">
          <div className="character">
            <div className="character-body"></div>
            <div className="character-eyes">
              <div className="eye left"></div>
              <div className="eye right"></div>
            </div>
          </div>
          <div className="platform"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>Use Arrow Keys • SPACE to Jump • SHIFT to Switch Dimensions</p>
      </div>
    </div>
  )
}

export default Login
