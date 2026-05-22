import { Prisma, PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});

// const tagData: Prisma.TagCreateInput[] = [
//   {
//     name: "HTML",
//     slug: "html",
//   },
//   {
//     name: "CSS",
//     slug: "css",
//   },
//   {
//     name: "JavaScript",
//     slug: "javascript",
//   },
//   {
//     name: "TypeScript",
//     slug: "typescript",
//   },
//   {
//     name: "Dart",
//     slug: "dart",
//   },
//   {
//     name: "Python",
//     slug: "python",
//   },
//   {
//     name: "Node.js",
//     slug: "node-js",
//   },
//   {
//     name: "Express.Js",
//     slug: "express-js",
//   },
//   {
//     name: "Nest.js",
//     slug: "nest-js",
//   },
//   {
//     name: "Next.js",
//     slug: "next-js",
//   },
//   {
//     name: "React.Js",
//     slug: "react-js",
//   },
//   {
//     name: "Flutter",
//     slug: "flutter",
//   },
//   {
//     name: "PostgreSQL",
//     slug: "postgresql",
//   },
//   {
//     name: "MySQL",
//     slug: "mysql",
//   },
//   {
//     name: "MongoDB",
//     slug: "mongodb",
//   },
//   {
//     name: "Prisma",
//     slug: "prisma",
//   },
//   {
//     name: "GraphQL",
//     slug: "graphql",
//   },
// ];

const projectData: Prisma.ProjectCreateInput[] = [
  {
    title: "ToDO",
    titleEn: "ToDO",
    description:
      "تطبيق لإدارة المهام اليومية يساعد المستخدمين على تنظيم أعمالهم وتتبع المهام بسهولة من خلال واجهة بسيطة وعملية. يتيح التطبيق إنشاء المهام، تحديد المواعيد والأولويات، مع نظام إشعارات ذكي يرسل تنبيهات قبل موعد المهمة بوقت محدد لضمان عدم تفويت أي نشاط مهم.",
    descriptionEn:
      "A task management application designed to help users organize their daily activities and track tasks through a simple and intuitive interface. The app allows users to create tasks, set schedules and priorities, and receive smart reminder notifications before task deadlines to ensure nothing important is missed.",
    githubUrl: "https://github.com/mohyaldeentellawi1/Todo",
    techType: "MOBILE",
    projectTypes: ["PRODUCTIVITY", "UTILITY"],
  },
  {
    title: "LAZA UI",
    titleEn: "LAZA UI",
    description:
      "تطبيق متجر أزياء إلكتروني بتصميم عصري وأنيق يتيح للمستخدمين استعراض وشراء الملابس بسهولة عبر تجربة استخدام سلسة وحديثة. يتضمن التطبيق تصنيفات متنوعة للمنتجات، صفحات تفصيلية للملابس، سلة مشتريات، وإدارة للطلبات، مع التركيز على تقديم تجربة تسوق مريحة وجذابة بصريًا.",
    descriptionEn:
      "A modern fashion e-commerce application with an elegant and stylish design, allowing users to browse and purchase clothing through a smooth and intuitive shopping experience. The app includes categorized products, detailed fashion item pages, a shopping cart, and order management features, all focused on delivering a visually appealing and seamless user experience.",
    githubUrl: "https://github.com/MohyaldeenTellawi/E_commerce_App",
    techType: "MOBILE",
    projectTypes: ["ECOMMERCE"],
  },
  {
    title: "Video Downloader UI",
    titleEn: "Video Downloader UI",
    description:
      "تطبيق بواجهات بسيطة وعصرية مستوحاة من تجربة YouTube، يتيح للمستخدمين استعراض الفيديوهات وتحميلها بسهولة عبر واجهة استخدام سريعة وسلسة. يتضمن التطبيق شاشة مخصصة لإدارة التحميلات وعرض حالة التنزيل والتقدم بشكل مباشر مع تصميم يركز على البساطة وتجربة المستخدم.",
    descriptionEn:
      "A modern and minimal video downloader application inspired by YouTube-like interfaces, allowing users to browse and download videos through a fast and intuitive user experience. The app includes a dedicated downloads screen for managing files and tracking download progress in real time, with a strong focus on simplicity and usability.",
    githubUrl: "https://github.com/MohyaldeenTellawi/youtube_downloader",
    techType: "MOBILE",
    projectTypes: ["MEDIA", "UTILITY"],
  },
  {
    title: "راديو حلمنا",
    titleEn: "Radio Helmna",
    description:
      "تطبيق إذاعي ومجتمعي متكامل يتيح للمستخدمين الاستماع إلى البث المباشر للراديو ومتابعة البرامج الصوتية المنظمة ضمن حلقات متعددة. يتضمن التطبيق مجتمعًا تفاعليًا يتيح نشر المنشورات والتفاعل عبر التعليقات، بالإضافة إلى قسم مخصص للأخبار وآخر المستجدات ضمن تجربة استخدام حديثة وسلسة.",
    descriptionEn:
      "An integrated radio and community platform that allows users to listen to live radio broadcasts and explore audio programs organized into multiple episodes. The app also features an interactive social community with posts and comments, alongside a dedicated news section for the latest updates, all delivered through a modern and seamless user experience.",
    liveUrl: "",
    techType: "MOBILE",
    projectTypes: ["MEDIA", "STREAMING", "COMMUNITY"],
  },
  {
    title: "BLAST",
    titleEn: "BLAST",
    description:
      "منهجية وأداة عمل تم تطويرها لتكون إطارًا واضحًا يساعد على إدارة وبناء المشاريع الرقمية بشكل منظم وقابل للتوسع. تعتمد BLAST على خمس مراحل أساسية تبدأ ببناء المنتج، ثم إطلاقه، وتسريع نموه، وتوسيع نطاقه، وصولًا إلى التحول والتطوير المستمر. تم تصميمها لتكون مرجعًا عمليًا يمكن تطبيقه على مختلف أنواع المشاريع التقنية والشركات الناشئة.",
    descriptionEn:
      "A workflow framework and methodology designed to provide a structured and scalable approach for building and managing digital products. BLAST is based on five core stages: Build, Launch, Accelerate, Scale, and Transform. It was created as a practical system that can be applied across startups, digital platforms, and modern technology projects to streamline growth and long-term evolution.",
    liveUrl: "",
    techType: "TOOL",
    projectTypes: ["PRODUCTIVITY", "BUSINESS"],
  },
  {
    title: "سوق سوريا",
    titleEn: "Syria Souq",
    description:
      "منصة إعلانات مبوبة مخصصة للسوق السوري تتيح للمستخدمين نشر واستعراض الإعلانات بسهولة ضمن عدة فئات تشمل السيارات، العقارات، الأراضي الزراعية، الدراجات النارية، والمركبات البحرية. توفر المنصة تجربة بسيطة وسريعة لربط البائعين بالمشترين داخل سوريا مع إمكانية البحث والتصفية حسب الفئة والموقع.",
    descriptionEn:
      "A classified ads platform designed for the Syrian market, allowing users to post and browse listings across multiple categories including cars, real estate, agricultural land, motorcycles, and marine vehicles. The platform provides a simple and fast experience that connects buyers and sellers within Syria, with search and filtering by category and location.",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.syriasouq.app&pcampaignid=web_share",
    techType: "MOBILE",
    projectTypes: ["MARKETPLACE"],
  },
  {
    title: "سوق سوريا - الإصدار الثاني",
    titleEn: "Syria Market - Version 2",
    description:
      "النسخة الثانية من منصة سوق سوريا للإعلانات المبوبة، بتصميم واجهات حديثة وتجربة استخدام محسّنة بشكل كامل. يدعم التطبيق جميع فئات الإعلانات الأساسية مثل السيارات والعقارات والأراضي الزراعية والدراجات النارية والقوارب، مع تحسينات كبيرة في الأداء وسهولة التصفح. يتضمن الإصدار الجديد ميزة الريلز كمساحة إعلانية مبتكرة لعرض الإعلانات بشكل فيديو قصير وتفاعلي لزيادة الوصول والمشاهدات.",
    descriptionEn:
      "The second version of Syria Market classifieds platform, featuring a fully redesigned modern UI and significantly improved user experience. The platform continues to support core listing categories such as cars, real estate, agricultural land, motorcycles, and boats, with major enhancements in performance and navigation. The new version introduces a Reels feature as an innovative advertising space for short, engaging video ads to increase reach and visibility.",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.syriasouq.app&pcampaignid=web_share",
    techType: "MOBILE",
    projectTypes: ["MARKETPLACE"],
  },
];

// const projectTagData: Prisma.ProjectTagCreateInput[] = [
//   {
//     project: { connect: { id: 1 } },
//     tag: { connect: { id: 5 } },
//   },
//   {
//     project: { connect: { id: 1 } },
//     tag: { connect: { id: 12 } },
//   },
// ];

// Update existing records — matched by cloudId
const projectMediaUpdates: {
  cloudId: string;
  data: Prisma.ProjectMediaUpdateInput;
}[] = [
  {
    cloudId: "ltqbryow8q7dqgwbzbhi",
    data: {
      fileName: "SMART NERO LOGO",
      order: 1,
      isMain: true,
    },
  },
  {
    cloudId: "ztt43gaorsvatu9qcisf",
    data: {
      fileName: "SMART NERO LOGIN",
      order: 2,
      isMain: false,
      section: {
        connect: { id: 1 },
      },
    },
  },
  {
    cloudId: "bfqqzofpjy8w6romblbr",
    data: {
      fileName: "SMART NERO HOME",
      order: 3,
      isMain: false,
      section: {
        connect: { id: 1 },
      },
    },
  },
];

// New records to insert
const projectMediaNew: Prisma.ProjectMediaCreateInput[] = [
  {
    project: { connect: { id: 1 } },
    section: { connect: { id: 2 } },
    url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372055/esuxncluyweheawqkoic.png",
    type: "IMAGE",
    cloudId: "esuxncluyweheawqkoic",
    fileName: "SMART NERO STRATEGY",
    order: 4,
    isMain: false,
  },
  {
    project: { connect: { id: 1 } },
    section: { connect: { id: 2 } },
    url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372058/hfwagifkyfpnihjmu7zx.png",
    type: "IMAGE",
    cloudId: "hfwagifkyfpnihjmu7zx",
    fileName: "SMART NERO STRATEGY DETAILS",
    order: 5,
    isMain: false,
  },
  {
    project: { connect: { id: 1 } },
    section: { connect: { id: 2 } },
    url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372061/hjiv7i8lfqhi6vnf0zz1.png",
    type: "IMAGE",
    cloudId: "hjiv7i8lfqhi6vnf0zz1",
    fileName: "SMART NERO STRATEGY MT5 LINK",
    order: 6,
    isMain: false,
  },
  {
    project: { connect: { id: 1 } },
    section: { connect: { id: 3 } },
    url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372057/mltwecvta6shjggbor4a.png",
    type: "IMAGE",
    cloudId: "mltwecvta6shjggbor4a",
    fileName: "SMART NERO STRATEGY ACTIVITY JOURNAL",
    order: 7,
    isMain: false,
  },
  {
    project: { connect: { id: 1 } },
    section: { connect: { id: 3 } },
    url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372057/k8z097lxt176vpmsqkwj.png",
    type: "IMAGE",
    cloudId: "k8z097lxt176vpmsqkwj",
    fileName: "SMART NERO STRATEGY FINANCIAL HISTORY",
    order: 8,
    isMain: false,
  },
  {
    project: { connect: { id: 1 } },
    section: { connect: { id: 4 } },
    url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372055/adslgfuyhf4nadofdmvq.png",
    type: "IMAGE",
    cloudId: "adslgfuyhf4nadofdmvq",
    fileName: "SMART NERO ACCOUNT MANAGEMENT",
    order: 9,
    isMain: false,
  },
  {
    project: { connect: { id: 1 } },
    section: { connect: { id: 4 } },
    url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372061/oqzjq7u7hxcdrwswfwvl.png",
    type: "IMAGE",
    cloudId: "oqzjq7u7hxcdrwswfwvl",
    fileName: "SMART NERO REFERRAL SYSTEM",
    order: 10,
    isMain: false,
  },
  {
    project: { connect: { id: 1 } },
    section: { connect: { id: 5 } },
    url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372062/u9tfzoblvuzg29zocwvo.png",
    type: "IMAGE",
    cloudId: "u9tfzoblvuzg29zocwvo",
    fileName: "SMART NERO LANGUAGE LANGUAGE",
    order: 11,
    isMain: false,
  },
];

const projectSectionsData: Prisma.ProjectSectionCreateInput[] = [
  {
    project: { connect: { id: 1 } },
    title: "تسجيل الدخول والصفحة الرئيسية",
    titleEn: "Authentication & Home Dashboard",

    description:
      "واجهة تسجيل دخول حديثة وسريعة تتيح للمستخدم الوصول الآمن إلى حسابه. تعرض الصفحة الرئيسية لوحة تحكم مباشرة تتضمن جولة التداول الحالية مع عدّاد زمني يوضح الوقت المتبقي، إلى جانب محتوى إعلاني ولوحة المحافظ الاستثمارية. كما توفر نقطة انطلاق لاستكشاف استراتيجيات التداول المتاحة داخل المنصة.",

    descriptionEn:
      "A modern and secure authentication interface enabling fast access to user accounts. The home dashboard presents the active trading session with a live countdown timer, alongside promotional content and portfolio insights. It also serves as an entry point to explore available trading strategies within the platform.",

    order: 1,
  },

  {
    project: { connect: { id: 1 } },
    title: "استكشاف الاستراتيجيات وربط حساب MT5",
    titleEn: "Strategy Discovery & MT5 Integration",

    description:
      "واجهة مركزية لاستعراض استراتيجيات التداول المتاحة مع تحليلات أداء تفصيلية تشمل الأرباح، المخاطر، والأداء التاريخي. يمكن للمستخدم اختيار أي استراتيجية والاطلاع على بياناتها بشكل معمق، ثم ربط حساب التداول الخاص به مع منصة MetaTrader 5 (MT5) مباشرة ضمن نفس القسم لتفعيل النسخ التلقائي للصفقات ومزامنة التداول بشكل لحظي.",

    descriptionEn:
      "A central interface for browsing available trading strategies with detailed performance analytics including profitability, risk metrics, and historical results. Users can inspect each strategy in depth, then connect their trading account directly to MetaTrader 5 (MT5) within the same section to enable automated copy trading and real-time synchronization.",

    order: 2,
  },

  {
    project: { connect: { id: 1 } },
    title: "دفتر النشاط وسجل المعاملات المالية",
    titleEn: "Activity Journal & Transaction History",

    description:
      "يوفر دفتر النشاط سجلًا شاملاً لجميع تحركات المستخدم داخل المنصة، بما في ذلك التحديثات والعمليات الأساسية. كما يتضمن سجلًا ماليًا مفصلًا يعرض عمليات الإيداع والسحب وحالاتها، مما يضمن شفافية كاملة في متابعة الأنشطة المالية.",

    descriptionEn:
      "The activity journal provides a complete record of user actions within the platform, including key updates and system events. It also includes a detailed financial ledger showing deposits, withdrawals, and their statuses, ensuring full transparency of financial operations.",

    order: 3,
  },

  {
    project: { connect: { id: 1 } },
    title: "الإحالات وإدارة الحساب الشخصي",
    titleEn: "Referrals & Account Management",

    description:
      "نظام إحالات يتيح للمستخدم تحقيق أرباح عبر مشاركة رابط الدعوة الخاص به وتتبع أداء الإحالات بشكل مباشر. كما تتضمن هذه الصفحة إدارة الملف الشخصي، معلومات المستخدم، دليل الاستخدام، وبيانات الوسيط المعتمد، مع إمكانية إدارة الحساب بشكل كامل.",

    descriptionEn:
      "A referral system that allows users to generate earnings by sharing their invite link and tracking referral performance in real time. This section also includes profile management, user information, a usage guide, and approved broker details, providing full account control.",

    order: 4,
  },

  {
    project: { connect: { id: 1 } },
    title: "إعدادات اللغة",
    titleEn: "Language Settings",

    description:
      "واجهة إعدادات مرنة تتيح للمستخدم تغيير لغة التطبيق بسهولة، مع دعم 6 لغات مختلفة لتوفير تجربة استخدام مخصصة وسلسة تناسب جميع المستخدمين.",

    descriptionEn:
      "A flexible settings interface that allows users to easily switch the application language, supporting 6 different languages to deliver a smooth and localized user experience.",

    order: 5,
  },
];

export async function main() {
  //   for (const u of tagData) {
  //     await prisma.tag.create({ data: u });
  //   }
  for (const p of projectData) {
    const exists = await prisma.project.findFirst({ where: { titleEn: p.titleEn } });
    if (!exists) {
      await prisma.project.create({ data: p });
    }
  }
  //   for (const pt of projectTagData) {
  //     await prisma.projectTag.create({ data: pt });
  //   }
  //   for (const ps of projectSectionsData) {
  //     await prisma.projectSection.create({ data: ps });
  //   }
  // for (const { cloudId, data } of projectMediaUpdates) {
  //   const record = await prisma.projectMedia.findFirst({ where: { cloudId } });
  //   if (record) {
  //     await prisma.projectMedia.update({ where: { id: record.id }, data });
  //   }
  // }
  // for (const m of projectMediaNew) {
  //   await prisma.projectMedia.create({ data: m });
  // }
}

main()
  .then(() => {
    console.log("Seeding complete.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

// THIS Script
//npx prisma db seed
