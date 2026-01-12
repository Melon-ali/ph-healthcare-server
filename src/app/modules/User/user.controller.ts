import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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
});

const createDoctor = (async (req: Request, res: Response, next: NextFunction) => {
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
});

const createPatient = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    //   console.log(req.body);
    const result = await userService.createPatient(req);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Patient Createted Successfuly!",
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Data Fetched",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await userService.changeProfileStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {

  const user = req.user;

  const result = await userService.getMyProfile(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My profile data fetched successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {

  const user = req.user;

  const result = await userService.updateMyProfile(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My profile Updated successfully",
    data: result,
  });
});

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
