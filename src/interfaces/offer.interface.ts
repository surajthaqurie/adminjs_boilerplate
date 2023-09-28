import { IFormErrorMessage } from "./common.interface";

export interface IOffer {
  id: string;
  amount: number;
  bonus: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOfferForm {
  amount: IFormErrorMessage;
  bonus: IFormErrorMessage;
}
