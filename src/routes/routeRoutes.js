import { Router } from "express";
import multer from "multer";
import { listRoutes, createRoute, addStep } from "../controllers/routeController.js";
import { requireAdmin } from "../auth.js";

const upload = multer({ dest: "./uploads" });
const r = Router();

r.get("/routes", listRoutes);
r.post("/routes", requireAdmin, createRoute);
r.post("/routes/:id/steps", requireAdmin, upload.single("image"), addStep);

export default r;
