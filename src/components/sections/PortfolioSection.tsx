import { Reveal } from "@/components/ui/Reveal";
import { SectionBg, Orb, GridPattern } from "@/components/ui/SectionBg";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PORTFOLIO } from "@/features/legacy-core/data";
import { BG, TEXT, TEXT60, TEXT35, RED, GLASS } from "@/features/legacy-core/tokens";

const ROW1 = [...PORTFOLIO, ...PORTFOLIO];
const ROW2 = [...[...PORTFOLIO].reverse(), ...[...PORTFOLIO].reverse()];

function PortfolioCard({ item }: { item: typeof PORTFOLIO[0] }) {
  return (
    <div className="port-item" style={{ ...GLASS, borderRadius: 16, overflow: "hidden", position: "relative", cursor: "pointer", width: 300, height: 195, flexShrink: 0, marginRight: 16 }}>
      <img src={item.src} alt={item.name} className="port-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease" }} />
      <div className="port-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(2,2,2,0.92) 0%,rgba(2,2,2,0.2) 60%)", opacity: 0, transition: "opacity 0.3s" }} />
      <div className="port-text" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 16px", transform: "translateY(8px)", opacity: 0, transition: "all 0.3s" }}>
        <span style={{ color: RED, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.type}</span>
        <p style={{ color: TEXT, fontSize: 13, fontWeight: 600, margin: "3px 0 0" }}>{item.name}</p>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  return (
    <section id="danh-muc" style={{ position: "relative", padding: "100px 0", overflow: "hidden", backgroundColor: BG }}>
      <GridPattern opacity={0.035} />
      <Orb size={500} opacity={0.08} top="20%" left="40%" delay={2} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal style={{ textAlign: "center", marginBottom: 52, padding: "0 24px" }}>
          <SectionLabel>Danh mục dự án</SectionLabel>
          <h2 style={{ color: TEXT, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, letterSpacing: "-0.035em", margin: "0 0 14px", lineHeight: 1.12 }}>
            Website chúng tôi đã làm
          </h2>
          <p style={{ color: TEXT60, fontSize: 14, maxWidth: 440, margin: "0 auto" }}>
            Hơn 500 dự án từ spa, nhà hàng, cửa hàng thời trang đến phòng khám và bất động sản.
          </p>
        </Reveal>
        <div style={{ overflow: "hidden", marginBottom: 16 }}>
          <div className="port-row1">{ROW1.map((item, i) => <PortfolioCard key={i} item={item} />)}</div>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className="port-row2">{ROW2.map((item, i) => <PortfolioCard key={i} item={item} />)}</div>
        </div>
        <p style={{ color: TEXT35, fontSize: 12, textAlign: "center", marginTop: 32, padding: "0 24px" }}>
          Di chuột vào ảnh để xem chi tiết dự án
        </p>
      </div>
    </section>
  );
}
