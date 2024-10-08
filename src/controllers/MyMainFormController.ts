import { Request, Response } from "express";
import MainBidForm from "../model/mainBidForm";
import MainBidFormSchema from "../model/mainBidForm";


const createMyMainForm = async (req: Request, res: Response) => {
  try {
    const existForm = await MainBidFormSchema.findOne({
      formName: req.body.formName,
    });

    if (existForm) {
      return res
        .status(400)
        .json({ message: "form with this name is already exist" });
    }

    const {
      hotel,
      transfer,
      flight,
      image,
      idArray,
      formName,
      holidayStartDate,
      isBidApproved,
      totalSum,
      showSum,
      currency,
    } = req.body;
    // console.log(req.body)

    if (!hotel || !transfer || !flight || !image || !formName) {
      return res.status(400).json({ message: "fields are required" });
    }

    // Получаем последнюю форму с наибольшим bidNumber
    const lastForm = await MainBidFormSchema.findOne({})
      .sort({ bidNumber: -1 }) // Сортировка по убыванию bidNumber
      .limit(1); // Получаем только одну запись

    // Проверяем значение bidNumber и устанавливаем в 1, если значение 0, null или undefined
    let newBidNumber =
      lastForm && lastForm.bidNumber != null ? lastForm.bidNumber + 1 : 1;

    // Если предыдущий bidNumber был 0, устанавливаем newBidNumber = 1
    if (lastForm && lastForm.bidNumber === 0) {
      newBidNumber = 1;
    }




    // Получаем последнюю форму с наибольшим bidNumber
    const lastFakeForm = await MainBidFormSchema.findOne({})
      .sort({ bidNumber: -1 }) // Сортировка по убыванию bidNumber
      .limit(1); // Получаем только одну запись
    console.log(lastFakeForm)

    // Проверяем значение bidNumber и устанавливаем в 2035, если значение 0, null или undefined
    let newLastFakeNumber =
      lastFakeForm && lastFakeForm.fakeCountNumber != null
        ? lastFakeForm.fakeCountNumber + 1
        : 2035;
      

    // Если предыдущий bidNumber был 0, устанавливаем newBidNumber = 2035 и добавляем 1
    if (lastFakeForm && lastFakeForm.bidNumber === 0) {
      newLastFakeNumber = 2035;
    }

    const mainBidForm = new MainBidFormSchema({
      hotel,
      transfer,
      flight,
      image,
      idArray,
      formName,
      holidayStartDate,
      isBidApproved,
      fakeCountNumber: newLastFakeNumber,
      bidNumber: newBidNumber,
      totalSum: totalSum,
      showSum: showSum,
      currency: currency,
      createDate: new Date().toISOString(),
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


const deleteMainForm = async (req: Request, res: Response) => {
  const {formId} = req.body;

  try {
    const deletedForm = await MainBidFormSchema.findByIdAndDelete(formId);

    if (!deletedForm) {
      return res.status(404).json({ message: "Bid form not found" });
    }

    res.status(200).json({
      message: "Bid form deleted successfully",
      deletedForm,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



export default {
  createMyMainForm,
  getMyMainForm,
  deleteMainForm,
};

