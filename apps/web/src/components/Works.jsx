"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Works() {
  const [selectedWork, setSelectedWork] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const works = [
    {
      id: 1,
      title: "LP",
      description: "個人サイト・ポートフォリオ。3分で試作、12時間で本格制作。",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop&auto=format&q=80"
      ],
      tech: ["React", "Next.js", "Tailwind CSS"],
      category: "Web Development"
    },
    {
      id: 2,
      title: "Apps",
      description: "AIアプリ、ChatBot、ログイン機能まで幅広く対応。",
      thumbnail: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&h=400&fit=crop&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1200&h=800&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=1200&h=800&fit=crop&auto=format&q=80"
      ],
      tech: ["React Native", "OpenAI API", "Firebase"],
      category: "Mobile App"
    },
    {
      id: 3,
      title: "Flyer",
      description: "イベント紹介ページ、フォーム連携。",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&auto=format&q=80",
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=800&fit=crop&auto=format&q=80",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&auto=format&q=80"
      ],
      tech: ["HTML5", "CSS3", "JavaScript"],
      category: "Design"
    }
  ];

  const openModal = (work) => {
    setSelectedWork(work);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedWork(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedWork) {
      setCurrentImageIndex((prev) => 
        prev === selectedWork.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedWork) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedWork.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="works" className="py-[120px] px-6 lg:px-20 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 
          className="text-[40px] font-bold text-white mb-16 tracking-wider uppercase text-center"
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          WORKS
        </h2>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <div
              key={work.id}
              onClick={() => openModal(work)}
              className="group relative bg-[#1a1a1a] rounded-[20px] overflow-hidden cursor-pointer border border-transparent hover:border-[#00ffff] transition-all duration-500 hover:shadow-[0_0_30px_#00ffff/30]"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 
                    className="text-[20px] font-bold text-[#00ffff] tracking-wider"
                    style={{ fontFamily: "Orbitron, monospace" }}
                  >
                    {work.title}
                  </h3>
                  <span 
                    className="text-[12px] text-white/60 tracking-wider uppercase"
                    style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                  >
                    {work.category}
                  </span>
                </div>

                <p 
                  className="text-[14px] text-white/80 leading-[20px]"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                >
                  {work.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {work.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-[10px] bg-[#00ffff]/20 text-[#00ffff] rounded-md tracking-wider"
                      style={{ fontFamily: "Orbitron, monospace" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00ffff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full h-full max-w-7xl mx-auto p-4 flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 p-2 text-white hover:text-[#00ffff] transition-colors bg-black/50 rounded-full"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 z-10 p-3 text-white hover:text-[#00ffff] transition-colors bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 z-10 p-3 text-white hover:text-[#00ffff] transition-colors bg-black/50 rounded-full hover:bg-black/70"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedWork.images[currentImageIndex]}
                alt={`${selectedWork.title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {selectedWork.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentImageIndex 
                      ? "bg-[#00ffff]" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Work Info */}
            <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm rounded-lg p-4 max-w-sm">
              <h3 
                className="text-[18px] font-bold text-[#00ffff] mb-2 tracking-wider"
                style={{ fontFamily: "Orbitron, monospace" }}
              >
                {selectedWork.title}
              </h3>
              <p 
                className="text-[14px] text-white/80 mb-3"
                style={{ fontFamily: "Noto Sans JP, sans-serif" }}
              >
                {selectedWork.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {selectedWork.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-[10px] bg-[#00ffff]/20 text-[#00ffff] rounded-md"
                    style={{ fontFamily: "Orbitron, monospace" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}