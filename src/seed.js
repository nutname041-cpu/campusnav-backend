import bcrypt from "bcrypt";
import { prisma } from "./db.js";

async function main() {
  console.log("Seeding database…");

  // Create admin user
  const password = await bcrypt.hash("admin", 10);

  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password,
      role: "admin"
    }
  });

  // Demo buildings
  const gate = await prisma.building.upsert({
    where: { code: "GATE" },
    update: {},
    create: {
      name: "Main Gate",
      code: "GATE",
      type: "entry",
      x: 10,
      y: 80
    }
  });

  const library = await prisma.building.upsert({
    where: { code: "LIB" },
    update: {},
    create: {
      name: "Library",
      code: "LIB",
      type: "academic",
      x: 42.5,
      y: 38.1
    }
  });

  // Demo route
  const route = await prisma.route.create({
    data: {
      startId: gate.id,
      endId: library.id,
      polylineJson: JSON.stringify([
        { x: 10, y: 80 },
        { x: 25, y: 60 },
        { x: 42.5, y: 38.1 }
      ])
    }
  });

  // Demo step images (you MUST put these in backend/src/uploads/)
  await prisma.step.createMany({
    data: [
      {
        routeId: route.id,
        index: 1,
        imageUrl: "/uploads/sample_step1.jpg",
        caption: "Start at Main Gate",
        dir: "straight"
      },
      {
        routeId: route.id,
        index: 2,
        imageUrl: "/uploads/sample_step2.jpg",
        caption: "Walk past central road",
        dir: "left"
      },
      {
        routeId: route.id,
        index: 3,
        imageUrl: "/uploads/sample_step3.jpg",
        caption: "Library is ahead",
        dir: "straight"
      }
    ]
  });

  console.log("✅ Seeding completed.");
}

main().finally(() => process.exit(0));
