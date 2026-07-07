import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Check, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { SectionBg, Orb, GridPattern } from "../components/ui/SectionBg";
import { SectionLabel } from "../components/ui/SectionLabel";
import { IMG } from "../../features/legacy-core/images";
import { useSiteData } from "../../features/legacy-core/SiteDataContext";
import { RED, RED_MED, TEXT, TEXT60, TEXT35, BORDER_M, GLASS_LIGHT, EASE } from "../../features/legacy-core/tokens";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [submitted, setSubmitted] = useState(false);
  const { config } = useSiteData();

  return (
    <section id="lien-he" style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
      <SectionBg src={config.oldSections.contactBg} overlayOpacity={0.87} />
      <GridPattern opacity={0.04} />
      <Orb size={700} opacity={0.15} top="-20%" left="20%" delay={0} />
      <Orb size={400} opacity={0.10} bottom="-5%" right="5%" delay={4} />

      <div ref={ref} style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }} className="contact-grid">
          {/* Left */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
              <SectionLabel>Liên hệ ngay</SectionLabel>
            </motion.div>
            <motion.h2 style={{ color: TEXT, fontSize: "clamp(28px,3vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, margin: "14px 0 18px" }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.65, ease: EASE }}>
              Bắt đầu hành trình<br />số hóa của bạn
            </motion.h2>
            <motion.p style={{ color: TEXT60, fontSize: 14, lineHeight: 1.78, margin: "0 0 32px" }}
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
              Điền form bên phải — chuyên viên sẽ liên hệ tư vấn miễn phí trong vòng 30 phút làm việc.
            </motion.p>
            <motion.div style={{ ...GLASS_LIGHT, borderRadius: 20, overflow: "hidden", aspectRatio: "4/3" }}
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.7, ease: EASE }}>
              <img src={IMG.team} alt="Đội ngũ Việt Web" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </motion.div>
            <motion.div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}
               initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}>
              {[{ Icon: MapPin, text: "Cần Thơ", href: "https://www.google.com/maps/search/?api=1&query=Cần+Thơ" },
                { Icon: Phone,  text: "+84 378443602 (Zalo / Điện thoại)", href: "https://zalo.me/0378443602" },
                { Icon: Mail,   text: "ducanhnhatbui@gmail.com", href: "mailto:ducanhnhatbui@gmail.com" }]
                .map(({ Icon, text, href }) => (
                  <a key={text} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <Icon size={14} color={RED} />
                    <span style={{ color: TEXT60, fontSize: 13, transition: "color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = RED)}
                      onMouseLeave={e => (e.currentTarget.style.color = TEXT60)}>{text}</span>
                  </a>
                ))}
            </motion.div>
          </div>

          {/* Right — glass form */}
          <motion.div style={{ ...GLASS_LIGHT, borderRadius: 24, padding: 32 }}
            initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.75, ease: EASE }}>
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, gap: 16, textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: RED_MED, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${RED}` }}>
                  <Check size={26} color={RED} />
                </div>
                <p style={{ color: TEXT, fontSize: 18, fontWeight: 600, margin: 0 }}>Gửi thành công!</p>
                <p style={{ color: TEXT60, fontSize: 13, margin: 0 }}>Chúng tôi sẽ liên hệ bạn trong 30 phút.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ color: TEXT, fontSize: 16, fontWeight: 600, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Đăng ký tư vấn miễn phí</p>
                {[{ label: "Họ và tên", placeholder: "Nguyễn Văn A", type: "text" },
                  { label: "Số điện thoại / Zalo", placeholder: "0901 234 567", type: "tel" },
                  { label: "Email", placeholder: "email@congty.vn", type: "email" }]
                  .map(({ label, placeholder, type }) => (
                    <div key={label}>
                      <label style={{ display: "block", color: TEXT35, fontSize: 12, marginBottom: 7, fontWeight: 500 }}>{label}</label>
                      <input type={type} placeholder={placeholder} required
                        style={{ width: "100%", backgroundColor: "var(--vw-bg-input)", backdropFilter: "blur(8px)", border: `1px solid ${BORDER_M}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, color: TEXT, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                        onFocus={e => (e.currentTarget.style.borderColor = RED)}
                        onBlur={e => (e.currentTarget.style.borderColor = BORDER_M)} />
                    </div>
                  ))}
                <div>
                  <label style={{ display: "block", color: TEXT35, fontSize: 12, marginBottom: 7, fontWeight: 500 }}>Gói quan tâm</label>
                  <select defaultValue="W-03"
                    style={{ width: "100%", backgroundColor: "var(--vw-bg-input)", backdropFilter: "blur(8px)", border: `1px solid ${BORDER_M}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, color: TEXT, outline: "none" }}>
                    <option value="W-01">W-01 — Gói Thuê 1 (189.000₫/tháng)</option>
                    <option value="W-02">W-02 — Gói Thuê 2 (589.000₫/tháng)</option>
                    <option value="W-03">W-03 — Gói Thuê 3 (889.000₫/tháng)</option>
                    <option value="W-04">W-04 — Gói Thuê 4 (1.189.000₫/tháng)</option>
                  </select>
                </div>
                <button type="submit"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: RED, color: "#fff", border: "none", borderRadius: 40, padding: "13px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 6, letterSpacing: "-0.01em", transition: "background-color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#bb3218")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = RED)}>
                  Gửi yêu cầu tư vấn <ArrowRight size={15} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
