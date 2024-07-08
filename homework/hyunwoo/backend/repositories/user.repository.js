// import usersDB from "../db/users.js";
import conn from "../common/conn.js";
import prisma from "../common/prisma.js";

// user email 찾기
export async function findOne(email) {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });
  return user;
}

// user 저장하기
export async function createUser(userData) {
  const newUser = await prisma.users.create({
    data: {
      email: userData.email,
      password: userData.password,
      role: userData.role,
      name: userData.name,
    },
  });
  return newUser;
}
