import { NextFunction, Request, Response } from "express";
import { twoFAValidation, twoFAVerifyValidation } from "../validations";
import { two_fa_service } from "../services";
import { AppError, catchAsync } from "src/utility";
import { ICommonResponse, IEnableDisableTwoFA } from "src/interfaces";

const setupTwoFA = async (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = twoFAValidation(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const { two_factor_auth, qr_code_url } = await two_fa_service.setupTwoFA(value);
  return res.json({
    success: true,
    data: { ...two_factor_auth, qr_code_url }
  });
};

const verifyTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<boolean>> => {
  const { error, value } = twoFAVerifyValidation(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  await two_fa_service.verifyTwoFA(value.userId, value.twoFAToken);
  return res.json({
    success: true,
    data: true
  });
};

const enableTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IEnableDisableTwoFA>> => {
  const { error, value } = twoFAVerifyValidation(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const enable_two_fa = await two_fa_service.enableTwoFA(value.userId, value.twoFAToken);
  return res.json({
    success: true,
    data: enable_two_fa
  });
};
const getTwoFAStatus = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<boolean>> => {
  const userId = req.params.id;

  const two_fa_status = await two_fa_service.getTwoFAStatus(userId);
  return res.json({
    success: true,
    data: two_fa_status
  });
};

const disableTwoFA = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IEnableDisableTwoFA>> => {
  const { error, value } = twoFAValidation(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const disable_two_fa = await two_fa_service.disableTwoFA(value.userId);
  return res.json({
    success: true,
    data: disable_two_fa
  });
};

export const two_fa_controller = {
  setupTwoFA: catchAsync(setupTwoFA),
  enableTwoFA: catchAsync(enableTwoFA),
  getTwoFAStatus: catchAsync(getTwoFAStatus),
  disableTwoFA: catchAsync(disableTwoFA),
  verifyTwoFA: catchAsync(verifyTwoFA)
};
