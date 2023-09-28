import { Prisma } from "@prisma/client";
import { IFaqCategory } from "./faq_category.interface";
import { IFormErrorMessage } from "./common.interface";

export interface IFaq {
  id: string;
  title: string;
  description: string;
  image: Prisma.JsonValue;
  FAQCategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  FAQCategory: IFaqCategory;
}

export interface IFaqForm {
  title: IFormErrorMessage;
  description: IFormErrorMessage;
  image_alternative_text: IFormErrorMessage;
  FAQCategory: IFormErrorMessage;
}
