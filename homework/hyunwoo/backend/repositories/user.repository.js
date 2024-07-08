// import usersDB from "../db/users.js";
import conn from "../common/conn.js";
import prisma from '../common/prisma.js';

// user email 찾기
export async function findOne(email) {
  const user = await prisma.users.findFirst({
    where: {
      email
    }
  })
  return user;
}

// user 저장하기
export async function createUser(userData) {
  const sql = `INSERT INTO users (email, password, name, role) VALUES ("${userData.email}", "${userData.password}", "${userData.name}", "${userData.role}")`;
  const result = await conn.execute(sql);
  return {
    id: result[0].insertId,
    ...userData,
  };
}
