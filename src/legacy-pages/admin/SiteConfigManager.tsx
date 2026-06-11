import { useState, useEffect } from 'react';
import { Save, RefreshCw, AlertCircle } from 'lucide-react';
import { useSiteData } from '@/legacy-app/SiteDataContext';
import type { TC } from './types';
import type { SiteConfig } from '@/legacy-app/site-config-api';

interface Props {
  t: TC;
  isDark: boolean;
}

export function SiteConfigManager({ t, isDark }: Props) {
  const { config, updateConfig, isLoading } = useSiteData();
  const [form, setForm] = useState<SiteConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'banners' | 'oldSections' | 'newSections'>('banners');

  // Sync form when config is loaded
  useEffect(() => {
    if (config && !isLoading && !form) {
      setForm(JSON.parse(JSON.stringify(config)));
    }
  }, [config, isLoading, form]);

  const handleSave = async () => {
    if (!form) return;
    setIsSaving(true);
    setMessage('');
    try {
      await updateConfig(form);
      setMessage('Lưu cấu hình thành công!');
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      setMessage('Lỗi khi lưu cấu hình.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Bạn có chắc chắn muốn huỷ các thay đổi chưa lưu?")) {
      setForm(JSON.parse(JSON.stringify(config)));
    }
  };

  if (isLoading || !form) {
    return <div className={`p-10 text-center ${t.textMuted}`}>Đang tải cấu hình...</div>;
  }

  const InputRow = ({ label, value, onChange, type = 'text', hint = '' }: any) => (
    <div className="mb-4">
      <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>{label}</label>
      <div className="flex gap-3 items-start">
        {type === 'color' && (
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-300 shrink-0 mt-1">
            <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-16 h-16 -m-2 cursor-pointer" />
          </div>
        )}
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} ${type === 'color' ? 'mt-1' : ''}`} />
      </div>
      {(type === 'url' && value) && (
        <div className="mt-2 w-32 h-20 rounded-lg bg-gray-800 overflow-hidden border border-gray-700 relative">
          {value.endsWith('.mp4') ? (
            <video src={value} className="w-full h-full object-cover" muted />
          ) : (
            <img src={value} className="w-full h-full object-cover" alt="Preview" />
          )}
        </div>
      )}
      {hint && <p className={`mt-1.5 text-xs ${t.textFaint}`}>{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight ${t.text}`}>Quản lý Background Toàn Diện</h2>
          <p className={`mt-1 text-sm ${t.textMuted}`}>Cấu hình hình nền và màu sắc cho tất cả các section của trang web.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${t.btnGhost}`}>
            <RefreshCw className="h-4 w-4" /> Đặt lại
          </button>
          <button onClick={handleSave} disabled={isSaving} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${t.btn}`}>
            {isSaving ? 'Đang lưu...' : <><Save className="h-4 w-4" /> Lưu cấu hình</>}
          </button>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${message.includes('Lỗi') ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-semibold">{message}</span>
        </div>
      )}

      {/* Tabs */}
      <div className={`flex border-b ${t.divider}`}>
        {[
          { id: 'banners', label: 'Banners Chính (Hero)' },
          { id: 'oldSections', label: 'Sections Hiện Tại' },
          { id: 'newSections', label: 'Sections Mới Thêm' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${activeTab === tab.id ? 'border-red-500 text-red-500' : `border-transparent ${t.textMuted} hover:${t.text}`}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === 'banners' && (
          <div className="grid gap-6">
            {form.hero.slides.map((slide, idx) => (
              <div key={idx} className={`rounded-2xl p-6 ${t.card} flex flex-col gap-2`}>
                <h3 className={`mb-2 text-lg font-bold ${t.text}`}>Banner Slide {idx + 1}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <InputRow label="Hình nền (Background URL)" value={slide.bgUrl} type="url"
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].bgUrl = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                  <InputRow label="Nhãn nổi bật (Badge đỏ)" value={slide.badge}
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].badge = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2">
                  <InputRow label="Tiêu đề Dòng 1" value={slide.title1}
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].title1 = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                  <InputRow label="Tiêu đề Dòng 2" value={slide.title2}
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].title2 = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                  <InputRow label="Tiêu đề Dòng 3" value={slide.title3}
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].title3 = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 items-start">
                  <InputRow label="Màu chữ tiêu đề (Text Color)" value={slide.textColor} type="color"
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].textColor = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                  <InputRow label="Màu chữ nhấn (Accent Color)" value={slide.accentColor} type="color"
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].accentColor = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                  <div className="mb-4">
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Dòng nào đổi màu nhấn?</label>
                    <select value={slide.accentIndex} onChange={e => {
                        const newSlides = [...form.hero.slides];
                        newSlides[idx].accentIndex = parseInt(e.target.value);
                        setForm({ ...form, hero: { slides: newSlides } });
                      }}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} mt-1`} style={{ background: 'var(--sc-input-bg)', color: 'var(--sc-text)', border: '1px solid var(--sc-input-border)' }}>
                      <option value={0}>Dòng 1</option>
                      <option value={1}>Dòng 2</option>
                      <option value={2}>Dòng 3</option>
                      <option value={-1}>Không đổi màu</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  <InputRow label="Đoạn văn mô tả (Subtext)" value={slide.sub}
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].sub = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                  <InputRow label="Chữ nút bấm (CTA Button)" value={slide.cta}
                    onChange={(v: string) => {
                      const newSlides = [...form.hero.slides];
                      newSlides[idx].cta = v;
                      setForm({ ...form, hero: { slides: newSlides } });
                    }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'oldSections' && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className={`rounded-2xl p-6 ${t.card}`}>
              <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Tại Sao Chọn Chúng Tôi</h3>
              <InputRow label="Hình nền" value={form.oldSections.whyBg} type="url"
                onChange={(v: string) => setForm({ ...form, oldSections: { ...form.oldSections, whyBg: v } })} />
            </div>
            <div className={`rounded-2xl p-6 ${t.card}`}>
              <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Quy Trình Làm Việc</h3>
              <InputRow label="Hình nền" value={form.oldSections.processBg} type="url"
                onChange={(v: string) => setForm({ ...form, oldSections: { ...form.oldSections, processBg: v } })} />
            </div>
            <div className={`rounded-2xl p-6 ${t.card}`}>
              <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Khách Hàng Nói Gì</h3>
              <InputRow label="Hình nền" value={form.oldSections.testimonialsBg} type="url"
                onChange={(v: string) => setForm({ ...form, oldSections: { ...form.oldSections, testimonialsBg: v } })} />
            </div>
            <div className={`rounded-2xl p-6 ${t.card}`}>
              <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Liên Hệ & Footer</h3>
              <InputRow label="Hình nền" value={form.oldSections.contactBg} type="url"
                onChange={(v: string) => setForm({ ...form, oldSections: { ...form.oldSections, contactBg: v } })} />
            </div>
          </div>
        )}

        {activeTab === 'newSections' && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Creative Vision */}
            <div className={`rounded-2xl p-6 ${t.card}`}>
              <h3 className={`mb-4 text-lg font-bold ${t.text}`}>1. Creative Vision</h3>
              <InputRow label="Video Background URL" value={form.creativeVision.videoUrl} type="url"
                onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, videoUrl: v } })} 
                hint="Đường dẫn file video mp4" />
              <InputRow label="Hình nền bổ sung (tuỳ chọn)" value={form.creativeVision.bgUrl} type="url"
                onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, bgUrl: v } })} />
              <InputRow label="Màu nhấn (Accent)" value={form.creativeVision.accent} type="color"
                onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, accent: v } })} />
              <div className="grid grid-cols-2 gap-4">
                <InputRow label="Nền Light Mode" value={form.creativeVision.bgLight} type="color"
                  onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, bgLight: v } })} />
                <InputRow label="Nền Dark Mode" value={form.creativeVision.bgDark} type="color"
                  onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, bgDark: v } })} />
              </div>
            </div>

            {/* Service Ecosystem */}
            <div className={`rounded-2xl p-6 ${t.card}`}>
              <h3 className={`mb-4 text-lg font-bold ${t.text}`}>2. Hệ Sinh Thái Dịch Vụ</h3>
              <InputRow label="Hình nền chìm (tuỳ chọn)" value={form.service.bgUrl} type="url"
                onChange={(v: string) => setForm({ ...form, service: { ...form.service, bgUrl: v } })} />
              <div className="grid grid-cols-2 gap-4">
                <InputRow label="Nền Light Mode" value={form.service.bgLight} type="color"
                  onChange={(v: string) => setForm({ ...form, service: { ...form.service, bgLight: v } })} />
                <InputRow label="Nền Dark Mode" value={form.service.bgDark} type="color"
                  onChange={(v: string) => setForm({ ...form, service: { ...form.service, bgDark: v } })} />
              </div>
            </div>

            {/* Project Museum */}
            <div className={`rounded-2xl p-6 ${t.card}`}>
              <h3 className={`mb-4 text-lg font-bold ${t.text}`}>3. Bảo Tàng Dự Án</h3>
              <InputRow label="Hình nền chìm (tuỳ chọn)" value={form.portfolio.bgUrl} type="url"
                onChange={(v: string) => setForm({ ...form, portfolio: { ...form.portfolio, bgUrl: v } })} />
              <div className="grid grid-cols-2 gap-4">
                <InputRow label="Nền Light Mode" value={form.portfolio.bgLight} type="color"
                  onChange={(v: string) => setForm({ ...form, portfolio: { ...form.portfolio, bgLight: v } })} />
                <InputRow label="Nền Dark Mode" value={form.portfolio.bgDark} type="color"
                  onChange={(v: string) => setForm({ ...form, portfolio: { ...form.portfolio, bgDark: v } })} />
              </div>
            </div>

            {/* Pricing */}
            <div className={`rounded-2xl p-6 ${t.card}`}>
              <h3 className={`mb-4 text-lg font-bold ${t.text}`}>4. Báo Giá Cho Thuê</h3>
              <InputRow label="Hình nền chìm (tuỳ chọn)" value={form.pricing.bgUrl} type="url"
                onChange={(v: string) => setForm({ ...form, pricing: { ...form.pricing, bgUrl: v } })} />
              <div className="grid grid-cols-2 gap-4">
                <InputRow label="Nền Light Mode" value={form.pricing.bgLight} type="color"
                  onChange={(v: string) => setForm({ ...form, pricing: { ...form.pricing, bgLight: v } })} />
                <InputRow label="Nền Dark Mode" value={form.pricing.bgDark} type="color"
                  onChange={(v: string) => setForm({ ...form, pricing: { ...form.pricing, bgDark: v } })} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
