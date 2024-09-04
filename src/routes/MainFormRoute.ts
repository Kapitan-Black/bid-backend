import express from "express";
import MyMainFormController from "../controllers/MyMainFormController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();



router.post("/", MyMainFormController.createMyMainForm);

router.get("/", jwtCheck, MyMainFormController.getMyMainForm)

router.get("/:formName", MyMainFormController.getMyMainForm);

router.delete("/", jwtCheck, MyMainFormController.deleteMainForm);




export default router;




