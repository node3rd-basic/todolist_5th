import { user } from "../db/user.db.js";
import jwt from "jsonwebtoken";

const secretKey = "BasicClass";

//회원가입
export const postSignup = (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  const emailExist = user.find((el) => el.email === email);

  if (emailExist) {
    res.status(400).send({ message: "존재하는 이메일입니다." });
    return;
  }
  if (password !== rePassword) {
    res.status(409).send({ message: "두 패스워드가 일치하지 않습니다." });
    return;
  }

  const userInfo = {
    userId: user.length > 0 ? user[user.length - 1].userId + 1 : 1,
    email,
    password,
    name,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  user.push(userInfo);
  return res.status(200).send({ message: "회원가입이 완료되었습니다." });
};
//로그인
export const postSignin = (req, res) => {
  const { email, password } = req.body;

  const findUser = user.find((el) => el.email === email);
  if (!findUser) {
    res.status(400).json({ message: "회원유저가 존재하지않습니다." });
    return;
  }
  if (findUser.password !== password) {
    res.status(409).json({ message: "패스워드가 일치하지않습니다." });
  }

  const token = jwt.sign(findUser, secretKey);
  res.status(200).json({ token });
  return;
};
//고객정보조회
export const getuser = (req, res) => {
  const userInfo = req.user;

  return res.status(200).json(userInfo);
};
