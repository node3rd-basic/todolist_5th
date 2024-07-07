import { conn } from "../common/db.js";
import { prisma } from "../untils/prisma.until.js";

export const signUp = async (email, password, role, name) => {
  const data = await prisma.Users.create({
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
  return await prisma.Users.findFirst({
    where: { email },
  });
};

export const findUser = async (email) => {
  const [findUser] = await conn.execute(
    `SELECT * FROM users WHERE email = "${email}"`
  );
  return findUser[0];
};
