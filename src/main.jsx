import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// MFD-004: Self-hosted fonts via @fontsource (replaces Google Fonts runtime @import)
// Run: bun add @fontsource/playfair-display @fontsource/dm-sans
// (or: npm install @fontsource/playfair-display @fontsource/dm-sans)
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/900.css'
import '@fontsource/dm-sans/300.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
