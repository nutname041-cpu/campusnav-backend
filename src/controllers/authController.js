import bcrypt from "bcrypt";
import { prisma } from "../db.js";

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  res.json({ ok: true });
}

export function me(req, res) {
  res.json({ user: req.session?.user || null });
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
}
