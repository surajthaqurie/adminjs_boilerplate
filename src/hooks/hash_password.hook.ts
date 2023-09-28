import { ActionRequest, ActionContext } from "adminjs";
import { generateSalt, generateHashPassword } from "../utility";

export const hashPassword = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;
  if (payload && method === "post") {
    const salt = await generateSalt();
    payload["password"] = await generateHashPassword(payload.password, salt);

    return request;
  }

  return request;
};
