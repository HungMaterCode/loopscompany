import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Check, ShieldCheck, ShieldOff, Mail, Phone, UserCircle2 } from "lucide-react";
import type { TC } from "./types";

interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  joinDate: string;
  status: "active" | "inactive";
  role: "user" | "admin";
}

interface Props {
  t: TC;
  isDark: boolean;
}

const EMPTY: UserItem = { id: "", name: "", email: "", phone: "", plan: "W-01 — 189K/tháng", joinDate: "", status: "active", role: "user" };
const PLANS = ["W-01 — 189K/tháng", "W-02 — 589K/tháng", "W-03 — 889K/tháng", "W-04 — 1.189K/tháng"];

export function UsersManager({ t, isDark }: Props) {
  const [users, setUsers]         = useState<UserItem[]>([]);
  const [loading, setLoading]     = useState(true);
  const [editIdx, setEditIdx]     = useState<number | null>(null);
  const [isAdding, setIsAdding]   = useState(false);
  const [form, setForm]           = useState<UserItem>(EMPTY);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [filter, setFilter]       = useState<"all" | "active" | "inactive">("all");
  const [search, setSearch]       = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone || "",
          plan: u.plan || "—",
          joinDate: new Date(u.createdAt).toLocaleDateString("vi-VN"),
          status: u.status || "active",
          role: u.role || "user"
        })));
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const filtered = users.filter((u) => {
    const matchStatus = filter === "all" || u.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const activeCount   = users.filter((u) => u.status === "active").length;
  const inactiveCount = users.filter((u) => u.status === "inactive").length;

  const openAdd = () => {
    setForm({ ...EMPTY, id: `u${Date.now()}`, joinDate: new Date().toLocaleDateString("vi-VN") });
    setIsAdding(true);
    setEditIdx(null);
  };

  const openEdit = (idx: number) => {
    const realIdx = users.indexOf(filtered[idx]);
    setEditIdx(realIdx);
    setForm({ ...users[realIdx] });
    setIsAdding(false);
  };

  const closeModal = () => { setEditIdx(null); setIsAdding(false); };

  const save = async () => {
    if (!form.name.trim() || !form.email.trim()) return;
    try {
      if (isAdding) {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        if (res.ok) await fetchUsers();
      } else if (editIdx !== null) {
        const res = await fetch(`/api/admin/users/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        if (res.ok) await fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
    closeModal();
  };

  const doDelete = async () => {
    if (deleteIdx !== null) {
      const userToDel = filtered[deleteIdx];
      try {
        const res = await fetch(`/api/admin/users/${userToDel.id}`, { method: "DELETE" });
        if (res.ok) await fetchUsers();
      } catch (e) {
        console.error(e);
      }
    }
    setDeleteIdx(null);
  };

  const toggleStatus = async (idx: number) => {
    const userToToggle = filtered[idx];
    const newStatus = userToToggle.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch(`/api/admin/users/${userToToggle.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userToToggle, status: newStatus })
      });
      if (res.ok) await fetchUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const showModal = isAdding || editIdx !== null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Người dùng</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>{activeCount} đang hoạt động · {inactiveCount} tạm khóa</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng người dùng", value: users.length, color: "from-blue-500 to-indigo-500" },
          { label: "Đang hoạt động",  value: activeCount,  color: "from-emerald-400 to-teal-500" },
          { label: "Tạm khóa",        value: inactiveCount, color: "from-amber-400 to-red-500" },
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
          {(["all", "active", "inactive"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                filter === f ? "bg-red-600 text-white" : isDark ? "bg-white/8 text-white/55 hover:bg-white/12" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              {f === "all" ? "Tất cả" : f === "active" ? "Hoạt động" : "Tạm khóa"}
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
              <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Gói</th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Ngày đăng ký</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">Trạng thái</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, idx) => (
              <tr key={user.id} className={`${t.tableRow} transition`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${user.role === "admin" ? "bg-red-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"}`}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-semibold ${t.text}`}>{user.name}</p>
                      {user.role === "admin" && <span className="text-xs text-red-400 font-medium">Admin</span>}
                    </div>
                  </div>
                </td>
                <td className={`hidden md:table-cell px-4 py-3.5 ${t.textMuted}`}>
                  <div className="space-y-0.5 text-xs">
                    <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{user.email}</div>
                    <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{user.phone}</div>
                  </div>
                </td>
                <td className={`hidden lg:table-cell px-4 py-3.5 text-xs font-medium ${t.textMuted}`}>{user.plan}</td>
                <td className={`hidden sm:table-cell px-4 py-3.5 text-xs ${t.textFaint}`}>{user.joinDate}</td>
                <td className="px-4 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.status === "active" ? t.badgeGreen : t.badgeAmber}`}>
                    {user.status === "active" ? "Hoạt động" : "Tạm khóa"}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => toggleStatus(idx)} title={user.status === "active" ? "Tạm khóa" : "Kích hoạt"}
                      className={`rounded-lg p-1.5 transition ${isDark ? "hover:bg-white/10 text-white/30 hover:text-amber-300" : "hover:bg-gray-100 text-gray-300 hover:text-amber-500"}`}>
                      {user.status === "active" ? <ShieldOff className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
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
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className={`py-16 text-center ${t.textFaint}`}>Không tìm thấy người dùng.</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl p-6 ${t.modal}`}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className={`flex items-center gap-2 text-lg font-bold ${t.text}`}>
                <UserCircle2 className="h-5 w-5" />
                {isAdding ? "Thêm người dùng" : "Chỉnh sửa người dùng"}
              </h3>
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
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="email@domain.com" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Số điện thoại</label>
                  <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="0901 234 567" />
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Gói dịch vụ</label>
                  <select value={form.plan} onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                    {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Vai trò</label>
                  <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as "user" | "admin" }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                    <option value="user">Người dùng</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Trạng thái</label>
                  <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as "active" | "inactive" }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Tạm khóa</option>
                  </select>
                </div>
                <div>
                  <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Ngày đăng ký</label>
                  <input value={form.joinDate} onChange={(e) => setForm((f) => ({ ...f, joinDate: e.target.value }))}
                    className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input}`}
                    placeholder="01/01/2025" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={closeModal} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btnGhost}`}>Hủy</button>
              <button onClick={save} className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${t.btn}`}>
                {isAdding ? "Thêm người dùng" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
