import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const todoItems = [
  {
    id: 1,
    userId: 1,
    title: "베이직반 과제",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 2,
    userId: 2,
    title: "팀프로젝트",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 3,
    userId: 3,
    title: "알고리즘 코드카타",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 4,
    userId: 4,
    title: "Node.js 공부",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 5,
    userId: 5,
    title: "청소",
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  },
];

/** 할일 목록들 보여지도록 api 구현 */
app.get("/todo-items", (req, res) => {
  res.send(todoItems);
});

/** 할일 목록 추가되도록 api 구현 */
app.post("/todo-items", (req, res) => {
  const { title } = req.body;

  const newId = todoItems[todoItems.length - 1]
    ? todoItems[todoItems.length - 1].id + 1
    : 1;

  const newTodoItem = {
    id: newId,
    userId: 1,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoItems.push(newTodoItem);

  res.send(newTodoItem);
});

/** 할일 한가지 조회되도록 api 구현 */
app.get("/todo-items/:id", (req, res) => {
  const id = Number(req.params.id);

  const todoItem = todoItems.find((todoItem) => todoItem.id === id);

  res.send(todoItem);
});

/** 할일 수정 api 구현 */
app.put("/todo-items/:id", (req, res) => {
  // 할일 id 가져오기
  const id = Number(req.params.id);
  // id가 숫자가 아닌 경우
  if (isNaN(id)) {
    res.status(400).send({
      result: false,
      message: "id는 숫자여야 합니다.",
    });
    return;
  }

  // id에 맞는 todoItem 조회
  const existTodoItem = todoItems.find((todoItem) => todoItem.id === id);
  // todoItem이 없는 경우
  if (!existTodoItem) {
    res.status(404).send({
      resule: false,
      message: "해당 아이디를 가진 todoItem이 없습니다.",
    });
    return;
  }

  // id에 해당하는 todoItem의 인덱스를 확인
  const todoItemIndex = todoItems.indexOf(existTodoItem);
  // 해당 todoItem에서 doneAt을 수정
  todoItems.splice(todoItemIndex, 1, {
    ...existTodoItem,
    doneAt: existTodoItem.doneAt == null ? new Date() : null, // 삼항연산자로 표시
  });

  res.send({ result: true });
});

app.listen(port, () => {
  console.log(port, "포트로 연결되었습니다.");
});
