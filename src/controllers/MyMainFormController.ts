import { Request, Response } from "express";
import MainBidForm from "../model/mainBidForm";
import Hotel from "../model/mainBidForm";

const createMyMainForm = async (req: Request, res: Response) => {
  try {
    // console.log("Request body:", req.body); // Log the entire request body
    // const  hotel = req.body;
    // console.log("Parsed hotel:", hotels);
    const { hotel, transfer, flight } = req.body;

    // if (!hotel | attraction)
    if (!hotel || !transfer || !flight) {
      return res
        .status(400)
        .json({ message: "Hotel and attraction fields are required" });
    }
   

    const mainBidForm = new Hotel({
      hotel,
      transfer,
      flight,
    });

    await mainBidForm.save();
    res.status(201).send(mainBidForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyMainForm,
};

