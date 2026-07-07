import { createBrowserRouter, Outlet, useLocation, useParams } from "react-router";
import { ARTICLES } from "../features/legacy-core/articles";
import { AnimatePresence, motion } from "motion/react";
import { Root } from "./Root";
import { Home } from "../features/home/Home";
import { Team } from "../features/team/Team";
import { Blog } from "../features/blog/Blog";
import { BlogPost } from "../features/blog/BlogPost";
import { NotFound } from "../features/home/NotFound";
import { Login } from "../features/auth/Login";
import { AdminProtected } from "../features/admin/AdminProtected";
import { UserLogin } from "../features/auth/UserLogin";

function BlogPostWrapper() {
  const { slug } = useParams();
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return <NotFound />;
  return <BlogPost article={article} />;
}

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
      { path: "bai-viet/:slug", Component: BlogPostWrapper },

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
