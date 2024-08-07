import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }
    next()
};

export const validateMyBidFormRequest = [
  body("word1").isString().notEmpty().withMessage("word1 must be a string"),
  body("word2").isString().notEmpty().withMessage("word2 must be a string"),
  body("word3").isString().notEmpty().withMessage("word3 must be a string"),
  body("word4").isString().notEmpty().withMessage("word4 must be a string"),
  body("word5").isString().notEmpty().withMessage("word5 must be a string"),
  body("word6").isString().notEmpty().withMessage("word6 must be a string"),
  body("word7").isString().notEmpty().withMessage("word7 must be a string"),
  body("word8").isString().notEmpty().withMessage("word8 must be a string"),
  body("word9").isString().notEmpty().withMessage("word9 must be a string"),
    body("word10").isString().notEmpty().withMessage("word10 must be a string"),
  
    handleValidationErrors,
];
