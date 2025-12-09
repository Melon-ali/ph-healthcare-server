import { jwtHelpers } from "../../../helpars/jwtHelpers";
import prisma from "../../../shared/prisma";
import * as bcypt from "bcrypt";

const loginUser = async (payload: { email: string; password: string }) => {
  const uesrData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
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
    "abcdefg",
    "5m"
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: uesrData.email,
      role: uesrData.role,
    },
    "abcdefgh",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: uesrData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
