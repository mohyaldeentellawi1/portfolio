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

// const projectData: Prisma.ProjectCreateInput[] = [
//   {
//     title: "SMART NERO",
//     titleEn: "SMART NERO",
//     description:
//       "منصة Social Trading متكاملة تربط بين المتداولين المحترفين والمستخدمين الراغبين بالاستثمار دون الحاجة لخبرة متقدمة في التداول. تتيح المنصة استعراض الاستراتيجيات، تحليل الأداء، متابعة الإحصائيات والأرباح، ثم ربط حساب التداول مباشرة مع الاستراتيجية المختارة لتنفيذ عمليات البيع والشراء تلقائيًا وبشكل لحظي.",
//     descriptionEn:
//       "A full-featured Social Trading platform designed to connect professional traders with users who want to invest without advanced trading experience. The platform enables users to explore trading strategies, analyze performance metrics, monitor profitability, and seamlessly link their trading accounts to automatically replicate trades in real time.",
//     liveUrl: "https://app.smartnero.net/",
//     techType: "MOBILE",
//     projectTypes: ["TRADING", "COMMUNITY"],
//   },
// ];

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
  //   for (const p of projectData) {
  //     await prisma.project.create({ data: p });
  //   }
  //   for (const pt of projectTagData) {
  //     await prisma.projectTag.create({ data: pt });
  //   }
  //   for (const ps of projectSectionsData) {
  //     await prisma.projectSection.create({ data: ps });
  //   }

  for (const { cloudId, data } of projectMediaUpdates) {
    const record = await prisma.projectMedia.findFirst({ where: { cloudId } });
    if (record) {
      await prisma.projectMedia.update({ where: { id: record.id }, data });
    }
  }
  for (const m of projectMediaNew) {
    await prisma.projectMedia.create({ data: m });
  }
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
