import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, ExternalLink, Eye, EyeOff, Tag, Clock, Calendar } from "lucide-react";
import { ARTICLES, CATEGORIES, type Article } from "@/features/legacy-core/articles";
import type { TC } from "./types";
import { generateSlug } from "@/lib/slug";

type BlogItem = Article & { id?: string; status: "published" | "draft" };

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY_FORM: BlogItem = {
  slug: "",
  category: "seo",
  categoryColor: "#16a34a",
  title: "",
  excerpt: "",
  content: "",
  cover: "",
  author: "",
  authorRole: "",
  date: new Date().toLocaleDateString("vi-VN"),
  readTime: 5,
  tags: [],
  status: "published",
};

const CATEGORY_COLORS: Record<string, string> = {
  seo: "#16a34a",
  "thiet-ke": "#2563eb",
  "kinh-doanh": "#d97706",
  "cong-nghe": "#7c3aed",
};

const STATUS_LABELS: Record<string, { label: string; cls: string }> = {
  published: { label: "Đã đăng", cls: "bg-emerald-500/15 text-emerald-400" },
  draft: { label: "Nháp", cls: "bg-amber-500/15 text-amber-400" },
};

export function BlogManager({ t, isDark }: Props) {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<BlogItem>(EMPTY_FORM);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      const mapped = data.map((a: any) => ({
        id: a.id,
        slug: a.slug,
        category: a.category,
        categoryColor: a.categoryColor,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content,
        cover: a.cover,
        author: a.author,
        authorRole: a.authorRole,
        date: new Date(a.publishedAt).toLocaleDateString("vi-VN"),
        readTime: a.readTime,
        tags: a.tags,
        status: a.published ? "published" : "draft",
      }));
      setItems(mapped);
    } catch (err) {
      console.error(err);
      // Fallback
      setItems(ARTICLES.map((a) => ({ ...a, status: "published" as const })));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const result = await res.json();
      setForm((f) => ({ ...f, cover: result.url }));
    } catch (err: any) {
      alert("Lỗi khi tải ảnh lên: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const filtered = filterCat === "all" ? items : items.filter((a) => a.category === filterCat);

  const openAdd = () => {
    setForm({ ...EMPTY_FORM, slug: `bai-viet-${Date.now()}` });
    setTagsInput("");
    setIsAdding(true);
    setEditIdx(null);
  };

  const openEdit = (idx: number) => {
    const realIdx = items.indexOf(filtered[idx]);
    setEditIdx(realIdx);
    setForm({ ...items[realIdx] });
    setTagsInput(items[realIdx].tags.join(", "));
    setIsAdding(false);
  };

  const closeModal = () => { setEditIdx(null); setIsAdding(false); };

  const save = async () => {
    if (!form.title.trim()) return;
    const slug = isAdding
      ? generateSlug(form.title)
      : (form.slug && !form.slug.startsWith("bai-viet-")
          ? form.slug
          : generateSlug(form.title));
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const catColor = CATEGORY_COLORS[form.category] || "#D43B1F";
    const item = { ...form, slug, tags, categoryColor: catColor };

    try {
      const url = "/api/articles";
      const method = isAdding ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          published: form.status === "published",
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Có lỗi xảy ra khi lưu bài viết");
      }

      await fetchArticles();
      closeModal();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const doDelete = async () => {
    if (deleteIdx !== null) {
      const itemToDelete = filtered[deleteIdx];
      if (itemToDelete && itemToDelete.id) {
        try {
          const res = await fetch(`/api/articles?id=${itemToDelete.id}`, {
            method: "DELETE",
          });
          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || "Không thể xóa bài viết");
          }
          await fetchArticles();
        } catch (err: any) {
          alert(err.message);
        }
      } else {
        const realIdx = items.indexOf(itemToDelete);
        setItems((prev) => prev.filter((_, i) => i !== realIdx));
      }
    }
    setDeleteIdx(null);
  };

  const toggleStatus = async (idx: number) => {
    const item = filtered[idx];
    if (!item.id) return;
    try {
      const newStatus = item.status === "published" ? "draft" : "published";
      const res = await fetch("/api/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...item,
          published: newStatus === "published",
        }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Không thể thay đổi trạng thái");
      }
      await fetchArticles();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const showModal = isAdding || editIdx !== null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Bài viết</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>
            {items.filter((a) => a.status === "published").length} đã đăng · {items.filter((a) => a.status === "draft").length} nháp
          </p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm bài viết
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setFilterCat(cat.id)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${filterCat === cat.id
                ? "bg-red-600 text-white"
                : isDark ? "bg-white/8 text-white/55 hover:bg-white/12" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className={`rounded-2xl overflow-hidden ${t.card}`}>
        <table className="w-full text-sm">
          <thead>
            <tr className={`${t.tableHead}`}>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Tiêu đề</th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Danh mục</th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Tác giả</th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Ngày</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Trạng thái</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && filtered.map((article, idx) => {
              const catLabel = CATEGORIES.find((c) => c.id === article.category)?.label;
              const statusInfo = STATUS_LABELS[article.status];
              return (
                <tr key={article.slug} className={`${t.tableRow} transition`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-start gap-3">
                      {article.cover && (
                        <img src={article.cover} alt="" className="hidden sm:block h-10 w-16 shrink-0 rounded-lg object-cover" />
                      )}
                      <div className="min-w-0">
                        <p className={`font-semibold leading-snug truncate max-w-xs ${t.text}`}>{article.title}</p>
                        <div className={`mt-0.5 flex items-center gap-2 text-xs ${t.textFaint}`}>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{article.readTime} phút</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-4 py-3.5">
                    <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ backgroundColor: article.categoryColor + "22", color: article.categoryColor }}>
                      {catLabel}
                    </span>
                  </td>
                  <td className={`hidden lg:table-cell px-4 py-3.5 text-sm ${t.textMuted}`}>{article.author}</td>
                  <td className={`hidden sm:table-cell px-4 py-3.5 text-xs ${t.textFaint}`}>
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{article.date}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusInfo.cls}`}>{statusInfo.label}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/bai-viet/${article.slug}`} target="_blank" rel="noopener noreferrer"
                        className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/30 hover:text-white" : "hover:bg-gray-100 text-gray-300 hover:text-gray-600"}`}
                        title="Xem bài viết">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <button onClick={() => toggleStatus(idx)} title={article.status === "published" ? "Chuyển thành nháp" : "Đăng bài"}
                        className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/30 hover:text-amber-300" : "hover:bg-gray-100 text-gray-300 hover:text-amber-500"}`}>
                        {article.status === "published" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                      <button onClick={() => openEdit(idx)}
                        className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/30 hover:text-white" : "hover:bg-gray-100 text-gray-300 hover:text-gray-700"}`}>
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      {deleteIdx === idx ? (
                        <div className="flex gap-1">
                          <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"><Check className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setDeleteIdx(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/30" : "hover:bg-gray-100 text-gray-300"}`}><X className="h-3.5 w-3.5" /></button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteIdx(idx)}
                          className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/20 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading ? (
          <div className={`py-16 text-center ${t.textFaint}`}>Đang tải danh sách bài viết từ CSDL...</div>
        ) : filtered.length === 0 ? (
          <div className={`py-16 text-center ${t.textFaint}`}>Chưa có bài viết nào.</div>
        ) : null}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-black/60 backdrop-blur-sm">
          <div className={`my-8 w-full max-w-2xl rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm bài viết mới" : "Chỉnh sửa bài viết"}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tiêu đề *</label>
                <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Tiêu đề bài viết..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Danh mục</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                    {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Trạng thái</label>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "published" | "draft" }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                    <option value="published">Đã đăng</option>
                    <option value="draft">Nháp</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tóm tắt</label>
                <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                  rows={2} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Mô tả ngắn hiển thị trên trang danh sách..." />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Nội dung (Markdown)</label>
                <textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  rows={8} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm font-mono transition ${t.input}`}
                  placeholder="## Tiêu đề&#10;&#10;Nội dung bài viết..." />
              </div>
              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ảnh bìa *</label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  {form.cover && (
                    <img src={form.cover} alt="Preview" className="h-12 w-20 rounded-lg object-cover bg-black/20" />
                  )}
                  <div className="flex-1 w-full">
                    <input value={form.cover} onChange={(e) => setForm((f) => ({ ...f, cover: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                      placeholder="Nhập URL ảnh hoặc chọn file tải lên..." />
                  </div>
                </div>
                <div className="mt-2">
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading}
                    className="text-xs text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-500/20 file:text-red-400 hover:file:bg-red-500/30 file:cursor-pointer" />
                  {isUploading && <span className="ml-2 text-xs text-amber-400">Đang tải ảnh lên...</span>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tác giả</label>
                  <input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Chức danh tác giả</label>
                  <input value={form.authorRole} onChange={(e) => setForm((f) => ({ ...f, authorRole: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="SEO Specialist" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ngày đăng</label>
                  <input value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="05/06/2025" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Thời gian đọc (phút)</label>
                  <input type="number" value={form.readTime} onChange={(e) => setForm((f) => ({ ...f, readTime: Number(e.target.value) }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    min={1} max={60} />
                </div>
              </div>
              <div>
                <label className={`mb-1.5 flex items-center gap-1.5 text-sm font-medium ${t.textMuted}`}>
                  <Tag className="h-3.5 w-3.5" /> Tags (phân cách bằng dấu phẩy)
                </label>
                <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="SEO, Google, Local SEO" />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btnGhost}`}>Hủy</button>
              <button onClick={save} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
                {isAdding ? "Thêm bài viết" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
