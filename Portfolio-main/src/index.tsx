import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App'
// Self-hosted faces, latin only, font-display: swap.
import '@fontsource-variable/schibsted-grotesk/wght.css'
import '@fontsource/source-serif-4/latin-400.css'
import '@fontsource/source-serif-4/latin-600.css'
import '@fontsource/fira-code/latin-400.css'
import './index.scss'

ReactDOM.render(<App />, document.getElementById('root'))
