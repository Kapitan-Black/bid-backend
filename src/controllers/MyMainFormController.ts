import { Request, Response } from "express";
import MainBidForm from "../model/mainBidForm";
import MainBidFormSchema from "../model/mainBidForm";

const createMyMainForm = async (req: Request, res: Response) => {
  try {

    const { hotel, transfer, flight, image, idArray, formName } = req.body;
    const flightDate = req.body.flight[0].departureDate;

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
      createDate: new Date().toISOString(),
      flightDate: flightDate,
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

