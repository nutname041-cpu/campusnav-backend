import { prisma } from "../db.js";

export async function listBuildings(req, res) {
  const items = await prisma.building.findMany({
    include: { floors: true }
  });
  res.json(items);
}

export async function createBuilding(req, res) {
  const { name, code, type, description, x, y } = req.body;

  const b = await prisma.building.create({
    data: {
      name,
      code,
      type,
      description,
      x: parseFloat(x),
      y: parseFloat(y)
    }
  });

  res.json(b);
}
