import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Check } from "lucide-react";
import { WEBSITE_MODULES } from "@/features/legacy-core/site-config";
import type { WebsiteModule } from "@/features/legacy-core/site-config";
import type { TC } from "./types";

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY: Omit<WebsiteModule, "id"> = {
  name: "",
  desc: "",
  status: "Nháp",
  updated: "Vừa thêm",
  cmsKey: "",
};

export function SectionManager({ t, isDark }: Props) {
  const [items, setItems] = useState<WebsiteModule[]>(WEBSITE_MODULES);
  const [editItem, setEditItem] = useState<WebsiteModule | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Omit<WebsiteModule, "id">>(EMPTY);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setForm(EMPTY);
    setIsAdding(true);
    setEditItem(null);
  };

  const openEdit = (item: WebsiteModule) => {
    setEditItem(item);
    setForm({ name: item.name, desc: item.desc, status: item.status, updated: item.updated, cmsKey: item.cmsKey, route: item.route });
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditItem(null);
    setIsAdding(false);
  };

  const save = () => {
    if (!form.name.trim()) return;
    if (isAdding) {
      const newItem: WebsiteModule = { ...form, id: `section-${Date.now()}`, updated: "Vừa thêm" };
      setItems((prev) => [...prev, newItem]);
    } else if (editItem) {
      setItems((prev) => prev.map((it) => it.id === editItem.id ? { ...it, ...form, updated: "Vừa sửa" } : it));
    }
    closeModal();
  };

  const toggle = (id: string) => {
    setItems((prev) => prev.map((it) => it.id === id
      ? { ...it, status: it.status === "Đang bật" ? "Nháp" : "Đang bật", updated: "Vừa đổi" }
      : it
    ));
  };

  const confirmDelete = (id: string) => setDeleteId(id);
  const doDelete = () => {
    if (deleteId) setItems((prev) => prev.filter((it) => it.id !== deleteId));
    setDeleteId(null);
  };

  const showModal = isAdding || !!editItem;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Quản lý section</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Bật / tắt các khối nội dung trên website.</p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm section
        </button>
      </div>

      <div className={`rounded-2xl overflow-hidden ${t.card}`}>
        <table className="w-full">
          <thead>
            <tr className={t.tableHead}>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Section</th>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint} hidden md:table-cell`}>Mô tả</th>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Trạng thái</th>
              <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint} hidden sm:table-cell`}>Cập nhật</th>
              <th className={`px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={`transition ${t.tableRow}`}>
                <td className="px-5 py-4">
                  <span className={`font-semibold text-sm ${t.text}`}>{item.name}</span>
                </td>
                <td className={`px-5 py-4 hidden md:table-cell max-w-xs`}>
                  <span className={`text-sm line-clamp-2 ${t.textMuted}`}>{item.desc}</span>
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => toggle(item.id)} className="flex items-center gap-2">
                    {item.status === "Đang bật"
                      ? <ToggleRight className="h-5 w-5 text-emerald-400" />
                      : <ToggleLeft className={`h-5 w-5 ${isDark ? "text-white/30" : "text-gray-300"}`} />}
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${item.status === "Đang bật" ? t.badgeGreen : t.badgeAmber}`}>
                      {item.status}
                    </span>
                  </button>
                </td>
                <td className={`px-5 py-4 hidden sm:table-cell text-sm ${t.textFaint}`}>{item.updated}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(item)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                      <Pencil className="h-4 w-4" />
                    </button>
                    {deleteId === item.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                          <Check className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteId(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40" : "hover:bg-gray-100 text-gray-400"}`}>
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => confirmDelete(item.id)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/30 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm section mới" : "Chỉnh sửa section"}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tên section *</label>
                <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Ví dụ: Hero banner" />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Mô tả</label>
                <textarea value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                  rows={3} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Mô tả ngắn về section này..." />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>CMS Key</label>
                <input value={form.cmsKey} onChange={(e) => setForm((f) => ({ ...f, cmsKey: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="heroSlides, pricing, ..." />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Trạng thái</label>
                <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "Đang bật" | "Nháp" }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                  <option value="Đang bật">Đang bật</option>
                  <option value="Nháp">Nháp</option>
                </select>
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
