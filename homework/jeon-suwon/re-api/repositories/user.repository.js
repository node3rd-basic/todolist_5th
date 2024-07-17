import { prisma } from "../untils/prisma.until.js";

export const signUp = async (email, password, role, name) => {
  const data = await prisma.users.create({
    data: {
      email,
      password,
      role,
      name,
    },
  });

  return data;
};

export const findEmailById = async (email) => {
  return await prisma.users.findFirst({
    where: { email },
  });
};
