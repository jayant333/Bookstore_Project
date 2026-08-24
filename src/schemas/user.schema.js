import joi from "joi";

export const createUserSchema = joi.object({
  name: joi.string().trim().min(2).required(),
  email: joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.email": "please provide a valid email format",
      "string.empty": "Email field cannot be empty",
      "any.required": "Email is required ",
    }),
  password: joi.string().min(6).required(),
});
