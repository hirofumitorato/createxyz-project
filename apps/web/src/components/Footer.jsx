export default function Footer() {
  return (
    <footer className="py-8 px-6 lg:px-20 bg-[#0d0d0d] border-t border-[#00ffff]/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p 
            className="text-[14px] text-white/60"
            style={{ fontFamily: "Noto Sans JP, sans-serif" }}
          >
            © 2025{" "}
            <span 
              className="text-[#00ffff] font-bold tracking-wider"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              TORATO LAB
            </span>
            {" "}All rights reserved.
          </p>
        </div>

        {/* Background decoration */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#00ffff] to-transparent opacity-30"></div>
      </div>
    </footer>
  );
}