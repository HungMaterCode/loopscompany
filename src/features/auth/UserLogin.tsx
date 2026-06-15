import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from "lucide-react";
import { RED, TEXT, TEXT60, TEXT35, BORDER_M, EASE } from "@/features/legacy-core/tokens";

// Unsplash bokeh city lights — dark atmospheric, matches brand
const BG_URL =
  "https://images.unsplash.com/photo-1605002633049-3d164fc50933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";

type Tab = "login" | "register";
const SPRING = { type: "spring", stiffness: 400, damping: 34 } as const;

export function UserLogin() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");

  const [loginEmail, setLoginEmail]       = useState("");
  const [loginPass, setLoginPass]         = useState("");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [loginError, setLoginError]       = useState("");
  const [loginSuccess, setLoginSuccess]   = useState(false);

  const [regName, setRegName]           = useState("");
  const [regEmail, setRegEmail]         = useState("");
  const [regPass, setRegPass]           = useState("");
  const [regConfirm, setRegConfirm]     = useState("");
  const [showRegPass, setShowRegPass]   = useState(false);
  const [regError, setRegError]         = useState("");
  const [regSuccess, setRegSuccess]     = useState(false);

  const switchTab = (t: Tab) => { setTab(t); setLoginError(""); setRegError(""); };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail || !loginPass) { setLoginError("Vui lòng điền đầy đủ thông tin."); return; }
    setLoginSuccess(true);
    setTimeout(() => router.replace("/"), 1800);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setRegError("");
    if (!regName || !regEmail || !regPass || !regConfirm) { setRegError("Vui lòng điền đầy đủ thông tin."); return; }
    if (regPass.length < 6) { setRegError("Mật khẩu phải có ít nhất 6 ký tự."); return; }
    if (regPass !== regConfirm) { setRegError("Mật khẩu xác nhận không khớp."); return; }
    setRegSuccess(true);
    setTimeout(() => { setTab("login"); setRegSuccess(false); setRegName(""); setRegEmail(""); setRegPass(""); setRegConfirm(""); }, 2000);
  };

  return (
    /* Outer wrapper — fills viewport, no overflow so page never scrolls */
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

      {/* ── Background photo ── */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `url("${BG_URL}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* ── Dark overlay + colour tints ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(160deg, rgba(4,1,1,0.80) 0%, rgba(6,2,2,0.68) 50%, rgba(2,1,1,0.86) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "radial-gradient(ellipse 65% 50% at 18% 18%, rgba(212,59,31,0.20) 0%, transparent 55%), radial-gradient(ellipse 50% 45% at 82% 82%, rgba(255,160,60,0.08) 0%, transparent 60%)" }} />

      {/* ── Floating orbs ── */}
      <motion.div animate={{ x:[0,26,-18,0], y:[0,-34,18,0] }} transition={{ duration:16, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:"5%", left:"8%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,59,31,0.18) 0%,transparent 70%)", filter:"blur(52px)", zIndex:3, pointerEvents:"none" }} />
      <motion.div animate={{ x:[0,-20,28,0], y:[0,28,-20,0] }} transition={{ duration:20, repeat:Infinity, ease:"easeInOut", delay:3 }}
        style={{ position:"absolute", bottom:"4%", right:"6%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,110,30,0.12) 0%,transparent 70%)", filter:"blur(60px)", zIndex:3, pointerEvents:"none" }} />

      {/* ── Scrollable content area (inner scroll only) ── */}
      <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:460, maxHeight:"100vh", overflowY:"auto", padding:"68px 16px 32px", boxSizing:"border-box" }}>

        {/* Back link */}
        <motion.div initial={{ opacity:0, x:-14 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.12, duration:0.45, ease:EASE }}
          style={{ position:"absolute", top:14, left:20 }}>
          <Link href="/"
            style={{ display:"flex", alignItems:"center", gap:6, color:TEXT60, fontSize:13, textDecoration:"none", transition:"color 0.2s" }}
            onMouseEnter={e=>(e.currentTarget.style.color=TEXT)}
            onMouseLeave={e=>(e.currentTarget.style.color=TEXT60)}>
            <ArrowLeft size={14}/> Về trang chủ
          </Link>
        </motion.div>

        {/* Logo */}
        <motion.div initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08, duration:0.5, ease:EASE }}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:22 }}>
          <Link href="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", marginBottom:4 }}>
            <motion.div whileHover={{ scale:1.12, rotate:-5 }} transition={SPRING}
              style={{ width:40, height:40, borderRadius:11, background:RED, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, fontWeight:700, boxShadow:`0 6px 26px rgba(212,59,31,0.48)` }}>
              VW
            </motion.div>
            <span style={{ color:TEXT, fontWeight:700, fontSize:18, letterSpacing:"-0.03em" }}>Việt Web</span>
          </Link>
          <p style={{ color:TEXT35, fontSize:12, letterSpacing:"0.02em" }}>Nền tảng thiết kế & cho thuê website</p>
        </motion.div>

        {/* ── Card — glass blur so bg shows through ── */}
        <motion.div
          initial={{ opacity:0, y:22, scale:0.97 }}
          animate={{ opacity:1, y:0, scale:1 }}
          transition={{ delay:0.16, duration:0.6, ease:EASE }}
          style={{
            borderRadius:28,
            overflow:"hidden",
            /* transparent enough to see bg, strong blur */
            background:"rgba(5,2,2,0.38)",
            backdropFilter:"blur(32px)",
            WebkitBackdropFilter:"blur(32px)",
            border:"1px solid rgba(237,232,225,0.09)",
            boxShadow:"0 24px 64px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Tabs */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", borderBottom:"1px solid rgba(237,232,225,0.07)" }}>
            {(["login","register"] as Tab[]).map(t=>(
              <button key={t} onClick={()=>switchTab(t)}
                style={{ padding:"15px 0", fontSize:13, fontWeight:600, border:"none", cursor:"pointer", background:"transparent", color:tab===t?TEXT:TEXT60, transition:"color 0.22s", display:"flex", alignItems:"center", justifyContent:"center", gap:6, position:"relative" }}>
                {t==="login" ? <><LogIn size={13}/> Đăng nhập</> : <><UserPlus size={13}/> Đăng ký</>}
                {tab===t && (
                  <>
                    <motion.div layoutId="tab-line" style={{ position:"absolute", bottom:0, left:"16%", right:"16%", height:2, borderRadius:2, background:RED }} transition={SPRING}/>
                    <motion.div layoutId="tab-glow" style={{ position:"absolute", inset:0, background:"rgba(212,59,31,0.07)", pointerEvents:"none" }} transition={SPRING}/>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Form body — FIXED MIN-HEIGHT eliminates the jump */}
          <div style={{ padding:"26px 26px 28px" }}>

            {/*
             * minHeight: "390px" holds both forms without resize.
             * position:relative + the absolute-positioned slides handle the swap.
             */}
            <div style={{ position:"relative", minHeight:390, overflow:"hidden" }}>
              <AnimatePresence mode="wait" initial={false}>
                {tab==="login" ? (
                  <motion.form key="login" onSubmit={handleLogin}
                    initial={{ opacity:0, x:-32, filter:"blur(6px)" }}
                    animate={{ opacity:1, x:0, filter:"blur(0px)" }}
                    exit={{ opacity:0, x:32, filter:"blur(6px)" }}
                    transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
                    style={{ width:"100%" }}
                  >
                    <h2 style={{ color:TEXT, fontSize:20, fontWeight:700, marginBottom:3, letterSpacing:"-0.04em" }}>Chào mừng trở lại</h2>
                    <p style={{ color:TEXT60, fontSize:13, marginBottom:20 }}>Đăng nhập để quản lý website của bạn.</p>

                    <FL>Email</FL>
                    <AI value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} type="email" placeholder="ban@email.com"/>

                    <FL>Mật khẩu</FL>
                    <div style={{ position:"relative", marginBottom:6 }}>
                      <AI value={loginPass} onChange={e=>setLoginPass(e.target.value)} type={showLoginPass?"text":"password"} placeholder="••••••••" noMargin/>
                      <EyeBtn show={showLoginPass} toggle={()=>setShowLoginPass(v=>!v)}/>
                    </div>
                    <div style={{ textAlign:"right", marginBottom:16 }}>
                      <a href="#" style={{ color:TEXT35, fontSize:12, textDecoration:"none" }}
                        onMouseEnter={e=>(e.currentTarget.style.color=TEXT60)}
                        onMouseLeave={e=>(e.currentTarget.style.color=TEXT35)}>Quên mật khẩu?</a>
                    </div>

                    <AnimatePresence>
                      {loginError && <Msg key="e" type="error">{loginError}</Msg>}
                      {loginSuccess && <Msg key="s" type="success">Đăng nhập thành công! Đang chuyển hướng...</Msg>}
                    </AnimatePresence>

                    <SubmitBtn label="Đăng nhập" icon={<LogIn size={14}/>}/>
                    <p style={{ marginTop:14, textAlign:"center", fontSize:12, color:TEXT35 }}>
                      Chưa có tài khoản? <InlineLink onClick={()=>switchTab("register")}>Đăng ký miễn phí</InlineLink>
                    </p>
                  </motion.form>
                ) : (
                  <motion.form key="register" onSubmit={handleRegister}
                    initial={{ opacity:0, x:32, filter:"blur(6px)" }}
                    animate={{ opacity:1, x:0, filter:"blur(0px)" }}
                    exit={{ opacity:0, x:-32, filter:"blur(6px)" }}
                    transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
                    style={{ width:"100%" }}
                  >
                    <h2 style={{ color:TEXT, fontSize:20, fontWeight:700, marginBottom:3, letterSpacing:"-0.04em" }}>Tạo tài khoản</h2>
                    <p style={{ color:TEXT60, fontSize:13, marginBottom:20 }}>Đăng ký để bắt đầu sử dụng dịch vụ Việt Web.</p>

                    <FL>Họ và tên</FL>
                    <AI value={regName} onChange={e=>setRegName(e.target.value)} type="text" placeholder="Nguyễn Văn A"/>

                    <FL>Email</FL>
                    <AI value={regEmail} onChange={e=>setRegEmail(e.target.value)} type="email" placeholder="ban@email.com"/>

                    <FL>Mật khẩu</FL>
                    <div style={{ position:"relative", marginBottom:14 }}>
                      <AI value={regPass} onChange={e=>setRegPass(e.target.value)} type={showRegPass?"text":"password"} placeholder="Ít nhất 6 ký tự" noMargin/>
                      <EyeBtn show={showRegPass} toggle={()=>setShowRegPass(v=>!v)}/>
                    </div>

                    <FL>Xác nhận mật khẩu</FL>
                    <AI value={regConfirm} onChange={e=>setRegConfirm(e.target.value)} type="password" placeholder="Nhập lại mật khẩu"/>

                    <AnimatePresence>
                      {regError && <Msg key="e" type="error">{regError}</Msg>}
                      {regSuccess && <Msg key="s" type="success">Đăng ký thành công! Chuyển sang đăng nhập...</Msg>}
                    </AnimatePresence>

                    <SubmitBtn label="Tạo tài khoản" icon={<UserPlus size={14}/>} dimBg/>
                    <p style={{ marginTop:14, textAlign:"center", fontSize:12, color:TEXT35 }}>
                      Đã có tài khoản? <InlineLink onClick={()=>switchTab("login")}>Đăng nhập ngay</InlineLink>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Social — always visible, outside the animated area */}
            <div style={{ display:"flex", alignItems:"center", gap:10, margin:"18px 0 14px", color:TEXT35, fontSize:11 }}>
              <div style={{ flex:1, height:1, background:BORDER_M }}/> HOẶC <div style={{ flex:1, height:1, background:BORDER_M }}/>
            </div>
            <motion.button type="button"
              whileHover={{ scale:1.015, background:"rgba(255,255,255,0.09)" }}
              whileTap={{ scale:0.97 }}
              transition={SPRING}
              style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:10, padding:"11px 0", borderRadius:14, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(237,232,225,0.10)", color:TEXT60, fontSize:13, cursor:"pointer" }}
            >
              <GoogleIcon/> Tiếp tục với Google
            </motion.button>
          </div>
        </motion.div>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          style={{ textAlign:"center", marginTop:16, color:TEXT35, fontSize:11, lineHeight:1.7 }}>
          Bằng cách đăng ký, bạn đồng ý với{" "}
          <a href="#" style={{ color:TEXT60, textDecoration:"underline" }}>Điều khoản</a> và{" "}
          <a href="#" style={{ color:TEXT60, textDecoration:"underline" }}>Chính sách bảo mật</a>.
        </motion.p>
      </div>
    </div>
  );
}

// ─── Micro-components ────────────────────────────────────────────────────────

function FL({ children }: { children: React.ReactNode }) {
  return <label style={{ display:"block", color:TEXT60, fontSize:12, marginBottom:7, fontWeight:500 }}>{children}</label>;
}

function AI({ noMargin, ...p }: React.InputHTMLAttributes<HTMLInputElement> & { noMargin?: boolean }) {
  return (
    <input {...p} style={{
      width:"100%", boxSizing:"border-box",
      background:"rgba(255,255,255,0.055)", border:"1px solid rgba(237,232,225,0.09)",
      borderRadius:12, padding:"10px 13px", color:TEXT, fontSize:13, outline:"none",
      marginBottom: noMargin ? 0 : 13, transition:"border-color 0.2s, background 0.2s",
      ...(p.type==="password" ? { paddingRight:42 } : {}),
    }}
    onFocus={e=>{ e.currentTarget.style.borderColor="rgba(212,59,31,0.42)"; e.currentTarget.style.background="rgba(255,255,255,0.08)"; }}
    onBlur={e=>{ e.currentTarget.style.borderColor="rgba(237,232,225,0.09)"; e.currentTarget.style.background="rgba(255,255,255,0.055)"; }}
    />
  );
}

function EyeBtn({ show, toggle }: { show: boolean; toggle: () => void }) {
  return (
    <button type="button" onClick={toggle}
      style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:TEXT35, display:"flex", padding:4 }}>
      {show ? <EyeOff size={15}/> : <Eye size={15}/>}
    </button>
  );
}

function Msg({ children, type }: { children: React.ReactNode; type: "error"|"success" }) {
  const isErr = type==="error";
  return (
    <motion.div initial={{ opacity:0, y:-6, height:0 }} animate={{ opacity:1, y:0, height:"auto" }} exit={{ opacity:0, height:0 }}
      style={{ overflow:"hidden", marginBottom:10, padding:"9px 13px", borderRadius:11,
        background: isErr?"rgba(212,59,31,0.12)":"rgba(34,197,94,0.10)",
        border:`1px solid ${isErr?"rgba(212,59,31,0.25)":"rgba(34,197,94,0.25)"}`,
        color: isErr?"#fca5a5":"#86efac", fontSize:12 }}>
      {children}
    </motion.div>
  );
}

function SubmitBtn({ label, icon, dimBg }: { label: string; icon: React.ReactNode; dimBg?: boolean }) {
  return (
    <motion.button type="submit" whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
      transition={{ type:"spring", stiffness:400, damping:34 }}
      style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px 0", borderRadius:14,
        background: dimBg?"rgba(212,59,31,0.78)":"#D43B1F",
        border:"none", color:"#fff", fontSize:14, fontWeight:600, cursor:"pointer",
        boxShadow:"0 4px 22px rgba(212,59,31,0.36)" }}>
      {icon} {label}
    </motion.button>
  );
}

function InlineLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      style={{ background:"none", border:"none", cursor:"pointer", color:"#f87171", fontSize:12, padding:0, fontWeight:500 }}>
      {children}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
