import express from "express";
import { jwtCheck } from "../middleware/auth";
import HotelsUpdateController from "../controllers/HotelsUpdateController";
import MainFormUpdateController from "../controllers/MainFormUpdateController";

const router = express.Router();

router.put("/:id", MainFormUpdateController.UpdateMainForm);


export default router;
