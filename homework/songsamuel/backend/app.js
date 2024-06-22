import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // 브라우져나 express에서 받은 데이터들을 (ex) req.body 데이터들 ) json으로 바꾸기 위해서 사용
// app.use(leaveLog); // 모든 요청에 대해서 로그가 찍히게 만든다.
// 이것을 안쓰면 데이터를 읽지 못한다.

const leaveLog = (req, res, next) => {
  console.log(`
      ${req.method} ${req.url} [${new Date().toISOString()}] ${
    req.headers.referer
  }`);
  next();
};

// 에러처리 미들웨어!
const errorMiddleware = (err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
};

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    req.user = jwt.verify(token, secretKey);
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).send({ message: "권한이 없습니다." });
  }
};

const validateTodoItemId = (req) => {
  const idAsNumber = Number(req.params.id);
  if (isNaN(idAsNumber)) {
    throw new Error("Id는 숫자여야합니다.");
  }

  return idAsNumber;
};

const getTodoItemById = (id) => {
  const todoItem = todoItems.find((todoItem) => todoItems.id === id);
  if (!todoItem) {
    throw new Error("Todo item not found");
  }

  return todoItem;
};

// 사실 속에 return문도 들어 있다.
// 화살표 함수의 축약형 형태로 작성되었기 때문에 {}랑 같이 생략된 것
// 설명 arr[todoItems.length - 1] 에서 todoItems.length = 2, 2 - 1은 1 => arr[1]요소
// 즉 arr이 가지고 있는 마지막 요소가 존재하는가?
// 배열에 마지막 요소가 있어? (todoItems[todoItems.length - 1])
// ? 있으면 +1을 해!
// : 아니면 1 이라고 해!    <- 이렇게 이해해야 한다.
// 정확히는 todoItems[0]은 { id: 1, ...}을 의미 따라서 [0 - 1] => [-1] 은 애초에 todoItems 속 요소가 없다는 것을 의미
// 그렇기 때문에 [todoItems.length - 1] 의 값이 -1이 아니라면 id 값에 + 1을 하고 아니라면 id 를 1이라고 해서 id 값 위치에 넣어서 요소를 탄생 시켜라가 된다.

const getIncrementedId = (arr) =>
  arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1;

// 할일 목록 전역 변수 설정 // 그리고 이게 DB 대신에 쓰는 것이다.
const todoItems = [
  {
    id: 1,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 2,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 목록 조회 API 만들기
app.get("/todo-items", authMiddleware, (req, res) => {
  const user = req.user;

  res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
});

// 목록 추가 API
app.post("/todo-items", authMiddleware, (req, res) => {
  const { title } = req.body;

  const user = req.user;

  const newId = getIncrementedId(todoItems);

  const newItem = {
    id: newId,
    userId: user.id,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newItem);
  res.send(newItem);
});

// 목록 상세 조회 API

app.get("/todo-items/:id", authMiddleware, (req, res) => {
  const id = validateTodoItemId(req);
  const todoItem = getTodoItemById(id);
  res.send(todoItem);
});

// 목록 수정 APi (7차 강의)

app.put("/todo-items/:id", authMiddleware, (req, res, next) => {
  const id = validateTodoItemId(req);

  // :id로 입력 받은 값이 todoItems에 있는지 확인 작업
  // 여기서 이걸 쓰는 이유! const AddtodoItem에서 ...을 쓸 때 뽑아 쓸 {} 전체를 가져와야하니까 찾는 것!
  const checkTodoItem = getTodoItemById(id);

  // 수정될 id값이 어디인지 todoItems에서 찾는 작업 ex) :id가 3이면 3번위치 자리
  // 여기는 실질적인 객체{} 데이터가 아닌 위치만 찾는다.
  const todoItemsIndex = todoItems.indexOf(checkTodoItem);

  const newDoneAt = checkTodoItem.doneAt === null ? new Date() : null;

  // 수정할 위치에서 자르고 수정할 값 넣는 작업.
  const addtodoItem = todoItems.splice(todoItemsIndex, 1, {
    ...checkTodoItem,
    doneAt: newDoneAt,
  });

  res.send({
    result: true,
    data: addtodoItem,
  });
});

// 할 일 목록들 중 하나 삭제 API

app.delete("/todo-items/:id", authMiddleware, (req, res, next) => {
  const id = validateTodoItemId(req);
  const selectedTodoItem = getTodoItemById(id);
  const indexTodoItem = todoItems.indexOf(selectedTodoItem);

  todoItems.splice(indexTodoItem, 1);

  res.send({
    result: true,
  });
});

// 8차 강의
const users = [
  {
    id: 1,
    email: "thdtkandpf@naver.com",
    password: "aaaa4321",
    role: "학생",
    name: "송사무엘",
  },
  {
    id: 2,
    email: "ssong@naver.com",
    password: "aaaa4321",
    role: "학생",
    name: "쏭쏭쏭",
  },
];

const secretKey = "돈 많이 벌고 싶다.";

// 회원가입 api
app.post("/sign-up", (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    res.send("입력값을 확인해 주세요.");
  }

  const existingUser = users.find((users) => users.email === email);
  if (existingUser) {
    res.status(409).send("이미 존재하는 이메일입니다.");
  }

  // 배열의 요소가 0개야? 맞으면 1이라고 해 : 아니면 맨 마지막에서 +1을 해
  const id = getIncrementedId(users);

  const newUser = {
    id,
    email,
    password,
    role,
    name,
  };

  users.push(newUser);

  res.json(newUser);
});

//로그인 APi
app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;

  // user 얘를 어디서 선언했지? (user)에서 변수로 지정한 것을 넣은 것이다. 순서가 이상한 것은 비구조화할당을 했기 때문에
  // 원래대로면 const user = = users.find 이렇게 갔다가 필요한 값인 {}만 뽑아서 쓸려고 이렇게 된 것!
  const { password: _password, ...user } = users.find(
    (user) => user.email === email && user.password === password
  );

  // const selectedUser = users.find(
  //   (user) => user.email === email && user.password === password
  // )

  // const { password: _password, ...user } = selectedUser

  if (!user) {
    res.send("존재하지 않는 유저입니다.");
    return;
  }

  // 로그인을 성공하면 토큰을 발급한다.
  const token = jwt.sign(user, secretKey);

  res.json({ token });
});

// 내 정보 조회
app.get("/users/me", authMiddleware, (req, res) => {
  // user에 관해서는 이미 authMiddleware에서 확인 및 정의를 함.
  res.send(req.user);
});

// 여기에 app.use가 있는 이유 위의 코드들이 에러가 발생했을 때 순차적으로 아래로 향해서 코드가 실행 되어야 쓸모없는 움직임이 덜하기 때문
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
