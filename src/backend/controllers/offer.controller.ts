import { NextFunction, Request, Response } from "express";
import { offer_service } from "../services";
import { ICommonResponse, IOffer, IPaginationResponse } from "src/interfaces";
import { catchAsync } from "src/utility";

const getOffers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ICommonResponse<IPaginationResponse<IOffer>>> => {
  const response = await offer_service.getOffers();

  return res.status(200).json({
    success: true,
    total_count: response.total_count,
    data: response.data
  });
  /* ************** Swagger Documentation  **************
    #swagger.tags = ['Offers']
    #swagger.description = 'Api for get all offers.'
    #swagger.summary = 'Get all offers.'
    #swagger.operationId = 'getOffers'

    #swagger.responses[200] = {
      description: 'Successfully get all offers !!' ,
      schema: { $ref: '#/definitions/OfferList' }
    }
  ************** Swagger Documentation  ************** */
};

export const offer_controller = {
  getOffers: catchAsync(getOffers)
};
