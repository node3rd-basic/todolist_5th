// Express 설정
import express from "express";
const app = express();
const port = 3000;

// CORS 설정
import cors from "cors";
app.use(cors());

// JSON 형식의 요청 본문파싱
app.use(express.json());

// Express 실행
app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});

// 할일목록 전역변수 선언 및 데이터 할당
const todoItems = [
  {
    id: 1,
    userId: 1,
    title: "SA 작성",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 2,
    title: "API 명세서 작성 ",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    userId: 3,
    title: "와이어프레임 작성",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    userId: 4,
    title: "API 할당",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    userId: 5,
    title: "기능구현",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    userId: 6,
    title: "프로젝트 테스트",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 7,
    userId: 7,
    title: "퍼블리싱",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// LocalHost:3000 접속시 Hello World 출력
app.get("/", (req, res) => {
  res.send("Hello, World?, i am express");
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
  // 조건은 요청받은 id값이 저장된 todoItemId 와 todoItems 배열에서의 id를 비교하여 동일한 값을 todoItemIndex에 저장한다.
  const todoItemIndex = todoItems.findIndex((ids) => ids.id === todoItemId);

  // todoItems 배열에 대해 splice를 실행하는데, 조건은 인덱스는 todoItemIndex를, 삭제할 카운터는 1개만 이다.
  todoItems.splice(todoItemIndex, 1);
  return res.send(todoItems);
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
