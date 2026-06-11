"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RED, TEXT, TEXT60, BG, GLASS, BORDER } from "@/legacy-app/tokens";

export function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@loops.vn");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Đăng nhập thất bại");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 32,
          borderRadius: 24,
          border: `1px solid ${BORDER}`,
          ...GLASS,
        }}
      >
        <Link href="/" style={{ color: TEXT60, textDecoration: "none", fontSize: 13 }}>
          ← Về trang chủ
        </Link>
        <h1 style={{ color: TEXT, margin: "16px 0 8px", fontSize: 28 }}>Admin LOOP</h1>
        <p style={{ color: TEXT60, marginBottom: 24 }}>
          Đăng nhập để quản lý nội dung, SEO và cấu hình website.
        </p>

        <label style={{ display: "block", color: TEXT60, fontSize: 13, marginBottom: 8 }}>
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          style={{
            width: "100%",
            marginBottom: 16,
            padding: "12px 14px",
            borderRadius: 12,
            border: `1px solid ${BORDER}`,
            background: "transparent",
            color: TEXT,
          }}
        />

        <label style={{ display: "block", color: TEXT60, fontSize: 13, marginBottom: 8 }}>
          Mật khẩu
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          style={{
            width: "100%",
            marginBottom: 16,
            padding: "12px 14px",
            borderRadius: 12,
            border: `1px solid ${BORDER}`,
            background: "transparent",
            color: TEXT,
          }}
        />

        {error && (
          <p style={{ color: RED, fontSize: 13, marginBottom: 12 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: 999,
            border: "none",
            background: RED,
            color: "#fff",
            fontWeight: 700,
            cursor: loading ? "wait" : "pointer",
          }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
