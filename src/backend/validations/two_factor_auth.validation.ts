import Joi from "joi";

export const twoFAValidation = (data: { userId: string }): Joi.ValidationResult<{ userId: string }> => {
  const schema = Joi.object<{ userId: string }, true>({
    userId: Joi.string().required().trim()
  });
  return schema.validate(data);
};

export const twoFAVerifyValidation = (data: { userId: string; twoFAToken: string }): Joi.ValidationResult<{ userId: string; twoFAToken: string }> => {
  const schema = Joi.object<{ userId: string; twoFAToken: string }, true>({
    userId: Joi.string().required().trim(),
    twoFAToken: Joi.string().required().trim()
  });
  return schema.validate(data);
};
