import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/loginPages/Signup'
import Login from './pages/loginPages/Login'
import HomePage from './pages/homePages/HomePage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

       <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/signup" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
