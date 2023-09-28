import Joi from "joi";
import { IContact } from "src/interfaces/contact";

const contactValidation = (data: IContact): Joi.ValidationResult<IContact> => {
  const schema = Joi.object<IContact, true>({
    firstName: Joi.string()
      .max(90)
      .trim()
      .regex(/^[A-Za-z\s]{1,}$/)
      .required(),
    lastName: Joi.string()
      .max(90)
      .trim()
      .regex(/^[A-Za-z\s]{1,}$/)
      .required(),
    email: Joi.string().max(254).email().trim().required(),
    city: Joi.string().max(64).trim().allow(""),
    state: Joi.string().max(64).trim().allow(""),
    zip: Joi.number().min(0).optional(),
    phoneNumber: Joi.string().max(15).required(),
    department: Joi.string().allow(""),
    message: Joi.string().max(650).trim().required()
  });

  return schema.validate(data);
};

export { contactValidation };
