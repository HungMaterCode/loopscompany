import { RouterProvider } from "react-router";
import { router } from "./routes"; 
import { AuthProvider } from "./auth";
import { ThemeProvider } from "./theme-context";
import { SiteDataProvider } from "./SiteDataContext";

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
