import { ActionContext, ActionRequest, AppError, ValidationError } from "adminjs";
import { checkDBUniqueOnEdit, isDbUniqueField, isEmptyString } from "./validation.helper";
import { ISettingForm } from "src/interfaces";

import { prisma } from "src/utility";
const { settings: Settings } = prisma;

export const settingValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const errors: Partial<ISettingForm> = {};

    if (isEmptyString(payload.key)) {
      errors.key = {
        message: "Key is required"
      };
    }

    if (isEmptyString(payload.value)) {
      errors.value = {
        message: "Value is required"
      };
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};

export const checkSettingUniqueFields = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const name_taken = await isDbUniqueField(Settings, "key", payload.key);
    if (name_taken) throw new AppError(`This key "${payload.key}" is already taken`);

    return request;
  }
  return request;
};

export const checkEditSettingUniqueFields = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const name_taken = await checkDBUniqueOnEdit(Settings, payload.id, "key", payload.key);
    if (name_taken) throw new AppError(`This key "${payload.key}" is already taken`);

    return request;
  }
  return request;
};
