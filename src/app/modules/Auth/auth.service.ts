import { UserStatus } from "@prisma/client";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcypt from "bcrypt";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const uesrData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE
    },
  });

  const isCorrectPassword: boolean = await bcypt.compare(
    payload.password,
    uesrData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: uesrData.email,
      role: uesrData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
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

export const AuthServices = {
  loginUser,
  refreshToken,
};
