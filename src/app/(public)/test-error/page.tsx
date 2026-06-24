import { ErrorState } from '@/components/shared';

export default function TestErrorPage() {
  return (
    <ErrorState
      title="404"
      subtitle="Trang không tồn tại"
      message="Đường dẫn bạn truy cập không tồn tại, đã bị di chuyển hoặc xóa vĩnh viễn."
      fullScreen={true}
    />
  );
}
