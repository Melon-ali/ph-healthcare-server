import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { Admin } from "@prisma/client";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AdminService.getAllFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin Data Fetched",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      error: error,
    });
  }
};

const getByIdFromDb = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.getByIdFromDb(id);
    res.status(200).json({
      success: true,
      message: "Admin Single Data Fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      error: error,
    });
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.updateIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: "Updateted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      error: error,
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.deleteFromDB(id);
    res.status(200).json({
      success: true,
      message: "Deleted Data From DB",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      error: error,
    });
  }
};

const softDeleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await AdminService.softDeleteFromDB(id);
    res.status(200).json({
      success: true,
      message: "Soft Deleted Data From DB",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      error: error,
    });
  }
};

export const AdminController = {
  getAllFromDB,
  getByIdFromDb,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB
};
