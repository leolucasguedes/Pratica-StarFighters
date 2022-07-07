import { Router } from "express";
import { battle, ranking } from "../controllers/controller.js";
import validSchema from "../middlewares/schemaValidator.js";
import battleSchema from "../schema/schema.js";

const router = Router();

router.post("/battle", validSchema(battleSchema), battle);
router.get("/ranking", ranking);

export default router;