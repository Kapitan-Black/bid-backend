import express from "express";
import { jwtCheck } from "../middleware/auth";
import HotelsUpdateController from "../controllers/HotelsUpdateController";

const router = express.Router();

router.put("/:id", jwtCheck, HotelsUpdateController.UpdateHotel);

router.delete("/", jwtCheck, HotelsUpdateController.DeleteImageUrls);

export default router;
