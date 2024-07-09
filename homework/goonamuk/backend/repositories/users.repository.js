import conn from "../common/conn.js";

// 이미 가입된 이메일 존재하는지 확인
// 중복 이메일 가입시 409 에러처리

export const findByEmail = async (email) => {
  //SELECT * FROM users WHERE email =? >>> user테이블의 모든 column을 조회해서, email이 입력받은 값과 일치하는 user가 있는지 체크
  const sql = `SELECT * FROM users WHERE email =?`;
  //users 배열에, sql쿼리로 가져온, email이 입력한 값과 일치하는 data를 넣어라
  const [users] = await conn.execute(sql, [email]);

  //그렇게 데이터를 넣은 배열에서 가장 첫 번째 데이터를 반환해라.
  return users[0];
};

export const findByEmailAndPassword = async (email, password) => {
  // const findByEmail = await conn.execute(
  //   `SELECT email FROM users WHERE email = ?`,
  //   [email]
  // );
  // const findByPassword = await conn.execute(
  //   `SELECT password FROM users WHERE password = ?`,
  //   [password]
  // );

  // console.log(`email : ${findByEmail}, password : ${findByPassword}`);
  // if (findByEmail !== email || findByPassword !== password) {
  //   throw new Error({ message: `이메일 혹은 비밀번호가 일치하지 않습니다.` });
  // }

  const [findedUser] = await conn.execute(
    `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`
  );
  // console.log("findedUser in repository :", findedUser);
  return findedUser[0];
};

// users 배열에 회원정보 추가 하기
export function saveUser(user) {
  conn.execute(
    `INSERT INTO users (email, name, password, role) values ('${user.email}', '${user.name}', '${user.password}', '${user.role}')`
  );

  return user;
}
