import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, Loader2, Server, Eye, EyeOff } from "lucide-react";
import type { TC } from "./types";

interface HostingData {
  id: string;
  label: string;
  price: number;
  order: number;
  active: boolean;
}

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY_HOSTING: HostingData = {
  id: "",
  label: "",
  price: 0,
  order: 0,
  active: true,
};

export function HostingManager({ t, isDark }: Props) {
  const [hostings, setHostings] = useState<HostingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHostings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/hostings");
      if (!res.ok) throw new Error("Failed to fetch hostings");
      const data = await res.json();
      setHostings(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Không thể tải danh sách gói hosting.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHostings();
  }, []);

  const [priceInput, setPriceInput] = useState("0");
  const [orderInput, setOrderInput] = useState("0");
  const [editHosting, setEditHosting] = useState<HostingData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<HostingData>(EMPTY_HOSTING);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    // Generate next id based on existing count
    const nextNum = hostings.length + 1;
    const nextId = `ht_${String(nextNum).padStart(2, '0')}`;
    
    setForm({
      ...EMPTY_HOSTING,
      id: nextId,
      order: nextNum,
    });
    setPriceInput("");
    setOrderInput(String(nextNum));
    setIsAdding(true);
    setEditHosting(null);
  };

  const openEdit = (hosting: HostingData) => {
    setEditHosting(hosting);
    setForm({ ...hosting });
    setPriceInput(hosting.price.toString());
    setOrderInput(hosting.order.toString());
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditHosting(null);
    setIsAdding(false);
  };

  const save = async () => {
    const trimmedLabel = form.label.trim();
    if (!trimmedLabel) {
      alert("Tên gói không được để trống!");
      return;
    }
    if (!form.id.trim()) {
      alert("ID gói không được để trống!");
      return;
    }

    // Check if ID already exists on ADD
    if (isAdding && hostings.some((h) => h.id.toLowerCase() === form.id.trim().toLowerCase())) {
      alert(`Mã gói "${form.id}" đã tồn tại! Vui lòng dùng mã khác.`);
      return;
    }

    const updated: HostingData = {
      ...form,
      label: trimmedLabel,
      price: parseInt(priceInput) || 0,
      order: parseInt(orderInput) || 0,
    };

    try {
      const url = "/api/hostings";
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

      await fetchHostings();
      closeModal();
    } catch (err: any) {
      console.error(err);
      alert("Lưu gói hosting thất bại: " + err.message);
    }
  };

  const doDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/hostings?id=${encodeURIComponent(deleteId)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Delete failed");
      }
      await fetchHostings();
    } catch (err: any) {
      console.error(err);
      alert("Xóa gói hosting thất bại: " + err.message);
    } finally {
      setDeleteId(null);
    }
  };

  const toggleStatus = async (hosting: HostingData) => {
    const updated = {
      ...hosting,
      active: !hosting.active,
    };
    try {
      const res = await fetch("/api/hostings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchHostings();
    } catch (err) {
      console.error(err);
      alert("Cập nhật trạng thái thất bại.");
    }
  };

  const showModal = isAdding || !!editHosting;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Gói hosting</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý các gói dung lượng Hosting nâng cấp kèm theo khi mua hoặc thuê website.</p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm gói hosting
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className={`h-8 w-8 animate-spin ${isDark ? "text-white/40" : "text-gray-400"}`} />
          <span className={t.textMuted}>Đang tải danh sách gói hosting...</span>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-500/10 rounded-2xl border border-red-500/20 p-5">
          <p className="text-red-400 font-semibold mb-2">{error}</p>
          <button onClick={fetchHostings} className={`text-sm underline ${t.text}`}>Thử tải lại</button>
        </div>
      ) : hostings.length === 0 ? (
        <div className={`text-center py-20 rounded-2xl border border-dashed p-6 ${isDark ? "border-white/10" : "border-gray-200"}`}>
          <p className={t.textMuted}>Chưa có gói hosting nào được tạo.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {hostings.map((hosting) => (
            <div key={hosting.id} className={`relative rounded-2xl p-5 transition ${t.card} ${t.cardHover} ${!hosting.active ? "opacity-70" : ""}`}>
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl bg-[#C8A261]/10 text-[#C8A261]`}>
                    <Server size={18} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold tracking-widest ${isDark ? "text-[#C8A261]" : "text-[#9c783c]"}`}>{hosting.id}</div>
                    <div className={`mt-0.5 font-bold ${t.text}`}>{hosting.label}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleStatus(hosting)} title={hosting.active ? "Tạm ẩn" : "Kích hoạt"}
                    className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                    {hosting.active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => openEdit(hosting)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  {deleteId === hosting.id ? (
                    <div className="flex gap-1">
                      <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40" : "hover:bg-gray-100 text-gray-400"}`}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteId(hosting.id)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/25 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${t.textFaint}`}>Chi phí nâng cấp</span>
                  <div className={`text-xl font-black tracking-tight ${t.text}`}>
                    {hosting.price > 0 ? (
                      <>
                        +{hosting.price.toLocaleString("vi-VN")}<span className="text-xs font-normal text-muted-foreground ml-0.5">đ</span>
                      </>
                    ) : (
                      <span className="text-emerald-400 text-base font-bold">Kèm theo gói</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${t.textFaint}`}>Thứ tự</span>
                  <div className={`text-sm font-semibold ${t.text}`}>{hosting.order}</div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2">
                <span className={`text-xs ${t.textFaint}`}>Trạng thái</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${hosting.active ? t.badgeGreen : t.badge}`}>
                  {hosting.active ? "Đang bật" : "Đang ẩn"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm gói hosting mới" : `Chỉnh sửa ${editHosting?.id}`}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Mã gói (ID) *</label>
                <input value={form.id} onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                  disabled={!isAdding}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} disabled:opacity-50`} placeholder="ht_01" />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tên gói (Dung lượng) *</label>
                <input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="5GB NVMe" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Cộng thêm (VNĐ) *</label>
                  <input
                    type="text"
                    value={priceInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d+$/.test(val)) {
                        setPriceInput(val);
                        setForm((f) => ({ ...f, price: parseInt(val) || 0 }));
                      }
                    }}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="500000"
                  />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Thứ tự hiển thị *</label>
                  <input
                    type="text"
                    value={orderInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d+$/.test(val)) {
                        setOrderInput(val);
                        setForm((f) => ({ ...f, order: parseInt(val) || 0 }));
                      }
                    }}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="1"
                  />
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  className="h-4 w-4 accent-[#C8A261]" />
                <div>
                  <span className={`text-sm font-medium ${t.text}`}>Kích hoạt hiển thị</span>
                  <p className={`text-xs ${t.textFaint}`}>Cho phép hiển thị gói nâng cấp này trên trang Báo giá</p>
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
