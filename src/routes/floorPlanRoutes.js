import { Router } from "express";
import { getFloorPlans } from "../controllers/floorPlanController.js";

const router = Router();

// GET /api/floorplans/:buildingId
router.get("/:buildingId", getFloorPlans);

export default router;
