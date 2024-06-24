// import { postSignUp } from "../controller/users.controller";
import { postSignUp } from "../repository/users.repository.js";
import { users } from "../db/users.js";

postSignUp = async (email, password, rePassword, role, name) => {
  const user = await users.usersRepository.find(
    email,
    password,
    rePassword,
    role,
    name
  );
  if (!user) {
    res.status(400).json({
      message: "정보를 다 기입해주세요",
    });
  }

  if (password !== rePassword) {
    res.status(400).json({
      message: "패스워드가 일치하지 않습니다.",
    });
  }

  const alreadyEmail = users.usersRepository.find(users, users.email);
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
};
