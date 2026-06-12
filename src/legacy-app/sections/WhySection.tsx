import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Star, BarChart2, Zap, Smartphone, Shield, Users,
  Clock, Award, PenTool, Headphones, LucideIcon
} from "lucide-react";
import { Reveal, RevealText } from "../components/ui/Reveal";
import { SectionBg, Orb } from "../components/ui/SectionBg";
import { SectionLabel } from "../components/ui/SectionLabel";
import { useSiteData } from "../SiteDataContext";
import { RED, RED_DIM, TEXT, TEXT60, TEXT35, EASE } from "../tokens";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Smartphone,
  Shield,
  Users,
  BarChart2,
  Star,
  Clock,
  Award,
  PenTool,
  Headphones
};

export function WhySection() {
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, margin: "-60px" });
  const { config } = useSiteData();

  const whyConfig = config.whyChooseUs || {
    bgUrl: "",
    title: "Chúng tôi hiểu\ndoanh nghiệp Việt",
    description: "Hơn 8 năm phục vụ các doanh nghiệp vừa và nhỏ tại Việt Nam, chúng tôi hiểu bạn cần gì: một website đẹp, ra đơn hàng, dễ quản lý và giá phải chăng.",
    stat1Number: "+40%",
    stat1Label: "Tăng khách tháng đầu",
    stat2Title: "98% hài lòng",
    stat2Sub: "500+ khách hàng",
    stat2Stars: 5,
    points: [
      { iconName: "Zap", title: "Giao website trong 5 ngày", desc: "Quy trình tối ưu — từ tư vấn đến go-live chỉ trong một tuần làm việc, không trễ hẹn." },
      { iconName: "Smartphone", title: "Chuẩn mobile, nhanh gấp đôi", desc: "70% khách hàng Việt dùng điện thoại. Website hiển thị hoàn hảo trên mọi màn hình." },
      { iconName: "Shield", title: "SSL, bảo mật & sao lưu tự động", desc: "Mã hoá HTTPS, sao lưu mỗi ngày, chống hack và malware. Bạn không cần lo về kỹ thuật." },
      { iconName: "Users", title: "Hỗ trợ Zalo 24/7, phản hồi nhanh", desc: "Nhắn Zalo bất kỳ lúc nào — đội hỗ trợ phản hồi trong vòng 30 phút trong giờ làm việc." },
    ]
  };

  const displayPoints = whyConfig.points || [];

  return (
    <section id="about" style={{ position: "relative", padding: "96px 20px", overflow: "hidden" }}>
      <SectionBg src={whyConfig.bgUrl || config.oldSections.whyBg} overlayOpacity={0.80} />
      <Orb size={700} opacity={0.35} color="var(--sc-orb-1-bg)" top="0%" right="-15%" delay={1} />
      <Orb size={350} opacity={0.30} color="var(--sc-orb-3-bg)" bottom="10%" left="-5%" delay={4} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="why-grid">
        {/* Image */}
        <motion.div ref={imgRef}
          initial={{ opacity: 0, x: -36, scale: 0.95 }}
          animate={imgInView ? { opacity: 1, x: 0, scale: 1 } : {}}
          transition={{ duration: 0.78, ease: EASE }}
          style={{ position: "relative" }}>
          <div style={{ borderRadius: 22, overflow: "hidden", aspectRatio: "4/5", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}>
            <img src="/img/owner.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600";
            }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(2,2,2,0.5) 0%,transparent 55%)" }} />
          </div>
          {/* Stat card 1 */}
          <motion.div initial={{ opacity: 0, scale: 0.85, x: -16 }} animate={imgInView ? { opacity: 1, scale: 1, x: 0 } : {}} transition={{ delay: 0.45, duration: 0.6, ease: EASE }}
            className="premium-glass"
            style={{ position: "absolute", bottom: 28, left: -28, borderRadius: 14, padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BarChart2 size={17} color="#fff" />
              </div>
              <div>
                <div style={{ color: TEXT, fontSize: 18, fontWeight: 700, letterSpacing: "-0.03em" }}>{whyConfig.stat1Number}</div>
                <div style={{ color: TEXT35, fontSize: 11 }}>{whyConfig.stat1Label}</div>
              </div>
            </div>
          </motion.div>
          {/* Stat card 2 */}
          <motion.div initial={{ opacity: 0, scale: 0.85, x: 16 }} animate={imgInView ? { opacity: 1, scale: 1, x: 0 } : {}} transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            className="premium-glass"
            style={{ position: "absolute", top: 24, right: -24, borderRadius: 14, padding: "12px 16px" }}>
            <div style={{ display: "flex", gap: 1, marginBottom: 5 }}>
              {Array.from({ length: whyConfig.stat2Stars || 5 }).map((_, s) => (
                <Star key={s} size={11} fill={RED} color={RED} />
              ))}
            </div>
            <div style={{ color: TEXT, fontSize: 12, fontWeight: 600 }}>{whyConfig.stat2Title}</div>
            <div style={{ color: TEXT35, fontSize: 10, marginTop: 2 }}>{whyConfig.stat2Sub}</div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <div>
          <Reveal>
            <SectionLabel>Tại sao chọn chúng tôi</SectionLabel>
            <h2 style={{ color: TEXT, fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.12, margin: "0 0 18px" }}>
              {whyConfig.title.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < whyConfig.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
            <RevealText
              text={whyConfig.description}
              color={TEXT60}
            />
          </Reveal>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 12 }}>
            {displayPoints.map((pt, i) => {
              const Icon = iconMap[pt.iconName] || Zap;
              return (
                <Reveal key={i} delay={0.1 * (i + 1)} direction="right">
                  <div className="premium-glass" style={{ borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, backgroundColor: RED_DIM, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={16} color={RED} />
                    </div>
                    <div>
                      <h4 style={{ color: TEXT, fontSize: 13, fontWeight: 600, margin: "0 0 3px", letterSpacing: "-0.01em" }}>{pt.title}</h4>
                      <p style={{ color: TEXT60, fontSize: 12, lineHeight: 1.6, margin: 0 }}>{pt.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
