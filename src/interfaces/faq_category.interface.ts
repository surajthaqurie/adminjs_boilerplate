import { Prisma } from "@prisma/client";
import { IFormErrorMessage } from "./common.interface";

export interface IFaqCategory {
  id: string;
  title: string;
  description: string;
  image: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFaqCategoryForm {
  title: IFormErrorMessage;
  description: IFormErrorMessage;
  image_alternative_text: IFormErrorMessage;
}
