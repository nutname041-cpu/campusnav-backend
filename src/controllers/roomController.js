import { prisma } from "../db.js";

export async function searchRooms(req, res) {
  const q = (req.query.q || "").trim();
  if (!q) return res.json([]);

  const items = await prisma.room.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { building: { name: { contains: q } } }
      ]
    },
    include: { building: true }
  });

  res.json(items);
}
