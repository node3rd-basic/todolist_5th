//**기본 세팅 : yarn 설치 : 안했다면

// //**기본세팅1 : import , app
// import express from "express";
// import cors from "cors";
// import jwt from "jsonwebtoken";
// import authMiddleware from "./middlewares/authMiddleware.js";

// //db
// import users from "./db/users.js";
// import todoItems from "./db/todoitems.js";
// //controller
// import * as todoItemsController from "./controller/todoitems.controller.js";
// import * as usersController from "./controller/users.controller.js";

// const app = express();
// const PORT = 3000;

// app.get("/", (req, res) => {
//   res.send("hello");
// });
// console.log(users);
// console.log(todoItems);
// app.use(cors());
// app.use(express.json());
// app.use(authMiddleware);

// const secretkey = "rqjghakrovfdinvczfw";

// //**회원가입 : 주소, 필요정보 기입할 것 : email, password, rePassword, role, name
// app.post("/sign-up", usersController.postSignUp);
// //**로그인 : 주소, body : email, password
// app.post("/sign-in", usersController.postSignIn);

// //**인증 토큰으로 인증; 헤더
// app.get("/users/me", authMiddleware, usersController.getUserMe);

// //**할일목록 - 등록 //함수자체를 보내야함. '실행결과()' 말고
// app.post("/todo-items", authMiddleware, todoItemsController.postTodoItem);
// //**할일목록 - 목록조회: 그런데 내 아잉디를 n가지고 있는 ; 토큰;토큰이 유효하지 않다면?:서버꺼지지않게
// app.get("/todo-items", authMiddleware, todoItemsController.getTodoItems);
// //**할잉ㄹ목록 - 목록1개 조회 : 내 아이디에서 목록번호1개:id
// app.get("/todo-items/:id", authMiddleware, todoItemsController.getTodoItem);
// //** 할일목록- 수정:id/업데이트 메서드 : 내 아이디, 내가 원하는 수정목록1개
// app.put("/todo-items/:id", authMiddleware, todoItemsController.putTodoItem);

// //**할일목록 - 삭제:id/삭제하는 메서드
// app.delete("/todo-items/:id", authMiddleware, todoItemsController.delTodoItem);

// //미들웨어 하나 만들기

// app.listen(PORT, () => {
//   console.log(PORT, "포트열림:)");
// });

//
//**기본 세팅 : yarn 설치 : 안했다면

//**기본세팅1 : import , app
import express from "express";
import "dotenv/config";
import cors from "cors";
import jwt from "jsonwebtoken";
import authMiddleware from "./middlewares/authMiddleware.js";

//db
import users from "./db/users.js";
import todoItems from "./db/todoitems.js";
//controller
import * as todoItemsController from "./controller/todoitems.controller.js";
import * as usersController from "./controller/users.controller.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(cors());
app.use(express.json());

//**api 참고 : 필요한것 볼 것 & 할일목록, 회원정보 기입
// const todoItems = [
//   {
//     id: 1,
//     userId: 1,
//     title: "할일목록",
//     doneAt: null,
//     createdAt: "2023-11-11",
//     updatedAt: "2023-11-11",
//   },
// ];
// const users = [
//   {
//     id: 1,
//     email: "nana@naver.com",
//     role: "학생",
//     password: "nana",
//     name: "nana",
//   },
// ];

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

//**회원가입 : 주소, 필요정보 기입할 것 : email, password, rePassword, role, name
app.post(
  "/sign-up",
  usersController.postSignUp
  //   (req, res, next) => {
  //   const { email, password, rePassword, role, name } = req.body;
  //   //정보를 다 기입했는지
  //   if (!email || !password || !rePassword || !role || !name) {
  //     res.status(400).json({
  //       message: "정보를 다 기입해주세요",
  //     });
  //   }

  //   //패스워드 맞는지
  //   if (password !== rePassword) {
  //     res.status(400).json({
  //       message: "패스워드가 일치하지 않습니다.",
  //     });
  //   }
  //   //이메일 중복확인 유저의 이메일을 찾는다. 유저정보에서 찾은 정보의 이메일과 받은 이메일이 같은지
  //   const alreadyEmail = users.find((users) => users.email === email);
  //   console.log("users.email->", users.email);
  //   console.log("email->", email);
  //   console.log("alreadyEmail", alreadyEmail);
  //   if (alreadyEmail) {
  //     res.status(409).json({
  //       message: "이미 있는 이메일",
  //     });
  //   }
  //   console.log("alreadyEmail", alreadyEmail);
  //   //회원가입진행 : 아이디만들기 / user 만들기
  //   const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
  //   const newUser = { id, email, password, role, name };

  //   //아니라면 가입
  //   users.push(newUser);
  //   res.json(newUser);
  // }
);
// //**로그인 : 주소, body : email, password
app.post(
  "/sign-in",
  usersController.postSignIn
  //   (req, res, next) => {
  //   const { email, password } = req.body;
  //   //유저에서 찾은 이메일과 패스워드를 바디에서 받은 이메일과 패스워드에 비교하고 / 유저를 객체구조분해 할당해서 패스워드를 _패스워드에 담음 ;

  //   const { password: _password, ...user } = users.find(
  //     (users) => users.email === email && users.password === password
  //   );
  //   console.log("users.email-->", user.email);
  //   console.log(users.email);

  //   //맞다면 토큰만들기 : jwt, 패스워드만 넣으면 jwt.io에 다 보이므로..
  //   const token = jwt.sign(user, secretkey);
  //   //반환
  //   res.status(200).json({
  //     message: "로그인성공",
  //     token,
  //   });
  // }
);

//**인증 토큰으로 인증; 헤더

app.get(
  "/users/me",
  authMiddleware,
  usersController.getUserMe
  // (req, res, next) => {
  // const token = req.headers.authorization;
  // const user = jwt.verify(token, secretkey);

  // res.status(200).json(user);
  // }
);
//**할일목록 - 등록
app.post(
  "/todo-items",
  authMiddleware,
  todoItemsController.postTodoItem
  // (req, res) => {
  // //인증시 뭘로 인증할건지 그 인증할 것은 어디서 가져올건지
  // const user = req.user;
  // const { title } = req.body;

  // //새로운 할일이 없다면 1, 있다면 할일목록 +1 한 아이디
  // const newId = todoItems[todoItems.length - 1]
  //   ? todoItems[todoItems.length - 1].id + 1
  //   : 1;

  // const newTodoItem = {
  //   id: newId,
  //   userId: user.id,
  //   title: title,
  //   doneAt: null,
  //   createdAt: new Date(),
  //   updatedAt: "2021-08-01",
  // };

  // //등록  :푸쉬할 곳.push(푸쉬할 것)
  // todoItems.push(newTodoItem);
  // //결과반환 : 클라이언트에게 전달
  // res.send(newTodoItem);
  // }
);

//**할일목록 - 목록조회: 그런데 내 아잉디를 가지고 있는 ; 토큰;토큰이 유효하지 않다면?:서버꺼지지않게
app.get(
  "/todo-items",
  authMiddleware,
  todoItemsController.getTodoItems
  // (req, res, next) => {
  // const user = req.user;
  // //인증했다면 해당 유저의 아이디로userid 만들어진 할일todoitem 목록 찾아서filter 보내기res
  // res.send(todoItems.filter((todoItems) => todoItems.userId === user.id));

  // res.status(200).json({
  //   message: "목록조회에 성공했습니다.",
  // });
  // }
);

//**할잉ㄹ목록 - 목록1개 조회 : 내 아이디에서 목록번호1개:id
app.get(
  "/todo-items/:id",
  authMiddleware,
  todoItemsController.getTodoItem
  // (req, res, next) => {
  // //유저정보 가져 왔으니 user.id내가만든 할일todoitems 중에서 하나: 특정 할일id, 만 볼 수 있도록 :찾기
  // //근데 아이디는 숫자이고, :id에서 가져옴
  // const id = Number(req.params.id);

  // const oneTodoItem = todoItems.filter((todoItem) => todoItem.id === id);
  // //결과반환
  // res.send(oneTodoItem);
  // }
);
//** 할일목록- 수정:id/업데이트 메서드 : 내 아이디, 내가 원하는 수정목록1개
app.put(
  "/todo-items/:id",
  authMiddleware,
  todoItemsController.putTodoItem
  // (req, res, next) => {
  // //내가 원하는 할일 목록 아이디 찾기, 아이디는 숫자
  // const id = Number(req.params.id);
  // if (isNaN(id)) {
  //   res.status(400).send({
  //     result: false,
  //     message: "id 는 숫자여야 합니다.",
  //   });
  //   return;
  // }

  // //원하는 목록 중 todoItems.id할일 1개 찾기 : 내 할일목록에서 내가 원하는 번호의 목록 하나 수정하기
  // const reInPutTodoItem = todoItems.find((todoItems) => todoItems.id === id);
  // if (!reInPutTodoItem) {
  //   res.send({ message: "해당하는 게시글이 없습니다." });
  // }
  // //수정할 수식 : 내가 원하는 투두아이템 필요함 : reInPutTodoItem /
  // //indexof사용 이유 : 내가 수정할 위치에 splice로 수정하기 위함
  // //할일 완료 여부 : done / null이면 날짜로, 날짜면 null로
  // const putItemIndex = todoItems.indexOf(reInPutTodoItem);
  // console.log("putItemIndex--", putItemIndex);
  // console.log("reInPutTodoItem-->", reInPutTodoItem);
  // todoItems.splice(putItemIndex, 1, {
  //   ...reInPutTodoItem,
  //   doneAt: reInPutTodoItem.doneAt === null ? new Date() : null,
  // });

  // //반환
  // res.send({ result: true });
  // }
);

//**할일목록 - 삭제:id/삭제하는 메서드
app.delete(
  "/todo-items/:id",
  authMiddleware,
  todoItemsController.delTodoItem
  // (req, res) => {
  // ////내가 원하는 할일 목록 아이디 찾기, 아이디는 숫자
  // const id = Number(req.params.id);
  // if (isNaN(id)) {
  //   res.status(400).send({
  //     result: false,
  //     message: "id 는 숫자여야 합니다.",
  //   });
  // }
  // //삭제하기: 할일이 없을 경우 -1 반환하는 것 생각
  // const delTodoItem = todoItems.findIndex((todoItems) => todoItems.id === id);
  // if (delTodoItem === -1) {
  //   res.status(400).json({ message: "해당하는 할일이 없습니다." });
  // }

  // //할일이 있다면 반환 : 자르기
  // todoItems.splice(delTodoItem, 1);
  // res.send({ result: true });
  // }
);

//미들웨어 하나 만들기

app.listen(PORT, () => {
  console.log(PORT, "포트열림:)");
});
