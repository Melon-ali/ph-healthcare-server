import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllFromDB = async (params: any) => {
  const andCondition: Prisma.AdminWhereInput[] = [];

  const adminSearchAbleFields = ["name", "email"];

  if (params.searchTerm) {
    andCondition.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  console.dir(andCondition, { depth: "inifinity" });

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });

  return result;
};

export const AdminService = {
  getAllFromDB,
};
