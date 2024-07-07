import "dotenv/config";
// import users from "../db/users.js";
import * as usersRepository from "../repository/users.repository.js";
import jwt from "jsonwebtoken";
import customError from "../common/custom.error.js";

//헷갈리니 매개변수로 뭘할건지 함수명으로 표현할것

export async function getNewUser(email, role, name, password, rePassword) {
  //이메일 중복확인 유저의 이메일을 찾는다. 유저정보에서 찾은 정보의 이메일과 받은 이메일이 같은지
  //레파지토리에 다녀오는 통로 : 이메일 매개변수로 넘겨주고
  const alreadyEmail = await usersRepository.findUserByEmail(email);

  if (alreadyEmail) {
    throw new customError("이미 가입된 정보입니다.", 409);
  }
  //회원가입진행 : 아이디만들기 / user 만들기 레파지토리로 가야하나
  //id 지움
  // const id = usersRepository.checkAlreadyId();

  // users.length === 0 ? 1 : users[users.length - 1].id + 1;
  //repository에서 넘겨받은 newUser는 postNewUser(id...에 담겨왔고,)
  //그걸 newUser에 넘김
  const newUser = await usersRepository.postNewUser(
    // id,
    email,
    role,
    name,
    password
  );
  return newUser;
}

export async function signIn(email, password) {
  //email, password 맞는지 확인후 토큰발급?

  const userInfo = await usersRepository.postUser(email, password);

  if (!userInfo) {
    throw new customError("정보가 일치하지 않습니다.", 404);
  }
  // userInfo에는 패스워드가 아직 있음.... 패스워드 뺀 정보를 유저에 넣음
  const { password: _password, ...user } = userInfo;

  const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
  console.log(token);
  return { token };
  //
}

// export function getUserMe(token) {
//   // const token = req.headers.authorization;
//   const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
//   console.log(user);
//   return user;
// }

export function validateUserInfo(email, role, name, password, rePassword) {
  // 정보를 다 기입했는지
  if (!email || !password || !rePassword || !role || !name) {
    throw new customError("입력값 확인해주세요", 400);
  }

  //패스워드 맞는지
  console.log("password->", password);
  console.log("rePassword->", rePassword);

  if (password !== rePassword) {
    throw new customError("패스워드가 일치하지 않습니다.", 409);
  }
}
