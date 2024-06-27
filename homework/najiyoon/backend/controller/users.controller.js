//db // 브랜치명 ref-service-repository
import users from "../db/users.js";
import jwt from "jsonwebtoken";

// import authMiddleware from "../middlewares/authMiddleware.js";

const secretkey = "rqjghakrovfdinvczfw";

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: "토큰없음" });
//   }
//   try {
//     req.user = jwt.verify(token, secretkey);
//     next();
//   } catch (error) {
//     res.status(400).json({ message: "등록실패" });
//   }
// };

export function postSignUp(req, res, next) {
  try {
    const { email, password, rePassword, role, name } = req.body;
    //정보를 다 기입했는지
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
    const alreadyEmail = users.find((users) => users.email === email);
    console.log(users.email);
    console.log(email);
    console.log(alreadyEmail);
    if (alreadyEmail) {
      res.status(409).json({
        message: "이미 있는 이메일",
      });
      return;
    }
    //회원가입진행 : 아이디만들기 / user 만들기
    const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
    const newUser = { id, email, password, role, name };

    //아니라면 가입
    users.push(newUser);
    res.json(newUser);
    next();
  } catch (err) {
    next(err);
  }
}
//------------//
export function postSignIn(req, res, next) {
  try {
    const { email, password } = req.body;
    //유저에서 찾은 이메일과 패스워드를 바디에서 받은 이메일과 패스워드에 비교하고 / 유저를 객체구조분해 할당해서 패스워드를 _패스워드에 담음 ;

    const { password: _password, ...user } = users.find(
      (users) => users.email === email && users.password === password
    );
    console.log("users.email-->", user.email);
    console.log(users.email);

    //맞다면 토큰만들기 : jwt, 패스워드만 넣으면 jwt.io에 다 보이므로..

    //****수정할것!!***  */
    const token = jwt.sign(user, secretkey);
    //반환
    res.status(200).json({
      message: "로그인성공",
      token,
    });
  } catch (err) {
    next(err);
  }
}

export function getUserMe(req, res, next) {
  const token = req.headers.authorization;
  const user = jwt.verify(token, secretkey);

  res.json(req.user);
}
