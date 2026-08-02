import Joi from "joi";

export const createBookSchema = Joi.object({
  title: Joi.string().trim().min(3).required(),
  author: Joi.string().trim().required(),
  price: Joi.number().required().positive(),
  genre: Joi.string()
    .valid("Programming", "Novel", "History", "Science", "Biography", "Finance")
    .required(), //case sesitivity pr kam krna hai

  stock: Joi.number().min(0).default(0),

  available: Joi.boolean().default(true),
});
