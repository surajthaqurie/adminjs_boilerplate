import { ActionContext, ActionRequest, AppError, ValidationError } from "adminjs";
import { checkDBUniqueOnEdit, isDbUniqueField, isEmptyQuillJsDescription, isEmptyString } from "./validation.helper";
import { IFaqCategoryForm } from "src/interfaces";

import { prisma } from "src/utility";
const { fAQCategory: FAQCategory } = prisma;

export const faqCategoryValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;

  if (payload && method === "post") {
    const errors: Partial<IFaqCategoryForm> = {};

    if (isEmptyString(payload.title)) {
      errors.title = {
        message: "Title is required"
      };
    }

    if (isEmptyString(payload.image_alternative_text)) {
      errors.image_alternative_text = {
        message: "Image alternative text is required"
      };
    }

    if (isEmptyString(payload.description) || isEmptyQuillJsDescription(payload.description)) {
      errors.description = {
        message: "Description is required"
      };
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};

export const checkFaqCategoryUniqueFields = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const name_taken = await isDbUniqueField(FAQCategory, "slug", payload.slug);
    if (name_taken) throw new AppError(`This name "${payload.name}" is already taken`);

    return request;
  }
  return request;
};

export const checkEditFaqCategoryUniqueFields = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const name_taken = await checkDBUniqueOnEdit(FAQCategory, payload.id, "slug", payload.slug);
    if (name_taken) throw new AppError(`This name "${payload.name}" is already taken`);

    return request;
  }
  return request;
};
