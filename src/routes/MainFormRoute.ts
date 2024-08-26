import express from "express";
import MyMainFormController from "../controllers/MyMainFormController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();



router.post("/", jwtCheck, MyMainFormController.createMyMainForm);

router.get("/", jwtCheck, MyMainFormController.getMyMainForm)

router.get("/:formName", MyMainFormController.getMyMainForm);



export default router;




