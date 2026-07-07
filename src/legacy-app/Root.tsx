import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FloatingZalo } from "./components/layout/FloatingZalo";
import { BG, GLOBAL_CSS } from "../features/legacy-core/tokens";

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ backgroundColor: BG, minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>
      <Header />
      <Outlet />
      <Footer />
      <FloatingZalo />
    </div>
  );
}

