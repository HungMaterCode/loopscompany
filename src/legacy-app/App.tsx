import { RouterProvider } from "react-router";
import { router } from "./routes"; 
import { AuthProvider } from "../features/legacy-core/auth";
import { ThemeProvider } from "../features/legacy-core/theme-context";
import { SiteDataProvider } from "../features/legacy-core/SiteDataContext";

export default function App() {
  return (
    <ThemeProvider>
      <SiteDataProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </SiteDataProvider>
    </ThemeProvider>
  );
}
