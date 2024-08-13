import React from "react"
import { HashRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/nav-bar'
import Home from './pages/home'
import LiveCanvas from './pages/live-canvas'
import About from './pages/about'
import './app.scss'

export default () => {
    return (
        <React.StrictMode>
            <HashRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/live-canvas/:channel/:color" element={<LiveCanvas />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </HashRouter>
        </React.StrictMode>
    )
}