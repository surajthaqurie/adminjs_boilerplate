import { NextFunction, Request, Response } from "express";
import { faq_service } from "../services";
import { ICommonResponse, IFaq, IPaginationResponse } from "src/interfaces";
import { catchAsync } from "src/utility";

const getFAQs = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IPaginationResponse<IFaq>>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const faqs = await faq_service.getFAQs(page, itemNo);
  return res.json({
    success: true,
    ...faqs
  });
};

const getFAQByCategoryId = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IPaginationResponse<IFaq>>> => {
  const faqCategoryId = req.params.id;
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const faqs = await faq_service.getFAQByCategoryId(page, itemNo, faqCategoryId);

  return res.json({
    success: true,
    ...faqs
  });
};

export const faq_controller = {
  getFAQs: catchAsync(getFAQs),
  getFAQByCategoryId: catchAsync(getFAQByCategoryId)
};
