import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Images from "../model/images";
import { Document } from "mongoose";



const UploadImage = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const id = req.body.id;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadPromises = files.map(async (file) => {
      const base64Image = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${base64Image}`;
      return await cloudinary.v2.uploader.upload(dataURI);
    });

    const uploadResponses = await Promise.all(uploadPromises);

    const imageUrls = uploadResponses.map((upload) => upload.url);
    // console.log("imageUrls====", imageUrls);

    const imageStorage = new Images();
    imageStorage.id = req.body.id;
    imageStorage.images = imageUrls;

    await imageStorage.save();

    res.status(201).send(imageStorage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const GetImages = async (req: Request, res: Response) => {
  try {

    const id = req.params.id 
    if (!id) {
      console.log("No id provided");
      return res.status(400).json({ message: "id is required" });
    }

    const images = await Images.findOne({ id });

    if (!images) {
      console.log(`No images found for id: ${id}`);

      return res.status(404).json({ message: "Images not found" });
    }

    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images" });
  }
};

interface ImageDocument extends Document {
  id: string;
  images: string[];
}

const DeleteImages = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;


    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    const imageDocument = (await Images.findOne({
      id,
    })) as ImageDocument;

    if (!imageDocument) {
      return res.status(404).json({ message: "images not found" });
    }

    const deletePromises = imageDocument.images.map(async (imageUrl) => {
      // console.log("imageUrl", imageUrl)
      const segments = imageUrl.split("/");
      // console.log("segments", segments);
      const publicIdWithExtension = segments.pop();
      console.log("publicIdWithExtension", publicIdWithExtension);

      if (publicIdWithExtension) {
        const publicId = publicIdWithExtension.split(".")[0];
        console.log("publicId", publicId);
        return await cloudinary.v2.uploader.destroy(publicId);
      }
    });
    await Promise.all(deletePromises);

    await Images.deleteOne({ id });

    res.status(200).send({ message: "Images deleted" });
  } catch (error) {
    res.status(500).json("Failed to delete images");
  }
};

export default {
  UploadImage,
  GetImages,
  DeleteImages,
};
