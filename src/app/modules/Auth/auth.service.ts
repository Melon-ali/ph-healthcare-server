import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;

  try {
    decodedData = jwtHelpers.verifyToken(token, config.jwt.jwt_secret as Secret);
  } catch (err) {
    throw new Error("You are not authorized");
  }
  const uesrData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: uesrData.email,
      role: uesrData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: uesrData.needPasswordChange,
  };
};

const changePassword = async (user : any, payload : any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);
  
    console.log({hashedPassword});

    await prisma.user.update({
      where: {
        email: userData.email,        
      },
      data: {
        password: hashedPassword,
        needPasswordChange: false,
      },
    });

    return {
      message: "Password changed successfully",
    }
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {    
      email: payload.email,
      status: UserStatus.ACTIVE
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_pass_token as Secret,
    config.jwt.reset_pass_token_expires_in as string
  );

  console.log(resetPassToken);
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
};
