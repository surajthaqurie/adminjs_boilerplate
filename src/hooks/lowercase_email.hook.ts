import { ActionRequest, ActionContext } from "adminjs";

export const lowercaseEmail = async (request: ActionRequest, context: ActionContext): Promise<ActionRequest> => {
  const { payload, method } = request;
  if (payload && method === "post") {
    payload["email"] = payload.email.toLowerCase();

    return request;
  }

  return request;
};
