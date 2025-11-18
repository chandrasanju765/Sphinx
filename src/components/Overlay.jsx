// components/Overlay.jsx
import { usePlay } from "../contexts/Play";
import { useScroll } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import "../assets/css/overlay.css";


export function Overlay() {
  const { setPlay } = usePlay();
  const scroll = useScroll();
  const overlayRef = useRef();
  const [activeSection, setActiveSection] = useState(0);

  // Auto-play on load
  useEffect(() => {
    setPlay(true);
  }, [setPlay]);

  // Update active section based on scroll
  useEffect(() => {
    const updateActiveSection = () => {
      if (!scroll) return;
      
      const offset = scroll.offset;
      console.log('Overlay scroll offset:', offset); // Debug log
      
      if (offset < 0.25) setActiveSection(0);
      else if (offset < 0.5) setActiveSection(1);
      else if (offset < 0.75) setActiveSection(2);
      else setActiveSection(3);
    };

    // Update on scroll
    const interval = setInterval(updateActiveSection, 100);
    return () => clearInterval(interval);
  }, [scroll]);

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="overlay__content">
        {/* Header Navigation */}
        <header className="header">
          <nav className="nav">
            <a href="#begin" className="nav__link">Begin</a>
            <a href="#about" className="nav__link">About</a>
            <a href="#news" className="nav__link">NewsEvent</a>
            
            {/* Logo in the center */}
            <div className="logo">
              {/* <span className="logo-text">SPHINX CODE</span> */}
            </div>
            
            <a href="#readings" className="nav__link">Readings</a>
            <a href="#wisdom" className="nav__link">Wisdom Keepers</a>
            <a href="#oracle" className="nav__link">Oracle</a>
            <button className="login-btn">Login</button>
          </nav>
        </header>

        {/* Main Text - Only 2 lines */}
        <div className="main-text">
          <div className="awaken-text">AWAKEN YOUR MAGIC & GENIUS</div>
          <div className="sphinx-code-text">SPHINX CODE</div>
        </div>

        {/* Scroll Instructions */}
        <div className="scroll-instructions">
          <div className="scroll-arrow">↓</div>
          <div className="scroll-text">Scroll to explore the journey</div>
        </div>

        {/* Scroll Progress */}
        <div className="scroll-progress-container">
          <div 
            className="scroll-progress" 
            style={{ width: `${(scroll?.offset || 0) * 100}%` }}
          />
        </div>

        {/* Progress Dots (minimal) */}
        <div className="minimal-progress-dots">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`minimal-dot ${index === activeSection ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="sikh-content">
            <a href="#content" className="sikh-link">Sikh to content</a>
          </div>
        </footer>
      </div>
    </div>
  );
}