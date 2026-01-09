import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //   console.log(req.body);
    const result = await userService.createAdmin(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Createted Successfuly!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createDoctor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //   console.log(req.body);
    const result = await userService.createDoctor(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Createted Successfuly!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createAdmin,
  createDoctor,
};
