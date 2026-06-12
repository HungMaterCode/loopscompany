"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useTheme } from "@/legacy-app/theme-context";

export function UserLogin({ onClose }: { onClose?: () => void }) {
  const { isDark } = useTheme();

  const [loginError, setLoginError]     = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleCredentialResponse = useCallback(async (response: any) => {
    try {
      setLoginError("");
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setLoginError(errData.error || "Đăng nhập bằng Google thất bại.");
        return;
      }

      setLoginSuccess(true);
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
        window.location.reload();
      }, 1500);
    } catch (err) {
      console.error("Google Auth Error:", err);
      setLoginError("Có lỗi xảy ra khi kết nối với hệ thống.");
    }
  }, [onClose]);

  const initGoogle = useCallback(() => {
    if (typeof window === "undefined") return;
    const google = (window as any).google;
    if (!google) return;

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      callback: handleCredentialResponse,
    });

    const btnContainer = document.getElementById("google-signin-button");
    if (btnContainer) {
      btnContainer.innerHTML = ""; // Clear existing button
      google.accounts.id.renderButton(btnContainer, {
        theme: isDark ? "filled_black" : "outline",
        size: "large",
        width: 380,
        shape: "pill",
        text: "continue_with",
      });
    }
  }, [isDark, handleCredentialResponse]);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).google) {
      initGoogle();
    }
  }, [initGoogle]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        position: "fixed", 
        inset: 0, 
        zIndex: 500, // Sit above everything
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "16px",
        overflow: "hidden",
      }}
    >
      {/* Blurred Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: isDark 
            ? "rgba(4,1,1,0.72)"
            : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          cursor: onClose ? "pointer" : "default",
          transition: "background 0.38s ease",
        }}
      />

      {/* ── Card — glass blur so bg shows through ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 440,
          borderRadius: 24,
          overflow: "hidden",
          background: "var(--vw-glass-bg)",
          border: "1px solid var(--vw-glass-border)",
          boxShadow: "var(--vw-glass-shadow)",
          transition: "background-color 0.38s ease, border-color 0.38s ease, box-shadow 0.38s ease",
        }}
      >
        <style>{`
          .google-btn-wrapper:hover .custom-btn-inner {
            background: ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)"} !important;
            border-color: ${isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"} !important;
            transform: translateY(-1px);
          }
          .google-btn-wrapper:active .custom-btn-inner {
            transform: translateY(1px);
          }
        `}</style>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              color: "var(--vw-text-35)",
              cursor: "pointer",
              padding: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease, transform 0.2s ease",
              zIndex: 20,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = "var(--vw-text)";
              e.currentTarget.style.transform = "scale(1.08)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = "var(--vw-text-35)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <X size={18} />
          </button>
        )}

        {/* Form body */}
        <div style={{ padding: "36px 28px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          
          {/* Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 4 }}>
              <div 
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: 11, 
                  background: "var(--vw-accent)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  color: "#fff", 
                  fontSize: 14, 
                  fontWeight: 700, 
                  boxShadow: "0 6px 26px rgba(var(--vw-accent-rgb), 0.48)",
                  transition: "background-color 0.38s ease, box-shadow 0.38s ease",
                }}
              >
                LP
              </div>
              <span style={{ color: "var(--vw-text)", fontWeight: 700, fontSize: 18, letterSpacing: "-0.03em", transition: "color 0.38s ease" }}>LOOPS</span>
            </div>
            <p style={{ color: "var(--vw-text-35)", fontSize: 12, letterSpacing: "0.02em", transition: "color 0.38s ease", margin: 0 }}>Nền tảng thiết kế & cho thuê website</p>
          </div>

          <h2 style={{ 
            color: "var(--vw-text)", 
            fontSize: 20, 
            fontWeight: 700, 
            marginBottom: 6, 
            letterSpacing: "-0.04em",
            textAlign: "center",
            transition: "color 0.38s ease",
          }}>
            Đăng nhập
          </h2>
          <p style={{ 
            color: "var(--vw-text-60)", 
            fontSize: 13, 
            marginBottom: 28,
            textAlign: "center",
            lineHeight: 1.5,
            transition: "color 0.38s ease",
          }}>
            Chào mừng trở lại! Vui lòng đăng nhập bằng tài khoản Google hoặc Gmail để tiếp tục.
          </p>

          {/* Custom Google Button container */}
          <div 
            className="google-btn-wrapper"
            style={{ position: "relative", width: "100%", maxWidth: "380px", height: "46px" }}
          >
            {/* Custom styled button underneath */}
            <div
              className="custom-btn-inner"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                borderRadius: "9999px",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.15)",
                background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.03)",
                color: "var(--vw-text)",
                fontSize: "14px",
                fontWeight: 600,
                pointerEvents: "none",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Google G logo SVG */}
              <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Tiếp tục với Google</span>
            </div>

            {/* Invisible Google native login trigger layered on top */}
            <div 
              id="google-signin-button" 
              style={{ 
                position: "absolute", 
                inset: 0, 
                opacity: 0.01,
                cursor: "pointer",
                zIndex: 2,
              }} 
            />
          </div>

          <AnimatePresence>
            {loginError && (
              <div style={{ marginTop: 20, width: "100%" }}>
                <Msg type="error">{loginError}</Msg>
              </div>
            )}
            {loginSuccess && (
              <div style={{ marginTop: 20, width: "100%" }}>
                <Msg type="success">Đăng nhập thành công! Đang chuyển hướng...</Msg>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={initGoogle}
        strategy="afterInteractive"
      />
    </motion.div>
  );
}

// ─── Micro-components ────────────────────────────────────────────────────────

function Msg({ children, type }: { children: React.ReactNode; type: "error" | "success" }) {
  const isErr = type === "error";
  return (
    <motion.div 
      initial={{ opacity: 0, y: -6, height: 0 }} 
      animate={{ opacity: 1, y: 0, height: "auto" }} 
      exit={{ opacity: 0, height: 0 }}
      style={{ 
        overflow: "hidden", 
        padding: "10px 14px", 
        borderRadius: 11,
        background: isErr ? "rgba(239, 68, 68, 0.12)" : "rgba(34, 197, 94, 0.10)",
        border: `1px solid ${isErr ? "rgba(239, 68, 68, 0.25)" : "rgba(34, 197, 94, 0.25)"}`,
        color: isErr ? "#fca5a5" : "#86efac", 
        fontSize: 12,
        textAlign: "center",
      }}
    >
      {children}
    </motion.div>
  );
}
