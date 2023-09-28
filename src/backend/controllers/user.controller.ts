import { NextFunction, Request, Response } from "express";
import { user_service } from "../services";
import { ICommonResponse, IUser } from "src/interfaces";
import { changePasswordValidation } from "../validations";
import { AppError, catchAsync } from "src/utility";

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IUser[]>> => {
  let page: number = parseInt(req.query.page as string);
  let itemNo: number = parseInt(req.query.itemNo as string);

  const users = await user_service.getUsers(page, itemNo);

  return res.json({
    success: true,
    ...users
  });
};

const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<ICommonResponse<IUser>> => {
  const userId = req.params.id;
  const { error, value } = changePasswordValidation(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  const user = await user_service.changePassword(userId, value);
  return res.json({
    success: true,
    data: user
  });
};

export const user_controller = {
  getUsers: catchAsync(getUsers),
  changePassword: catchAsync(changePassword)
};
