import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const AUTH_KEY = "vietweb_admin_session";

const ADMIN_ACCOUNT = {
  email: "admin@vietweb.vn",
  password: "admin123",
  name: "Quản trị viên Việt Web",
};

type AuthContextValue = {
  isAuthenticated: boolean;
  adminName: string;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState(() => localStorage.getItem(AUTH_KEY));

  const value = useMemo<AuthContextValue>(() => ({
    isAuthenticated: session === "active",
    adminName: ADMIN_ACCOUNT.name,
    login: (email, password) => {
      const ok = email.trim().toLowerCase() === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password;
      if (ok) {
        localStorage.setItem(AUTH_KEY, "active");
        setSession("active");
      }
      return ok;
    },
    logout: () => {
      localStorage.removeItem(AUTH_KEY);
      setSession(null);
    },
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/admin/dang-nhap?from=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
