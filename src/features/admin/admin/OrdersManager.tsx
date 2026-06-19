import { useState, useEffect, useMemo } from "react";
import { Trash2, X, Check, Mail, Eye, Search, FileText, ShoppingBag, Globe, Server, TrendingUp } from "lucide-react";
import type { TC } from "./types";

interface Order {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string | null;
  type: string;
  details: any;
  status: string;
  createdAt: string;
}

interface Props {
  t: TC;
  isDark: boolean;
}

export function OrdersManager({ t, isDark }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesSearch = 
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase()) ||
        o.code.toLowerCase().includes(search.toLowerCase()) ||
        (o.phone && o.phone.includes(search));
      
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Lỗi từ API:", data);
        setOrders([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    } catch (e) {
      console.error(e);
    }
  };

  const doDelete = async () => {
    if (deleteIdx !== null) {
      const order = orders[deleteIdx];
      try {
        await fetch(`/api/admin/orders/${order.id}`, { method: "DELETE" });
        setOrders((prev) => prev.filter((_, i) => i !== deleteIdx));
      } catch (e) {
        console.error(e);
      }
    }
    setDeleteIdx(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-sky-500/10 text-sky-500 dark:text-sky-400 border border-sky-500/20";
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20";
      case "cancelled":
        return "bg-white/5 text-white/50 border border-white/10";
      default:
        return "bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "processing": return "Đang thực thi";
      case "completed": return "Đã hoàn thành";
      case "cancelled": return "Đã hủy";
      default: return "Đang chờ xử lý";
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className={`text-2xl font-semibold tracking-tight ${t.text}`}>Danh sách Đơn hàng</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Quản lý hợp đồng, chu kỳ thuê và đơn mua website.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Lọc theo trạng thái */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`text-sm px-3 py-2 rounded-xl outline-none transition-shadow ${t.input} cursor-pointer min-w-[150px]`}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Đang chờ xử lý</option>
            <option value="processing">Đang thực thi</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>

          {/* Tìm kiếm */}
          <div className="relative w-full max-w-xs">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${t.textMuted}`} />
            <input
              type="text"
              placeholder="Tìm theo mã, tên, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 text-sm rounded-xl outline-none transition-shadow ${t.input}`}
            />
          </div>
        </div>
      </div>

      {/* List */}
      <div className={`overflow-hidden rounded-2xl ${t.card}`}>
        {loading ? (
          <div className="p-8 text-center"><div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" /></div>
        ) : orders.length === 0 ? (
          <div className={`p-12 text-center ${t.textMuted}`}>
            <ShoppingBag className="mx-auto mb-3 h-8 w-8 opacity-20" />
            <p>Chưa có đơn hàng nào được tạo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className={`bg-black/5 text-xs uppercase ${t.tableHead}`}>
                <tr>
                  <th className="px-5 py-4 font-medium">Mã đơn</th>
                  <th className="px-5 py-4 font-medium">Khách hàng</th>
                  <th className="px-5 py-4 font-medium">Dịch vụ</th>
                  <th className="px-5 py-4 font-medium">Tổng tiền</th>
                  <th className="px-5 py-4 font-medium">Trạng thái</th>
                  <th className="px-5 py-4 font-medium">Ngày tạo</th>
                  <th className="px-5 py-4 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((o, i) => {
                  let displayTotal = "0đ";
                  if (o.details) {
                    if (o.type === "rental") {
                      displayTotal = `${Number(o.details.packagePrice || 0).toLocaleString("vi-VN")} đ/tháng`;
                    } else {
                      const pkgPrice = Number(o.details.packagePrice || 0);
                      const domainsPrice = (o.details.domains || []).reduce((sum: number, d: any) => sum + Number(d.price || 0), 0);
                      const hostingPrice = Number(o.details.hosting?.price || 0);
                      const seoPrice = Number(o.details.seoPackage?.price || 0);
                      const subtotal = pkgPrice + domainsPrice + hostingPrice + seoPrice;
                      const vat = Math.round(subtotal * 0.1);
                      displayTotal = `${(subtotal + vat).toLocaleString("vi-VN")}đ`;
                    }
                  }

                  return (
                    <tr key={o.id} className={`group ${t.tableRow}`}>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-amber-500">{o.code}</span>
                      </td>
                      <td className="px-5 py-4">
                        <div className={`font-medium ${t.text}`}>{o.name}</div>
                        <div className={`text-xs ${t.textMuted} mt-0.5`}>{o.email}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className={`font-medium ${t.text}`}>
                          {o.type === "rental" ? "Thuê Web" : "Mua Web"}
                        </div>
                        <div className={`text-xs ${t.textMuted} mt-0.5`}>{o.details?.packageName}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-semibold text-white">{displayTotal}</span>
                      </td>
                      <td className="px-5 py-4">
                        <select 
                          value={o.status}
                          onChange={(e) => updateStatus(o.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-lg outline-none ${t.input} cursor-pointer`}
                        >
                          <option value="pending">Đang chờ xử lý</option>
                          <option value="processing">Đang thực thi</option>
                          <option value="completed">Đã hoàn thành</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                      </td>
                      <td className={`px-5 py-4 whitespace-nowrap ${t.textMuted}`}>
                        {new Date(o.createdAt).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => setViewOrder(o)} className={`p-1.5 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/10 ${t.textMuted} hover:${t.text}`} title="Xem chi tiết">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button onClick={() => setDeleteIdx(i)} className={`p-1.5 rounded-lg opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-500/10 text-red-400`} title="Xóa">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl ${t.modal}`}>
            <h3 className={`text-lg font-semibold ${t.text}`}>Xóa đơn hàng?</h3>
            <p className={`mt-2 text-sm ${t.textMuted}`}>Bạn có chắc chắn muốn xóa vĩnh viễn đơn hàng này?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleteIdx(null)} className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${t.btnGhost}`}>Hủy</button>
              <button onClick={doDelete} className="px-4 py-2 text-sm font-medium rounded-xl transition-colors bg-red-500 hover:bg-red-600 text-white shadow-sm">Xóa vĩnh viễn</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl ${t.modal}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <h3 className={`text-xl font-semibold ${t.text}`}>Chi tiết Đơn hàng</h3>
                <span className="text-sm font-semibold text-amber-500">({viewOrder.code})</span>
              </div>
              <button onClick={() => setViewOrder(null)} className={`p-1 rounded-md hover:bg-white/10 ${t.textMuted}`}><X className="w-5 h-5"/></button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Khách hàng</label>
                  <p className={`font-medium ${t.text} mt-1`}>{viewOrder.name}</p>
                </div>
                <div>
                  <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Trạng thái</label>
                  <p className={`mt-1 font-semibold text-sm`}>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusBadge(viewOrder.status)}`}>
                      {getStatusLabel(viewOrder.status)}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Thông tin liên lạc</label>
                <div className="mt-1 space-y-1">
                  <p className={`text-sm ${t.text}`}>Email: {viewOrder.email}</p>
                  {viewOrder.phone && <p className={`text-sm ${t.text}`}>SĐT: {viewOrder.phone}</p>}
                </div>
              </div>

              {/* RENTAL DETAILS */}
              {viewOrder.type === "rental" && viewOrder.details && (() => {
                const pPrice = Number(viewOrder.details.packagePrice || 0);
                const billingText = viewOrder.details.billingCycle === "yearly" ? "Thanh toán hàng năm (đã giảm 20%)" : "Thanh toán hàng tháng";
                return (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <label className="text-xs uppercase font-semibold tracking-wider text-amber-500 block">Thông tin gói thuê</label>
                    <div className="text-sm space-y-1.5">
                      <p className={t.text}>
                        <span className="opacity-70">Gói thuê:</span> <strong className="font-semibold">{viewOrder.details.packageName || "N/A"}</strong>
                      </p>
                      <p className={t.text}>
                        <span className="opacity-70">Đơn giá:</span> <strong className="font-semibold">{pPrice.toLocaleString("vi-VN")} đ/tháng</strong>
                      </p>
                      <p className={t.text}>
                        <span className="opacity-70">Chu kỳ:</span> <strong className="font-semibold text-amber-400/90">{billingText}</strong>
                      </p>
                      <div className="border-t border-amber-500/20 my-2 pt-2 flex justify-between items-center">
                        <span className="opacity-70 text-xs font-semibold">TỔNG CỘNG:</span>
                        <strong className="font-bold text-amber-400 text-base">{pPrice.toLocaleString("vi-VN")} đ/tháng</strong>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* PURCHASE DETAILS */}
              {viewOrder.type === "purchase" && viewOrder.details && (() => {
                const pkgPrice = Number(viewOrder.details.packagePrice || 0);
                const domainsPrice = (viewOrder.details.domains || []).reduce((sum: number, d: any) => sum + Number(d.price || 0), 0);
                const hostingPrice = Number(viewOrder.details.hosting?.price || 0);
                const seoPrice = Number(viewOrder.details.seoPackage?.price || 0);
                const subtotal = pkgPrice + domainsPrice + hostingPrice + seoPrice;
                const vat = Math.round(subtotal * 0.1);
                const total = subtotal + vat;

                return (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                    <label className="text-xs uppercase font-semibold tracking-wider text-amber-500 block">Chi tiết mua website</label>
                    <div className="text-sm space-y-2">
                      <p className={t.text}>
                        <span className="opacity-70">Gói web:</span> <strong className="font-semibold">{viewOrder.details.packageName || "N/A"} ({pkgPrice.toLocaleString("vi-VN")}đ)</strong>
                      </p>
                      
                      {viewOrder.details.domains && Array.isArray(viewOrder.details.domains) && viewOrder.details.domains.length > 0 && (
                        <div>
                          <span className="opacity-70 text-xs block mb-1">Tên miền đã chọn:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {viewOrder.details.domains.map((dom: any, idx: number) => (
                              <span key={idx} className="px-2 py-0.5 text-xs rounded-md bg-black/30 border border-white/10 text-white">
                                {dom.name} ({Number(dom.price).toLocaleString("vi-VN")}đ)
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {viewOrder.details.hosting && (
                        <p className={t.text}>
                          <span className="opacity-70">Hosting:</span> <strong className="font-semibold">{viewOrder.details.hosting.label || viewOrder.details.hosting} {viewOrder.details.hosting.price ? `(+${Number(viewOrder.details.hosting.price).toLocaleString("vi-VN")}đ)` : ""}</strong>
                        </p>
                      )}

                      {viewOrder.details.seoPackage && (
                        <p className={t.text}>
                          <span className="opacity-70">Gói SEO:</span> <strong className="font-semibold">{viewOrder.details.seoPackage.label || viewOrder.details.seoPackage} {viewOrder.details.seoPackage.price ? `(${Number(viewOrder.details.seoPackage.price).toLocaleString("vi-VN")}đ)` : ""}</strong>
                        </p>
                      )}

                      <div className="border-t border-amber-500/20 mt-3 pt-2.5 space-y-1">
                        <div className="flex justify-between items-center text-xs opacity-75">
                          <span>Tạm tính:</span>
                          <span>{subtotal.toLocaleString("vi-VN")}đ</span>
                        </div>
                        <div className="flex justify-between items-center text-xs opacity-75">
                          <span>Thuế VAT (10%):</span>
                          <span>{vat.toLocaleString("vi-VN")}đ</span>
                        </div>
                        <div className="flex justify-between items-center pt-1.5 border-t border-dashed border-amber-500/10">
                          <span className="text-xs font-semibold text-amber-500">TỔNG CỘNG:</span>
                          <strong className="font-bold text-amber-400 text-base">{total.toLocaleString("vi-VN")}đ</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div>
                <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Ghi chú khách hàng</label>
                <div className={`mt-2 p-3 rounded-xl bg-black/20 border border-white/5 text-sm ${t.text} whitespace-pre-wrap`}>
                  {viewOrder.details?.message || "Không có ghi chú."}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Phân loại</label>
                  <p className={`text-sm ${t.text} mt-1`}>{viewOrder.type === "rental" ? "Thuê website" : "Mua website"}</p>
                </div>
                <div>
                  <label className={`text-xs uppercase tracking-wider ${t.textMuted}`}>Ngày đặt hàng</label>
                  <p className={`text-sm ${t.text} mt-1`}>{new Date(viewOrder.createdAt).toLocaleString("vi-VN")}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={() => setViewOrder(null)} className={`px-5 py-2 text-sm font-medium rounded-xl transition-colors ${t.btnGhost}`}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
