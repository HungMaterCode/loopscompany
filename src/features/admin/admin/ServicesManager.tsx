import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { SERVICES } from "@/features/legacy-core/data";
import type { TC } from "./types";

interface ServiceItem {
  name: string;
  desc: string;
  tag: string;
  price: string;
}

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY: ServiceItem = { name: "", desc: "", tag: "", price: "" };

export function ServicesManager({ t, isDark }: Props) {
  const [items, setItems] = useState<ServiceItem[]>(
    SERVICES.map((s) => ({ name: s.name, desc: s.desc, tag: s.tag, price: s.price }))
  );
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<ServiceItem>(EMPTY);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const openAdd = () => {
    setForm(EMPTY);
    setIsAdding(true);
    setEditIdx(null);
  };

  const openEdit = (idx: number) => {
    setEditIdx(idx);
    setForm({ ...items[idx] });
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditIdx(null);
    setIsAdding(false);
  };

  const save = () => {
    if (!form.name.trim()) return;
    if (isAdding) {
      setItems((prev) => [...prev, { ...form }]);
    } else if (editIdx !== null) {
      setItems((prev) => prev.map((it, i) => i === editIdx ? { ...form } : it));
    }
    closeModal();
  };

  const doDelete = () => {
    if (deleteIdx !== null) setItems((prev) => prev.filter((_, i) => i !== deleteIdx));
    setDeleteIdx(null);
  };

  const showModal = isAdding || editIdx !== null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Dịch vụ</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý danh sách dịch vụ hiển thị trên website.</p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm dịch vụ
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className={`rounded-2xl p-5 transition ${t.card} ${t.cardHover}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className={`font-bold ${t.text}`}>{item.name}</h3>
                  {item.tag && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      item.tag === "Hot" ? "bg-red-500/15 text-red-400" :
                      item.tag === "Phổ biến" ? "bg-blue-500/15 text-blue-400" :
                      item.tag === "Miễn phí" ? "bg-emerald-500/15 text-emerald-400" :
                      t.badge
                    }`}>{item.tag}</span>
                  )}
                  <span className={`ml-auto rounded-full px-3 py-1 text-xs font-bold ${isDark ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-700"}`}>
                    {item.price}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${t.textMuted}`}>{item.desc}</p>
              </div>
              <div className="flex shrink-0 gap-1.5">
                <button onClick={() => openEdit(idx)} className={`rounded-lg p-2 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                  <Pencil className="h-4 w-4" />
                </button>
                {deleteIdx === idx ? (
                  <div className="flex gap-1">
                    <button onClick={doDelete} className="rounded-lg p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDeleteIdx(null)} className={`rounded-lg p-2 transition ${isDark ? "hover:bg-white/10 text-white/40" : "hover:bg-gray-100 text-gray-400"}`}>
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setDeleteIdx(idx)} className={`rounded-lg p-2 transition ${isDark ? "hover:bg-red-500/15 text-white/25 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm dịch vụ mới" : "Chỉnh sửa dịch vụ"}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tên dịch vụ *</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Landing Page" />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Mô tả</label>
                <textarea value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                  rows={3} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Mô tả dịch vụ, lợi ích cho khách hàng..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Nhãn (tag)</label>
                  <input value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Hot / Phổ biến / Miễn phí" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Giá</label>
                  <input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Từ 189K/tháng" />
                </div>
              </div>
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
