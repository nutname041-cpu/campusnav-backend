import { Router } from "express";
import { login, me, logout } from "../controllers/authController.js";

const r = Router();

r.post("/login", login);
r.get("/me", me);
r.post("/logout", logout);

export default r;
