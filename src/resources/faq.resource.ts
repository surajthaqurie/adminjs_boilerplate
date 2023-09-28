import { DMMFClass, prisma } from "../utility";
import {
  faqSectionValidation,
  checkFAQUniqueFields,
  checkEditFAQUniqueFields
} from "../frontend/validations";
import {
  delete_guard,
  image_properties,
  image_validation,
  localProvider
} from "./helper.resources";
import { imageName, payloadTrim, slugify } from "../hooks";
import { Components } from "../frontend/components";
import uploadFeature from "@adminjs/upload";

const faqs_resource = {
  resource: {
    model: ((prisma as any)._baseDmmf as DMMFClass).modelMap.FAQ,
    client: prisma
  },
  options: {
    parent: null,
    actions: {
      new: {
        before: [
          payloadTrim,
          faqSectionValidation,
          slugify,
          checkFAQUniqueFields
        ]
      },
      edit: {
        before: [
          payloadTrim,
          faqSectionValidation,
          slugify,
          checkEditFAQUniqueFields
        ],
        after: [imageName]
      },
      delete: { ...delete_guard }
    },
    filterProperties: ["title"],
    properties: {
      description: {
        components: {
          edit: Components.TextEditor,
          show: Components.ShowTextEditor
        },
        isVisible: {
          list: false,
          edit: true,
          show: true
        }
      }
    }
  },
  features: [
    uploadFeature({
      provider: { local: localProvider },
      validation: image_validation,
      properties: image_properties,
      uploadPath: (record: any, filename: string) =>
        `/faqs/${record.id()}~~${filename}`
    })
  ]
};

export default faqs_resource;
