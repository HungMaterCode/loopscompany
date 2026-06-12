"use client";

import React, { createContext, useContext, useState } from "react";
import {
  SiteConfig,
  saveSiteConfig,
  DEFAULT_SITE_CONFIG,
} from "./site-config-api";

interface SiteDataContextType {
  config: SiteConfig;
  isLoading: boolean;
  updateConfig: (newConfig: SiteConfig) => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextType>({
  config: DEFAULT_SITE_CONFIG,
  isLoading: false,
  updateConfig: async () => {},
});

export function SiteDataProvider({
  children,
  initialConfig = DEFAULT_SITE_CONFIG,
}: {
  children: React.ReactNode;
  initialConfig?: SiteConfig;
}) {
  const [config, setConfig] = useState<SiteConfig>(initialConfig);

  const updateConfig = async (newConfig: SiteConfig) => {
    setConfig(newConfig);
    await saveSiteConfig(newConfig);
  };

  return (
    <SiteDataContext.Provider value={{ config, isLoading: false, updateConfig }}>
      <style>{`
        :root {
          --sc-bg-1: ${config.creativeVision.bgDark} !important;
          --sc-bg-2: ${config.service.bgDark} !important;
          --sc-bg-3: ${config.portfolio.bgDark} !important;
          --sc-bg-4: ${config.pricing.bgDark} !important;
          --sc-accent: ${config.creativeVision.accent} !important;
          --sc-header-bg: rgba(20, 20, 25, 0.65) !important;
          --sc-header-border: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .light-theme {
          --sc-bg-1: ${config.creativeVision.bgLight} !important;
          --sc-bg-2: ${config.service.bgLight} !important;
          --sc-bg-3: ${config.portfolio.bgLight} !important;
          --sc-bg-4: ${config.pricing.bgLight} !important;
          --sc-accent: #FF6B9D !important;
          --sc-accent-dim: rgba(255,107,157,0.12) !important;
          --sc-accent-text: #c0356e !important;
          --sc-accent-border: rgba(255,107,157,0.40) !important;
          --vw-accent: #FF6B9D !important;
          --vw-accent-rgb: 255,107,157 !important;
          --vw-accent-hover: #e8538a !important;
          --sc-header-bg: rgba(255, 240, 245, 0.45) !important;
          --sc-header-border: 1px solid rgba(255, 255, 255, 0.7) !important;
        }
      `}</style>
      {children}
    </SiteDataContext.Provider>
  );
}

export const useSiteData = () => useContext(SiteDataContext);
