import mongoose, { Schema } from "mongoose";

const imageSchema: Schema = new Schema({
  id: { type: String, required: true },
  images: [{ type: String, required: true }],
});

const Images = mongoose.model("Image", imageSchema);
export default Images;


