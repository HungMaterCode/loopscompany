import { SiteDataProvider } from "@/legacy-app/SiteDataContext";
import { getSiteConfig } from "@/lib/site-config-server";
import { BG, GLOBAL_CSS } from "@/legacy-app/tokens";
import { ThemeProvider } from "@/legacy-app/theme-context";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <ThemeProvider>
      <SiteDataProvider initialConfig={config}>
        <div style={{ backgroundColor: "var(--sc-bg-1, " + BG + ")", minHeight: "100vh" }}>
          <style>{GLOBAL_CSS}</style>
          {children}
        </div>
      </SiteDataProvider>
    </ThemeProvider>
  );
}
