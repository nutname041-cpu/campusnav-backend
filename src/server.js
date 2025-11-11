import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { makeSession } from "./auth.js";

import authRoutes from "./routes/authRoutes.js";
import buildingRoutes from "./routes/buildingRoutes.js";
import routeRoutes from "./routes/routeRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import floorPlanRoutes from "./routes/floorPlanRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

// Session
app.use(makeSession());

// Health route FIRST
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Static files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", authRoutes);
app.use("/api", buildingRoutes);
app.use("/api", routeRoutes);
app.use("/api", roomRoutes);
app.use("/api/floorplans", floorPlanRoutes);

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}`);
});
