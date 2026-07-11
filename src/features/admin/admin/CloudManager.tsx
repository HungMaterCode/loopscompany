import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, Loader2, Cloud, Eye, EyeOff } from "lucide-react";
import type { TC } from "./types";

interface CloudData {
  id?: number;
  label: string;
  price: number;
  price1Year: number;
  price3Years: number;
  order: number;
  active: boolean;
}

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY_CLOUD: CloudData = {
  label: "",
  price: 0,
  price1Year: 0,
  price3Years: 0,
  order: 0,
  active: true,
};

export function CloudManager({ t, isDark }: Props) {
  const [clouds, setClouds] = useState<CloudData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClouds = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/clouds");
      if (!res.ok) throw new Error("Failed to fetch cloud packages");
      const data = await res.json();
      setClouds(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Không thể tải danh sách gói hạ tầng cloud.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClouds();
  }, []);

  const [priceInput, setPriceInput] = useState("0");
  const [price1YearInput, setPrice1YearInput] = useState("0");
  const [price3YearsInput, setPrice3YearsInput] = useState("0");
  const [orderInput, setOrderInput] = useState("0");
  const [editCloud, setEditCloud] = useState<CloudData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<CloudData>(EMPTY_CLOUD);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => {
    const nextNum = clouds.length + 1;
    setForm({
      ...EMPTY_CLOUD,
      order: nextNum,
    });
    setPriceInput("");
    setPrice1YearInput("");
    setPrice3YearsInput("");
    setOrderInput(String(nextNum));
    setIsAdding(true);
    setEditCloud(null);
  };

  const openEdit = (cloud: CloudData) => {
    setEditCloud(cloud);
    setForm({ ...cloud });
    setPriceInput(cloud.price.toString());
    setPrice1YearInput(cloud.price1Year.toString());
    setPrice3YearsInput(cloud.price3Years.toString());
    setOrderInput(cloud.order.toString());
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditCloud(null);
    setIsAdding(false);
  };

  const save = async () => {
    const trimmedLabel = form.label.trim();
    if (!trimmedLabel) {
      alert("Tên gói không được để trống!");
      return;
    }

    const updated: CloudData = {
      ...form,
      label: trimmedLabel,
      price: parseInt(priceInput) || 0,
      price1Year: parseInt(price1YearInput) || 0,
      price3Years: parseInt(price3YearsInput) || 0,
      order: parseInt(orderInput) || 0,
    };

    try {
      const url = "/api/clouds";
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

      await fetchClouds();
      closeModal();
    } catch (err: any) {
      console.error(err);
      alert("Lưu gói hạ tầng cloud thất bại: " + err.message);
    }
  };

  const doDelete = async () => {
    if (deleteId === null) return;
    try {
      const res = await fetch(`/api/clouds?id=${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Delete failed");
      }
      await fetchClouds();
    } catch (err: any) {
      console.error(err);
      alert("Xóa gói hạ tầng cloud thất bại: " + err.message);
    } finally {
      setDeleteId(null);
    }
  };

  const toggleStatus = async (cloud: CloudData) => {
    const updated = {
      ...cloud,
      active: !cloud.active,
    };
    try {
      const res = await fetch("/api/clouds", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchClouds();
    } catch (err) {
      console.error(err);
      alert("Cập nhật trạng thái thất bại.");
    }
  };

  const showModal = isAdding || !!editCloud;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Gói hạ tầng cloud</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý các gói máy chủ Cloud VPS/Hạ tầng cloud cộng thêm trên trang Báo giá.</p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm gói cloud
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className={`h-8 w-8 animate-spin ${isDark ? "text-white/40" : "text-gray-400"}`} />
          <span className={t.textMuted}>Đang tải danh sách gói hạ tầng cloud...</span>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-500/10 rounded-2xl border border-red-500/20 p-5">
          <p className="text-red-400 font-semibold mb-2">{error}</p>
          <button onClick={fetchClouds} className={`text-sm underline ${t.text}`}>Thử tải lại</button>
        </div>
      ) : clouds.length === 0 ? (
        <div className={`text-center py-20 rounded-2xl border border-dashed p-6 ${isDark ? "border-white/10" : "border-gray-200"}`}>
          <p className={t.textMuted}>Chưa có gói cloud nào được tạo.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {clouds.map((cloud) => (
            <div key={cloud.id} className={`relative rounded-2xl p-5 transition ${t.card} ${t.cardHover} ${!cloud.active ? "opacity-70" : ""}`}>
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl bg-[#C8A261]/10 text-[#C8A261]`}>
                    <Cloud size={18} />
                  </div>
                  <div>
                    <div className={`text-xs font-bold tracking-widest ${isDark ? "text-[#C8A261]" : "text-[#9c783c]"}`}>Mã #{cloud.id}</div>
                    <div className={`mt-0.5 font-bold ${t.text}`}>{cloud.label}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => toggleStatus(cloud)} title={cloud.active ? "Tạm ẩn" : "Kích hoạt"}
                    className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                    {cloud.active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button onClick={() => openEdit(cloud)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  {deleteId === cloud.id ? (
                    <div className="flex gap-1">
                      <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40" : "hover:bg-gray-100 text-gray-400"}`}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteId(cloud.id!)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/25 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-4 space-y-2 border-t border-white/[0.05] pt-3">
                <div className="flex justify-between items-center text-xs">
                  <span className={t.textMuted}>Thanh toán theo tháng:</span>
                  <span className={`font-bold ${t.text}`}>{cloud.price.toLocaleString("vi-VN")}đ/tháng</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={t.textMuted}>Đăng ký 1 năm:</span>
                  <span className={`font-bold text-[#C8A261]`}>{cloud.price1Year.toLocaleString("vi-VN")}đ/tháng</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={t.textMuted}>Đăng ký 3 năm:</span>
                  <span className="font-bold text-emerald-400">{cloud.price3Years.toLocaleString("vi-VN")}đ/tháng</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-white/[0.05] pt-2 text-xs">
                <div>
                  <span className={t.textFaint}>Thứ tự:</span> <span className={`font-bold ${t.text}`}>{cloud.order}</span>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${cloud.active ? t.badgeGreen : t.badge}`}>
                  {cloud.active ? "Đang bật" : "Đang ẩn"}
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
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm gói cloud mới" : `Chỉnh sửa gói #${editCloud?.id}`}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tên gói hạ tầng cloud *</label>
                <input value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="Cloud Cơ bản" />
              </div>
              
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Giá theo tháng (VNĐ/tháng) *</label>
                <input type="text" value={priceInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      setPriceInput(val);
                    }
                  }}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="521000" />
              </div>

              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Giá đăng ký 1 năm (VNĐ/tháng) *</label>
                <input type="text" value={price1YearInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      setPrice1YearInput(val);
                    }
                  }}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="430000" />
              </div>

              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Giá đăng ký 3 năm (VNĐ/tháng) *</label>
                <input type="text" value={price3YearsInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      setPrice3YearsInput(val);
                    }
                  }}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="325000" />
              </div>

              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Thứ tự hiển thị *</label>
                <input type="text" value={orderInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      setOrderInput(val);
                    }
                  }}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="1" />
              </div>

              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  className="h-4 w-4 accent-[#C8A261]" />
                <div>
                  <span className={`text-sm font-medium ${t.text}`}>Kích hoạt hiển thị</span>
                  <p className={`text-xs ${t.textFaint}`}>Cho phép hiển thị gói hạ tầng cloud này trên trang Báo giá</p>
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
