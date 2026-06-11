import { GLASS, TEXT35 } from "../../tokens";

interface BrowserMockupProps {
  src: string;
  style?: React.CSSProperties;
}

export function BrowserMockup({ src, style = {} }: BrowserMockupProps) {
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", ...GLASS, ...style }}>
      <div style={{ backgroundColor: "rgba(5,5,5,0.9)", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => (
            <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: c }} />
          ))}
        </div>
        <div style={{ flex: 1, backgroundColor: "#111", borderRadius: 4, height: 18, display: "flex", alignItems: "center", padding: "0 8px", gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#28C840" }} />
          <span style={{ color: TEXT35, fontSize: 9, fontFamily: "monospace" }}>vietweb.vn</span>
        </div>
      </div>
      <img src={src} alt="website preview" style={{ width: "100%", display: "block", objectFit: "cover" }} />
    </div>
  );
}
