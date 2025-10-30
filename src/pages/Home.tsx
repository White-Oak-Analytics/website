import ParticleField from "../components/ParticleField";

export default function Home() {
  return (
    <div className="page">
      <ParticleField
        count={100}
        visualRange={75}
        speedLimit={15}
        gridSpacing={40}
        dotSize={1}
        style={{ zIndex: -10 }}
        backgroundColor="#F2F2F0"
        boidColor="#0C0C0C"
        dotColor="#A6A6A4"
      />

      {/* Radial blur overlay */}
      <div className="radial-blur"></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

        :root {
          --phi: 1.414;
          --invphi: calc(1 / var(--phi));
          --comp: calc(1 - var(--invphi));
        }

        /* Hard lock the viewport: no scrollbars ever */
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        /* Use fixed + inset:0 to avoid vh rounding/URL bar jumps causing scroll */
        .page {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          /* Removed fallback background color */
        }

        /* Radial blur overlay */
        .radial-blur {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(
            circle at center,
            transparent 0%,
            transparent 30%,
            rgba(242, 242, 240, 0.25) 50%,
            rgba(242, 242, 240, 0.75) 70%,
            rgba(242, 242, 240, 1) 100%
          );
          pointer-events: none;
          z-index: 0;
        }

        .box {
          position: absolute;
        }

        /* Mobile view: below 768px */
        @media (max-width: 768px) {
          .page {
            background: #F2F2F0;
            display: flex;
            flex-direction: column;
            padding: 0;
            height: 100vh;
            overflow: hidden;
          }

          .box,
          .divider-bar,
          .bottom-left-gradient,
          .yellow-content,
          .blue-content {
            display: none !important;
          }

          .radial-blur {
            display: block !important;
          }

          /* Mobile Header - Using Silver Ratio */
          .mobile-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            padding: 4vh 6vw 2vh 6vw;
            background: #0C0C0C;
            box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.15);
            z-index: 100;
            height: calc(100vh * var(--comp));
            box-sizing: border-box;
          }

          .mobile-logo-section {
            display: flex;
            align-items: flex-end;
            gap: 3vw;
            flex-shrink: 0;
          }

          .mobile-logo-section img {
            height: 10vh;
            width: auto;
          }

          .mobile-text-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .mobile-white-oak-text {
            font-family: 'Inter', sans-serif;
            font-size: 5.5vh;
            font-weight: 900;
            color: #F2F2F0;
            line-height: 1;
            margin: 0 0 0.5vh 0;
            letter-spacing: -0.3vh;
          }

          .mobile-analytics-text {
            font-family: 'Inter', sans-serif;
            font-size: 2.8vh;
            font-weight: 400;
            color: #F2F2F0;
            line-height: 1;
            margin: 0;
            letter-spacing: -0.2vh;
            border-bottom: 0.8vh solid #BDB0D9;
          }

          /* Horizontal divider bar */
          .mobile-divider-bar {
            width: 70vw;
            height: 1vh;
            background-color: #F2F2F0;
            border-radius: 0.2vh;
            margin: 2vh 0;
          }

          .mobile-nav {
            display: flex;
            gap: 8vw;
            width: 100%;
            justify-content: center;
            padding-bottom: 2vh;
          }

          .mobile-nav-link {
            font-family: 'Inter', sans-serif;
            font-size: 4vw;
            font-weight: 600;
            color: #F2F2F0;
            text-decoration: none;
            padding-bottom: 0.8vh;
            border-bottom: 0.8vh solid transparent;
            transition: border-bottom 0.2s ease;
          }

          .mobile-nav-link:hover {
            border-bottom: 0.8vh solid #BDB0D9;
          }

          .mobile-nav-link:active {
            border-bottom: 0.8vh solid #BDB0D9;
          }

          /* Mobile Simulation Area - Using Silver Ratio */
          .mobile-simulation {
            height: calc(100vh * var(--invphi));
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          /* Mobile Footer */
          .mobile-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 4vh 8vw;
            background: radial-gradient(
              circle at center,
              rgba(242, 242, 240, 1) 0%,
              rgba(242, 242, 240, 0.9) 40%,
              rgba(242, 242, 240, 0.6) 70%,
              rgba(242, 242, 240, 0.3) 100%
            );
            z-index: 10;
            box-sizing: border-box;
          }

          .mobile-footer-text {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: 3vw;
            font-weight: 400;
            color: #0C0C0C;
            line-height: 1.5;
            text-align: center;
            margin: 0;
          }
        }

        /* Tablet/Desktop: 769px and above */
        @media (min-width: 769px) {
          
          /* ADDED THIS BLOCK TO HIDE MOBILE ELEMENTS ON DESKTOP */
          .mobile-header,
          .mobile-simulation,
          .mobile-footer {
            display: none;
          }
          /* END OF ADDED BLOCK */

          .red {
            background: #0C0C0C;
            bottom: 0;
            left: 0;
            width: 100vw;
            height: calc(100vh * var(--invphi));
            opacity: 0;
          }

          .yellow {
            background: #0C0C0C;
            top: 0;
            left: 0;
            width: calc(100vw * var(--invphi));
            height: calc(100vh * var(--comp));
            opacity: 1;
            box-shadow: 0 0.63vh 1.27vh rgba(0, 0, 0, 0.5);
          }

          .yellow-content {
            position: absolute;
            top: 0;
            left: 0;
            width: calc(100vw * var(--invphi));
            height: calc(100vh * var(--comp));
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            z-index: 10;
            box-sizing: border-box;
            overflow: visible;
          }

          .yellow-links {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 3vw;
            margin-left: 4vw;
            position: relative;
            overflow: visible;
          }

          .yellow-link-wrapper {
            position: relative;
            text-align: left;
            display: flex;
            align-items: center;
            overflow: visible;
          }

          .yellow-link {
            font-family: 'Inter', sans-serif;
            font-size: clamp(1.2rem, 1.5vw + 0.5rem, 2rem);
            font-weight: 600;
            color: #F2F2F0;
            text-decoration: none;
            cursor: pointer;
            transition: opacity 0.2s ease, border-bottom 0.2s ease;
            border-bottom: 0.47vh solid transparent;
            padding-bottom: 0.32vh;
            display: inline-block;
            white-space: nowrap;
          }

          .yellow-link:hover {
            border-bottom: 0.47vh solid #BDB0D9;
          }

          .yellow-link-wrapper:hover .yellow-link {
            border-bottom: 0.47vh solid #BDB0D9;
          }

          .yellow-temp-text {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: clamp(0.8rem, 0.7vw + 0.5rem, 1rem);
            line-height: 1.5;
            font-weight: 400;
            color: #F2F2F0;
            text-align: left;
            margin: 0;
            margin-left: 0;
            max-width: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-width 0.4s ease, opacity 0.4s ease, margin-left 0.4s ease;
            white-space: nowrap;
            text-decoration: none;
          }

          .yellow-link-wrapper:hover .yellow-temp-text {
            max-width: 39vw;
            opacity: 1;
            margin-left: 2vw;
            text-decoration: none;
          }

          /* Short text versions for smaller screens */
          .yellow-temp-text-short {
            display: none;
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: clamp(0.8rem, 0.7vw + 0.5rem, 1rem);
            line-height: 1.5;
            font-weight: 400;
            color: #F2F2F0;
            text-align: left;
            margin: 0;
            margin-left: 0;
            max-width: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-width 0.4s ease, opacity 0.4s ease, margin-left 0.4s ease;
            white-space: nowrap;
            text-decoration: none;
          }

          .blue {
            background: #0C0C0C;
            top: 0;
            left: calc(100vw * var(--invphi));
            width: calc(100vw * var(--comp));
            height: calc(100vh * var(--comp));
            opacity: 1;
            box-shadow: 0 0.63vh 1.27vh rgba(0, 0, 0, 0.5);
          }

          .blue-content {
            position: absolute;
            top: 0;
            left: calc(100vw * var(--invphi));
            width: calc(100vw * var(--comp));
            height: calc(100vh * var(--comp));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }

          .glass-container {
            display: flex;
            align-items: flex-end;
            gap: 1.56vw;
            padding: 4.44vh 2.19vw 3.49vh 2.19vw;
            border-radius: 0.78vw;
          }

          .logo-container img {
            height: 11.89vh;
            width: auto;
          }

          .text-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .white-oak-text {
            font-family: 'Inter', sans-serif;
            font-size: 6.34vh;
            font-weight: 900;
            color: #F2F2F0;
            line-height: 1;
            margin: 0 0 0.63vh 0;
            letter-spacing: -0.16vw;
            word-spacing: 0.39vw;
          }

          .analytics-text {
            font-family: 'Inter', sans-serif;
            font-size: 3.17vh;
            font-weight: 400;
            color: #F2F2F0;
            line-height: 1;
            margin: 0;
            letter-spacing: -0.16vw;
            border-bottom: 0.47vh solid #BDB0D9;
          }

          .divider-bar {
            position: absolute;
            top: calc((100vh * var(--comp)) * 0.15);
            left: calc(100vw * var(--invphi) - 0.23vw);
            width: 0.16vw;
            height: calc((100vh * var(--comp)) * 0.7);
            background-color: #F2F2F0;
            border-radius: 0.08vw;
            z-index: 5;
            pointer-events: none;
          }

          .bottom-left-gradient {
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 3vw;
            width: 46vw;
            max-width: 56.25vw;
            box-sizing: border-box;
            background: radial-gradient(
              circle at center,
              rgba(242, 242, 240, 1) 0%,
              rgba(242, 242, 240, 0.85) 30%,
              rgba(242, 242, 240, 0.45) 60%,
              rgba(242, 242, 240, 0.0) 100%
            );
            z-index: 5;
            display: flex;
            align-items: flex-end;
          }

          .bottom-left-text {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: clamp(0.8rem, 0.8vw + 0.5rem, 1rem);
            font-weight: 400;
            color: #0C0C0C;
            line-height: 1.5;
            max-width: 90%;
            text-align: left;
          }
        }

        /* Below 1280px: show shorter text versions */
        @media (max-width: 1152px) and (min-width: 769px) {
          .yellow-temp-text {
            display: none !important;
          }

          .yellow-temp-text-short {
            display: block;
          }

          .yellow-link-wrapper:hover .yellow-temp-text-short {
            max-width: 25vw;
            opacity: 1;
            margin-left: 2vw;
          }
        }
      `}</style>

      {/* --- DESKTOP-ONLY ELEMENTS --- */}
      {/* These are hidden by the (max-width: 768px) media query */}
      <div className="box red"></div>
      <div className="box blue"></div>
      <div className="box yellow"></div>

      {/* White bar between blue and yellow */}
      <div className="divider-bar"></div>

      {/* Bottom-left paragraph with gradient */}
      <div className="bottom-left-gradient">
        <div className="bottom-left-text">
          We are a private research firm analyzing the frontier between mathematical theory and financial systems. Our work explores systemic patterns within data, forming insight and structure from disorder.
        </div>
      </div>

      <div className="yellow-content">
        <div className="yellow-links">
          <div className="yellow-link-wrapper">
            <a href="/about" className="yellow-link">About</a>
            <a href="/about" className="yellow-temp-text">
              A brief on our origins, philosophy, and direction.
            </a>
            <a href="/about" className="yellow-temp-text-short">
              Our story
            </a>
          </div>
          <div className="yellow-link-wrapper">
            <a href="/research" className="yellow-link">Research</a>
            <a href="/research" className="yellow-temp-text">
              An overview of our ongoing studies and findings.
            </a>
            <a href="/research" className="yellow-temp-text-short">
              Our work
            </a>
          </div>
          <div className="yellow-link-wrapper">
            <a href="/contact" className="yellow-link">Contact</a>
            <a href="/contact" className="yellow-temp-text">
              Reach out for inquiries, collaborations, or opportunities.
            </a>
            <a href="/contact" className="yellow-temp-text-short">
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="blue-content">
        <a href="/" className="logo-link" style={{ textDecoration: "none" }}>
          <div className="glass-container">
            <div className="logo-container">
              <img src="/WOA_logo_white.svg" alt="WOA Logo" />
            </div>
            <div className="text-container">
              <h1 className="white-oak-text">WHITE OAK</h1>
              <p className="analytics-text">Analysis .</p>
            </div>
          </div>
        </a>
      </div>

      {/* --- MOBILE-ONLY ELEMENTS --- */}
      {/* These are hidden by the (min-width: 769px) media query */}
      <div className="mobile-header">
        <a href="/" style={{ textDecoration: "none" }}>
          <div className="mobile-logo-section">
            <div className="mobile-logo-container">
              <img src="/WOA_logo_white.svg" alt="WOA Logo" />
            </div>
            <div className="mobile-text-container">
              <h1 className="mobile-white-oak-text">WHITE OAK</h1>
              <p className="mobile-analytics-text">Analysis .</p>
            </div>
          </div>
        </a>

        {/* Horizontal divider bar */}
        <div className="mobile-divider-bar"></div>

        <nav className="mobile-nav">
          <a href="/about" className="mobile-nav-link">About</a>
          <a href="/research" className="mobile-nav-link">Research</a>
          <a href="/contact" className="mobile-nav-link">Contact</a>
        </nav>
      </div>

      <div className="mobile-simulation">
        {/* Particle field shows here naturally */}
      </div>

      <div className="mobile-footer">
        <p className="mobile-footer-text">
          We are a private research firm analyzing the frontier between mathematical theory and financial systems. Our work explores systemic patterns within data, forming insight and structure from disorder.
        </p>
      </div>
    </div>
  );
}

