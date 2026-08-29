"use client";

// ============================================================
//  فهد الفهيد — Portfolio (single-file, copy & paste)
//  Next.js App Router — app/page.tsx
//  Dark teal + green/blue Saudi-heritage palette, RTL Arabic
//  Requires: npm install lucide-react
//  Requires app/fonts.ts + font files in app/fonts/
//  Requires images in /public: logo.png, footer-logo.png,
//    profile.jpg, Cup.png, dallah_for_a_cup.png, side-line.png
// ============================================================
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  Sparkles,
  Download,
  MapPin,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  ArrowUpLeft,
  Wrench,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  
} from "lucide-react";
import { saudiFont, ibmPlexArabic } from "./fonts";

// ---------- بيانات الموقع (عدّلها بمعلوماتك) ----------

const NAV = [
  { id: "about", label: "نبذة" },
  { id: "experience", label: "الخبرة" },
  { id: "projects", label: "المشاريع" },
  { id: "skills", label: "المهارات" },
  { id: "contact", label: "تواصل" },
];

const LINKS = {
  email: "Fahad.t.alfehaid@gmail.com",
  phone: "+966556988335",
  phoneDisplay: "+966 55 698 8335",
  linkedin: "https://www.linkedin.com/in/fahad-alfehaid-94aab823b/",
  github: "https://github.com/3e6s",
};

const STATS = [
  { value: "+6", label: "مشاريع تقنية" },
  { value: "CAPM®", label: "شهادة معتمدة" },
  { value: "Year 1", label: "الخبرة سنة واحدة تدريبية" },
];

const SKILL_CATEGORIES = [
  {
    title: "التطوير",
    icon: Wrench,
    accent: "from-[#3f7d52] to-[#2f5e3f]",
    skills: ["C#", "ASP.NET Core MVC", "SQL Server", "OpenAI API"],
  },
  {
    title: "تحليل البيانات",
    icon: FolderGit2,
    accent: "from-[#2454a4] to-[#173a78]",
    skills: ["Power BI", "DAX", "Excel متقدم", "تنظيف البيانات"],
  },
  {
    title: "إدارة المشاريع",
    icon: Briefcase,
    accent: "from-[#5b93e6] to-[#2454a4]",
    skills: ["MS Project", "CAPM Framework", "إدارة المخاطر", "RFP"],
  },
  {
    title: "أجايل",
    icon: MessageSquare,
    accent: "from-[#3f7d52] to-[#173a78]",
    skills: ["Scrum Master", "Azure DevOps", "Sprint Planning"],
  },
];

const EXPERIENCE = [
  {
    role: "متدرب — المشاريع الرقمية / البنية المؤسسية",
    org: "الهيئة السعودية للتخصصات الصحية · الرياض",
    period: "نوفمبر 2025 — مايو 2026",
    current: true,
    points: [
      "ادارة 3 مشاريع تحوّل رقمي استراتيجية ومواءمة الفرق التقنية والمورّدين",
      "المساهمة في إنهاء عقد تقني قائم لصالح حل داخلي وتوفير الموارد المالية",
      "رفع تقارير أسبوعية للمدير التنفيذي للتقنية وإدارة قصص المستخدم في Azure DevOps",
    ],
  },
  {
    role: "اكاديمية الذكاء الاصطناعي / متدرب تعاوني — الحوكمة التقنية",
    org: "شركة تحكم · الرياض",
    period: "يونيو 2025 — نوفمبر 2025",
    current: false,
    points: [
      "تصميم وتسليم حلّي Power BI متكاملين ودمجهما في بوابة BI موحّدة",
      "بناء خط تحليل يغطي أكثر من 70,000 صف عبر 8 أشهر",
      "تمثيل الشركة في 8 اجتماعات فنية وتحليل +1,250 ردّ على كراسات الشروط",
    ],
  },
  {
    role: "بكالوريوس هندسة برمجيات",
    org: "جامعة المستقبل — مرتبة الشرف",
    period: "تخرج 2025",
    current: false,
    points: [
      "معدل تراكمي 4.55/5",
      "المركز الأول في اختبار جاهزية هندسة البرمجيات (NCAAA)",
    ],
  },
  {
    role: "دبلوم تقنية شبكات حاسب الي",
    org: "الكلية التقنية في بريدة — مرتبة الشرف الأولى",
    period: "تخرج 2022",
    current: false,
    points: [
      "معدل تراكمي 4.89/5",
      "المركز الثاني على مستوى كلية الحاسب في بريدة",
    ],
  },
];

const PROJECTS = [
  {
    title: "PerformX — إدارة مشاريع بالذكاء الاصطناعي",
    description: "مشروع التخرج: تطبيق ويب لإدارة المشاريع مدعوم بتكامل OpenAI.",
    tags: ["C#", "ASP.NET Core", "OpenAI"],
    year: "2025",
    gradient: "from-[#2454a4] to-[#173a78]",
  },
  {
    title: "بوابة BI التنفيذية",
    description: "لوحتا Power BI متكاملتان تغطي +950 سجل موظف و+30 مصدر بيانات.",
    tags: ["Power BI", "DAX", "SQL"],
    year: "2025",
    gradient: "from-[#3f7d52] to-[#2f5e3f]",
  },
  {
    title: "QassimPay — منصة مصرفية رقمية",
    description: "تطبيق ويب مصرفي يحاكي العمليات الأساسية للحسابات والتحويلات.",
    tags: ["C#", "ASP.NET Core MVC", "SQL Server"],
    year: "2024",
    gradient: "from-[#5b93e6] to-[#2454a4]",
  },
  {
    title: "WSA34 — كأس العالم السعودية 2034",
    description: "تطبيق ويب خاص بمونديال 2034 ضمن مشاريع أكاديمية طويق.",
    tags: ["C#", "Web App"],
    year: "2024",
    gradient: "from-[#6b7d52] to-[#3f5e2f]",
  },
  {
    title: "بوت البريد الجماعي",
    description: "تطبيق سطح مكتب لأتمتة إرسال البريد لجهات الاتصال المؤسسية.",
    tags: ["C#", "Desktop", "Automation"],
    year: "2023",
    gradient: "from-[#173a78] to-[#0a1f1c]",
  },
  {
    title: "TODO — متتبع المهام",
    description: "تطبيق ويب لإدارة المهام اليومية بواجهة بسيطة وسريعة.",
    tags: ["C#", "CRUD"],
    year: "2023",
    gradient: "from-[#2454a4] to-[#3f7d52]",
  },
];

// ---------- مكوّن قسم عام يُعاد استخدامه ----------

function Section({
  id,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <p className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-[#5b93e6]">
          <Icon size={16} />
          {subtitle}
        </p>
        <h2 className={`${saudiFont.className} text-4xl font-black md:text-5xl`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

// ---------- المكوّن الرئيسي ----------

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  return (
    <div
      dir="rtl"
      className={`${ibmPlexArabic.className} relative min-h-screen bg-[#0a1f1c] text-slate-100 selection:bg-[#3f7d52]/40`}
    >
      {/* أنيميشن الدلة والفنجال */}
      <style jsx>{`
        @keyframes floatDallah {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes floatCup {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        .animate-dallah { animation: floatDallah 4.5s ease-in-out infinite; }
        .animate-cup { animation: floatCup 3.4s ease-in-out infinite; animation-delay: .5s; }
      `}</style>

      {/* ===== خط زخرفي جانبي ثابت ===== */}
      <div className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-10 opacity-70 lg:block">
        <Image src="/side-line2.png" alt="" fill className="object-cover object-top" />
      </div>

      {/* ===== Navbar ===== */}
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0a1f1c]/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#hero" className="flex items-center gap-4">
            <Image src="/logo.png" alt="فهد الفهيد" width={44} height={44} className="rounded-lg" />
            <span className={`${saudiFont.className} text-xl font-black tracking-wide`}>
              <span className="text-white">فهد</span>
              <span className="mr-2 bg-gradient-to-l from-[#5b93e6] to-[#3f7d52] bg-clip-text text-transparent">
                الفهيد
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setActive(n.id)}
                  className={`text-sm transition-colors ${
                    active === n.id ? "font-semibold text-[#5b93e6]" : "text-white/60 hover:text-white"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full bg-[#2454a4] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#3066c2] md:block"
          >
            تواصل معي
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-white/70 hover:bg-white/5 md:hidden"
            aria-label="القائمة"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/5 bg-[#0b1d15] px-6 py-4 md:hidden">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-[#5b93e6]"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </header>

      <main className="relative">
        {/* ===== Hero ===== */}
<section id="hero" className="relative flex min-h-screen items-center pt-16 overflow-hidden">
  {/* خلفية متحركة */}
  <motion.div 
    className="absolute inset-0 -z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="absolute top-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-[#5b93e6]/5 blur-[120px]" />
    <div className="absolute bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-[#3f7d52]/5 blur-[120px]" />
  </motion.div>
<div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
  <Image 
    src="/Carpet.png" 
    alt="سجادة تراثية" 
    fill
    priority 
    className="object-contain object-left opacity-50"
  />
</div>
  <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr]">
    
    {/* النص - مع أنيميشن */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.p 
        className="mb-4 flex items-center gap-2 text-sm font-medium text-[#5b93e6]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Sparkles size={16} />
        أهلاً بك في معرض أعمالي
      </motion.p>
      
      <motion.h1 
        className={`${saudiFont.className} flex flex-wrap items-baseline gap-3 text-5xl font-black leading-[1.15] md:text-7xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="text-white">فهد</span>
        <span className="bg-gradient-to-l from-[#5b93e6] via-[#3f7d52] to-[#2454a4] bg-clip-text text-transparent">
          الفهيد
        </span>
      </motion.h1>
      
      <motion.p 
        className="mt-6 max-w-xl text-lg leading-relaxed text-white/65"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        مهندس برمجيات ومحلل بيانات، حاصل على شهادة{" "}
        <span className="font-semibold text-[#5b93e6]">CAPM®</span>{" "}
        — أبني تطبيقات ويب حديثة وأصمم لوحات معلومات{" "}
        <span className="font-semibold text-[#3f7d52]">Power BI</span>{" "}
        تحوّل البيانات إلى قرارات.
      </motion.p>

      <motion.div 
        className="mt-9 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <a
          href="#projects"
          className="rounded-full bg-[#2454a4] px-7 py-3 font-bold text-white shadow-lg shadow-[#2454a4]/30 transition hover:bg-[#3066c2]"
        >
          استعرض مشاريعي
        </a>
        <a
          href="/Fahad_AlFehaid_CV_Aug.pdf"
          download="Fahad-Alfehaid-CV.pdf"
          className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 font-semibold text-white/85 transition hover:border-[#5b93e6]/50 hover:text-[#5b93e6]"
        >
          <Download size={18} />
          تحميل السيرة الذاتية
        </a>
      </motion.div>

      <motion.div 
        className="mt-10 flex items-center gap-4 text-sm text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="flex items-center gap-1.5">
          <MapPin size={15} className="text-[#5b93e6]" />
          الرياض، السعودية
        </span>
        <span className="h-1 w-1 rounded-full bg-white/30" />
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#3f7d52] opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-[#3f7d52]" />
          </span>
          متاح للعمل
        </span>
      </motion.div>
    </motion.div>

{/* الدلة والفنجال - مركب متحرك مع تأثير صب القهوة */} 
<motion.div 
  className="relative hidden h-[550px] w-[500px] items-center justify-center lg:flex"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
>
  {/* خلفية متوهجة متحركة */}
  <motion.div 
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-[#2454a4]/15 blur-[90px]"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1.2, opacity: 1 }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
  />

  {/* حاوية الرسومات */}
  <div className="relative z-10 h-full w-full">
    

  {/* الدلة: تميل لليسار أثناء الصب */}
<motion.div 
  className="absolute top-[20%] left-1/2 -translate-x-1/2 origin-bottom-left" // نقطة الارتكاز عند القاعدة اليسرى
  initial={{ y: 50, opacity: 0, rotate: 0 }} // تبدأ عمودية
  animate={{ 
    y: 0, 
    opacity: 1, 
    rotate: -20 // تُميل لليسار (الجهة التي فيها الفنجان) بزاوية 35 درجة
  }}
  transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 100 }}
  whileHover={{ scale: 1.05 }}
>
  {/* صورة الدلة */}
  <Image src="/dallah_for_a_cup3.png" alt="الدلة" width={280} height={360} priority />
  
  {/* الخط: الآن إذا وضعته داخل الدلة، سيميل معها تلقائياً! */}
  <div className="absolute top-[15%] -left-2 h-[200px] w-[4px] origin-top" style={{ transform: "rotate(0deg)" }}> 
     {/* محتوى الخط (السائل) */}
  </div>
</motion.div>


    {/* تم وضع الخط داخل الحاوية الكبيرة، وليس داخل الدلة، لضمان التحكم بزاويته وطوله */}
    <motion.div 
      className="absolute top-[43%] left-[16%] h-[140px] w-[4px] origin-top"
      style={{ rotate: 10 }} // ✨ ضع هنا rotate وليس transform
      initial={{ scaleY: 0, opacity: 0, rotate: 10 }} // ✨ ضعها هنا أيضاً
      animate={{ scaleY: 1, opacity: 1, rotate: 0 }} // ✨ وهنا غيّر الرقم ليتحرك
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {/* جسم الخط المائل */}
      <motion.div
        className="h-full w-full rounded-full bg-gradient-to-b from-[#5b3a1a] to-[#8B5E3C]"
        animate={{ scaleY: [1, 0.8, 1] }} // نبض بسيط للقهوة
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* نقطة سقوط القهوة (في نهاية الخط) */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#5b3a1a]"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </motion.div>

    {/* الفنجال: في الجهة اليسرى وأسفل نقطة سقوط القهوة */}
    <motion.div 
      className="absolute bottom-[13%] left-[3%]"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.1 }}
    >
      <Image
        src="/Cup3.png"
        alt="فنجال القهوة"
        width={140}
        height={150}
        className="drop-shadow-2xl"
      />
      
      {/* تأثير ارتطام القهوة بالفنجال */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2, 1.5, 0], opacity: [0, 0.8, 0.4, 0] }}
        transition={{ duration: 2, delay: 1.8, repeat: Infinity, repeatDelay: 2, ease: "easeOut" }}
      >
        <div className="h-2 w-10 rounded-full bg-gradient-to-b from-[#8B5E3C] to-[#5b3a1a] blur-md" />
      </motion.div>
    </motion.div>

    {/* بخار القهوة المتصاعد */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={`steam-${i}`}
        className="absolute z-10 h-12 w-4 rounded-full bg-white/10 blur-sm"
        style={{ left: `${15 + i * 15}%`, bottom: `${50 + i * 5}%` }}
        animate={{ y: [-20, -40, -20], opacity: [0, 0.3, 0], scale: [0.5, 1.2, 0.5] }}
        transition={{ duration: 2.5, delay: i * 0.4 + 1, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
      />
    ))}

    {/* النص السفلي */}
    <motion.p 
      className="absolute bottom-0 w-full text-center text-sm tracking-widest text-white/35"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.5 }}
    >
      إرثنا وتراثنا يعزّنا
    </motion.p>
  </div>
</motion.div>
  </div>
</section>

        {/* ===== Stats ===== */}
        <section className="border-y border-white/5 bg-[#0b1d15]/60">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-12 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className={`${saudiFont.className} bg-gradient-to-l from-[#5b93e6] to-[#3f7d52] bg-clip-text text-4xl font-black text-transparent md:text-5xl`}>
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

{/* ===== About ===== */}
<Section id="about" icon={User} title="نبذة عني" subtitle="من أنا وماذا أقدم">
  <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
    
    {/* الصورة الشخصية - مرفوعة قليلاً ومكبرة */}
    <motion.div 
      className="relative h-52 w-52 shrink-0 lg:h-64 lg:w-64"  // تكبير الحجم
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 150,
        damping: 15
      }}
    >
      {/* خلفية متوهجة مكبرة */}
      <motion.div 
        className="absolute -inset-16 bg-gradient-to-br from-[#5b93e6]/20 to-[#3f7d52]/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      
      {/* الصورة مع حركة بسيطة */}
      <motion.div
        className="relative h-full w-full"
        animate={{
          y: [-5, -12, -5],  // حركة بسيطة للأعلى
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/profile.png"
          alt="فهد الفهيد"
          fill
          className="object-contain scale-[1.3]"  // تكبير 30%
          priority
        />
      </motion.div>
    </motion.div>

    {/* النص */}
    <div className="flex-1">
      <motion.p 
        className="text-base leading-relaxed text-white/70 md:text-lg md:leading-loose"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        مهندس برمجيات سعودي، خريج هندسة برمجية بمرتبة الشرف. أجمع بين
        التطوير البرمجي وتحليل البيانات لتقديم حلول تقنية ذات أثر
        حقيقي — من بناء التطبيقات إلى تصميم لوحات المعلومات التنفيذية.
        <br />
        <br />
        حاصل على شهادة CAPM® المعتمدة من PMI، وأمتلك خبرة عملية في
        إدارة المشاريع الرقمية ضمن فرق تقنية متعددة التخصصات.
      </motion.p>
    </div>
  </div>

  {/* بطاقات المهارات */}
  <motion.div 
    className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: 0.5 }}
  >
    {SKILL_CATEGORIES.map((c, index) => (
      <motion.div
        key={c.title}
        className="group rounded-xl border border-white/8 bg-white/[0.03] p-5 transition hover:border-[#5b93e6]/30 hover:bg-white/[0.05]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
      >
        <span className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${c.accent} text-white`}>
          <c.icon size={20} />
        </span>
        <h3 className="font-bold text-white/90">{c.title}</h3>
        <p className="mt-1 text-xs text-white/45">{c.skills.length} مهارات</p>
      </motion.div>
    ))}
  </motion.div>
</Section>

        {/* ===== Experience ===== */}
<Section id="experience" icon={Briefcase} title="الخبرة والتعليم" subtitle="مسيرتي المهنية والأكاديمية">
  <motion.div 
    className="relative space-y-8 pr-8 before:absolute before:right-[7px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-[#5b93e6] before:via-[#3f7d52] before:to-transparent"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { staggerChildren: 1.5 } // ظهور كل عنصر تلو الآخر
      }
    }}
  >
    {EXPERIENCE.map((e, i) => (
      <motion.div 
        key={i} 
        className="relative"
        variants={{
          hidden: { opacity: 0, x: 30 }, // تبدأ من اليمين وتدخل
          visible: { 
            opacity: 1, 
            x: 0, 
            transition: { type: "spring", stiffness: 100, damping: 15 }
          }
        }}
      >
        <span className="absolute -right-8 top-1.5 h-4 w-4 rounded-full border-2 border-[#5b93e6] bg-[#0a1f1c]" />
        
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#5b93e6]/25 hover:bg-white/[0.05]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-white">{e.role}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-white/50">
                {e.role.includes("بكالوريوس") || e.role.includes("دبلوم") ? (
                  <GraduationCap size={15} className="text-[#5b93e6]" />
                ) : (
                  <Briefcase size={15} className="text-[#3f7d52]" />
                )}
                {e.org}
              </p>
            </div>
            <span
              className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                e.current ? "bg-[#2454a4]/20 text-[#5b93e6] ring-1 ring-[#2454a4]/40" : "bg-white/5 text-white/50"
              }`}
            >
              {e.period}
            </span>
          </div>
          <ul className="mt-4 space-y-2">
            {e.points.map((p, j) => (
              <li key={j} className="flex items-start gap-2 text-sm leading-relaxed text-white/65">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#3f7d52]" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    ))}
  </motion.div>
</Section>

        {/* ===== Projects ===== */}
        <Section id="projects" icon={FolderGit2} title="أبرز المشاريع" subtitle="أعمال أفتخر بها">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition duration-300 hover:-translate-y-1.5 hover:border-white/20"
              >
                <div className={`relative flex h-44 items-end bg-gradient-to-br ${p.gradient} p-4`}>
                  <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                    {p.year}
                  </span>
                  <ArrowUpLeft
                    size={22}
                    className="absolute left-4 top-4 text-white/70 transition group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md border border-[#3f7d52]/20 bg-[#3f7d52]/5 px-2.5 py-1 text-xs text-[#8fc79f]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ===== Skills ===== */}
        <Section id="skills" icon={Wrench} title="المهارات التقنية" subtitle="الأدوات التي أتقنها">
          <div className="grid gap-6 md:grid-cols-2">
            {SKILL_CATEGORIES.map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/8 bg-white/[0.03] p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent} text-white`}>
                    <c.icon size={22} />
                  </span>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/75 transition hover:border-[#5b93e6]/40 hover:text-[#5b93e6]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== Contact ===== */}
        <Section id="contact" icon={MessageSquare} title="لنصنع شيئاً رائعاً" subtitle="تواصل معي">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-l from-[#173a78]/40 to-[#0b1d15]">
            <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[1fr_auto]">
              <div>
                <h3 className={`${saudiFont.className} text-2xl font-black md:text-3xl`}>
                  عندك فكرة مشروع؟{" "}
                  <span className="bg-gradient-to-l from-[#5b93e6] to-[#3f7d52] bg-clip-text text-transparent">
                    خلينا نحولها لواقع
                  </span>
                </h3>
                <p className="mt-4 max-w-lg leading-relaxed text-white/60">
                  متاح للعمل الحر والفرص الوظيفية. راسلني على البريد أو تواصل
                  معي مباشرة وسأرد عليك في أقرب وقت.
                </p>
         
              </div>
              <div className="flex flex-col justify-center gap-4">
                <a
                  href={`mailto:${LINKS.email}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-4 transition hover:border-[#5b93e6]/40"
                >
                  <Mail size={20} className="text-[#5b93e6]" />
                  <div>
                    <p className="text-xs text-white/45">البريد الإلكتروني</p>
                    <p className="text-sm font-semibold" dir="ltr">{LINKS.email}</p>
                  </div>
                </a>
                <a
                  href={`tel:${LINKS.phone}`}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-4 transition hover:border-[#5b93e6]/40"
                >
                  <Phone size={20} className="text-[#5b93e6]" />
                  <div>
                    <p className="text-xs text-white/45">الجوال</p>
                    <p className="text-sm font-semibold" dir="ltr">{LINKS.phoneDisplay}</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-4">
                  <MapPin size={20} className="text-[#5b93e6]" />
                  <div>
                    <p className="text-xs text-white/45">الموقع</p>
                    <p className="text-sm font-semibold">الرياض، السعودية</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      {/* ===== Footer ===== */}
      <footer className="relative border-t border-white/5 pt-6 pb-8">
        <div
          className="h-10 w-full opacity-80"
          style={{
            backgroundImage: "url('/footer-logo.png')",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 100%",
            backgroundPosition: "center",
          }}
        />
        <div className="mx-auto mt-6 flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-white/45 md:flex-row">
          <p>© 2026 فهد الفهيد — جميع الحقوق محفوظة</p>
          <p className="flex items-center gap-2">
            صُنع بشغف في
            <span className="font-semibold text-[#5b93e6]">السعودية</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
