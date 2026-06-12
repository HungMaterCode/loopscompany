import { UserLogin } from "@/legacy-pages/UserLogin";
import { ThemeProvider } from "@/legacy-app/theme-context";
import { GLOBAL_CSS } from "@/legacy-app/tokens";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản của bạn trên LOOP",
};

export default function LoginPage() {
  return (
    <ThemeProvider>
      <style>{GLOBAL_CSS}</style>
      <UserLogin />
    </ThemeProvider>
  );
}
