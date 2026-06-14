import { RequireAdmin } from "@/features/legacy-core/auth";
import { Admin } from "./Admin";

export function AdminProtected() {
  return (
    <RequireAdmin>
      <Admin />
    </RequireAdmin>
  );
}
