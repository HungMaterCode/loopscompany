"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type SiteTheme = "dark" | "light";
const STORAGE_KEY = "vietweb_admin_theme";

type ThemeCtx = { theme: SiteTheme; isDark: boolean; toggleTheme: () => void };
const ThemeContext = createContext<ThemeCtx>({ theme: "dark", isDark: true, toggleTheme: () => {} });

function readTheme(): SiteTheme {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<SiteTheme>(readTheme);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  };

  // Apply / remove class on <html> whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
    }
  }, [theme]);

  // Re-sync when admin panel changes the key in another tab or same tab
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setTheme(e.newValue === "light" ? "light" : "dark");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Poll localStorage for same-tab changes (admin sets it without a storage event)
  useEffect(() => {
    const id = setInterval(() => {
      const latest = readTheme();
      setTheme(prev => (prev !== latest ? latest : prev));
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
