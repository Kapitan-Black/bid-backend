import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotels from "../model/hotels";

const CreateHotel = async (req: Request, res: Response) => {
  try {
    const hotel = new Hotels(req.body);

    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const GetHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotels.find({});
    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get hotels" });
  }
};

const GetHotel = async (req: Request, res: Response) => {
  try {
    const hotelId = req.params.id;
    console.log(hotelId);
    const hotel = await Hotels.findOne({ hotelId });
    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const DeleteHotel = async (req: Request, res: Response) => {
  try {
    const { hotelName, folder } = req.body;

    if (!hotelName) {
      return res.status(400).json({ message: "hotelName is required" });
    }

    const hotelDocument = await Hotels.findOne({ hotelName }).populate("rooms");
    // console.log(hotelDocument);

    if (!hotelDocument) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Delete images from Cloudinary for each room
    const roomDeletePromises = hotelDocument.rooms.map(async (room: any) => {
      const imageDeletePromises = room.images.map(async (imageUrl: string) => {
        const segments = imageUrl.split("/");
        const publicIdWithExtension = segments.pop();
        if (publicIdWithExtension) {
          const publicId = publicIdWithExtension.split(".")[0];
          const fullPublicId = `${folder}/${publicId}`;

          await cloudinary.v2.uploader.destroy(fullPublicId);
        }
      });
      await Promise.all(imageDeletePromises);
    });

    // Wait for all rooms and their images to be deleted
    await Promise.all(roomDeletePromises);

    // Delete hotel images
    const hotelImageDeletePromises = hotelDocument.images.map(
      async (imageUrl: string) => {
        const segments = imageUrl.split("/");
        const publicIdWithExtension = segments.pop();
        if (publicIdWithExtension) {
          const publicId = publicIdWithExtension.split(".")[0];
          const fullPublicId = `${folder}/${publicId}`;

          await cloudinary.v2.uploader.destroy(fullPublicId);
        }
      }
    );
    await Promise.all(hotelImageDeletePromises);

    // Finally, delete the hotel
    await Hotels.deleteOne({ hotelName });

    res.status(200).send({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hotel" });
  }
};

export default {
  CreateHotel,
  GetHotels,
  DeleteHotel,
  GetHotel,
};
