import usersDB from "../db/users.js";
import conn from "../common/conn.js";
//헷갈리니 data

//기존 자체 디비사용했을 때
// export function findUserByEmail(email) {
//   const data = usersDB.find((usersDB) => usersDB.email === email);
export async function findUserByEmail(email) {
  const [users] = await conn.execute(
    `SELECT * FROM users WHERE email = '${email}'`
  );

  // return data;
  return users[0];
}

//위에꺼 대신에
// export function checkAlreadyId() {
//   return usersDB.length === 0 ? 1 : usersDB[usersDB.length - 1].id + 1;
// }
//id지움
export async function postNewUser(email, role, name, password) {
  const sql = `INSERT INTO users (email, role, name, password) VALUES ('${email}','${role}', '${name}', '${password}')`;
  console.log("sql->", sql);
  const result = await conn.execute(sql);
  console.log("result->", result);

  //user는 테이블.  INSERT INTO는 명령어 (어떤필드)에 /어떤 데이터를 각각 넣는지
  // await conn.execute(`
  //   INSERT INTO users (id, email, role, name, password) VALUES ('${user.id}','${user.email}', '${user.password}','${user.role}', '${user.name}')`);
  // //db에 저장하는거
  // usersDB.push(newUser);
  // //일단은 서비스로 넘겨주는 것
  // return result;
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

  // const foundUser = await usersDB.find(
  //   (userDB) => userDB.email === email && userDB.password === password
  // );
  // if (!foundUser) {
  //   return null;
  // }
  // const { password: _password, ...user } = foundUser;
  console.log("users--->", users);
  // findfirst
  return users[0];
}
