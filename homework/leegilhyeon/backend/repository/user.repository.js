import prisma from "../common/prisma.js";

export async function findUser(email) {
  return await prisma.User.findFirst({
    where: {
      email
    }
  })
  // const sql = `SELECT * FROM users WHERE email = ?`
  // const [users] = await conn.execute(sql, [email])

  // return users[0];
}

export async function pushUser(newUser) {
  const createUser = await prisma.User.create({
      data: {email: newUser.email,
            password: newUser.password,
            name: newUser.name,
            role: newUser.role,}}      

  )

  return createUser
  // const sql = `INSERT INTO users (email, password, name, role ) VALUES (?, ?, ?, ?)`
  // const result = await conn.execute(sql,[newUser.email, newUser.password, newUser.name, newUser.role])
  // return {
  //   id: result[0].insertId,
  //   ...newUser
  // }
}

