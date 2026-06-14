"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { RED, TEXT, TEXT60, BG, GLASS, BORDER } from "@/features/legacy-core/tokens";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export function GoogleLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogleSuccess(credentialResponse: { credential?: string }) {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Đăng nhập thất bại");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi kết nối với máy chủ");
      setLoading(false);
    }
  }

  function handleGoogleError() {
    setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
        <div
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
          <h1 style={{ color: TEXT, margin: "16px 0 8px", fontSize: 28 }}>Khách hàng LOOP</h1>
          <p style={{ color: TEXT60, marginBottom: 24 }}>
            Đăng nhập bằng tài khoản Google của bạn để xem và quản lý dự án.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            {GOOGLE_CLIENT_ID ? (
              <div style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.7 : 1 }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="pill"
                  width="300"
                />
              </div>
            ) : (
              <p style={{ color: RED, fontSize: 13, textAlign: 'center' }}>
                Thiếu cấu hình GOOGLE_CLIENT_ID trong .env
              </p>
            )}
          </div>

          {loading && (
            <p style={{ color: TEXT, fontSize: 13, marginBottom: 12, textAlign: "center" }}>
              Đang xác thực...
            </p>
          )}

          {error && (
            <p style={{ color: RED, fontSize: 13, marginBottom: 12, textAlign: "center", padding: "10px", background: "rgba(255,0,0,0.1)", borderRadius: "8px" }}>
              {error}
            </p>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
