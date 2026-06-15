import { useState, useEffect, useRef } from "react";
import { Plus, Pencil, Trash2, X, Check, Star, Award, Loader2, Upload } from "lucide-react";
import type { TC } from "./types";

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  roleEn: string;
  avatar: string;
  years: number;
  projects: number;
  bio: string;
  skills: string[];
  gradient: string;
  email: string;
  zalo: string;
  facebook: string;
  phone: string;
  order: number;
  active: boolean;
}

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY: TeamMember = {
  name: "",
  role: "",
  roleEn: "",
  avatar: "",
  years: 0,
  projects: 0,
  bio: "",
  skills: [],
  gradient: "linear-gradient(145deg, #2A2520 0%, #1A1A1A 50%, #3A3530 100%)",
  email: "",
  zalo: "",
  facebook: "",
  phone: "",
  order: 0,
  active: true,
};

export function TeamManager({ t, isDark }: Props) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<TeamMember>(EMPTY);
  const [skillsInput, setSkillsInput] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [yearsInput, setYearsInput] = useState("0");
  const [projectsInput, setProjectsInput] = useState("0");
  const [orderInput, setOrderInput] = useState("0");

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/team");
      if (!res.ok) throw new Error("Failed to fetch team members");
      const data = await res.json();
      setMembers(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError("Không thể tải danh sách thành viên đội ngũ.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openAdd = () => {
    setForm(EMPTY);
    setSkillsInput("");
    setYearsInput("0");
    setProjectsInput("0");
    setOrderInput("0");
    setIsAdding(true);
    setEditIdx(null);
  };

  const openEdit = (idx: number) => {
    setEditIdx(idx);
    const m = members[idx];
    setForm({ ...m });
    setSkillsInput(m.skills.join(", "));
    setYearsInput(m.years.toString());
    setProjectsInput(m.projects.toString());
    setOrderInput(m.order.toString());
    setIsAdding(false);
  };

  const closeModal = () => {
    setEditIdx(null);
    setIsAdding(false);
  };

  const save = async () => {
    if (!form.name.trim()) return;
    const skills = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);

    const updated: TeamMember = {
      ...form,
      years: parseInt(yearsInput) || 0,
      projects: parseInt(projectsInput) || 0,
      order: parseInt(orderInput) || 0,
      skills,
    };

    try {
      const url = "/api/team";
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

      await fetchMembers();
      closeModal();
    } catch (err: any) {
      console.error(err);
      alert("Lưu thông tin thành viên thất bại: " + err.message);
    }
  };

  const doDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/team?id=${encodeURIComponent(deleteId)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Delete failed");
      }
      await fetchMembers();
    } catch (err: any) {
      console.error(err);
      alert("Xóa thành viên thất bại: " + err.message);
    } finally {
      setDeleteId(null);
    }
  };

  const showModal = isAdding || editIdx !== null;
  const avatarLetter = (name: string) => name.trim().split(" ").slice(-1)[0]?.[0]?.toUpperCase() || "?";

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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Đội ngũ</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>{members.length} thành viên trong nhóm.</p>
        </div>
        <button onClick={openAdd} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
          <Plus className="h-4 w-4" /> Thêm thành viên
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3">
          <Loader2 className={`h-8 w-8 animate-spin ${isDark ? "text-white/40" : "text-gray-400"}`} />
          <span className={t.textMuted}>Đang tải danh sách thành viên...</span>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-500/10 rounded-2xl border border-red-500/20 p-5">
          <p className="text-red-400 font-semibold mb-2">{error}</p>
          <button onClick={fetchMembers} className={`text-sm underline ${t.text}`}>Thử tải lại</button>
        </div>
      ) : members.length === 0 ? (
        <div className={`text-center py-20 rounded-2xl border border-dashed p-6 ${isDark ? "border-white/10" : "border-gray-200"}`}>
          <p className={t.textMuted}>Chưa có thành viên nào.</p>
        </div>
      ) : (
        /* Cards grid */
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {members.map((member, idx) => (
            <div key={member.id} className={`rounded-2xl p-5 transition ${t.card} ${t.cardHover}`} style={{ borderLeft: `4px solid`, borderLeftColor: member.gradient.includes("#") ? member.gradient.match(/#[a-fA-F0-9]{6}/)?.[0] || "#C8A261" : "#C8A261" }}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name}
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/10" />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C8A261] text-white text-lg font-bold">
                      {avatarLetter(member.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p title={member.name} className={`font-bold truncate ${t.text}`}>{member.name}</p>
                    <p title={`${member.role}${member.roleEn ? ` (${member.roleEn})` : ""}`} className={`text-xs truncate ${t.textMuted}`}>{member.role} {member.roleEn ? `(${member.roleEn})` : ""}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => openEdit(idx)}
                    className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/35 hover:text-white" : "hover:bg-gray-100 text-gray-300 hover:text-gray-700"}`}>
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  {deleteId === member.id ? (
                    <div className="flex gap-1">
                      <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"><Check className="h-3.5 w-3.5" /></button>
                      <button onClick={() => setDeleteId(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/30" : "hover:bg-gray-100 text-gray-300"}`}><X className="h-3.5 w-3.5" /></button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteId(member.id || null)}
                      className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/20 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Exp + projects */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.badge}`}>
                  <Star className="h-3 w-3" />{member.years} năm KN
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs ${t.badge} truncate`}>
                  {member.projects} dự án
                </span>
                {member.active ? (
                  <span className="rounded-full px-2.5 py-0.5 text-xs bg-emerald-500/10 text-emerald-400">Hiển thị</span>
                ) : (
                  <span className="rounded-full px-2.5 py-0.5 text-xs bg-red-500/10 text-red-400">Ẩn</span>
                )}
              </div>

              {/* Bio */}
              <p className={`text-xs leading-relaxed line-clamp-2 mb-3 text-justify ${t.textFaint}`}>{member.bio}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span key={skill} className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${isDark ? "bg-[#C8A261]/12 text-[#C8A261]" : "bg-[#C8A261]/10 text-[#a37e40]"}`}>
                    <Award className="h-2.5 w-2.5" />{skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-black/60 backdrop-blur-sm">
          <div className={`my-8 w-full max-w-2xl rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`text-lg font-bold ${t.text}`}>{isAdding ? "Thêm thành viên" : "Chỉnh sửa thành viên"}</h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Họ và tên *</label>
                  <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Nguyễn An" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Chức vụ (VI) *</label>
                  <input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Giám đốc Sáng tạo" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Chức vụ (EN)</label>
                  <input value={form.roleEn} onChange={(e) => setForm((f) => ({ ...f, roleEn: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Creative Director" />
                </div>
              </div>

              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Màu nền Gradient</label>
                <div className="flex gap-3 items-center">
                  <div
                    style={{ background: form.gradient }}
                    className="h-10 w-24 rounded-xl border border-white/10 shrink-0 shadow-sm relative overflow-hidden flex items-center justify-center"
                  >
                    <span className="text-[10px] text-white/80 font-bold tracking-wider drop-shadow-sm uppercase">PREVIEW</span>
                  </div>
                  <input value={form.gradient} onChange={(e) => setForm((f) => ({ ...f, gradient: e.target.value }))}
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="linear-gradient(...)" />
                </div>

                {/* Preset color chips */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    { name: "Vàng Gold (An)", val: "linear-gradient(145deg, #C8A261 0%, #E8D4A8 40%, #B89240 100%)" },
                    { name: "Đen Charcoal (Đức)", val: "linear-gradient(145deg, #2A2520 0%, #1A1A1A 50%, #3A3530 100%)" },
                    { name: "Xám Bronze (Minh)", val: "linear-gradient(145deg, #8C8276 0%, #B0A898 50%, #7A7068 100%)" },
                    { name: "Tím Sẫm (Linh)", val: "linear-gradient(145deg, #4A3560 0%, #6B5080 50%, #3A2550 100%)" },
                    { name: "Xanh Rêu (Nam)", val: "linear-gradient(145deg, #1E3A3A 0%, #2A5050 50%, #163030 100%)" },
                    { name: "Đỏ Đô (Mai)", val: "linear-gradient(145deg, #3A2020 0%, #5A3030 50%, #2A1818 100%)" },
                    { name: "Xanh Dương", val: "linear-gradient(145deg, #1E3C72 0%, #2A5298 100%)" },
                    { name: "Hồng Cam", val: "linear-gradient(145deg, #F12711 0%, #F5AF19 100%)" },
                  ].map((preset) => {
                    const isSelected = form.gradient === preset.val;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, gradient: preset.val }))}
                        className={`h-8 px-2 rounded-xl text-xs transition-all border flex items-center gap-1.5 cursor-pointer`}
                        style={{
                          borderColor: isSelected ? "#C8A261" : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                          background: isSelected ? (isDark ? "rgba(200,162,97,0.12)" : "rgba(200,162,97,0.08)") : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"),
                          color: isSelected ? "#C8A261" : (isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"),
                        }}
                        title={preset.name}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm shrink-0" style={{ background: preset.val }} />
                        <span className="text-[11px] font-medium">{preset.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Kinh nghiệm (năm)</label>
                  <input
                    type="text"
                    value={yearsInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d+$/.test(val)) {
                        setYearsInput(val);
                        setForm((f) => ({ ...f, years: parseInt(val) || 0 }));
                      }
                    }}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Số dự án</label>
                  <input
                    type="text"
                    value={projectsInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "" || /^\d+$/.test(val)) {
                        setProjectsInput(val);
                        setForm((f) => ({ ...f, projects: parseInt(val) || 0 }));
                      }
                    }}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="120"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Email</label>
                  <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="an@loops.vn" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Số điện thoại</label>
                  <input value={form.phone || ""} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="0901234567" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Zalo Link</label>
                  <input value={form.zalo || ""} onChange={(e) => setForm((f) => ({ ...f, zalo: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="https://zalo.me/0901234567" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Facebook Link</label>
                  <input value={form.facebook || ""} onChange={(e) => setForm((f) => ({ ...f, facebook: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="https://facebook.com/..." />
                </div>
              </div>

              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ảnh đại diện</label>
                <div className="flex gap-3 items-start">
                  <div className="flex-1 flex flex-col gap-2">
                    <input value={form.avatar} onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`} placeholder="https://example.com/avatar.jpg" />
                    {form.avatar && (
                      <div className="h-16 w-16 rounded-full overflow-hidden border border-gray-800 relative bg-gray-950">
                        <img src={form.avatar} className="w-full h-full object-cover" alt="Preview" />
                      </div>
                    )}
                  </div>
                  <UploadButton onUploadComplete={(url) => setForm((f) => ({ ...f, avatar: url }))} />
                </div>
              </div>

              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tiểu sử</label>
                <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  rows={3} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="Kiến trúc sư của những trải nghiệm thị giác..." />
              </div>

              <div>
                <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Kỹ năng (phân cách bằng dấu phẩy)</label>
                <input value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)}
                  className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                  placeholder="UI/UX Design, Creative Strategy, Branding" />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  className="h-4 w-4 accent-[#C8A261]" />
                <div>
                  <span className={`text-sm font-medium ${t.text}`}>Kích hoạt hiển thị</span>
                  <p className={`text-xs ${t.textFaint}`}>Cho phép hiển thị thành viên này trên website</p>
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
