import { RED } from "../../../features/legacy-core/tokens";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <span style={{ display: "block", width: 20, height: 1, backgroundColor: RED }} />
      <span style={{ color: RED, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>
        {children}
      </span>
      <span style={{ display: "block", width: 20, height: 1, backgroundColor: RED }} />
    </div>
  );
}
