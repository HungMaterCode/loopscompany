import { useState, useEffect, useRef } from "react";
import { Save, Globe, FileSearch, Gauge, Tags, AlertCircle, CheckCircle2, ExternalLink, Copy, Check, Upload, Loader2 } from "lucide-react";
import type { TC } from "./types";

interface SeoPage {
  id: string;
  label: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  ogImage?: string;
}

interface Props {
  t: TC;
  isDark: boolean;
}

const INITIAL_PAGES: SeoPage[] = [
  {
    id: "home",
    label: "Trang chủ",
    title: "Thiết Kế & Thuê Website Chuyên Nghiệp | Việt Web",
    description: "Thuê website đẹp, chuẩn SEO, giao trong 5 ngày từ 189K/tháng. Hỗ trợ 24/7 qua Zalo, không cần kiến thức kỹ thuật. Việt Web — đơn vị thiết kế website uy tín tại TP.HCM.",
    keywords: "thiết kế website, thuê website, landing page, website doanh nghiệp, website bán hàng, Việt Web",
    ogTitle: "Thiết Kế & Thuê Website Chuyên Nghiệp — Việt Web",
    ogDescription: "Giao website trong 5 ngày, từ 189K/tháng. Hỗ trợ Zalo 24/7. Không lo kỹ thuật.",
    canonical: "https://vietweb.vn/",
    ogImage: "",
  },
  {
    id: "services",
    label: "Dịch vụ",
    title: "Dịch Vụ Thiết Kế Website, SEO & Thương Hiệu | Việt Web",
    description: "Khám phá đầy đủ các dịch vụ: landing page, cửa hàng online, website doanh nghiệp, SEO Google, thiết kế thương hiệu và bảo trì 24/7. Giá minh bạch, không phát sinh.",
    keywords: "dịch vụ thiết kế website, SEO Google, thương hiệu, cửa hàng online, landing page",
    ogTitle: "Dịch Vụ Việt Web — Thiết Kế & SEO",
    ogDescription: "6 dịch vụ web chuyên nghiệp: landing page, e-commerce, SEO, thương hiệu và hỗ trợ 24/7.",
    canonical: "https://vietweb.vn/#dich-vu",
    ogImage: "",
  },
  {
    id: "pricing",
    label: "Bảng giá",
    title: "Bảng Giá Thuê Website W-01 → W-04 | Việt Web",
    description: "Xem chi tiết 4 gói thuê website từ 189K đến 1.189K/tháng. Bao gồm domain, hosting, SSL, email và hỗ trợ kỹ thuật. Không phí ẩn, không ràng buộc.",
    keywords: "bảng giá thuê website, gói W-01, gói W-02, gói W-03, gói W-04, giá website tháng",
    ogTitle: "Bảng Giá Thuê Website Việt Web — Từ 189K/tháng",
    ogDescription: "4 gói rõ ràng, từ 189K đến 1.189K/tháng. Domain, hosting, SSL bao gồm tất cả.",
    canonical: "https://vietweb.vn/#bang-gia",
    ogImage: "",
  },
  {
    id: "team",
    label: "Đội ngũ",
    title: "Đội Ngũ Chuyên Gia Thiết Kế Web | Việt Web",
    description: "Gặp gỡ đội ngũ 6 chuyên gia: giám đốc sáng lập, UX designer, developer, SEO chuyên gia và customer success. Hơn 500 dự án thành công tại Việt Nam.",
    keywords: "đội ngũ Việt Web, chuyên gia thiết kế web, developer TP.HCM",
    ogTitle: "Đội Ngũ Việt Web — Chuyên Gia Thiết Kế Website",
    ogDescription: "6 chuyên gia, hơn 500 dự án. Gặp gỡ team đằng sau những website đẹp nhất.",
    canonical: "https://vietweb.vn/doi-ngu",
    ogImage: "",
  },
];

const TECH_SCORES = [
  { id: "meta", icon: Tags, label: "Meta & OG Tags", score: 92, tip: "Title, description, OG image và canonical được cấu hình đúng." },
  { id: "keywords", icon: FileSearch, label: "Từ khóa dịch vụ", score: 88, tip: "Phân bổ từ khóa chính và dài hạn trong các heading, đoạn văn." },
  { id: "speed", icon: Gauge, label: "Tốc độ & Core Web Vitals", score: 84, tip: "LCP < 2.5s, CLS < 0.1, INP < 200ms. Cần tối ưu thêm ảnh mobile." },
  { id: "mobile", icon: Globe, label: "Mobile-friendly", score: 96, tip: "Responsive hoàn toàn, font size ≥ 16px, tap targets đủ lớn." },
];

const UploadButton = ({ onUploadComplete, acceptType = "image/*", t, type }: { onUploadComplete: (url: string) => void; acceptType?: string; t: TC; type?: string }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const url = type ? `/api/upload?type=${type}` : '/api/upload';
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onUploadComplete(data.url);
    } catch (err) {
      console.error(err);
      alert('Tải tệp lên thất bại!');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="shrink-0">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptType}
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
        Tải lên
      </button>
    </div>
  );
};

const CHAR_LIMITS = { title: 60, description: 160 };

export function SeoManager({ t, isDark }: Props) {
  const [pages, setPages] = useState<SeoPage[]>(INITIAL_PAGES);
  const [activePageId, setActivePageId] = useState("home");
  const [activeSubTab, setActiveSubTab] = useState<"meta" | "technical">("meta");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Load SEO pages from API on mount
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res = await fetch("/api/seo");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = INITIAL_PAGES.map(initial => {
              const dbPage = data.find((d: any) => d.pageId === initial.id);
              return dbPage ? {
                id: dbPage.pageId,
                label: dbPage.label,
                title: dbPage.title,
                description: dbPage.description,
                keywords: dbPage.keywords || "",
                ogTitle: dbPage.ogTitle || "",
                ogDescription: dbPage.ogDescription || "",
                canonical: dbPage.canonical,
                ogImage: dbPage.ogImage || "",
              } : initial;
            });
            setPages(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load SEO pages:", err);
      }
    };
    void fetchPages();
  }, []);

  const activePage = pages.find((p) => p.id === activePageId)!;

  const updatePage = (field: keyof SeoPage, value: string) => {
    setPages((prev) => prev.map((p) => p.id === activePageId ? { ...p, [field]: value } : p));
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: activePage.id,
          title: activePage.title,
          description: activePage.description,
          keywords: activePage.keywords,
          ogTitle: activePage.ogTitle,
          ogDescription: activePage.ogDescription,
          canonical: activePage.canonical,
          ogImage: activePage.ogImage || "",
        }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        alert("Lưu SEO thất bại.");
      }
    } catch (err) {
      console.error("Failed to save SEO page:", err);
      alert("Lỗi kết nối khi lưu SEO.");
    } finally {
      setIsSaving(false);
    }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 75) return "text-amber-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number, isDark: boolean) => {
    if (score >= 90) return isDark ? "bg-emerald-400/12" : "bg-emerald-50";
    if (score >= 75) return isDark ? "bg-amber-400/12" : "bg-amber-50";
    return isDark ? "bg-red-400/12" : "bg-red-50";
  };

  const getBarColor = (score: number) => {
    if (score >= 90) return "from-emerald-400 to-teal-400";
    if (score >= 75) return "from-amber-400 to-yellow-400";
    return "from-red-500 to-rose-400";
  };

  const titleLen = activePage.title.length;
  const descLen = activePage.description.length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Quản lý SEO</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Meta tags, từ khóa, OG và điểm kỹ thuật cho từng trang.</p>
        </div>
        <button onClick={handleSave} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${saved ? "bg-emerald-600 text-white" : t.btn}`}>
          {saved ? <><CheckCircle2 className="h-4 w-4" /> Đã lưu</> : <><Save className="h-4 w-4" /> Lưu SEO</>}
        </button>
      </div>

      {/* Sub tab */}
      <div className={`inline-flex rounded-xl p-1 ${isDark ? "bg-white/[0.06]" : "bg-gray-100"}`}>
        {(["meta", "technical"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveSubTab(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${activeSubTab === tab
              ? isDark ? "bg-white/[0.12] text-white shadow-sm" : "bg-white text-gray-900 shadow-sm"
              : t.textMuted}`}>
            {tab === "meta" ? "Meta & từ khóa" : "Kỹ thuật & điểm số"}
          </button>
        ))}
      </div>

      {activeSubTab === "meta" && (
        <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
          {/* Page selector */}
          <div className={`rounded-2xl p-3 h-fit ${t.card}`}>
            <p className={`mb-2 px-2 text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Chọn trang</p>
            {pages.map((page) => (
              <button key={page.id} onClick={() => setActivePageId(page.id)}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  activePageId === page.id
                    ? isDark ? "bg-red-600/20 text-white" : "bg-red-50 text-red-700"
                    : t.navItem
                }`}>
                {page.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Meta title */}
            <div className={`rounded-2xl p-5 ${t.card}`}>
              <div className="mb-3 flex items-center justify-between">
                <label className={`text-sm font-semibold ${t.text}`}>Meta Title</label>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${titleLen > CHAR_LIMITS.title ? "text-red-400" : titleLen > CHAR_LIMITS.title * 0.85 ? "text-amber-400" : t.textFaint}`}>
                    {titleLen}/{CHAR_LIMITS.title}
                  </span>
                  {titleLen > CHAR_LIMITS.title && <AlertCircle className="h-3.5 w-3.5 text-red-400" />}
                </div>
              </div>
              <div className="relative">
                <input value={activePage.title} onChange={(e) => updatePage("title", e.target.value)}
                  className={`w-full rounded-xl px-4 py-3 pr-10 text-sm transition ${t.input}`}
                  placeholder="Tiêu đề trang — xuất hiện trên Google..." />
                <button onClick={() => copyText(activePage.title, "title")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {copiedField === "title" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className={`h-4 w-4 ${t.textFaint} hover:text-red-400 transition`} />}
                </button>
              </div>
              <p className={`mt-2 text-xs ${t.textFaint}`}>Tối đa 60 ký tự. Nên có từ khóa chính ở đầu câu.</p>
            </div>

            {/* Meta description */}
            <div className={`rounded-2xl p-5 ${t.card}`}>
              <div className="mb-3 flex items-center justify-between">
                <label className={`text-sm font-semibold ${t.text}`}>Meta Description</label>
                <span className={`text-xs ${descLen > CHAR_LIMITS.description ? "text-red-400" : descLen > CHAR_LIMITS.description * 0.9 ? "text-amber-400" : t.textFaint}`}>
                  {descLen}/{CHAR_LIMITS.description}
                </span>
              </div>
              <div className="relative">
                <textarea value={activePage.description} onChange={(e) => updatePage("description", e.target.value)}
                  rows={3} className={`w-full resize-none rounded-xl px-4 py-3 pr-10 text-sm transition ${t.input}`}
                  placeholder="Mô tả trang — xuất hiện dưới tiêu đề trên Google..." />
                <button onClick={() => copyText(activePage.description, "desc")} className="absolute right-3 top-3">
                  {copiedField === "desc" ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className={`h-4 w-4 ${t.textFaint} hover:text-red-400 transition`} />}
                </button>
              </div>
              <p className={`mt-2 text-xs ${t.textFaint}`}>Tối đa 160 ký tự. Nên có từ khóa và CTA ngắn gọn.</p>
            </div>

            {/* Keywords */}
            <div className={`rounded-2xl p-5 ${t.card}`}>
              <label className={`mb-3 block text-sm font-semibold ${t.text}`}>Từ khóa trọng tâm</label>
              <input value={activePage.keywords} onChange={(e) => updatePage("keywords", e.target.value)}
                className={`w-full rounded-xl px-4 py-3 text-sm transition ${t.input}`}
                placeholder="thiết kế website, thuê website, landing page..." />
              <p className={`mt-2 text-xs ${t.textFaint}`}>Cách nhau bằng dấu phẩy. 3–8 từ khóa là tối ưu.</p>
            </div>

            {/* OG */}
            <div className={`rounded-2xl p-5 ${t.card}`}>
              <label className={`mb-4 block text-sm font-semibold ${t.text}`}>Open Graph (mạng xã hội)</label>
              <div className="space-y-3">
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${t.textMuted}`}>OG Title</label>
                  <input value={activePage.ogTitle} onChange={(e) => updatePage("ogTitle", e.target.value)}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} />
                </div>
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${t.textMuted}`}>OG Description</label>
                  <textarea value={activePage.ogDescription} onChange={(e) => updatePage("ogDescription", e.target.value)}
                    rows={2} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} />
                </div>
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${t.textMuted}`}>Canonical URL</label>
                  <div className="relative">
                    <input value={activePage.canonical} onChange={(e) => updatePage("canonical", e.target.value)}
                      className={`w-full rounded-xl px-4 py-2.5 pr-10 text-sm transition ${t.input}`} />
                    <ExternalLink className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 ${t.textFaint}`} />
                  </div>
                </div>
                <div>
                  <label className={`mb-1.5 block text-xs font-medium ${t.textMuted}`}>OG Image (Ảnh đại diện khi chia sẻ)</label>
                  <div className="flex gap-3 items-start">
                    <div className="flex-1 flex flex-col gap-2">
                      <input value={activePage.ogImage || ""} onChange={(e) => updatePage("ogImage", e.target.value)}
                        className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                        placeholder="Đường dẫn ảnh đại diện (ví dụ: https://... hoặc /og-image.jpg)" />
                      {activePage.ogImage && (
                        <div className="w-full aspect-[1.91/1] max-w-[280px] rounded-xl bg-gray-800 overflow-hidden border border-gray-700 relative">
                          <img src={activePage.ogImage} className="w-full h-full object-cover" alt="Preview OG" />
                        </div>
                      )}
                    </div>
                    <UploadButton onUploadComplete={(url) => updatePage("ogImage", url)} t={t} type="og" />
                  </div>
                </div>
              </div>
            </div>

            {/* Preview card */}
            <div className={`rounded-2xl p-5 ${isDark ? "bg-[#0e0f11] border border-white/10" : "bg-[#f8f9fa] border border-gray-200"}`}>
              <p className={`mb-3 text-xs font-semibold uppercase tracking-wider ${t.textFaint}`}>Xem trước kết quả Google</p>
              <div className={`rounded-xl p-4 ${isDark ? "bg-[#202124]" : "bg-white border border-gray-200"}`}>
                <div className="mb-1 flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded-full bg-gray-400" />
                  <span className="text-xs text-gray-400">{activePage.canonical}</span>
                </div>
                <p className="text-[15px] font-medium text-[#1a0dab] leading-tight line-clamp-1">{activePage.title || "Tiêu đề trang..."}</p>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">{activePage.description || "Mô tả trang..."}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "technical" && (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {TECH_SCORES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className={`rounded-2xl p-5 ${t.card}`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getScoreBg(item.score, isDark)}`}>
                      <Icon className={`h-5 w-5 ${getScoreColor(item.score)}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className={`font-semibold text-sm ${t.text}`}>{item.label}</h3>
                        <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>{item.score}/100</span>
                      </div>
                      <p className={`text-xs leading-relaxed ${t.textMuted}`}>{item.tip}</p>
                      <div className={`mt-3 h-2 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
                        <div className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${getBarColor(item.score)}`}
                          style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checklist */}
          <div className={`rounded-2xl p-5 ${t.card}`}>
            <h3 className={`mb-4 font-semibold ${t.text}`}>Checklist SEO kỹ thuật</h3>
            <div className="space-y-2.5">
              {[
                { ok: true, label: "Sitemap.xml đã cấu hình" },
                { ok: true, label: "robots.txt cho phép crawl" },
                { ok: true, label: "HTTPS / SSL đang hoạt động" },
                { ok: true, label: "Structured data JSON-LD (Schema.org)" },
                { ok: false, label: "Google Search Console đã xác minh" },
                { ok: false, label: "Google Analytics 4 đang tracking" },
                { ok: true, label: "Hình ảnh có alt text đầy đủ" },
                { ok: false, label: "Tốc độ LCP mobile < 2.5s" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-3 py-2 ${i > 0 ? `border-t ${t.divider}` : ""}`}>
                  {item.ok
                    ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    : <AlertCircle className="h-4 w-4 shrink-0 text-amber-400" />}
                  <span className={`text-sm ${item.ok ? t.text : t.textMuted}`}>{item.label}</span>
                  <span className={`ml-auto text-xs font-semibold rounded-full px-2 py-0.5 ${item.ok ? t.badgeGreen : t.badgeAmber}`}>
                    {item.ok ? "OK" : "Cần làm"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
