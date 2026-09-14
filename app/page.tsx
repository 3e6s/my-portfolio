"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, createContext, useContext } from "react";
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
  Award,
  ChevronLeft,
  ChevronRight,
  Eye,
  Repeat,
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




// English translations. Arabic content below remains the source of truth.
// Add a matching English entry here whenever you add Arabic text.
const ENGLISH_TRANSLATIONS: Record<string, string> = {
  "نبذة": "About",
  "الخبرة": "Experience",
  "المشاريع": "Projects",
  "المهارات": "Skills",
  "تواصل": "Contact",
  "الشهادات": "Certificates",
  "مشاريع تقنية": "Technical projects",
  "شهادة معتمدة": "Professional certification",
  "الخبرة سنة واحدة تدريبية": "One year of training experience",
  "التطوير": "Development",
  "تحليل البيانات": "Data Analysis",
  "Excel متقدم": "Advanced Excel",
  "تنظيف البيانات": "Data Cleaning",
  "إدارة المشاريع": "Project Management",
  "إدارة المخاطر": "Risk Management",
  "أجايل": "Agile",
  "متدرب — المشاريع الرقمية / البنية المؤسسية": "Trainee — Digital Projects / Enterprise Architecture",
  "الهيئة السعودية للتخصصات الصحية · الرياض": "Saudi Commission for Health Specialties · Riyadh",
  "نوفمبر 2025 — مايو 2026": "November 2025 — May 2026",
  "ادارة 3 مشاريع تحوّل رقمي استراتيجية ومواءمة الفرق التقنية والمورّدين": "Managed 3 strategic digital transformation projects and coordinated technical teams and vendors",
  "المساهمة في إنهاء عقد تقني قائم لصالح حل داخلي وتوفير الموارد المالية": "Contributed to ending an existing technology contract in favor of an in-house solution, saving financial resources",
  "رفع تقارير أسبوعية للمدير التنفيذي للتقنية وإدارة قصص المستخدم في Azure DevOps": "Prepared weekly reports for the Chief Technology Officer and managed user stories in Azure DevOps",
  "اكاديمية الذكاء الاصطناعي / متدرب تعاوني — الحوكمة التقنية": "AI Academy / Cooperative Trainee — Technology Governance",
  "شركة تحكم · الرياض": "Tahakom · Riyadh",
  "يونيو 2025 — نوفمبر 2025": "June 2025 — November 2025",
  "تصميم وتسليم حلّي Power BI متكاملين ودمجهما في بوابة BI موحّدة": "Designed and delivered two integrated Power BI solutions and combined them in a unified BI portal",
  "بناء خط تحليل يغطي أكثر من 70,000 صف عبر 12 شهر": "Built an analytics pipeline covering more than 70,000 rows across 12 months",
  "تمثيل الشركة في 8 اجتماعات فنية وتحليل +1,250 ردّ على كراسات الشروط": "Represented the company in 8 technical meetings and analyzed more than 1,250 RFP responses",
  "بكالوريوس هندسة برمجيات": "Bachelor of Science in Software Engineering",
  "جامعة المستقبل — مرتبة الشرف": "Mustaqbal University — Honors",
  "تخرج 2025": "Graduated 2025",
  "معدل تراكمي 4.55/5": "GPA: 4.55/5",
  "المركز الأول في اختبار جاهزية هندسة البرمجيات (NCAAA) على مستوى كلية الهندسة وعلوم الحاسب": "Ranked first in the Software Engineering Readiness Exam (NCAAA) at the College of Engineering and Computer Science",
  "دبلوم تقنية شبكات حاسب الي": "Diploma in Computer Network Technology",
  "الكلية التقنية في بريدة — مرتبة الشرف الأولى": "Technical College in Buraydah — First-Class Honors",
  "تخرج 2022": "Graduated 2022",
  "معدل تراكمي 4.89/5": "GPA: 4.89/5",
  "المركز الثاني على مستوى كلية الحاسب في بريدة": "Ranked second at the College of Computing in Buraydah",
  "PerformX — نظام إدارة مشاريع بالذكاء الاصطناعي": "PerformX — AI Project Management System",
  "مشروع التخرج: نظام ويب لإدارة مشاريع البرمجيات يؤتمت تكوين الفرق عبر تكامل OpenAI.": "Graduation project: a web-based software project management system that automates team formation through OpenAI integration.",
  "نظام إدارة مشاريع برمجية شامل يعالج مشاكل ضعف التنسيق بين العملاء ومدراء المشاريع والموظفين. يستقبل النظام مقترحات العملاء، يدير عروض الأسعار والاتفاقيات، ثم يُشكّل فريق العمل تلقائياً بالاستعانة بـ OpenAI بناءً على تخصص كل موظف وحجم مهامه الحالي.": "A comprehensive software project management system that addresses coordination gaps between clients, project managers, and employees. It receives client proposals, manages quotations and agreements, and automatically forms teams using OpenAI based on each employee’s specialty and current workload.",
  "قائد الفريق والمساهم التقني الرئيسي في مشروع التخرج ضمن فريق من 4 طلاب للحصول على درجة البكالوريوس في هندسة البرمجيات. توليت قيادة وتنسيق العمل التقني، والمساهمة بشكل مكثف في تصميم معمارية النظام وتطوير الـBackend باستخدام ASP.NET Core، وبناء منطق إدارة المشاريع والمهام، إلى جانب تكامل OpenAI وتطوير أجزاء أساسية من النظام.": "Team leader and main technical contributor in a four-student Software Engineering graduation project. I led and coordinated technical work, contributed extensively to system architecture and backend development using ASP.NET Core, built project and task management logic, and implemented OpenAI integration and other core system features.",
  "قيادة فريق من 4 طلاب وتنسيق العمل التقني وتوزيع المهام ومتابعة مراحل تطوير المشروع": "Led a team of 4 students, coordinated technical work, assigned tasks, and tracked development progress",
  "تصميم وتطوير الـBackend باستخدام C# وASP.NET Core وبناء منطق الأعمال الأساسي للنظام": "Designed and developed the backend using C# and ASP.NET Core and implemented core business logic",
  "تطوير نظام إدارة المشاريع والمهام وفق منهجية Agile/Kanban": "Developed project and task management features following Agile/Kanban practices",
  "تطوير آلية تكوين فرق العمل تلقائياً عبر OpenAI بناءً على تخصص الموظفين وعبء العمل الحالي": "Built automatic team formation using OpenAI based on employee specialties and current workloads",
  "تصميم وتنفيذ نظام متكامل لإدارة المقترحات وعروض الأسعار والاتفاقيات بين العميل ومدير المشروع": "Designed and implemented proposal, quotation, and agreement management between clients and project managers",
  "تطوير لوحات تحكم مخصصة حسب صلاحيات وأدوار المستخدمين (مدير، قائد مشروع، مطوّر، عميل)": "Developed dashboards tailored to user permissions and roles: administrator, project lead, developer, and client",
  "تصميم قاعدة البيانات وربط النظام بـ PostgreSQL وإدارة العلاقات والبيانات": "Designed the database, integrated PostgreSQL, and managed data and relationships",
  "المساهمة في تصميم واجهات وتجربة المستخدم وتحويل المتطلبات إلى وظائف قابلة للتنفيذ": "Contributed to UI/UX design and translated requirements into working features",
  "تنفيذ اختبارات White Box وBlack Box والتحقق من وظائف النظام الأساسية باستخدام Postman": "Performed white-box and black-box testing and verified core system functionality using Postman",
  "بوابة BI التنفيذية": "Executive BI Portal",
  "لوحتا Power BI متكاملتان تغطي بيانات الموظفين والمشتريات المفتوحة وتتبع الموردين.": "Two integrated Power BI dashboards covering employee data, open purchase orders, and supplier tracking.",
  "بوابة تحليلات تنفيذية موحّدة تجمع بين لوحتي Power BI (بيانات الموظفين والمشتريات المفتوحة وتتبع الموردين) في بوابة واحدة، تتيح لصناع القرار متابعة المؤشرات الحيوية دون الحاجة للتنقل بين تقارير متفرقة.": "A unified executive analytics portal combining two Power BI dashboards for employee data, open purchase orders, and supplier tracking. It enables decision-makers to monitor key indicators without switching between separate reports.",
  "بناء الحل بالكامل من جمع البيانات وتنظيفها إلى تصميم المقاييس ولوحات المعلومات، مع دمجها في بوابة واحدة.": "Built the complete solution, from data collection and cleaning to measure and dashboard design, and integrated the dashboards into one portal.",
  "دمج أكثر من 30 ملف اكسل لبيانات مختلفة في نموذج موحّد": "Combined more than 30 Excel files containing different datasets into a unified model",
  "تنظيف وتوحيد البيانات باستخدام Power Query": "Cleaned and standardized data using Power Query",
  "تغطية بيانات جميع الموظفين بتحديث دوري": "Covered all employee data with regular updates",
  "تغطية جميع بيانات المشتريات بتحديث دوري": "Covered all procurement data with regular updates",
  "تصميم مقاييس DAX مخصصة للمؤشرات التنفيذية": "Designed custom DAX measures for executive indicators",
  "تصميم واجهة مستخدم تفاعلية وسهلة الاستخدام للوحات": "Designed an interactive, easy-to-use dashboard interface",
  "توفير تجربة مستخدم سلسة عبر دمج لوحتين في بوابة واحدة": "Created a seamless user experience by integrating two dashboards into one portal",
  "تحسين اتخاذ القرارت بشأن الميزانية والحوكمة المالية من خلال مؤشرات دقيقة وموثوقة": "Improved budget and financial governance decisions through accurate, reliable indicators",
  "QassimPay — منصة مصرفية رقمية": "QassimPay — Digital Banking Platform",
  "تطبيق ويب مصرفي يحاكي العمليات الأساسية للحسابات والتحويلات.": "A banking web application that simulates core account and transfer operations.",
  "منصة مصرفية رقمية تحاكي العمليات الأساسية للخدمات المصرفية، بما في ذلك إدارة الحسابات والتحويلات المالية. تم تطوير المشروع لتطبيق مفاهيم هندسة البرمجيات وتصميم الأنظمة من خلال بناء تجربة مصرفية متكاملة في بيئة عملية.": "A digital banking platform that simulates core banking services, including account management and money transfers. The project applies software engineering and system design concepts through an integrated banking experience in a practical environment.",
  "تصميم وتطوير التطبيق باستخدام ASP.NET Core MVC مع التركيز على تجربة المستخدم والأمان.": "Designed and developed the application using ASP.NET Core MVC, focusing on user experience and security.",
  "تطوير منصة تحاكي العمليات المصرفية الأساسية مثل فتح الحسابات وإجراء التحويلات": "Developed a platform that simulates core banking operations, including account opening and transfers",
  "تصميم واجهة مستخدم سهلة الاستخدام وسريعة": "Designed a fast, easy-to-use interface",
  "دمج جميع العمليات المصرفية في تطبيق واحد": "Integrated all banking operations into one application",
  "تطوير أداة تفاعلية لتحويل العملات باستخدام API خارجي لعرض أسعار الصرف الحالية": "Developed an interactive currency converter using an external API to display current exchange rates",
  "إتاحة إدخال المبلغ وتحديد العملة المصدر والعملة المستهدفة لعرض قيمة التحويل بشكل فوري": "Enabled users to enter an amount and select source and target currencies to instantly view the converted value",
  "تحسين تجربة المستخدم من خلال تصميم واجهة تفاعلية": "Improved the user experience through interactive interface design",
  "WSA34 — كأس العالم السعودية 2034": "WSA34 — Saudi Arabia World Cup 2034",
  "تطبيق ويب خاص بمونديال 2034 ضمن مشاريع أكاديمية طويق.": "A web application for the 2034 World Cup, developed as part of Tuwaiq Academy projects.",
  "تطبيق ويب خاص بمونديال 2034 ضمن مشروع تخرج معسكر تطوير المواقع بإستخدام ASP.NET Core MVC أكاديمية طويق.": "A web application for the 2034 World Cup, developed as the graduation project for Tuwaiq Academy’s ASP.NET Core MVC web development bootcamp.",
  "تصميم وتطوير التطبيق بالكامل ضمن متطلبات التخرج من معسكر أكاديمية طويق.": "Designed and developed the entire application to meet Tuwaiq Academy bootcamp graduation requirements.",
  "تصميم واجهة مستخدم سهلة الاستخدام": "Designed an easy-to-use interface",
  "تطوير نظام إدارة محتوى فعال": "Developed an effective content management system",
  "دمج جميع المعلومات المتعلقة بمونديال 2034 في تطبيق واحد": "Combined information about the 2034 World Cup in one application",
  "لوحة بيانات بسيطة لاظافة المباريات والفرق والنتائج": "Built a simple dashboard for adding matches, teams, and results",
  "بوت البريد الجماعي": "Bulk Email Bot",
  "تطبيق سطح مكتب لأتمتة إرسال البريد الإلكتروني الجماعي لجهات الاتصال المؤسسية.": "A desktop application that automates bulk email delivery to corporate contacts.",
  "تطبيق سطح مكتب يرسل بريداً إلكترونياً جماعياً بشكل منفصل ومخصص لكل مستلم، عبر الاتصال المباشر بحساب Gmail. يسمح بإضافة عدد كبير من المستلمين دفعة واحدة، مع إمكانية تخصيص محتوى الرسالة وإرفاق ملفات استُخدم فعلياً لإرسال طلبات توظيف لعدد من مسؤولي التوظيف.": "A desktop application that sends separate, personalized emails to multiple recipients through a direct Gmail connection. It supports adding large recipient lists, customizing message content, and attaching files. It was used to send job applications to recruitment contacts.",
  "تصميم وتطوير التطبيق باستخدام C# وربطه بخدمة Gmail لأتمتة عملية الإرسال الجماعي.": "Designed and developed the application using C# and connected it to Gmail to automate bulk email delivery.",
  "اتصال مباشر بحساب Gmail عبر SMTP/API لإرسال الرسائل": "Connected directly to Gmail through SMTP/API to send messages",
  "إرسال مخصص ومنفصل لكل مستلم بدلاً من نسخة واحدة جماعية": "Sent separate, personalized messages to each recipient instead of a single group email",
  "دعم قائمة مستلمين قابلة للتوسع (تجريبياً حتى 180 جهة اتصال)": "Supported an expandable recipient list, tested with up to 180 contacts",
  "واجهة سطح مكتب بسيطة لإدارة المستلمين ومحتوى الرسالة": "Built a simple desktop interface for managing recipients and message content",
  "معالجة أخطاء الإرسال وعرض عدد الرسائل التي تم إرسالها بنجاح، مع إظهار تفاصيل الأخطاء للمستلمين الذين تعذر الإرسال إليهم": "Handled delivery errors, displayed the number of successfully sent messages, and provided error details for failed recipients",
  "تاخير إرسال الرسائل لتجنب حظر الحساب من قبل Gmail عند إرسال عدد كبير من الرسائل في وقت قصير": "Added delays between messages to reduce the risk of Gmail blocking the account during high-volume sending",
  "TODO — متتبع المهام": "TODO — Task Tracker",
  "تطبيق ويب لإدارة المهام اليومية بواجهة بسيطة وسريعة.": "A web application for managing daily tasks with a simple, fast interface.",
  "تطبيق ويب لإدارة المهام اليومية مع امكانية انشاء فرق وتتبع المهام المتأخرة مع تغيير الحالة بشكل تلقائي وارسال رسائل تنبيهية للبريد الاكتروني.": "A web application for managing daily tasks, creating teams, and tracking overdue tasks, with automatic status updates and email notifications.",
  "تصميم وتطوير التطبيق باستخدام تقنيات الويب الحديثة.": "Designed and developed the application using modern web technologies.",
  "تطوير نظام إدارة المهام فعال": "Developed an effective task management system",
  "دمج جميع الميزات المطلوبة في تطبيق واحد": "Integrated all required features into one application",
  "ارسال رسائل تنبيهية للبريد الاكتروني": "Implemented email notifications",
  "شهادة الهيئة السعودية للتخصصات الصحية اتمام التدريب": "SCFHS Training Completion Certificate",
  "شهادة اتمام التدريب التعاوني": "Cooperative Training Completion Certificate",
  "تدريب تعاوني في الحوكمة التقنية": "Cooperative Training in Technology Governance",
  "تحكم (Tahakom)": "Tahakom",
  "شهادة إتمام برنامج Laravel إطار العمل": "Laravel Framework Program Completion Certificate",
  "شهادة اجتياز معسكر تطوير المواقع باستخدام ASP.NET Core MVC": "ASP.NET Core MVC Web Development Bootcamp Certificate",
  "أكاديمية طويق (Tuwaiq Academy)": "Tuwaiq Academy",
  "شهادة اجتياز معسكر الذكاء الاصطناعي التوليدي": "Generative AI Bootcamp Completion Certificate",
  "خطاب شكر وتقدير - التفوق في اختبار الجاهزية": "Appreciation Letter — Readiness Exam Excellence",
  "جامعة المستقبل (Mustaqbal University)": "Mustaqbal University",
  "شكر وتقدير - مكافأة التفوق العلمي": "Academic Excellence Award — Appreciation Certificate",
  "المؤسسة العامة للتدريب التقني والمهني (TVTC)": "Technical and Vocational Training Corporation (TVTC)",
  "عرض الشهادة": "View certificate",
  "السابق": "Previous",
  "التالي": "Next",
  "إغلاق": "Close",
  "فهد الفهيد": "Fahad Alfehaid",
  "القائمة": "Menu",
  "الدلة": "Arabic coffee pot",
  "فنجال القهوة": "Arabic coffee cup",
  "نبذة عني": "About Me",
  "من أنا وماذا أقدم": "Who I am and what I offer",
  "الخبرة والتعليم": "Experience & Education",
  "مسيرتي المهنية والأكاديمية": "My professional and academic journey",
  "بكالوريوس": "Bachelor",
  "دبلوم": "Diploma",
  "أبرز المشاريع": "Featured Projects",
  "أعمال أفتخر بها": "Work I’m proud of",
  "المهارات التقنية": "Technical Skills",
  "الأدوات التي أتقنها": "Tools I work with",
  "إنجازات موثقة": "Verified achievements",
  "شهادات التزكية المهنية": "Professional Recommendations",
  "ماذا قال مدرائي وزملائي عني": "What my managers and colleagues say about me",
  "لنصنع شيئاً رائعاً": "Let’s Create Something Great",
  "تواصل معي": "Contact Me",
  "فهد": "Fahad",
  "الفهيد": "Alfehaid",
  "أهلاً بك في معرض أعمالي": "Welcome to my portfolio",
  "الموقع تحت التحسين": "Website improvements in progress",
  "مهندس برمجيات ومحلل بيانات، حاصل على شهادة": "Software engineer and data analyst, certified in",
  "أبني تطبيقات ويب حديثة وأصمم لوحات معلومات": "I build modern web applications and design dashboards with",
  "تحوّل البيانات إلى قرارات.": "to turn data into decisions.",
  "استعرض مشاريعي": "Explore My Projects",
  "تحميل السيرة الذاتية": "Download CV",
  "عزنا بطموحنا": "AZNNA by our ambition",
  "الرياض، السعودية": "Riyadh, Saudi Arabia",
  "متاح للعمل": "Open to work",
  "مهندس برمجيات سعودي، خريج بكالوريوس هندسة برمجيات بتقدير ممتاز مع مرتبة الشرف الثانية وايضا حاصل على شهادة الدبلوم في تقنية شبكات الحاسب بتقدير ممتاز مع مرتبة الشرف الأولى. أجمع بين التطوير البرمجي وتحليل البيانات وايضا تطوير الأعمال لتقديم حلول تقنية ذات أثر حقيقي من بناء التطبيقات إلى تصميم لوحات المعلومات التنفيذية.": "A Saudi software engineer with a bachelor’s degree in Software Engineering, graded Excellent with Second-Class Honors, and a diploma in Computer Network Technology, graded Excellent with First-Class Honors. I combine software development, data analysis, and business development to deliver impactful technology solutions, from building applications to designing executive dashboards.",
  "حاصل على شهادة CAPM® المعتمدة من PMI، وأمتلك خبرة تدريبية في إدارة المشاريع التقنية وإدارة حوكمة التكنولوجيا.": "I hold the CAPM® certification from PMI and have practical training experience in technical project management and technology governance.",
  "مهارات": "skills",
  "عندك فكرة مشروع؟": "Have a project in mind?",
  "خلينا نحولها لواقع": "Let’s bring it to life",
  "متاح للعمل الحر والفرص الوظيفية. راسلني على البريد أو تواصل معي مباشرة وسأرد عليك في أقرب وقت.": "Available for freelance projects and career opportunities. Email me or get in touch directly, and I’ll respond as soon as possible.",
  "البريد الإلكتروني": "Email",
  "الجوال": "Phone",
  "الموقع": "Location",
  "دوري في المشروع": "My Role",
  "أبرز الإنجازات": "Key Achievements",
  "© 2026 فهد الفهيد — جميع الحقوق محفوظة": "© 2026 Fahad Alfehaid — All rights reserved",
  "صُنع بشغف في": "Made with passion in",
  "السعودية": "Saudi Arabia",
  "شهادة": "Certificate"
};

type Language = "ar" | "en";
const LanguageContext = createContext<Language>("ar");

function useTranslation() {
  const language = useContext(LanguageContext);
  const textDirection = language === "ar" ? "rtl" : "ltr";
  const tr = (text: string): string => {
    if (language === "ar") return text;
    return ENGLISH_TRANSLATIONS[text.replace(/\s+/g, " ").trim()] ?? text;
  };
  return { language, textDirection, tr };
}

const NAV = [
  { id: "about", label: "نبذة" },
  { id: "experience", label: "الخبرة" },
  { id: "projects", label: "المشاريع" },
  { id: "skills", label: "المهارات" },
  { id: "contact", label: "تواصل" },
  { id: "certificates", label: "الشهادات" },
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
    icon: Repeat,
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
      description:
        "مشروع التخرج: نظام ويب لإدارة مشاريع البرمجيات يؤتمت تكوين الفرق عبر تكامل OpenAI.",
      tags: ["C#", "ASP.NET Core MVC", "PostgreSQL", "OpenAI API", "Agile/Kanban", "Figma", "Postman"],
      year: "2025",
      gradient: "from-[#2454a4] to-[#173a78]",
      Image: "/PerformX3.png",
      details: {
        overview:
          "نظام إدارة مشاريع برمجية شامل يعالج مشاكل ضعف التنسيق بين العملاء ومدراء المشاريع والموظفين. يستقبل النظام مقترحات العملاء، يدير عروض الأسعار والاتفاقيات، ثم يُشكّل فريق العمل تلقائياً بالاستعانة بـ OpenAI بناءً على تخصص كل موظف وحجم مهامه الحالي.",

        role:
          "قائد الفريق والمساهم التقني الرئيسي في مشروع التخرج ضمن فريق من 4 طلاب للحصول على درجة البكالوريوس في هندسة البرمجيات. توليت قيادة وتنسيق العمل التقني، والمساهمة بشكل مكثف في تصميم معمارية النظام وتطوير الـBackend باستخدام ASP.NET Core، وبناء منطق إدارة المشاريع والمهام، إلى جانب تكامل OpenAI وتطوير أجزاء أساسية من النظام.",

        highlights: [
          "قيادة فريق من 4 طلاب وتنسيق العمل التقني وتوزيع المهام ومتابعة مراحل تطوير المشروع",
          "تصميم وتطوير الـBackend باستخدام C# وASP.NET Core وبناء منطق الأعمال الأساسي للنظام",
          "تطوير نظام إدارة المشاريع والمهام وفق منهجية Agile/Kanban",
          "تطوير آلية تكوين فرق العمل تلقائياً عبر OpenAI بناءً على تخصص الموظفين وعبء العمل الحالي",
          "تصميم وتنفيذ نظام متكامل لإدارة المقترحات وعروض الأسعار والاتفاقيات بين العميل ومدير المشروع",
          "تطوير لوحات تحكم مخصصة حسب صلاحيات وأدوار المستخدمين (مدير، قائد مشروع، مطوّر، عميل)",
          "تصميم قاعدة البيانات وربط النظام بـ PostgreSQL وإدارة العلاقات والبيانات",
          "المساهمة في تصميم واجهات وتجربة المستخدم وتحويل المتطلبات إلى وظائف قابلة للتنفيذ",
          "تنفيذ اختبارات White Box وBlack Box والتحقق من وظائف النظام الأساسية باستخدام Postman",
        ],

        tools: [
          "C#",
          "ASP.NET Core MVC",
          "PostgreSQL",
          "HTML/CSS/JavaScript",
          "OpenAI API",
          "Figma",
          "Postman",
          "SMTP",
        ],
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
      overview:"منصة مصرفية رقمية تحاكي العمليات الأساسية للخدمات المصرفية، بما في ذلك إدارة الحسابات والتحويلات المالية. تم تطوير المشروع لتطبيق مفاهيم هندسة البرمجيات وتصميم الأنظمة من خلال بناء تجربة مصرفية متكاملة في بيئة عملية.",
      role: "تصميم وتطوير التطبيق باستخدام ASP.NET Core MVC مع التركيز على تجربة المستخدم والأمان.",
      highlights: [
        "تطوير منصة تحاكي العمليات المصرفية الأساسية مثل فتح الحسابات وإجراء التحويلات",
        "تصميم واجهة مستخدم سهلة الاستخدام وسريعة",
        "دمج جميع العمليات المصرفية في تطبيق واحد",
        "تطوير أداة تفاعلية لتحويل العملات باستخدام API خارجي لعرض أسعار الصرف الحالية",
        "إتاحة إدخال المبلغ وتحديد العملة المصدر والعملة المستهدفة لعرض قيمة التحويل بشكل فوري",
        "تحسين تجربة المستخدم من خلال تصميم واجهة تفاعلية"
      ],
      tools: ["C#", "ASP.NET Core MVC", "PostgreSQL", "Bootstrap", "Entity Framework Core", "RESTful API"],
    },
  },
  {
    title: "WSA34 — كأس العالم السعودية 2034",
    description: "تطبيق ويب خاص بمونديال 2034 ضمن مشاريع أكاديمية طويق.",
    tags: ["C#", "Web App", "ASP.NET Core MVC", "Bootstrap", "Entity Framework Core"],
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
    description: "تطبيق سطح مكتب لأتمتة إرسال البريد الإلكتروني الجماعي لجهات الاتصال المؤسسية.",
    tags: ["C#", "Windows Forms", "SMTP", "Gmail API", "Automation"],
    year: "2023",
    gradient: "from-[#173a78] to-[#0a1f1c]",
    Image: "/mail-bot.svg",
    details: {
      overview:
        "تطبيق سطح مكتب يرسل بريداً إلكترونياً جماعياً بشكل منفصل ومخصص لكل مستلم، عبر الاتصال المباشر بحساب Gmail. يسمح بإضافة عدد كبير من المستلمين دفعة واحدة، مع إمكانية تخصيص محتوى الرسالة وإرفاق ملفات استُخدم فعلياً لإرسال طلبات توظيف لعدد من مسؤولي التوظيف.",
      role: "تصميم وتطوير التطبيق باستخدام C# وربطه بخدمة Gmail لأتمتة عملية الإرسال الجماعي.",
      highlights: [
        "اتصال مباشر بحساب Gmail عبر SMTP/API لإرسال الرسائل",
        "إرسال مخصص ومنفصل لكل مستلم بدلاً من نسخة واحدة جماعية",
        "دعم قائمة مستلمين قابلة للتوسع (تجريبياً حتى 180 جهة اتصال)",
        "واجهة سطح مكتب بسيطة لإدارة المستلمين ومحتوى الرسالة",
        "معالجة أخطاء الإرسال وعرض عدد الرسائل التي تم إرسالها بنجاح، مع إظهار تفاصيل الأخطاء للمستلمين الذين تعذر الإرسال إليهم",
        "تاخير إرسال الرسائل لتجنب حظر الحساب من قبل Gmail عند إرسال عدد كبير من الرسائل في وقت قصير",
      ],
      tools: ["C#", "Windows Forms", "SMTP", "Gmail API"],
    },
  },
  {
    title: "TODO — متتبع المهام",
    description: "تطبيق ويب لإدارة المهام اليومية بواجهة بسيطة وسريعة.",
    tags: ["PHP", "Laravel", "HTML/CSS/JavaScript", "MySQL", "SMTP",  "Bootstrap"],
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
    tools: ["PHP", "Laravel", "Bootstrap", "MySQL", "SMTP", "HTML/CSS/JavaScript"],
  },
  }
];

const CERTIFICATES = [
  {
    title: "CAPM®",
    subtitle: "Certified Associate in Project Management",
    issuer: "PMI",
    image: "/CAPM.jpg",
  },
  {
    title: "شهادة الهيئة السعودية للتخصصات الصحية اتمام التدريب ",
    subtitle: "SCFHS Training Certificate",
    issuer: "SCFHS",
    image:"/Fahad_Alfehaid_SCFHS_Training_Certificate.jpg",
  },
  {
    title: "شهادة اتمام التدريب التعاوني",
    subtitle: "تدريب تعاوني في الحوكمة التقنية",
    issuer: "تحكم (Tahakom)",
    image: "/Fahad_Alfehaid_Tahakom_COOP_Training_Certificate.jpg",
  },

  {
    title: "شهادة إتمام برنامج Laravel إطار العمل",
    subtitle: "Laravel Framework Training Program",
    issuer: "Code Labs & Qassim Tech",
    image: "/codelab.jpg", 
  },
    {
    title: "شهادة اجتياز معسكر تطوير المواقع باستخدام ASP.NET Core MVC",
    subtitle: "Web Development Bootcamp using ASP.NET Core MVC",
    issuer: "أكاديمية طويق (Tuwaiq Academy)",
    image: "/ASP.net.jpg", 
  },
  
  {
    title: "شهادة اجتياز معسكر الذكاء الاصطناعي التوليدي",
    subtitle: "Generative AI Bootcamp (LLAMA)",
    issuer: "أكاديمية طويق (Tuwaiq Academy)",
    image: "/GenAI.jpg", 
  },
    {
    title: "خطاب شكر وتقدير - التفوق في اختبار الجاهزية",
    subtitle: "Appreciation Letter - Software Engineering Readiness Exam",
    issuer: "جامعة المستقبل (Mustaqbal University)",
    image: "/جاهزية.jpg", 
  },
  {
    title: "شكر وتقدير - مكافأة التفوق العلمي",
    subtitle: "Excellence Award Appreciation Certificate",
    issuer: "المؤسسة العامة للتدريب التقني والمهني (TVTC)",
    image: "/شكر وتقدير التقنية.jpg", 
  },
];
const RECOMMENDATIONS = [
  {
    name: "Raed AlHajlah, MSc, ITIL®",
    title: "Enterprise Architect | IT governance | Digital Transformation | Emerging Technologies Enabler",
    relation: "Raed managed Fahad directly",
    date: "June 9, 2026",
    image: "/Raed.png", 
    text: "I had the pleasure of working with Fahad as part of our Digital Projects team. He stood out for his eagerness to learn, strong work ethic, and outstanding character. Fahad added real value to the team and I highly recommended to be part of team.",
  },
  {
    name: "Fahad Alqunaieer",
    title: "Business Enabler | Innovation | Empowering Teams | Driving Digital Transformation",
    relation: "Fahad was senior to Fahad but didn’t manage Fahad directly",
    date: "June 9, 2026",
    image: "/Fahadalq.jpg",
    text: "Fahad is a committed and ambitious young professional who consistently demonstrated responsibility, professionalism, and a strong willingness to learn throughout his training. He has great potential and a bright future ahead.",
  },
    {
    name: "Eman Alyabsi, PMP® (C-KPIP)",
    title: "Project Manager | Digital Transformation | Agile | Stakeholder Management | Risk Management | Governance | Performance",
    relation: "Eman was senior to Fahad but didn’t manage Fahad directly",
    date: "June 8, 2026",
    image: "/Eman.png", 
    text: "Fahad is a proactive and collaborative professional with a strong sense of responsibility. During his internship, he consistently showed initiative, commitment, and a willingness to learn. He is a reliable team player and a valuable contributor to any team",
  },
   {
    name: "Mai Bader Almutairi",
    title: "Senior DevOps Engineer @ SCFHS",
    relation: "Mai worked with Fahad on the same team",
    date: "June 9, 2026",
    image: "/Mai.jpg", 
    text: "Fahad is a highly motivated and dependable professional who consistently demonstrates commitment, accountability, and a strong willingness to learn. He approaches challenges with a positive mindset, adapts quickly, and contributes effectively within a team environment. His professionalism and proactive attitude make him a valuable asset to any organization.",
  },
  {
    name: "Salah Alayyad",
    title: "Digital Project Specialist at SCFHS | Enterprise Architecture | Digital Transformation",
    relation: "Salah worked with Fahad on the same team",
    date: "June 8, 2026",
    image: "/Salah.jpg", 
    text: "It was great working with Fahad during his internship in the Digital Projects Department. He was always eager to learn, open to feedback, and willing to take on new challenges. Fahad brought a positive attitude to the team and was a pleasure to work with. I wish him all the best in his future career.",
  },
     {
    name: "Qutaiba Hamdoudeh PMP PfMP ITIL",
    title: "Senior Digital Transformation & PMO Professional | PMP®, PfMP®, ITIL® | Portfolio, Program & Project Management | AI & Innovation | IT Governance | Business Transformation | Saudi Commission for Health Specialties",
    relation: "Qutaiba worked with Fahad on the same team",
    date: "June 9, 2026",
    image: "/Quataibah.png", 
    text: "HI\nI highly recommend Fahad as a dedicated and reliable professional. He consistently demonstrates strong work ethic, professionalism, and a commitment to excellence. Fahad is an effective team player with excellent communication and problem-solving skills. I am confident he will be a valuable asset to any organization and wish him continued success.",
  },  
];

// ---------- مكوّن قسم عام يُعاد استخدامه ----------
function CertificatesCarousel({ items }: { items: typeof CERTIFICATES }) {
  const { tr, textDirection } = useTranslation();
  const [index, setIndex] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof CERTIFICATES)[number] | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const total = items.length;

  // معرفة حجم الشاشة
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + total) % total);
  };

  // حساب الأحجام حسب الشاشة
  const getCardSize = () => {
    if (windowWidth < 480) return { width: 260, gap: 220, height: 420, imageHeight: 170 };
    if (windowWidth < 640) return { width: 300, gap: 260, height: 480, imageHeight: 200 };
    if (windowWidth < 1024) return { width: 360, gap: 320, height: 560, imageHeight: 240 };
    return { width: 410, gap: 380, height: 620, imageHeight: 280 };
  };

  const sizes = getCardSize();

  return (
    <div className="relative flex flex-col items-center">
      {/* المسرح ثلاثي الأبعاد */}
      <div
        className="relative flex w-full items-center justify-center overflow-visible"
        style={{
          height: `${sizes.height}px`,
          perspective: windowWidth < 640 ? "1000px" : "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {items.map((c, i) => {
          let offset = i - index;

          // أقصر مسار دائري
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          // نعرض فقط الكروت القريبة
          if (Math.abs(offset) > 1) return null;

          const isCenter = offset === 0;

          return (
            <motion.div
              key={i}
              className="
                absolute
                cursor-pointer
                select-none
                overflow-hidden
                rounded-2xl
                md:rounded-3xl
                border
                border-white/10
                bg-[#0b1d15]
                shadow-2xl
              "
              style={{
                width: `${sizes.width}px`,
                transformStyle: "preserve-3d",
                transformOrigin: "center center",
                backfaceVisibility: "hidden",
              }}
              animate={{
                x: offset * sizes.gap,
                rotateY: windowWidth < 640 ? offset * -25 : offset * -32,
                rotateZ: offset * 1.2,
                z: isCenter ? 0 : windowWidth < 640 ? -60 : -100,
                scale: isCenter ? 1 : windowWidth < 640 ? 0.75 : 0.85,
                opacity: isCenter ? 1 : windowWidth < 640 ? 0.6 : 0.7,
                zIndex: isCenter ? 20 : 10,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 25,
                mass: 0.8,
              }}
              onClick={() => !isCenter && setIndex(i)}
            >
              {/* صورة الشهادة */}
              <div 
                className="group relative w-full bg-white/[0.04]"
                style={{ height: `${sizes.imageHeight}px` }}
              >
                <Image
                  src={c.image}
                  alt={tr(c.title)}
                  fill
                  draggable={false}
                  className="pointer-events-none object-contain p-3 md:p-4"
                  sizes="(max-width: 480px) 260px, (max-width: 640px) 300px, (max-width: 1024px) 360px, 410px"
                />
                
                {/* زر العين لفتح الصورة (يظهر فقط في المنتصف) */}
                {isCenter && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCertificate(c);
                    }}
                    className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                    aria-label={tr("عرض الشهادة")}
                  >
                    <span className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-white/30 bg-white/10">
                      <Eye size={windowWidth < 640 ? 18 : 24} className="text-white" />
                    </span>
                  </button>
                )}
              </div>

              {/* معلومات الشهادة */}
              <div className="border-t border-white/10 bg-gradient-to-br from-[#173a78]/40 to-[#0a1f1c] p-4 md:p-6">
                <div className="mb-2 md:mb-3 flex items-center justify-between">
                  <span className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-[#5b93e6]/40 bg-[#2454a4]/20">
                    <Award size={windowWidth < 640 ? 14 : 18} className="text-[#5b93e6]" />
                  </span>

                  {c.issuer && (
                    <span dir={textDirection} className="text-[10px] md:text-xs text-white/40">
                      {tr(c.issuer)}
                    </span>
                  )}
                </div>
                <h3
                  dir={textDirection}
                  className={`${saudiFont.className} whitespace-normal break-words text-base font-bold leading-relaxed text-white md:text-xl`}
                >
                  {tr(c.title)}
                </h3>

                <p
                  dir={textDirection}
                  className="mt-1 whitespace-normal break-words text-xs leading-relaxed text-white/50 md:mt-2 md:text-sm"
                >
                  {tr(c.subtitle)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* أسهم التنقل + المؤشرات */}
      <div className="mt-3 md:mt-6 flex items-center gap-3 md:gap-6">
        <button
          onClick={() => goTo(-1)}
          className="
            flex h-9 w-9 md:h-11 md:w-11
            cursor-pointer
            items-center justify-center
            rounded-full
            border border-white/15
            text-white/70
            transition
            hover:border-[#5b93e6]/50
            hover:text-[#5b93e6]
            active:scale-90
          "
          aria-label={tr("السابق")}
        >
          <ChevronRight size={windowWidth < 640 ? 18 : 22} />
        </button>

        {/* مؤشرات النقاط */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 md:h-2 rounded-full transition-all ${
                i === index
                  ? `w-4 md:w-6 bg-[#5b93e6] ${windowWidth >= 640 ? 'shadow-[0_0_12px_#5b93e680]' : ''}`
                  : "w-1.5 md:w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`${tr("شهادة")} ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(1)}
          className="
            flex h-9 w-9 md:h-11 md:w-11
            cursor-pointer
            items-center justify-center
            rounded-full
            border border-white/15
            text-white/70
            transition
            hover:border-[#5b93e6]/50
            hover:text-[#5b93e6]
            active:scale-90
          "
          aria-label={tr("التالي")}
        >
          <ChevronLeft size={windowWidth < 640 ? 18 : 22} />
        </button>
      </div>

      {/* عداد الشهادات - للشاشات الصغيرة */}
      <div className="mt-2 md:mt-3 text-xs text-white/30">
        {index + 1} / {total}
      </div>

      {/* ===== Popup لعرض الشهادة ===== */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-2 md:p-4 backdrop-blur-sm"
          onClick={() => setSelectedCertificate(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-[95%] md:w-full max-w-4xl overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-[#0b1d15]"
          >
            {/* زر الإغلاق */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute left-2 top-2 md:left-4 md:top-4 z-10 flex h-8 w-8 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-all hover:scale-110 hover:bg-[#d00000]"
              aria-label={tr("إغلاق")}
            >
              <X size={windowWidth < 640 ? 16 : 20} />
            </button>

            {/* الصورة بالحجم الكامل */}
            <div className="relative flex h-[60vh] md:h-[80vh] w-full items-center justify-center bg-white/[0.03] p-4 md:p-10">
              <Image
                src={selectedCertificate.image}
                alt={tr(selectedCertificate.title)}
                fill
                draggable={false}
                className="object-contain"
                sizes="(max-width: 640px) 95vw, 1024px"
              />
            </div>

            {/* معلومات سريعة تحت الصورة للشاشات الصغيرة */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p dir={textDirection} className="text-center text-xs text-white/60">
                {tr(selectedCertificate.title)}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ============ 2. المكوّن (Component) ============
function RecommendationsSection({
  items,
  }: {
    items: typeof RECOMMENDATIONS;
  }) {
  const { language } = useTranslation();

  const arabicRecommendations: Record<
    string,
    {
      title: string;
      relation: string;
      date: string;
      text: string;
    }
  > = {
    "/Raed.png": {
      title:
        "معماري مؤسسي | حوكمة تقنية المعلومات | التحول الرقمي | تمكين التقنيات الناشئة",
      relation: "كان رائد مديرًا مباشرًا لفهد",
      date: "9 يونيو 2026",
      text:
        "سعدت بالعمل مع فهد ضمن فريق المشاريع الرقمية لدينا. وقد تميز بحرصه على التعلم، وأخلاقيات عمله الراسخة، وحسن خلقه. أضاف فهد قيمة حقيقية للفريق، وأوصيت بشدة بانضمامه إلى فريق العمل.",
    },

    "/Fahadalq.jpg": {
      title:
        "تمكين الأعمال | الابتكار | تمكين الفرق | قيادة التحول الرقمي",
      relation:
        "كان فهد القنيعير أعلى من فهد في المستوى الوظيفي، لكنه لم يكن مديره المباشر",
      date: "9 يونيو 2026",
      text:
        "فهد مهني شاب ملتزم وطموح، أظهر باستمرار حسًا بالمسؤولية واحترافية ورغبة قوية في التعلم طوال فترة تدريبه. يمتلك إمكانات كبيرة، وينتظره مستقبل مشرق.",
    },

    "/Eman.png": {
      title:
        "مديرة مشاريع | التحول الرقمي | المنهجيات الرشيقة | إدارة أصحاب المصلحة | إدارة المخاطر | الحوكمة | الأداء",
      relation:
        "كانت إيمان أعلى من فهد في المستوى الوظيفي، لكنها لم تكن مديرته المباشرة",
      date: "8 يونيو 2026",
      text:
        "فهد مهني مبادر ومتعاون، يتمتع بحس عالٍ بالمسؤولية. خلال فترة تدريبه، أظهر باستمرار روح المبادرة والالتزام والاستعداد للتعلم. وهو عضو في الفريق يمكن الاعتماد عليه، ويقدم إسهامًا قيّمًا لأي فريق.",
    },

    "/Mai.jpg": {
      title:
        "مهندسة أولى للتطوير والعمليات (DevOps) لدى الهيئة السعودية للتخصصات الصحية",
      relation: "عملت مي مع فهد ضمن الفريق نفسه",
      date: "9 يونيو 2026",
      text:
        "فهد مهني يتمتع بدافعية عالية ويمكن الاعتماد عليه، ويُظهر باستمرار الالتزام وتحمل المسؤولية والرغبة القوية في التعلم. يتعامل مع التحديات بعقلية إيجابية، ويتكيف بسرعة، ويسهم بفاعلية ضمن بيئة العمل الجماعي. إن احترافيته وروح المبادرة لديه تجعلانه إضافة قيّمة لأي منظمة.",
    },

    "/Salah.jpg": {
      title:
        "أخصائي مشاريع رقمية لدى الهيئة السعودية للتخصصات الصحية | البنية المؤسسية | التحول الرقمي",
      relation: "عمل صلاح مع فهد ضمن الفريق نفسه",
      date: "8 يونيو 2026",
      text:
        "كان العمل مع فهد خلال فترة تدريبه في إدارة المشاريع الرقمية تجربة رائعة. كان دائمًا حريصًا على التعلم، ومتقبلًا للملاحظات، ومستعدًا لخوض تحديات جديدة. أضفى فهد روحًا إيجابية على الفريق، وكان العمل معه ممتعًا. أتمنى له كل التوفيق في مسيرته المهنية المستقبلية.",
    },

    "/Quataibah.png": {
      title:
        "مهني أول في التحول الرقمي ومكتب إدارة المشاريع (PMO) | PMP®، PfMP®، ITIL® | إدارة المحافظ والبرامج والمشاريع | الذكاء الاصطناعي والابتكار | حوكمة تقنية المعلومات | تحول الأعمال | الهيئة السعودية للتخصصات الصحية",
      relation: "عمل قتيبة مع فهد ضمن الفريق نفسه",
      date: "9 يونيو 2026",
      text:
        "مرحبًا\nأوصي بشدة بفهد بوصفه مهنيًا متفانيًا ويمكن الاعتماد عليه. فهو يُظهر باستمرار أخلاقيات عمل راسخة واحترافية والتزامًا بالتميز. فهد عضو فعّال في الفريق، ويتمتع بمهارات ممتازة في التواصل وحل المشكلات. وأنا واثق بأنه سيكون إضافة قيّمة لأي منظمة، وأتمنى له دوام النجاح.",
    },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((rec, i) => {
        // الإنجليزية: استخدام البيانات الأصلية دون تغيير.
        // العربية: استبدال الحقول المترجمة فقط.
          const profile = recommendationProfiles[rec.image];
          const arabic = arabicRecommendations[rec.image];

          const content = {
            ...rec,

            ...(language === "ar" ? arabic : {}),

            name:
              language === "ar"
                ? profile?.nameAr ?? rec.name
                : rec.name,

            title:
              language === "ar"
                ? profile?.titleAr ?? arabic?.title ?? rec.title
                : profile?.titleEn ?? rec.title,
          };
        const direction = language === "ar" ? "rtl" : "ltr";

        return (
          <motion.div
            key={rec.image}
            dir={direction}
            lang={language}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition duration-300 hover:border-[#5b93e6]/30 hover:bg-white/[0.05] md:p-8"
          >
            {/* علامة الاقتباس */}
            <div className="pointer-events-none absolute end-4 top-3 select-none text-5xl font-black leading-none text-[#5b93e6]/15">
              &ldquo;
            </div>

            {/* الصورة والاسم والمسمى المهني */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#5b93e6]/30 bg-[#2454a4]/20">
                <Image
                  src={rec.image}
                  alt={content.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  className={`${saudiFont.className} whitespace-normal break-words text-start text-lg font-bold text-white`}
                >
                  <bdi dir="auto">{content.name}</bdi>
                </h3>

                <p className="mt-1 whitespace-normal break-words text-start text-xs leading-relaxed text-white/50">
                  {content.title}
                </p>
              </div>
            </div>

            {/* العلاقة المهنية والتاريخ */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-white/40">
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-start">
                {content.relation}
              </span>

              <span className="text-start">
                {content.date}
              </span>
            </div>

            {/* نص التزكية */}
            <div className="relative z-10">
              {content.text.split("\n").map((line, idx) => (
                <p
                  key={idx}
                  className="mb-3 text-start text-sm leading-relaxed text-white/70"
                >
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

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
  const { textDirection } = useTranslation();
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 text-center">
        <p dir={textDirection} className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-[#5b93e6]">
          <Icon size={16} />
          {subtitle}
        </p>
        <h2 dir={textDirection} className={`${saudiFont.className} text-4xl font-black md:text-5xl`}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
const recommendationProfiles: Record<
  string,
  {
    nameAr: string;
    titleAr: string;
    titleEn: string;
  }
> = {
  "/Raed.png": {
    nameAr: "رائد الهجله",
    titleAr: "مدير عام البنية المؤسسية",
    titleEn: "General Manager of Enterprise Architecture",
  },

  "/Fahadalq.jpg": {
    nameAr: "فهد القنيعير",
    titleAr: "مدير عام حلول الأعمال والابتكار الرقمي",
    titleEn: "General Manager of Business Solutions and Digital Innovation",
  },

  "/Eman.png": {
    nameAr: "ايمان اليابسي",
    titleAr: "مديرة مشاريع",
    titleEn: "Project Manager",
  },

  "/Mai.jpg": {
    nameAr: "مي المطيري",
    titleAr: "مهندسة أولى للتطوير والعمليات",
    titleEn: "Senior DevOps Engineer",
  },

  "/Salah.jpg": {
    nameAr: "صلاح ال عياض",
    titleAr: "أخصائي مشاريع رقمية",
    titleEn: "Digital Project Specialist",
  },

  "/Quataibah.png": {
    nameAr: "قتيبة حمودة",
    titleAr: "مدير مشاريع رقمية",
    titleEn: "Digital Project Manager",
  },
};

// ---------- المكوّن الرئيسي ----------

export default function Home() {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem("portfolio-language");
      if (savedLanguage === "ar" || savedLanguage === "en") setLanguage(savedLanguage);
    } catch {
      // Language switching still works when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const nextLanguage = language === "ar" ? "en" : "ar";
    setLanguage(nextLanguage);
    try { localStorage.setItem("portfolio-language", nextLanguage); } catch {}
  };

  return (
    <LanguageContext.Provider value={language}>
      <PortfolioPage onToggleLanguage={toggleLanguage} />
    </LanguageContext.Provider>
  );
}

function PortfolioPage({ onToggleLanguage }: { onToggleLanguage: () => void }) {
  const { language, tr, textDirection } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
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
      lang={language}
      data-portfolio-language={language}
      className={`${ibmPlexArabic.className} relative min-h-screen w-full overflow-x-hidden bg-[#0a1f1c] text-slate-100 selection:bg-[#3f7d52]/40`}
    >
      {/* English font support; original Arabic fonts and structural layout stay intact. */}
      <style jsx global>{`
        [data-portfolio-language="en"],
        [data-portfolio-language="en"] :where(h1, h2, h3, h4, p, span, a, button, li) {
          font-family: Arial, Helvetica, sans-serif;
        }
        [data-portfolio-language="en"] :where(h1, h2, h3, h4, p, a, li) {
          overflow-wrap: anywhere;
        }
      `}</style>
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
            <div className="pointer-events-none fixed inset-y-0 right-0 z-40 hidden w-10 opacity-70 lg:block">
        <Image src="/side-line2.png" alt="" fill className="object-cover object-top" />
      </div>

      {/* ===== Navbar ===== */}
<header
  className={`fixed top-0 z-50 w-full transition-all duration-500 ${
    scrolled
      ? "border-transparent bg-transparent backdrop-blur-0"
      : "border-b border-white/5 bg-[#0a1f1c]/85 backdrop-blur-xl"
  }`}
>
  <nav
    className={`mx-auto flex h-16 max-w-6xl items-center justify-between px-6 transition-opacity duration-500 ${
      scrolled && !menuOpen ? "opacity-40" : "opacity-100"
    }`}
  >
    {/* الشعار والاسم */}
    <a href="#hero" className="flex items-center gap-4">
      <Image
        src="/brand-emblem.png"
        alt={tr("فهد الفهيد")}
        width={80}
        height={70}
        className="rounded-lg"
      />

      <span
        dir={textDirection}
        className={`${saudiFont.className} text-xl font-black tracking-wide`}
      >
        <span className="text-[#e8cf9f]">
          {tr("فهد")}
        </span>{" "}
        <span className="bg-gradient-to-l from-[#d1af6f] to-[#7fb069] bg-clip-text text-transparent">
          {tr("الفهيد")}
        </span>
      </span>
    </a>

    {/* روابط الكمبيوتر */}
    <ul className="hidden items-center gap-4 xl:flex">
      {NAV.map((n, idx) => (
        <li key={n.id} className="flex items-center gap-4">
          {idx !== 0 && (
            <span className="text-[#7fb069]" aria-hidden="true">
              ◆
            </span>
          )}

          <a
            dir={textDirection}
            href={`#${n.id}`}
            onClick={() => setActive(n.id)}
            className={`text-sm transition-colors ${
              active === n.id
                ? "font-semibold text-[#f0d9a8]"
                : "text-[#d1af6f]/80 hover:text-[#f0d9a8]"
            }`}
          >
            {tr(n.label)}
          </a>
        </li>
      ))}
    </ul>

    <a
      dir={textDirection}
      href="#contact"
      className="hidden rounded-full border border-[#d1af6f]/40 bg-[#d1af6f]/10 px-5 py-2 text-sm font-bold text-[#f0d9a8] transition hover:bg-[#d1af6f]/20 xl:block"
    >
      {tr("تواصل معي")}
    </a>

    {/* ترجمة الكمبيوتر */}
    <button
      type="button"
      onClick={() => {
        onToggleLanguage();
        setMenuOpen(false);
      }}
      aria-label={
        language === "ar"
          ? "Switch to English"
          : "التبديل إلى العربية"
      }
      className="hidden shrink-0 items-center justify-center rounded-lg border border-[#d1af6f]/40 bg-[#d1af6f]/10 px-3 py-2 text-sm font-semibold text-[#f0d9a8] transition hover:bg-[#d1af6f]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1af6f] xl:inline-flex cursor-pointer"
    >
      <span
        lang={language === "ar" ? "en" : "ar"}
        dir={language === "ar" ? "ltr" : "rtl"}
      >
        {language === "ar" ? "English" : "العربية"}
      </span>
    </button>

    {/* زر قائمة الجوال */}
    <button
      type="button"
      onClick={() => setMenuOpen((open) => !open)}
      className="rounded-lg p-2 text-[#d1af6f] hover:bg-white/5 xl:hidden "
      aria-label={tr("القائمة")}
      aria-expanded={menuOpen}
      aria-controls="mobile-navigation"
    >
      {menuOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  </nav>

  {/* قائمة الجوال */}
  {menuOpen && (
    <div
      id="mobile-navigation"
      dir={textDirection}
      className="border-t border-white/5 bg-[#0b1d15] px-6 py-4 text-start xl:hidden"
    >
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          onClick={() => {
            setActive(n.id);
            setMenuOpen(false);
          }}
          className="block rounded-lg px-3 py-2.5 text-start text-sm text-[#d1af6f] hover:bg-white/5 hover:text-[#f0d9a8]"
        >
          {tr(n.label)}
        </a>
      ))}

      {/* يتبع مكان الزر اتجاه لغة القائمة */}
      <div className="mt-3 flex justify-start px-3">
        <button
          type="button"
          onClick={() => {
            onToggleLanguage();
            setMenuOpen(false);
          }}
          aria-label={
            language === "ar"
              ? "Switch to English"
              : "التبديل إلى العربية"
          }
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-[#d1af6f]/40 bg-[#d1af6f]/10 px-3 py-2 text-sm font-semibold text-[#f0d9a8] transition hover:bg-[#d1af6f]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d1af6f]"
        >
          <span
            lang={language === "ar" ? "en" : "ar"}
            dir={language === "ar" ? "ltr" : "rtl"}
          >
            {language === "ar" ? "English" : "العربية"}
          </span>
        </button>
      </div>
    </div>
  )}
</header>

      <main className="relative">
        {/* ===== Hero ===== */}
        <section id="hero" dir={textDirection} className="relative flex min-h-screen items-center pt-16 overflow-hidden" >
      <div
  className="hidden lg:block"
  style={{transform: language === "en" ? "scaleX(-1)" : "none", }}> 
  </div>
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
      <motion.p dir={textDirection} 
        className={`mb-4 flex items-center gap-2 text-sm font-medium text-[#5b93e6] ${language === "en" ? "flex-wrap" : ""}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Sparkles size={16} />
        {tr("أهلاً بك في معرض أعمالي")}{" "}<span dir={textDirection} className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#ff0000] opacity-90" />
            <span className="relative h-2 w-2 rounded-full bg-[#d00000]" />
          </span>
          {tr("الموقع تحت التحسين")}{" "}</span>
      </motion.p>
              
        <motion.h1
          dir={textDirection}
          className={`${saudiFont.className} flex flex-wrap items-baseline gap-3 font-black leading-[1.15] ${
            language === "en"
              ? "text-3xl md:text-5xl"
              : "text-5xl md:text-7xl"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="text-white">{tr("فهد")}</span>

          <span className="bg-gradient-to-l from-[#5b93e6] via-[#3f7d52] to-[#2454a4] bg-clip-text text-transparent">
            {tr("الفهيد")}
          </span>
        </motion.h1>
      
      <motion.p dir={textDirection} 
        className="mt-6 max-w-xl text-lg leading-relaxed text-white/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {tr("مهندس برمجيات ومحلل بيانات، حاصل على شهادة")}{" "}
        <span dir={textDirection} className="font-semibold text-[#ffffff]">CAPM®</span>{" "}
         {tr("أبني تطبيقات ويب حديثة وأصمم لوحات معلومات")}{" "}
        <span dir={textDirection} className="font-semibold text-[#ffffff]">Power BI</span>{" "}
        {tr("تحوّل البيانات إلى قرارات.")}{" "}</motion.p>

      <motion.div 
        className="mt-9 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <a dir={textDirection}
          href="#projects"
          className="rounded-full bg-[#2454a4] px-7 py-3 font-bold text-white shadow-lg shadow-[#2454a4]/30 transition hover:bg-[#3066c2]"
        >
          {tr("استعرض مشاريعي")}{" "}</a>
        <a dir={textDirection}
          href="/Fahad_AlFehaid_CV_Aug.pdf"
          download="Fahad-Alfehaid-CV.pdf"
          className="flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 font-semibold text-white/85 transition hover:border-[#5b93e6]/50 hover:text-[#5b93e6]"
        >
          <Download size={18} />
          {tr("تحميل السيرة الذاتية")}{" "}</a>
      </motion.div>

      <motion.div 
        className="mt-10 flex items-center gap-4 text-sm text-white/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
             {tr("عزنا بطموحنا")}{" "}<span className="h-1 w-1 rounded-full bg-white/30" />
        <span dir={textDirection} className="flex items-center gap-1.5">
   
        <MapPin size={15} className="text-[#ffffff]" />
          {tr("الرياض، السعودية")}{" "}</span>

        <span className="h-1 w-1 rounded-full bg-white/30" />
        <span dir={textDirection} className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#ffffff] opacity-70" />
            <span className="relative h-2 w-2 rounded-full bg-[#28c958]" />
          </span>
          {tr("متاح للعمل")}{" "}</span>
      </motion.div>
      <motion.div
        className="absolute bottom-0 flex w-full flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
  

        <div className="relative">
          {/* توهج خلف النص */}
          <div className="absolute inset-0 -z-10 scale-150 rounded-full bg-[#5b93e6]/20 blur-2xl" />
          <p dir={textDirection} className="text-lg font-semibold tracking-widest text-white/90">
          
          </p>
        </div>
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
  <Image src="/dallah_for_a_cup3.png" alt={tr("الدلة")} width={280} height={360} priority />
  {/* خط القهوة */}
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
        alt={tr("فنجال القهوة")}
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
  </div>
</motion.div>
  </div>
</section>

        {/* ===== Stats ===== */}
          <section
            dir={textDirection}
            className="border-y border-white/5 bg-[#0b1d15]/60"
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-3">
              {STATS.map((s, i) => (
                <div key={i} className="min-w-0 text-center">
                  <p
                    dir="ltr"
                    style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                    className="text-2xl font-bold leading-tight md:text-3xl"
                  >
                    <span
                      style={{ fontFamily: "inherit" }}
                      className="bg-gradient-to-l from-[#5b93e6] to-[#3f7d52] bg-clip-text text-transparent"
                    >
                      {s.value === "CAPM®"
                        ? "CAPM"
                        : s.value === "1Year"
                          ? "1 Year"
                          : s.value}
                    </span>

                    {s.value === "CAPM®" && (
                      <sup
                        style={{ fontFamily: "inherit" }}
                        className="ms-0.5 text-[11px] leading-none text-[#5b93e6] md:text-[12px]"
                      >
                        ®
                      </sup>
                    )}
                  </p>
                  <p className="mx-auto mt-2 max-w-[240px] text-xs leading-relaxed text-white/55 md:text-sm">
                    {tr(s.label)}
                  </p>
                </div>
              ))}
            </div>
          </section>

{/* ===== About ===== */}
<Section id="about" icon={User} title={tr("نبذة عني")} subtitle={tr("من أنا وماذا أقدم")}>
  <div className="flex w-full min-w-0 flex-col items-center gap-8 overflow-hidden lg:flex-row lg:items-start lg:gap-12">

    {/* الصورة الشخصية */}
    <motion.div
      className="relative aspect-square w-52 shrink-0 overflow-hidden rounded-3xl lg:w-64"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 150, damping: 15 }}
    >
      {/* خلفية متوهجة */}
      <motion.div
        className="pointer-events-none absolute -inset-8 -z-10 overflow-hidden rounded-full bg-gradient-to-br from-[#5b93e6]/20 to-[#3f7d52]/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.8, scale: 2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      {/* خلفية Sword */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Sword.png"
          alt=""
          fill
          className="object-cover opacity-40"
        />
      </div>

      {/* الصورة الشخصية مع حركة بسيطة */}
      <motion.div
        className="absolute inset-0 z-10"
        animate={{ y: [-5, -12, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/profile.png"
          alt={tr("فهد الفهيد")}
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>

    {/* النص */}
    <div className="min-w-0 flex-1">
      <motion.p dir={textDirection}
        className="text-base leading-relaxed text-white/70 md:text-lg md:leading-loose"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {tr("مهندس برمجيات سعودي، خريج بكالوريوس هندسة برمجيات بتقدير ممتاز مع مرتبة الشرف الثانية وايضا حاصل على شهادة الدبلوم في تقنية شبكات الحاسب بتقدير ممتاز مع مرتبة الشرف الأولى. أجمع بين التطوير البرمجي وتحليل البيانات وايضا تطوير الأعمال لتقديم حلول تقنية ذات أثر حقيقي من بناء التطبيقات إلى تصميم لوحات المعلومات التنفيذية.")}{" "}<br />
        <br />
        {tr("حاصل على شهادة CAPM® المعتمدة من PMI، وأمتلك خبرة تدريبية في إدارة المشاريع التقنية وإدارة حوكمة التكنولوجيا.")}{" "}</motion.p>
    </div>
  </div>

{/* بطاقات المهارات */}
<motion.div
  dir={textDirection}
  className="mt-12 grid grid-cols-2 gap-4 text-start md:grid-cols-4"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, delay: 0.5 }}
>
  {SKILL_CATEGORIES.map((c, index) => (
    <motion.div
      key={c.title}
      className="group min-w-0 rounded-xl border border-white/8 bg-white/[0.03] p-5 text-start transition hover:border-[#5b93e6]/30 hover:bg-white/[0.05]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.1 + 0.5,
      }}
    >
      <span
        className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${c.accent} text-white`}
      >
        <c.icon size={20} />
      </span>

      <h3 className="font-bold text-white/90">
        {tr(c.title)}
      </h3>

      <p className="mt-1 text-xs text-white/45">
        {c.skills.length} {tr("مهارات")}
      </p>
    </motion.div>
  ))}
</motion.div>
</Section>

        {/* ===== Experience ===== */}
<Section
  id="experience"
  icon={Briefcase}
  title={tr("الخبرة والتعليم")}
  subtitle={tr("مسيرتي المهنية والأكاديمية")}
>
  <motion.div
    dir={textDirection}
    className="relative space-y-8 ps-8 before:absolute before:start-[7px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-[#5b93e6] before:via-[#3f7d52] before:to-transparent"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.9 },
      },
    }}
  >
    {EXPERIENCE.map((e, i) => (
      <motion.div
        key={i}
        className="relative"
        variants={{
          hidden: {
            opacity: 0,
            x: language === "ar" ? 30 : -30,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
          },
        }}
      >
        {/* دائرة الخط الزمني */}
        <span className="absolute -start-8 top-1.5 h-4 w-4 rounded-full border-2 border-[#5b93e6] bg-[#0a1f1c]" />

        {/* بطاقة الخبرة */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#5b93e6]/25 hover:bg-white/[0.05]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-white">
                {tr(e.role)}
              </h3>

              <p className="mt-1 flex items-center gap-2 text-sm text-white/50">
                {e.role.includes("بكالوريوس") ||
                e.role.includes("دبلوم") ? (
                  <GraduationCap
                    size={15}
                    className="shrink-0 text-[#5b93e6]"
                  />
                ) : (
                  <Briefcase
                    size={15}
                    className="shrink-0 text-[#3f7d52]"
                  />
                )}

                {tr(e.org)}
              </p>
            </div>

            {/* الفترة */}
            <span
              className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                e.current
                  ? "bg-[#2454a4]/20 text-[#5b93e6] ring-1 ring-[#2454a4]/40"
                  : "bg-white/5 text-white/50"
              }`}
            >
              {tr(e.period)}
            </span>
          </div>

          {/* المهام والإنجازات */}
          <ul className="mt-4 space-y-2">
            {e.points.map((p, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-sm leading-relaxed text-white/65"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#3f7d52]" />

                <span className="min-w-0">
                  {tr(p)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    ))}
  </motion.div>
</Section>
        {/* ===== Projects ===== */}
        <Section id="projects" icon={FolderGit2} title={tr("أبرز المشاريع")} subtitle={tr("أعمال أفتخر بها")}>
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
                      alt={tr(p.title)}
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
                <div dir={textDirection} className="p-6 text-start">
                  <h3 className="text-lg font-bold">
                    {tr(p.title)}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {tr(p.description)}
                  </p>

                  <div dir={textDirection} className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        dir="ltr"
                        className="rounded-md border border-[#3f7d52]/20 bg-[#3f7d52]/5 px-2.5 py-1 text-xs text-[#8fc79f]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ===== Skills ===== */}
<Section
  id="skills"
  icon={Wrench}
  title={tr("المهارات التقنية")}
  subtitle={tr("الأدوات التي أتقنها")}
>
  <div
    dir={textDirection}
    className="grid gap-6 text-start md:grid-cols-2"
  >
    {SKILL_CATEGORIES.map((c) => (
      <div
        key={c.title}
        className="min-w-0 rounded-2xl border border-white/8 bg-white/[0.03] p-7"
      >
        <div className="mb-5 flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent} text-white`}
          >
            <c.icon size={22} />
          </span>

          <h3 className="text-lg font-bold">
            {tr(c.title)}
          </h3>
        </div>

        <div className="flex flex-wrap justify-start gap-2.5">
          {c.skills.map((s) => (
            <span
              key={s}
              dir="auto"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/75 transition hover:border-[#5b93e6]/40 hover:text-[#5b93e6]"
            >
              {tr(s)}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</Section>

        {/* ===== Certificates ===== */}
        <Section id="certificates" icon={Award} title={tr("الشهادات")} subtitle={tr("إنجازات موثقة")}>
          <CertificatesCarousel items={CERTIFICATES} />
        </Section>

        {/* ===== recommendations ===== */}
        <Section id="recommendations" icon={MessageSquare} title={tr("شهادات التزكية المهنية")} subtitle={tr("ماذا قال مدرائي وزملائي عني")}>
          <RecommendationsSection items={RECOMMENDATIONS} />
        </Section>
        {/* ===== Contact ===== */}
        <section
          id="contact"
          dir={textDirection}
          className="mx-auto max-w-6xl px-6 py-24"
        >
          {/* عنوان القسم */}
          <div className="mb-12 text-center">
            <p className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-[#5b93e6]">
              <MessageSquare size={16} />
              {tr("تواصل معي")}
            </p>

            <h2
              className={`${saudiFont.className} font-bold leading-tight ${
                language === "en"
                  ? "text-2xl md:text-3xl"
                  : "text-3xl md:text-4xl"
              }`}
            >
              {tr("لنصنع شيئاً رائعاً")}
            </h2>
          </div>

          {/* كرت التواصل */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-l from-[#173a78]/40 to-[#0b1d15]">
            <div className="grid items-start gap-8 p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)]">
              {/* العنوان والفقرة والأزرار */}
              <div className="min-w-0 text-start">
                <h3
                  className={`${saudiFont.className} font-bold leading-relaxed ${
                    language === "en"
                      ? "text-lg md:text-xl"
                      : "text-xl md:text-2xl"
                  }`}
                >
                  {tr("عندك فكرة مشروع؟")}{" "}
                  <span className="bg-gradient-to-l from-[#5b93e6] to-[#3f7d52] bg-clip-text text-transparent">
                    {tr("خلينا نحولها لواقع")}
                  </span>
                </h3>

                <p className="me-auto mt-4 max-w-lg text-start text-sm leading-relaxed text-white/60">
                  {tr(
                    "متاح للعمل الحر والفرص الوظيفية. راسلني على البريد أو تواصل معي مباشرة وسأرد عليك في أقرب وقت."
                  )}
                </p>

                <div className="mt-6 flex flex-wrap justify-start gap-3">
                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-[#5b93e6]/50 hover:text-[#5b93e6]"
                  >
                    <LinkedinIcon />
                    <span dir="ltr">LinkedIn</span>
                  </a>

                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-white/40 hover:text-white"
                  >
                    <GithubIcon />
                    <span dir="ltr">GitHub</span>
                  </a>
                </div>
              </div>

              {/* بيانات التواصل */}
              <div className="flex min-w-0 flex-col gap-3 text-start">
                <a
                  href={`mailto:${LINKS.email}`}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-[#5b93e6]/40"
                >
                  <Mail size={20} className="shrink-0 text-[#5b93e6]" />

                  <div className="min-w-0">
                    <p className="text-xs text-white/45">
                      {tr("البريد الإلكتروني")}
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold">
                      <bdi dir="ltr">{LINKS.email}</bdi>
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${LINKS.phone}`}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-[#5b93e6]/40"
                >
                  <Phone size={20} className="shrink-0 text-[#5b93e6]" />

                  <div className="min-w-0">
                    <p className="text-xs text-white/45">
                      {tr("الجوال")}
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      <bdi dir="ltr">{LINKS.phoneDisplay}</bdi>
                    </p>
                  </div>
                </a>

                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
                  <MapPin size={20} className="shrink-0 text-[#5b93e6]" />

                  <div className="min-w-0">
                    <p className="text-xs text-white/45">
                      {tr("الموقع")}
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {tr("الرياض، السعودية")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                  alt={tr(selectedProject.title)}
                  fill
                  className="object-cover"
                />
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute left-4 top-4 flex h-10 w-10 items-center cursor-pointer justify-center rounded-full bg-black/50 text-white backdrop-blur transition-all hover:scale-110 hover:bg-[#d00000] hover:text-white"
                aria-label={tr("إغلاق")}
              >
                <X size={20} />
              </button>
              <span className="absolute bottom-4 right-6 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                {selectedProject.year}
              </span>
            </div>

            {/* المحتوى */}
            <div dir={textDirection} className="p-6 text-start md:p-8">
              <h3 dir={textDirection} className={`${saudiFont.className} text-2xl font-black md:text-3xl`}>
                {tr(selectedProject.title)}
              </h3>

              <p dir={textDirection} className="mt-4 leading-relaxed text-white/70">
                {tr(selectedProject.details.overview)}
              </p>

              <div className="mt-6">
                <h4 dir={textDirection} className="mb-2 text-sm font-bold text-[#5b93e6]">{tr("دوري في المشروع")}</h4>
                <p dir={textDirection} className="text-sm leading-relaxed text-white/65">{tr(selectedProject.details.role)}</p>
              </div>

              <div className="mt-6">
                <h4 dir={textDirection} className="mb-3 text-sm font-bold text-[#5b93e6]">{tr("أبرز الإنجازات")}</h4>
                <ul className="space-y-2">
                  {selectedProject.details.highlights.map((h, idx) => (
                    <li dir={textDirection} key={idx} className="flex items-start gap-2 text-sm leading-relaxed text-white/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#3f7d52]" />
                      {tr(h)}
                    </li>
                  ))}
                </ul>
              </div>

                <div
                  dir={textDirection}
                  className="mt-6 flex flex-wrap gap-2"
                >
                  {selectedProject.details.tools.map((tool) => (
                    <span
                      key={tool}
                      dir="ltr"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/75"
                    >
                      {tool}
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
          <p dir={textDirection}>{tr("© 2026 فهد الفهيد — جميع الحقوق محفوظة")}</p>
          <p dir={textDirection} className="flex items-center gap-2">
            {tr("صُنع بشغف في")}{" "}<span dir={textDirection} className="font-semibold text-[#5b93e6]">{tr("السعودية")}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
