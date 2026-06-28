import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── Image URLs ───────────────────────────────────────────────────────────────

const IMG = {
  hero: "https://images.unsplash.com/photo-1767090250602-45a03c33e93c?w=1920&h=1080&fit=crop&auto=format",
  proj1: "https://images.unsplash.com/photo-1767090250509-42559de18c13?w=900&h=600&fit=crop&auto=format",
  proj2: "https://images.unsplash.com/photo-1767525055883-96d5d0933ebe?w=700&h=900&fit=crop&auto=format",
  proj3: "https://images.unsplash.com/photo-1759134334610-488eb3937c82?w=900&h=600&fit=crop&auto=format",
  proj4: "https://images.unsplash.com/photo-1781431018532-3564e7c0914b?w=900&h=600&fit=crop&auto=format",
  carv1: "https://images.unsplash.com/photo-1640715751438-7120b3019712?w=600&h=800&fit=crop&auto=format",
  carv2: "https://images.unsplash.com/photo-1688406265997-77897c1a31d1?w=800&h=600&fit=crop&auto=format",
  carv3: "https://images.unsplash.com/photo-1766327561925-a3b512a7cf84?w=500&h=750&fit=crop&auto=format",
  temp5: "https://images.unsplash.com/photo-1777139820219-013aa3ce39e4?w=600&h=900&fit=crop&auto=format",
  temp6: "https://images.unsplash.com/photo-1693234719489-171fa68e6033?w=800&h=600&fit=crop&auto=format",
};

// ─── Static data ──────────────────────────────────────────────────────────────

const STARS = Array.from({ length: 180 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 1.8 + 0.3,
  delay: Math.random() * 6,
  dur: Math.random() * 4 + 2,
}));

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: Math.random() * 4 + 2,
  delay: Math.random() * 8,
  dur: Math.random() * 6 + 6,
  opacity: Math.random() * 0.6 + 0.2,
}));

const PROJECTS = [
  { roman: "I", title: "Arulmigu Meenakshi Temple", loc: "Madurai, Tamil Nadu", year: "2022", desc: "Restoration and expansion of the sacred 12-tower gopuram complex, spanning 45 acres of divine architecture.", img: IMG.proj1 },
  { roman: "II", title: "Sri Murugan Devasthanam", loc: "Tiruchendur, Tamil Nadu", year: "2021", desc: "A 108-foot coastal gopuram constructed using traditional Agama Shastra, carved from Kadappa stone.", img: IMG.proj2 },
  { roman: "III", title: "Brihadeeswarar Annex", loc: "Thanjavur, Tamil Nadu", year: "2020", desc: "New mandapam and pillar complex mirroring the Chola aesthetic, built with 3,200 granite monoliths.", img: IMG.proj3 },
  { roman: "IV", title: "Annamalaiyar Renovation", loc: "Thiruvannamalai, Tamil Nadu", year: "2023", desc: "Complete inner sanctum restoration and Rajagopuram enhancement for the hill temple complex.", img: IMG.proj4 },
];

const SERVICES = [
  { icon: "⬡", title: "Temple Architecture", desc: "End-to-end design rooted in Agama Shastra and Vastu Vidya, from initial sthana shuddhi to final plan." },
  { icon: "◈", title: "Gopuram Construction", desc: "Tiered towers built by hereditary Sthapati lineages using traditional granite, brick, and mortar." },
  { icon: "✦", title: "Stone Sculpture", desc: "Panel carvings, deity sculptures, and relief work by master shilpis trained in 64 classical forms." },
  { icon: "◉", title: "Sacred Space Planning", desc: "Ritual spatial arrangement of sanctum, corridors, tanks, and cardinal alignments per Manasara." },
  { icon: "⟁", title: "Temple Restoration", desc: "Structural rehabilitation and authentic re-carving of heritage temples across South India." },
  { icon: "⬟", title: "Mandapam & Pillars", desc: "Intricately sculpted pillar halls — Kalyana, Sabha, and Alankara — honoring classical proportions." },
];

const TIMELINE = [
  { stage: "I", title: "Sthana Shuddhi", sub: "Site purification & Vastu mapping" },
  { stage: "II", title: "Agama Shastra", sub: "Sacred text-based architectural planning" },
  { stage: "III", title: "Garbhagriha", sub: "Foundation rites & sanctum construction" },
  { stage: "IV", title: "Mandapam", sub: "Pillared halls, corridors & prakarams" },
  { stage: "V", title: "Gopuram", sub: "Tower erection, tier by sacred tier" },
  { stage: "VI", title: "Shilpa Kala", sub: "Stone carving, sculptures & finial work" },
  { stage: "VII", title: "Kumbhabhishekam", sub: "Consecration ceremony & divine installation" },
];

const TESTIMONIALS = [
  { name: "Swami Venkataramana Bhattar", role: "Chief Priest, Tirupati Devasthanam Trust", text: "Sthapati's work on our mandapam transcended architecture. Every pillar breathes with devotion. Their Sthapatis understand the soul of sacred space in ways that modern engineers never could." },
  { name: "Dr. Ramaswamy Iyer", role: "Chairman, Tamil Nadu Temple Conservation Board", text: "We entrusted our 900-year-old Chola temple's restoration to Sthapati. Their reverence for heritage, combined with structural precision, delivered a result that will stand for centuries more." },
  { name: "Smt. Lakshmi Ammal Mudaliar", role: "Chairperson, Kumbakonam Temple Trust", text: "From the moment they presented the blueprints, we knew this was different. The gopuram they erected is not just built — it is composed, like a symphony in granite and devotion." },
];

const STATS = [
  { num: 150, suffix: "+", label: "Temples Consecrated" },
  { num: 48, suffix: " yrs", label: "Heritage of Excellence" },
  { num: 2400, suffix: "+", label: "Master Artisans" },
  { num: 18, suffix: "", label: "States Across India" },
];

const GALLERY = [
  { img: IMG.temp5, title: "Sri Murugan Devasthanam", loc: "Tiruchendur", grid: "row-span-2" },
  { img: IMG.carv2, title: "Nataraja Relief Panel", loc: "Chidambaram", grid: "" },
  { img: IMG.carv1, title: "Elephant Frieze", loc: "Mahabalipuram", grid: "" },
  { img: IMG.carv3, title: "Celestial Dancer", loc: "Thanjavur", grid: "row-span-2" },
  { img: IMG.temp6, title: "Arulmigu Kali Temple", loc: "Kanchipuram", grid: "" },
  { img: IMG.proj4, title: "Annamalaiyar Tower", loc: "Thiruvannamalai", grid: "" },
];

// ─── Global styles ────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  html { scroll-behavior: smooth; cursor: none; }
  body { overflow-x: hidden; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: #0A0805; }
  ::-webkit-scrollbar-thumb { background: #C9A96E; }

  .f-cinzel { font-family: 'Cinzel', serif; }
  .f-deco { font-family: 'Cinzel Decorative', serif; }
  .f-gara { font-family: 'EB Garamond', serif; }

  @keyframes floatUp {
    0%   { transform: translateY(0) translateX(0); opacity: 0.7; }
    50%  { transform: translateY(-55px) translateX(8px); opacity: 0.35; }
    100% { transform: translateY(-110px) translateX(-4px); opacity: 0; }
  }
  @keyframes goldShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes gentleFloat {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes breathePulse {
    0%,100% { box-shadow: 0 0 20px rgba(201,169,110,0.25); }
    50%     { box-shadow: 0 0 40px rgba(201,169,110,0.55); }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes revealTemple {
    from { clip-path: inset(100% 0 0 0); opacity: 0.4; }
    to   { clip-path: inset(0% 0 0 0); opacity: 1; }
  }
  @keyframes heroZoom {
    from { transform: scale(1); }
    to   { transform: scale(1.07); }
  }
  @keyframes letterReveal {
    from { opacity: 0; transform: translateY(18px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%,100% { text-shadow: 0 0 20px rgba(201,169,110,0.2); }
    50%     { text-shadow: 0 0 40px rgba(201,169,110,0.5), 0 0 70px rgba(201,169,110,0.2); }
  }
  @keyframes starTwinkle {
    0%,100% { opacity: 0.25; transform: scale(1); }
    50%     { opacity: 1; transform: scale(1.6); }
  }
  @keyframes diyaFlicker {
    0%,100% { transform: scaleY(1) scaleX(1); }
    30%     { transform: scaleY(1.12) scaleX(0.9) translateX(-1px); }
    70%     { transform: scaleY(0.9) scaleX(1.1) translateX(1px); }
  }
  @keyframes lineGrow {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes loadProgress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes smokeRise {
    0%   { opacity: 0.5; transform: translateY(0) scaleX(1); }
    100% { opacity: 0; transform: translateY(-50px) scaleX(2); }
  }
  @keyframes subtleOrbit {
    from { transform: rotate(0deg) translateX(4px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(4px) rotate(-360deg); }
  }

  .gold-text {
    background: linear-gradient(120deg, #A07840 0%, #C9A96E 25%, #F5DFA0 50%, #E8C87A 75%, #C9A96E 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: goldShimmer 5s linear infinite;
  }
  .gold-line {
    background: linear-gradient(90deg, transparent, #C9A96E, #E8C87A, #C9A96E, transparent);
  }
  .glass {
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(201,169,110,0.14);
  }
  .stone {
    background: linear-gradient(135deg, #181310 0%, #221c14 50%, #181310 100%);
    border: 1px solid rgba(201,169,110,0.18);
    position: relative; overflow: hidden;
  }
  .stone::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background: repeating-linear-gradient(
      0deg, transparent, transparent 40px,
      rgba(201,169,110,0.03) 40px, rgba(201,169,110,0.03) 41px
    ),
    repeating-linear-gradient(
      90deg, transparent, transparent 40px,
      rgba(201,169,110,0.03) 40px, rgba(201,169,110,0.03) 41px
    );
  }
  .stone::after {
    content:''; position:absolute; inset:0; pointer-events:none;
    background: linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.5s;
  }
  .stone:hover::after { opacity: 1; }

  .reveal {
    opacity: 0; transform: translateY(36px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .reveal.in { opacity: 1; transform: translateY(0); }

  .reveal-l {
    opacity: 0; transform: translateX(-48px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .reveal-l.in { opacity: 1; transform: translateX(0); }

  .reveal-r {
    opacity: 0; transform: translateX(48px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .reveal-r.in { opacity: 1; transform: translateX(0); }

  .btn-gold {
    background: linear-gradient(135deg, #C9A96E 0%, #E8C87A 50%, #C9A96E 100%);
    background-size: 200% auto;
    color: #0A0805;
    transition: background-position 0.4s, transform 0.2s, box-shadow 0.3s;
    animation: breathePulse 3s ease-in-out infinite;
  }
  .btn-gold:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(201,169,110,0.38);
  }
  .btn-outline {
    border: 1px solid rgba(201,169,110,0.5);
    color: #C9A96E;
    transition: all 0.4s;
  }
  .btn-outline:hover {
    background: rgba(201,169,110,0.1);
    border-color: #C9A96E;
    box-shadow: 0 0 30px rgba(201,169,110,0.2);
  }

  .proj-card { transition: transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94); }
  .proj-card:hover { transform: translateY(-10px) rotateX(2deg); }
  .proj-card .proj-overlay {
    background: linear-gradient(to top, rgba(10,8,5,0.95) 0%, rgba(10,8,5,0.4) 60%, transparent 100%);
    opacity: 0.8; transition: opacity 0.4s;
  }
  .proj-card:hover .proj-overlay { opacity: 1; }

  .gal-item img { transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
  .gal-item:hover img { transform: scale(1.06); }
  .gal-item::after {
    content:''; position:absolute; inset:0;
    border: 0px solid rgba(201,169,110,0.6);
    transition: border-width 0.4s, box-shadow 0.4s;
    pointer-events:none;
  }
  .gal-item:hover::after {
    border-width: 2px;
    box-shadow: inset 0 0 30px rgba(201,169,110,0.15);
  }

  .svc-card {
    transition: transform 0.5s ease, box-shadow 0.5s ease;
  }
  .svc-card:nth-child(1) { animation: gentleFloat 7s ease-in-out infinite; }
  .svc-card:nth-child(2) { animation: gentleFloat 7s ease-in-out 0.6s infinite; }
  .svc-card:nth-child(3) { animation: gentleFloat 7s ease-in-out 1.2s infinite; }
  .svc-card:nth-child(4) { animation: gentleFloat 7s ease-in-out 1.8s infinite; }
  .svc-card:nth-child(5) { animation: gentleFloat 7s ease-in-out 2.4s infinite; }
  .svc-card:nth-child(6) { animation: gentleFloat 7s ease-in-out 3.0s infinite; }
  .svc-card:hover {
    transform: translateY(-18px) !important;
    box-shadow: 0 30px 80px rgba(201,169,110,0.18) !important;
    animation-play-state: paused;
  }

  .tl-line {
    position:absolute; left:50%; top:0; bottom:0;
    width:1px; background:linear-gradient(to bottom,transparent,rgba(201,169,110,0.4),transparent);
    transform:translateX(-50%);
  }
  .nav-link { position:relative; }
  .nav-link::after {
    content:''; position:absolute; bottom:-2px; left:0;
    width:0; height:1px;
    background:linear-gradient(90deg,#C9A96E,#E8C87A);
    transition:width 0.4s;
  }
  .nav-link:hover::after { width:100%; }

  .cursor-dot {
    position:fixed; width:10px; height:10px; border-radius:50%;
    background:radial-gradient(circle,rgba(201,169,110,0.95) 0%,rgba(201,169,110,0.3) 70%,transparent 100%);
    pointer-events:none; z-index:9999; transform:translate(-50%,-50%);
    filter:drop-shadow(0 0 6px rgba(201,169,110,0.7));
    transition:width 0.2s,height 0.2s;
  }
  .cursor-ring {
    position:fixed; width:36px; height:36px; border-radius:50%;
    border:1px solid rgba(201,169,110,0.38);
    pointer-events:none; z-index:9998; transform:translate(-50%,-50%);
  }

  .scroll-bar {
    position:fixed; top:0; left:0; height:2px;
    background:linear-gradient(90deg,#C9A96E,#E8C87A,#C9A96E);
    z-index:9997; pointer-events:none;
    transition:width 0.1s linear;
  }

  .mandala {
    position:absolute; border-radius:50%; pointer-events:none;
    border:1px solid rgba(201,169,110,0.07);
  }

  .section-label {
    font-family:'Cinzel',serif;
    font-size:0.65rem; letter-spacing:0.35em;
    color:rgba(201,169,110,0.55); text-transform:uppercase;
  }
  .divider {
    width:48px; height:1px; margin:0 auto;
    background:linear-gradient(90deg,transparent,#C9A96E,transparent);
  }
`;

// ─── Inject styles ─────────────────────────────────────────────────────────────

function useGlobalStyles() {
  useEffect(() => {
    const id = "sthapati-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);
}

// ─── Scroll reveal ─────────────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.12 }
    );
    const els = document.querySelectorAll(".reveal,.reveal-l,.reveal-r");
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── Custom cursor ─────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = -100, ry = -100, cx = -100, cy = -100, raf = 0;
    const move = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; };
    const tick = () => {
      rx += (cx - rx) * 0.13; ry += (cy - ry) * 0.13;
      if (dotRef.current) { dotRef.current.style.left = cx + "px"; dotRef.current.style.top = cy + "px"; }
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────

function ScrollBar() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      if (barRef.current) barRef.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div ref={barRef} className="scroll-bar" />;
}

// ─── Particles ────────────────────────────────────────────────────────────────

function HeroParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="hero-particle absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(201,169,110,${p.opacity}) 0%, rgba(201,169,110,0.1) 60%, transparent 100%)`,
            animation: `floatUp ${p.dur}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Loading screen ───────────────────────────────────────────────────────────

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);
  const [phaseText, setPhaseText] = useState("Awakening the Sacred Space...");

  useEffect(() => {
    const texts = [
      "Awakening the Sacred Space...",
      "Invoking the Master Architect...",
      "Crafting Sacred Spaces...",
    ];
    let i = 0;
    const ti = setInterval(() => { i = (i + 1) % texts.length; setPhaseText(texts[i]); }, 1100);
    return () => clearInterval(ti);
  }, []);

  useEffect(() => {
    const start = performance.now();
    const dur = 3800;
    const tick = (now: number) => {
      const p = Math.min(((now - start) / dur) * 100, 100);
      setPct(Math.round(p));
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(onComplete, 300);
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#050302" }}
    >
      {/* Radial glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
          animation: "breathePulse 3s ease-in-out infinite",
        }}
      />

      {/* Rotating geometric ring */}
      <div className="absolute" style={{ width: 420, height: 420, animation: "rotateSlow 30s linear infinite", opacity: 0.12 }}>
        <svg viewBox="0 0 420 420" width="420" height="420" fill="none">
          <circle cx="210" cy="210" r="200" stroke="#C9A96E" strokeWidth="0.5" strokeDasharray="8 6" />
          <circle cx="210" cy="210" r="180" stroke="#C9A96E" strokeWidth="0.3" strokeDasharray="4 10" />
          {[0,45,90,135,180,225,270,315].map((a) => (
            <line
              key={a}
              x1={210 + 165 * Math.cos(a * Math.PI / 180)}
              y1={210 + 165 * Math.sin(a * Math.PI / 180)}
              x2={210 + 200 * Math.cos(a * Math.PI / 180)}
              y2={210 + 200 * Math.sin(a * Math.PI / 180)}
              stroke="#C9A96E" strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Counter-rotating inner ring */}
      <div className="absolute" style={{ width: 320, height: 320, animation: "rotateSlow 20s linear infinite reverse", opacity: 0.18 }}>
        <svg viewBox="0 0 320 320" width="320" height="320" fill="none">
          <polygon points="160,10 310,250 10,250" stroke="#C9A96E" strokeWidth="0.5" />
          <polygon points="160,310 10,70 310,70" stroke="#C9A96E" strokeWidth="0.5" />
          <circle cx="160" cy="160" r="60" stroke="#C9A96E" strokeWidth="0.4" strokeDasharray="5 5" />
        </svg>
      </div>

      {/* Temple silhouette SVG */}
      <div
        className="relative z-10 mb-10"
        style={{
          animation: "revealTemple 2.4s cubic-bezier(0.22,1,0.36,1) 0.3s both",
          filter: "drop-shadow(0 0 20px rgba(201,169,110,0.5)) drop-shadow(0 0 60px rgba(201,169,110,0.15))",
        }}
      >
        <svg viewBox="0 0 240 330" width="160" height="220" fill="none">
          {/* Ground */}
          <rect x="5" y="315" width="230" height="12" rx="1" stroke="#C9A96E" strokeWidth="0.7" fill="rgba(201,169,110,0.05)" />
          {/* Base steps */}
          <rect x="25" y="295" width="190" height="20" stroke="#C9A96E" strokeWidth="0.6" fill="rgba(201,169,110,0.04)" />
          <rect x="40" y="285" width="160" height="12" stroke="#C9A96E" strokeWidth="0.5" fill="rgba(201,169,110,0.03)" />
          {/* Main entrance hall */}
          <rect x="60" y="235" width="120" height="50" stroke="#C9A96E" strokeWidth="0.8" fill="rgba(201,169,110,0.04)" />
          {/* Arch */}
          <path d="M80 235 Q120 210 160 235" stroke="#C9A96E" strokeWidth="0.7" fill="none" />
          {/* Pillars */}
          <rect x="72" y="235" width="10" height="50" stroke="#C9A96E" strokeWidth="0.4" fill="rgba(201,169,110,0.06)" />
          <rect x="158" y="235" width="10" height="50" stroke="#C9A96E" strokeWidth="0.4" fill="rgba(201,169,110,0.06)" />
          {/* Tier 1 */}
          <polygon points="30,235 210,235 200,205 40,205" stroke="#C9A96E" strokeWidth="0.8" fill="rgba(201,169,110,0.03)" />
          <line x1="30" y1="220" x2="210" y2="220" stroke="#C9A96E" strokeWidth="0.25" opacity="0.5" />
          {/* Tier 2 */}
          <polygon points="46,205 194,205 185,178 55,178" stroke="#C9A96E" strokeWidth="0.7" fill="rgba(201,169,110,0.03)" />
          {/* Tier 3 */}
          <polygon points="60,178 180,178 172,154 68,154" stroke="#C9A96E" strokeWidth="0.7" fill="rgba(201,169,110,0.03)" />
          {/* Tier 4 */}
          <polygon points="72,154 168,154 161,132 79,132" stroke="#C9A96E" strokeWidth="0.6" fill="rgba(201,169,110,0.03)" />
          {/* Tier 5 */}
          <polygon points="82,132 158,132 152,113 88,113" stroke="#C9A96E" strokeWidth="0.6" fill="rgba(201,169,110,0.03)" />
          {/* Tier 6 */}
          <polygon points="90,113 150,113 145,96 95,96" stroke="#C9A96E" strokeWidth="0.5" fill="rgba(201,169,110,0.04)" />
          {/* Tier 7 */}
          <polygon points="97,96 143,96 139,81 101,81" stroke="#C9A96E" strokeWidth="0.5" fill="rgba(201,169,110,0.04)" />
          {/* Neck */}
          <ellipse cx="120" cy="70" rx="20" ry="12" stroke="#C9A96E" strokeWidth="0.6" fill="rgba(201,169,110,0.07)" />
          {/* Kalasam */}
          <path d="M108 70 Q111 56 120 51 Q129 56 132 70" stroke="#C9A96E" strokeWidth="0.7" fill="rgba(201,169,110,0.06)" />
          {/* Upper dome */}
          <ellipse cx="120" cy="45" rx="10" ry="8" stroke="#C9A96E" strokeWidth="0.6" fill="rgba(201,169,110,0.08)" />
          {/* Disc */}
          <ellipse cx="120" cy="35" rx="6" ry="3" stroke="#C9A96E" strokeWidth="0.5" fill="rgba(201,169,110,0.1)" />
          {/* Finial */}
          <circle cx="120" cy="27" r="3.5" stroke="#C9A96E" strokeWidth="0.6" fill="rgba(201,169,110,0.3)" />
          {/* Glow dots */}
          <circle cx="45" cy="220" r="1.5" fill="#C9A96E" opacity="0.5" />
          <circle cx="195" cy="220" r="1.5" fill="#C9A96E" opacity="0.5" />
          <circle cx="55" cy="192" r="1" fill="#C9A96E" opacity="0.4" />
          <circle cx="185" cy="192" r="1" fill="#C9A96E" opacity="0.4" />
        </svg>
      </div>

      {/* Company name */}
      <div
        className="z-10 text-center mb-2"
        style={{ animation: "fadeInUp 0.8s ease 1.8s both" }}
      >
        <div className="gold-text f-deco text-3xl tracking-widest">STHAPATI</div>
        <div className="section-label mt-1">Temple Architecture & Construction</div>
      </div>

      {/* Phase text */}
      <div
        className="z-10 f-gara text-sm mb-8 transition-all duration-700"
        style={{ color: "rgba(201,169,110,0.5)", animation: "fadeInUp 0.6s ease 2.2s both" }}
      >
        {phaseText}
      </div>

      {/* Progress bar */}
      <div
        className="z-10 relative"
        style={{ width: 280, animation: "fadeInUp 0.6s ease 2.0s both" }}
      >
        <div className="w-full h-px bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100 linear"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, rgba(201,169,110,0.4), #C9A96E, #E8C87A)",
            }}
          />
        </div>
        <div className="f-cinzel text-right mt-1" style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.6rem", letterSpacing: "0.2em" }}>
          {pct}%
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.slice(0, 14).map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`, bottom: 0,
              width: p.size * 0.8, height: p.size * 0.8,
              background: `rgba(201,169,110,${p.opacity * 0.5})`,
              animation: `floatUp ${p.dur}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Heritage", "Projects", "Services", "Process", "Gallery", "Contact"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[900] transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,8,5,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,169,110,0.1)" : "none",
        padding: scrolled ? "14px 0" : "22px 0",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <svg width="28" height="36" viewBox="0 0 28 36" fill="none" style={{ filter: "drop-shadow(0 0 8px rgba(201,169,110,0.4))" }}>
            <polygon points="14,2 26,28 2,28" stroke="#C9A96E" strokeWidth="0.8" fill="rgba(201,169,110,0.06)" />
            <line x1="14" y1="2" x2="14" y2="34" stroke="#C9A96E" strokeWidth="0.5" />
            <ellipse cx="14" cy="10" rx="4" ry="3" stroke="#C9A96E" strokeWidth="0.5" fill="rgba(201,169,110,0.15)" />
          </svg>
          <div>
            <div className="f-deco text-sm tracking-widest" style={{ color: "#C9A96E" }}>STHAPATI</div>
            <div className="section-label" style={{ fontSize: "0.5rem" }}>Est. 1976</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link f-cinzel text-xs tracking-widest transition-colors" style={{ color: "rgba(245,230,200,0.65)", fontSize: "0.65rem" }}>
              {l.toUpperCase()}
            </a>
          ))}
          <a href="#contact" className="btn-gold f-cinzel px-5 py-2 rounded-sm text-xs tracking-widest cursor-none" style={{ fontSize: "0.65rem" }}>
            COMMISSION
          </a>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} style={{ color: "#C9A96E" }}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="1" />
            <line x1="4" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="1" />
            <line x1="8" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass px-6 py-4 mt-2 mx-4 rounded-sm">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
              className="block f-cinzel py-3 border-b nav-link text-xs tracking-widest"
              style={{ color: "rgba(245,230,200,0.7)", borderColor: "rgba(201,169,110,0.1)", fontSize: "0.65rem" }}>
              {l.toUpperCase()}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ active }: { active: boolean }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const layerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;
    const move = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current = { x: nx, y: ny };
      if (layerRef.current) {
        layerRef.current.style.transform = `translate(${nx * -12}px, ${ny * -8}px) scale(1.07)`;
      }
      if (fgRef.current) {
        fgRef.current.style.transform = `translate(${nx * 6}px, ${ny * 4}px)`;
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [active]);

  const heading = "STHAPATI";
  const subWords = ["Where Divinity Meets Architecture"];

  return (
    <section id="heritage" className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 600 }}>
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={layerRef}
          className="absolute inset-[-10%]"
          style={{
            transition: "transform 0.15s ease-out",
            animation: active ? "heroZoom 20s ease-out forwards" : "none",
          }}
        >
          <img src={IMG.hero} alt="Ornate South Indian temple gopuram" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Multi-layer overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,5,0.97) 0%, rgba(10,8,5,0.65) 40%, rgba(10,8,5,0.3) 70%, rgba(10,8,5,0.5) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.06) 0%, transparent 70%)" }} />

      {/* Mandala decorations */}
      <div className="mandala absolute" style={{ width: 600, height: 600, left: "50%", top: "50%", transform: "translate(-50%,-50%)", animation: "rotateSlow 60s linear infinite" }} />
      <div className="mandala absolute" style={{ width: 450, height: 450, left: "50%", top: "50%", transform: "translate(-50%,-50%)", animation: "rotateSlow 45s linear infinite reverse", borderColor: "rgba(201,169,110,0.05)" }} />

      {/* Particles */}
      <HeroParticles />

      {/* Foreground decorative elements */}
      <div ref={fgRef} className="absolute inset-0 pointer-events-none" style={{ transition: "transform 0.2s ease-out" }}>
        {/* Ornamental corners */}
        <svg className="absolute top-8 left-8" width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.35">
          <path d="M2 58 L2 2 L58 2" stroke="#C9A96E" strokeWidth="0.8" />
          <path d="M10 50 L10 10 L50 10" stroke="#C9A96E" strokeWidth="0.4" />
          <circle cx="2" cy="2" r="2" fill="#C9A96E" />
        </svg>
        <svg className="absolute top-8 right-8" width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.35">
          <path d="M58 58 L58 2 L2 2" stroke="#C9A96E" strokeWidth="0.8" />
          <path d="M50 50 L50 10 L10 10" stroke="#C9A96E" strokeWidth="0.4" />
          <circle cx="58" cy="2" r="2" fill="#C9A96E" />
        </svg>
        <svg className="absolute bottom-24 left-8" width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.35">
          <path d="M2 2 L2 58 L58 58" stroke="#C9A96E" strokeWidth="0.8" />
          <path d="M10 10 L10 50 L50 50" stroke="#C9A96E" strokeWidth="0.4" />
          <circle cx="2" cy="58" r="2" fill="#C9A96E" />
        </svg>
        <svg className="absolute bottom-24 right-8" width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.35">
          <path d="M58 2 L58 58 L2 58" stroke="#C9A96E" strokeWidth="0.8" />
          <path d="M50 10 L50 50 L10 50" stroke="#C9A96E" strokeWidth="0.4" />
          <circle cx="58" cy="58" r="2" fill="#C9A96E" />
        </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Section label */}
        {active && (
          <div className="section-label mb-6" style={{ animation: "fadeInUp 0.7s ease 0.1s both" }}>
            ✦ &nbsp; Sacred Architecture Since 1976 &nbsp; ✦
          </div>
        )}

        {/* Main heading — letter by letter */}
        <h1 className="f-deco mb-4 leading-none tracking-widest" style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}>
          {active && heading.split("").map((ch, i) => (
            <span
              key={i}
              className="gold-text inline-block"
              style={{ animation: `letterReveal 0.55s ease both`, animationDelay: `${i * 0.07}s` }}
            >
              {ch}
            </span>
          ))}
        </h1>

        {/* Divider ornament */}
        {active && (
          <div className="flex items-center gap-3 mb-6" style={{ animation: "fadeInUp 0.7s ease 0.7s both" }}>
            <div className="divider" style={{ width: 80 }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1 L15 8 L8 15 L1 8 Z" stroke="#C9A96E" strokeWidth="0.8" fill="rgba(201,169,110,0.2)" />
              <circle cx="8" cy="8" r="2" fill="#C9A96E" />
            </svg>
            <div className="divider" style={{ width: 80 }} />
          </div>
        )}

        {/* Subtitle */}
        {active && (
          <p className="f-gara text-xl md:text-2xl max-w-xl leading-relaxed mb-10" style={{ color: "rgba(245,230,200,0.7)", animation: "fadeInUp 0.7s ease 0.9s both", fontStyle: "italic" }}>
            {subWords}
          </p>
        )}

        {/* CTA buttons */}
        {active && (
          <div className="flex flex-col sm:flex-row gap-4 items-center" style={{ animation: "fadeInUp 0.7s ease 1.1s both" }}>
            <a href="#projects" className="btn-gold f-cinzel px-8 py-4 tracking-widest cursor-none rounded-sm text-sm">
              EXPLORE OUR TEMPLES
            </a>
            <a href="#heritage" className="btn-outline f-cinzel px-8 py-4 tracking-widest cursor-none rounded-sm text-sm">
              OUR HERITAGE
            </a>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {active && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "fadeInUp 0.7s ease 1.4s both" }}>
          <div className="section-label">Scroll to enter</div>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)", animation: "gentleFloat 2s ease-in-out infinite" }} />
        </div>
      )}
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden" style={{ background: "linear-gradient(180deg, #0A0805 0%, #0F0C08 50%, #0A0805 100%)" }}>
      {/* Background geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="mandala absolute" style={{ width: 800, height: 800, right: -300, top: -200, opacity: 0.4, animation: "rotateSlow 80s linear infinite" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <div className="section-label mb-4">✦ &nbsp; Our Story &nbsp; ✦</div>
          <h2 className="f-deco gold-text text-4xl md:text-6xl mb-6 leading-tight">The Art of the Sacred</h2>
          <div className="divider" />
        </div>

        {/* Four storytelling scenes */}
        <div className="grid md:grid-cols-2 gap-1">
          {[
            {
              num: "01", title: "Heritage of Lineage",
              text: "Founded in 1976 by Sthapati Subramaniam Achari, our legacy traces an unbroken lineage of temple architects schooled in the ancient Manasara and Mayamata texts. We do not merely build temples — we transmit a sacred tradition from master to apprentice across generations.",
              img: IMG.carv1, dir: "reveal-l"
            },
            {
              num: "02", title: "Shilpa Shastra Mastery",
              text: "Every Sthapati in our atelier has mastered all 64 traditional art forms mandated by Agama Shastra. Our stone carvers work with chisels that have not changed in design in 2,000 years, producing sculptures that embody the divine through mathematical proportion and devotional intent.",
              img: IMG.carv2, dir: "reveal-r"
            },
            {
              num: "03", title: "Engineering Precision",
              text: "Ancient wisdom meets modern structural engineering. Our teams combine seismic analysis, soil load calculations, and 3D Agamic modeling to ensure our gopurams stand for millennia — not decades. Every foundation is laid under Vastu rites and structural certification.",
              img: IMG.carv3, dir: "reveal-l"
            },
            {
              num: "04", title: "Living Vision",
              text: "We believe temple architecture is not a relic but a living tradition, evolving with the communities it serves. Our vision is to build 500 temples before 2050, and to train a new generation of Sthapatis who carry this sacred science into the next century.",
              img: IMG.proj3, dir: "reveal-r"
            },
          ].map(({ num, title, text, img, dir }, idx) => (
            <div key={num} className={`${dir} flex flex-col ${idx % 2 === 1 ? "md:flex-col-reverse" : ""}`}>
              {/* Image panel */}
              <div className="relative overflow-hidden" style={{ height: 340 }}>
                <img src={img} alt={title} className="w-full h-full object-cover" style={{ transition: "transform 0.8s ease" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,5,0.3), rgba(10,8,5,0.6))" }} />
                {/* Number */}
                <div className="absolute top-6 right-6 f-cinzel text-6xl font-black" style={{ color: "rgba(201,169,110,0.12)", lineHeight: 1 }}>{num}</div>
              </div>
              {/* Text panel */}
              <div className="stone p-10">
                <h3 className="f-cinzel text-xl md:text-2xl mb-4 gold-text">{title}</h3>
                <p className="f-gara text-base md:text-lg leading-relaxed" style={{ color: "rgba(245,230,200,0.65)" }}>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects showcase ────────────────────────────────────────────────────────

function Projects() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-28 overflow-hidden" style={{ background: "#070504" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.03) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <div className="section-label mb-4">✦ &nbsp; Sacred Commissions &nbsp; ✦</div>
          <h2 className="f-deco gold-text text-4xl md:text-6xl mb-6">Our Temples</h2>
          <div className="divider" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <div
              key={p.roman}
              className={`proj-card reveal relative overflow-hidden cursor-none rounded-sm`}
              style={{ transitionDelay: `${i * 0.1}s`, minHeight: i % 3 === 1 ? 500 : 380 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover absolute inset-0" />
              <div className="proj-overlay absolute inset-0" />

              {/* Roman numeral */}
              <div className="absolute top-5 left-5 f-cinzel font-black" style={{ color: "rgba(201,169,110,0.35)", fontSize: "4rem", lineHeight: 1, letterSpacing: "-0.02em" }}>
                {p.roman}
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <div className="section-label mb-2">{p.loc} &nbsp;·&nbsp; {p.year}</div>
                <h3 className="f-cinzel text-xl md:text-2xl mb-3" style={{ color: "#F5E6C8" }}>{p.title}</h3>
                <div
                  className="f-gara text-sm leading-relaxed overflow-hidden transition-all duration-500"
                  style={{ color: "rgba(245,230,200,0.65)", maxHeight: active === i ? 80 : 0, opacity: active === i ? 1 : 0 }}
                >
                  {p.desc}
                </div>
                {/* Gold line */}
                <div className="mt-4 h-px gold-line" style={{ width: active === i ? 80 : 32, transition: "width 0.5s ease" }} />
              </div>

              {/* Blueprint grid overlay on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  opacity: active === i ? 0.06 : 0,
                  backgroundImage: "linear-gradient(rgba(201,169,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="services" className="relative py-28 overflow-hidden" style={{ background: "#0A0805" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <div className="section-label mb-4">✦ &nbsp; Disciplines of the Sthapati &nbsp; ✦</div>
          <h2 className="f-deco gold-text text-4xl md:text-6xl mb-6">Our Sacred Crafts</h2>
          <div className="divider mb-6" />
          <p className="f-gara text-lg max-w-2xl mx-auto" style={{ color: "rgba(245,230,200,0.55)", fontStyle: "italic" }}>
            Six pillars of mastery, drawn from 3,000 years of Dravidian architectural tradition
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="svc-card stone rounded-sm p-8 reveal cursor-none">
              {/* Icon */}
              <div className="text-3xl mb-5" style={{ color: "#C9A96E", filter: "drop-shadow(0 0 8px rgba(201,169,110,0.4))" }}>{s.icon}</div>
              {/* Gold accent */}
              <div className="h-px mb-5 gold-line" style={{ width: 40 }} />
              <h3 className="f-cinzel text-base mb-3" style={{ color: "#E8C87A", letterSpacing: "0.05em" }}>{s.title}</h3>
              <p className="f-gara text-sm leading-relaxed" style={{ color: "rgba(245,230,200,0.55)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

function Timeline() {
  return (
    <section id="process" className="relative py-28 overflow-hidden" style={{ background: "#070504" }}>
      {/* Blueprint background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(201,169,110,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <div className="section-label mb-4">✦ &nbsp; The Sacred Blueprint &nbsp; ✦</div>
          <h2 className="f-deco gold-text text-4xl md:text-6xl mb-6">Construction Process</h2>
          <div className="divider" />
        </div>

        <div className="relative">
          {/* Central line */}
          <div className="tl-line hidden md:block" />

          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <div key={t.stage} className={`reveal flex flex-col md:flex-row items-start gap-6 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                {/* Content */}
                <div className={`flex-1 glass rounded-sm p-7 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div className="section-label mb-2">Stage {t.stage}</div>
                  <h3 className="f-cinzel text-lg mb-2" style={{ color: "#E8C87A" }}>{t.title}</h3>
                  <p className="f-gara text-sm" style={{ color: "rgba(245,230,200,0.55)" }}>{t.sub}</p>
                </div>

                {/* Center node */}
                <div className="hidden md:flex flex-col items-center" style={{ minWidth: 60 }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center f-cinzel text-xs font-bold"
                    style={{
                      background: "rgba(10,8,5,0.9)",
                      border: "1px solid rgba(201,169,110,0.5)",
                      color: "#C9A96E",
                      boxShadow: "0 0 20px rgba(201,169,110,0.2)",
                    }}
                  >
                    {t.stage}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>

          {/* Temple outline at end */}
          <div className="text-center mt-16 reveal">
            <svg viewBox="0 0 200 160" width="120" height="96" fill="none" className="mx-auto opacity-40" style={{ filter: "drop-shadow(0 0 12px rgba(201,169,110,0.3))" }}>
              <polygon points="100,10 190,150 10,150" stroke="#C9A96E" strokeWidth="0.8" />
              <line x1="100" y1="10" x2="100" y2="150" stroke="#C9A96E" strokeWidth="0.4" />
              <ellipse cx="100" cy="30" rx="16" ry="10" stroke="#C9A96E" strokeWidth="0.5" />
              <ellipse cx="100" cy="18" rx="8" ry="6" stroke="#C9A96E" strokeWidth="0.5" />
              <circle cx="100" cy="10" r="3" fill="#C9A96E" opacity="0.6" />
            </svg>
            <div className="section-label mt-4">Kumbhabhishekam — Divine Consecration</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const [lightbox, setLightbox] = useState<typeof GALLERY[0] | null>(null);

  return (
    <section id="gallery" className="relative py-28 overflow-hidden" style={{ background: "#0A0805" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="section-label mb-4">✦ &nbsp; Through the Sacred Lens &nbsp; ✦</div>
          <h2 className="f-deco gold-text text-4xl md:text-6xl mb-6">Gallery of Devotion</h2>
          <div className="divider" />
        </div>

        {/* Organic grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[200px] md:auto-rows-[240px]">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className={`gal-item reveal relative overflow-hidden cursor-none rounded-sm ${item.grid}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setLightbox(item)}
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,5,0.8) 0%, transparent 50%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="f-cinzel text-xs mb-0.5" style={{ color: "#E8C87A", letterSpacing: "0.06em", fontSize: "0.65rem" }}>{item.title}</div>
                <div className="section-label" style={{ fontSize: "0.5rem" }}>{item.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[800] flex items-center justify-center" onClick={() => setLightbox(null)}>
          <div className="absolute inset-0" style={{ background: "rgba(5,3,2,0.95)" }} />
          <div className="relative z-10 max-w-4xl w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img.replace("w=600", "w=1200").replace("w=800", "w=1200").replace("w=500", "w=1200")} alt={lightbox.title} className="w-full rounded-sm" style={{ maxHeight: "75vh", objectFit: "contain" }} />
            <div className="text-center mt-4">
              <div className="f-cinzel text-lg gold-text">{lightbox.title}</div>
              <div className="section-label mt-1">{lightbox.loc}</div>
            </div>
          </div>
          <button className="absolute top-6 right-8 text-4xl f-cinzel cursor-none" style={{ color: "rgba(201,169,110,0.6)" }} onClick={() => setLightbox(null)}>×</button>
        </div>
      )}
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  const [counts, setCounts] = useState(STATS.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        STATS.forEach((s, idx) => {
          const dur = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const pct = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - pct, 3);
            setCounts((prev) => { const n = [...prev]; n[idx] = Math.round(ease * s.num); return n; });
            if (pct < 1) requestAnimationFrame(tick);
          };
          setTimeout(() => requestAnimationFrame(tick), idx * 120);
        });
      }
    }, { threshold: 0.4 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24" style={{ background: "linear-gradient(180deg, #070504 0%, #0D0A07 100%)" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <div className="section-label mb-3">✦ &nbsp; In Numbers &nbsp; ✦</div>
          <h2 className="f-cinzel text-2xl md:text-3xl" style={{ color: "rgba(245,230,200,0.5)", letterSpacing: "0.15em" }}>A LEGACY CARVED IN STONE</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ border: "1px solid rgba(201,169,110,0.08)" }}>
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center py-12 px-6 text-center" style={{ background: "rgba(10,8,5,0.6)", borderRight: i < 3 ? "1px solid rgba(201,169,110,0.08)" : "none" }}>
              <div className="f-deco mb-2" style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", color: "#C9A96E", animation: "glowPulse 3s ease-in-out infinite", animationDelay: `${i * 0.4}s`, lineHeight: 1 }}>
                {counts[i].toLocaleString()}{s.suffix}
              </div>
              <div className="divider mb-3" style={{ width: 30 }} />
              <div className="f-cinzel text-xs tracking-widest" style={{ color: "rgba(245,230,200,0.4)", fontSize: "0.6rem" }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: "#0A0805" }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="mandala absolute" style={{ width: 700, height: 700, left: -250, top: -150, animation: "rotateSlow 70s linear infinite" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <div className="section-label mb-4">✦ &nbsp; Voices of the Faithful &nbsp; ✦</div>
          <h2 className="f-deco gold-text text-4xl md:text-6xl mb-6">Testimonials</h2>
          <div className="divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`reveal glass rounded-sm p-8 flex flex-col`} style={{ transitionDelay: `${i * 0.15}s` }}>
              {/* Quote mark */}
              <div className="f-deco text-6xl leading-none mb-4" style={{ color: "rgba(201,169,110,0.2)" }}>"</div>

              <p className="f-gara text-base leading-relaxed flex-1 mb-8" style={{ color: "rgba(245,230,200,0.65)", fontStyle: "italic" }}>
                {t.text}
              </p>

              {/* Divider */}
              <div className="h-px mb-5 gold-line" style={{ width: 40 }} />

              <div>
                <div className="f-cinzel text-sm mb-1" style={{ color: "#E8C87A" }}>{t.name}</div>
                <div className="f-gara text-xs" style={{ color: "rgba(201,169,110,0.5)" }}>{t.role}</div>
              </div>

              {/* Decorative corner */}
              <svg className="absolute top-4 right-4 opacity-20" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M24 0 L24 24 L0 24" stroke="#C9A96E" strokeWidth="0.8" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", project: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ background: "#070504" }}>
      {/* Stone floor pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(201,169,110,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.018) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      {/* Glow center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)" }} />

      {/* Diya lamps row */}
      <div className="relative flex justify-center gap-8 mb-20 overflow-hidden" style={{ height: 60 }}>
        {[10, 25, 50, 75, 90].map((x, i) => (
          <div key={i} className="flex flex-col items-center" style={{ width: 20 }}>
            {/* Flame */}
            <div style={{
              width: 6, height: 14, marginBottom: 3,
              background: "linear-gradient(to top, #FF6B00, #FFD700, rgba(255,255,255,0.9))",
              borderRadius: "50% 50% 20% 20%",
              animation: `diyaFlicker ${0.6 + i * 0.15}s ease-in-out infinite`,
              filter: "blur(0.3px)",
              boxShadow: "0 0 8px #FFD700, 0 0 20px rgba(255,150,0,0.4)",
            }} />
            {/* Cup */}
            <div style={{ width: 18, height: 9, background: "linear-gradient(135deg, #C9A96E, #8B6914)", borderRadius: "0 0 50% 50%", transform: "scaleX(1.4)" }} />
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <div className="section-label mb-4">✦ &nbsp; Enter the Inner Sanctum &nbsp; ✦</div>
          <h2 className="f-deco gold-text text-4xl md:text-6xl mb-6">Commission a Temple</h2>
          <div className="divider mb-6" />
          <p className="f-gara text-lg max-w-xl mx-auto" style={{ color: "rgba(245,230,200,0.5)", fontStyle: "italic" }}>
            Begin your sacred commission. Our master architects will respond within three days.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 reveal">
          {/* Left — info */}
          <div className="space-y-8">
            <div>
              <div className="section-label mb-2">Headquarters</div>
              <p className="f-cinzel text-sm" style={{ color: "#E8C87A" }}>Chennai Atelier</p>
              <p className="f-gara text-sm mt-1" style={{ color: "rgba(245,230,200,0.5)" }}>12, Muthukrishna Pillai Street<br />Mylapore, Chennai 600 004<br />Tamil Nadu, India</p>
            </div>
            <div className="h-px gold-line" />
            <div>
              <div className="section-label mb-2">Contact</div>
              <p className="f-gara text-sm" style={{ color: "rgba(245,230,200,0.55)" }}>+91 44 2495 1976</p>
              <p className="f-gara text-sm" style={{ color: "rgba(245,230,200,0.55)" }}>sthapati@templearc.in</p>
            </div>
            <div className="h-px gold-line" />
            <div>
              <div className="section-label mb-2">Working Hours</div>
              <p className="f-gara text-sm" style={{ color: "rgba(245,230,200,0.55)" }}>Monday – Saturday</p>
              <p className="f-gara text-sm" style={{ color: "rgba(245,230,200,0.55)" }}>9:00 AM – 6:00 PM IST</p>
            </div>

            {/* Decorative mandala */}
            <div className="flex items-center gap-4 pt-4">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.4" style={{ animation: "rotateSlow 20s linear infinite" }}>
                <circle cx="30" cy="30" r="28" stroke="#C9A96E" strokeWidth="0.5" />
                <circle cx="30" cy="30" r="20" stroke="#C9A96E" strokeWidth="0.3" strokeDasharray="4 4" />
                <circle cx="30" cy="30" r="12" stroke="#C9A96E" strokeWidth="0.3" />
                {[0,60,120,180,240,300].map((a) => (
                  <line key={a} x1={30 + 14*Math.cos(a*Math.PI/180)} y1={30 + 14*Math.sin(a*Math.PI/180)} x2={30 + 28*Math.cos(a*Math.PI/180)} y2={30 + 28*Math.sin(a*Math.PI/180)} stroke="#C9A96E" strokeWidth="0.3" />
                ))}
              </svg>
              <div className="f-gara text-sm italic" style={{ color: "rgba(245,230,200,0.4)" }}>
                "A temple is not constructed — it is<br />summoned from the earth."
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={submit} className="space-y-5">
            {[
              { key: "name", label: "Your Name", placeholder: "Ramaswamy Iyer", type: "text" },
              { key: "email", label: "Email Address", placeholder: "trustee@devasthanam.org", type: "email" },
              { key: "project", label: "Project Location", placeholder: "City, State", type: "text" },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="section-label block mb-1.5">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-sm f-gara text-sm outline-none transition-all duration-300"
                  style={{
                    background: "rgba(201,169,110,0.06)",
                    border: "1px solid rgba(201,169,110,0.18)",
                    color: "#F5E6C8",
                    cursor: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.18)")}
                />
              </div>
            ))}
            <div>
              <label className="section-label block mb-1.5">Your Vision</label>
              <textarea
                rows={4}
                placeholder="Describe your temple project — scale, deity, location, tradition..."
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-sm f-gara text-sm resize-none outline-none transition-all duration-300"
                style={{
                  background: "rgba(201,169,110,0.06)",
                  border: "1px solid rgba(201,169,110,0.18)",
                  color: "#F5E6C8",
                  cursor: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(201,169,110,0.18)")}
              />
            </div>
            <button type="submit" className="btn-gold w-full f-cinzel py-4 rounded-sm tracking-widest text-sm cursor-none">
              {sent ? "✦  OFFERING RECEIVED  ✦" : "SUBMIT YOUR COMMISSION"}
            </button>
          </form>
        </div>
      </div>

      {/* Floating WhatsApp bell */}
      <a
        href="https://wa.me/914424951976"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[800] flex items-center justify-center rounded-full cursor-none"
        style={{
          width: 56, height: 56,
          background: "linear-gradient(135deg, #C9A96E, #E8C87A)",
          boxShadow: "0 8px 32px rgba(201,169,110,0.4)",
          animation: "breathePulse 3s ease-in-out infinite",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A0805">
          <path d="M12 2a9.97 9.97 0 0 1 7.07 2.93A9.97 9.97 0 0 1 22 12c0 5.52-4.48 10-10 10a9.95 9.95 0 0 1-4.93-1.29L2 22l1.29-5.07A9.95 9.95 0 0 1 2 12C2 6.48 6.48 2 12 2Zm0 2c-4.41 0-8 3.59-8 8 0 1.57.46 3.03 1.24 4.26L4.5 19.5l3.24-.74A7.94 7.94 0 0 0 12 20c4.41 0 8-3.59 8-8s-3.59-8-8-8Zm-1.5 4.5c.14 0 .27.01.4.02.35.02.65.2.84.55l.94 2.25c.13.3.09.65-.1.92l-.76.91c.8 1.47 2.1 2.6 3.6 3.3l.9-.7c.25-.2.58-.25.88-.14l2.28.89c.37.15.57.52.54.9-.04.7-.28 1.38-.7 1.95-.4.55-1.03.87-1.73.92C14.8 18 11 15 9.5 11.5c-.12-.3.07-.82.19-1.06.3-.6.9-1 1.54-1.06.1-.01.19-.01.27 0Z"/>
        </svg>
      </a>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative py-20 overflow-hidden" style={{ background: "#030201" }}>
      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STARS.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size,
              background: `rgba(${200 + Math.random()*55}, ${180 + Math.random()*55}, ${130 + Math.random()*60}, 0.8)`,
              animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Moonlight gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none rounded-full" style={{ width: 400, height: 300, background: "radial-gradient(ellipse, rgba(201,169,110,0.05) 0%, transparent 70%)" }} />

      {/* Temple silhouette */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ opacity: 0.12 }}>
        <svg viewBox="0 0 600 200" width="600" height="200" fill="none">
          <rect x="220" y="100" width="160" height="100" fill="#C9A96E" />
          <polygon points="200,100 400,100 380,70 220,70" fill="#C9A96E" />
          <polygon points="215,70 385,70 368,45 232,45" fill="#C9A96E" />
          <polygon points="228,45 372,45 356,24 244,24" fill="#C9A96E" />
          <polygon points="240,24 360,24 346,8 254,8" fill="#C9A96E" />
          <ellipse cx="300" cy="5" rx="20" ry="7" fill="#C9A96E" />
          {/* Side trees */}
          <rect x="100" y="150" width="20" height="50" fill="#C9A96E" opacity="0.6" />
          <ellipse cx="110" cy="140" rx="30" ry="20" fill="#C9A96E" opacity="0.6" />
          <rect x="480" y="150" width="20" height="50" fill="#C9A96E" opacity="0.6" />
          <ellipse cx="490" cy="140" rx="30" ry="20" fill="#C9A96E" opacity="0.6" />
        </svg>
      </div>

      {/* Diya row at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end pointer-events-none" style={{ height: 50 }}>
        {[0,1,2,3,4,5,6,7].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div style={{ width: 5, height: 11, background: "linear-gradient(to top, #FF6000, #FFD700, #FFFFE0)", borderRadius: "50% 50% 15% 15%", animation: `diyaFlicker ${0.5 + i * 0.1}s ease-in-out infinite`, boxShadow: "0 0 6px #FFD700, 0 0 14px rgba(255,140,0,0.3)", marginBottom: 2 }} />
            <div style={{ width: 14, height: 7, background: "linear-gradient(135deg,#C9A96E,#8B6914)", borderRadius: "0 0 40% 40%", transform: "scaleX(1.3)" }} />
          </div>
        ))}
      </div>

      {/* Footer content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Brand */}
        <div className="text-center mb-12">
          <div className="f-deco gold-text text-3xl md:text-5xl tracking-widest mb-3">STHAPATI</div>
          <div className="section-label">Temple Architecture & Construction • Est. 1976</div>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="gold-line h-px" style={{ width: 60 }} />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1 L13 7 L7 13 L1 7 Z" stroke="#C9A96E" strokeWidth="0.8" fill="rgba(201,169,110,0.2)" /><circle cx="7" cy="7" r="2" fill="#C9A96E" /></svg>
            <div className="gold-line h-px" style={{ width: 60 }} />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { head: "Navigation", links: ["Heritage", "Projects", "Services", "Process", "Gallery", "Contact"] },
            { head: "Services", links: ["Temple Design", "Gopuram Works", "Stone Carving", "Restoration", "Mandapam", "Agamic Consulting"] },
            { head: "Regions", links: ["Tamil Nadu", "Karnataka", "Andhra Pradesh", "Kerala", "Telangana", "Maharashtra"] },
            { head: "Connect", links: ["+91 44 2495 1976", "sthapati@templearc.in", "Mylapore, Chennai", "Mon–Sat 9am–6pm"] },
          ].map(({ head, links }) => (
            <div key={head}>
              <div className="f-cinzel text-xs mb-4 tracking-widest" style={{ color: "#C9A96E", fontSize: "0.62rem" }}>{head.toUpperCase()}</div>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l} className="f-gara text-sm" style={{ color: "rgba(245,230,200,0.35)" }}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="h-px mb-8 gold-line" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="f-gara text-sm text-center" style={{ color: "rgba(245,230,200,0.25)" }}>
            © 2024 Sthapati Temple Architecture & Construction Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polygon points="6,1 11,10 1,10" stroke="#C9A96E" strokeWidth="0.6" fill="rgba(201,169,110,0.15)" /><line x1="6" y1="1" x2="6" y2="11" stroke="#C9A96E" strokeWidth="0.3" /></svg>
            <p className="f-gara text-sm" style={{ color: "rgba(245,230,200,0.25)" }}>Crafting sacred spaces across India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loading, setLoading] = useState(true);
  const [heroActive, setHeroActive] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useGlobalStyles();
  useScrollReveal();

  const handleLoadComplete = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => setHeroActive(true), 200);
    }, 600);
  }, []);

  return (
    <div className="relative" style={{ background: "#0A0805", fontFamily: "'EB Garamond', serif" }}>
      {/* Loading screen */}
      {loading && (
        <div style={{ opacity: fadeOut ? 0 : 1, transition: "opacity 0.6s ease", pointerEvents: fadeOut ? "none" : "auto" }}>
          <LoadingScreen onComplete={handleLoadComplete} />
        </div>
      )}

      {/* Main site */}
      <div style={{ opacity: heroActive ? 1 : 0, transition: "opacity 0.8s ease" }}>
        <CustomCursor />
        <ScrollBar />
        <Nav />
        <Hero active={heroActive} />
        <About />
        <Projects />
        <Services />
        <Timeline />
        <Gallery />
        <Stats />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
