"use client";

import { LoadingScreen } from '@/components/shared';

export default function TestLoadingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--sc-bg-1)' }}>
      {/* Simulated page content behind the loader */}
      <div style={{ padding: '160px 40px', textAlign: 'center', color: 'var(--sc-text-35)' }}>
        Nội dung trang đang tải...
      </div>
      <LoadingScreen isVisible={true} text="Đang tải..." />
    </div>
  );
}
