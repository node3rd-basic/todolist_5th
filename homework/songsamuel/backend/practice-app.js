import express from "express";
import cors from "cors";
<<<<<<< HEAD
=======
import e from "express";
>>>>>>> 2ddfdfa47eed59469c80629faea1f809335c1d7c

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // 브라우져나 express에서 받은 데이터들을 (ex) req.body 데이터들 ) json으로 바꾸기 위해서 사용
// 이것을 안쓰면 데이터를 읽지 못한다.

// app.get("/", (req, res) => {
//   res.send("연습만이 살 길이다.1");
// });

// app.get('/', (req,res) => {
//   res.send('연습만이 살길이다.2')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.3')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.4')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.5')
// })

// app.get("/todolists", (req, res, next) => {
//   const todolists = [
//     { id: 1, task: "숨쉬기" },
//     { id: 2, task: "먹기" },
//     { id: 3, task: "자기" },
//     { id: 4, task: "공부하기" },
//     { id: 5, task: "영화보기" },
//     { id: 6, task: "게임하기" },
//   ];

//   return res.send(todolists);
// });

// app.get("/todolists/:todolistId", (req, res, next) => {
//   const todolistId = Number(req.params.todolistId); // 여기서 숫자형으로 바꾸는 이유는 아래의 todo.id와 타입과 정보가 일치해야하기 때문에 숫자형으로 바꾸는 것이다.
//   // 또한 .todolistId를 작성하는 이유는 URL에 :todolistId에서 받아오는 값이랑 일치해야하기 때문이다.
//   const todolists = [
//     { id: 1, task: "숨쉬기" },
//     { id: 2, task: "먹기" },
//     { id: 3, task: "자기" },
//     { id: 4, task: "공부하기" },
//     { id: 5, task: "영화보기" },
//     { id: 6, task: "게임하기" },
//   ];

//   const findtodo = todolists.find((todo) => {
//     return todo.id === todolistId;
//   });

//   return res.send(findtodo);
// });

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
    userId: 1,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 할일 목록들 조회 API 만들기  (6차 강의)
app.get("/todo-items", (req, res, next) => {
  const ReadTodoItems = todoItems;

  res.send(ReadTodoItems);
});

// 할일 목록들 추가 API (6차 강의)
app.post("/todo-items", (req, res, next) => {
  // 입력을 받을 데이터
  const { title } = req.body;

  // todo-items 목록에 추가될 새로운 할 일의 틀
  const creatTodoItems = {
    id: 3,
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  // 새로운 할 일의 틀을 기존의 틀 (즉 목록 리스트)에 집어넣는(push) 추가하는 코드
  todoItems.push(creatTodoItems);
  res.send(todoItems);
});

// 할일 목록들 중 하나 수정 APi (7차 강의)

app.put("/todo-items/:id", (req, res, next) => {
  const { id } = req.params;
  const retodo = Number(id);
  const selectedTodoItem = todoItems.find((할일) => 할일.id === retodo);
  if (!selectedTodoItem) {
    res.status(404),
      send({
        message: "해당 Id를 가진 todo item이 없습니다.",
      });
    return;
  }

  // 여기서 부터 내가 생각 못했던 것
  // let newDoneAt;
  // if (selectedTodoItem.doneAt === null) {
  //   newDoneAt = new Date();
  // } else {
  //   newDoneAt = null;
  // }

  // 위의 코드를 삼항 연산자로 고칠 수 있다.
  // const newDoneAt = selectedTodoItem.doneAt === null ? new Date() : null;

  const todoItemIndex = todoItems.indexOf(selectedTodoItem);

  const addtodoItem = todoItems.splice(todoItemIndex, 1, {
    ...selectedTodoItem,
    doneAt: selectedTodoItem.doneAt === null ? new Date() : null,
  });

  res.send({
    result: true,
  });
});

// 항리 목록들 중 하나 삭제 API (7차 강의)
app.delete("/todo-items/:id", (req, res, next) => {
  const { id } = req.params;
  const idAsNumber = Number(id);
  const indexToDelete = todoItems.findIndex(
    (todoItem) => todoItem.id === idAsNumber
  );

  if (indexToDelete === -1) {
    res.status(404).send({
      result: false,
      message: "해당 아이디를 가진 todo item이 없습니다.",
    });
    return; // <- 이거 쓰는 이유는 return을 안적으면 밑에 함수를 계속 실행하기 때문에 안내문이 나가도 함수가 실행된다.
  }

  todoItems.splice(indexToDelete, 1);

  console.log(id);
  res.send({
    result: true,
  });
});

<<<<<<< HEAD
=======
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

app.post("/sign-up", (req, res, next) => {
  const { email, password, rePassword, role, name } = req.body;

  if (
    !email ||
    !password ||
    !rePassword ||
    !role ||
    !name ||
    password !== rePassword
  ) {
    res.status(400).send("입력값을 확인해 주세요.");
    return;
  }

  const existingUser = users.find((users) => users.email === email);

  if (existingUser) {
    res.status(409).send("이미 존재하는 이메일입니다.");
  }

  // 유저의 배열의 길이가 0이라면 (즉, 배열에 있는 요소의 개수) 1을 넣고 0이 아니라면 (즉, 배열에 있는 요소의 개수)에서 맨끝("- 1")(수학적 의미 없음)에서 +1을 하라
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;

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

app.post("/sign-in", (req, res, next) => {
  const { email, password } = req.body;
  const { password: _password, ...user } = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.send("존재하지 않는 사용자 입니다.");
    return;
  }

  //여기서 말하는 user는  268번째 줄을 말한다.
  const token = jwt.sign(user, secretKey);

  res.json({ token: token });
});

// 토큰 검증 API 내 정보 가져오기

app.get("/users/me", (req, res, next) => {
  //요청에 있는 header
  const token = req.headers.authorization;

  // 토큰을 검증하는 것!
  try {
    const user = jwt.verify(token, secretKey);
    res.json(user);
  } catch (error) {
    res.status(401).send("권한이 없습니다.");
  }
});

// 할일 목록들 조회 API 만들기  (8차 강의)
app.get("/todo-items", (req, res, next) => {
  const token = req.headers.authorization;

  // 토큰을 검증하는 것!
  try {
    const user = jwt.verify(token, secretKey);
    res.send(todoItems.filter((todoItem) => todoItem.userId === user.id));
  } catch (error) {
    res.status(401).send("권한이 없습니다.");
  }
});

// 할일 목록들 추가 API (8차 강의)
app.post("/todo-items", (req, res, next) => {
  const token = req.headers.authorization;
  const { title } = req.body;

  try {
    const user = jwt.verify(token, secretKey);
    const newTodoId = todoItems[todoItems.length - 1]
      ? todoItems[todoItems.length - 1].id + 1
      : 1;

    const creatTodoItems = {
      id: newTodoId,
      userId: user.id,
      title: title,
      doneAt: null,
      createdAt: new Date(),
      updatedAt: null,
    };

    // 새로운 할 일의 틀을 기존의 틀 (즉 목록 리스트)에 집어넣는(push) 추가하는 코드
    todoItems.push(creatTodoItems);
    res.send(creatTodoItems);
  } catch (error) {
    res.status(401).send("권한이 없습니다.");
  }
});

>>>>>>> 2ddfdfa47eed59469c80629faea1f809335c1d7c
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
