"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageCircle, Facebook, Phone, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from '@/features/legacy-core/theme-context';
import Link from 'next/link';

const SERIF = "'Instrument Serif', serif";
const F = "inherit";

// Fallback team data
const fallbackTeam = [
  {
    id: "nguyen-an",
    name: 'Nguyễn An',
    role: 'Giám đốc Sáng tạo',
    en: 'Creative Director',
    bio: 'Kiến trúc sư của những trải nghiệm thị giác — nơi thẩm mỹ gặp gỡ hiệu năng. Với 10+ năm trong ngành thiết kế, An đã dẫn dắt hơn 200 dự án thương hiệu tại 15 quốc gia.',
    gradient: 'linear-gradient(145deg, #C8A261 0%, #E8D4A8 40%, #B89240 100%)',
    skills: ['Brand Identity', 'UI/UX Design', 'Creative Strategy', 'Art Direction'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'an@loops.vn' },
    projects: 120,
    years: 10,
  },
  {
    id: "tran-duc",
    name: 'Trần Đức',
    role: 'Kiến trúc sư Trải nghiệm',
    en: 'Experience Architect',
    bio: 'Người dệt những hành trình kỹ thuật số từng điểm chạm, từng khoảnh khắc. Đức chuyên về UX research và interaction design, giúp người dùng cảm nhận sự khác biệt.',
    gradient: 'linear-gradient(145deg, #2A2520 0%, #1A1A1A 50%, #3A3530 100%)',
    skills: ['UX Research', 'Interaction Design', 'Prototyping', 'Motion Design'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'duc@loops.vn' },
    projects: 85,
    years: 7,
  },
  {
    id: "le-minh",
    name: 'Lê Minh',
    role: 'Giám đốc Công nghệ',
    en: 'Chief Technology Officer',
    bio: 'Kỹ sư của những hệ thống vô hình — mạnh mẽ, thanh lịch và không thể thay thế. Minh xây dựng kiến trúc kỹ thuật đằng sau mỗi sản phẩm số của LOOPS.',
    gradient: 'linear-gradient(145deg, #8C8276 0%, #B0A898 50%, #7A7068 100%)',
    skills: ['Full-Stack Dev', 'System Architecture', 'AI Integration', 'DevOps'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'minh@loops.vn' },
    projects: 95,
    years: 8,
  },
  {
    id: "pham-linh",
    name: 'Phạm Linh',
    role: 'Giám đốc Marketing',
    en: 'Head of Marketing',
    bio: 'Chiến lược gia marketing với tư duy dữ liệu và trái tim nghệ sĩ. Linh đã tạo ra các chiến dịch viral thu hút hàng triệu người dùng trên khắp Đông Nam Á.',
    gradient: 'linear-gradient(145deg, #4A3560 0%, #6B5080 50%, #3A2550 100%)',
    skills: ['Digital Marketing', 'Content Strategy', 'Performance Ads', 'Analytics'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'linh@loops.vn' },
    projects: 110,
    years: 6,
  },
  {
    id: "hoang-nam",
    name: 'Hoàng Nam',
    role: 'Đạo diễn Sáng tạo',
    en: 'Creative Producer',
    bio: 'Nhà sản xuất phim thương mại và content creator với con mắt điện ảnh sắc bén. Nam tạo ra những câu chuyện thương hiệu chạm đến trái tim người xem.',
    gradient: 'linear-gradient(145deg, #1E3A3A 0%, #2A5050 50%, #163030 100%)',
    skills: ['Video Production', 'Storytelling', 'Photography', 'Post-Production'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'nam@loops.vn' },
    projects: 75,
    years: 5,
  },
  {
    id: "vu-mai",
    name: 'Vũ Mai',
    role: 'Trưởng nhóm Content',
    en: 'Content Lead',
    bio: 'Người kể chuyện với ngôn từ và hình ảnh. Mai xây dựng chiến lược nội dung giúp thương hiệu tạo ra giá trị thực sự và kết nối sâu sắc với cộng đồng.',
    gradient: 'linear-gradient(145deg, #3A2020 0%, #5A3030 50%, #2A1818 100%)',
    skills: ['Copywriting', 'SEO Content', 'Editorial', 'Brand Voice'],
    socials: { zalo: 'https://zalo.me/0901234567', facebook: 'https://facebook.com', phone: '0901234567', email: 'mai@loops.vn' },
    projects: 200,
    years: 6,
  },
];

// Helper to calculate percentage from string
const getSkillPercentage = (skill: string) => {
  const hash = skill.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // Returns a percentage between 75 and 98
  return 75 + (hash % 24);
};

// Skill Progress Ring Component (LOOPS aesthetic)
const SkillProgress = ({ skill, percentage }: { skill: string, percentage: number }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const primaryColor = '#C8A261'; // LOOPS gold
  const bgColor = 'rgba(255,255,255,0.05)';

  return (
    <div className="flex items-center gap-6 mb-8">
      <div className="relative flex items-center justify-center w-[80px] h-[80px]">
        {/* Background track */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={bgColor}
            strokeWidth="4"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke={primaryColor}
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Inner text (Percentage) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span style={{ fontFamily: SERIF, fontSize: '20px', color: '#FBF9F6', lineHeight: 1 }}>{percentage}%</span>
        </div>
      </div>
      
      <div className="flex-1">
        <h4 style={{ fontFamily: F, fontSize: '15px', color: '#FBF9F6', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.02em' }}>{skill}</h4>
        <p style={{ fontFamily: F, fontSize: '13px', color: 'rgba(251,249,246,0.5)', lineHeight: 1.5, margin: 0 }}>
          Kỹ năng chuyên môn cốt lõi đóng góp vào sự hoàn mỹ của các dự án kỹ thuật số tại LOOPS.
        </p>
      </div>
    </div>
  );
};

export default function TeamMemberDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const { isDark } = useTheme();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        let found = null;
        if (data && data.length > 0) {
          found = data.find((m: any) => m.id === id || m.name.replace(/\s+/g, '-').toLowerCase() === id);
        }
        
        if (!found) {
          found = fallbackTeam.find(m => m.id === id || m.name.replace(/\s+/g, '-').toLowerCase() === id);
        }
        
        setMember(found);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch team members:", err);
        const found = fallbackTeam.find(m => m.id === id || m.name.replace(/\s+/g, '-').toLowerCase() === id);
        setMember(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div style={{ fontFamily: F, fontSize: '12px', color: 'var(--sc-accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center">
        <h1 style={{ fontFamily: SERIF, fontSize: '32px', color: '#FBF9F6', marginBottom: '16px' }}>Không tìm thấy thành viên</h1>
        <button 
          onClick={() => router.push('/doi-ngu')}
          style={{
            fontFamily: F, fontSize: '13px', color: '#1A1A1A', background: '#C8A261',
            padding: '12px 24px', borderRadius: '9999px', fontWeight: 600, letterSpacing: '0.02em',
          }}
          className="hover:bg-white transition-colors"
        >
          Trở về Đội ngũ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] font-sans text-[#FBF9F6] relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]"
          style={{ background: member.gradient || '#C8A261' }}
        />
        <div 
          className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px] bg-[#C8A261]"
        />
      </div>

      {/* Back button */}
      <button 
        onClick={() => router.back()}
        className="fixed top-8 left-8 sm:top-12 sm:left-12 z-[9999] pointer-events-auto cursor-pointer w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur hover:border-[#C8A261] hover:text-[#C8A261] transition-all"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Left Sidebar area (Dark / Gradient) */}
        <div className="w-full lg:w-[450px] bg-[#1A1A1A] border-r border-white/5 relative flex flex-col items-center py-24 px-8 shrink-0">
          
          <div style={{ fontFamily: F, fontSize: '10px', letterSpacing: '0.25em', color: 'var(--sc-accent)', fontWeight: 700, marginBottom: '60px', textTransform: 'uppercase' }}>
            LOOPS / Core Team
          </div>

          {/* Profile Picture (Circular, overlapping) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-72 h-72 lg:w-80 lg:h-80 lg:absolute lg:top-40 lg:-right-40 shadow-2xl"
          >
            {/* Outer decorative rings with spin effect */}
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/10 border-dashed -m-8 pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-[#C8A261]/40 border-r-[#C8A261]/90 border-l-[#C8A261]/90 -m-5 pointer-events-none"
            />
            <motion.div 
              animate={{ rotate: [0, -360] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-[#C8A261]/30 border-t-[#C8A261]/80 border-b-[#C8A261]/80 -m-2 pointer-events-none"
            />
            
            {/* Inner portrait */}
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#1A1A1A] bg-[#2A2520] flex items-center justify-center shadow-xl">
              {(member.avatar || member.photo) ? (
                <img src={member.avatar || member.photo} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 font-serif text-6xl">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>
          </motion.div>


        </div>

        {/* Right Content Area */}
        <div className="flex-1 relative pb-24 lg:pl-32">
          
          {/* Top Header Label */}
          <div className="pt-24 px-8 lg:px-16 mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: SERIF, fontSize: 'clamp(40px, 5vw, 64px)', color: '#FBF9F6', fontWeight: 400, letterSpacing: '-0.02em', margin: 0, lineHeight: 1 }}
            >
              Hồ sơ <em style={{ fontStyle: 'italic', color: 'var(--sc-accent)' }}>Chuyên gia</em>
            </motion.h1>
          </div>

          {/* Name Banner (Ribbon effect adapted for LOOPS) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-r from-[rgba(200,162,97,0.15)] to-transparent border-l-4 border-[#C8A261] py-6 pl-8 lg:pl-16 pr-8 relative"
          >
            <h2 style={{ fontFamily: F, fontSize: 'clamp(20px, 2vw, 28px)', color: '#FBF9F6', fontWeight: 600, letterSpacing: '-0.01em', margin: 0 }}>
              {member.name}
            </h2>
            <div style={{ fontFamily: F, fontSize: '13px', color: 'var(--sc-accent)', letterSpacing: '0.15em', marginTop: '6px', textTransform: 'uppercase', fontWeight: 600 }}>
              {member.roleEn || member.en || member.role}
            </div>
          </motion.div>

          {/* Content Sections */}
          <div className="px-8 lg:px-16 mt-16 max-w-4xl">
            
            {/* Bio Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-16"
            >
              <h3 style={{ fontFamily: F, fontSize: '11px', letterSpacing: '0.2em', color: 'var(--sc-accent)', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase' }}>
                Tổng quan
              </h3>
              <p style={{ fontFamily: F, fontSize: '16px', color: 'rgba(251,249,246,0.7)', lineHeight: 1.8, margin: 0, textAlign: 'justify' }}>
                {member.bio}
              </p>
            </motion.div>

            {/* Skills Section */}
            <div className="mb-16">
              <h3 style={{ fontFamily: F, fontSize: '11px', letterSpacing: '0.2em', color: 'var(--sc-accent)', fontWeight: 700, marginBottom: '24px', textTransform: 'uppercase' }}>
                Kỹ năng chuyên môn
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {member.skills && member.skills.length > 0 ? (
                  member.skills.map((skill: string, idx: number) => (
                    <motion.div 
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                    >
                      <SkillProgress 
                        skill={skill} 
                        percentage={getSkillPercentage(skill)} 
                      />
                    </motion.div>
                  ))
                ) : (
                  <p style={{ fontFamily: F, fontSize: '14px', color: 'rgba(251,249,246,0.4)' }}>
                    Chưa cập nhật kỹ năng.
                  </p>
                )}
              </div>
            </div>
            
            {/* Contact Icons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              {[
                { name: 'Zalo', icon: MessageCircle, value: member.zalo || member.socials?.zalo },
                { name: 'Facebook', icon: Facebook, value: member.facebook || member.socials?.facebook },
                { name: 'Phone', icon: Phone, value: member.phone || member.socials?.phone },
                { name: 'Email', icon: Mail, value: member.email || member.socials?.email },
              ].map(({ name, icon: Icon, value }, j) => {
                const hasValue = !!value && value !== '#';
                const href = name === 'Phone' && hasValue ? `tel:${value}` : name === 'Email' && hasValue ? `mailto:${value}` : (hasValue ? value : '#');

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
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      hasValue 
                        ? 'border-white/10 text-white hover:border-[#C8A261] hover:text-[#C8A261] hover:bg-[#C8A261]/5' 
                        : 'border-white/5 text-white/20 cursor-default'
                    }`}
                    title={hasValue ? `Liên hệ qua ${name}` : `${member.name} chưa cung cấp ${name}`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-16 pt-12 border-t border-white/10"
            >
              <div>
                <div style={{ fontFamily: SERIF, fontSize: '48px', color: '#FBF9F6', fontWeight: 300, lineHeight: 1, marginBottom: '8px' }}>
                  {member.projects}+
                </div>
                <div style={{ fontFamily: F, fontSize: '11px', color: 'rgba(251,249,246,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                  Dự án hoàn thành
                </div>
              </div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: '48px', color: '#FBF9F6', fontWeight: 300, lineHeight: 1, marginBottom: '8px' }}>
                  {member.years}
                </div>
                <div style={{ fontFamily: F, fontSize: '11px', color: 'rgba(251,249,246,0.5)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                  Năm kinh nghiệm
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
