import Joi from "joi";

export const changePasswordValidation = (data: { new_password: string; confirm_password: string }): Joi.ValidationResult<{ new_password: string; confirm_password: string }> => {
  const schema = Joi.object<{ new_password: string; confirm_password: string }, true>({
    new_password: Joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .trim()
      .required(),
    confirm_password: Joi.string().required().trim()
  });

  return schema.validate(data);
};
