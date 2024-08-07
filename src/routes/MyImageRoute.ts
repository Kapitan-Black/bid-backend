import express from "express";
import multer from "multer";
import MyImageController from "../controllers/MyImageController";
import { param } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50mb
  },
}).array("images", 100);

router.post("/", upload, MyImageController.UploadImage);

router.get(
  "/:accordionId",
  param("accordionId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("accordionId must be a valid string"),
  MyImageController.GetImages
);

router.delete("/", MyImageController.DeleteImages);

export default router;
