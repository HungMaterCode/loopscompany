export type AdminTheme = "dark" | "light";

export type AdminTab =
  | "dashboard"
  | "sections"
  | "pricing"
  | "portfolio"
  | "services"
  | "blog"
  | "users"
  | "team"
  | "siteConfig"
  | "seo"
  | "appearance"
  | "contacts";

export interface TC {
  page: string;
  sidebar: string;
  topbar: string;
  card: string;
  cardHover: string;
  text: string;
  textMuted: string;
  textFaint: string;
  input: string;
  divider: string;
  navItem: string;
  navActive: string;
  badge: string;
  badgeGreen: string;
  badgeAmber: string;
  modal: string;
  tableHead: string;
  tableRow: string;
  btn: string;
  btnGhost: string;
}

export function tc(isDark: boolean): TC {
  return isDark
    ? {
        page: "bg-[#020510] text-[#f8efe7]",
        sidebar: "bg-[#06030f] border-white/[0.08]",
        topbar: "bg-[#06030f]/95 border-white/[0.08] backdrop-blur-xl",
        card: "bg-white/[0.05] border border-white/10",
        cardHover: "hover:bg-white/[0.075] hover:border-white/15",
        text: "text-white",
        textMuted: "text-white/55",
        textFaint: "text-white/35",
        input:
          "bg-black/35 border border-white/10 text-white placeholder:text-white/28 focus:border-[#C8A261]/60 outline-none",
        divider: "border-white/[0.08]",
        navItem:
          "text-white/50 hover:text-white hover:bg-white/[0.07] rounded-xl transition-all",
        navActive:
          "text-[#C8A261] bg-[#C8A261]/15 border-l-[3px] border-[#C8A261] rounded-r-xl transition-all",
        badge: "bg-white/10 text-white/65",
        badgeGreen: "bg-emerald-400/12 text-emerald-300",
        badgeAmber: "bg-amber-400/12 text-amber-200",
        modal: "bg-[#0a0b1a] border border-white/15",
        tableHead: "text-white/38 border-b border-white/[0.07]",
        tableRow: "border-b border-white/[0.06] hover:bg-white/[0.04]",
        btn: "bg-[#C8A261] hover:bg-[#D4AF37] text-white",
        btnGhost:
          "border border-white/12 bg-white/[0.05] hover:bg-white/[0.09] text-white/75 hover:text-white",
      }
    : {
        page: "bg-[#F2F4F7] text-gray-900",
        sidebar: "bg-white border-gray-200",
        topbar: "bg-white/95 border-gray-200 backdrop-blur-xl",
        card: "bg-white border border-gray-200 shadow-sm",
        cardHover: "hover:shadow-md hover:border-gray-300",
        text: "text-gray-900",
        textMuted: "text-gray-500",
        textFaint: "text-gray-400",
        input:
          "bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none",
        divider: "border-gray-200",
        navItem:
          "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all",
        navActive:
          "text-red-600 bg-red-50 border-l-[3px] border-red-500 rounded-r-xl transition-all",
        badge: "bg-gray-100 text-gray-600",
        badgeGreen: "bg-emerald-50 text-emerald-700",
        badgeAmber: "bg-amber-50 text-amber-700",
        modal: "bg-white border border-gray-200 shadow-2xl",
        tableHead: "text-gray-500 border-b border-gray-200",
        tableRow: "border-b border-gray-100 hover:bg-gray-50",
        btn: "bg-red-600 hover:bg-red-500 text-white",
        btnGhost:
          "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900",
      };
}
