import { Router } from "express";
import { searchRooms } from "../controllers/roomController.js";

const r = Router();

r.get("/rooms/search", searchRooms);

export default r;
