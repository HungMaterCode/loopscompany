import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, X, Check, Image, Save, RefreshCw, AlertCircle, Upload, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { useSiteData } from "@/features/legacy-core/SiteDataContext";
import type { ProjectItemConfig } from "@/features/legacy-core/site-config-api";
import type { TC } from "./types";

interface Props {
  t: TC;
  isDark: boolean;
}

const PRESET_COLORS = ['#C8A261', '#7B61FF', '#00D9A3', '#FF6B6B', '#FFB347', '#00FF88', '#00CFFF'];

export function PortfolioManager({ t, isDark }: Props) {
  const { config, updateConfig, isLoading } = useSiteData();

  const [subtitle, setSubtitle] = useState("DỰ ÁN ĐÃ THỰC HIỆN");
  const [titleRegular, setTitleRegular] = useState("Bảo tàng");
  const [titleItalic, setTitleItalic] = useState("Dự án");
  const [bgLight, setBgLight] = useState("#f5f5f7");
  const [bgDark, setBgDark] = useState("#080b16");
  const [bgUrl, setBgUrl] = useState("");
  const [projects, setProjects] = useState<ProjectItemConfig[]>([]);

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<ProjectItemConfig>({
    num: "01",
    title: "",
    cat: "",
    year: new Date().getFullYear().toString(),
    result: "",
    img: "",
    accent: PRESET_COLORS[0],
    url: "",
    slug: "",
    overview: "",
    challenge: "",
    solution: "",
    roles: [],
    mockupImg: "",
    solutionImg1: "",
    solutionImg2: ""
  });
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "detail">("basic");

  // Sync state when config loads
  useEffect(() => {
    if (config && !isLoading) {
      const port = config.portfolio;
      setSubtitle(port.subtitle || "DỰ ÁN ĐÃ THỰC HIỆN");
      setTitleRegular(port.titleRegular || "Bảo tàng");
      setTitleItalic(port.titleItalic || "Dự án");
      setBgLight(port.bgLight || "#f5f5f7");
      setBgDark(port.bgDark || "#080b16");
      setBgUrl(port.bgUrl || "");
      setProjects(port.projects || []);
    }
  }, [config, isLoading]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");
    try {
      await updateConfig({
        ...config,
        portfolio: {
          ...config.portfolio,
          subtitle,
          titleRegular,
          titleItalic,
          bgLight,
          bgDark,
          bgUrl,
          projects,
        },
      });
      setMessage("Lưu cấu hình thành công!");
      setTimeout(() => setMessage(""), 3000);
    } catch (e) {
      setMessage("Lỗi khi lưu cấu hình.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn huỷ các thay đổi chưa lưu?")) {
      const port = config.portfolio;
      setSubtitle(port.subtitle || "DỰ ÁN ĐÃ THỰC HIỆN");
      setTitleRegular(port.titleRegular || "Bảo tàng");
      setTitleItalic(port.titleItalic || "Dự án");
      setBgLight(port.bgLight || "#f5f5f7");
      setBgDark(port.bgDark || "#080b16");
      setBgUrl(port.bgUrl || "");
      setProjects(port.projects || []);
    }
  };

  const openAdd = () => {
    const nextNum = String(projects.length + 1).padStart(2, "0");
    setForm({
      num: nextNum,
      title: "",
      cat: "",
      year: new Date().getFullYear().toString(),
      result: "",
      img: "",
      accent: PRESET_COLORS[Math.min(projects.length, PRESET_COLORS.length - 1)],
      url: "",
      slug: "",
      overview: "",
      challenge: "",
      solution: "",
      roles: [],
      mockupImg: "",
      solutionImg1: "",
      solutionImg2: ""
    });
    setActiveTab("basic");
    setIsAdding(true);
    setEditIdx(null);
  };

  const openEdit = (idx: number) => {
    setEditIdx(idx);
    const p = projects[idx];
    setForm({
      ...p,
      slug: p.slug || "",
      overview: p.overview || "",
      challenge: p.challenge || "",
      solution: p.solution || "",
      roles: p.roles || [],
      mockupImg: p.mockupImg || "",
      solutionImg1: p.solutionImg1 || "",
      solutionImg2: p.solutionImg2 || ""
    });
    setActiveTab("basic");
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditIdx(null);
    setIsAdding(false);
  };

  const saveForm = () => {
    if (!form.title.trim()) {
      alert("Vui lòng nhập tên dự án");
      return;
    }
    if (!form.img.trim()) {
      alert("Vui lòng nhập hoặc tải hình ảnh lên");
      return;
    }
    
    if (isAdding) {
      setProjects((prev) => [...prev, { ...form }]);
    } else if (editIdx !== null) {
      setProjects((prev) => prev.map((it, i) => (i === editIdx ? { ...form } : it)));
    }
    closeModal();
  };

  const doDelete = () => {
    if (deleteIdx !== null) {
      setProjects((prev) => prev.filter((_, i) => i !== deleteIdx));
    }
    setDeleteIdx(null);
  };

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setProjects((prev) => {
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[idx - 1];
      next[idx - 1] = temp;
      return next;
    });
  };

  const moveDown = (idx: number) => {
    if (idx === projects.length - 1) return;
    setProjects((prev) => {
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[idx + 1];
      next[idx + 1] = temp;
      return next;
    });
  };

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

  const showModal = isAdding || editIdx !== null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Bảo tàng Dự án</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý nội dung tiêu đề và danh sách các thẻ dự án mẫu.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${t.btnGhost}`}>
            <RefreshCw className="h-4 w-4" /> Đặt lại
          </button>
          <button onClick={handleSave} disabled={isSaving} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${t.btn}`}>
            {isSaving ? "Đang lưu..." : <><Save className="h-4 w-4" /> Lưu cấu hình</>}
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${message.includes("Lỗi") ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"}`}>
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-semibold">{message}</span>
        </div>
      )}

      {/* Global settings */}
      <div className={`rounded-2xl p-6 ${t.card} space-y-5`}>
        <h3 className={`text-lg font-bold ${t.text}`}>Cấu hình Hình nền chìm</h3>
        <div>
          <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Hình nền chìm (Background URL)</label>
          <div className="flex gap-3 items-start">
            <input
              type="text"
              value={bgUrl}
              onChange={(e) => setBgUrl(e.target.value)}
              className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
              placeholder="https://example.com/bg.jpg"
            />
            <UploadButton onUploadComplete={setBgUrl} />
          </div>
        </div>
      </div>

      {/* Projects list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-bold ${t.text}`}>Danh sách thẻ dự án</h3>
          <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
            <Plus className="h-4 w-4" /> Thêm dự án
          </button>
        </div>

        <div className={`rounded-2xl overflow-hidden ${t.card}`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className={t.tableHead}>
                  <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint} w-[80px]`}>#</th>
                  <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Dự án</th>
                  <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Phân loại (Tag)</th>
                  <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint} w-[100px]`}>Năm</th>
                  <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Thông số nổi bật</th>
                  <th className={`px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider ${t.textFaint} w-[100px]`}>Màu nhấn</th>
                  <th className={`px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider ${t.textFaint} w-[120px]`}>Thứ tự</th>
                  <th className={`px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider ${t.textFaint} w-[120px]`}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={8} className={`px-5 py-8 text-center text-sm ${t.textFaint}`}>Chưa có dự án nào. Nhấp vào "Thêm dự án" để bắt đầu.</td>
                  </tr>
                ) : (
                  projects.map((item, idx) => (
                    <tr key={idx} className={`transition ${t.tableRow}`}>
                      <td className={`px-5 py-4 text-sm font-mono font-semibold ${t.textFaint}`}>{item.num}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-12 w-16 shrink-0 rounded-lg overflow-hidden bg-gray-800 border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                            {item.img ? (
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Image className={`h-4 w-4 ${t.textFaint}`} />
                              </div>
                            )}
                          </div>
                          <span className={`font-semibold text-sm ${t.text}`}>{item.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.badge}`}>{item.cat}</span>
                      </td>
                      <td className={`px-5 py-4 text-sm ${t.textMuted}`}>{item.year}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ color: item.accent, backgroundColor: item.accent + '15' }}>
                          {item.result}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: item.accent }} />
                          <span className="text-xs font-mono text-gray-500">{item.accent}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveUp(idx)}
                            disabled={idx === 0}
                            className={`p-1.5 rounded-lg border border-transparent transition ${idx === 0 ? "opacity-30 cursor-not-allowed" : isDark ? "hover:bg-white/10 text-white/50 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveDown(idx)}
                            disabled={idx === projects.length - 1}
                            className={`p-1.5 rounded-lg border border-transparent transition ${idx === projects.length - 1 ? "opacity-30 cursor-not-allowed" : isDark ? "hover:bg-white/10 text-white/50 hover:text-white" : "hover:bg-gray-100 text-gray-400 hover:text-gray-700"}`}
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-2xl p-6 ${t.modal} max-h-[90vh] overflow-y-auto`}>
            <style>{`
              .theme-light-picker {
                color: #1f2937 !important;
              }
              .theme-dark-picker {
                color: #ffffff !important;
              }
            `}</style>
            
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm dự án mới" : "Chỉnh sửa dự án"}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className={`flex border-b ${isDark ? 'border-white/10' : 'border-gray-200'} mb-5`}>
              <button
                type="button"
                onClick={() => setActiveTab("basic")}
                className={`pb-2.5 px-4 text-sm font-semibold border-b-2 transition ${
                  activeTab === "basic"
                    ? isDark
                      ? "border-[#C8A261] text-[#C8A261]"
                      : "border-red-600 text-red-600"
                    : `${t.textMuted} border-transparent hover:${t.text}`
                }`}
              >
                Thông tin cơ bản
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("detail")}
                className={`pb-2.5 px-4 text-sm font-semibold border-b-2 transition ${
                  activeTab === "detail"
                    ? isDark
                      ? "border-[#C8A261] text-[#C8A261]"
                      : "border-red-600 text-red-600"
                    : `${t.textMuted} border-transparent hover:${t.text}`
                }`}
              >
                Chi tiết Case Study
              </button>
            </div>

            {/* Tab Contents */}
            <div className="space-y-4">
              {activeTab === "basic" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Số thứ tự *</label>
                      <input value={form.num} onChange={(e) => setForm((f) => ({ ...f, num: e.target.value }))}
                        className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                        placeholder="01" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tên dự án *</label>
                      <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                        placeholder="VinFast Toàn Cầu" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Phân loại (Tag)*</label>
                      <input value={form.cat} onChange={(e) => setForm((f) => ({ ...f, cat: e.target.value }))}
                        className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                        placeholder="WEB · STRATEGY" />
                    </div>
                    <div>
                      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Năm thực hiện *</label>
                      <input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                        className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                        placeholder="2024" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Chỉ số nổi bật *</label>
                      <input value={form.result} onChange={(e) => setForm((f) => ({ ...f, result: e.target.value }))}
                        className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                        placeholder="+340% traffic" />
                    </div>
                    <div>
                      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Màu nhấn chủ đạo *</label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={form.accent}
                          onChange={(e) => setForm((f) => ({ ...f, accent: e.target.value }))}
                          className="w-10 h-10 cursor-pointer rounded border border-gray-300 bg-transparent shrink-0"
                        />
                        <input
                          type="text"
                          value={form.accent}
                          onChange={(e) => setForm((f) => ({ ...f, accent: e.target.value }))}
                          className={`w-full rounded-xl px-3 py-2 text-xs transition ${t.input} font-mono`}
                          placeholder="#C8A261"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={`mb-1 block text-[10px] uppercase tracking-wider ${t.textFaint}`}>Bảng màu gợi ý</label>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {PRESET_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, accent: color }))}
                          className={`w-7 h-7 rounded-full border transition flex items-center justify-center ${form.accent.toLowerCase() === color.toLowerCase() ? "border-white scale-110 shadow-lg" : "border-transparent opacity-80 hover:opacity-100"}`}
                          style={{ backgroundColor: color }}
                        >
                          {form.accent.toLowerCase() === color.toLowerCase() && (
                            <Check className="h-3 w-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Hình ảnh đại diện dự án *</label>
                    <div className="flex gap-3 items-start">
                      <div className="flex-1 flex flex-col gap-2">
                        <input value={form.img} onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))}
                          className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                          placeholder="https://example.com/image.jpg" />
                        {form.img && (
                          <div className="w-full aspect-video rounded-xl bg-gray-950 overflow-hidden border border-gray-800 relative">
                            <img src={form.img} className="w-full h-full object-cover" alt="Preview" />
                          </div>
                        )}
                      </div>
                      <UploadButton onUploadComplete={(url) => setForm((f) => ({ ...f, img: url }))} />
                    </div>
                    <p className={`mt-1.5 text-xs ${t.textFaint}`}>Hãy tải lên ảnh có tỉ lệ 16:9 để hiển thị đẹp nhất.</p>
                  </div>

                  <div>
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Đường dẫn liên kết (Tùy chọn)</label>
                    <input value={form.url || ""} onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                      placeholder="https://vinfastauto.com/" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Đường dẫn thân thiện (Slug)</label>
                    <input value={form.slug || ""} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                      placeholder="sunhouse-real-estate" />
                    <p className={`mt-1 text-xs ${t.textFaint}`}>Để trống sẽ tự động tạo từ tên dự án. Ví dụ: "sunhouse-real-estate"</p>
                  </div>

                  <div>
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tổng quan dự án</label>
                    <textarea value={form.overview || ""} onChange={(e) => setForm((f) => ({ ...f, overview: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} h-20 resize-none`}
                      placeholder="Mô tả tóm tắt tổng quan về dự án..." />
                  </div>

                  <div>
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Vai trò của LOOP (Mỗi dòng là 1 vai trò)</label>
                    <textarea value={form.roles?.join("\n") || ""} onChange={(e) => setForm((f) => ({ ...f, roles: e.target.value.split("\n").filter(Boolean) }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} h-20 resize-none`}
                      placeholder="Phân tích & Tư vấn UX&#10;Thiết kế Giao diện (UI Design)&#10;Phát triển Web / App" />
                  </div>

                  <div>
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Thách thức & Bối cảnh</label>
                    <textarea value={form.challenge || ""} onChange={(e) => setForm((f) => ({ ...f, challenge: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} h-20 resize-none`}
                      placeholder="Mô tả bối cảnh thị trường và những khó khăn cần giải quyết..." />
                  </div>

                  <div>
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ảnh minh họa Thách thức (Mockup Image)</label>
                    <div className="flex gap-3 items-start">
                      <div className="flex-1 flex flex-col gap-2">
                        <input value={form.mockupImg || ""} onChange={(e) => setForm((f) => ({ ...f, mockupImg: e.target.value }))}
                          className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                          placeholder="https://example.com/mockup.jpg" />
                        {form.mockupImg && (
                          <div className="w-full aspect-video rounded-xl bg-gray-950 overflow-hidden border border-gray-800 relative">
                            <img src={form.mockupImg} className="w-full h-full object-cover" alt="Mockup Preview" />
                          </div>
                        )}
                      </div>
                      <UploadButton onUploadComplete={(url) => setForm((f) => ({ ...f, mockupImg: url }))} />
                    </div>
                  </div>

                  <div>
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Giải pháp Đột phá</label>
                    <textarea value={form.solution || ""} onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} h-20 resize-none`}
                      placeholder="Mô tả các giải pháp đột phá đã áp dụng cho dự án..." />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ảnh giải pháp chi tiết 1</label>
                      <div className="flex gap-3 items-start">
                        <div className="flex-1 flex flex-col gap-2">
                          <input value={form.solutionImg1 || ""} onChange={(e) => setForm((f) => ({ ...f, solutionImg1: e.target.value }))}
                            className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                            placeholder="https://example.com/solution1.jpg" />
                          {form.solutionImg1 && (
                            <div className="w-full aspect-video rounded-xl bg-gray-950 overflow-hidden border border-gray-800 relative">
                              <img src={form.solutionImg1} className="w-full h-full object-cover" alt="Solution 1 Preview" />
                            </div>
                          )}
                        </div>
                        <UploadButton onUploadComplete={(url) => setForm((f) => ({ ...f, solutionImg1: url }))} />
                      </div>
                    </div>

                    <div>
                      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ảnh giải pháp chi tiết 2</label>
                      <div className="flex gap-3 items-start">
                        <div className="flex-1 flex flex-col gap-2">
                          <input value={form.solutionImg2 || ""} onChange={(e) => setForm((f) => ({ ...f, solutionImg2: e.target.value }))}
                            className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                            placeholder="https://example.com/solution2.jpg" />
                          {form.solutionImg2 && (
                            <div className="w-full aspect-video rounded-xl bg-gray-950 overflow-hidden border border-gray-800 relative">
                              <img src={form.solutionImg2} className="w-full h-full object-cover" alt="Solution 2 Preview" />
                            </div>
                          )}
                        </div>
                        <UploadButton onUploadComplete={(url) => setForm((f) => ({ ...f, solutionImg2: url }))} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
              <button onClick={closeModal} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btnGhost}`}>Hủy</button>
              <button onClick={saveForm} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
                {isAdding ? "Thêm mới" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
