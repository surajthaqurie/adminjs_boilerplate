import { NextFunction, Request, Response } from "express";

import { setting_service } from "../services";
import { ICommonResponse, ISetting } from "src/interfaces";
import { catchAsync } from "src/utility";

const getSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ICommonResponse<ISetting[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const settings = await setting_service.getSettings(page, itemNo);
  return res.json({
    success: true,
    data: settings
  });
  /* ************** Swagger Documentation  **************
    #swagger.tags = ['Settings']
    #swagger.description = 'Api for listing all settings.'
    #swagger.summary = 'Get all settings.'
    #swagger.operationId = 'getAllSettings'

    #swagger.responses[200] = {
      description: 'Successfully get all settings !!' ,
      schema: { $ref: '#/definitions/SettingList' }
    }
  ************** Swagger Documentation  ************** */
};

const getSettingsDetails = async (req: Request, res: Response, next: NextFunction) => {
  let key: string = req.params.key;

  const setting_details = await setting_service.getSettingsDetails(key);
  return res.json({
    success: true,
    data: setting_details
  });
  /* ************** Swagger Documentation  **************
    #swagger.tags = ['Settings']
    #swagger.description = 'Api for get setting detail.'
    #swagger.summary = 'Get setting detail.'
    #swagger.operationId = 'getSettingDetail'

    #swagger.responses[200] = {
      description: 'Successfully get setting detail !!' ,
      schema: { $ref: '#/definitions/SettingDetail' }
    }
  ************** Swagger Documentation  ************** */
};

export const setting_controller = {
  getSettings: catchAsync(getSettings),
  getSettingsDetails: catchAsync(getSettingsDetails)
};
