import { Request, Response } from "express";
import MainBidFormSchema from "../model/mainBidForm";

const UpdateMainForm = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  try {
    const updatedMainForm = await MainBidFormSchema.findByIdAndUpdate(id, updateData, {
      new: true, // This option returns the updated document
      runValidators: true, // This option runs schema validators
    });

    if (!updatedMainForm) {
      return res.status(404).json({ message: "Bid form not found" });
    }

    res.status(200).send(updatedMainForm);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
    UpdateMainForm
}