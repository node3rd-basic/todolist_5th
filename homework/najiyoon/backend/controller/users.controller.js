//db // 브랜치명 ref-service-repository
import users from "../db/users.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import * as usersService from "../service/users.service.js";
//헷갈리니 api이름으로 함수명 작성할 것

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
    const { email, role, name, password, rePassword } = req.body;
    //받은 데이터 매개변수로 넘겨주고, 서비스와 연결통로
    const newUser = usersService.getNewUser(
      email,
      role,
      name,
      password,
      rePassword
    );

    //아니라면 가입

    res.status(201).json({
      status: 201,
      message: "회원가입 성공",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
}
//------------//

export function postSignIn(req, res, next) {
  try {
    const { email, password } = req.body;
    //유저에서 찾은 이메일과 패스워드를 바디에서 받은 이메일과 패스워드에 비교하고 / 유저를 객체구조분해 할당해서 패스워드를 _패스워드에 담음 ;
    //서비스와 연결
    const signInUser = usersService.signIn(email, password);

    res.status(200).json({
      message: "로그인성공",
      // data: signInUser,
      token: signInUser.token,
    });
  } catch (err) {
    next(err);
  }
}
export function getUserMe(req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "토큰 없음" });
    }

    const user = usersService.getUserMe(token);
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
