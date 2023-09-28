import { ActionContext, ActionRequest, ValidationError } from "adminjs";
import { IOfferForm } from "src/interfaces";

export const offerValidation = (
  request: ActionRequest,
  context: ActionContext
): ActionRequest => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const errors: Partial<IOfferForm> = {};

    if (Number.isNaN(payload.amount)) {
      errors.amount = {
        message: "Amount must be number"
      };
    }

    if (Number.isNaN(payload.bonus)) {
      errors.bonus = {
        message: "Bonus must be number"
      };
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};
