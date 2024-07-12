import conn from "../common/conn.js";

// 이메일 중복 화인
export async function findUserByEmail(email) {
  const sql = `SELECT * FROM users WHERE email = ?`;

  // console.log("sql@@@@@@", sql);

  const [users] = await conn.execute(sql, [email]);

  return users[0]; // users의 첫번쨰 요소를 가져온다.
}

// 새로운 유저 등록
export async function pushNewUser(newUser) {
  const sql = `INSERT INTO users (email, password, role, name) VALUES (:email, :password, :role, :name)`;

  // console.log("sql 결과값!!", sql);

  await conn.execute(sql, newUser);
}

export async function findUser(email, password) {
  const sql = `SELECT * from users where (email, password) = ( ?, ?)`;

  // console.log("sql", sql);

  const [result] = await conn.execute(sql, [email, password]);

  // 여기 확인필요!

  // console.log("result", result);

  return result[0];
}
