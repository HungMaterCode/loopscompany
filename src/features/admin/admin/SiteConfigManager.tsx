import { useState, useEffect, useRef } from 'react';
import { Save, RefreshCw, AlertCircle, Upload, Loader2, Play } from 'lucide-react';
import { useSiteData } from '@/features/legacy-core/SiteDataContext';
import type { TC } from './types';
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '@/features/legacy-core/site-config-api';

interface Props {
  t: TC;
  isDark: boolean;
}

export function SiteConfigManager({ t, isDark }: Props) {
  const { config, updateConfig, isLoading } = useSiteData();
  const [form, setForm] = useState<SiteConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'banners' | 'philosophy' | 'whyChooseUs' | 'process'>('banners');

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

  const handleAddSlide = () => {
    if (!form) return;
    const newSlides = [
      ...form.hero.slides,
      {
        mediaType: 'image' as const,
        bgUrl: 'https://images.unsplash.com/photo-1748591646636-ad5132fed078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTc0ODU5MTcxMA&ixlib=rb-4.0.3&q=80&w=1080',
        badge: 'Nhãn slide mới',
        title1: 'Tiêu đề dòng 1',
        title2: 'Tiêu đề dòng 2',
        title3: 'Tiêu đề dòng 3',
        accentIndex: 1,
        textColor: '#FFFFFF',
        accentColor: '#d43b1f',
        sub: 'Mô tả ngắn gọn về slide này.',
        cta: 'Xem thêm',
      }
    ];
    setForm({ ...form, hero: { slides: newSlides } });
  };

  const handleDeleteSlide = (idx: number) => {
    if (!form) return;
    if (form.hero.slides.length <= 1) {
      alert("Phải có nhất 1 slide banner!");
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xoá Slide ${idx + 1}?`)) {
      const newSlides = form.hero.slides.filter((_, i) => i !== idx);
      setForm({ ...form, hero: { slides: newSlides } });
    }
  };

  if (isLoading || !form) {
    return <div className={`p-10 text-center ${t.textMuted}`}>Đang tải cấu hình...</div>;
  }

  const UploadButton = ({ onUploadComplete, acceptType = "image/*,video/*" }: { onUploadComplete: (url: string) => void; acceptType?: string }) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        onUploadComplete(data.url);
      } catch (err) {
        console.error(err);
        alert('Tải tệp lên thất bại, vui lòng cấu hình đầy đủ biến môi trường Cloudinary!');
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

  const InputRow = ({ label, value, onChange, type = 'text', hint = '', isVideoOverride = undefined, acceptType = 'image/*,video/*' }: any) => {
    const isVideo = isVideoOverride !== undefined ? isVideoOverride : (value && (value.endsWith('.mp4') || value.includes('/video/upload/') || value.includes('videoUrl')));
    return (
      <div className="mb-4">
        <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>{label}</label>
        <div className="flex gap-3 items-start">
          {type === 'color' && (
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-300 shrink-0 mt-1">
              <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-16 h-16 -m-2 cursor-pointer" />
            </div>
          )}

          {/* Main Content: Input Text + Responsive Preview */}
          <div className="flex-1 flex flex-col gap-2">
            <input type="text" value={value} onChange={e => onChange(e.target.value)}
              className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} ${type === 'color' ? 'mt-1' : ''}`} />

            {(type === 'url' && value) && (
              <div
                onClick={() => window.open(value, '_blank')}
                className="w-full aspect-video max-h-72 rounded-xl bg-gray-800 overflow-hidden border border-gray-700 relative cursor-pointer group"
                title="Click để xem chi tiết / phát video"
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                  <span className="text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded">Xem tệp</span>
                </div>

                {/* Video default indicator */}
                {isVideo && (
                  <div className="absolute bottom-1.5 right-1.5 bg-black/70 p-1.5 rounded-full z-1 shadow-md border border-white/10">
                    <Play className="h-2.5 w-2.5 text-white fill-white" />
                  </div>
                )}

                {isVideo ? (
                  <video src={value} className="w-full h-full object-cover" muted autoPlay loop playsInline />
                ) : (
                  <img src={value} className="w-full h-full object-cover" alt="Preview" />
                )}
              </div>
            )}
          </div>

          {type === 'url' && (
            <UploadButton onUploadComplete={onChange} acceptType={acceptType} />
          )}
        </div>
        {hint && <p className={`mt-1.5 text-xs ${t.textFaint}`}>{hint}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <style>{`
        select option {
          background-color: ${isDark ? '#0f1123' : '#ffffff'} !important;
          color: ${isDark ? '#ffffff' : '#1f2937'} !important;
        }
      `}</style>
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
      <div className={`flex flex-wrap border-b ${t.divider}`}>
        {[
          { id: 'banners', label: 'Banners Chính (Hero)' },
          { id: 'philosophy', label: 'Triết lý của chúng tôi' },
          { id: 'whyChooseUs', label: 'Tại sao chọn chúng tôi' },
          { id: 'process', label: 'Quy trình làm việc' },
          { id: 'blog', label: 'Bài viết (Blog)' },
          { id: 'portfolio', label: 'Dự án (Portfolio)' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${activeTab === tab.id ? 'border-red-500 text-red-500' : `border-transparent ${t.textMuted} hover:${t.text}`}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-2">
        {activeTab === ('portfolio' as any) && (
          <div className={`rounded-2xl p-6 ${t.card}`}>
            <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Cấu hình trang Dự án (Portfolio)</h3>
            <div className="grid grid-cols-1 gap-4">
              <InputRow label="Hình nền chìm (Background URL)" value={form.portfolio?.bgUrl || ''} type="url"
                onChange={(v: string) => setForm({ ...form, portfolio: { ...form.portfolio, bgUrl: v } })} />
            </div>
          </div>
        )}
        {activeTab === ('blog' as any) && (
          <div className={`rounded-2xl p-6 ${t.card}`}>
            <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Cấu hình trang Bài viết (Blog)</h3>
            <div className="grid grid-cols-1 gap-4">
              <InputRow label="Hình nền chìm (Background URL)" value={form.blog?.bgUrl || ''} type="url"
                onChange={(v: string) => setForm({ ...form, blog: { ...form.blog, bgUrl: v } })} />
            </div>
          </div>
        )}
        {activeTab === 'banners' && (
          <div className="grid gap-6">
            {form.hero.slides.map((slide, idx) => (
              <div key={idx} className={`rounded-2xl p-6 ${t.card} flex flex-col gap-2`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`text-lg font-bold ${t.text} flex items-center gap-2`}>
                    Banner Slide {idx + 1}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      slide.mediaType === 'video' 
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {slide.mediaType === 'video' ? 'Video' : 'Hình ảnh'}
                    </span>
                  </h3>
                  {form.hero.slides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(idx)}
                      className="text-red-500 hover:text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/40 bg-red-500/5 transition"
                    >
                      Xóa Slide
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 items-start">
                  <div className="mb-4">
                    <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Loại banner (Media Type)</label>
                    <select
                      value={slide.mediaType || 'image'}
                      onChange={(e) => {
                        const newSlides = [...form.hero.slides];
                        newSlides[idx].mediaType = e.target.value as 'image' | 'video';
                        setForm({ ...form, hero: { slides: newSlides } });
                      }}
                      className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} mt-1`}>
                      <option value="image">Hình ảnh (Image)</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <InputRow 
                      label={slide.mediaType === 'video' ? "Video nền (Video URL)" : "Hình nền (Background URL)"} 
                      value={slide.bgUrl} 
                      type="url"
                      isVideoOverride={slide.mediaType === 'video'}
                      acceptType={slide.mediaType === 'video' ? 'video/*' : 'image/*'}
                      onChange={(v: string) => {
                        const newSlides = [...form.hero.slides];
                        newSlides[idx].bgUrl = v;
                        setForm({ ...form, hero: { slides: newSlides } });
                      }} 
                    />
                  </div>
                </div>

                {slide.mediaType !== 'video' && (
                  <>
                    <div className="grid grid-cols-1 gap-y-2">
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
                          className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} mt-1`}>
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
                  </>
                )}
              </div>
            ))}

            <div className="flex justify-center mt-2">
              <button
                type="button"
                onClick={handleAddSlide}
                className={`w-full py-4 border-2 border-dashed rounded-2xl flex items-center justify-center gap-2 font-semibold transition ${isDark
                  ? 'border-gray-800 hover:border-gray-700 text-gray-400 hover:text-gray-300 bg-gray-900/20 hover:bg-gray-900/40'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100'
                  }`}
              >
                + Thêm Slide Mới
              </button>
            </div>
          </div>
        )}

        {activeTab === 'philosophy' && (
          <div className={`rounded-2xl p-6 ${t.card}`}>
            <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Triết lý của chúng tôi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputRow label="Video Background URL" value={form.creativeVision.videoUrl} type="url"
                onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, videoUrl: v } })} />
              <InputRow label="Hình nền bổ sung (tuỳ chọn)" value={form.creativeVision.bgUrl} type="url"
                onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, bgUrl: v } })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-800/40 pt-4 mt-4">
              <InputRow label="Tiêu đề chính (Chữ đứng)" value={form.creativeVision.titleRegular || ''}
                onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, titleRegular: v } })} />
              <InputRow label="Tiêu đề chính (Chữ nghiêng)" value={form.creativeVision.titleItalic || ''}
                onChange={(v: string) => setForm({ ...form, creativeVision: { ...form.creativeVision, titleItalic: v } })} />
            </div>

            <div className="border-t border-gray-800/40 pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className={`text-md font-bold ${t.text}`}>Danh sách Triết lý (Các Card)</h4>
                <button
                  type="button"
                  onClick={() => {
                    const currentPillars = form.creativeVision.pillars || [
                      { num: '01', title: 'Không gian sáng tạo', body: 'Mỗi đột phá đều bắt đầu tại giao điểm của chiến lược kỷ luật và tầm nhìn sáng tạo vượt trội. Chúng tôi biến tư duy táo bạo thành kết quả hữu hình.' },
                      { num: '02', title: 'Định hình tương lai', body: 'Công việc tốt nhất xuất hiện khi sự tò mò gặp sự kiên định. Quy trình của chúng tôi chuyển hóa cơ hội ẩn thành trải nghiệm còn vang vọng mãi.' },
                      { num: '03', title: 'Dữ liệu & Cảm xúc', body: 'Chúng tôi kết hợp phân tích dữ liệu chính xác với cảm xúc thương hiệu sâu sắc để tạo ra những chiến lược vừa đo được vừa cảm được.' },
                    ];
                    const nextNum = String(currentPillars.length + 1).padStart(2, '0');
                    const newPillars = [
                      ...currentPillars,
                      { num: nextNum, title: 'Triết lý mới', body: 'Nội dung chi tiết của triết lý mới.' }
                    ];
                    setForm({ ...form, creativeVision: { ...form.creativeVision, pillars: newPillars } });

                    // Lăn xuống cuối và trỏ chuột (focus) vào input Tiêu đề mới vừa tạo
                    setTimeout(() => {
                      const newIdx = newPillars.length - 1;
                      const inputEl = document.getElementById(`pillar-title-${newIdx}`);
                      if (inputEl) {
                        inputEl.focus();
                        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 80);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${t.btnGhost}`}
                >
                  + Thêm Card Triết lý
                </button>
              </div>

              <div className="space-y-4">
                {(form.creativeVision.pillars || [
                  { num: '01', title: 'Không gian sáng tạo', body: 'Mỗi đột phá đều bắt đầu tại giao điểm của chiến lược kỷ luật và tầm nhìn sáng tạo vượt trội. Chúng tôi biến tư duy táo bạo thành kết quả hữu hình.' },
                  { num: '02', title: 'Định hình tương lai', body: 'Công việc tốt nhất xuất hiện khi sự tò mò gặp sự kiên định. Quy trình của chúng tôi chuyển hóa cơ hội ẩn thành trải nghiệm còn vang vọng mãi.' },
                  { num: '03', title: 'Dữ liệu & Cảm xúc', body: 'Chúng tôi kết hợp phân tích dữ liệu chính xác với cảm xúc thương hiệu sâu sắc để tạo ra những chiến lược vừa đo được vừa cảm được.' },
                ]).map((pillar, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-xl border border-gray-800 bg-gray-900/10 flex flex-col gap-2 relative">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-semibold ${t.textMuted}`}>Triết lý #{pIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentPillars = form.creativeVision.pillars || [
                            { num: '01', title: 'Không gian sáng tạo', body: '...' },
                            { num: '02', title: 'Định hình tương lai', body: '...' },
                            { num: '03', title: 'Dữ liệu & Cảm xúc', body: '...' },
                          ];
                          if (currentPillars.length <= 1) {
                            alert('Phải giữ lại ít nhất 1 triết lý!');
                            return;
                          }
                          if (window.confirm(`Xoá triết lý #${pIdx + 1}?`)) {
                            const newPillars = currentPillars.filter((_, i) => i !== pIdx);
                            setForm({ ...form, creativeVision: { ...form.creativeVision, pillars: newPillars } });
                          }
                        }}
                        className="text-red-500 hover:text-red-600 text-xs font-semibold"
                      >
                        Xóa
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <label className={`mb-1 block text-xs ${t.textMuted}`}>Số thứ tự</label>
                        <input
                          type="text"
                          value={pillar.num}
                          onChange={(e) => {
                            const currentPillars = [...(form.creativeVision.pillars || [
                              { num: '01', title: 'Không gian sáng tạo', body: '...' },
                              { num: '02', title: 'Định hình tương lai', body: '...' },
                              { num: '03', title: 'Dữ liệu & Cảm xúc', body: '...' },
                            ])];
                            currentPillars[pIdx].num = e.target.value;
                            setForm({ ...form, creativeVision: { ...form.creativeVision, pillars: currentPillars } });
                          }}
                          className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input}`}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className={`mb-1 block text-xs ${t.textMuted}`}>Tiêu đề</label>
                        <input
                          id={`pillar-title-${pIdx}`}
                          type="text"
                          value={pillar.title}
                          onChange={(e) => {
                            const currentPillars = [...(form.creativeVision.pillars || [
                              { num: '01', title: 'Không gian sáng tạo', body: '...' },
                              { num: '02', title: 'Định hình tương lai', body: '...' },
                              { num: '03', title: 'Dữ liệu & Cảm xúc', body: '...' },
                            ])];
                            currentPillars[pIdx].title = e.target.value;
                            setForm({ ...form, creativeVision: { ...form.creativeVision, pillars: currentPillars } });
                          }}
                          className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`mb-1 block text-xs ${t.textMuted}`}>Nội dung mô tả</label>
                      <textarea
                        value={pillar.body}
                        onChange={(e) => {
                          const currentPillars = [...(form.creativeVision.pillars || [
                            { num: '01', title: 'Không gian sáng tạo', body: '...' },
                            { num: '02', title: 'Định hình tương lai', body: '...' },
                            { num: '03', title: 'Dữ liệu & Cảm xúc', body: '...' },
                          ])];
                          currentPillars[pIdx].body = e.target.value;
                          setForm({ ...form, creativeVision: { ...form.creativeVision, pillars: currentPillars } });
                        }}
                        rows={2}
                        className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input} resize-y`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'whyChooseUs' && (
          <div className={`rounded-2xl p-6 ${t.card}`}>
            <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Tại sao chọn chúng tôi</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputRow label="Hình nền chìm (tuỳ chọn)" value={form.whyChooseUs.bgUrl} type="url"
                onChange={(v: string) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, bgUrl: v } })} />
              <InputRow label="Tiêu đề chính" value={form.whyChooseUs.title} placeholder="Chúng tôi hiểu doanh nghiệp Việt"
                onChange={(v: string) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, title: v } })} />
            </div>

            <div className="mb-4">
              <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Văn bản mô tả ngắn</label>
              <textarea
                value={form.whyChooseUs.description}
                placeholder="Hơn 8 năm phục vụ..."
                onChange={(e) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, description: e.target.value } })}
                rows={3}
                className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} resize-y`}
              />
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-800/40 pt-6 mt-6">
              <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/10">
                <h4 className={`text-sm font-bold mb-3 ${t.text}`}>Thẻ thống kê 1 (Bên trái dưới ảnh)</h4>
                <div className="grid grid-cols-1 gap-3">
                  <InputRow label="Chỉ số chính (Ví dụ: +40%)" value={form.whyChooseUs.stat1Number} placeholder="+40%"
                    onChange={(v: string) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, stat1Number: v } })} />
                  <InputRow label="Nhãn chỉ số (Ví dụ: Tăng khách tháng đầu)" value={form.whyChooseUs.stat1Label} placeholder="Tăng khách tháng đầu"
                    onChange={(v: string) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, stat1Label: v } })} />
                </div>
              </div>

              <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/10">
                <h4 className={`text-sm font-bold mb-3 ${t.text}`}>Thẻ thống kê 2 (Bên phải trên ảnh)</h4>
                <div className="grid grid-cols-1 gap-3">
                  <InputRow label="Chỉ số chính (Ví dụ: 98% hài lòng)" value={form.whyChooseUs.stat2Title} placeholder="98% hài lòng"
                    onChange={(v: string) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, stat2Title: v } })} />
                  <InputRow label="Nhãn phụ (Ví dụ: 500+ khách hàng)" value={form.whyChooseUs.stat2Sub} placeholder="500+ khách hàng"
                    onChange={(v: string) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, stat2Sub: v } })} />
                  <div className="mb-2">
                    <label className={`mb-1 block text-xs ${t.textMuted}`}>Số sao vàng đánh giá</label>
                    <select
                      value={form.whyChooseUs.stat2Stars}
                      onChange={(e) => setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, stat2Stars: parseInt(e.target.value) } })}
                      className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input}`}
                    >
                      {[1,2,3,4,5].map(stars => (
                        <option key={stars} value={stars}>{stars} Sao</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* List reasons / points */}
            <div className="border-t border-gray-800/40 pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className={`text-md font-bold ${t.text}`}>Danh sách các lý do (Các Card lý do)</h4>
                <button
                  type="button"
                  onClick={() => {
                    const currentPoints = form.whyChooseUs.points;
                    const newPoints = [
                      ...currentPoints,
                      { iconName: 'Zap', title: 'Lý do mới', desc: 'Nội dung chi tiết của lý do mới.' }
                    ];
                    setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: newPoints } });
                    
                    // Lăn xuống cuối và focus vào lý do mới vừa tạo
                    setTimeout(() => {
                      const newIdx = newPoints.length - 1;
                      const inputEl = document.getElementById(`why-point-title-${newIdx}`);
                      if (inputEl) {
                        inputEl.focus();
                        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 80);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${t.btnGhost}`}
                >
                  + Thêm Lý Do Mới
                </button>
              </div>

              <div className="space-y-4">
                {form.whyChooseUs.points.map((point, ptIdx) => (
                  <div key={ptIdx} className="p-4 rounded-xl border border-gray-800 bg-gray-900/10 flex flex-col gap-2 relative">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-semibold ${t.textMuted}`}>Lý do #{ptIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentPoints = form.whyChooseUs.points;
                          if (currentPoints.length <= 1) {
                            alert('Phải giữ lại ít nhất 1 lý do!');
                            return;
                          }
                          if (window.confirm(`Xoá lý do #${ptIdx + 1}?`)) {
                            const newPoints = currentPoints.filter((_, i) => i !== ptIdx);
                            setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: newPoints } });
                          }
                        }}
                        className="text-red-500 hover:text-red-600 text-xs font-semibold"
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Icon selector */}
                      <div className="md:col-span-1">
                        <label className={`mb-1 block text-xs ${t.textMuted}`}>Chọn biểu tượng (Icon)</label>
                        <select
                          value={point.iconName}
                          onChange={(e) => {
                            const currentPoints = [...form.whyChooseUs.points];
                            currentPoints[ptIdx].iconName = e.target.value;
                            setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: currentPoints } });
                          }}
                          className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input}`}
                        >
                          <option value="Zap">Tia sét (Zap)</option>
                          <option value="Smartphone">Di động (Smartphone)</option>
                          <option value="Shield">Bảo mật (Shield)</option>
                          <option value="Users">Khách hàng (Users)</option>
                          <option value="BarChart2">Biểu đồ (BarChart2)</option>
                          <option value="Star">Ngôi sao (Star)</option>
                          <option value="Clock">Đồng hồ (Clock)</option>
                          <option value="Award">Giải thưởng (Award)</option>
                          <option value="PenTool">Thiết kế (PenTool)</option>
                          <option value="Headphones">Hỗ trợ (Headphones)</option>
                        </select>
                      </div>

                      {/* Title */}
                      <div className="md:col-span-3">
                        <label className={`mb-1 block text-xs ${t.textMuted}`}>Tiêu đề</label>
                        <input
                          id={`why-point-title-${ptIdx}`}
                          type="text"
                          value={point.title}
                          onChange={(e) => {
                            const currentPoints = [...form.whyChooseUs.points];
                            currentPoints[ptIdx].title = e.target.value;
                            setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: currentPoints } });
                          }}
                          className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input}`}
                        />
                      </div>
                    </div>

                    {/* Desc */}
                    <div>
                      <label className={`mb-1 block text-xs ${t.textMuted}`}>Nội dung chi tiết</label>
                      <textarea
                        value={point.desc}
                        onChange={(e) => {
                          const currentPoints = [...form.whyChooseUs.points];
                          currentPoints[ptIdx].desc = e.target.value;
                          setForm({ ...form, whyChooseUs: { ...form.whyChooseUs, points: currentPoints } });
                        }}
                        rows={2}
                        className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input} resize-y`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className={`rounded-2xl p-6 ${t.card}`}>
            <h3 className={`mb-4 text-lg font-bold ${t.text}`}>Quy trình làm việc</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputRow label="Hình nền chìm (tuỳ chọn)" value={form.process?.bgUrl || ''} type="url"
                onChange={(v: string) => setForm({ ...form, process: { ...form.process, bgUrl: v } })} />
              <InputRow label="Tiêu đề phụ (nhãn đỏ)" value={form.process?.subtitle || ''} placeholder="Quy trình làm việc"
                onChange={(v: string) => setForm({ ...form, process: { ...form.process, subtitle: v } })} />
            </div>

            <div className="mb-4">
              <label className={`mb-1.5 block text-sm font-medium ${t.textMuted}`}>Tiêu đề chính (hỗ trợ xuống dòng)</label>
              <textarea
                value={form.process?.title || ''}
                placeholder="Chỉ 4 bước — website&#10;sẵn sàng hoạt động"
                onChange={(e) => setForm({ ...form, process: { ...form.process, title: e.target.value } })}
                rows={2}
                className={`w-full rounded-xl px-4 py-2.5 text-sm transition ${t.input} resize-y`}
              />
            </div>

            {/* Steps list */}
            <div className="border-t border-gray-800/40 pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className={`text-md font-bold ${t.text}`}>Danh sách các bước quy trình</h4>
                <button
                  type="button"
                  onClick={() => {
                    const currentSteps = form.process?.steps || [];
                    const newSteps = [
                      ...currentSteps,
                      { num: String(currentSteps.length + 1).padStart(2, '0'), iconName: 'MessageCircle', title: 'Bước mới', desc: 'Mô tả chi tiết bước mới.' }
                    ];
                    setForm({ ...form, process: { ...form.process, steps: newSteps } });
                    
                    // Scroll down and focus on new step title
                    setTimeout(() => {
                      const newIdx = newSteps.length - 1;
                      const inputEl = document.getElementById(`process-step-title-${newIdx}`);
                      if (inputEl) {
                        inputEl.focus();
                        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 80);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${t.btnGhost}`}
                >
                  + Thêm Bước Mới
                </button>
              </div>

              <div className="space-y-4">
                {(form.process?.steps || []).map((step, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl border border-gray-800 bg-gray-900/10 flex flex-col gap-2 relative">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-semibold ${t.textMuted}`}>Bước #{sIdx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentSteps = form.process?.steps || [];
                          if (currentSteps.length <= 1) {
                            alert('Phải giữ lại ít nhất 1 bước!');
                            return;
                          }
                          if (window.confirm(`Xoá bước #${sIdx + 1}?`)) {
                            const newSteps = currentSteps.filter((_, i) => i !== sIdx);
                            setForm({ ...form, process: { ...form.process, steps: newSteps } });
                          }
                        }}
                        className="text-red-500 hover:text-red-600 text-xs font-semibold"
                      >
                        Xóa
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {/* Step Number */}
                      <div className="md:col-span-1">
                        <label className={`mb-1 block text-xs ${t.textMuted}`}>Số thứ tự (Ví dụ: 01)</label>
                        <input
                          type="text"
                          value={step.num}
                          onChange={(e) => {
                            const currentSteps = [...(form.process?.steps || [])];
                            currentSteps[sIdx].num = e.target.value;
                            setForm({ ...form, process: { ...form.process, steps: currentSteps } });
                          }}
                          className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input}`}
                        />
                      </div>

                      {/* Icon selector */}
                      <div className="md:col-span-1">
                        <label className={`mb-1 block text-xs ${t.textMuted}`}>Chọn biểu tượng (Icon)</label>
                        <select
                          value={step.iconName}
                          onChange={(e) => {
                            const currentSteps = [...(form.process?.steps || [])];
                            currentSteps[sIdx].iconName = e.target.value;
                            setForm({ ...form, process: { ...form.process, steps: currentSteps } });
                          }}
                          className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input}`}
                        >
                          <option value="MessageCircle">Tin nhắn (MessageCircle)</option>
                          <option value="PenTool">Thiết kế (PenTool)</option>
                          <option value="Rocket">Tên lửa (Rocket)</option>
                          <option value="Headphones">Hỗ trợ (Headphones)</option>
                          <option value="Zap">Tia sét (Zap)</option>
                          <option value="Smartphone">Di động (Smartphone)</option>
                          <option value="Shield">Bảo mật (Shield)</option>
                          <option value="Users">Khách hàng (Users)</option>
                          <option value="BarChart2">Biểu đồ (BarChart2)</option>
                          <option value="Star">Ngôi sao (Star)</option>
                          <option value="Clock">Đồng hồ (Clock)</option>
                          <option value="Award">Giải thưởng (Award)</option>
                        </select>
                      </div>

                      {/* Title */}
                      <div className="md:col-span-2">
                        <label className={`mb-1 block text-xs ${t.textMuted}`}>Tiêu đề</label>
                        <input
                          id={`process-step-title-${sIdx}`}
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const currentSteps = [...(form.process?.steps || [])];
                            currentSteps[sIdx].title = e.target.value;
                            setForm({ ...form, process: { ...form.process, steps: currentSteps } });
                          }}
                          className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input}`}
                        />
                      </div>
                    </div>

                    {/* Desc */}
                    <div>
                      <label className={`mb-1 block text-xs ${t.textMuted}`}>Nội dung chi tiết</label>
                      <textarea
                        value={step.desc}
                        onChange={(e) => {
                          const currentSteps = [...(form.process?.steps || [])];
                          currentSteps[sIdx].desc = e.target.value;
                          setForm({ ...form, process: { ...form.process, steps: currentSteps } });
                        }}
                        rows={2}
                        className={`w-full rounded-xl px-4 py-2 text-sm transition ${t.input} resize-y`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
