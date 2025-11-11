// backend/src/routes/floorPlanRoutes.js

import { Router } from "express";
import { getFloorPlans } from "../controllers/floorPlanController.js";

const router = Router();

router.get("/:buildingId", getFloorPlans);

export default router;
