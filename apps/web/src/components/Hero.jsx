"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    const particleCount = 100;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "#00ffff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00ffff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const scrollToWorks = () => {
    const worksSection = document.querySelector("#works");
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]">
      {/* Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 lg:px-20 max-w-5xl mx-auto">
        {/* Main Title */}
        <h1 
          className="text-[40px] md:text-[52px] lg:text-[64px] font-bold text-white mb-6 leading-tight tracking-wider"
          style={{ 
            fontFamily: "Orbitron, monospace",
            textShadow: "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff"
          }}
        >
          未来を形にする、
          <br />
          <span className="text-[#00ffff]">AI × Creative</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-[16px] md:text-[18px] lg:text-[20px] text-white/80 mb-12 tracking-widest"
          style={{ fontFamily: "Noto Sans JP, sans-serif" }}
        >
          Engineer / Creator / AI Explorer
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToWorks}
          className="relative px-8 py-4 text-[14px] md:text-[16px] font-bold text-black bg-[#00ffff] rounded-lg tracking-wider hover:bg-[#00ffff]/90 transition-all duration-300 group overflow-hidden"
          style={{ 
            fontFamily: "Orbitron, monospace",
            boxShadow: "0 0 20px #00ffff, 0 0 40px #00ffff/50"
          }}
        >
          <span className="relative z-10">VIEW MY WORK</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#a855f7] rounded-full opacity-60 animate-pulse" style={{ animationDelay: "0s" }}></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-[#00ffff] rounded-full opacity-40 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#a855f7] rounded-full opacity-50 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      {/* Geometric lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q250,30 500,50 T1000,50"
            stroke="url(#neonGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,150 Q350,120 700,150 T1400,150"
            stroke="url(#neonGradient)"
            strokeWidth="1"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>
    </section>
  );
}