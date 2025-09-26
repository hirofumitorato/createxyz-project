import { ExternalLink, Calendar } from "lucide-react";

export default function Activity() {
  const articles = [
    {
      id: 1,
      title: "AI技術の最新動向とその可能性",
      excerpt: "生成AIが変革する未来のクリエイティブ業界について、最新の技術トレンドと実際の活用事例を解説します。",
      date: "2025年1月15日",
      url: "https://note.com/torato/n/n12345",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format&q=80",
      tags: ["AI", "Technology", "Future"]
    },
    {
      id: 2,
      title: "エンジニアとしてのキャリア転換体験談",
      excerpt: "飲食業界からIT業界への転身経験をもとに、異業種転職の秘訣とスキル習得のコツをお伝えします。",
      date: "2025年1月10日",
      url: "https://note.com/torato/n/n67890",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format&q=80",
      tags: ["Career", "Engineering", "Experience"]
    },
    {
      id: 3,
      title: "SHIFT-AIでの開発プロジェクト紹介",
      excerpt: "現在取り組んでいる生成AIプロジェクトの開発過程と技術的な挑戦について詳しく解説します。",
      date: "2025年1月5日",
      url: "https://note.com/torato/n/n11111",
      thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&auto=format&q=80",
      tags: ["Development", "AI", "Project"]
    },
    {
      id: 4,
      title: "クリエイティブとテクノロジーの融合",
      excerpt: "アートとプログラミングを組み合わせた新しい表現手法と、その実装について考察します。",
      date: "2024年12月28日",
      url: "https://note.com/torato/n/n22222",
      thumbnail: "https://images.unsplash.com/photo-1558655146-364adaf92469?w=600&h=400&fit=crop&auto=format&q=80",
      tags: ["Creative", "Art", "Programming"]
    }
  ];

  return (
    <section id="activity" className="py-[120px] px-6 lg:px-20 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 
          className="text-[40px] font-bold text-white mb-16 tracking-wider uppercase text-center"
          style={{ fontFamily: "Orbitron, monospace" }}
        >
          ACTIVITY
        </h2>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[#1a1a1a] rounded-[20px] overflow-hidden border border-transparent hover:border-[#00ffff] transition-all duration-500 hover:shadow-[0_0_30px_#00ffff/30] hover:scale-105"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                {/* Date overlay */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <Calendar size={12} className="text-[#00ffff]" />
                  <span 
                    className="text-[10px] text-white tracking-wider"
                    style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                  >
                    {article.date}
                  </span>
                </div>

                {/* External link indicator */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 bg-[#00ffff]/20 backdrop-blur-sm rounded-full">
                    <ExternalLink size={16} className="text-[#00ffff]" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 
                  className="text-[18px] font-bold text-white leading-tight group-hover:text-[#00ffff] transition-colors duration-300"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                >
                  {article.title}
                </h3>

                <p 
                  className="text-[14px] text-white/70 leading-[20px] line-clamp-3"
                  style={{ fontFamily: "Noto Sans JP, sans-serif" }}
                >
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-[10px] bg-[#a855f7]/20 text-[#a855f7] rounded-md tracking-wider"
                      style={{ fontFamily: "Orbitron, monospace" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Neon line effect */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00ffff] to-[#a855f7] group-hover:w-full transition-all duration-500"></div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#00ffff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </a>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://note.com/torato"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 border border-[#00ffff]/30 hover:border-[#00ffff] rounded-lg text-white hover:text-[#00ffff] transition-all duration-300 group hover:shadow-[0_0_20px_#00ffff/30]"
          >
            <span 
              className="text-[14px] font-medium tracking-wider"
              style={{ fontFamily: "Orbitron, monospace" }}
            >
              VIEW MORE ON NOTE
            </span>
            <ExternalLink size={16} className="group-hover:animate-pulse" />
          </a>
        </div>

        {/* Background decoration */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-5 pointer-events-none">
          <div className="w-64 h-64 border border-[#a855f7] rounded-full animate-pulse"></div>
          <div className="absolute inset-4 border border-[#00ffff] rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
      </div>
    </section>
  );
}