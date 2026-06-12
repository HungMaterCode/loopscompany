import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Eye, LockKeyhole, ShieldCheck } from "lucide-react";
import { useAuth } from "@/features/legacy-core/auth";

export function Login() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("admin@vietweb.vn");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const from = searchParams.get("from") || "/admin";

  if (isAuthenticated) {
    router.replace("/admin");
    return null;
  }

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (login(email, password)) {
      router.replace(from);
      return;
    }
    setError("Sai tài khoản hoặc mật khẩu admin.");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070303] px-4 py-24 text-white sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(220,52,25,0.28),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(255,196,87,0.14),transparent_30%),linear-gradient(180deg,#130605_0%,#070303_80%)]" />
      <div className="absolute left-1/2 top-16 h-56 w-56 -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl" />
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto grid max-w-5xl overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.055] shadow-2xl shadow-black/40 backdrop-blur-2xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="border-b border-white/10 bg-black/25 p-8 lg:border-b-0 lg:border-r lg:p-10">
          <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 shadow-2xl shadow-red-900/40">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.05em] sm:text-5xl">Khu quản trị riêng</h1>
          <p className="mt-4 text-sm leading-7 text-white/58">Chỉ tài khoản admin mới có thể vào dashboard để quản lý section, bảng giá, dự án, form lead và SEO của website Việt Web.</p>
          <div className="mt-8 rounded-3xl border border-red-300/15 bg-red-500/10 p-4 text-sm leading-6 text-red-50/80">
            Demo nội bộ: <b>admin@vietweb.vn</b> / <b>admin123</b>. Khi nối backend thật, phần này sẽ thay bằng phân quyền và session bảo mật.
          </div>
        </div>
        <form onSubmit={submit} className="p-8 lg:p-10">
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-[0.22em] text-red-200/70">Admin login</div>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">Đăng nhập quản trị</h2>
          </div>
          <label className="mb-2 block text-sm text-white/65">Email admin</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mb-4 w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-red-300/45" />
          <label className="mb-2 block text-sm text-white/65">Mật khẩu</label>
          <div className="relative">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 pr-11 text-sm text-white outline-none transition focus:border-red-300/45" />
            <LockKeyhole className="absolute right-4 top-3.5 h-4 w-4 text-white/35" />
          </div>
          {error && <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</p>}
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-red-950/40 transition hover:bg-red-500">
            <Eye className="h-4 w-4" /> Vào trang admin
          </button>
        </form>
      </motion.section>
    </main>
  );
}
