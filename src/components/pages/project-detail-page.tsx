"use client";

import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProjectItemConfig } from "@/features/legacy-core/site-config-api";

interface ProjectDetailPageProps {
  project: ProjectItemConfig;
  bgUrl?: string;
}

export function ProjectDetailPage({ project, bgUrl }: ProjectDetailPageProps) {
  const router = useRouter();

  return (
    <div 
      className="min-h-screen transition-colors duration-500 relative overflow-hidden grain"
      style={{ backgroundColor: "var(--sc-bg-2)", color: "var(--vw-text)" }}
    >
      {bgUrl && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none', zIndex: 0 }} />
      )}
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[180px] opacity-20 pointer-events-none" style={{ background: project.accent, willChange: "transform", transform: "translate3d(0, 0, 0)" }} />
      <div className="absolute top-[40%] right-[-20%] w-[70vw] h-[70vw] rounded-full blur-[200px] opacity-[0.15] pointer-events-none" style={{ background: "var(--sc-orb-2-bg)", willChange: "transform", transform: "translate3d(0, 0, 0)" }} />

      {/* Navigation Bar */}
      <div className="pt-[120px] pb-8 px-6 relative z-20 max-w-[1120px] mx-auto">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass hover:scale-105 transition-transform"
        >
          <ArrowLeft size={16} style={{ color: "var(--vw-text)" }} />
          <span className="font-sans text-sm tracking-wide" style={{ color: "var(--vw-text)" }}>Quay lại</span>
        </button>
      </div>

      {/* Hero Section (Apple Liquid Glass Style) */}
      <div className="max-w-[1120px] mx-auto px-6 relative z-10 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold" style={{ color: project.accent }}>
              {project.cat}
            </span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
            <span className="font-sans text-xs tracking-[0.2em] uppercase font-bold" style={{ color: "var(--sc-text-45)" }}>
              {project.year}
            </span>
          </div>
          
          <h1 className="font-sans font-bold text-6xl md:text-8xl lg:text-[8rem] tracking-tight leading-[0.9] mb-8 drop-shadow-sm">
            {project.title}
          </h1>

          <div className="flex justify-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full liquid-glass">
              <span className="font-sans text-sm" style={{ color: "var(--sc-text-60)" }}>Kết quả:</span>
              <span className="font-sans font-bold text-lg" style={{ color: project.accent }}>
                {project.result}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Liquid Glass Showcase Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full aspect-video rounded-[40px] liquid-glass p-2 md:p-4 shadow-2xl relative group"
        >
          <div className="w-full h-full rounded-[32px] overflow-hidden relative">
            <img 
              src={project.img} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>

      {/* Case Study Content */}
      <div className="max-w-[1120px] mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sticky Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-32 space-y-6">
              {/* Box 1 */}
              <div className="liquid-glass p-8 md:p-10 rounded-[32px]">
                <h3 className="font-sans font-bold text-3xl mb-5" style={{ color: "var(--vw-text)" }}>
                  Tổng quan
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sc-text-60)" }}>
                  LOOP tự hào đồng hành cùng <strong>{project.title}</strong> trong quá trình kiến tạo trải nghiệm số. Từ khâu tư vấn chiến lược đến thiết kế UI/UX và phát triển phần mềm, dự án là minh chứng cho tiêu chuẩn chất lượng khắt khe nhất.
                </p>
              </div>

              {/* Box 2 */}
              <div className="liquid-glass p-8 md:p-10 rounded-[32px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-transparent to-white pointer-events-none" style={{ mixBlendMode: 'overlay' }} />
                <h3 className="font-sans font-bold text-3xl mb-6" style={{ color: "var(--vw-text)" }}>
                  Vai trò của LOOP
                </h3>
                <ul className="space-y-5 font-sans text-sm" style={{ color: "var(--vw-text)" }}>
                  {["Phân tích & Tư vấn UX", "Thiết kế Giao diện (UI Design)", "Phát triển Web / App", "Tối ưu hiệu suất & SEO"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14} style={{ color: project.accent }} />
                      </div>
                      <span style={{ color: "var(--sc-text-60)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* Context */}
            <div className="liquid-glass p-10 md:p-14 rounded-[40px]">
              <h2 className="font-sans font-bold text-4xl md:text-5xl mb-6" style={{ color: "var(--vw-text)" }}>
                Thách thức & Bối cảnh
              </h2>
              <p className="font-sans leading-relaxed text-base md:text-lg mb-12" style={{ color: "var(--sc-text-60)" }}>
                Trong bối cảnh thị trường kỹ thuật số cạnh tranh khốc liệt, khách hàng yêu cầu một nền tảng không chỉ giải quyết được các bài toán nghiệp vụ phức tạp mà còn phải mang lại <strong>trải nghiệm thị giác vượt trội</strong>. Thử thách đặt ra là làm sao cân bằng giữa hiệu suất xử lý lượng dữ liệu lớn và giao diện mượt mà.
              </p>
              
              <div className="w-full aspect-[16/10] rounded-[24px] liquid-glass p-1.5">
                <div className="w-full h-full rounded-[18px] overflow-hidden">
                  <img 
                    src={project.img} 
                    alt={`${project.title} Mockup`}
                    className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="liquid-glass p-10 md:p-14 rounded-[40px]">
              <h2 className="font-sans font-bold text-4xl md:text-5xl mb-6" style={{ color: "var(--vw-text)" }}>
                Giải pháp Đột phá
              </h2>
              <p className="font-sans leading-relaxed text-base md:text-lg mb-10" style={{ color: "var(--sc-text-60)" }}>
                LOOP đã ứng dụng hệ thống thiết kế <em>Liquid Glassmorphism</em> kết hợp cùng các chuyển động vi mô (Micro-interactions) từ thư viện Motion. Kiến trúc Headless CMS và Next.js được lựa chọn để đảm bảo tốc độ phản hồi (TTFB) dưới 100ms.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="aspect-[4/5] rounded-[24px] liquid-glass p-1.5 group">
                  <div className="w-full h-full rounded-[18px] overflow-hidden bg-black/10">
                    <img src={project.img} alt="Detail 1" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" loading="lazy" />
                  </div>
                </div>
                <div className="aspect-[4/5] rounded-[24px] liquid-glass p-1.5 group mt-0 sm:mt-12">
                  <div className="w-full h-full rounded-[18px] overflow-hidden bg-black/10">
                    <img src={project.img} alt="Detail 2" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* CTA Footer */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-6 right-6 h-[1px]" style={{ backgroundColor: "var(--sc-border)" }} />
        
        {/* Glow behind CTA */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[160px] opacity-20 pointer-events-none"
          style={{ background: project.accent, willChange: "transform", transform: "translate3d(-50%, -50%, 0)" }}
        />
        
        <div className="max-w-[1120px] mx-auto px-6 py-32 text-center relative z-10 flex flex-col items-center">
          <span className="font-sans text-xs tracking-[0.4em] uppercase mb-6 block font-bold" style={{ color: project.accent }}>
            Bạn đã sẵn sàng?
          </span>
          <h2 className="font-sans font-bold text-5xl md:text-7xl mb-12" style={{ color: "var(--vw-text)" }}>
            Khởi tạo dự án
          </h2>
          
          <button 
            onClick={() => router.push('/bao-gia')}
            className="inline-flex items-center gap-4 px-10 py-5 rounded-full liquid-glass group hover:scale-105 transition-all duration-500 overflow-hidden relative"
          >
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: project.accent }} />
            <span className="font-sans font-bold text-sm tracking-widest uppercase relative z-10" style={{ color: "var(--vw-text)" }}>
              Nhận báo giá
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center relative z-10" style={{ backgroundColor: project.accent }}>
              <ChevronRight size={16} color="black" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
