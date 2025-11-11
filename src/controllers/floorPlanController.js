// backend/src/controllers/floorPlanController.js

import prismaDefault, { prisma as prismaNamed } from "../db.js";
const prisma = prismaNamed || prismaDefault;

// ✅ Named export (ESM-correct)
export async function getFloorPlans(req, res) {
  const { buildingId } = req.params;

  try {
    const id = Number(buildingId);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid buildingId" });
    }

    const plans = await prisma.floorPlan.findMany({
      where: { buildingId: id },
      orderBy: { level: "asc" }
    });

    res.json(plans);
  } catch (err) {
    console.error("Error fetching floor plans:", err);
    res.status(500).json({ error: "Failed to load floor plans" });
  }
}
