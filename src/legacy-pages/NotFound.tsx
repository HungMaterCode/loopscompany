import { Link } from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Orb, GridPattern } from "@/components/ui/SectionBg";
import { RED, TEXT, TEXT60, BORDER, EASE } from "@/legacy-app/tokens";

export function NotFound() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "80px 24px" }}>
      <GridPattern opacity={0.04} />
      <Orb size={600} opacity={0.12} top="10%" left="20%" delay={0} />
      <Orb size={400} opacity={0.08} bottom="10%" right="15%" delay={3} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 520 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}>
          <div style={{ fontSize: "clamp(80px,15vw,140px)", fontWeight: 800, letterSpacing: "-0.06em", lineHeight: 1, color: RED, marginBottom: 16 }}>404</div>
          <h1 style={{ color: TEXT, fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 16px" }}>
            Trang không tìm thấy
          </h1>
          <p style={{ color: TEXT60, fontSize: 15, lineHeight: 1.75, margin: "0 0 36px" }}>
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Link href="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: RED, color: "#fff", borderRadius: 40, padding: "12px 24px", fontSize: 14, fontWeight: 600, textDecoration: "none", letterSpacing: "-0.01em" }}>
            <ArrowLeft size={14} />
            Về trang chủ
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
