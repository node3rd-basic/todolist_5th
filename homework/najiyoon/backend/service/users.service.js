import "dotenv/config";
// import users from "../db/users.js";
import * as usersRepository from "../repository/users.repository.js";
import jwt from "jsonwebtoken";

//헷갈리니 매개변수로 뭘할건지 함수명으로 표현할것

export function getNewUser(email, role, name, password, rePassword) {
  // 정보를 다 기입했는지
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).json({
      message: "정보를 다 기입해주세요",
    });
  }

  //패스워드 맞는지
  if (password !== rePassword) {
    res.status(400).json({
      message: "패스워드가 일치하지 않습니다.",
    });
  }
  //이메일 중복확인 유저의 이메일을 찾는다. 유저정보에서 찾은 정보의 이메일과 받은 이메일이 같은지
  //레파지토리에 다녀오는 통로 : 이메일 매개변수로 넘겨주고
  const alreadyEmail = usersRepository.findUserByEmail(email);

  if (alreadyEmail) {
    res.status(409).json({
      message: "이미 있는 이메일",
    });
    return;
  }
  //회원가입진행 : 아이디만들기 / user 만들기 레파지토리로 가야하나
  //
  const id = usersRepository.checkAlreadyId();

  // users.length === 0 ? 1 : users[users.length - 1].id + 1;
  //repository에서 넘겨받은 newUser는 postNewUser(id...에 담겨왔고,)
  //그걸 newUser에 넘김
  const newUser = usersRepository.postNewUser(id, email, role, name, password);
  return newUser;
}

export function signIn(email, password) {
  //email, password 맞는지 확인후 토큰발급?

  const userInfo = usersRepository.postUser(email, password);
  if (!userInfo) {
    res.status(400).json({ message: "틀림" });
    return;
  }
  // console.log(userInfo);
  const token = jwt.sign(userInfo, process.env.JWT_SECRET_KEY);
  // console.log(token);
  //   const { password: _password, ...user } = users.find(
  //     (users) => users.email === email && users.password === password
  //   );
  //이메일 맞는지 & 패스워드 맞는지 근데 인증 후 결과로 패스워드를 숨김

  //token

  return { token };
  //
}

export function getUserMe(token) {
  // const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(user);
  return user;
}
// postSignIn = async (email, password, users) => {
//   // addUser

//   //맞다면 토큰만들기 : jwt, 패스워드만 넣으면 jwt.io에 다 보이므로..

//   //****수정할것!!***  */

// };
