import express from "express";
import multer from "multer";
import MyMainFormController from "../controllers/MyMainFormController";

const router = express.Router();



router.post("/",  MyMainFormController.createMyMainForm);


export default router;




