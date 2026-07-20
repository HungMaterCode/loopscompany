import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Facebook, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { useTilt3D } from '@/hooks/useTilt3D';
import { useTheme } from '@/features/legacy-core/theme-context';
import { useRouter } from 'next/navigation';

const F = "inherit";
const SERIF = "'Instrument Serif', serif";

const team = [
  {
    name: 'Nguyễn An',
    role: 'Giám đốc Sáng tạo',
    en: 'Creative Director',
    bio: 'Kiến trúc sư của những trải nghiệm thị giác — nơi thẩm mỹ gặp gỡ hiệu năng. Với 10+ năm trong ngành thiết kế, An đã dẫn dắt hơn 200 dự án thương hiệu tại 15 quốc gia.',
    gradient: 'linear-gradient(145deg, #C8A261 0%, #E8D4A8 40%, #B89240 100%)',
    marginTop: '0px',
    skills: ['Brand Identity', 'UI/UX Design', 'Creative Strategy', 'Art Direction'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'an@loops.vn' },
    projects: 120,
    years: 10,
  },
  {
    name: 'Trần Đức',
    role: 'Kiến trúc sư Trải nghiệm',
    en: 'Experience Architect',
    bio: 'Người dệt những hành trình kỹ thuật số từng điểm chạm, từng khoảnh khắc. Đức chuyên về UX research và interaction design, giúp người dùng cảm nhận sự khác biệt.',
    gradient: 'linear-gradient(145deg, #2A2520 0%, #1A1A1A 50%, #3A3530 100%)',
    marginTop: '48px',
    skills: ['UX Research', 'Interaction Design', 'Prototyping', 'Motion Design'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'duc@loops.vn' },
    projects: 85,
    years: 7,
  },
  {
    name: 'Lê Minh',
    role: 'Giám đốc Công nghệ',
    en: 'Chief Technology Officer',
    bio: 'Kỹ sư của những hệ thống vô hình — mạnh mẽ, thanh lịch và không thể thay thế. Minh xây dựng kiến trúc kỹ thuật đằng sau mỗi sản phẩm số của LOOPS.',
    gradient: 'linear-gradient(145deg, #8C8276 0%, #B0A898 50%, #7A7068 100%)',
    marginTop: '24px',
    skills: ['Full-Stack Dev', 'System Architecture', 'AI Integration', 'DevOps'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'minh@loops.vn' },
    projects: 95,
    years: 8,
  },
  {
    name: 'Phạm Linh',
    role: 'Giám đốc Marketing',
    en: 'Head of Marketing',
    bio: 'Chiến lược gia marketing với tư duy dữ liệu và trái tim nghệ sĩ. Linh đã tạo ra các chiến dịch viral thu hút hàng triệu người dùng trên khắp Đông Nam Á.',
    gradient: 'linear-gradient(145deg, #4A3560 0%, #6B5080 50%, #3A2550 100%)',
    marginTop: '0px',
    skills: ['Digital Marketing', 'Content Strategy', 'Performance Ads', 'Analytics'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'linh@loops.vn' },
    projects: 110,
    years: 6,
  },
  {
    name: 'Hoàng Nam',
    role: 'Đạo diễn Sáng tạo',
    en: 'Creative Producer',
    bio: 'Nhà sản xuất phim thương mại và content creator với con mắt điện ảnh sắc bén. Nam tạo ra những câu chuyện thương hiệu chạm đến trái tim người xem.',
    gradient: 'linear-gradient(145deg, #1E3A3A 0%, #2A5050 50%, #163030 100%)',
    marginTop: '60px',
    skills: ['Video Production', 'Storytelling', 'Photography', 'Post-Production'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'nam@loops.vn' },
    projects: 75,
    years: 5,
  },
  {
    name: 'Vũ Mai',
    role: 'Trưởng nhóm Content',
    en: 'Content Lead',
    bio: 'Người kể chuyện với ngôn từ và hình ảnh. Mai xây dựng chiến lược nội dung giúp thương hiệu tạo ra giá trị thực sự và kết nối sâu sắc với cộng đồng.',
    gradient: 'linear-gradient(145deg, #3A2020 0%, #5A3030 50%, #2A1818 100%)',
    marginTop: '30px',
    skills: ['Copywriting', 'SEO Content', 'Editorial', 'Brand Voice'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'mai@loops.vn' },
    projects: 200,
    years: 6,
  },
];

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  roleEn?: string;
  en?: string;
  avatar?: string;
  photo?: string;
  years: number;
  projects: number;
  bio: string;
  skills: string[];
  gradient: string;
  email?: string;
  zalo?: string | null;
  facebook?: string | null;
  phone?: string | null;
  socials?: {
    zalo?: string;
    facebook?: string;
    phone?: string;
    email?: string;
  };
  active?: boolean;
}

const FRAME_DEPTH = 14;

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const tilt = useTilt3D(6, 900);
  const router = useRouter();
  const edgeDark = '#C8C3B5';
  const edgeDark2 = '#B0ABA0';
  const frameShadow = `${FRAME_DEPTH}px ${FRAME_DEPTH}px 0 #C8C3B5, ${FRAME_DEPTH * 2}px ${FRAME_DEPTH * 2}px 0 #B0ABA0, ${FRAME_DEPTH * 2}px ${FRAME_DEPTH * 2}px 36px rgba(26,20,10,0.12)`;

  const handleCardClick = () => {
    const id = member.id || member.name.replace(/\s+/g, '-').toLowerCase();
    router.push(`/doi-ngu/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: (index % 3) * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      style={{ flex: '1 1 280px', minWidth: '260px', maxWidth: '360px' }}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        onClick={handleCardClick}
        style={{ cursor: 'pointer', willChange: 'transform', position: 'relative' }}
      >
        {/* Portrait */}
        <div style={{ position: 'relative', boxShadow: frameShadow, borderRadius: '4px' }}>
          <div style={{
            height: '300px',
            background: member.gradient,
            border: '1px solid #EAE5DA',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {(member.avatar || member.photo) ? (
              <img src={member.avatar || member.photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            ) : (
              <>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', width: '140px', height: '180px', borderRadius: '70px 70px 0 0', background: 'rgba(251,249,246,0.1)', backdropFilter: 'blur(2px)' }} />
                <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(251,249,246,0.18)', border: '1.5px solid rgba(251,249,246,0.3)', boxShadow: '2px 2px 0 rgba(0,0,0,0.1)' }} />
              </>
            )}

            <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{
                padding: '5px 10px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <span style={{ fontFamily: F, fontSize: '8px', letterSpacing: '0.15em', color: 'var(--sc-accent)', fontWeight: 700 }}>
                  LOOPS / {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[MessageCircle, Facebook].map((Icon, j) => (
                  <div key={j} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid rgba(251,249,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Icon size={8} color="rgba(251,249,246,0.6)" />
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              position: 'absolute', bottom: '14px', left: '14px', zIndex: 2,
              padding: '5px 10px',
              borderRadius: '8px',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <span style={{ fontFamily: F, fontSize: '8px', letterSpacing: '0.14em', color: 'var(--sc-accent)', fontWeight: 700 }}>
                {(member.roleEn || member.en || '').toUpperCase()}
              </span>
            </div>
          </div>

          <div style={{ position: 'absolute', top: FRAME_DEPTH / 2, right: -FRAME_DEPTH, bottom: -FRAME_DEPTH, width: FRAME_DEPTH, background: `linear-gradient(90deg, ${edgeDark}, ${edgeDark2})`, zIndex: -1, transform: 'skewY(-0.3deg)', borderRadius: '0 2px 0 0' }} />
          <div style={{ position: 'absolute', bottom: -FRAME_DEPTH, left: FRAME_DEPTH / 2, right: 0, height: FRAME_DEPTH, background: `linear-gradient(180deg, ${edgeDark2}, transparent)`, zIndex: -1, borderRadius: '0 0 2px 0' }} />
        </div>

        {/* Info */}
        <div style={{ marginTop: '36px', paddingLeft: '4px' }}>
          <div style={{ fontFamily: F, fontSize: '17px', fontWeight: 600, color: 'var(--sc-text)', letterSpacing: '-0.01em', marginBottom: '3px' }}>{member.name}</div>
          <div style={{ fontFamily: F, fontSize: '10px', color: 'var(--sc-accent)', letterSpacing: '0.08em', marginBottom: '10px', fontWeight: 600 }}>{member.role}</div>
          <p style={{ fontFamily: F, fontSize: '12px', color: 'var(--sc-text-60)', lineHeight: 1.7, margin: '0 0 14px', fontStyle: 'italic', textAlign: 'justify' }}>{member.bio}</p>

          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
            {member.skills.map(skill => (
              <span key={skill} style={{
                fontFamily: F, fontSize: '10px', color: 'var(--sc-text-60)',
                border: '1px solid var(--sc-border)', borderRadius: '9999px',
                padding: '3px 10px', letterSpacing: '0.02em',
                backgroundColor: 'var(--vw-ghost)',
              }}>
                {skill}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: '22px', color: 'var(--sc-text)', fontWeight: 300, lineHeight: 1 }}>{member.projects}+</div>
              <div style={{ fontFamily: F, fontSize: '10px', color: 'var(--sc-text-60)', marginTop: '3px' }}>Dự án</div>
            </div>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: '22px', color: 'var(--sc-text)', fontWeight: 300, lineHeight: 1 }}>{member.years}</div>
              <div style={{ fontFamily: F, fontSize: '10px', color: 'var(--sc-text-60)', marginTop: '3px' }}>Năm kinh nghiệm</div>
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
            {[
              { name: 'Zalo', icon: MessageCircle, value: member.zalo || member.socials?.zalo },
              { name: 'Facebook', icon: Facebook, value: member.facebook || member.socials?.facebook },
              { name: 'Số điện thoại', icon: Phone, value: member.phone || member.socials?.phone },
            ].map(({ name, icon: Icon, value }, j) => {
              const hasValue = !!value && value !== '#';
              const href = name === 'Số điện thoại' && hasValue ? `tel:${value}` : (hasValue ? value : '#');

              return (
                <a
                  key={j}
                  href={href}
                  onClick={e => {
                    if (!hasValue) {
                      e.preventDefault();
                      alert(`${member.name} chưa cung cấp ${name}.`);
                    }
                  }}
                  title={hasValue ? `Liên hệ qua ${name}` : `${member.name} chưa cung cấp ${name}`}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    border: '1px solid var(--sc-border)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all 0.25s',
                    color: hasValue ? 'var(--sc-text-60)' : 'var(--sc-text-25)',
                    cursor: 'pointer',
                    opacity: hasValue ? 1 : 0.6,
                  }}
                  onMouseEnter={e => {
                    if (hasValue) {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--sc-accent)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--sc-accent)';
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--sc-border)';
                    (e.currentTarget as HTMLElement).style.color = hasValue ? 'var(--sc-text-60)' : 'var(--sc-text-25)';
                  }}
                >
                  <Icon size={13} />
                </a>
              );
            })}
            <a href={`mailto:${member.email || member.socials?.email}`} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: F, fontSize: '11px', color: 'var(--sc-text-60)', textDecoration: 'none',
              transition: 'color 0.2s', marginLeft: '4px',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--sc-accent)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--sc-text-60)'}
            >
              <Mail size={12} />
              {member.email || member.socials?.email}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch("/api/team")
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          // Display active team members
          setMembers(data.filter((m: any) => m.active !== false));
        } else {
          setMembers(team);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch team members:", err);
        setMembers(team);
      });
  }, []);

  const activeDark = !mounted || isDark;

  return (
    <div style={{ backgroundColor: activeDark ? '#121212' : '#F5F2EB', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#1A1A1A', padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 100px) clamp(80px, 10vw, 120px)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 120%, var(--sc-accent-dim) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(40px, 6vw, 88px)', fontWeight: 400, color: '#FBF9F6', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 24px', maxWidth: '700px' }}>
              Những bộ óc đứng sau{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--sc-accent)' }}>các siêu phẩm</em>
            </h1>
            <p style={{ fontFamily: F, fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(251,249,246,0.5)', lineHeight: 1.75, maxWidth: '480px', margin: 0 }}>
              Mỗi thành viên là một chuyên gia trong lĩnh vực của mình — cùng nhau, chúng tôi tạo ra những trải nghiệm kỹ thuật số không thể nào quên.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team grid */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 100px)', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ marginBottom: '64px' }}
          >
            <h2 style={{ fontFamily: F, fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 300, color: activeDark ? '#FBF9F6' : '#1A1A1A', letterSpacing: '-0.01em', margin: '0 0 8px' }}>
              Core Team
            </h2>
            <p style={{ fontFamily: F, fontSize: '13px', color: activeDark ? 'rgba(251,249,246,0.5)' : '#8C8276', margin: 0 }}>
              Đội ngũ sáng lập và lãnh đạo chính
            </p>
          </motion.div>

          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {members.map((member, i) => (
              <TeamCard key={member.id || member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Culture section */}
      <section style={{ backgroundColor: '#1A1A1A', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 100px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            style={{ marginBottom: '56px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '24px', height: '1.5px', background: 'var(--sc-accent)' }} />
              <span style={{ fontSize: '9px', letterSpacing: '0.28em', color: 'var(--sc-accent)', fontFamily: F, fontWeight: 700 }}>VĂN HÓA LOOPS</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 400, color: '#FBF9F6', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
              Chúng tôi tin vào{' '}
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>sự xuất sắc</em>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'clamp(16px, 3vw, 32px)' }}>
            {[
              { num: '01', title: 'Chất lượng không thỏa hiệp', desc: 'Mỗi pixel, mỗi dòng code, mỗi từ ngữ đều được chăm chút đến mức hoàn hảo nhất có thể.' },
              { num: '02', title: 'Tư duy dữ liệu', desc: 'Quyết định dựa trên insight thực tế, không phải cảm tính. Chúng tôi đo lường mọi thứ.' },
              { num: '03', title: 'Sáng tạo có mục đích', desc: 'Đẹp mà không hiệu quả là lãng phí. Mọi sáng tạo đều phục vụ mục tiêu kinh doanh.' },
              { num: '04', title: 'Hợp tác bền vững', desc: 'Khách hàng là đối tác, không phải giao dịch. Chúng tôi đầu tư vào sự thành công lâu dài.' },
            ].map((v, i) => (
              <motion.div
                key={v.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  padding: 'clamp(24px, 3vw, 32px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.02)',
                  cursor: 'default',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--sc-accent-dim)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--sc-accent-border)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ fontFamily: F, fontSize: '9px', letterSpacing: '0.2em', color: 'var(--sc-accent)', fontWeight: 700, marginBottom: '16px' }}>{v.num}</div>
                <h3 style={{ fontFamily: F, fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 600, color: '#FBF9F6', margin: '0 0 12px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{v.title}</h3>
                <p style={{ fontFamily: F, fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join us CTA */}
      <section style={{ backgroundColor: activeDark ? '#121212' : '#F5F2EB', transition: 'background-color 0.3s ease', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 100px)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1.5px', background: 'var(--sc-accent)' }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.28em', color: 'var(--sc-accent)', fontFamily: F, fontWeight: 700 }}>GIA NHẬP ĐỘI NGŨ</span>
            <div style={{ width: '24px', height: '1.5px', background: 'var(--sc-accent)' }} />
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, color: activeDark ? '#FBF9F6' : '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
            Bạn có muốn tạo ra điều{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--sc-accent)' }}>phi thường?</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: '14px', color: activeDark ? 'rgba(251,249,246,0.5)' : '#8C8276', lineHeight: 1.75, margin: '0 0 36px' }}>
            Chúng tôi luôn tìm kiếm những tài năng đam mê và muốn để lại dấu ấn trong thế giới kỹ thuật số.
          </p>
          <a
            href="mailto:hello@loops.vn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: F, fontSize: '14px', fontWeight: 600,
              color: activeDark ? '#1A1A1A' : '#fff',
              background: activeDark ? '#C8A261' : '#1A1A1A',
              borderRadius: '9999px', padding: '14px 32px',
              textDecoration: 'none', transition: 'all 0.25s', letterSpacing: '0.01em',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = activeDark ? '#fff' : '#C8A261'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = activeDark ? '#C8A261' : '#1A1A1A'; }}
          >
            Gửi hồ sơ ứng tuyển
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
