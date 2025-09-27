import { Twitter, FileText, ExternalLink } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-[120px] px-6 lg:px-20 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 
          className="text-[40px] font-bold text-white mb-16 tracking-wider uppercase text-center"
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          ABOUT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Neon border effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00ffff] to-[#a855f7] p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-[#1a1a1a]"></div>
              </div>
              
              {/* Profile image */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80"
                alt="TORATO Profile"
                className="relative w-80 h-80 object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                style={{ 
                  border: "4px solid transparent",
                  filter: "contrast(1.1) brightness(0.9)"
                }}
              />
              
              {/* Glowing effect */}
              <div className="absolute inset-0 rounded-full bg-[#00ffff]/10 animate-pulse"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            {/* Name */}
            <h3 
              className="text-[28px] font-bold text-[#00ffff] tracking-wider"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              TORATO
            </h3>

            {/* Description */}
            <div className="space-y-6">
              <p 
                className="text-[16px] text-white/90 leading-[28px]"
                style={{ fontFamily: "Noto Sans JP, sans-serif" }}
              >
                秋田県出身。飲食業界からIT業界へ転身。現在はエンジニアとしてAI領域に挑戦しながら、SHIFT-AIに所属し生成AIの可能性を追求。
              </p>
              
              <p 
                className="text-[16px] text-white/80 leading-[28px]"
                style={{ fontFamily: "Noto Sans JP, sans-serif" }}
              >
                テクノロジーとクリエイティビティの融合によって、未来の体験を創造することに情熱を注いでいます。
              </p>
            </div>

            {/* SNS Links */}
            <div className="flex items-center space-x-6 pt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white hover:text-[#00ffff] transition-all duration-300"
              >
                <div className="p-3 rounded-full border border-[#00ffff]/30 group-hover:border-[#00ffff] group-hover:shadow-[0_0_20px_#00ffff] transition-all duration-300">
                  <Twitter size={20} className="group-hover:animate-pulse" />
                </div>
                <span 
                  className="text-[14px] font-medium tracking-wider"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                >
                  X
                </span>
                <ExternalLink size={14} className="opacity-60" />
              </a>

              <a
                href="https://note.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-white hover:text-[#00ffff] transition-all duration-300"
              >
                <div className="p-3 rounded-full border border-[#00ffff]/30 group-hover:border-[#00ffff] group-hover:shadow-[0_0_20px_#00ffff] transition-all duration-300">
                  <FileText size={20} className="group-hover:animate-pulse" />
                </div>
                <span 
                  className="text-[14px] font-medium tracking-wider"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                >
                  note
                </span>
                <ExternalLink size={14} className="opacity-60" />
              </a>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-10 pointer-events-none">
          <div className="w-96 h-96 border border-[#00ffff] rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
          <div className="absolute inset-8 border border-[#a855f7] rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}></div>
        </div>
      </div>
    </section>
  );
}