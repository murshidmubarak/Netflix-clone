import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authReducer, initialState } from '../../reducers/authReducer'
import './Signup.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../fireBase';
import { getCleanErrorMessage } from '../../utils/authErrors';

const Signup = () => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: 'SET_ERROR', payload: '' })

    if (!state.email || !state.password || !state.confirm) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Please fill in all fields'
      })
      return
    }

    if (state.password !== state.confirm) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Passwords do not match'
      })
      return
    }

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        state.password
      )
      console.log(userCredential.user)
      dispatch({
        type: 'RESET_FORM'
      })
      navigate('/home', { replace: true });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: getCleanErrorMessage(error)
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <header className="page-header">
        <span className="page-logo">NETFLIX</span>
      </header>
      <div className="signup-center">
        <div className="signup-card">
          <div className="form-heading">
            <h1>Sign Up</h1>
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>

            {state.error && <div className="error">{state.error}</div>}

            <input
              type="email"
              placeholder="Enter email"
              value={state.email}
              onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
              required
              minLength={6}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={state.confirm}
              onChange={(e) => dispatch({ type: 'SET_CONFIRM', payload: e.target.value })}
              required
            />
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Continue'}
            </button>

          </form>

          <p className="help-text">Already have an account? <a href="/login">Sign in</a></p>
          <p className="recaptcha-text">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
        </div>
      </div>
    </div>
  )
}

export default Signup

