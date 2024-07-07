import conn from "../common/conn.js";

export async function findUser(email) {
  const [users] = await conn.execute(`SELECT * FROM users WHERE email = '${email}'`)

  return users[0];
}

export async function pushUser(newUser) {
  const sql = `INSERT INTO users (email, password, name, role ) VALUES ('${newUser.email}', '${newUser.password}','${newUser.name}','${newUser.role}')`
  const result = await conn.execute(sql)
  return {
    id: result[0].insertId,
    ...newUser
  }
}

