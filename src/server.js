import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import floorPlanRoutes from "./routes/floorPlanRoutes.js";
import { makeSession } from "./auth.js";

import authRoutes from "./routes/authRoutes.js";
import buildingRoutes from "./routes/buildingRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS: allow frontend (React)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

// Sessions
app.use(makeSession());

// ✅ HEALTH ROUTE MUST BE BEFORE OTHER ROUTES
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Static folder for uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Now load all real routes
app.use("/api", authRoutes);
app.use("/api", buildingRoutes);
app.use("/api", routeRoutes);
app.use("/api", roomRoutes);
app.use("/api", floorPlanRoutes);

// ✅ Remove duplicate line (you had it twice)
/// app.use("/api/floorplans", floorPlanRoutes);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`✅ Backend running on http://localhost:${port}`);
});
