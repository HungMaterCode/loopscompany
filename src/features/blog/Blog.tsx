"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "motion/react";
import { ArrowRight, Clock, Calendar, Search, Tag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingZalo } from "@/components/layout/FloatingZalo";
import { ARTICLES, CATEGORIES, type Article } from "@/features/legacy-core/articles";
import { RED, TEXT, TEXT60, TEXT35, BORDER, BORDER_M, BG, EASE } from "@/features/legacy-core/tokens";
import { GLOBAL_CSS } from "@/features/legacy-core/tokens";

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.07, duration: 0.6, ease: EASE }}
      style={{ height: "100%" }}
    >
      <Link href={`/bai-viet/${article.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <motion.article
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25 }}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: "var(--vw-glass-bg)",
            border: `1px solid var(--vw-glass-border)`,
            boxShadow: "var(--vw-glass-shadow)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Cover image */}
          <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
            <img src={article.cover || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60"} alt={article.title}
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

// ─── Featured Article ─────────────────────────────────────────────────────────

function FeaturedArticle({ article }: { article: typeof ARTICLES[0] }) {
  return (
    <Link href={`/bai-viet/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        style={{
          borderRadius: 24,
          overflow: "hidden",
          background: "var(--vw-glass-bg)",
          border: `1px solid var(--vw-glass-border)`,
          boxShadow: "var(--vw-glass-shadow)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
        className="featured-article"
      >
        <div style={{ position: "relative", minHeight: 340 }}>
          <img src={article.cover || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60"} alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(0,0,0,0.15) 100%)" }} />
          <span style={{
            position: "absolute", top: 18, left: 18,
            backgroundColor: RED, color: "#fff",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "5px 12px", borderRadius: 20,
          }}>
            ⭐ Nổi bật
          </span>
        </div>
        <div style={{ padding: "36px 36px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: article.categoryColor }}>
            {CATEGORIES.find(c => c.id === article.category)?.label}
          </span>
          <h2 style={{ color: TEXT, fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.03em", margin: 0 }}>
            {article.title}
          </h2>
          <p style={{ color: TEXT60, fontSize: 14, lineHeight: 1.72, margin: 0 }}>{article.excerpt}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: TEXT35 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Calendar size={12} />{article.date}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} />{article.readTime} phút</span>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: RED, fontSize: 13, fontWeight: 600, marginTop: 4 }}>
            Đọc bài viết <ArrowRight size={14} />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

// ─── Blog Page ────────────────────────────────────────────────────────────────

export function Blog({ initialArticles, bgUrl }: { initialArticles?: Article[]; bgUrl?: string }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const articles = initialArticles || ARTICLES;

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === "all" || a.category === activeCategory;
    const matchSearch = !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = articles[0] || ARTICLES[0];
  const rest = filtered.filter(a => a.slug !== featured.slug || activeCategory !== "all" || searchQuery);

  return (
    <div style={{ backgroundColor: "var(--sc-bg-1)", minHeight: "100vh", position: "relative" }}>
      <style>{GLOBAL_CSS}</style>

      {bgUrl && (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none', zIndex: 0 }} />
      )}

      <Header />

      {/* ── Hero header ── */}
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 80, overflow: "hidden" }}>
        {/* Background Pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg,var(--sc-grid-line) 0px,var(--sc-grid-line) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(-45deg,var(--sc-grid-line) 0px,var(--sc-grid-line) 1px,transparent 1px,transparent 40px)', pointerEvents: 'none' }} />

        {/* Glowing Orbs */}
        <div className="orb" style={{ width: '600px', height: '600px', top: '-150px', right: '-150px', background: 'var(--sc-orb-1-bg)', filter: 'blur(80px)' }} />
        <div className="orb" style={{ width: '500px', height: '500px', bottom: '-150px', left: '-150px', background: 'var(--sc-orb-2-bg)', filter: 'blur(80px)', animationDelay: '2s' }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(212,59,31,0.10)", border: "1px solid rgba(212,59,31,0.25)", borderRadius: 40, padding: "5px 14px", marginBottom: 20 }}>
              <span style={{ color: RED, fontSize: 11, fontWeight: 700, letterSpacing: "0.04em" }}>Kiến thức & Chia sẻ</span>
            </div>
            <h1 style={{ color: TEXT, fontSize: "clamp(32px,5vw,60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.06, margin: "0 0 18px" }}>
              Bài Viết & Tài Nguyên<br />
              <span style={{ color: RED }}>Miễn Phí</span> Cho Doanh Nghiệp
            </h1>
            <p style={{ color: TEXT60, fontSize: "clamp(14px,1.6vw,17px)", lineHeight: 1.75, maxWidth: 520, margin: "0 0 40px" }}>
              Kiến thức thực chiến về SEO, thiết kế web, và phát triển kinh doanh online dành riêng cho thị trường Việt Nam.
            </p>

            {/* Search */}
            <div style={{ position: "relative", maxWidth: 460 }}>
              <Search size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: TEXT35, pointerEvents: "none" }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "var(--vw-glass-bg)",
                  border: `1px solid ${BORDER_M}`,
                  borderRadius: 14, padding: "13px 16px 13px 44px",
                  fontSize: 14, color: TEXT, outline: "none",
                  boxShadow: "var(--vw-glass-shadow)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 100px" }}>

        {/* ── Featured (chỉ hiện khi không filter) ── */}
        {activeCategory === "all" && !searchQuery && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: EASE }} style={{ marginBottom: 60 }}>
            <FeaturedArticle article={featured} />
          </motion.div>
        )}

        {/* ── Category tabs ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "8px 18px", borderRadius: 40, fontSize: 13, fontWeight: 600, cursor: "pointer",
                border: activeCategory === cat.id ? "none" : `1px solid ${BORDER_M}`,
                background: activeCategory === cat.id ? RED : "var(--vw-glass-bg)",
                color: activeCategory === cat.id ? "#fff" : TEXT60,
                boxShadow: activeCategory === cat.id ? "0 4px 16px rgba(212,59,31,0.32)" : "var(--vw-glass-shadow)",
                transition: "all 0.2s",
              }}>
              {cat.label}
            </button>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 13, color: TEXT35, alignSelf: "center" }}>
            {filtered.length} bài viết
          </span>
        </motion.div>

        {/* ── Article grid ── */}
        {rest.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {rest.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: TEXT60 }}>
            <p style={{ fontSize: 16 }}>Không tìm thấy bài viết phù hợp.</p>
          </div>
        )}

        {/* ── Tags cloud ── */}
        <div style={{ marginTop: 64, paddingTop: 48, borderTop: `1px solid ${BORDER}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <Tag size={14} color={RED} />
            <span style={{ color: TEXT60, fontSize: 13, fontWeight: 600 }}>Chủ đề phổ biến</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[...new Set(articles.flatMap(a => a.tags))].map(tag => (
              <span key={tag} style={{
                padding: "5px 13px", borderRadius: 20, fontSize: 12, color: TEXT60,
                background: "var(--vw-glass-bg)",
                border: `1px solid ${BORDER}`,
                boxShadow: "var(--vw-glass-shadow)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <FloatingZalo />

      <style>{`
        @media (max-width: 768px) {
          .featured-article { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
