import { createBrowserRouter, Outlet, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Team } from "./pages/Team";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { AdminProtected } from "./pages/AdminProtected";
import { UserLogin } from "./pages/UserLogin";

function GlobalWrapper() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: GlobalWrapper,
    children: [
      // Admin routes — standalone layout (no Navbar/Footer)
      { path: "admin/dang-nhap", Component: Login },
      { path: "admin", Component: AdminProtected },

      // User auth — standalone (no Navbar/Footer)
      { path: "dang-nhap", Component: UserLogin },

      // Blog — standalone layout (with own Navbar/Footer)
      { path: "bai-viet", Component: Blog },
      { path: "bai-viet/:slug", Component: BlogPost },

      // Public routes — inside Root layout
      {
        path: "/",
        Component: Root,
        children: [
          { index: true, Component: Home },
          { path: "doi-ngu", Component: Team },
          { path: "*", Component: NotFound },
        ],
      },
    ]
  }
]);
