import { Reveal } from "@/components/ui/Reveal";
import { SectionBg, Orb, GridPattern } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useSiteData } from "@/legacy-app/SiteDataContext";
import { RED, RED_DIM, TEXT, TEXT60, TEXT35 } from "@/legacy-app/tokens";
import {
  MessageCircle, PenTool, Rocket, Headphones, Zap, Smartphone, Shield, Users, BarChart2, Star, Clock, Award, LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  PenTool,
  Rocket,
  Headphones,
  Zap,
  Smartphone,
  Shield,
  Users,
  BarChart2,
  Star,
  Clock,
  Award
};

export function ProcessSection() {
  const { config } = useSiteData();

  const processConfig = config.process || {
    bgUrl: "",
    title: "Chỉ 4 bước — website\nsẵn sàng hoạt động",
    subtitle: "Quy trình làm việc",
    steps: [
      { num: "01", iconName: "MessageCircle", title: "Tư vấn miễn phí", desc: "Nhắn Zalo hoặc điền form. Chuyên viên liên hệ trong 30 phút để hiểu nhu cầu của bạn." },
      { num: "02", iconName: "PenTool", title: "Thiết kế & Phê duyệt", desc: "Demo trong 48 giờ. Chỉnh sửa không giới hạn cho đến khi bạn thật sự hài lòng." },
      { num: "03", iconName: "Rocket", title: "Ra mắt website", desc: "Website go-live trong 5 ngày làm việc. Đầy đủ domain, hosting, SSL và email." },
      { num: "04", iconName: "Headphones", title: "Hỗ trợ liên tục", desc: "Báo cáo traffic hàng tháng, cập nhật nội dung và hỗ trợ kỹ thuật 24/7 qua Zalo." },
    ]
  };

  const steps = processConfig.steps || [];

  return (
    <section id="quy-trinh" style={{ position: "relative", padding: "100px 24px", overflow: "hidden" }}>
      <SectionBg src={processConfig.bgUrl || config.oldSections.processBg} overlayOpacity={0.86} />
      <GridPattern opacity={0.04} />
      {/* Pink glow removed as requested */}
      <Orb size={300} opacity={0.25} color="var(--sc-orb-2-bg)" bottom="0%" left="10%" delay={5} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
          <SectionLabel>{processConfig.subtitle}</SectionLabel>
          <h2 style={{ color: TEXT, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: "-0.035em", margin: 0, lineHeight: 1.12 }}>
            {processConfig.title.split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < processConfig.title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, position: "relative" }}>
          {steps.map((step, i) => {
            const Icon = iconMap[step.iconName] || MessageCircle;
            return (
              <Reveal key={i} delay={i * 0.12} direction="up">
                <div className="premium-glass" style={{
                  borderRadius: 18, padding: 28, position: "relative", height: "100%", boxSizing: "border-box",
                }}>
                  <div style={{ position: "absolute", top: 12, right: 18, fontSize: 56, fontWeight: 800, letterSpacing: "-0.05em", color: "var(--vw-ghost)", lineHeight: 1, userSelect: "none" }}>{step.num}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: i === 0 ? RED : RED_DIM, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: i === 0 ? "0 8px 24px rgba(212,59,31,0.4)" : "none" }}>
                      <Icon size={21} color={i === 0 ? "#fff" : RED} />
                    </div>
                    <span style={{ color: i === 0 ? RED : TEXT35, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>Bước {step.num}</span>
                  </div>
                  <h3 style={{ color: TEXT, fontSize: 15, fontWeight: 600, margin: "0 0 10px", letterSpacing: "-0.02em" }}>{step.title}</h3>
                  <p style={{ color: TEXT60, fontSize: 13, lineHeight: 1.68, margin: 0 }}>{step.desc}</p>
                  {i < steps.length - 1 && (
                    <div style={{ position: "absolute", right: -11, top: "50%", transform: "translateY(-50%)", color: RED, fontSize: 20, zIndex: 2 }} className="process-arrow">›</div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
