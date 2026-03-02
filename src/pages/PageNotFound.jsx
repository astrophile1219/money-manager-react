import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Countdown auto-redirect
  useEffect(() => {
    if (count === 0) {
      navigate("/landing");
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, navigate]);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pnf-root {
          min-height: 100vh;
          background: #0a0f1e;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          position: relative;
        }

        /* Animated grid background */
        .pnf-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(76,175,80,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(76,175,80,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridScroll 20s linear infinite;
        }
        @keyframes gridScroll {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        /* Glowing orbs */
        .pnf-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          animation: orbFloat 8s ease-in-out infinite;
        }
        .pnf-orb-1 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #4CAF50, transparent);
          top: -100px; left: -100px;
          animation-delay: 0s;
        }
        .pnf-orb-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #1565C0, transparent);
          bottom: -80px; right: -80px;
          animation-delay: 3s;
        }
        .pnf-orb-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, #00bcd4, transparent);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 1.5s;
        }
        @keyframes orbFloat {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.1) translateY(-20px); }
        }

        /* Card */
        .pnf-card {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 60px 50px;
          max-width: 580px;
          width: 90%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(76,175,80,0.2);
          border-radius: 24px;
          backdrop-filter: blur(20px);
          box-shadow: 0 0 60px rgba(76,175,80,0.08), 0 30px 60px rgba(0,0,0,0.4);
          animation: cardIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* 404 big number */
        .pnf-404 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(90px, 18vw, 140px);
          font-weight: 800;
          line-height: 1;
          background: linear-gradient(135deg, #4CAF50 0%, #00e676 40%, #1de9b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: none;
          letter-spacing: -4px;
          animation: glitch 4s infinite;
          position: relative;
          display: inline-block;
        }
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          91% { transform: translate(-3px, 1px); filter: hue-rotate(90deg); }
          92% { transform: translate(3px, -1px); filter: hue-rotate(180deg); }
          93% { transform: translate(0); filter: none; }
        }

        /* Coin icon */
        .pnf-icon {
          font-size: 52px;
          margin-bottom: 8px;
          display: block;
          animation: bounce 2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }

        /* Title */
        .pnf-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(18px, 4vw, 24px);
          font-weight: 700;
          color: #ffffff;
          margin: 16px 0 10px;
          letter-spacing: 0.5px;
        }

        /* Subtitle */
        .pnf-subtitle {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.7;
          max-width: 380px;
          margin: 0 auto 32px;
        }

        /* Countdown */
        .pnf-countdown {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(76,175,80,0.1);
          border: 1px solid rgba(76,175,80,0.25);
          border-radius: 50px;
          padding: 8px 20px;
          font-size: 13px;
          color: #81C784;
          margin-bottom: 28px;
        }
        .pnf-countdown-num {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 800;
          color: #4CAF50;
          min-width: 20px;
          text-align: center;
          animation: pop 1s ease-in-out;
        }
        @keyframes pop {
          0% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }

        /* Buttons */
        .pnf-buttons {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .pnf-btn {
          padding: 12px 28px;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          border: none;
          transition: all 0.25s ease;
          letter-spacing: 0.3px;
        }
        .pnf-btn-primary {
          background: linear-gradient(135deg, #4CAF50, #2e7d32);
          color: #fff;
          box-shadow: 0 6px 20px rgba(76,175,80,0.35);
        }
        .pnf-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(76,175,80,0.5);
        }
        .pnf-btn-secondary {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.75);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .pnf-btn-secondary:hover {
          background: rgba(255,255,255,0.12);
          transform: translateY(-2px);
          color: #fff;
        }

        /* Divider line */
        .pnf-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #4CAF50, #1de9b6);
          border-radius: 2px;
          margin: 20px auto;
        }

        /* Floating particles */
        .pnf-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .pnf-particle {
          position: absolute;
          width: 4px; height: 4px;
          background: #4CAF50;
          border-radius: 50%;
          opacity: 0;
          animation: particleFly var(--dur) ease-in infinite;
          animation-delay: var(--delay);
          left: var(--x);
          bottom: -10px;
        }
        @keyframes particleFly {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          20% { opacity: 0.6; transform: translateY(-80px) scale(1); }
          100% { opacity: 0; transform: translateY(-600px) scale(0.5); }
        }

        @media (max-width: 480px) {
          .pnf-card { padding: 40px 24px; }
          .pnf-buttons { flex-direction: column; align-items: center; }
          .pnf-btn { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="pnf-root">
        <div className="pnf-grid" />

        {/* Orbs */}
        <div className="pnf-orb pnf-orb-1" />
        <div className="pnf-orb pnf-orb-2" />
        <div className="pnf-orb pnf-orb-3" />

        {/* Floating particles */}
        <div className="pnf-particles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="pnf-particle"
              style={{
                "--x": `${Math.random() * 100}%`,
                "--dur": `${4 + Math.random() * 6}s`,
                "--delay": `${Math.random() * 6}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>

        {/* Main Card */}
        <div
          className="pnf-card"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * 0.05}deg) rotateY(${mousePos.x * 0.05}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <span className="pnf-icon">💰</span>
          <div className="pnf-404">404</div>
          <div className="pnf-divider" />
          <h1 className="pnf-title">Oops! Page Not Found</h1>
          <p className="pnf-subtitle">
            Looks like this page took a wrong turn on the way to your wallet.
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Countdown */}
          <div className="pnf-countdown">
            <span>Redirecting in</span>
            <span className="pnf-countdown-num" key={count}>{count}</span>
            <span>seconds...</span>
          </div>

          {/* Buttons */}
          <div className="pnf-buttons">
            <button
              className="pnf-btn pnf-btn-primary"
              onClick={() => navigate("/landing")}
            >
              🏠 Go Home
            </button>
            <button
              className="pnf-btn pnf-btn-secondary"
              onClick={() => navigate(-1)}
            >
              ← Go Back
            </button>
            <button
              className="pnf-btn pnf-btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              📊 Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;