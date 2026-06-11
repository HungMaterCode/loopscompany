import { UserLogin } from "@/legacy-pages/UserLogin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản của bạn trên LOOP",
};

export default function LoginPage() {
  return <UserLogin />;
}
