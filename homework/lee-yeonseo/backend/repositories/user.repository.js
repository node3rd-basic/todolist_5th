import prisma from '../common/prisma.js';

export const findUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({ where: { email } });

  return user;
};

export const createUser = async (userData) => {
  const newUser = await prisma.user.create({
    data: {
      email: userData.email,
      password: userData.password,
      role: userData.role,
      name: userData.name,
    },
  });

  return newUser;
};
