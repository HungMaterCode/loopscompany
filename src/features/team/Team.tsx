"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import Link from "next/link";
import { SectionBg, Orb, GridPattern } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TEAM, TEAM_VALUES } from "@/features/legacy-core/data";
import { IMG } from "@/features/legacy-core/images";
import { RED, RED_DIM, TEXT, TEXT60, TEXT35, BORDER, BORDER_M, GLASS, GLASS_LIGHT, EASE } from "@/features/legacy-core/tokens";

// ── Hero ────────────────────────────────────────────────────────────────────
function TeamHero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center" }}>
      <SectionBg src={IMG.teamHeroBg} overlayOpacity={0.65} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(2,2,2,0.97) 0%, rgba(2,2,2,0.75) 55%, rgba(2,2,2,0.2) 100%)", zIndex: 1 }} />
      <Orb size={800} opacity={0.13} top="-20%" right="-10%" delay={0} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "120px 24px 80px", width: "100%" }}>
        <div style={{ maxWidth: 680 }}>
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ width: 40, height: 1, backgroundColor: RED }} />
              <span style={{ color: RED, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Đội ngũ Việt Web Studio</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8, ease: EASE }}
            style={{ color: TEXT, fontSize: "clamp(42px,6.5vw,88px)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 0.95, margin: "0 0 32px" }}>
            Người<br />
            <span style={{ color: RED }}>thực sự</span><br />
            đứng sau
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: EASE }}
            style={{ color: TEXT60, fontSize: "clamp(15px,1.8vw,18px)", lineHeight: 1.75, maxWidth: 480, margin: "0 0 48px" }}>
            Không có AI. Không outsource. Mỗi website được tạo ra bởi chính những người bạn thấy dưới đây — với tên thật, kinh nghiệm thật và tâm huyết thật.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.65, ease: EASE }}
            style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[["6","Chuyên gia"],["40+","Năm KN tổng"],["500+","Dự án"],["98%","Hài lòng"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ color: TEXT, fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{num}</div>
                <div style={{ color: TEXT35, fontSize: 11, marginTop: 5, letterSpacing: "0.02em" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating quote card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
          style={{ position: "absolute", bottom: 80, right: 24, maxWidth: 320, ...GLASS_LIGHT, borderRadius: 20, padding: "24px 26px" }}>
          <Quote size={20} color={RED} style={{ marginBottom: 12 }} />
          <p style={{ color: TEXT60, fontSize: 13, lineHeight: 1.75, margin: "0 0 16px", fontStyle: "italic" }}>
            "Chúng tôi không làm website theo mẫu. Chúng tôi lắng nghe câu chuyện của bạn rồi kể lại nó bằng thiết kế."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={IMG.t1} alt="CEO" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", objectPosition: "center top" }} />
            <div>
              <div style={{ color: TEXT, fontSize: 12, fontWeight: 600 }}>Nguyễn Minh Hùng</div>
              <div style={{ color: TEXT35, fontSize: 10 }}>Giám Đốc & Nhà Sáng Lập</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ color: TEXT35, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase" }}>Cuộn xuống</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 36, backgroundColor: RED }} />
      </motion.div>
    </section>
  );
}

// ── Featured Member (founder) ────────────────────────────────────────────────
function FeaturedMember() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const founder = TEAM[0];

  return (
    <section ref={ref} style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
      <GridPattern opacity={0.03} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: 60 }}>
          <SectionLabel>Người sáng lập</SectionLabel>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="why-grid">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -48, scale: 0.94 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, ease: EASE }}
            style={{ position: "relative" }}>
            <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "3/4", boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}>
              <img src={founder.photo} alt={founder.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,2,2,0.6) 0%, transparent 50%)" }} />
            </div>
            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              style={{ position: "absolute", bottom: 28, left: -20, ...GLASS_LIGHT, borderRadius: 16, padding: "16px 20px" }}>
              <div style={{ color: TEXT, fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{founder.exp}</div>
              <div style={{ color: TEXT35, fontSize: 11, marginTop: 4 }}>kinh nghiệm</div>
            </motion.div>
            {/* Red line accent */}
            <div style={{ position: "absolute", top: 24, right: -12, width: 4, height: "40%", backgroundColor: RED, borderRadius: 2 }} />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.18, duration: 0.8, ease: EASE }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ height: 1, flex: 1, backgroundColor: BORDER }} />
              <span style={{ color: RED, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{founder.specialty}</span>
            </div>
            <h2 style={{ color: TEXT, fontSize: "clamp(32px,4.5vw,58px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.97, margin: "0 0 8px" }}>{founder.name}</h2>
            <p style={{ color: RED, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", margin: "0 0 28px", textTransform: "uppercase" }}>{founder.role}</p>
            <p style={{ color: TEXT60, fontSize: 16, lineHeight: 1.8, margin: "0 0 32px" }}>
              {founder.bio} Với triết lý "website phải ra đơn hàng, không chỉ đẹp", Hùng đã định hình cách Việt Web tiếp cận từng dự án — từ lắng nghe đến thiết kế đến vận hành.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {founder.skills.map(s => (
                <span key={s} style={{ fontSize: 11, fontWeight: 700, color: RED, backgroundColor: RED_DIM, border: `1px solid ${BORDER_M}`, borderRadius: 20, padding: "5px 14px", letterSpacing: "0.03em" }}>{s}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Team Card (interactive flip-style) ─────────────────────────────────────
function MemberCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.72, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "default" }}>
      <motion.div
        animate={{ y: hovered ? -8 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ borderRadius: 20, overflow: "hidden", position: "relative", aspectRatio: "3/4", ...GLASS }}>
        {/* Photo */}
        <motion.img
          src={member.photo}
          alt={member.name}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />

        {/* Gradient overlay — always visible */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,2,2,0.95) 0%, rgba(2,2,2,0.4) 50%, transparent 100%)" }} />

        {/* Hover info panel */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ position: "absolute", inset: 0, background: "rgba(2,2,2,0.72)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ color: TEXT60, fontSize: 13, lineHeight: 1.72, margin: "0 0 20px", fontStyle: "italic" }}>"{member.bio}"</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                  {member.skills.map(s => (
                    <span key={s} style={{ fontSize: 10, fontWeight: 700, color: RED, backgroundColor: RED_DIM, border: `1px solid ${BORDER_M}`, borderRadius: 20, padding: "4px 10px" }}>{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom info — always visible */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: RED, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 5px" }}>{member.role}</p>
              <h3 style={{ color: TEXT, fontSize: 16, fontWeight: 700, margin: "0 0 3px", letterSpacing: "-0.02em" }}>{member.name}</h3>
              <p style={{ color: TEXT35, fontSize: 11, margin: 0 }}>{member.exp} kinh nghiệm</p>
            </div>
            <motion.div
              animate={{ rotate: hovered ? 45 : 0, backgroundColor: hovered ? RED : "var(--vw-ghost-10)" }}
              transition={{ duration: 0.3 }}
              style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${BORDER_M}`, flexShrink: 0 }}>
              <ArrowUpRight size={14} color={TEXT} />
            </motion.div>
          </div>
        </div>

        {/* Exp badge top-right */}
        <div style={{ position: "absolute", top: 14, right: 14, ...GLASS_LIGHT, borderRadius: 20, padding: "4px 12px" }}>
          <span style={{ color: TEXT, fontSize: 10, fontWeight: 700 }}>{member.specialty.split(" ")[0]}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Full team grid ───────────────────────────────────────────────────────────
function TeamGrid() {
  const rest = TEAM.slice(1);
  return (
    <section style={{ position: "relative", padding: "0 24px 100px", overflow: "hidden" }}>
      <Orb size={600} opacity={0.08} top="30%" right="-10%" delay={2} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: 52 }}>
          <SectionLabel>Toàn bộ đội ngũ</SectionLabel>
          <h2 style={{ color: TEXT, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: 0 }}>
            Di chuột vào ảnh<br />để khám phá thêm
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {rest.map((m, i) => <MemberCard key={i} member={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ── Culture strip ────────────────────────────────────────────────────────────
function CultureStrip() {
  const photos = [IMG.ui1, IMG.team, IMG.ui3, IMG.ui4, IMG.ui2];
  return (
    <section style={{ position: "relative", padding: "80px 0", overflow: "hidden" }}>
      <SectionBg src={IMG.teamValBg} overlayOpacity={0.82} />
      <Orb size={500} opacity={0.10} top="-5%" left="30%" delay={1} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 52px" }}>
          <Reveal>
            <SectionLabel>Văn hoá làm việc</SectionLabel>
            <h2 style={{ color: TEXT, fontSize: "clamp(26px,3.5vw,46px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08, margin: "0 0 14px" }}>
              Không phải công ty —<br />là một đội
            </h2>
            <p style={{ color: TEXT60, fontSize: 15, lineHeight: 1.75, maxWidth: 440, margin: 0 }}>
              Mỗi thành viên là chuyên gia trong lĩnh vực của mình, nhưng chúng tôi cùng nhau xây dựng mọi thứ.
            </p>
          </Reveal>
        </div>

        {/* Horizontal scroll strip */}
        <div style={{ display: "flex", gap: 14, paddingLeft: 24, overflowX: "auto", scrollbarWidth: "none" }}>
          {photos.map((src, i) => (
            <Reveal key={i} delay={i * 0.08} direction="scale">
              <div style={{ borderRadius: 16, overflow: "hidden", width: 280, height: 200, flexShrink: 0, ...GLASS }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </Reveal>
          ))}
          {/* Values inline */}
          {TEAM_VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Reveal key={v.title} delay={0.4 + i * 0.08} direction="scale">
                <div style={{ ...GLASS_LIGHT, borderRadius: 16, width: 220, height: 200, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "24px 20px" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: RED_DIM, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={20} color={RED} />
                  </div>
                  <h4 style={{ color: TEXT, fontSize: 14, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{v.title}</h4>
                  <p style={{ color: TEXT35, fontSize: 11.5, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── CTA ────────────────────────────────────────────────────────────────────
function TeamCTA() {
  return (
    <section style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
      <GridPattern opacity={0.03} />
      <Orb size={600} opacity={0.12} top="-20%" left="30%" delay={0} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
        <Reveal direction="scale">
          <div style={{ ...GLASS_LIGHT, borderRadius: 28, padding: "64px 48px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${RED}, transparent)` }} />
            <div style={{ position: "absolute", bottom: -40, right: -40, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, rgba(212,59,31,0.15) 0%, transparent 70%)`, pointerEvents: "none" }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }} className="why-grid">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: RED_DIM, border: `1px solid ${BORDER_M}`, borderRadius: 40, padding: "5px 14px", marginBottom: 20 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: RED, animation: "pulse 2s ease infinite" }} />
                  <span style={{ color: RED, fontSize: 11, fontWeight: 700 }}>Đang tuyển dụng</span>
                </div>
                <h2 style={{ color: TEXT, fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 14px" }}>
                  Muốn cùng xây dựng<br />những điều ý nghĩa?
                </h2>
                <p style={{ color: TEXT60, fontSize: 14, lineHeight: 1.75, margin: 0 }}>
                  Chúng tôi tìm người đam mê thật sự — không cần CV hoàn hảo, chỉ cần tư duy đúng và khát vọng phát triển.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
                <a href="mailto:jobs@vietweb.vn"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: RED, color: "#fff", borderRadius: 40, padding: "13px 24px", fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                  Gửi CV ngay <ArrowRight size={14} />
                </a>
                <Link href="/"
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "transparent", color: TEXT60, border: `1px solid ${BORDER}`, borderRadius: 40, padding: "13px 20px", fontSize: 13, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}>
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export function Team() {
  return (
    <>
      <TeamHero />
      <FeaturedMember />
      <TeamGrid />
      <CultureStrip />
      <TeamCTA />
    </>
  );
}
