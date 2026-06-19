import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, X, Check, Loader2, Upload, Star } from "lucide-react";
import type { TC } from "./types";

interface ServiceItem {
  id?: string;
  label: string;
  sub: string;
  img: string;
  tags: string[];
  size: string;
  glassBg?: string | null;
  link: string;
  order: number;
  active: boolean;
}

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY: ServiceItem = {
  label: "",
  sub: "",
  img: "",
  tags: [],
  size: "small",
  glassBg: "",
  link: "/coming-soon",
  order: 0,
  active: true,
};

export function ServicesManager({ t, isDark }: Props) {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<ServiceItem>(EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [orderInput, setOrderInput] = useState("0");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setItems(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Không thể tải danh sách dịch vụ từ CSDL.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAdd = () => {
    setForm(EMPTY);
    setTagsInput("");
    setOrderInput("0");
    setIsAdding(true);
    setEditIdx(null);
  };

  const openEdit = (idx: number) => {
    setEditIdx(idx);
    const svc = items[idx];
    setForm({ ...svc });
    setTagsInput(svc.tags.join(", "));
    setOrderInput(svc.order.toString());
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditIdx(null);
    setIsAdding(false);
  };

  const save = async () => {
    if (!form.label.trim()) return;
    const tags = tagsInput.split(",").map((s) => s.trim()).filter(Boolean);

    const updated: ServiceItem = {
      ...form,
      order: parseInt(orderInput) || 0,
      tags,
    };

    try {
      const url = "/api/services";
      const method = isAdding ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Save failed");
      }

      await fetchServices();
      closeModal();
    } catch (err: any) {
      console.error(err);
      alert("Lưu dịch vụ thất bại: " + err.message);
    }
  };

  const doDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/services?id=${encodeURIComponent(deleteId)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Delete failed");
      }
      await fetchServices();
    } catch (err: any) {
      console.error(err);
      alert("Xóa dịch vụ thất bại: " + err.message);
    } finally {
      setDeleteId(null);
    }
  };

  const showModal = isAdding || editIdx !== null;

  const UploadButton = ({ onUploadComplete }: { onUploadComplete: (url: string) => void }) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        onUploadComplete(data.url);
      } catch (err) {
        console.error(err);
        alert("Tải ảnh lên thất bại, vui lòng kiểm tra cấu hình Cloudinary!");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    return (
      <div className="shrink-0">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btnGhost} disabled:opacity-50 cursor-pointer`}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Tải ảnh
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Dịch vụ</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý danh sách dịch vụ hiển thị trên website.</p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm dịch vụ
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className={`h-8 w-8 animate-spin ${isDark ? "text-white/40" : "text-gray-400"}`} />
          <span className={t.textMuted}>Đang tải danh sách dịch vụ...</span>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-500/10 rounded-2xl border border-red-500/20 p-5">
          <p className="text-red-400 font-semibold mb-2">{error}</p>
          <button onClick={fetchServices} className={`text-sm underline ${t.text}`}>Thử tải lại</button>
        </div>
      ) : items.length === 0 ? (
        <div className={`text-center py-20 rounded-2xl border border-dashed p-6 ${isDark ? "border-white/10" : "border-gray-200"}`}>
          <p className={t.textMuted}>Chưa có dịch vụ nào.</p>
        </div>
      ) : (
        /* List in scrollable container */
        <div style={{ maxHeight: "680px", overflowY: "auto", paddingRight: "6px" }} className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id} className={`rounded-2xl p-5 transition ${t.card} ${t.cardHover}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-xs font-bold ${isDark ? "text-[#C8A261]" : "text-[#b28c4b]"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className={`font-bold ${t.text}`}>{item.label}</h3>
                    {item.size === "large" && (
                      <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/15 text-indigo-400">Rộng</span>
                    )}
                    {item.active ? (
                      <span className="rounded-full px-2.5 py-0.5 text-xs bg-emerald-500/10 text-emerald-400">Hiển thị</span>
                    ) : (
                      <span className="rounded-full px-2.5 py-0.5 text-xs bg-red-500/10 text-red-400">Ẩn</span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${t.textMuted} mb-3`}>{item.sub}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className={`rounded-full px-2.5 py-0.5 text-xs ${t.badge}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 gap-1.5">
                  <button onClick={() => openEdit(idx)} className={`rounded-lg p-2 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  {deleteId === item.id ? (
                    <div className="flex gap-1">
                      <button onClick={doDelete} className="rounded-lg p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(null)} className={`rounded-lg p-2 transition ${isDark ? "hover:bg-white/10 text-white/40" : "hover:bg-gray-100 text-gray-400"}`}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteId(item.id || null)} className={`rounded-lg p-2 transition ${isDark ? "hover:bg-red-500/15 text-white/25 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-black/60 backdrop-blur-sm">
          <div className={`my-8 w-full max-w-xl rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm dịch vụ mới" : "Chỉnh sửa dịch vụ"}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tên dịch vụ *</label>
                <input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Tạo Website" />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Mô tả *</label>
                <textarea value={form.sub} onChange={(e) => setForm((f) => ({ ...f, sub: e.target.value }))}
                  rows={3} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Mô tả dịch vụ hiển thị trên trang chủ..." />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ảnh nền (URL)</label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1 flex flex-col gap-2">
                    <input value={form.img} onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                      placeholder="https://example.com/bg.jpg" />
                    {form.img && (
                      <div className="h-16 rounded-xl overflow-hidden border border-gray-800 relative bg-gray-950">
                        <img src={form.img} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    )}
                  </div>
                  <UploadButton onUploadComplete={(url) => setForm((f) => ({ ...f, img: url }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Kích thước hiển thị</label>
                  <select value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
                    className={`w-full rounded-xl px-3 py-2.5 text-sm transition cursor-pointer ${t.input} bg-transparent`}>
                    <option value="small" className={isDark ? "bg-[#18181b] text-white" : "bg-white text-black"}>1 Cột (Nhỏ)</option>
                    <option value="large" className={isDark ? "bg-[#18181b] text-white" : "bg-white text-black"}>2 Cột (Rộng)</option>
                  </select>
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Đường dẫn chuyển tiếp (Link)</label>
                  <input value={form.link} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="/bao-gia" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Thứ tự sắp xếp</label>
                  <input type="text" value={orderInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d+$/.test(val)) {
                        setOrderInput(val);
                        setForm((f) => ({ ...f, order: parseInt(val) || 0 }));
                      }
                    }}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="0" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Màu nền mờ (Glass Overlay)</label>
                  <input value={form.glassBg || ""} onChange={(e) => setForm((f) => ({ ...f, glassBg: e.target.value || null }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="rgba(15, 32, 67, 0.45)" />
                </div>
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Các tag nhỏ (phân tách bằng dấu phẩy)</label>
                <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Landing Page, Web App, E-commerce" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  className="h-4 w-4 accent-[#C8A261]" />
                <div>
                  <span className={`text-sm font-medium ${t.text}`}>Kích hoạt hiển thị</span>
                  <p className={`text-xs ${t.textMuted}`}>Cho phép hiển thị dịch vụ này trên trang chủ</p>
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
