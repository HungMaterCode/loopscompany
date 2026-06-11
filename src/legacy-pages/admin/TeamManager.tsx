import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Star, Award } from "lucide-react";
import { TEAM } from "@/legacy-app/data";
import type { TC } from "./types";

interface TeamMember {
  name: string;
  role: string;
  exp: string;
  specialty: string;
  bio: string;
  skills: string[];
  photo?: string;
}

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY: TeamMember = { name: "", role: "", exp: "", specialty: "", bio: "", skills: [], photo: "" };

export function TeamManager({ t, isDark }: Props) {
  const [members, setMembers]     = useState<TeamMember[]>(
    TEAM.map((m) => ({ name: m.name, role: m.role, exp: m.exp, specialty: m.specialty, bio: m.bio, skills: m.skills, photo: m.photo }))
  );
  const [editIdx, setEditIdx]     = useState<number | null>(null);
  const [isAdding, setIsAdding]   = useState(false);
  const [form, setForm]           = useState<TeamMember>(EMPTY);
  const [skillsInput, setSkillsInput] = useState("");
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const openAdd = () => {
    setForm(EMPTY);
    setSkillsInput("");
    setIsAdding(true);
    setEditIdx(null);
  };

  const openEdit = (idx: number) => {
    setEditIdx(idx);
    setForm({ ...members[idx] });
    setSkillsInput(members[idx].skills.join(", "));
    setIsAdding(false);
  };

  const closeModal = () => { setEditIdx(null); setIsAdding(false); };

  const save = () => {
    if (!form.name.trim()) return;
    const skills = skillsInput.split(",").map((s) => s.trim()).filter(Boolean);
    const member: TeamMember = { ...form, skills };
    if (isAdding) {
      setMembers((prev) => [...prev, member]);
    } else if (editIdx !== null) {
      setMembers((prev) => prev.map((m, i) => i === editIdx ? member : m));
    }
    closeModal();
  };

  const doDelete = () => {
    if (deleteIdx !== null) setMembers((prev) => prev.filter((_, i) => i !== deleteIdx));
    setDeleteIdx(null);
  };

  const showModal = isAdding || editIdx !== null;

  const avatarLetter = (name: string) => name.trim().split(" ").slice(-1)[0]?.[0]?.toUpperCase() || "?";

  const ROLE_COLORS = [
    "from-red-500 to-orange-400",
    "from-rose-400 to-fuchsia-500",
    "from-blue-500 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-red-500",
    "from-violet-400 to-purple-500",
  ];

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

      {/* Cards grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member, idx) => (
          <div key={idx} className={`rounded-2xl p-5 transition ${t.card} ${t.cardHover}`}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                {member.photo ? (
                  <img src={member.photo} alt={member.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-white/10" />
                ) : (
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${ROLE_COLORS[idx % ROLE_COLORS.length]} text-white text-lg font-bold`}>
                    {avatarLetter(member.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className={`font-bold truncate ${t.text}`}>{member.name}</p>
                  <p className={`text-xs truncate ${t.textMuted}`}>{member.role}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => openEdit(idx)}
                  className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/35 hover:text-white" : "hover:bg-gray-100 text-gray-300 hover:text-gray-700"}`}>
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
            </div>

            {/* Exp + specialty */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.badge}`}>
                <Star className="h-3 w-3" />{member.exp}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs ${t.badge} truncate max-w-[160px]`}>{member.specialty}</span>
            </div>

            {/* Bio */}
            <p className={`text-xs leading-relaxed line-clamp-2 mb-3 ${t.textFaint}`}>{member.bio}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {member.skills.map((skill) => (
                <span key={skill} className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${isDark ? "bg-red-500/12 text-red-300" : "bg-red-50 text-red-600"}`}>
                  <Award className="h-2.5 w-2.5" />{skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {members.length === 0 && (
        <div className={`rounded-2xl py-16 text-center ${t.card} ${t.textFaint}`}>Chưa có thành viên nào.</div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 bg-black/60 backdrop-blur-sm">
          <div className={`my-8 w-full max-w-lg rounded-2xl p-6 ${t.modal}`}>
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
                    placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Chức vụ *</label>
                  <input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Giám Đốc & Nhà Sáng Lập" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Kinh nghiệm</label>
                  <input value={form.exp} onChange={(e) => setForm((f) => ({ ...f, exp: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="12 năm" />
                </div>
                <div className="col-span-2">
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Chuyên môn</label>
                  <input value={form.specialty} onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Chiến lược & Phát triển kinh doanh" />
                </div>
                <div className="col-span-2">
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tiểu sử</label>
                  <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                    rows={3} className={`w-full resize-none rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="Mô tả kinh nghiệm và thành tích..." />
                </div>
                <div className="col-span-2">
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Kỹ năng (phân cách bằng dấu phẩy)</label>
                  <input value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="React, Node.js, SEO Tech" />
                </div>
                <div className="col-span-2">
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>URL ảnh đại diện</label>
                  <input value={form.photo || ""} onChange={(e) => setForm((f) => ({ ...f, photo: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="https://images.unsplash.com/..." />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btnGhost}`}>Hủy</button>
              <button onClick={save} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
                {isAdding ? "Thêm thành viên" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
