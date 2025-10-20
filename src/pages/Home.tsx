import GameOfLife from "../components/GameOfLife";

export default function Home() {
  return (
    <div className="page">
      <GameOfLife
        background="#FCFCF8"
        fillRGB="242,242,240"
        aliveAlpha={1}
        style={{ zIndex: -1, pointerEvents: "none" }}
        cellSize={Math.max(8, Math.floor(window.innerWidth / 25))}
      />


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

        .box {
          position: absolute;
          opacity: 0.5;
        }

        @media (min-width: 769px) {
          .red {
            background: red;
            top: 0;
            left: 0;
            width: calc(100vw * var(--invphi));
            height: calc(100vh * var(--invphi));
            opacity: 0;
          }

          .blue {
            background: blue;
            top: 0;
            left: calc(100vw * var(--invphi));
            width: calc(100vw * var(--comp));
            height: calc(100vh * var(--invphi));
            opacity: 0;
          }

          .green {
            background: green;
            top: calc(100vh * var(--invphi));
            left: 0;
            width: calc(100vw * var(--invphi));
            height: calc(100vh * var(--comp));
            opacity: 0;
          }

          .yellow {
            background: yellow;
            top: calc(100vh * var(--invphi));
            left: calc(100vw * var(--invphi));
            width: calc(100vw * var(--comp));
            height: calc(100vh * var(--comp));
            opacity: 0;
          }

          .yellow-content {
            position: absolute;
            top: calc(100vh * var(--invphi) - 2vh); /* slightly up */
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
            padding: 28px 28px 22px 28px; /* reduced bottom padding */
            border-radius: 10px;
            /* optional subtle glass: uncomment if you want
            background: rgba(255,255,255,0.4);
            backdrop-filter: blur(16px);
            */
          }

          .logo-container img {
            height: 75px; /* slightly smaller */
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
            color: #0C0C0C;
            line-height: 1;
            margin: 0 0 4px 0;
            letter-spacing: -2px;
            word-spacing: 5px;
          }

          .analytics-text {
            font-family: 'Inter', sans-serif;
            font-size: 20px;
            font-weight: 400;
            color: #0C0C0C;
            line-height: 1;
            margin: 0;
            letter-spacing: -2px;
            border-bottom: 3px solid #BDB0D9;
          }

          /* ===== GREEN SECTION ===== */
          .green-content {
            position: absolute;
            top: calc(100vh * var(--invphi) + 4vh);
            left: 0;
            width: calc(100vw * var(--invphi));
            height: calc(100vh * var(--comp));
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            z-index: 10;
            padding: 3vh 4vw;
            box-sizing: border-box;
            overflow: hidden;
          }

          .green-text {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: clamp(0.9rem, 0.8vw + 0.6rem, 1.2rem);
            line-height: 1.5;
            font-weight: 400;
            color: #0C0C0C;
            text-align: left;
            margin: 0;
            max-width: 90%;
            overflow-wrap: anywhere;
            word-break: break-word;
            letter-spacing: -0.5px;
            word-spacing: 2px;
          }

          /* ===== BLUE SECTION ===== */
          .blue-content {
            position: absolute;
            top: 0;
            left: calc(100vw * var(--invphi));
            width: calc(100vw * var(--comp));
            height: calc(100vh * var(--invphi));
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-end;
            z-index: 10;
            box-sizing: border-box;
            overflow: hidden;
          }

          .blue-links {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 1.5vh;
            margin-top: calc(4vw * var(--phi));
            margin-right: 4vw;
            position: relative;
            padding-left: 15px;
          }

          .blue-links::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background: #0C0C0C;
            transform: translateX(100px);
            transition: transform 0.3s ease;
          }

          .blue-links:hover::before {
            transform: translateX(0);
            background: #BDB0D9;
          }

          .blue-link-wrapper {
            position: relative;
            text-align: right;
          }

          .blue-link {
            font-family: 'Inter', sans-serif;
            font-size: clamp(1.2rem, 1.5vw + 0.5rem, 2rem);
            font-weight: 600;
            color: #0C0C0C;
            text-decoration: none;
            cursor: pointer;
            transition: opacity 0.2s ease, border-bottom 0.2s ease;
            border-bottom: 3px solid transparent;
            padding-bottom: 2px;
            display: inline-block;
          }

          .blue-link:hover {
            opacity: 0.7;
            border-bottom: 3px solid #BDB0D9;
          }

          .blue-link-wrapper:hover .blue-link {
            border-bottom: 3px solid #BDB0D9;
          }

          .blue-temp-text {
            font-family: 'IBM Plex Sans', sans-serif;
            font-size: clamp(0.8rem, 0.7vw + 0.5rem, 1rem);
            line-height: 1.5;
            font-weight: 400;
            color: #0C0C0C;
            text-align: left;
            margin: 0;
            margin-top: 0.5vh;
            max-width: 300px;
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: max-height 0.3s ease, opacity 0.3s ease, margin-top 0.3s ease;
            cursor: pointer;
            text-decoration: none;
            display: block;
          }

          .blue-link-wrapper:hover .blue-temp-text {
            max-height: 200px;
            opacity: 1;
            margin-top: 1vh;
          }
        }

        @media (max-width: 768px) {
          .page {
            display: flex;
            flex-direction: column;
            /* fixed inset already prevents scroll, keep heights simple */
          }

          .box {
            position: relative;
            width: 100%;
            flex-shrink: 0;
          }

          .yellow { order: 1; background: yellow; flex: 1; }
          .red    { order: 2; background: red;    flex: 4; }
          .green  { order: 3; background: green;  flex: 1; }
          .blue   { order: 4; background: blue;   flex: 1; }

          .yellow-content, .green-content, .blue-content { display: none; }
        }

        
      `}</style>

      <div className="box red"></div>
      <div className="box blue"></div>
      <div className="box green"></div>
      <div className="box yellow"></div>

      <div className="yellow-content">
        <a href="/" className="logo-link" style={{ textDecoration: "none" }}>
          <div className="glass-container">
            <div className="logo-container">
              <img src="/WOA_logo.svg" alt="WOA Logo" />
            </div>
            <div className="text-container">
              <h1 className="white-oak-text">WHITE OAK</h1>
              <p className="analytics-text">Analytics .</p>
            </div>
          </div>
        </a>
      </div>


      <div className="green-content">
        <p className="green-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>

      <div className="blue-content">
        <div className="blue-links">
          <div className="blue-link-wrapper">
            <a href="/About" className="blue-link">About</a>
            <a href="/About" className="blue-temp-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </a>
          </div>
          <div className="blue-link-wrapper">
            <a href="/Research" className="blue-link">Research</a>
            <a href="/Research" className="blue-temp-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </a>
          </div>
          <div className="blue-link-wrapper">
            <a href="/Contact" className="blue-link">Contact</a>
            <a href="/Contact" className="blue-temp-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}