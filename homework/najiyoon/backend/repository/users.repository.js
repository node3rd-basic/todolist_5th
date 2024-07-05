import conn from "../common/conn.js";
//헷갈리니 data

//기존 자체 디비사용했을 때

export async function findUserByEmail(email) {
  const [users] = await conn.execute(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);

  // return data;
  return users[0];
}

export async function postNewUser(email, role, name, password) {
  const sql = `INSERT INTO users (email, role, name, password) VALUES (:email, :role, :name, :password)`;
  console.log("sql->", sql);
  const result = await conn.execute(sql, { email, role, name, password });
  console.log("result->", result);

  return {
    id: result[0].insertId,
    email,
    role,
    name,
  };
}

//로그인//
export async function postUser(email, password) {
  const sql = `select * from users where (email = ? AND password = ?)`;
  const [users] = await conn.execute(sql, [email, password]);

  console.log("users--->", users);
  // findfirst
  return users[0];
}
