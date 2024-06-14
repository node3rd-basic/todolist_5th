// 코딩 연습 & 실습 파일
import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, (req, res) => {
  console.log(`서버오픈 ${port} 포트`);
});

const users = [];

// 회원가입 API
app.post("/sign-up", (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    res.status(408).send({ message: "빈칸확인" });
    return;
  }

  if (password == !rePassword) {
    res.status(408).send({ message: "비밀번호 불일치" });
    return;
  }

  const 중복유저 = users.find((메일) => 메일.email === email);
  if (중복유저) {
    res.send({ message: "중복된 유저" });
    return;
  }

  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

  const newUser = { email, password, rePassword, role, name, id };
  users.push(newUser);

  res.status(200).send({ message: "회원가입 성공이다" });
  console.log(newUser);
});

app.get("/sign-in", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({ message: "빈칸확인" });
    return;
  }

  const findUser = users.find(
    (usr) => usr.email === email && usr.password === password
  );
  const { passowrd: _pw, ...user } = findUser;

  if (!findUser) {
    res.send({ message: "유저없음" });
    return;
  }

  res.json({ token: jwt.sign(user, secretKey) });
});

// // // // // // 새로운 기능 개발 시작
// // // // // // 2024-06-09

// app.get 할일목록 전체조회
app.get("/todo-items", (req, res) => {
  return res.send(todoItems);
});

// app.post 할일목록 추가
app.post("/todo-items", (req, res) => {
  // 요청받은 body 에서 title 값을 가져온다.
  const { title } = req.body;
  // newTodoId 의 길이를 측정한다, 만약 0일경우 ID를 1로, 0이 아닐경우 마지막  ID에 +1을 한다.
  const newTodoId = todoItems[todoItems.length - 1]
    ? todoItems[todoItems.length - 1].id + 1
    : 1;
  // 새로운 newTodoItem 객체를 생성한다.
  // ID는 위에서 계산한 값을, userID는 1로 고정, title은 위에서 가져온 title값을, dontAt 은 null을, createdAt 과 updatedAt 는 현재시간을 저장한다.
  const newTodoItem = {
    id: newTodoId,
    userId: 1,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // todoItems 변수에 newTodoItem를 추가한다.
  todoItems.push(newTodoItem);
  // 새로 생성된 newTodoItem를 JSON 형식으로 보낸다.
  return res.send(newTodoItem);
});

// app.delete 할일목록 삭제
app.delete("/todo-items/:id", (req, res) => {
  // 요청받은 파라미터에서 id값을 가져온다.
  const { id } = req.params;
  // id값을 숫자로 변환한다.
  const todoItemId = Number(id);

  // todoItemIndex 라는 변수에 todoItems 배열에서 일치하는 값을 찾아 저장한다.
  // 조건은 요청받은 id값이 저장된 todoItemId 와 todoItems 배열에서의 id를 비교하여 동일한 값을 selTodoItem에 저장한다.
  const selTodoItem = todoItems.findIndex((ids) => ids.id === todoItemId);

  // todoItems 배열에 대해 splice를 실행하는데, 조건은 인덱스는 selTodoItem를, 삭제할 카운터는 1개만 이다.
  todoItems.splice(selTodoItem, 1);
  return res.send(todoItems);
});

// app.put 할일목록 수정
app.put("/todo-items/:id", (req, res) => {
  // 요청받은 파라미터에서 id값을 가져온다.
  const todoItemId = Number(req.params.id);

  // selTodoItem 라는 변수에 todoItems 배열에서 일치하는 값을 찾아 저장한다.
  // 조건은 요청받은 id값이 저장된 todoItemI 와 todoItems 배열에서의 id를 비교하여 동일한 값의 객체를 selTodoItem에 저장한다.
  const selTodoItem = todoItems.find((ids) => ids.id === todoItemId);

  // todoItems 배열에 대해 splice를 실행하는데, 조건은 인덱스는 selTodoItem를, 삭제할 카운터는 1개만, 추가할 데이터는 selTodoItem 이다.
  todoItems.splice(selTodoItem, 1, {
    ...selTodoItem,
    doneAt: selTodoItem.doneAt == null ? new Date() : null, // 삼항연산자
  });

  res.send({ result: true });
});

// app.get /todo-items/:id 할일목록 상세조회
app.get("/todo-items/:id", (req, res) => {
  const id = Number(req.params.id);
  // 요청된(/todo-items/:id 로 들어온 값) 값을 Number로 변환 하고 id변수에 담는다
  const todoItem = todoItems.find((todoItem) => todoItem.id === id);
  // 위에서 저장된 id값과 전역변수로 지정된 todoItems배열을 순회하며
  // 일치하는 첫번째 값을 찾고 todoItem 상수에 저장한다.
  res.send(todoItem);
  // todoItem 상수값을 res.send로 보낸다.
});
