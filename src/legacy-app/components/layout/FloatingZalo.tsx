import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

import { SITE_INFO } from "../../site-config";

export function FloatingZalo() {
  const cleanPhone = SITE_INFO.zalo.replace(/[^\d]/g, "");
  const zaloUrl = `https://zalo.me/${cleanPhone.startsWith("84") ? "0" + cleanPhone.slice(2) : cleanPhone}`;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 200 }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 20 }}>
        <a
          href={zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 8, backgroundColor: "#0068FF", color: "#fff", border: "none", borderRadius: 40, padding: "11px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,104,255,0.45)", transition: "transform 0.2s, box-shadow 0.2s", textDecoration: "none" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.06)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(0,104,255,0.55)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(0,104,255,0.45)"; }}>
          <MessageCircle size={16} />
          Nhắn Zalo ngay
        </a>
      </motion.div>
    </div>
  );
}
