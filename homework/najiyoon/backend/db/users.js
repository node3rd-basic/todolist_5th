export default [
  {
    id: 1,
    email: "nana@naver.com",
    role: "학생",
    name: "nana",
    password: "nana",
  },
];

// export function postSignUp(req, res, next) {
//   try {
//     const { email, role, name, password, rePassword } = req.body;

//     // 정보를 다 기입했는지
//     if (!email || !password || !rePassword || !role || !name) {
//       res.status(400).json({
//         message: "정보를 다 기입해주세요",
//       });
//     }

//     //패스워드 맞는지
//     if (password !== rePassword) {
//       res.status(400).json({
//         message: "패스워드가 일치하지 않습니다.",
//       });
//     }
//     //이메일 중복확인 유저의 이메일을 찾는다. 유저정보에서 찾은 정보의 이메일과 받은 이메일이 같은지
//     const alreadyEmail = users.find((users) => users.email === email);
//     // console.log(users.email);
//     // console.log(email);
//     // console.log(alreadyEmail);
//     if (alreadyEmail) {
//       res.status(409).json({
//         message: "이미 있는 이메일",
//       });
//       return;
//     }
//     //회원가입진행 : 아이디만들기 / user 만들기
//     const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
//     const newUser = { id, email, role, name, password };

//     //아니라면 가입
//     users.push(newUser);
//     res.json(newUser);
//     next();
//   } catch (err) {
//     next(err);
//   }
// }
// //------------//
// export function postSignIn(req, res, next) {
//   try {
//     const { email, password } = req.body;
//
//     const { password: _password, ...user } = users.find(
//       (users) => users.email === email && users.password === password
//     );
//     // //맞다면 토큰만들기 : jwt, 패스워드만 넣으면 jwt.io에 다 보이므로..

//     // const token = jwt.sign(user, secretkey);
//     // //반환
//     res.status(200).json({
//       message: "로그인성공",
//       token,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// export function getUserMe(req, res, next) {
//   const token = req.headers.authorization;
//   const user = jwt.verify(token, secretkey);

//   res.json(req.user);
// }
