import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../fireBase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // navigate('/home')
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="signup-page">
      <header className="page-header">
        {/* <span className="page-logo">NETFLIX</span> */}
        <img className='page-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png' alt='logo'/>
      </header>
      <div className="signup-center">
        <div className="signup-card">
          <div className="form-heading">
            <h1>Enter your info to sign in</h1>
            <p style={{marginTop:8, color:'rgba(255,255,255,0.8)'}}>Or get started with a new account.</p>
          </div>
          {error && <div className="error">{error}</div>}
          <form className="signup-form" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email or mobile number" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            <button className="btn" type="submit">Continue</button>
          </form>
          <p className="help-text">New here? <a href="/signup">Create an account</a></p>
          <p className="recaptcha-text">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
        </div>
      </div>
    </div>
  )
}

export default Login
