import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";


const createAdmin = async (req: any) => {

  console.log("file: ", req.file)
  console.log("data:", req.body.data);

  const file = req.file;

  if(file){
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.data.admin.profileImage = uploadToCloudinary?.secure_url;

    console.log(req.body.data)
  }

  // const hashedPassword: string = await bcrypt.hash(data.password, 12);

  // console.log({hashedPassword});

  // const userData = {
  //   email: data.admin.email,
  //   password: hashedPassword,
  //   role: UserRole.ADMIN,
  // };

  // const result = await prisma.$transaction(async (transactionClient) => {
  //   await transactionClient.user.create({
  //     data: userData,
  //   });

  //   const createAdminData = await transactionClient.admin.create({
  //     data: data.admin,
  //   });

  //   return createAdminData;
  // });

  // return result;
};

export const userService = {
  createAdmin,
};
