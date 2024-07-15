import conn from "../common/conn.js";

export async function findUserByEmail(email) {
  // console.log("@@@@@@@@@@@@@", email);
  const [users] = await conn.execute(
    // 하나만 가져오겠지만 여러명을 가져올 수 있으니까 배열( [] )에 담아놓는다.
    `SELECT * FROM users WHERE email = "${email}"`
  );

  // console.log("users", users);

  return users[0]; // users의 첫번쨰 요소를 가져온다.
}

// 새로운 유저 등록
export async function pushNewUser(newUser) {
  const sql = `INSERT INTO users (email, password, name, role) VALUES ("${newUser.email}", "${newUser.password}", "${newUser.name}", "${newUser.role}" )`;

  // console.log("sql 결과값!!", sql);

  await conn.execute(sql);

  // console.log("result 결과값!!", result);
  // return userDB.push(newUser);
}

export async function findUser(email, password) {
  const sql = `SELECT * from users where (email, password) = ("${email}", "${password}")`;

  // console.log("sql", sql);

  const [result] = await conn.execute(sql);

  // console.log("result", result);

  return result[0];
}
