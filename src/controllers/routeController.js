import { prisma } from "../db.js";

export async function listRoutes(req, res) {
  const items = await prisma.route.findMany({
    include: { steps: true }
  });
  res.json(items);
}

export async function createRoute(req, res) {
  const { startId, endId, polylineJson } = req.body;

  const r = await prisma.route.create({
    data: {
      startId: parseInt(startId),
      endId: parseInt(endId),
      polylineJson
    }
  });

  res.json(r);
}

export async function addStep(req, res) {
  const routeId = parseInt(req.params.id);
  const { caption, dir, index } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: "Image required" });

  const imageUrl = `/uploads/${file.filename}`;

  const s = await prisma.step.create({
    data: {
      routeId,
      caption,
      dir,
      index: parseInt(index),
      imageUrl
    }
  });

  res.json(s);
}
