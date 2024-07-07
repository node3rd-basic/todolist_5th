import prisma from "../common/prisma.js";

//이미 가입한 회원인지
export async function findUserByEmail(email) {
  return await prisma.User.findFirst({
    where: {
      email,
    },
  });
}
//회원가입
export async function postNewUser(email, role, name, password) {
  const newUser = await prisma.User.create({
    data: {
      email: email,
      role: role,
      name: name,
      password: password,
    },
  });
  return newUser;
}

//로그인//
export async function postUser(email, password) {
  const signUser = prisma.user.findFirst({
    where: { email, password },
  });
  return signUser;
}
