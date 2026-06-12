import { GoogleLoginForm } from "@/components/auth/google-login-form";

export const metadata = {
  title: "Đăng nhập | LOOPS",
  description: "Đăng nhập vào hệ thống LOOPS",
};

export default function LoginPage() {
  return <GoogleLoginForm />;
}
