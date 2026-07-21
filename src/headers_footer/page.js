import React, { useState, useEffect, useRef } from 'react';
import './Birthday.css';

function Page() {
  const [currentSection, setCurrentSection] = useState(0);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const typewriterRef = useRef(null);
  const TOTAL_SECTIONS = 3;

  const reasons = [
    "Your smile means everything —",
    "your eyes tells something",
    "Your presence makes reality & truth",
    "Your smile can brighten any day.",
    "Your eyes speak more than words.",
    "You make ordinary moments special.",
    "You have a heart of gold.",
    "You're beautifully unique.",
    "You light up every room.",
    "You're kind to everyone.",
  ];

  // Typewriter effect
  useEffect(() => {
    if (typewriterDone) return;
    const lines = [
      'Happy 20th Birthday',
      'Today isn\'t just another day...',
      'It\'s the day someone amazing',
      'came into this world. ✨'
    ];
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';
    const element = typewriterRef.current;
    if (!element) return;

    const type = () => {
      if (lineIndex >= lines.length) {
        setTypewriterDone(true);
        return;
      }
      const line = lines[lineIndex];
      if (charIndex < line.length) {
        currentText += line[charIndex];
        element.innerHTML = currentText + '<span class="cursor"></span>';
        charIndex++;
        setTimeout(type, 30 + Math.random() * 40);
      } else {
        currentText += '<br>';
        element.innerHTML = currentText + '<span class="cursor"></span>';
        lineIndex++;
        charIndex = 0;
        setTimeout(type, 400);
      }
    };
    type();
  }, [typewriterDone]);

  // Confetti
  const fireConfetti = (count = 60) => {
    const colors = ['#f06292', '#ec407a', '#f8bbd0', '#ff80ab', '#ff4081', '#e91e63', '#ffb3c6', '#fce4ec', '#ffcdd2', '#ffd700', '#ff6f00'];
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = 6 + Math.random() * 16;
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.left = (Math.random() * 100) + '%';
      piece.style.top = '-10px';
      piece.style.animationDuration = (2 + Math.random() * 3.5) + 's';
      piece.style.animationDelay = (Math.random() * 1.5) + 's';
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      container.appendChild(piece);
      setTimeout(() => { if (piece.parentNode) piece.remove(); }, 6000);
    }
  };

  useEffect(() => {
    setTimeout(() => fireConfetti(30), 1500);
  }, []);

  const goToSection = (index) => {
    if (index < 0 || index >= TOTAL_SECTIONS) return;
    setCurrentSection(index);
    if (index === 1) {
      setGiftOpened(false);
      setShowReasons(false);
    }
    if (index === 2) {
      fireConfetti(80);
      setTimeout(() => fireConfetti(60), 500);
      setTimeout(() => fireConfetti(40), 1000);
    }
  };

  const openGiftBox = () => {
    if (giftOpened) return;
    setGiftOpened(true);
    setTimeout(() => {
      setShowReasons(true);
      fireConfetti(40);
    }, 1600);
  };

  const renderReasons = () => {
    return reasons.map((reason, index) => (
      <div key={index} className="reason-card" style={{ animationDelay: (index * 0.05) + 's' }}>
        <span className="num">{index + 1}</span>
        <span className="text">{reason}</span>
      </div>
    ));
  };

  return (
    <div className="App">
      {/* Stars Background */}
      <div className="stars" id="starsContainer">
        {[...Array(80)].map((_, i) => (
          <div key={i} className="star" style={{
            width: 1 + Math.random() * 3 + 'px',
            height: 1 + Math.random() * 3 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDuration: (2 + Math.random() * 4) + 's',
            animationDelay: (Math.random() * 5) + 's',
            opacity: 0.3 + Math.random() * 0.5
          }} />
        ))}
      </div>

      {/* Confetti Container */}
      <div className="confetti-container" id="confettiContainer"></div>

      {/* Main Container */}
      <div className="main-container">
        <div className="book-card">
          {/* Section 0: Hero */}
          {currentSection === 0 && (
            <div className="section active">
              <div className="hero-section">
                <div className="balloons-container">
                  {['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'].map((balloon, i) => (
                    <span key={i} className="balloon" style={{
                      animationDuration: (2.8 + i * 0.5) + 's',
                      animationDelay: (i * 0.3) + 's'
                    }}>{balloon}</span>
                  ))}
                </div>
                <h1 className="hero-title">Happy 20th Birthday🌸</h1>
                <div className="age-display">🎂 20 🎂</div>
                <p className="hero-subtitle">✨ Welcome to this beautiful world 20 years ago... ✨</p>
                <div className="typewriter-container">
                  <div className="typewriter-text">
                    <span ref={typewriterRef}></span>
                  </div>
                </div>
                <div className="btn-group">
                  <button className="btn-primary" onClick={() => { goToSection(1); setTimeout(openGiftBox, 600); }}>
                    ✨ A moment just for you...<br />Click here ... ✨
                  </button>
                </div>
                <p style={{ marginTop: 35, fontSize: '0.9rem', color: '#6a1b3a', opacity: 0.7 }}>
                  ✨ Something Something...✨
                </p>
              </div>
            </div>
          )}

          {/* Section 1: Gift */}
          {currentSection === 1 && (
            <div className="section active">
              <div className="gift-section">
                <h2 style={{ color: '#880e4f', fontFamily: "'Dancing Script', cursive", fontSize: '2.5rem' }}>🎁</h2>
                <p style={{ color: '#6a1b3a', marginBottom: 10 }}>Tap the box to open it!</p>
                <div className="gift-box-container" onClick={openGiftBox}>
                  <div className={`gift-box ${giftOpened ? 'open' : ''}`}>
                    <div className="gift-box-front">
                      <div className="ribbon">🎀</div>
                      <div className="label">10 Quotes on you...</div>
                    </div>
                    <div className="gift-box-back">
                      <div className="big-emoji">🌸</div>
                      <div style={{ fontWeight: 700 }}>For You</div>
                    </div>
                  </div>
                </div>
                {showReasons && (
                  <div id="reasonsContainer" style={{ display: 'block' }}>
                    <div className="reasons-grid">
                      {renderReasons()}
                    </div>
                    <button className="btn-primary" onClick={() => goToSection(2)} style={{ marginTop: 15 }}>
                      💫 See Final Wish 💫
                    </button>
                  </div>
                )}
                <button className="btn-secondary" onClick={() => goToSection(0)} style={{ marginTop: 15 }}>
                  ⬅️ Back
                </button>
              </div>
            </div>
          )}

          {/* Section 2: Final */}
          {currentSection === 2 && (
            <div className="section active">
              <div className="final-section">
                <div className="big-text">Happy 20th Birthday, Bhumi 🌸</div>
                <div className="poem">
                  <span>🌸 May this new chapter bring 🌸</span>
                  <span>✨ endless happiness ✨</span>
                  <span>📖 beautiful memories 📖</span>
                  <span>🌟 and dreams that come true 🌟</span>
                  <span style={{ marginTop: 15, fontFamily: "'Dancing Script', cursive", fontSize: '1.8rem', color: '#e91e63' }}>
                    Keep smiling 💖
                  </span>
                </div>
                <div style={{ marginTop: 25, fontSize: '3rem' }}>🎉🎂🎈</div>
                <button className="btn-secondary" onClick={() => { setGiftOpened(false); setShowReasons(false); goToSection(0); fireConfetti(50); }} style={{ marginTop: 20 }}>
                  🔄 Start Over
                </button>
              </div>
            </div>
          )}

          {/* Page Indicator */}
          <div className="page-indicator">
            {[0, 1, 2].map((index) => (
              <span key={index} className={`page-dot ${currentSection === index ? 'active' : ''}`} onClick={() => goToSection(index)} />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="nav-arrows">
            <button className="nav-arrow" disabled={currentSection === 0} onClick={() => goToSection(currentSection - 1)}>◀</button>
            <button className="nav-arrow" disabled={currentSection === TOTAL_SECTIONS - 1} onClick={() => goToSection(currentSection + 1)}>▶</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;