import prisma from "../common/prisma.js";

// user email 찾기
export async function findOne(email) {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  return user;
}

// user 저장하기
export async function createUser(userData) {
  const newUser = await prisma.user.create({
    data: {
      email: userData.email,
      password: userData.password,
      role: userData.role,
      name : userData.name,
    },
  });
  return newUser;
}
