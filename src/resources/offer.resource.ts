import { offerValidation } from "src/frontend/validations";
import { DMMFClass, prisma } from "../utility";
import { admin_seo_resource, delete_guard } from "./helper.resources";
import { payloadTrim } from "src/hooks";

const offer_resource = {
  resource: {
    model: ((prisma as any)._baseDmmf as DMMFClass).modelMap.Offer,
    client: prisma
  },
  options: {
    parent: null,
    actions: {
      show: admin_seo_resource,
      list: admin_seo_resource,
      new: {
        ...admin_seo_resource,
        before: [payloadTrim, offerValidation]
      },
      edit: {
        ...admin_seo_resource,
        before: [payloadTrim, offerValidation]
      },
      delete: { ...delete_guard, ...admin_seo_resource }
    },
    filterProperties: []
  }
};

export default offer_resource;
