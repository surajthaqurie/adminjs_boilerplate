import { ValidationError, ActionRequest, ActionContext, AppError } from "adminjs";
import { checkDBUniqueOnEdit, isDbUniqueField, isEmailValid, isEmptyString, isPasswordValid } from "./validation.helper";
import { IUserForm } from "src/interfaces";
import { prisma } from "src/utility";

const { users: Users } = prisma;

export const newUserValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;

  if (payload && method === "post") {
    const errors: Partial<IUserForm> = {};

    if (isEmptyString(payload.name)) {
      errors.email = {
        message: "Name is required"
      };
    }

    if (isEmptyString(payload.email)) {
      errors.email = {
        message: "Email is required"
      };
    }

    if (!isEmailValid(payload.email)) {
      errors.email = {
        message: "Please enter valid email"
      };
    }

    if (isEmptyString(payload.password)) {
      errors.password = {
        message: "Password is required"
      };
    }

    if (!isPasswordValid(payload.password)) {
      errors.password = {
        message: "Password is not valid"
      };
    }

    if (isEmptyString(payload.confirm_password)) {
      errors.confirm_password = {
        message: "Confirm password is required"
      };
    }

    if (payload.password !== payload.confirm_password) {
      errors.confirm_password = {
        message: "Password and confirm password does not matched"
      };
    }

    if (isEmptyString(payload.role)) {
      errors.role = {
        message: "Role is required"
      };
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};

export const editUserValidation = (request: ActionRequest, context: ActionContext): ActionRequest => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const errors: Partial<IUserForm> = {};

    if (isEmptyString(payload.name)) {
      errors.email = {
        message: "Name is required"
      };
    }

    if (isEmptyString(payload.email)) {
      errors.email = {
        message: "Email is required"
      };
    }

    if (!isEmailValid(payload.email)) {
      errors.email = {
        message: "Please enter valid email"
      };
    }

    if (isEmptyString(payload.role)) {
      errors.role = {
        message: "Role is required"
      };
    }

    if (Object.keys(errors).length) {
      throw new ValidationError(errors);
    }

    return request;
  }

  return request;
};

export const checkUserUserUniqueFields = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;

  if (payload && method === "post") {
    const email_taken = await isDbUniqueField(Users, "email", payload.email);

    if (email_taken) throw new AppError(`This email "${payload.email}" is already taken`);

    return request;
  }
  return request;
};

export const checkEditUserUniqueFields = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const email_taken = await checkDBUniqueOnEdit(Users, payload.id, "email", payload.email);

    if (email_taken) throw new AppError(`This email "${payload.email}" is already taken`);

    return request;
  }
  return request;
};
