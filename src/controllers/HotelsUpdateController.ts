import { Request, Response } from "express";
import Hotels from "../model/hotels";

const UpdateHotel = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const updatedHotel = await Hotels.findByIdAndUpdate(id, updateData, {
      new: true, // This option returns the updated document
      runValidators: true, // This option runs schema validators
    });

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).send(updatedHotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};




const DeleteImageUrls = async (req: Request, res: Response) => {
  const { id, roomImageUrls, hotelImageUrls } = req.body;

  try {
    // Find the hotel by name
    const hotel = await Hotels.findOne({ id });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Filter out the images to be deleted from hotel images
    if (hotelImageUrls && hotelImageUrls.length > 0) {
      hotel.images = hotel.images.filter(
        (image: string) => !hotelImageUrls.includes(image)
      );
    }

    // Iterate over rooms and remove the selected room images
    if (roomImageUrls && roomImageUrls.length > 0) {
      hotel.rooms = hotel.rooms.map((room) => {
        room.images = room.images.filter(
          (image: string) => !roomImageUrls.includes(image)
        );
        return room;
      });
    }

    // Save the updated hotel document
    await hotel.save();

    res
      .status(200)
      .json({ message: "Selected images deleted successfully", hotel });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { UpdateHotel, DeleteImageUrls };
