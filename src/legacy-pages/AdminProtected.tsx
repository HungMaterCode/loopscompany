import { RequireAdmin } from "@/legacy-app/auth";
import { Admin } from "./Admin";

export function AdminProtected() {
  return (
    <RequireAdmin>
      <Admin />
    </RequireAdmin>
  );
}
