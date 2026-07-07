import { MARQUEE_ITEMS } from "../../features/legacy-core/data";
import { RED } from "../../features/legacy-core/tokens";

export function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ backgroundColor: RED, overflow: "hidden", padding: "10px 0" }}>
      <div className="vwTrack">
        {doubled.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "0 18px", whiteSpace: "nowrap" }}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{item}</span>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 6 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
