import { Admin, Doctor, Patient, Prisma, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";
import { Request } from "express";
import { IFile } from "../../interfaces/file";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { userSearchAbleFields } from "./user.constant";


const createAdmin = async (req: Request): Promise<Admin> => {

  const file = req.file as IFile;
  console.log(req.body)

  if(file){
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;

    console.log(req.body)
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  console.log({hashedPassword});

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createAdminData;
  });

  return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {

  const file = req.file as IFile;
  console.log(req.body)

  if(file){
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url;

    console.log(req.body)
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  console.log({hashedPassword});

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });

    return createDoctorData;
  });

  return result;
};
const createPatient = async (req: Request): Promise<Patient> => {

  const file = req.file as IFile;
  console.log(req.body)

  if(file){
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.patient.profilePhoto = uploadToCloudinary?.secure_url;

    console.log(req.body)
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  console.log({hashedPassword});

  const userData = {
    email: req.body.patient.email,
    password: hashedPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createPatientData = await transactionClient.patient.create({
      data: req.body.patient,
    });

    return createPatientData;
  });

  return result;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }


  // console.dir(andCondition, { depth: "infinity" });

  const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
};
