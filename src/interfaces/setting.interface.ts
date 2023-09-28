import { IFormErrorMessage } from "./common.interface";

export interface ISetting {
  id: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISettingForm {
  key: IFormErrorMessage;
  value: IFormErrorMessage;
}
