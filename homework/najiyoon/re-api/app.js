import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//api 스펙 보고 작성
const users = [
  {
    id: 1,
    email: "nana@naver.com",
    password: "nana",
    role: "학생",
    name: "nana",
  },
];

const secretKey = "sdhtfgwgrljkw";

const TodoItems = [
  {
    id: 1,
    userId: 1,
    title: "할일1",
    doneAt: "2021-08-01",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 2,
    userId: 1,
    title: "할일2",
    doneAt: "2021-08-01",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 다시 확인 할 것 ; 배열이므로 ; 유저아이디 처럼
const getIncrementedId = (arr) => {
  return arr[TodoItems.length - 1] ? arr[TodoItems.length - 1].id + 1 : 1;
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(400).json({ message: "인증정보가 틀렸습니다." });
  }
};

//아이디 하나 조회
const validateTodoitemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("id가 숫자가 아닙니다.");
  }
  return idAsNumber;
};
//!!!!주석처리!!!!!

const getTodoItemsById = (id) => {
  console.log(getTodoItemsById);
  console.log(id);
  const todoItem = TodoItems.find((todoItem) => todoItem.id === id);
  console.log(todoItem);
  if (!todoItem) {
    throw new Error("찾을수 없음");
  }
  console.log("todoItem-->", todoItem);
  return todoItem;
};

//회원가입, 로그인, 인증 : 리턴확인
//회원가입 :
app.post("/sign-up", (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  //바디로 받는 정보가 다 있는지
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).json({
      message: "정보를 모두 입력해주세요",
    });
    return;
  }
  //등록된 유저의 이메일이 이미 있다면 **
  const existingUser = users.find((users) => users.email === email);
  if (existingUser) {
    res.status(400).json({
      message: "이미 등록된 사용자 입니다.",
    });
    return;
  }
  //비밀번호와 비밀번호 확인이 일치
  if (password !== rePassword) {
    res.status(409).json({
      message: "비밀번호가 일치하지 않습니다.",
    });
    return;
  }
  //회원가입진행 유저만들기 : 반환, 푸쉬, userid
  //id 넣어주기 삼항 유저가 아무도 없다면 1 : 그렇지 않으면 +1= 아이디
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
  const newUser = { id, email, password, rePassword, role, name };
  res.json(newUser);
  users.push(newUser);
});

//로그인 - email, password / res : token
app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;
  //이메일과 비밀번호가 유저의 정보와 일치하는지 //users 와 바디에서 받은 정보
  //   console.log(user.email);
  //   console.log(users.password);
  //   console.log(users);
  //   console.log(user);
  //users.find(user=> ??? 강의 다시 볼것...
  const { password: _password, ...user } = users.find(
    (users) => users.email === email && users.password === password
  );

  //토큰만들기
  const token = jwt.sign(user, secretKey);
  console.log("token-->", token);
  console.log("user-->", user);
  res.json({
    message: "로그인성공",
    token,
  });
  console.log(token);
  //
});

//내정보 가져오기 : 인증토큰 , 아이디 확인할 수 있게/ res : id, email, name, role, createdAT
app.get("/users/me", (req, res) => {
  //토큰으로 나인지 확인 : 토큰 verify
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    console.log("인증user-->", user);
    //user를 {로 감싸면} 로그인 후 정보가 안나오므로 풀어줄것
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "인증오류" });
    next(err);
  }
});

//할일목록들 조회 : 응답[] id, userid, title, doneAt, createdAt, updatedAt
app.get("/todo-items", authMiddleware, (req, res) => {
  console.log(req.user);
  const user = req.user;
  res.send(TodoItems.filter((TodoItems) => TodoItems.userId === user.id));
});
//할일목록 한개 조회 id, userid, title, doneAt, createdAt, updatedAt
app.get("/todo-items/;id", authMiddleware, (req, res) => {
  const id = validateTodoitemId(req);
  const TodoItems = getTodoItemsById(id);
  res.send(TodoItems);
});

//할일목록들 조회 : 키워드로 : 필터 / 완료
// app.get("/todo-items/search/:keyword", authMiddleware, (req, res) => {
//     const user = req.user;
//     TodoItems.filter(키워드)
// });
//할일등록 req: title :미들웨어
app.post("/todo-items", authMiddleware, (req, res) => {
  const user = req.user;
  const { title } = req.body;
  const newId = getIncrementedId(TodoItems);
  const newTodoItem = {
    id: newId,
    userId: user.id,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: "2021-08-01",
  };

  TodoItems.push(newTodoItem);
  res.send(newTodoItem);
});

//할일 수정 : res. result
app.put("/todo-items/:id", authMiddleware, (req, res) => {
  const id = validateTodoitemId(req);
  const selectedTodoItem = getTodoItemsById(id);
  const todoItemIndex = TodoItems.indexOf(selectedTodoItem);
  TodoItems.splice(todoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt: selectedTodoItem.doneAt == null ? new Date() : null,
  });
  res.send({ result: true });
});

//할일 삭제
app.delete("/todo-items/:id", authMiddleware, (req, res) => {
  console.log(req.params);
  const id = validateTodoitemId(req);
  const selectedTodoItem = getTodoItemsById(id);
  const indexToDelete = TodoItems.indexOf(selectedTodoItem);

  TodoItems.splice(indexToDelete, 1);
  res.send({ result: true });
});

const errorMiddleware = (err, req, res, next) => {
  //err message
  res.status(500).json({ message: "에러입니다." });
};

app.listen(PORT, () => console.log(PORT, "서버열림"));
