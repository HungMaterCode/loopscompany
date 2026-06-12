import { useState, useEffect } from "react";
import { Trash2, X, Check, Mail, UserCircle2, Pencil } from "lucide-react";
import type { TC } from "./types";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  googleId?: string | null;
}

interface Props {
  t: TC;
  isDark: boolean;
}

export function UsersManager({ t, isDark }: Props) {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<UserItem> & { password?: string }>({});
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "admin" | "user">("all");
  const [search, setSearch] = useState("");
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const matchStatus = filter === "all" || u.role === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  const openEdit = (idx: number) => {
    const realIdx = users.indexOf(filtered[idx]);
    setEditIdx(realIdx);
    setForm({ ...users[realIdx], password: "" });
    setIsEditingPassword(false);
  };

  const closeModal = () => { setEditIdx(null); };

  const save = async () => {
    if (editIdx !== null && form.id) {
      try {
        await fetch(`/api/admin/users/${form.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: form.role, password: form.password })
        });
        setUsers((prev) => prev.map((u, i) => i === editIdx ? { ...u, role: form.role as "user"|"admin" } : u));
      } catch (e) {
        console.error(e);
      }
    }
    closeModal();
  };

  const doDelete = async () => {
    if (deleteIdx !== null) {
      const realIdx = users.indexOf(filtered[deleteIdx]);
      const user = users[realIdx];
      try {
        await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
        setUsers((prev) => prev.filter((_, i) => i !== realIdx));
      } catch (e) {
        console.error(e);
      }
    }
    setDeleteIdx(null);
  };

  const showModal = editIdx !== null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Người dùng</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>{users.length} tổng cộng · {adminCount} Quản trị viên</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng người dùng", value: users.length, color: "from-blue-500 to-indigo-500" },
          { label: "Quản trị viên (Admin)",  value: adminCount,  color: "from-red-400 to-rose-500" },
          { label: "Khách hàng (User)",        value: userCount, color: "from-emerald-400 to-teal-500" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-4 ${t.card}`}>
            <div className={`mb-2 text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
            <div className={`text-xs ${t.textFaint}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {(["all", "admin", "user"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filter === f ? "bg-red-600 text-white" : isDark ? "bg-white/8 text-white/55 hover:bg-white/12" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {f === "all" ? "Tất cả" : f === "admin" ? "Admin" : "User"}
            </button>
          ))}
        </div>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên, email..."
          className={`ml-auto rounded-xl px-3 py-2 text-sm w-56 transition ${t.input}`} />
      </div>

      {/* Table */}
      <div className={`rounded-2xl overflow-hidden ${t.card}`}>
        <table className="w-full text-sm">
          <thead>
            <tr className={t.tableHead}>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">Người dùng</th>
              <th className="hidden md:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Liên hệ</th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Ngày tham gia</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Vai trò</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="py-10 text-center">Đang tải...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={5} className={`py-16 text-center ${t.textFaint}`}>Không tìm thấy người dùng.</td></tr>
            ) : (
              filtered.map((user, idx) => (
                <tr key={user.id} className={`${t.tableRow} transition`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${user.role === "admin" ? "bg-red-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className={`font-semibold ${t.text}`}>{user.name}</p>
                        {user.googleId && <span className="text-xs text-blue-400 font-medium">Google Auth</span>}
                      </div>
                    </div>
                  </td>
                  <td className={`hidden md:table-cell px-4 py-3.5 ${t.textMuted}`}>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{user.email}</div>
                    </div>
                  </td>
                  <td className={`hidden sm:table-cell px-4 py-3.5 text-xs ${t.textFaint}`}>{new Date(user.createdAt).toLocaleDateString("vi-VN")}</td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.role === "admin" ? t.badgeAmber : t.badgeGreen}`}>
                      {user.role === "admin" ? "Admin" : "Người dùng"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(idx)}
                        className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/30 hover:text-white" : "hover:bg-gray-100 text-gray-300 hover:text-gray-700"}`}
                        title="Chi tiết & Đặt quyền">
                        <UserCircle2 className="h-4 w-4" />
                      </button>
                      {deleteIdx === idx ? (
                        <div className="flex gap-1">
                          <button onClick={doDelete} className="rounded-lg p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition" title="Xác nhận xóa"><Check className="h-3.5 w-3.5" /></button>
                          <button onClick={() => setDeleteIdx(null)} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/30" : "hover:bg-gray-100 text-gray-300"}`}><X className="h-3.5 w-3.5" /></button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteIdx(idx)}
                          className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-red-500/15 text-white/20 hover:text-red-300" : "hover:bg-red-50 text-gray-300 hover:text-red-500"}`}
                          title="Xóa người dùng">
                          <Trash2 className="h-3.5 w-3.5" />
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`flex items-center gap-2 text-lg font-bold ${t.text}`}>
                <UserCircle2 className="h-5 w-5" />
                Chi tiết & Phân quyền
              </h3>
              <button onClick={closeModal} className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/50" : "hover:bg-gray-100 text-gray-400"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Họ và tên</label>
                  <input value={form.name || ""} readOnly
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} opacity-70 cursor-not-allowed`} />
                </div>
                <div className="col-span-2">
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Email</label>
                  <input value={form.email || ""} readOnly
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} opacity-70 cursor-not-allowed`} />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ngày tham gia</label>
                  <input value={form.createdAt ? new Date(form.createdAt).toLocaleDateString("vi-VN") : ""} readOnly
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} opacity-70 cursor-not-allowed`} />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Cấp quyền</label>
                  <select value={form.role || "user"} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "user" | "admin" }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                    <option value="user">Người dùng (User)</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>
                {form.role === "admin" && (
                  <div className="col-span-2">
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Mật khẩu mới</label>
                    {!isEditingPassword ? (
                      <div className={`flex items-center justify-between w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} opacity-80`}>
                        <span className="text-gray-500 font-medium">admin123</span>
                        <button onClick={() => setIsEditingPassword(true)} className="text-blue-500 hover:text-blue-600 transition p-1" title="Đổi mật khẩu">
                          <Pencil className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <input 
                        type="text"
                        value={form.password || ""} 
                        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                        className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                        placeholder="Nhập mật khẩu mới..."
                        autoFocus
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btnGhost}`}>Đóng</button>
              <button onClick={save} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
                Lưu quyền hạn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
