import { Router } from "express";
import { listBuildings, createBuilding } from "../controllers/buildingController.js";
import { requireAdmin } from "../auth.js";

const r = Router();

r.get("/buildings", listBuildings);
r.post("/buildings", requireAdmin, createBuilding);

export default r;
