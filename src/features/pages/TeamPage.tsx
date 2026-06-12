import { motion } from 'motion/react';
import { Linkedin, Twitter, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import { useTilt3D } from '@/hooks/useTilt3D';

const F = "'Plus Jakarta Sans', sans-serif";
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
    socials: { linkedin: '#', twitter: '#', instagram: '#', email: 'an@loops.vn' },
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
    socials: { linkedin: '#', twitter: '#', instagram: '#', email: 'duc@loops.vn' },
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
    socials: { linkedin: '#', twitter: '#', instagram: '#', email: 'minh@loops.vn' },
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
    socials: { linkedin: '#', twitter: '#', instagram: '#', email: 'linh@loops.vn' },
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
    socials: { linkedin: '#', twitter: '#', instagram: '#', email: 'nam@loops.vn' },
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
    socials: { linkedin: '#', twitter: '#', instagram: '#', email: 'mai@loops.vn' },
    projects: 200,
    years: 6,
  },
];

const FRAME_DEPTH = 14;

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const tilt = useTilt3D(6, 900);
  const isLight = index === 0;
  const edgeDark  = isLight ? '#C8C3B5' : '#111';
  const edgeDark2 = isLight ? '#B0ABA0' : '#0a0a0a';
  const frameShadow = isLight
    ? `${FRAME_DEPTH}px ${FRAME_DEPTH}px 0 #C8C3B5, ${FRAME_DEPTH * 2}px ${FRAME_DEPTH * 2}px 0 #B0ABA0, ${FRAME_DEPTH * 2}px ${FRAME_DEPTH * 2}px 36px rgba(26,20,10,0.12)`
    : `${FRAME_DEPTH}px ${FRAME_DEPTH}px 0 #111, ${FRAME_DEPTH * 2}px ${FRAME_DEPTH * 2}px 0 #090909, ${FRAME_DEPTH * 2}px ${FRAME_DEPTH * 2}px 40px rgba(0,0,0,0.5)`;

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
        style={{ cursor: 'pointer', willChange: 'transform', position: 'relative' }}
      >
        {/* Portrait */}
        <div style={{ position: 'relative', boxShadow: frameShadow, borderRadius: '4px' }}>
          <div style={{
            height: '300px',
            background: member.gradient,
            border: `1px solid ${isLight ? '#EAE5DA' : '#2A2520'}`,
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)' }} />
            <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', width: '140px', height: '180px', borderRadius: '70px 70px 0 0', background: 'rgba(251,249,246,0.1)', backdropFilter: 'blur(2px)' }} />
            <div style={{ position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(251,249,246,0.18)', border: '1.5px solid rgba(251,249,246,0.3)', boxShadow: '2px 2px 0 rgba(0,0,0,0.1)' }} />

            <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: F, fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(200,162,97,0.85)', fontWeight: 700 }}>
                LOOPS / {String(index + 1).padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[Linkedin, Twitter].map((Icon, j) => (
                  <div key={j} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid rgba(251,249,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Icon size={8} color="rgba(251,249,246,0.6)" />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 18px 16px', background: 'linear-gradient(transparent, rgba(26,20,10,0.5))' }}>
              <div style={{ fontFamily: F, fontSize: '8px', letterSpacing: '0.16em', color: 'rgba(200,162,97,0.9)', fontWeight: 700 }}>
                {member.en.toUpperCase()}
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', top: FRAME_DEPTH / 2, right: -FRAME_DEPTH, bottom: -FRAME_DEPTH, width: FRAME_DEPTH, background: `linear-gradient(90deg, ${edgeDark}, ${edgeDark2})`, zIndex: -1, transform: 'skewY(-0.3deg)', borderRadius: '0 2px 0 0' }} />
          <div style={{ position: 'absolute', bottom: -FRAME_DEPTH, left: FRAME_DEPTH / 2, right: 0, height: FRAME_DEPTH, background: `linear-gradient(180deg, ${edgeDark2}, transparent)`, zIndex: -1, borderRadius: '0 0 2px 0' }} />
        </div>

        {/* Info */}
        <div style={{ marginTop: '24px', paddingLeft: '4px' }}>
          <div style={{ fontFamily: F, fontSize: '17px', fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.01em', marginBottom: '3px' }}>{member.name}</div>
          <div style={{ fontFamily: F, fontSize: '10px', color: '#C8A261', letterSpacing: '0.08em', marginBottom: '10px', fontWeight: 600 }}>{member.role}</div>
          <p style={{ fontFamily: F, fontSize: '12px', color: '#8C8276', lineHeight: 1.7, margin: '0 0 14px', fontStyle: 'italic' }}>{member.bio}</p>

          {/* Skills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
            {member.skills.map(skill => (
              <span key={skill} style={{
                fontFamily: F, fontSize: '10px', color: '#8C8276',
                border: '1px solid #DDD8CC', borderRadius: '9999px',
                padding: '3px 10px', letterSpacing: '0.02em',
              }}>
                {skill}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: '22px', color: '#1A1A1A', fontWeight: 300, lineHeight: 1 }}>{member.projects}+</div>
              <div style={{ fontFamily: F, fontSize: '10px', color: '#8C8276', marginTop: '3px' }}>Dự án</div>
            </div>
            <div>
              <div style={{ fontFamily: SERIF, fontSize: '22px', color: '#1A1A1A', fontWeight: 300, lineHeight: 1 }}>{member.years}</div>
              <div style={{ fontFamily: F, fontSize: '10px', color: '#8C8276', marginTop: '3px' }}>Năm kinh nghiệm</div>
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {[
              { icon: Linkedin, href: member.socials.linkedin },
              { icon: Twitter, href: member.socials.twitter },
              { icon: Instagram, href: member.socials.instagram },
            ].map(({ icon: Icon, href }, j) => (
              <a key={j} href={href} style={{
                width: '32px', height: '32px', borderRadius: '50%',
                border: '1px solid #DDD8CC', display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none', transition: 'all 0.2s', color: '#8C8276',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8A261'; (e.currentTarget as HTMLElement).style.color = '#C8A261'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#DDD8CC'; (e.currentTarget as HTMLElement).style.color = '#8C8276'; }}
              >
                <Icon size={13} />
              </a>
            ))}
            <a href={`mailto:${member.socials.email}`} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: F, fontSize: '11px', color: '#8C8276', textDecoration: 'none',
              transition: 'color 0.2s', marginLeft: '4px',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C8A261'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#8C8276'}
            >
              <Mail size={12} />
              {member.socials.email}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <div style={{ backgroundColor: '#F5F2EB', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ backgroundColor: '#1A1A1A', padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 100px) clamp(80px, 10vw, 120px)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 120%, rgba(200,162,97,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '24px', height: '1.5px', background: '#C8A261' }} />
              <span style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C8A261', fontFamily: F, fontWeight: 700 }}>ĐỘI NGŨ LOOPS</span>
            </div>
            <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(40px, 6vw, 88px)', fontWeight: 400, color: '#FBF9F6', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 24px', maxWidth: '700px' }}>
              Những bộ óc đứng sau{' '}
              <em style={{ fontStyle: 'italic', color: '#C8A261' }}>các siêu phẩm</em>
            </h1>
            <p style={{ fontFamily: F, fontSize: 'clamp(14px, 1.5vw, 16px)', color: 'rgba(251,249,246,0.5)', lineHeight: 1.75, maxWidth: '480px', margin: 0 }}>
              Mỗi thành viên là một chuyên gia trong lĩnh vực của mình — cùng nhau, chúng tôi tạo ra những trải nghiệm kỹ thuật số không thể nào quên.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ display: 'flex', gap: 'clamp(32px, 5vw, 64px)', marginTop: 'clamp(40px, 5vw, 64px)', flexWrap: 'wrap' }}
          >
            {[
              { n: '6+', label: 'Chuyên gia core team' },
              { n: '50+', label: 'Cộng tác viên toàn cầu' },
              { n: '680+', label: 'Dự án hoàn thành' },
              { n: '15', label: 'Quốc gia phục vụ' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#C8A261', fontWeight: 400, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: F, fontSize: '11px', color: 'rgba(251,249,246,0.35)', marginTop: '6px', letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
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
            <h2 style={{ fontFamily: F, fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 300, color: '#1A1A1A', letterSpacing: '-0.01em', margin: '0 0 8px' }}>
              Core Team
            </h2>
            <p style={{ fontFamily: F, fontSize: '13px', color: '#8C8276', margin: 0 }}>
              Đội ngũ sáng lập và lãnh đạo chính
            </p>
          </motion.div>

          <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
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
              <div style={{ width: '24px', height: '1.5px', background: '#C8A261' }} />
              <span style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C8A261', fontFamily: F, fontWeight: 700 }}>VĂN HÓA LOOPS</span>
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
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,162,97,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,162,97,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ fontFamily: F, fontSize: '9px', letterSpacing: '0.2em', color: '#C8A261', fontWeight: 700, marginBottom: '16px' }}>{v.num}</div>
                <h3 style={{ fontFamily: F, fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 600, color: '#FBF9F6', margin: '0 0 12px', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{v.title}</h3>
                <p style={{ fontFamily: F, fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join us CTA */}
      <section style={{ backgroundColor: '#F5F2EB', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 100px)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          style={{ maxWidth: '560px', margin: '0 auto' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '24px', height: '1.5px', background: '#C8A261' }} />
            <span style={{ fontSize: '9px', letterSpacing: '0.28em', color: '#C8A261', fontFamily: F, fontWeight: 700 }}>GIA NHẬP ĐỘI NGŨ</span>
            <div style={{ width: '24px', height: '1.5px', background: '#C8A261' }} />
          </div>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
            Bạn có muốn tạo ra điều{' '}
            <em style={{ fontStyle: 'italic', color: '#C8A261' }}>phi thường?</em>
          </h2>
          <p style={{ fontFamily: F, fontSize: '14px', color: '#8C8276', lineHeight: 1.75, margin: '0 0 36px' }}>
            Chúng tôi luôn tìm kiếm những tài năng đam mê và muốn để lại dấu ấn trong thế giới kỹ thuật số.
          </p>
          <a
            href="mailto:hello@loops.vn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: F, fontSize: '14px', fontWeight: 600, color: '#fff',
              background: '#1A1A1A', borderRadius: '9999px', padding: '14px 32px',
              textDecoration: 'none', transition: 'all 0.25s', letterSpacing: '0.01em',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C8A261'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A1A1A'; }}
          >
            Gửi hồ sơ ứng tuyển
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
