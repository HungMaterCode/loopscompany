import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Image } from "lucide-react";
import { PORTFOLIO } from "@/legacy-app/data";
import type { TC } from "./types";

interface PortfolioItem {
  name: string;
  type: string;
  src: string;
}

interface Props {
  t: TC;
  isDark: boolean;
}

const TYPES = ["Landing Page", "Cửa hàng online", "Doanh nghiệp", "Nhà hàng & F&B", "Spa & Làm đẹp", "Giáo dục", "Y tế"];

const toItems = (): PortfolioItem[] =>
  PORTFOLIO.map((p) => ({ name: p.name, type: p.type, src: "" }));

export function PortfolioManager({ t, isDark }: Props) {
  const [items, setItems] = useState<PortfolioItem[]>(toItems());
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<PortfolioItem>({ name: "", type: TYPES[0], src: "" });
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const openAdd = () => {
    setForm({ name: "", type: TYPES[0], src: "" });
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
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Dự án mẫu</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý danh mục các dự án website đã triển khai.</p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm dự án
        </button>
      </div>

      <div className={`rounded-2xl overflow-hidden ${t.card}`}>
        <table className="w-full">
          <thead>
            <tr className={t.tableHead}>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>#</th>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Tên dự án</th>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint} hidden sm:table-cell`}>Loại</th>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint} hidden md:table-cell`}>Hình ảnh</th>
              <th className={`px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className={`transition ${t.tableRow}`}>
                <td className={`px-5 py-4 text-sm font-mono ${t.textFaint}`}>{String(idx + 1).padStart(2, "0")}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${isDark ? "bg-white/[0.06]" : "bg-gray-100"}`}>
                      <Image className={`h-4 w-4 ${t.textFaint}`} />
                    </div>
                    <span className={`font-semibold text-sm ${t.text}`}>{item.name}</span>
                  </div>
                </td>
                <td className={`px-5 py-4 hidden sm:table-cell`}>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${t.badge}`}>{item.type}</span>
                </td>
                <td className={`px-5 py-4 hidden md:table-cell text-sm ${t.textFaint}`}>
                  {item.src ? (
                    <a href={item.src} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline truncate max-w-[140px] block">
                      {item.src}
                    </a>
                  ) : (
                    <span className={t.textFaint}>—</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(idx)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    {deleteIdx === idx ? (
                      <div className="flex gap-1">
                        <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteIdx(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40" : "hover:bg-gray-100 text-gray-400"}`}>
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteIdx(idx)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/25 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm dự án mới" : "Chỉnh sửa dự án"}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tên dự án *</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Spa Ngọc Châu Anh" />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Loại dự án</label>
                <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                  {TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>URL hình ảnh</label>
                <input value={form.src} onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="https://example.com/image.jpg" />
                <p className={`mt-1 text-xs ${t.textFaint}`}>URL ảnh preview cho dự án này (để trống nếu chưa có)</p>
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
