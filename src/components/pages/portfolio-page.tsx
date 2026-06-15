"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectItemConfig } from "@/features/legacy-core/site-config-api";
import { generateSlug } from "@/lib/slug";

interface PortfolioPageProps {
  projects: ProjectItemConfig[];
  bgUrl?: string;
}

export function PortfolioPage({ projects, bgUrl }: PortfolioPageProps) {
  return (
    <div 
      className="min-h-screen pt-[140px] pb-32 transition-colors duration-500 relative overflow-hidden"
      style={{ backgroundColor: "var(--sc-bg-3)", color: "var(--vw-text)" }}
    >
      {bgUrl && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />
      )}
      {/* Background Orbs for Liquid Glass Refraction */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vw] rounded-full blur-[160px] opacity-20 pointer-events-none" style={{ background: "var(--sc-accent)" }} />
      <div className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full blur-[180px] opacity-10 pointer-events-none" style={{ background: "var(--sc-orb-1-bg)" }} />

      {/* Header */}
      <div className="max-w-[1120px] mx-auto px-6 mb-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full liquid-glass mb-8">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--sc-accent)", boxShadow: "0 0 10px var(--sc-accent)" }} />
            <span 
              className="font-['Be_Vietnam_Pro'] text-[10px] tracking-[0.3em] font-bold uppercase"
              style={{ color: "var(--vw-text)" }}
            >
              Phòng trưng bày
            </span>
          </div>
          <h1 className="font-['Instrument_Serif'] text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none mb-6">
            Dự án <em className="italic" style={{ color: "var(--sc-text-45)" }}>Nổi bật</em>
          </h1>
          <p className="font-['Be_Vietnam_Pro'] max-w-[500px] text-sm md:text-base leading-relaxed mx-auto" style={{ color: "var(--sc-text-60)" }}>
            Những tác phẩm kỹ thuật số kết hợp giữa thiết kế Liquid Glassmorphism sang trọng và hiệu năng vượt trội.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-[1120px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p, i) => {
            const href = p.url || `/du-an/${generateSlug(p.title)}`;

            return (
              <Link href={href} key={i} className="block group relative">
                {/* Glow behind card on hover */}
                <div 
                  className="absolute inset-0 rounded-[32px] blur-[40px] opacity-0 transition-opacity duration-700 group-hover:opacity-40"
                  style={{ background: p.accent }}
                />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-[32px] liquid-glass transition-all duration-700 group-hover:-translate-y-3 p-1.5 h-full flex flex-col"
                >
                  <div className="h-[280px] relative rounded-[26px] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />
                    {/* Inner Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Hover Arrow Icon */}
                    <div 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full liquid-glass flex items-center justify-center transition-all duration-500 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    >
                      <ArrowUpRight size={18} style={{ color: "var(--vw-text)" }} />
                    </div>

                    {/* Bottom Info inside Image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="font-['Be_Vietnam_Pro'] text-[9px] tracking-[0.2em] text-white/70 uppercase font-semibold">
                          {p.cat}
                        </div>
                        <div className="w-8 h-[1px]" style={{ background: p.accent }} />
                      </div>
                      <div className="font-['Instrument_Serif'] text-3xl md:text-4xl text-white tracking-tight leading-tight">
                        {p.title}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-5 flex justify-between items-center mt-auto">
                    <span className="font-['Be_Vietnam_Pro'] text-xs tracking-[0.1em]" style={{ color: "var(--sc-text-60)" }}>
                      {p.year}
                    </span>
                    <span
                      className="font-['Be_Vietnam_Pro'] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider liquid-glass"
                      style={{ color: p.accent }}
                    >
                      {p.result}
                    </span>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
