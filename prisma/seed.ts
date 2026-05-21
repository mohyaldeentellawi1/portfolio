// import { Prisma, PrismaClient } from "@/app/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
// import "dotenv/config";

// const adapter = new PrismaPg({
//   connectionString: process.env.DATABASE_URL,
// });
// const prisma = new PrismaClient({
//   adapter,
// });

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

// const projectMediaData: Prisma.ProjectMediaCreateInput[] = [
//   {
//     project: { connect: { id: 1 } },
//     url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779370006/ltqbryow8q7dqgwbzbhi.png",
//     type: "IMAGE",
//     cloudId: "ltqbryow8q7dqgwbzbhi",
//     fileName: "SMART NERO LOGO",
//     order: 1,
//     isMain: true,
//   },
//   {
//     project: { connect: { id: 1 } },
//     url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372052/ztt43gaorsvatu9qcisf.png",
//     type: "IMAGE",
//     cloudId: "ztt43gaorsvatu9qcisf",
//     fileName: "SMART NERO LOGIN",
//     order: 2,
//     isMain: false,
//   },
//   {
//     project: { connect: { id: 1 } },
//     url: "https://res.cloudinary.com/dbkjwdazc/image/upload/v1779372053/bfqqzofpjy8w6romblbr.png",
//     type: "IMAGE",
//     cloudId: "bfqqzofpjy8w6romblbr",
//     fileName: "SMART NERO HOME",
//     order: 3,
//     isMain: false,
//   },
// ];
// export async function main() {
//   for (const u of tagData) {
//     await prisma.tag.create({ data: u });
//   }
//   for (const p of projectData) {
//     await prisma.project.create({ data: p });
//   }
//   for (const m of projectMediaData) {
//     await prisma.projectMedia.create({ data: m });
//   }
//   for (const pt of projectTagData) {
//     await prisma.projectTag.create({ data: pt });
//   }
// }

// main()
//   .then(() => {
//     console.log("Seeding complete.");
//   })
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });

// THIS Script
//npx prisma db seed
