import express from "express"
import DeleteImageController from "../controllers/DeleteImageController";

const router = express.Router()

router.delete("/", DeleteImageController);

export default router