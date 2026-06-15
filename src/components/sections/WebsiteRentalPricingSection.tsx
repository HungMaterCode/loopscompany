import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Check, X, ArrowRight } from 'lucide-react';
import { useBreakpoint } from '../ui/useBreakpoint';
import { SectionHeader } from '../shared/SectionHeader';
import { GlassCard } from '../shared/GlassCard';
import { useSiteData } from '@/features/legacy-core/SiteDataContext';

const F = "'Be Vietnam Pro', sans-serif";

const plans = [
  {
    id: 'W-01', code: 'GÓI THUÊ 1', vn: 'Khởi Đầu',
    monthlyPrice: 189000, yearlyPrice: 149000,
    badge: null, accentClass: false,
    features: ['1 trang Landing Page', 'Thiết kế responsive', 'Form liên hệ', 'Hosting & SSL', 'Hỗ trợ email'],
    missing: ['SEO tối ưu', 'Google Analytics', 'Cập nhật nội dung'],
    desc: 'Phù hợp cho cá nhân và startup mới bắt đầu.',
  },
  {
    id: 'W-02', code: 'GÓI THUÊ 2', vn: 'Doanh Nghiệp',
    monthlyPrice: 589000, yearlyPrice: 469000,
    badge: 'PHỔ BIẾN NHẤT', accentClass: true,
    features: ['5 trang nội dung', 'Thiết kế custom cao cấp', 'SEO on-page cơ bản', 'Google Analytics', 'Tích hợp mạng xã hội', 'Chat & Email support', 'Cập nhật 2×/tháng'],
    missing: ['CRM integration', 'Marketing automation'],
    desc: 'Giải pháp cho doanh nghiệp vừa và nhỏ muốn tăng trưởng.',
  },
  {
    id: 'W-03', code: 'GÓI THUÊ 3', vn: 'Nâng Cao',
    monthlyPrice: 889000, yearlyPrice: 709000,
    badge: null, accentClass: false,
    features: ['15 trang nội dung', 'Thiết kế premium + animation', 'SEO nâng cao + Blog', 'Tích hợp CRM cơ bản', 'Email marketing setup', 'Báo cáo hàng tháng', 'Hỗ trợ ưu tiên 24/7', 'Cập nhật 4×/tháng'],
    missing: ['Marketing automation'],
    desc: 'Cho doanh nghiệp cần website mạnh với full marketing.',
  },
  {
    id: 'W-04', code: 'GÓI THUÊ 4', vn: 'Enterprise',
    monthlyPrice: 1189000, yearlyPrice: 949000,
    badge: 'CAO CẤP NHẤT', accentClass: false,
    features: ['Không giới hạn trang', 'Thiết kế hoàn toàn tùy chỉnh', 'SEO toàn diện + Content', 'CRM & ERP integration', 'Marketing automation', 'Dashboard quản lý riêng', 'Chuyên viên hỗ trợ riêng', 'Cập nhật không giới hạn', 'Tên miền .com miễn phí'],
    missing: [],
    desc: 'Hệ sinh thái web hoàn chỉnh cho tập đoàn và doanh nghiệp lớn.',
  },
];

const addons = [
  { id: 'seo',     label: 'SEO Package',    price: 299000,  desc: 'Từ khóa, link building, báo cáo tuần' },
  { id: 'content', label: 'Content Monthly', price: 499000,  desc: '8 bài blog + social posts/tháng' },
  { id: 'ads',     label: 'Ads Management', price: 799000,  desc: 'Google & Meta Ads, báo cáo ROI' },
  { id: 'media',   label: 'Photo & Video',  price: 1200000, desc: '1 buổi chụp + 2 video ngắn/tháng' },
];

function fmt(n: number) { return n.toLocaleString('vi-VN') + ' ₫'; }

function InquiryModal({ planId, onClose }: { planId: string; onClose: () => void }) {
  const plan = plans.find(p => p.id === planId);
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' });
  const [done, setDone] = useState(false);
  if (!plan) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'var(--vw-glass-bg)', backdropFilter: 'blur(14px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '460px', background: 'var(--sc-modal-bg)', borderRadius: '24px', border: '1px solid var(--sc-border)', padding: 'clamp(20px,5vw,40px)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '14px', right: '14px', background: 'none', border: 'none', color: 'var(--sc-text-45)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--sc-accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Check size={22} color="var(--sc-accent)" />
            </div>
            <h3 style={{ fontFamily: F, fontSize: '24px', color: 'var(--sc-text)', margin: '0 0 10px', fontWeight: 800 }}>Đã nhận yêu cầu!</h3>
            <p style={{ fontFamily: F, fontSize: '13px', color: 'var(--sc-text-45)', lineHeight: 1.7, margin: 0 }}>
              Chuyên viên LOOPS sẽ liên hệ trong vòng <strong style={{ color: 'var(--sc-accent)' }}>2 giờ làm việc</strong>.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontFamily: F, fontSize: '10px', letterSpacing: '0.16em', color: 'var(--sc-accent)', fontWeight: 700, marginBottom: '6px' }}>{plan.id} · {plan.vn}</div>
              <h3 style={{ fontFamily: F, fontSize: '22px', color: 'var(--sc-text)', margin: 0, fontWeight: 800 }}>Nhận tư vấn miễn phí</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { k: 'name',  l: 'Họ và tên *',      ph: 'Nguyễn Văn A'    },
                { k: 'phone', l: 'Số điện thoại *',   ph: '0901 234 567'    },
                { k: 'email', l: 'Email',              ph: 'email@company.com' },
              ].map(f => (
                <div key={f.k}>
                  <label style={{ fontFamily: F, fontSize: '10px', letterSpacing: '0.1em', color: 'var(--sc-text-35)', display: 'block', marginBottom: '5px' }}>{f.l}</label>
                  <input type="text" placeholder={f.ph} value={form[f.k as keyof typeof form]}
                    onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                    style={{ width: '100%', background: 'var(--sc-input-bg)', border: '1px solid var(--sc-input-border)', borderRadius: '10px', padding: '10px 14px', fontFamily: F, fontSize: '14px', color: 'var(--sc-text)', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--sc-accent-border)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--sc-input-border)'}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontFamily: F, fontSize: '10px', letterSpacing: '0.1em', color: 'var(--sc-text-35)', display: 'block', marginBottom: '5px' }}>Ghi chú</label>
                <textarea rows={2} placeholder="Mô tả sơ lược nhu cầu..." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                  style={{ width: '100%', background: 'var(--sc-input-bg)', border: '1px solid var(--sc-input-border)', borderRadius: '10px', padding: '10px 14px', resize: 'none', fontFamily: F, fontSize: '14px', color: 'var(--sc-text)', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <button onClick={() => { if (form.name && form.phone) setDone(true); }}
                style={{ width: '100%', padding: '13px', borderRadius: '9999px', background: 'var(--sc-accent)', border: 'none', color: '#fff', fontFamily: F, fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Gửi yêu cầu tư vấn <ArrowRight size={14} />
              </button>
              <p style={{ fontFamily: F, fontSize: '11px', color: 'var(--sc-text-20)', textAlign: 'center', margin: 0 }}>Miễn phí · Phản hồi trong 2h · Không spam</p>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export function WebsiteRentalPricingSection() {
  const router = useRouter();
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { isMobile, isTablet } = useBreakpoint();
  const [yearly, setYearly]              = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [activePlan, setActivePlan]      = useState<string | null>(null);
  const { config } = useSiteData();

  const toggleAddon = (id: string) =>
    setSelectedAddons(p => p.includes(id) ? p.filter(a => a !== id) : [...p, id]);

  const addonTotal = addons.filter(a => selectedAddons.includes(a.id)).reduce((s, a) => s + a.price, 0);

  // Responsive grid: mobile=1col, tablet=2col, desktop=4col
  const planCols = isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(4,1fr)';
  const addonCols = isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(auto-fit,minmax(200px,1fr))';

  return (
    <>
      <section id="pricing" ref={ref} style={{
        backgroundColor: 'var(--sc-bg-4)',
        paddingTop: 'clamp(80px,10vw,140px)',
        paddingBottom: 'clamp(80px,10vw,140px)',
        paddingLeft: 'clamp(16px,5vw,24px)', paddingRight: 'clamp(16px,5vw,24px)',
        borderTop: '1px solid var(--sc-border)',
        position: 'relative', overflow: 'hidden',
        transition: 'background-color 0.38s ease',
      }}>
        {config.pricing.bgUrl && (
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${config.pricing.bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none' }} />
        )}
        {/* Background */}
        {/* Pink glow removed as requested */}
        <div className="orb" style={{ width: '500px', height: '500px', bottom: '-200px', left: '-100px', background: 'var(--sc-orb-2-bg)' }} />
        <div className="orb" style={{ width: '400px', height: '400px', top: '50%', right: '-100px', background: 'var(--sc-orb-3-bg)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,var(--sc-grid-line) 0px,var(--sc-grid-line) 1px,transparent 1px,transparent 60px),repeating-linear-gradient(90deg,var(--sc-grid-line) 0px,var(--sc-grid-line) 1px,transparent 1px,transparent 60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <SectionHeader
            label="BÁO GIÁ THUÊ WEB"
            headingMain="Gói"
            headingEm="thuê website"
            description="Sở hữu website chuyên nghiệp không cần đầu tư lớn. Hủy bất kỳ lúc nào."
            inView={inView}
            mb="clamp(28px,5vw,52px)"
          />

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ textAlign: 'center', marginBottom: 'clamp(24px,4vw,40px)' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'var(--sc-card-bg)', backdropFilter: 'blur(12px)', border: '1px solid var(--sc-card-border)', borderRadius: '9999px', padding: '6px 8px 6px 20px' }}>
              <span style={{ fontFamily: F, fontSize: '12px', color: yearly ? 'var(--sc-text-45)' : 'var(--sc-text)', fontWeight: yearly ? 400 : 700 }}>Tháng</span>
              <button onClick={() => setYearly(y => !y)} style={{ width: '44px', height: '24px', borderRadius: '9999px', border: 'none', cursor: 'pointer', background: yearly ? 'var(--sc-accent)' : 'var(--sc-border-h)', position: 'relative', transition: 'background 0.3s' }}>
                <div style={{ position: 'absolute', top: '3px', left: yearly ? 'calc(100% - 21px)' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.3s' }} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '10px' }}>
                <span style={{ fontFamily: F, fontSize: '12px', color: yearly ? 'var(--sc-text)' : 'var(--sc-text-45)', fontWeight: yearly ? 700 : 400 }}>Năm</span>
                <span style={{ fontFamily: F, fontSize: '10px', background: 'var(--sc-accent-dim)', color: 'var(--sc-accent-text)', borderRadius: '9999px', padding: '2px 8px', fontWeight: 700, opacity: yearly ? 1 : 0, transition: 'opacity 0.3s' }}>−20%</span>
              </div>
            </div>
          </motion.div>

          {/* Plan cards — responsive grid */}
          <div style={{ display: 'grid', gridTemplateColumns: planCols, gap: 'clamp(12px,2vw,16px)', marginBottom: '40px' }}>
            {plans.map((plan, i) => {
              const price   = yearly ? plan.yearlyPrice : plan.monthlyPrice;
              const isFeat  = plan.accentClass;
              return (
                <motion.div key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  style={{
                    borderRadius: '18px',
                    position: 'relative',
                  }}
                >
                  {plan.badge && (
                    <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: isFeat ? 'var(--sc-accent)' : 'var(--sc-border-h)', borderRadius: '9999px', padding: '4px 12px', fontFamily: F, fontSize: '9px', fontWeight: 700, color: isFeat ? '#fff' : 'var(--sc-text)', letterSpacing: '0.12em', whiteSpace: 'nowrap', zIndex: 2 }}>
                      {plan.badge}
                    </div>
                  )}
                  <div className={isFeat ? 'premium-glass-featured' : 'premium-glass'} style={{
                    borderRadius: '16px',
                    padding: 'clamp(18px,3vw,24px) clamp(14px,2vw,20px)',
                    height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
                  }}>
                    <div style={{ fontFamily: F, fontSize: '9px', letterSpacing: '0.18em', color: isFeat ? 'var(--sc-accent)' : 'var(--sc-text-35)', fontWeight: 700, marginBottom: '8px' }}>{plan.id}</div>
                    <div style={{ fontFamily: F, fontSize: 'clamp(16px,1.8vw,20px)', color: 'var(--sc-text)', fontWeight: 700, marginBottom: '6px' }}>{plan.vn}</div>
                    <p style={{ fontFamily: F, fontSize: '11px', color: 'var(--sc-text-45)', lineHeight: 1.55, margin: '0 0 16px' }}>{plan.desc}</p>

                    <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: `1px solid var(--sc-border-m)` }}>
                      <AnimatePresence mode="wait">
                        <motion.div key={price} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.2 }}>
                          <span style={{ fontFamily: F, fontSize: 'clamp(18px,2.2vw,28px)', color: isFeat ? 'var(--sc-accent)' : 'var(--sc-text)', fontWeight: 800 }}>{fmt(price)}</span>
                        </motion.div>
                      </AnimatePresence>
                      <div style={{ fontFamily: F, fontSize: '10px', color: 'var(--sc-text-35)', marginTop: '3px' }}>/tháng · GÓI LANDING PAGE</div>
                      <div style={{ fontFamily: F, fontSize: '10px', color: 'var(--sc-accent)', marginTop: '4px', opacity: yearly ? 1 : 0, transition: 'opacity 0.3s', minHeight: '15px' }}>
                        Tiết kiệm {fmt(plan.monthlyPrice - plan.yearlyPrice)}/tháng
                      </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
                      {plan.features.map(f => (
                        <div key={f} style={{ display: 'flex', gap: '7px', alignItems: 'flex-start' }}>
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: isFeat ? 'var(--sc-accent-dim)' : 'var(--sc-card-bg)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                            <Check size={8} color={isFeat ? 'var(--sc-accent)' : 'var(--sc-text-45)'} strokeWidth={3} />
                          </div>
                          <span style={{ fontFamily: F, fontSize: '11px', color: 'var(--sc-text-60)', lineHeight: 1.45 }}>{f}</span>
                        </div>
                      ))}
                      {plan.missing.slice(0, 2).map(f => (
                        <div key={f} style={{ display: 'flex', gap: '7px', alignItems: 'flex-start' }}>
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                            <X size={8} color="var(--sc-text-20)" strokeWidth={3} />
                          </div>
                          <span style={{ fontFamily: F, fontSize: '11px', color: 'var(--sc-text-35)', lineHeight: 1.45 }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    <button onClick={() => router.push('/bao-gia')}
                      style={{ width: '100%', borderRadius: '9999px', padding: '11px 8px', background: isFeat ? 'var(--sc-accent)' : 'var(--sc-card-bg)', border: isFeat ? 'none' : '1px solid var(--sc-border-h)', color: isFeat ? '#fff' : 'var(--sc-text)', fontFamily: F, fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', transition: 'all 0.2s' }}
                      onMouseEnter={e => { if (!isFeat) (e.currentTarget as HTMLElement).style.background = 'var(--sc-border-m)'; }}
                      onMouseLeave={e => { if (!isFeat) (e.currentTarget as HTMLElement).style.background = 'var(--sc-card-bg)'; }}
                    >
                      {isFeat ? 'Bắt đầu ngay' : 'Chọn gói'} <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Add-ons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <GlassCard className="premium-glass" style={{
              padding: 'clamp(20px,4vw,32px)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontFamily: F, fontSize: '10px', letterSpacing: '0.18em', color: 'var(--sc-accent)', fontWeight: 700, marginBottom: '5px' }}>CÁ NHÂN HÓA GÓI</div>
                  <h3 style={{ fontFamily: F, fontSize: 'clamp(16px,2vw,22px)', color: 'var(--sc-text)', margin: 0, fontWeight: 800 }}>
                    Thêm dịch vụ <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--sc-text-45)' }}>tùy chỉnh</em>
                  </h3>
                </div>
                {addonTotal > 0 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ fontFamily: F, fontSize: '14px', color: 'var(--sc-accent)', fontWeight: 700 }}>
                    +{fmt(addonTotal)}/tháng
                  </motion.div>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: addonCols, gap: '12px' }}>
                {addons.map(a => {
                  const on = selectedAddons.includes(a.id);
                  return (
                    <motion.button key={a.id} onClick={() => toggleAddon(a.id)}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      style={{ textAlign: 'left', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer', background: 'var(--sc-card-bg)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid', borderColor: on ? 'var(--sc-accent)' : 'var(--sc-card-border)', boxShadow: on ? '0 0 0 1px var(--sc-accent)' : 'none', transition: 'all 0.2s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <span style={{ fontFamily: F, fontSize: '13px', fontWeight: 700, color: 'var(--sc-text)' }}>{a.label}</span>
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: on ? 'var(--sc-accent)' : 'var(--sc-card-bg)', border: on ? 'none' : '1px solid var(--sc-border-m)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
                          {on ? <Check size={10} color="#fff" strokeWidth={3} /> : <span style={{ color: 'var(--sc-text-45)', fontSize: '14px', lineHeight: 1 }}>+</span>}
                        </div>
                      </div>
                      <div style={{ fontFamily: F, fontSize: '11px', color: 'var(--sc-text-45)', lineHeight: 1.5, marginBottom: '8px' }}>{a.desc}</div>
                      <div style={{ fontFamily: F, fontSize: '12px', color: 'var(--sc-text)', fontWeight: 700 }}>+{fmt(a.price)}/tháng</div>
                    </motion.button>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ fontFamily: F, fontSize: '11px', color: 'var(--sc-text-25)', textAlign: 'center', margin: '24px 0 0' }}
          >
            * Giá chưa bao gồm VAT · Tư vấn miễn phí · Cam kết hoàn tiền 30 ngày
          </motion.p>
        </div>
      </section>

      <AnimatePresence>
        {activePlan && <InquiryModal planId={activePlan} onClose={() => setActivePlan(null)} />}
      </AnimatePresence>
    </>
  );
}
