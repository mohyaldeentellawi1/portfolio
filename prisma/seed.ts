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

// export async function main() {
//   for (const u of tagData) {
//     await prisma.tag.create({ data: u });
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
