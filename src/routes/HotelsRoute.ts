import express from "express";
import { param } from "express-validator";
import HotelsController from "../controllers/HotelsController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/", jwtCheck, HotelsController.CreateHotel);

router.get("/",jwtCheck,  HotelsController.GetHotels);

router.get("/:id", jwtCheck, param("id").isString() ,  HotelsController.GetHotel)

router.delete("/",jwtCheck, HotelsController.DeleteHotel);

export default router;
