import express from "express";
import multer from "multer";
import { param } from "express-validator";
import HotelsController from "../controllers/HotelsController";

const router = express.Router();

router.post("/", HotelsController.CreateHotel);

router.get("/", HotelsController.GetHotels);

router.get("/:id", param("id").isString() ,  HotelsController.GetHotel)

router.delete("/", HotelsController.DeleteHotel);

export default router;
