import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  author: Joi.string().trim().required(),
  price: Joi.number().required().positive(),
});
