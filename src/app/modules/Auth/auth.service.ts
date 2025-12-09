import prisma from "../../../shared/prisma";
import * as bcypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const uesrData = await prisma.user.findFirstOrThrow({
    where: {
        email: payload.email,
    }
  });

  const isCorrectPassword: boolean = await bcypt.compare(payload.password, uesrData.password);

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }

  const accessToken = jwt.sign({
    email: uesrData.email,
    role: uesrData.role,
  }, 'abcdefg', 
{
    algorithm: 'HS256',
    expiresIn: '5m',
})

const refreshToken = jwt.sign({
    email: uesrData.email,
    role: uesrData.role,
  }, 'abcdefgh', 
{
    algorithm: 'HS256',
    expiresIn: '30m',
})

  return {
    accessToken,
    refreshToken,
    needPasswordChange: uesrData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
