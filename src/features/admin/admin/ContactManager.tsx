import { useState, useEffect, useMemo } from "react";
import { Trash2, X, Check, Mail, MessageSquare, Eye, Search } from "lucide-react";
import type { TC } from "./types";

interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  source: string;
  status: string;
  createdAt: string;
}

interface Props {
  t: TC;
  isDark: boolean;
}

export function ContactManager({ t, isDark }: Props) {
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [viewLead, setViewLead] = useState<ContactLead | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => 
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.phone && l.phone.includes(search))
    );
  }, [leads, search]);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      const data = await res.json();
      if (Array.isArray(data)) {
        setLeads(data);
      } else {
        console.error("Lỗi từ API:", data);
        setLeads([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    } catch (e) {
      console.error(e);
    }
  };

  const doDelete = async () => {
    if (deleteIdx !== null) {
      const lead = leads[deleteIdx];
      try {
        await fetch(`/api/admin/contacts/${lead.id}`, { method: "DELETE" });
        setLeads((prev) => prev.filter((_, i) => i !== deleteIdx));
      } catch (e) {
        console.error(e);
      }
    }
    setDeleteIdx(null);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`text-2xl font-semibold tracking-tight ${t.text}`}>Danh sách Liên hệ</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý các yêu cầu tư vấn từ khách hàng.</p>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${t.textMuted}`} />
          <input
            type="text"
            placeholder="Tìm theo tên, email, SĐT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-sm rounded-xl outline-none transition-shadow ${t.input}`}
          />
        </div>
      </div>

      {/* List */}
      <div className={`overflow-hidden rounded-2xl ${t.card}`}>
        {loading ? (
          <div className="p-8 text-center"><div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent" /></div>
        ) : leads.length === 0 ? (
          <div className={`p-12 text-center ${t.textMuted}`}>
            <MessageSquare className="mx-auto mb-3 h-8 w-8 opacity-20" />
            <p>Chưa có yêu cầu liên hệ nào.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className={`bg-black/5 text-xs uppercase ${t.tableHead}`}>
                <tr>
                  <th className="px-5 py-4 font-medium">Khách hàng</th>
                  <th className="px-5 py-4 font-medium">Liên hệ</th>
                  <th className="px-5 py-4 font-medium max-w-[300px]">Nội dung</th>
                  <th className="px-5 py-4 font-medium">Trạng thái</th>
                  <th className="px-5 py-4 font-medium">Thời gian</th>
                  <th className="px-5 py-4 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((l, i) => (
                  <tr key={l.id} className={`group ${t.tableRow}`}>
                    <td className="px-5 py-4">
                      <div className={`font-medium ${t.text}`}>{l.name}</div>
                      <div className={`text-xs ${t.textMuted} mt-1`}>Nguồn: {l.source}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 opacity-50" /> {l.email}</div>
                      {l.phone && <div className={`mt-1 text-xs ${t.textMuted}`}>{l.phone}</div>}
                    </td>
                    <td className={`px-5 py-4 max-w-[300px] truncate ${t.textMuted}`} title={l.message}>
                      {l.message}
                    </td>
                    <td className="px-5 py-4">
                      {l.status === "contacted" ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-xs font-medium border border-emerald-500/20">
                          <Check className="h-3.5 w-3.5" />
                          Đã liên hệ
                        </div>
                      ) : (
                        <select 
                          value={["new", "Mới"].includes(l.status) ? "uncontacted" : l.status}
                          onChange={(e) => updateStatus(l.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-lg outline-none ${t.input} cursor-pointer`}
                        >
                          <option value="uncontacted">Chưa liên hệ</option>
                          <option value="contacted">Đã liên hệ</option>
                        </select>
                      )}
                    </td>
                    <td className={`px-5 py-4 whitespace-nowrap ${t.textMuted}`}>
                      {new Date(l.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => setViewLead(l)} className={`p-1.5 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/10 ${t.textMuted} hover:${t.text}`} title="Xem chi tiết">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteIdx(i)} className={`p-1.5 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500/10 text-red-400`} title="Xóa">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl ${t.modal}`}>
            <h3 className={`text-lg font-semibold ${t.text}`}>Xóa liên hệ?</h3>
            <p className={`mt-2 text-sm ${t.textMuted}`}>Bạn có chắc chắn muốn xóa vĩnh viễn yêu cầu này?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteIdx(null)} className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${t.btnGhost}`}>Hủy</button>
              <button onClick={doDelete} className="px-4 py-2 text-sm font-medium rounded-xl transition-colors bg-red-500 hover:bg-red-600 text-white shadow-sm">Xóa vĩnh viễn</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl ${t.modal}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className={`text-xl font-semibold ${t.text}`}>Chi tiết Liên hệ</h3>
              <button onClick={() => setViewLead(null)} className={`p-1 rounded-md hover:bg-white/10 ${t.textMuted}`}><X className="w-5 h-5"/></button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Khách hàng</label>
                  <p className={`font-medium ${t.text} mt-1`}>{viewLead.name}</p>
                </div>
                <div>
                  <p className={`font-medium ${t.text} mt-1`}>
                    {["uncontacted", "new", "Mới"].includes(viewLead.status) ? "Chưa liên hệ" : "Đã liên hệ"}
                  </p>
                </div>
              </div>

              <div>
                <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Thông tin liên lạc</label>
                <div className="mt-1 space-y-1">
                  <p className={`text-sm ${t.text}`}>Email: {viewLead.email}</p>
                  {viewLead.phone && <p className={`text-sm ${t.text}`}>SĐT: {viewLead.phone}</p>}
                </div>
              </div>

              <div>
                <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Nội dung</label>
                <div className={`mt-2 p-3 rounded-xl bg-black/20 border border-white/5 text-sm ${t.text} whitespace-pre-wrap`}>
                  {viewLead.message}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Nguồn</label>
                  <p className={`text-sm ${t.text} mt-1`}>{viewLead.source}</p>
                </div>
                <div>
                  <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Thời gian</label>
                  <p className={`text-sm ${t.text} mt-1`}>{new Date(viewLead.createdAt).toLocaleString("vi-VN")}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={() => setViewLead(null)} className={`px-5 py-2 text-sm font-medium rounded-xl transition-colors ${t.btnGhost}`}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
