import express from "express";
import { param } from "express-validator";
import HotelsController from "../controllers/HotelsController";
import { jwtCheck } from "../middleware/auth";
import HotelsUpdateController from "../controllers/HotelsUpdateController";

const router = express.Router();

router.put("/:id", HotelsUpdateController.UpdateHotel);

router.delete("/", HotelsUpdateController.DeleteImageUrls)


export default router;
