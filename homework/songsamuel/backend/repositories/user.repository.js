import prisma from "../common/prisma.js";

// 이메일 중복 화인
export async function findUserByEmail(email) {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

// 새로운 유저 등록
export async function pushNewUser(newUser) {
  return await prisma.user.create({
    data: {
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      name: newUser.name,
    },
  });
}

export async function findUser(email, password) {
  return await prisma.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
}
