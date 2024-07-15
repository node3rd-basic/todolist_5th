import conn from "../common/conn.js";

export async function findUser(email) {
  const sql = `SELECT * FROM users WHERE email = ?`
  const [users] = await conn.execute(sql, [email])

  return users[0];
}

export async function pushUser(newUser) {
  const sql = `INSERT INTO users (email, password, name, role ) VALUES (?, ?, ?, ?)`
  const result = await conn.execute(sql,[newUser.email, newUser.password, newUser.name, newUser.role])
  return {
    id: result[0].insertId,
    ...newUser
  }
}

