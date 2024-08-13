import { Request, Response } from "express";
import MainBidForm from "../model/mainBidForm";
import MainBidFormSchema from "../model/mainBidForm";

const createMyMainForm = async (req: Request, res: Response) => {
  try {
    // console.log("Request body:", req.body); // Log the entire request body
    // const  hotel = req.body;
    // console.log("Parsed hotel:", hotels);
    const { hotel, transfer, flight, image, idArray, formName } = req.body;

    // if (!hotel | attraction)
    if (!hotel || !transfer || !flight || !image || !formName) {
      return res
        .status(400)
        .json({ message: "Hotel and attraction fields are required" });
    }
   

    const mainBidForm = new MainBidFormSchema({
      hotel,
      transfer,
      flight,
      image,
      idArray,
      formName,
      createDate: new Date()
    });

    await mainBidForm.save();
    res.status(201).send(mainBidForm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getMyMainForm = async (req: Request, res: Response) => {
  try {

    const { formName } = req.params;
    console.log(formName)

    let forms;
    if (formName) {
      forms = await MainBidForm.find({ formName });
    } else {
      forms = await MainBidForm.find({});
    }
    res.status(200).json(forms);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get forms" });
  }
};

export default {
  createMyMainForm,
  getMyMainForm,
};

