import { useState, useRef, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, CheckCircle2, Laptop, Upload, Loader2, Zap, ShoppingBag, Building2, Wand2, Globe, ChevronDown } from "lucide-react";
import * as Lucide from "lucide-react";
import type { TC } from "./types";

interface WebPageData {
  id?: string;
  code: string;
  name: string;
  tag: string;
  subtitle: string;
  price: number;
  cover: string;
  icon: string;
  highlight: boolean;
  features: string[];
  missing: string[];
  order: number;
  active: boolean;
  isRental?: boolean;
}

interface Props {
  t: TC;
  isDark: boolean;
}

export function DynamicIcon({ name, size = 16, className = "", color = "currentColor" }: { name: string; size?: number; className?: string; color?: string }) {
  if (!name) return null;
  
  if (name.startsWith("http://") || name.startsWith("https://") || name.startsWith("/")) {
    return (
      <img src={name} alt="" className={className} style={{ width: size, height: size, objectFit: "contain" }} />
    );
  }

  const IconComponent = (Lucide as any)[name];
  if (IconComponent) {
    return <IconComponent size={size} className={className} color={color} />;
  }

  return <Globe size={size} className={className} color={color} />;
}

const INITIAL_PAGES: WebPageData[] = [
  {
    code: "W-01",
    name: "Landing Page",
    tag: "Khởi đầu",
    subtitle: "Trang đích chuyển đổi cao",
    price: 3890000,
    cover: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    icon: "Zap",
    highlight: false,
    features: ["1 trang đích tối ưu CRO", "Form liên hệ + Zalo OA tích hợp", "Responsive hoàn hảo mọi thiết bị", "SEO cơ bản On-page", "Tên miền phụ miễn phí", "Băng thông không giới hạn"],
    missing: ["SSL bảo mật cao cấp", "Email doanh nghiệp", "Blog & nội dung"],
    order: 1,
    active: true,
  },
  {
    code: "W-02",
    name: "Bán Hàng Online",
    tag: "Tiêu chuẩn",
    subtitle: "Cửa hàng online đầy đủ tính năng",
    price: 6890000,
    cover: "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    icon: "ShoppingBag",
    highlight: false,
    features: ["Danh mục sản phẩm & giỏ hàng", "Quản lý đơn hàng tự động", "Thanh toán online đa cổng", "SSL bảo mật miễn phí", "Tên miền riêng .com/.vn", "Hỗ trợ ưu tiên"],
    missing: ["SEO nâng cao", "Email doanh nghiệp"],
    order: 2,
    active: true,
  },
  {
    code: "W-03",
    name: "Doanh Nghiệp",
    tag: "Phổ biến nhất",
    subtitle: "Website tổ chức chuyên nghiệp",
    price: 9890000,
    cover: "https://images.unsplash.com/photo-1766330977451-de1b64b5e641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    icon: "Building2",
    highlight: true,
    features: ["Đa trang + Blog tích hợp", "Thiết kế premium cao cấp", "SEO nâng cao & Core Web Vitals", "Google Analytics & Heatmap", "Tên miền + Email doanh nghiệp", "Hỗ trợ VIP 24/7", "Sao lưu dữ liệu hàng tuần"],
    missing: [],
    order: 3,
    active: true,
  },
  {
    code: "W-04",
    name: "Theo Yêu Cầu",
    tag: "Enterprise",
    subtitle: "Giải pháp tùy chỉnh độc quyền",
    price: 12890000,
    cover: "https://images.unsplash.com/photo-1709486511766-76bdd8b51713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    icon: "Wand2",
    highlight: false,
    features: ["Thiết kế UI/UX độc quyền 100%", "Tích hợp hệ thống CRM/ERP", "Bảo mật nâng cao enterprise", "Báo cáo thống kê hàng tháng", "Hosting VIP + CDN toàn cầu", "Hotline hỗ trợ riêng 24/7", "Cập nhật nội dung không giới hạn"],
    missing: [],
    order: 4,
    active: true,
  },
];

const EMPTY_PAGE: WebPageData = {
  code: "",
  name: "",
  tag: "",
  subtitle: "",
  price: 0,
  cover: "",
  icon: "Zap",
  highlight: false,
  features: [],
  missing: [],
  order: 0,
  active: true,
  isRental: false,
};

export function WebPageManager({ t, isDark }: Props) {
  const [pages, setPages] = useState<WebPageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"mua" | "thue">("mua");

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/webpages");
      if (!res.ok) throw new Error("Failed to fetch webpages");
      const data = await res.json();
      setPages(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Không thể tải danh sách gói thiết kế.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

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
          Tải ảnh lên
        </button>
      </div>
    );
  };

  const [showIconDropdown, setShowIconDropdown] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const iconDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iconDropdownRef.current && !iconDropdownRef.current.contains(event.target as Node)) {
        setShowIconDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!showIconDropdown) {
      setIconSearch("");
    }
  }, [showIconDropdown]);

  const [priceInput, setPriceInput] = useState("0");
  const [orderInput, setOrderInput] = useState("0");

  const [editPage, setEditPage] = useState<WebPageData | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<WebPageData>(EMPTY_PAGE);
  const [featuresText, setFeaturesText] = useState("");
  const [missingText, setMissingText] = useState("");
  const [deleteCode, setDeleteCode] = useState<string | null>(null);

  const openAdd = () => {
    setForm({
      ...EMPTY_PAGE,
      isRental: activeTab === "thue",
    });
    setFeaturesText("");
    setMissingText("");
    setPriceInput("");
    setOrderInput("0");
    setIsAdding(true);
    setEditPage(null);
  };

  const openEdit = (page: WebPageData) => {
    setEditPage(page);
    setForm({ ...page });
    setFeaturesText(page.features.join("\n"));
    setMissingText(page.missing.join("\n"));
    setPriceInput(page.price.toString());
    setOrderInput(page.order.toString());
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditPage(null);
    setIsAdding(false);
  };

  const save = async () => {
    const trimmedCode = form.code.trim();
    if (!trimmedCode || !form.name.trim()) return;

    // Check if code already exists
    const codeExists = pages.some(
      (p) => p.code.toLowerCase() === trimmedCode.toLowerCase() && (isAdding || p.id !== editPage?.id)
    );
    if (codeExists) {
      alert(`Mã gói "${trimmedCode}" đã tồn tại! Vui lòng dùng mã gói khác.`);
      return;
    }

    const updated: WebPageData = {
      ...form,
      code: trimmedCode,
      price: parseInt(priceInput) || 0,
      order: parseInt(orderInput) || 0,
      features: featuresText.split("\n").map((l) => l.trim()).filter(Boolean),
      missing: missingText.split("\n").map((l) => l.trim()).filter(Boolean),
    };

    try {
      const url = "/api/webpages";
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

      await fetchPages();
      closeModal();
    } catch (err: any) {
      console.error(err);
      alert("Lưu gói thiết kế thất bại: " + err.message);
    }
  };

  const doDelete = async () => {
    if (!deleteCode) return;
    try {
      const res = await fetch(`/api/webpages?code=${encodeURIComponent(deleteCode)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Delete failed");
      }
      await fetchPages();
    } catch (err: any) {
      console.error(err);
      alert("Xóa gói thiết kế thất bại: " + err.message);
    } finally {
      setDeleteCode(null);
    }
  };

  const showModal = isAdding || !!editPage;
  const filteredPages = pages.filter((page) => activeTab === "thue" ? !!page.isRental : !page.isRental);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Gói web</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>
            {activeTab === "mua" 
              ? "Quản lý các gói mua đứt thiết kế website bán hàng, doanh nghiệp."
              : "Quản lý các gói cho thuê website thanh toán hàng tháng."}
          </p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm gói thiết kế
        </button>
      </div>

      {/* Tab Switcher */}
      <div className={`flex border-b ${isDark ? "border-white/10" : "border-gray-200"}`}>
        <button
          onClick={() => setActiveTab("mua")}
          className={`px-5 py-3 text-sm font-semibold transition border-b-2 -mb-[2px] cursor-pointer ${
            activeTab === "mua"
              ? "border-[#C8A261] text-[#C8A261]"
              : `${isDark ? "border-transparent text-white/40 hover:text-white" : "border-transparent text-gray-500 hover:text-gray-900"}`
          }`}
        >
          Gói mua website
        </button>
        <button
          onClick={() => setActiveTab("thue")}
          className={`px-5 py-3 text-sm font-semibold transition border-b-2 -mb-[2px] cursor-pointer ${
            activeTab === "thue"
              ? "border-[#C8A261] text-[#C8A261]"
              : `${isDark ? "border-transparent text-white/40 hover:text-white" : "border-transparent text-gray-500 hover:text-gray-900"}`
          }`}
        >
          Gói thuê website
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className={`h-8 w-8 animate-spin ${isDark ? "text-white/40" : "text-gray-400"}`} />
          <span className={t.textMuted}>Đang tải danh sách gói thiết kế...</span>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-500/10 rounded-2xl border border-red-500/20 p-5">
          <p className="text-red-400 font-semibold mb-2">{error}</p>
          <button onClick={fetchPages} className={`text-sm underline ${t.text}`}>Thử tải lại</button>
        </div>
      ) : filteredPages.length === 0 ? (
        <div className={`text-center py-20 rounded-2xl border border-dashed p-6 ${isDark ? "border-white/10" : "border-gray-200"}`}>
          <p className={t.textMuted}>Chưa có gói thiết kế nào trong danh sách này.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
          {filteredPages.map((page) => (
            <div key={page.code} className={`relative rounded-2xl p-5 transition ${t.card} ${t.cardHover} ${page.highlight ? "ring-2 ring-[#C8A261]/50" : ""}`}>
              {page.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#C8A261] px-3 py-1 text-xs font-bold text-white">
                  Phổ biến nhất
                </div>
              )}
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <div className={`text-xs font-bold tracking-widest ${isDark ? "text-[#C8A261]" : "text-[#9c783c]"}`}>{page.code}</div>
                  <div className={`mt-1 font-bold ${t.text}`}>{page.name}</div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => openEdit(page)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}>
                    <Pencil className="h-4 w-4" />
                  </button>
                  {deleteCode === page.code ? (
                    <div className="flex gap-1">
                      <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteCode(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/40" : "hover:bg-gray-100 text-gray-400"}`}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteCode(page.code)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/25 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                       <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              {page.tag && (
                <span className={`mb-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.badgeGreen}`}>{page.tag}</span>
              )}
              <div className={`mb-4 text-2xl font-black tracking-tight ${t.text}`}>
                {page.price.toLocaleString("vi-VN")}<span className={`text-sm font-normal ${t.textMuted}`}>đ</span>
              </div>
              <ul className="space-y-2">
                {page.features.slice(0, 4).map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-xs ${t.textMuted}`}>
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />{f}
                  </li>
                ))}
                {page.features.length > 4 && (
                  <li className={`text-xs ${t.textFaint}`}>+{page.features.length - 4} tính năng khác...</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm gói thiết kế mới" : `Chỉnh sửa ${editPage?.code}`}</h3>
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
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="Landing Page" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Nhãn gói</label>
                  <input value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="Khởi đầu" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Giá (VNĐ)</label>
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
                    placeholder="3890000"
                  />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Thứ tự hiển thị</label>
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
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Icon gói (Bấm vào ô để chọn nhanh hoặc dán link ảnh) *</label>
                <div className="flex gap-3 items-start">
                  <div className={`h-11 w-11 shrink-0 rounded-xl border flex items-center justify-center ${isDark ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-gray-50'}`}>
                    <DynamicIcon name={form.icon} size={20} color="#C8A261" />
                  </div>
                  <div ref={iconDropdownRef} className="relative flex-1">
                    <div className="relative">
                      <input
                        value={form.icon}
                        onFocus={() => setShowIconDropdown(true)}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, icon: e.target.value }));
                          setShowIconDropdown(true);
                        }}
                        className={`w-full rounded-xl pl-4 pr-10 py-2.5 text-sm transition ${t.input}`}
                        placeholder="Zap, ShoppingBag, Heart hoặc dán link ảnh icon..."
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowIconDropdown((prev) => !prev)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 transition z-10 ${
                          isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-700'
                        }`}
                      >
                        <ChevronDown size={18} className={`transition-transform duration-200 ${showIconDropdown ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {showIconDropdown && (
                      <div className={`absolute top-full left-0 right-0 z-50 mt-1.5 rounded-xl border p-3 shadow-xl max-h-60 overflow-y-auto ${
                        isDark ? 'border-white/10 bg-[#0c0d21] shadow-black/80' : 'border-gray-200 bg-white shadow-gray-200'
                      }`}>
                        <div className="mb-2">
                          <input
                            type="text"
                            value={iconSearch}
                            onChange={(e) => setIconSearch(e.target.value)}
                            placeholder="Tìm kiếm nhanh icon..."
                            className={`w-full rounded-lg px-2.5 py-1.5 text-xs transition ${t.input}`}
                          />
                        </div>
                        <div className="mb-2 text-[11px] font-semibold text-gray-400">Chọn Icon từ danh sách:</div>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { name: "Zap", label: "Tia sét" },
                            { name: "ShoppingBag", label: "Giỏ hàng" },
                            { name: "Building2", label: "Tòa nhà" },
                            { name: "Wand2", label: "Cây đũa" },
                            { name: "Globe", label: "Địa cầu" },
                            { name: "Heart", label: "Trái tim" },
                            { name: "Star", label: "Ngôi sao" },
                            { name: "Laptop", label: "Máy tính" },
                            { name: "Smile", label: "Mặt cười" },
                            { name: "Sparkles", label: "Lấp lánh" },
                            { name: "Layout", label: "Layout" },
                            { name: "Smartphone", label: "Mobile" },
                            { name: "Shield", label: "Bảo mật" },
                            { name: "Settings2", label: "Cài đặt" },
                            { name: "Search", label: "Tìm kiếm" },
                            { name: "PenTool", label: "Thiết kế" },
                            { name: "Headphones", label: "Hỗ trợ" },
                            { name: "Users", label: "Đội ngũ" },
                            { name: "Clock", label: "Thời gian" },
                            { name: "Award", label: "Giải thưởng" },
                            { name: "Mail", label: "Email" },
                            { name: "Phone", label: "Điện thoại" }
                          ].filter(item => 
                            !iconSearch || 
                            item.name.toLowerCase().includes(iconSearch.toLowerCase()) || 
                            item.label.toLowerCase().includes(iconSearch.toLowerCase())
                          ).map((item) => {
                            const IconComp = (Lucide as any)[item.name];
                            return (
                              <button
                                key={item.name}
                                type="button"
                                onClick={() => {
                                  setForm((f) => ({ ...f, icon: item.name }));
                                  setShowIconDropdown(false);
                                  setIconSearch("");
                                }}
                                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition text-center ${
                                  form.icon === item.name
                                    ? "border-[#C8A261] bg-[#C8A261]/10 text-[#C8A261] font-semibold"
                                    : isDark
                                    ? "border-white/5 hover:border-white/15 text-white/60 hover:text-white hover:bg-white/5"
                                    : "border-gray-50 hover:border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                              >
                                {IconComp && <IconComp className="h-4.5 w-4.5 shrink-0" />}
                                <span className="text-[10px] truncate max-w-full">{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ảnh cover (URL) *</label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1 flex flex-col gap-2">
                    <input value={form.cover} onChange={(e) => setForm((f) => ({ ...f, cover: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="https://example.com/image.jpg" />
                    {form.cover && (
                      <div className="w-full max-w-md aspect-video rounded-xl bg-gray-950 overflow-hidden border border-gray-800 relative">
                        <img src={form.cover} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    )}
                  </div>
                  <UploadButton onUploadComplete={(url) => setForm((f) => ({ ...f, cover: url }))} />
                </div>
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Mô tả phụ</label>
                <input value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="Trang đích chuyển đổi cao" />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tính năng (mỗi dòng 1 tính năng)</label>
                <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)}
                  rows={5} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder={"1 trang đích tối ưu CRO\nForm liên hệ + Zalo OA"} />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tính năng chưa có (mỗi dòng 1 mục)</label>
                <textarea value={missingText} onChange={(e) => setMissingText(e.target.value)}
                  rows={3} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder={"SSL bảo mật\nEmail doanh nghiệp"} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.highlight} onChange={(e) => setForm((f) => ({ ...f, highlight: e.target.checked }))}
                    className="h-4 w-4 accent-[#C8A261]" />
                  <div>
                    <span className={`text-sm font-medium ${t.text}`}>Đánh dấu nổi bật</span>
                    <p className={`text-xs ${t.textFaint}`}>Hiện nhãn "Phổ biến nhất" và viền nổi bật</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.isRental || false} onChange={(e) => setForm((f) => ({ ...f, isRental: e.target.checked }))}
                    className="h-4 w-4 accent-[#C8A261]" />
                  <div>
                    <span className={`text-sm font-medium ${t.text}`}>Gói thuê website</span>
                    <p className={`text-xs ${t.textFaint}`}>Bật nếu gói này thanh toán hàng tháng</p>
                  </div>
                </label>
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
