"use client";

import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, Share2, ChevronRight } from "lucide-react";
import { Header } from "@/section-change/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingZalo } from "@/components/layout/FloatingZalo";
import { ARTICLES, CATEGORIES } from "@/legacy-app/articles";
import { RED, TEXT, TEXT60, TEXT35, BORDER, BORDER_M, BG, EASE, GLASS, GLOBAL_CSS } from "@/legacy-app/tokens";

// ─── Markdown-like renderer ──────────────────────────────────────────────────

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let tableBuffer: string[] = [];

  const flushTable = (key: string) => {
    if (tableBuffer.length < 2) { tableBuffer = []; return null; }
    const headers = tableBuffer[0].split("|").map(s => s.trim()).filter(Boolean);
    const rows = tableBuffer.slice(2).map(r => r.split("|").map(s => s.trim()).filter(Boolean));
    tableBuffer = [];
    return (
      <div key={key} style={{ overflowX: "auto", margin: "24px 0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr>
              {headers.map((h, hi) => (
                <th key={hi} style={{ padding: "10px 16px", textAlign: "left", color: TEXT, borderBottom: `2px solid ${BORDER_M}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: `1px solid ${BORDER}` }}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ padding: "10px 16px", color: TEXT60, fontSize: 13 }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  while (i < lines.length) {
    const line = lines[i];

    // Table row
    if (line.startsWith("|")) {
      tableBuffer.push(line);
      i++;
      if (i >= lines.length || !lines[i].startsWith("|")) {
        const el = flushTable(`table-${i}`);
        if (el) elements.push(el);
      }
      continue;
    } else if (tableBuffer.length) {
      const el = flushTable(`table-${i}`);
      if (el) elements.push(el);
    }

    if (!line.trim()) { i++; continue; }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(<h3 key={i} style={{ color: TEXT, fontSize: 16, fontWeight: 700, marginTop: 28, marginBottom: 10, letterSpacing: "-0.01em" }}>{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} style={{ color: TEXT, fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 14, letterSpacing: "-0.02em", paddingBottom: 10, borderBottom: `1px solid ${BORDER}` }}>{line.slice(3)}</h2>);
    }
    // Checklist
    else if (line.startsWith("- [ ] ") || line.startsWith("- [x] ")) {
      const checked = line.startsWith("- [x] ");
      const text = line.slice(6);
      elements.push(
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
          <div style={{ marginTop: 2, width: 16, height: 16, borderRadius: 4, border: `2px solid ${checked ? RED : BORDER_M}`, backgroundColor: checked ? RED : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {checked && <span style={{ color: "#fff", fontSize: 10 }}>✓</span>}
          </div>
          <span style={{ color: TEXT60, fontSize: 14, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: processInline(text) }} />
        </div>
      );
    }
    // Bullet list
    else if (line.startsWith("- ")) {
      elements.push(
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
          <span style={{ color: RED, marginTop: 7, flexShrink: 0, fontSize: 8 }}>●</span>
          <span style={{ color: TEXT60, fontSize: 14, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: processInline(line.slice(2)) }} />
        </div>
      );
    }
    // Numbered list
    else if (/^\d+\.\s/.test(line)) {
      const match = line.match(/^(\d+)\.\s(.+)/);
      if (match) {
        elements.push(
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ color: RED, fontWeight: 700, fontSize: 13, minWidth: 20, marginTop: 2 }}>{match[1]}.</span>
            <span style={{ color: TEXT60, fontSize: 14, lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: processInline(match[2]) }} />
          </div>
        );
      }
    }
    // Blockquote
    else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 18, margin: "20px 0", color: TEXT60, fontSize: 15, lineHeight: 1.7, fontStyle: "italic" }}>
          <span dangerouslySetInnerHTML={{ __html: processInline(line.slice(2)) }} />
        </blockquote>
      );
    }
    // Paragraph
    else {
      elements.push(
        <p key={i} style={{ color: TEXT60, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: processInline(line) }} />
      );
    }

    i++;
  }

  return elements;
}

function processInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, `<strong style="color:${TEXT};font-weight:700">$1</strong>`)
    .replace(/`(.+?)`/g, `<code style="background:rgba(212,59,31,0.12);color:${RED};padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:monospace">$1</code>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" rel="noopener" style="color:${RED};text-decoration:underline;text-underline-offset:3px">$1</a>`);
}

// ─── Related Card ─────────────────────────────────────────────────────────────

function RelatedCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: EASE }}
    >
      <Link href={`/bai-viet/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
          style={{ ...GLASS, borderRadius: 16, overflow: "hidden" }}>
          <div style={{ height: 140, overflow: "hidden" }}>
            <img src={article.cover} alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
          <div style={{ padding: "14px 16px 16px" }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: article.categoryColor }}>
              {CATEGORIES.find(c => c.id === article.category)?.label}
            </span>
            <p style={{ color: TEXT, fontSize: 13, fontWeight: 700, lineHeight: 1.45, margin: "6px 0 0", letterSpacing: "-0.01em" }}>
              {article.title}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10, color: RED, fontSize: 11, fontWeight: 600 }}>
              Đọc tiếp <ArrowRight size={11} />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Blog Post Page ────────────────────────────────────────────────────────────

export function BlogPost({ slug }: { slug: string }) {
  const router = useRouter();
  const article = ARTICLES.find(a => a.slug === slug);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!article) {
    router.replace("/bai-viet");
    return null;
  }

  const related = ARTICLES.filter(a => a.slug !== slug && a.category === article.category).slice(0, 3);
  const moreArticles = related.length < 3
    ? [...related, ...ARTICLES.filter(a => a.slug !== slug && !related.includes(a)).slice(0, 3 - related.length)]
    : related;

  const categoryLabel = CATEGORIES.find(c => c.id === article.category)?.label;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--sc-bg-1)", minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>

      {/* Reading progress bar */}
      <motion.div style={{
        position: "fixed", top: 0, left: 0, height: 3, background: RED,
        transformOrigin: "left",
        zIndex: 200, width: progressWidth,
        boxShadow: `0 0 12px ${RED}`,
      }} />

      <Header />

      {/* ── Hero cover ── */}
      <section style={{ position: "relative", paddingTop: 80, overflow: "hidden" }}>
        <div style={{ position: "relative", height: "clamp(280px, 42vw, 500px)", overflow: "hidden" }}>
          <motion.img
            src={article.cover} alt={article.title}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.72) 100%)" }} />

          {/* Breadcrumb + category on image */}
          <div style={{ position: "absolute", top: 28, left: 0, right: 0 }}>
            <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
                <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Trang chủ</Link>
                <ChevronRight size={12} />
                <Link href="/bai-viet" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Bài Viết</Link>
                <ChevronRight size={12} />
                <span style={{ color: "rgba(255,255,255,0.9)" }}>{categoryLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Article header card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            ...GLASS,
            borderRadius: 24,
            padding: "32px 36px",
            marginTop: -60,
            position: "relative",
            zIndex: 10,
            marginBottom: 36,
          }}
        >
          {/* Category + meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
            <span style={{
              backgroundColor: article.categoryColor, color: "#fff",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: 20,
            }}>
              {categoryLabel}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: TEXT35, fontSize: 12 }}>
              <Calendar size={12} />{article.date}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, color: TEXT35, fontSize: 12 }}>
              <Clock size={12} />{article.readTime} phút đọc
            </span>
          </div>

          {/* Title */}
          <h1 style={{ color: TEXT, fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            {article.title}
          </h1>

          {/* Excerpt */}
          <p style={{ color: TEXT60, fontSize: 16, lineHeight: 1.75, margin: "0 0 24px" }}>
            {article.excerpt}
          </p>

          {/* Author + share */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                {article.author.split(" ").slice(-1)[0][0]}
              </div>
              <div>
                <p style={{ color: TEXT, fontSize: 13, fontWeight: 700, margin: 0 }}>{article.author}</p>
                <p style={{ color: TEXT35, fontSize: 11, margin: 0 }}>{article.authorRole}</p>
              </div>
            </div>
            <button onClick={handleShare}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", borderRadius: 20, border: `1px solid ${BORDER_M}`, background: "transparent", color: TEXT60, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Share2 size={13} /> Chia sẻ
            </button>
          </div>
        </motion.div>

        {/* Article body */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
            style={{ ...GLASS, borderRadius: 20, padding: "32px 36px" }}
          >
            {renderContent(article.content)}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}
          >
            <Tag size={13} color={RED} />
            {article.tags.map(tag => (
              <span key={tag} style={{
                padding: "5px 13px", borderRadius: 20, fontSize: 12, color: TEXT60,
                background: "var(--vw-glass-bg)",
                border: `1px solid ${BORDER}`,
              }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            background: `linear-gradient(135deg, ${RED} 0%, #a82d15 100%)`,
            padding: "36px 40px",
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px" }}>Việt Web</p>
            <h3 style={{ color: "#fff", fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 800, lineHeight: 1.3, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              Sẵn sàng có website chuyên nghiệp?
            </h3>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
              Giao trong 5 ngày · Từ 189K/tháng · Hỗ trợ 24/7
            </p>
          </div>
          <Link href="/#lien-he" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "13px 28px", borderRadius: 40, border: "none",
                background: "#fff", color: RED,
                fontSize: 14, fontWeight: 800, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              Tư vấn miễn phí <ArrowRight size={15} />
            </motion.button>
          </Link>
        </motion.div>

        {/* ── Back + Related ── */}
        <div style={{ marginTop: 64 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ color: TEXT, fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>Bài viết liên quan</h2>
            <Link href="/bai-viet" style={{ display: "flex", alignItems: "center", gap: 6, color: RED, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
              <ArrowLeft size={13} /> Về trang bài viết
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {moreArticles.map((a, i) => (
              <RelatedCard key={a.slug} article={a} index={i} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <FloatingZalo />

      <style>{`
        @media (max-width: 640px) {
          .blogpost-header { padding: 24px 20px !important; }
          .blogpost-body   { padding: 24px 20px !important; }
        }
      `}</style>
    </div>
  );
}
