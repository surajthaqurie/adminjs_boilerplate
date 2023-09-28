import { DMMFClass, prisma } from "../utility";
import { delete_guard, user_new_layouts, user_list_properties, user_roles, admin_resource } from "./helper.resources";
import { hashPassword, hideAdmin, imageName, lowercaseEmail } from "../hooks";
import { checkEditUserUniqueFields, checkUserUserUniqueFields, editUserValidation, newUserValidation } from "../frontend/validations";
import { Components } from "../frontend/components";
import { ActionRequest, ActionResponse, RecordJSON } from "adminjs";

const user_resource = {
  resource: {
    model: ((prisma as any)._baseDmmf as DMMFClass).modelMap.Users,
    client: prisma
  },
  options: {
    parent: null,
    actions: {
      new: {
        layout: user_new_layouts,
        before: [newUserValidation, hashPassword, lowercaseEmail, checkUserUserUniqueFields],
        ...admin_resource
      },
      show: admin_resource,
      edit: {
        before: [editUserValidation, lowercaseEmail, checkEditUserUniqueFields],
        after: [imageName],
        ...admin_resource
      },
      list: {
        ...admin_resource,
        after: [hideAdmin]
      },
      delete: { ...delete_guard, ...admin_resource },
      changePassword: {
        ...admin_resource,
        actionType: "record",
        component: Components.ChangePassword,
        handler: (request: ActionRequest, response: ActionResponse, context: any): { record: RecordJSON } => {
          const { record, currentAdmin } = context;
          return {
            record: record.toJSON(currentAdmin)
          };
        }
      }
    },
    listProperties: user_list_properties,
    filterProperties: ["name", "email"],
    properties: {
      password: {
        type: "password",
        isVisible: {
          edit: false,
          changePassword: false
        },
        isAccessible: false,
        components: {
          edit: Components.CustomPassword
        },
        isRequired: true
      },
      confirm_password: {
        type: "password",
        components: {
          new: Components.ConfirmPassword
        },
        isVisible: {
          edit: false
        },
        isRequired: true
      },
      role: user_roles
    }
  }
};

export default user_resource;
