import { Request, Response } from "express";
import cloudinary from "cloudinary";

const DeleteImageController = async (req: Request, res: Response) => {
  try {
    const { url, folder } = req.body;
    // console.log(url)
    // console.log(folder)

    if (!url) {
      return res.status(400).json({ message: "url is required" });
    }

    // console.log("imageUrl", imageUrl)
    const segments = url.split("/");
    // console.log("segments", segments);
    const publicIdWithExtension = segments.pop();
    // console.log("publicIdWithExtension", publicIdWithExtension);

    if (publicIdWithExtension) {
      const publicId = publicIdWithExtension.split(".")[0];
      const fullPublicId = `${folder}/${publicId}`;

      // console.log("publicId", publicId);
      await cloudinary.v2.uploader.destroy(fullPublicId);
    }

    // await Promise.all(deletePromises);

    res.status(200).send({ message: "Images deleted" });
  } catch (error) {
    res.status(500).json("Failed to delete images");
  }
};

export default DeleteImageController;
