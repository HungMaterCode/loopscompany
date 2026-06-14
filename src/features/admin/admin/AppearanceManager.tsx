import { Check, Moon, Sun, Palette, Type, Zap } from "lucide-react";
import type { AdminTheme, TC } from "./types";

interface Props {
  t: TC;
  isDark: boolean;
  theme: AdminTheme;
  onThemeChange: (t: AdminTheme) => void;
}

const ACCENT_COLORS = [
  { label: "Đỏ cam (mặc định)", value: "#D43B1F", bg: "bg-[#D43B1F]" },
  { label: "Đỏ tươi", value: "#E53E3E", bg: "bg-[#E53E3E]" },
  { label: "Cam đậm", value: "#DD6B20", bg: "bg-[#DD6B20]" },
  { label: "Hồng đỏ", value: "#D63384", bg: "bg-[#D63384]" },
  { label: "Xanh dương", value: "#2563EB", bg: "bg-[#2563EB]" },
  { label: "Xanh lá", value: "#059669", bg: "bg-[#059669]" },
];

export function AppearanceManager({ t, isDark, theme, onThemeChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Giao diện</h2>
        <p className={`mt-1 text-sm ${t.textMuted}`}>Tuỳ chỉnh chủ đề hiển thị cho khu vực admin.</p>
      </div>

      {/* Theme picker */}
      <div className={`rounded-2xl p-6 ${t.card}`}>
        <div className="mb-5 flex items-center gap-2">
          <Palette className={`h-5 w-5 ${isDark ? "text-red-300" : "text-red-600"}`} />
          <h3 className={`font-semibold ${t.text}`}>Chủ đề màu sắc</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Dark theme card */}
          <button
            onClick={() => onThemeChange("dark")}
            className={`relative overflow-hidden rounded-2xl border-2 p-1 transition ${
              theme === "dark"
                ? "border-red-500 shadow-lg shadow-red-900/30"
                : isDark ? "border-white/10 hover:border-white/20" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Preview */}
            <div className="rounded-xl overflow-hidden bg-[#070303] p-4 aspect-video relative">
              {/* Mock sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-[#0C0404] flex flex-col items-center gap-2 pt-4">
                {[...Array(5)].map((_, i) => <div key={i} className={`h-1.5 w-5 rounded-full ${i === 0 ? "bg-red-500" : "bg-white/15"}`} />)}
              </div>
              {/* Mock content */}
              <div className="ml-12 space-y-2">
                <div className="h-3 w-24 rounded bg-white/20" />
                <div className="grid grid-cols-2 gap-1.5">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-8 rounded-lg bg-white/[0.06] border border-white/8" />)}
                </div>
                <div className="h-12 rounded-xl bg-white/[0.04] border border-white/8" />
              </div>
            </div>
            <div className={`mt-3 mb-2 flex items-center justify-between px-2`}>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-white" />
                <span className="font-semibold text-white text-sm">Tối (Dark)</span>
              </div>
              {theme === "dark" && <Check className="h-4 w-4 text-red-400" />}
            </div>
          </button>

          {/* Light theme card */}
          <button
            onClick={() => onThemeChange("light")}
            className={`relative overflow-hidden rounded-2xl border-2 p-1 transition ${
              theme === "light"
                ? "border-red-500 shadow-lg"
                : isDark ? "border-white/10 hover:border-white/20" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Preview */}
            <div className="rounded-xl overflow-hidden bg-[#F2F4F7] p-4 aspect-video relative">
              {/* Mock sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-white border-r border-gray-200 flex flex-col items-center gap-2 pt-4">
                {[...Array(5)].map((_, i) => <div key={i} className={`h-1.5 w-5 rounded-full ${i === 0 ? "bg-red-500" : "bg-gray-300"}`} />)}
              </div>
              {/* Mock content */}
              <div className="ml-12 space-y-2">
                <div className="h-3 w-24 rounded bg-gray-300" />
                <div className="grid grid-cols-2 gap-1.5">
                  {[...Array(4)].map((_, i) => <div key={i} className="h-8 rounded-lg bg-white border border-gray-200 shadow-sm" />)}
                </div>
                <div className="h-12 rounded-xl bg-white border border-gray-200 shadow-sm" />
              </div>
            </div>
            <div className={`mt-3 mb-2 flex items-center justify-between px-2`}>
              <div className="flex items-center gap-2">
                <Sun className={`h-4 w-4 ${isDark ? "text-white" : "text-gray-900"}`} />
                <span className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>Sáng (Light)</span>
              </div>
              {theme === "light" && <Check className="h-4 w-4 text-red-500" />}
            </div>
          </button>
        </div>
      </div>

      {/* Accent color */}
      <div className={`rounded-2xl p-6 ${t.card}`}>
        <div className="mb-5 flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-red-500 to-orange-400" />
          <h3 className={`font-semibold ${t.text}`}>Màu nhấn (Accent)</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => (
            <button key={color.value} title={color.label}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition hover:scale-110 ${color.bg} ${
                color.value === "#D43B1F" ? "ring-2 ring-offset-2 ring-red-500" : ""
              } ${isDark ? "ring-offset-[#070303]" : "ring-offset-gray-100"}`}>
              {color.value === "#D43B1F" && <Check className="h-4 w-4 text-white" />}
            </button>
          ))}
        </div>
        <p className={`mt-3 text-xs ${t.textFaint}`}>Hiện tại: Đỏ cam #D43B1F — màu accent sẽ áp dụng cho nút, link và icon chính.</p>
      </div>

      {/* Typography */}
      <div className={`rounded-2xl p-6 ${t.card}`}>
        <div className="mb-5 flex items-center gap-2">
          <Type className={`h-5 w-5 ${isDark ? "text-white/50" : "text-gray-500"}`} />
          <h3 className={`font-semibold ${t.text}`}>Bộ phông chữ</h3>
        </div>
        <div className={`rounded-xl p-4 ${isDark ? "bg-white/[0.04]" : "bg-gray-50"}`}>
          <p className={`text-xs uppercase tracking-widest mb-2 ${t.textFaint}`}>Be Vietnam Pro</p>
          <p className={`text-3xl font-bold leading-tight ${t.text}`}>Việt Web Agency</p>
          <p className={`mt-2 text-sm ${t.textMuted}`}>Thiết kế website đẹp, chuẩn SEO, giao trong 5 ngày từ 189K/tháng.</p>
          <p className={`mt-1 text-xs ${t.textFaint}`}>ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789</p>
        </div>
        <p className={`mt-3 text-xs ${t.textFaint}`}>Be Vietnam Pro được dùng nhất quán trên toàn bộ website và admin.</p>
      </div>

      {/* Animation */}
      <div className={`rounded-2xl p-6 ${t.card}`}>
        <div className="mb-4 flex items-center gap-2">
          <Zap className={`h-5 w-5 ${isDark ? "text-white/50" : "text-gray-500"}`} />
          <h3 className={`font-semibold ${t.text}`}>Hiệu ứng & animation</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Scroll reveal animation", desc: "Fade-in khi section vào viewport", enabled: true },
            { label: "Hero carousel tự động", desc: "Chuyển slide sau mỗi 6 giây", enabled: true },
            { label: "Portfolio scroll marquee", desc: "Dự án cuộn vòng lặp liên tục", enabled: true },
            { label: "Floating card 3D", desc: "Hiệu ứng float nhẹ trên hero", enabled: true },
          ].map((item, i) => (
            <label key={i} className={`flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition ${isDark ? "hover:bg-white/[0.04]" : "hover:bg-gray-50"}`}>
              <div>
                <p className={`text-sm font-medium ${t.text}`}>{item.label}</p>
                <p className={`text-xs ${t.textFaint}`}>{item.desc}</p>
              </div>
              <input type="checkbox" defaultChecked={item.enabled} className="h-4 w-4 accent-red-500" />
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div className={`rounded-2xl p-5 border ${isDark ? "border-dashed border-white/10 bg-transparent" : "border-dashed border-gray-300 bg-transparent"}`}>
        <p className={`text-sm font-medium ${t.textMuted}`}>Đặt lại mặc định</p>
        <p className={`mt-1 text-xs ${t.textFaint}`}>Khôi phục về giao diện tối (dark) và tất cả cài đặt mặc định.</p>
        <button onClick={() => onThemeChange("dark")} className={`mt-3 rounded-xl px-4 py-2 text-xs font-semibold transition ${t.btnGhost}`}>
          Đặt lại ngay
        </button>
      </div>
    </div>
  );
}
