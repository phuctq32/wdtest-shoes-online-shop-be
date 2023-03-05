import { Router } from "express";
import * as dataController from "../controllers/data.js";

const router = Router();

router.get("/data", dataController.getCommonData);

export default router;
