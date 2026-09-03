"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next"
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
// ---------- أيقونات الشبكات الاجتماعية ----------
function GithubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/>
    </svg>
  );
}

function LinkedinIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
    </svg>
  );
}
import { saudiFont, ibmPlexArabic } from "./fonts";



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
  { value: "1Year", label: "الخبرة سنة واحدة تدريبية" },
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
      "بناء خط تحليل يغطي أكثر من 70,000 صف عبر 12 شهر",
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
      "المركز الأول في اختبار جاهزية هندسة البرمجيات (NCAAA) على مستوى كلية الهندسة وعلوم الحاسب",
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
    title: "PerformX — نظام إدارة مشاريع بالذكاء الاصطناعي",
    description: "مشروع التخرج: نظام ويب لإدارة مشاريع البرمجيات يؤتمت تكوين الفرق عبر تكامل OpenAI.",
    tags: ["C#", "ASP.NET Core", "PostgreSQL", "OpenAI API", "Agile/Kanban"],
    year: "2025",
    gradient: "from-[#2454a4] to-[#173a78]",
    Image: "/PerformX3.png",
    details: {
      overview:
        "نظام إدارة مشاريع برمجية شامل يعالج مشاكل ضعف التنسيق بين العملاء ومدراء المشاريع والموظفين. يستقبل النظام مقترحات العملاء، يدير عروض الأسعار والاتفاقيات، ثم يُشكّل فريق العمل تلقائياً بالاستعانة بـ OpenAI بناءً على تخصص كل موظف وحجم مهامه الحالي.",
      role: "عمل جماعي ضمن فريق من 4 طلاب كمشروع تخرج بكالوريوس علوم حاسب، بإشراف أكاديمي. المساهمة شملت تصميم وتطوير النظام باستخدام ASP.NET Core مع التركيز على إدارة المهام وتجربة المستخدم.",
      highlights: [
        "تكوين فرق العمل تلقائياً عبر OpenAI بناءً على التخصص وعبء العمل",
        "نظام متكامل لإدارة المقترحات وعروض الأسعار بين العميل والمدير",
        "لوحات تحكم مخصصة لكل دور (مدير، قائد مشروع، مطوّر، عميل)",
        "منهجية Agile/Kanban في إدارة سير العمل والمهام",
        "اختبار شامل (White Box عبر Postman + Black Box) لجميع الوظائف الأساسية",
      ],
      tools: ["ASP.NET Core", "C#", "PostgreSQL", "HTML/CSS/JavaScript", "OpenAI API", "Figma"],
    },
  },
  {
    title: "بوابة BI التنفيذية",
    description: "لوحتا Power BI متكاملتان تغطي بيانات الموظفين والمشتريات المفتوحة وتتبع الموردين.",
    tags: ["Power BI", "Power Query", "DAX", "Excel", "KPI Design"],
    year: "2025",
    gradient: "from-[#3f7d52] to-[#2f5e3f]",
    Image: "/bi-portal.svg",
    details: {
    overview:
        "بوابة تحليلات تنفيذية موحّدة تجمع بين لوحتي Power BI (بيانات الموظفين والمشتريات المفتوحة وتتبع الموردين) في بوابة واحدة، تتيح لصناع القرار متابعة المؤشرات الحيوية دون الحاجة للتنقل بين تقارير متفرقة.",
    role: "بناء الحل بالكامل من جمع البيانات وتنظيفها إلى تصميم المقاييس ولوحات المعلومات، مع دمجها في بوابة واحدة.",
    highlights: [
        "دمج أكثر من 30 ملف اكسل لبيانات مختلفة في نموذج موحّد",
        "تنظيف وتوحيد البيانات باستخدام Power Query",
        "تغطية بيانات جميع الموظفين بتحديث دوري",
        "تغطية جميع بيانات المشتريات بتحديث دوري",
        "تصميم مقاييس DAX مخصصة للمؤشرات التنفيذية",
        "تصميم واجهة مستخدم تفاعلية وسهلة الاستخدام للوحات",
        "توفير تجربة مستخدم سلسة عبر دمج لوحتين في بوابة واحدة",
        "تحسين اتخاذ القرارت بشأن الميزانية والحوكمة المالية من خلال مؤشرات دقيقة وموثوقة",
      ],
      tools: ["Power BI Desktop", "Power Query", "DAX", "Excel", "KPI Design"],
    },
  },
  {
    title: "QassimPay — منصة مصرفية رقمية",
    description: "تطبيق ويب مصرفي يحاكي العمليات الأساسية للحسابات والتحويلات.",
    tags: ["C#", "ASP.NET Core MVC", "PostgreSQL", "Bootstrap", "Entity Framework Core", "RESTful API"],
    year: "2024",
    gradient: "from-[#5b93e6] to-[#2454a4]",
    Image: "/QassimPay.jpg",
    details: {
      overview:"منصة مصرفية رقمية تحاكي العمليات الأساسية للحسابات والتحويلات، تم تطويرها كجزء من مشروع أكاديمي لتطبيق مفاهيم هندسة البرمجيات في بيئة عملية.",
      role: "تصميم وتطوير التطبيق باستخدام ASP.NET Core MVC مع التركيز على تجربة المستخدم والأمان.",
      highlights: [
        "تطوير منصة تحاكي العمليات المصرفية الأساسية مثل فتح الحسابات وإجراء التحويلات",
        "تصميم واجهة مستخدم سهلة الاستخدام وسريعة",
        "دمج جميع العمليات المصرفية في تطبيق واحد",
        "API تحويل العملات لمعرفة أسعار الصرف الحالية",
        "تحسين تجربة المستخدم من خلال تصميم واجهة تفاعلية"
      ],
      tools: ["C#", "ASP.NET Core MVC", "PostgreSQL", "Bootstrap", "Entity Framework Core", "RESTful API"],
    },
  },
  {
    title: "WSA34 — كأس العالم السعودية 2034",
    description: "تطبيق ويب خاص بمونديال 2034 ضمن مشاريع أكاديمية طويق.",
    tags: ["C#", "Web App"],
    year: "2024",
    gradient: "from-[#6b7d52] to-[#3f5e2f]",
    Image: "/2WSA34.png",
    details: {
      overview: "تطبيق ويب خاص بمونديال 2034 ضمن مشروع تخرج معسكر تطوير المواقع بإستخدام ASP.NET Core MVC أكاديمية طويق.",
      role: "تصميم وتطوير التطبيق بالكامل ضمن متطلبات التخرج من معسكر أكاديمية طويق.",
      highlights: [
        "تصميم واجهة مستخدم سهلة الاستخدام",
        "تطوير نظام إدارة محتوى فعال",
        "دمج جميع المعلومات المتعلقة بمونديال 2034 في تطبيق واحد",
        "لوحة بيانات بسيطة لاظافة المباريات والفرق والنتائج",
      ],
      tools: ["C#", "ASP.NET Core MVC", "Bootstrap", "Entity Framework Core"],
    },
  },
  {
    title: "بوت البريد الجماعي",
    description: "تطبيق سطح مكتب لأتمتة إرسال البريد لجهات الاتصال المؤسسية.",
    tags: ["C#", "Desktop", "Automation"],
    year: "2023",
    gradient: "from-[#173a78] to-[#0a1f1c]",
    Image: "/mail-bot.svg",
    details: {
      overview: "تطبيق سطح مكتب يرسل بريد اكتروني جماعي بشكل منفصل لاتمتة عملية التواصل مع جهات الاتصال المؤسسية، مع إمكانية تخصيص الرسائل وإرفاق ملفات.",
      role: "تصميم وتطوير التطبيق باستخدام C# لتسهيل عملية إرسال البريد الجماعي.",
      highlights: [
        "تصميم واجهة مستخدم سهلة الاستخدام",
        "تطوير نظام أتمتة فعال لإرسال البريد الجماعي",
        "دمج جميع الميزات المطلوبة في تطبيق واحد"
      ],
      tools: ["C#", "Windows Forms", "SMTP"],
    },
  },
  {
    title: "TODO — متتبع المهام",
    description: "تطبيق ويب لإدارة المهام اليومية بواجهة بسيطة وسريعة.",
    tags: ["PHP", "Laravel"],
    year: "2023",
    gradient: "from-[#2454a4] to-[#3f7d52]",
    Image: "/TODO.png",
    details: {
      overview: "تطبيق ويب لإدارة المهام اليومية مع امكانية انشاء فرق وتتبع المهام المتأخرة مع تغيير الحالة بشكل تلقائي وارسال رسائل تنبيهية للبريد الاكتروني.",
      role: "تصميم وتطوير التطبيق باستخدام تقنيات الويب الحديثة.",
      highlights: [
        "تصميم واجهة مستخدم سهلة الاستخدام",
        "تطوير نظام إدارة المهام فعال",
        "دمج جميع الميزات المطلوبة في تطبيق واحد",
      "ارسال رسائل تنبيهية للبريد الاكتروني",
    ],
    tools: ["PHP", "Laravel", "Bootstrap", "MySQL", "SMTP"],
  },
  }
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
  const [selectedProject, setSelectedProject] = useState<(typeof PROJECTS)[number] | null>(null);
  // تجميد التمرير عند فتح نافذة تفاصيل المشروع
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

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
            <Image src="/logo.png" alt="فهد الفهيد" width={120} height={100} className="rounded-lg" />
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

  {/* السجادة - خلفية باهتة*/}
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      <Image
        src="/Carpet.png"
        alt=""
        fill
        priority
        className="object-left opacity-[0.9] md:opacity-[0.42] lg:opacity-[0.8]"
      />
    </div>

  {/* طبقة تعتيم خفيفة لضمان وضوح النص فوق السجادة */}
  <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0a1f1c]/60" />

  <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr]">
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
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#ff0000] opacity-90" />
            <span className="relative h-2 w-2 rounded-full bg-[#d00000]" />
          </span>
          الموقع تحت التحسين 
        </span>
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
        className="mt-6 max-w-xl text-lg leading-relaxed text-white/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        مهندس برمجيات ومحلل بيانات، حاصل على شهادة{" "}
        <span className="font-semibold text-[#ffffff]">CAPM®</span>{" "}
         أبني تطبيقات ويب حديثة وأصمم لوحات معلومات{" "}
        <span className="font-semibold text-[#ffffff]">Power BI</span>{" "}
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
        className="mt-10 flex items-center gap-4 text-sm text-white/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="flex items-center gap-1.5">
          <MapPin size={15} className="text-[#ffffff]" />
          الرياض، السعودية
        </span>
        <span className="h-1 w-1 rounded-full bg-white/30" />
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#ffffff] opacity-70" />
            <span className="relative h-2 w-2 rounded-full bg-[#28c958]" />
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
      className="absolute bottom-0 w-full text-right text-lg font-light tracking-widest text-white/85"
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

          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
            <Image
              src="/Sword.png"
              alt=""
              fill
              priority
              className="object-left opacity-[0.9] md:opacity-[0.42] lg:opacity-[0.8]"
            />
          </div>
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
        مهندس برمجيات سعودي، خريج بكالوريوس هندسة برمجيات بتقدير ممتاز مع مرتبة الشرف الثانية وايضا حاصل على شهادة الدبلوم في تقنية شبكات الحاسب بتقدير ممتاز مع مرتبة الشرف الأولى. أجمع بين
        التطوير البرمجي وتحليل البيانات وايضا تطوير الأعمال لتقديم حلول تقنية ذات أثر
        حقيقي من بناء التطبيقات إلى تصميم لوحات المعلومات التنفيذية.
        <br />
        <br />
        حاصل على شهادة CAPM® المعتمدة من PMI، وأمتلك خبرة تدريبية في
        إدارة المشاريع التقنية وإدارة حوكمة التكنولوجيا.
        
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
                onClick={() => p.details && setSelectedProject(p)}
                className={`group overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition duration-300 hover:-translate-y-1.5 hover:border-white/20 ${
                  p.details ? "cursor-pointer" : ""
                }`}
              >
                <div className={`relative flex h-44 items-end bg-gradient-to-br ${p.gradient} p-4`}>
                                    {p.Image && (
                    <Image
                      src={p.Image}
                      alt={p.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  )}

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

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm transition hover:border-[#5b93e6]/50 hover:text-[#5b93e6]"
                  >
                    <LinkedinIcon /> LinkedIn
                  </a>
                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm transition hover:border-white/40 hover:text-white"
                  >
                    <GithubIcon /> GitHub
                  </a>
                </div>
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
      {/* ===== Modal تفاصيل المشروع ===== */}
      {selectedProject?.details && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1d15]"
          >
            {/* صورة الرأس */}
            <div className={`relative h-52 bg-gradient-to-br ${selectedProject.gradient}`}>
              {selectedProject.Image && (
                <Image
                  src={selectedProject.Image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute left-4 top-4 flex h-10 w-10 items-center cursor-pointer justify-center rounded-full bg-black/50 text-white backdrop-blur transition-all hover:scale-110 hover:bg-[#d00000] hover:text-white"
                aria-label="إغلاق"
              >
                <X size={20} />
              </button>
              <span className="absolute bottom-4 right-6 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                {selectedProject.year}
              </span>
            </div>

            {/* المحتوى */}
            <div className="p-6 md:p-8">
              <h3 className={`${saudiFont.className} text-2xl font-black md:text-3xl`}>
                {selectedProject.title}
              </h3>

              <p className="mt-4 leading-relaxed text-white/70">
                {selectedProject.details.overview}
              </p>

              <div className="mt-6">
                <h4 className="mb-2 text-sm font-bold text-[#5b93e6]">دوري في المشروع</h4>
                <p className="text-sm leading-relaxed text-white/65">{selectedProject.details.role}</p>
              </div>

              <div className="mt-6">
                <h4 className="mb-3 text-sm font-bold text-[#5b93e6]">أبرز الإنجازات</h4>
                <ul className="space-y-2">
                  {selectedProject.details.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-white/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#3f7d52]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {selectedProject.details.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
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
