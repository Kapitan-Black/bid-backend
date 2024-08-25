import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import MyImageRoute from "./routes/MyImageRoute";
import MainFormRoute from "./routes/MainFormRoute";
import HotelsRoute from "./routes/HotelsRoute";
import DeleteImageRoute from "./routes/DeleteImageRoute";
import UserRoute from "./routes/UserRoute";
import HotelsUpdateRoute from "./routes/HotelsUpdateRoute";
import bodyParser from "body-parser"

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"))
  .catch((error) => console.log("Database connection error", error));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(bodyParser.json({ limit: "50mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({message: "health OK!"})
})

app.use("/api/user", UserRoute)
app.use("/api/main-form", MainFormRoute);
app.use("/api/hotels", HotelsRoute);
app.use("/api/hotels-update", HotelsUpdateRoute)
// app.use("/api/images", MyImageRoute);
app.use("/api/delete-image", DeleteImageRoute)


app.listen(9000, () => {
  console.log("server started on localhost: 9000");
});
