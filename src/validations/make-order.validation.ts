import Joi from "joi";

export const orderSchema = Joi.object({
  pharmacyId: Joi.string()
    .required()
    .valid("healthmart", "careplus", "quickcare"),
  product: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  customerInfo: Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip_code: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});
