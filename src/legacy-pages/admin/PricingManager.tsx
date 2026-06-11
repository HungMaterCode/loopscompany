import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, CheckCircle2 } from "lucide-react";
import { PLANS } from "@/legacy-app/data";
import type { TC } from "./types";

type Plan = (typeof PLANS)[0];

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY_PLAN: Plan = {
  code: "",
  name: "",
  tag: "",
  price: "",
  period: "tháng",
  setupFee: "0đ",
  highlight: false,
  features: [],
  missing: [],
};

export function PricingManager({ t, isDark }: Props) {
  const [plans, setPlans] = useState<Plan[]>(PLANS);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Plan>(EMPTY_PLAN);
  const [featuresText, setFeaturesText] = useState("");
  const [missingText, setMissingText] = useState("");
  const [deleteCode, setDeleteCode] = useState<string | null>(null);

  const openAdd = () => {
    setForm(EMPTY_PLAN);
    setFeaturesText("");
    setMissingText("");
    setIsAdding(true);
    setEditPlan(null);
  };

  const openEdit = (plan: Plan) => {
    setEditPlan(plan);
    setForm({ ...plan });
    setFeaturesText(plan.features.join("\n"));
    setMissingText(plan.missing.join("\n"));
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditPlan(null);
    setIsAdding(false);
  };

  const save = () => {
    if (!form.code.trim() || !form.name.trim()) return;
    const updated: Plan = {
      ...form,
      features: featuresText.split("\n").map((l) => l.trim()).filter(Boolean),
      missing: missingText.split("\n").map((l) => l.trim()).filter(Boolean),
    };
    if (isAdding) {
      setPlans((prev) => [...prev, updated]);
    } else if (editPlan) {
      setPlans((prev) => prev.map((p) => p.code === editPlan.code ? updated : p));
    }
    closeModal();
  };

  const doDelete = () => {
    if (deleteCode) setPlans((prev) => prev.filter((p) => p.code !== deleteCode));
    setDeleteCode(null);
  };

  const showModal = isAdding || !!editPlan;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Bảng giá</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý các gói thuê website W-01 đến W-04.</p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm gói
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
        {plans.map((plan) => (
          <div key={plan.code} className={`relative rounded-2xl p-5 transition ${t.card} ${t.cardHover} ${plan.highlight ? "ring-2 ring-red-500/50" : ""}`}>
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                Phổ biến nhất
              </div>
            )}
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <div className={`text-xs font-bold tracking-widest ${isDark ? "text-red-300/80" : "text-red-600"}`}>{plan.code}</div>
                <div className={`mt-1 font-bold ${t.text}`}>{plan.name}</div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(plan)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                  <Pencil className="h-4 w-4" />
                </button>
                {deleteCode === plan.code ? (
                  <div className="flex gap-1">
                    <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDeleteCode(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40" : "hover:bg-gray-100 text-gray-400"}`}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteCode(plan.code)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/25 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            {plan.tag && (
              <span className={`mb-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.badgeAmber}`}>{plan.tag}</span>
            )}
            <div className={`mb-4 text-2xl font-black tracking-tight ${t.text}`}>
              {plan.price}<span className={`text-sm font-normal ${t.textMuted}`}>đ/{plan.period}</span>
            </div>
            <ul className="space-y-2">
              {plan.features.slice(0, 4).map((f) => (
                <li key={f} className={`flex items-start gap-2 text-xs ${t.textMuted}`}>
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />{f}
                </li>
              ))}
              {plan.features.length > 4 && (
                <li className={`text-xs ${t.textFaint}`}>+{plan.features.length - 4} tính năng khác...</li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm gói mới" : `Chỉnh sửa ${editPlan?.code}`}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Mã gói *</label>
                  <input value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="W-01" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tên gói *</label>
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="GÓI THUÊ 1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Nhãn gói</label>
                  <input value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="Khởi đầu" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Giá (VNĐ)</label>
                  <input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="189.000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Chu kỳ</label>
                  <select value={form.period} onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                    <option value="tháng">tháng</option>
                    <option value="năm">năm</option>
                  </select>
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Phí setup</label>
                  <input value={form.setupFee} onChange={(e) => setForm((f) => ({ ...f, setupFee: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="0đ" />
                </div>
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tính năng (mỗi dòng 1 tính năng)</label>
                <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)}
                  rows={5} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder={"Landing Page tùy chỉnh\nSSL bảo mật\nForm liên hệ Zalo"} />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tính năng chưa có (mỗi dòng 1 mục)</label>
                <textarea value={missingText} onChange={(e) => setMissingText(e.target.value)}
                  rows={3} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder={"SEO nâng cao\nEmail doanh nghiệp"} />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.highlight} onChange={(e) => setForm((f) => ({ ...f, highlight: e.target.checked }))}
                  className="h-4 w-4 accent-red-500" />
                <div>
                  <span className={`text-sm font-medium ${t.text}`}>Đánh dấu nổi bật</span>
                  <p className={`text-xs ${t.textFaint}`}>Hiện nhãn "Phổ biến nhất" và viền đỏ</p>
                </div>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btnGhost}`}>Hủy</button>
              <button onClick={save} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
                {isAdding ? "Thêm mới" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
