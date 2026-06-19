"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ARTICLES, CATEGORIES } from "@/features/legacy-core/articles";
import { RED, TEXT, TEXT60, TEXT35, BORDER, BG, EASE } from "@/features/legacy-core/tokens";

function ArticleCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6, ease: EASE }}
    >
      <Link href={`/bai-viet/${article.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <motion.article
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25 }}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: "var(--sc-bg-4)", // Use light theme section card background
            border: `1px solid var(--sc-border)`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Cover image */}
          <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
            <img src={article.cover} alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
            <span style={{
              position: "absolute", top: 14, left: 14,
              backgroundColor: article.categoryColor, color: "#fff",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "4px 10px", borderRadius: 20,
            }}>
              {CATEGORIES.find(c => c.id === article.category)?.label ?? article.category}
            </span>
          </div>

          {/* Content */}
          <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1, gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 11, color: TEXT35 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar size={11} /> {article.date}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={11} /> {article.readTime} phút đọc
              </span>
            </div>

            <h2 style={{ color: TEXT, fontSize: 15, fontWeight: 700, lineHeight: 1.45, letterSpacing: "-0.02em", margin: 0 }}>
              {article.title}
            </h2>

            <p style={{ color: TEXT60, fontSize: 13, lineHeight: 1.7, margin: 0, flex: 1 }}>
              {article.excerpt}
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${BORDER}`, marginTop: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {article.author.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <p style={{ color: TEXT, fontSize: 11, fontWeight: 600, margin: 0 }}>{article.author}</p>
                  <p style={{ color: TEXT35, fontSize: 10, margin: 0 }}>{article.authorRole}</p>
                </div>
              </div>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: RED, fontSize: 12, fontWeight: 600 }}>
                Đọc tiếp <ArrowRight size={13} />
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export function BlogPreviewSection() {
  const [latestArticles, setLatestArticles] = useState<typeof ARTICLES>(ARTICLES.slice(0, 3));

  useEffect(() => {
    fetch("/api/articles?publishedOnly=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((a: any) => ({
            slug: a.slug,
            category: a.category,
            categoryColor: a.categoryColor,
            title: a.title,
            excerpt: a.excerpt,
            content: a.content,
            cover: a.cover,
            author: a.author,
            authorRole: a.authorRole,
            date: new Date(a.publishedAt).toLocaleDateString("vi-VN"),
            readTime: a.readTime,
            tags: a.tags,
          }));
          setLatestArticles(mapped.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error fetching latest articles:", err));
  }, []);

  return (
    <section id="bai-viet" style={{ position: "relative", padding: "120px 24px", overflow: "hidden", backgroundColor: "var(--sc-bg-1)" }}>
      {/* Background Pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,var(--sc-grid-line) 0px,var(--sc-grid-line) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(-45deg,var(--sc-grid-line) 0px,var(--sc-grid-line) 1px,transparent 1px,transparent 40px)', pointerEvents: 'none' }} />

      {/* Glowing Orbs */}
      <div className="orb" style={{ width: '600px', height: '600px', top: '-200px', right: '-200px', background: 'var(--sc-orb-1-bg)', filter: 'blur(80px)' }} />
      <div className="orb" style={{ width: '500px', height: '500px', bottom: '-150px', left: '-150px', background: 'var(--sc-orb-3-bg)', filter: 'blur(80px)', animationDelay: '2s' }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 60 }}>
          <SectionLabel>Kiến thức & Chia sẻ</SectionLabel>
          <h2 style={{ color: TEXT, fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.04em", margin: "16px 0 20px" }}>
            Bài viết mới nhất
          </h2>
          <p style={{ color: TEXT60, fontSize: 16, lineHeight: 1.6, maxWidth: 540, margin: 0 }}>
            Cập nhật những kiến thức thực chiến về website, marketing và phát triển kinh doanh online.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 48 }}>
          {latestArticles.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/bai-viet" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ y: -2 }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 28px", borderRadius: 40,
                background: "var(--sc-accent)", color: "#fff",
                border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 12px rgba(255,107,157,0.25)",
              }}
            >
              Xem tất cả bài viết <ArrowRight size={16} />
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
}
