import { ActionResponse, ActionRequest, ActionContext } from "adminjs";

export const hideAdmin = async (originalResponse: ActionResponse, request: ActionRequest, context: ActionContext): Promise<ActionResponse> => {
  const { currentAdmin } = context;

  if (currentAdmin) {
    const users_only = await originalResponse.records.filter((user: any) => user.id !== currentAdmin.id);

    originalResponse.meta.total = users_only.length;
    const non_admin_users = {
      meta: originalResponse.meta,
      records: [...users_only]
    };

    return non_admin_users;
  }
  return originalResponse;
};
