import users from '../db/users.js'

// todoItem id 지정하기
const getIncrementedId = (arr) =>
  arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1;

function postSignUp (req, res, next) {
    const { email, password, rePassword, role, name } = req.body;

    if (!email || !password || !rePassword || !role || !name) {
      res.status(400).send({
        result: false,
        message: "모든 항목을 입력해주세요.",
      });
      return;
    }
  
    if (password !== rePassword) {
      res.status(400).send({
        result: false,
        message: "입력한 비밀번호가 일치하지 않습니다.",
      });
      return;
    }
  
    const existingEmail = users.find((user) => user.email === email);
  
    if (existingEmail) {
      res.status(409).send({
        result: false,
        message: "이미 등록된 이메일입니다.",
      });
    }
  
    const id = getIncrementedId(users);
  
    const newUser = {
      id,
      email,
      password,
      role,
      name,
    };
    users.push(newUser);
    res.status(200).json(newUser);
}

export default { postSignUp }