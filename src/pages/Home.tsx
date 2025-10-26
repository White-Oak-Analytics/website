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

        @media (min-width: 769px) {
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
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
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
            overflow: hidden;
          }

          .yellow-links {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 3vw;
            margin-left: 4vw;
            position: relative;
          }

          .yellow-link-wrapper {
            position: relative;
            text-align: left;
            display: flex;
            align-items: center;
          }

          .yellow-link {
            font-family: 'Inter', sans-serif;
            font-size: clamp(1.2rem, 1.5vw + 0.5rem, 2rem);
            font-weight: 600;
            color: #F2F2F0;
            text-decoration: none;
            cursor: pointer;
            transition: opacity 0.2s ease, border-bottom 0.2s ease;
            border-bottom: 3px solid transparent;
            padding-bottom: 2px;
            display: inline-block;
            white-space: nowrap;
          }

          .yellow-link:hover {
            border-bottom: 3px solid #BDB0D9;
          }

          .yellow-link-wrapper:hover .yellow-link {
            border-bottom: 3px solid #BDB0D9;
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
            max-width: 500px;
            opacity: 1;
            margin-left: 2vw;
            text-decoration: none;
          }

          .blue {
            background: #0C0C0C;
            top: 0;
            left: calc(100vw * var(--invphi));
            width: calc(100vw * var(--comp));
            height: calc(100vh * var(--comp));
            opacity: 1;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
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
            gap: 20px;
            padding: 28px 28px 22px 28px;
            border-radius: 10px;
          }

          .logo-container img {
            height: 75px;
            width: auto;
          }

          .text-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .white-oak-text {
            font-family: 'Inter', sans-serif;
            font-size: 40px;
            font-weight: 900;
            color: #F2F2F0;
            line-height: 1;
            margin: 0 0 4px 0;
            letter-spacing: -2px;
            word-spacing: 5px;
          }

          .analytics-text {
            font-family: 'Inter', sans-serif;
            font-size: 20px;
            font-weight: 400;
            color: #F2F2F0;
            line-height: 1;
            margin: 0;
            letter-spacing: -2px;
            border-bottom: 3px solid #BDB0D9;
          }

          .divider-bar {
            position: absolute;
            /* Centered vertically within ONLY the blue/yellow band */
            top: calc((100vh * var(--comp)) * 0.15); /* 15% of the band from the top */
            left: calc(100vw * var(--invphi) - 3px); /* center a 6px bar on the seam */
            width: 2px;
            height: calc((100vh * var(--comp)) * 0.7); /* 70% of the band height */
            background-color: #F2F2F0; /* off‑white, matches page bg */
            border-radius: 1px;
            z-index: 5;
            pointer-events: none;
          }

          .bottom-left-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 3vw;           /* space from edges */
            width: 46vw;            /* more horizontal */
            max-width: 720px;       /* widen cap */
            box-sizing: border-box;
            background: radial-gradient(
              circle at center,
              rgba(242, 242, 240, 1) 0%,      /* center fully opaque */
              rgba(242, 242, 240, 0.85) 30%,
              rgba(242, 242, 240, 0.45) 60%,
              rgba(242, 242, 240, 0.0) 100%    /* edges transparent */
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

        @media (max-width: 768px) {
          .page {
            display: flex;
            flex-direction: column;
          }

          .box {
            position: relative;
            width: 100%;
            flex-shrink: 0;
          }

          .yellow { order: 1; background: yellow; flex: 1; }
          .red    { order: 2; background: red;    flex: 4; }
          .blue   { order: 3; background: blue;   flex: 1; }

          /* Mobile: keep the paragraph readable */
          .bottom-left-gradient {
            position: absolute;
            bottom: 2vh;
            left: 2vw;
            width: 86vw;
            padding: 4vw;
            background: radial-gradient(
              circle at center,
              rgba(242,242,240,1) 0%,
              rgba(242,242,240,0.85) 35%,
              rgba(242,242,240,0.4) 70%,
              rgba(242,242,240,0) 100%
            );
            z-index: 5;
          }

          .divider-bar { display: none; }
        }
      `}</style>

      <div className="box red"></div>
      <div className="box blue"></div>
      <div className="box yellow"></div>

      {/* White bar between blue and yellow */}
      <div className="divider-bar"></div>

      {/* Bottom-left paragraph with gradient */}
      <div className="bottom-left-gradient">
        <div className="bottom-left-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </div>

      <div className="yellow-content">
        <div className="yellow-links">
          <div className="yellow-link-wrapper">
            <a href="/about" className="yellow-link">About</a>
            <a href="/about" className="yellow-temp-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </a>
          </div>
          <div className="yellow-link-wrapper">
            <a href="/research" className="yellow-link">Research</a>
            <a href="/research" className="yellow-temp-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </a>
          </div>
          <div className="yellow-link-wrapper">
            <a href="/contact" className="yellow-link">Contact</a>
            <a href="/contact" className="yellow-temp-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
              <p className="analytics-text">Analytics .</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
