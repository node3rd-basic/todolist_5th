// 코딩 연습 & 실습 파일
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;
const secretKey = "1a2b3c";
app.use(cors());
app.use(express.json());

app.listen(port, (req, res) => {
  console.log(`서버오픈 ${port} 포트`);
});

// 회원목록 전역변수 선언 및 데이터 할당
const users = [
  {
    id: 1,
    email: "1111",
    password: "1111",
    role: "student",
    name: "1111",
  },
  {
    id: 2,
    email: "2222",
    password: "2222",
    role: "student",
    name: "2222",
  },
];

// 할일목록 전역변수 선언 및 데이터 할당
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
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 3,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 4,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 5,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 6,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 7,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 8,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 회원가입 API
app.post("/sign-up", (req, res) => {
  const { email, password, rePassword, role, name } = req.body;
  if (!email || !password || !rePassword || !role || !name) {
    res.status(408).send({ message: "비어있는 칸이 있습니다. 확인해주세요." });
    return;
  }
  if (password == !rePassword) {
    res.status(408).send({ message: "비밀번호가 일치하지 않습니다." });
    return;
  }
  const extUser = users.find((usr) => usr.email === email);
  if (extUser) {
    res.send({ message: "중복된 유저입니다." });
    return;
  }
  // users의 길이를 확인하여 0일경우 users내부의 id 값을 1로
  // 그렇지 않은경우 길이에서 -1 하면 마지막 유저의 번호가 나오는데 여기의 id값을 +1로
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
  const newUser = { email, password, rePassword, role, name, id };
  users.push(newUser);
  res.status(200).send({ message: "회원가입 성공입니다." });
});

// 로그인 API
app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send({ message: "비어있는 칸이 있습니다. 확인해주세요." });
    return;
  }

  // users 배열에서 find를 실행한다
  // email이 req email 과 같고, password가 req password 와 같은 유저를 찾는다
  const findUser = users.find(
    (usr) => usr.email === email && usr.password === password
  );
  // 찾은 유저 정보에서 password 를 _pw로 지정하고, 스프레드를 사용하여 findUser 에 담는다
  const { passowrd: _pw, ...user } = findUser;

  if (!findUser) {
    console.log(findUser);
    console.log(users);
    res.send({ message: "일치하는 유저가 없습니다." });
    return;
  }

  // jwt를 사용하여 password를 제외한 유저정보를 인코딩 하여 전달한다.
  res.json({ token: jwt.sign(user, secretKey) });
});

// 내정보 조회 API
app.get("/users/me", (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, secretKey);
  res.status(200).json(user);
});

// app.get 할일목록 전체조회
app.get("/todo-items", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);

    res.send(
      todoItems.filter((todoItem) => todoItem.userId === Number(user.id))
    );
  } catch (error) {
    res.status(401).send({ message: "당신은 권한이 없습니다" });
  }
});

// app.post 할일목록 추가
app.post("/todo-items", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
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
      userId: user.id,
      title,
      doneAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // todoItems 변수에 newTodoItem를 추가한다.
    todoItems.push(newTodoItem);
    // 새로 생성된 newTodoItem를 JSON 형식으로 보낸다.
    return res.send(newTodoItem);
  } catch (error) {
    res.status(401).send({ message: "당신은 권한이 없습니다" });
  }
});

// app.delete 할일목록 삭제
app.delete("/todo-items/:id", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    // 요청받은 파라미터에서 id값을 가져온다.
    const { id } = req.params;
    // id값을 숫자로 변환한다.
    const todoItemId = Number(id);

    // todoItemIndex 라는 변수에 todoItems 배열에서 일치하는 값을 찾아 저장한다.
    // 조건은 요청받은 id값이 저장된 todoItemId 와 todoItems 배열에서의 id를 비교하여 동일한 값을 selTodoItem에 저장한다.
    const selTodoItem = todoItems.findIndex((todo) => todo.id === todoItemId);

    // todoItems 배열에 대해 splice를 실행하는데, 조건은 인덱스는 selTodoItem를, 삭제할 카운터는 1개만 이다.
    todoItems.splice(selTodoItem, 1);
    return res.send(todoItems);
  } catch (error) {
    res.status(401).send({ message: "당신은 권한이 없습니다" });
  }
});

// app.put 할일목록 수정
app.put("/todo-items/:id", (req, res) => {
  const token = req.headers.authorization;
  try {
    const user = jwt.verify(token, secretKey);
    // 요청받은 파라미터에서id값을 가져온다
    const { id } = req.params;
    //findinde로 할일의 index를 찾아서 selectItemIndex에저장한다.
    const selectItemIndex = todoItems.findIndex(
      (todo) => todo.id === Number(id)
    );
    if (selectItemIndex === -1) {
      res.status(404).send({ message: "그런할일이 없습니다." });
      return;
    }
    console.log(todoItems[selectItemIndex].userId);
    if (todoItems[selectItemIndex].userId !== user.id) {
      res.status(401).send({ message: "당신은 권한이 없습니다." });
      return;
    }
    const selectItem = todoItems.find((sel) => sel.id === Number(id));

    // putitem에 모든내용을 스프레드로 담은 후, doneAt이 null이면 현재날짜시간으로, 그렇지 않다면 null로
    const putItem = {
      ...selectItem,
      doneAt: selectItem.doneAt == null ? new Date() : null,
    };
    // 찾은selectItemIndex 인덱스로부터 1개의 아이템만 putitem으로 대치 한다
    todoItems.splice(selectItemIndex, 1, putItem);
    res.status(200).send({ result: "true" });
    return;
  } catch (error) {
    res.status(401).send({ message: "에러가 발생했습니다." });
  }
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
