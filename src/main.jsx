import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Polyfill global for simple-peer
window.global = window;

// Error boundary component for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Video Chat Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-red-600">Oops! Something went wrong</h2>
            <p className="text-gray-600">Please refresh the page or try again later.</p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Create root and render app with error boundary
const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
