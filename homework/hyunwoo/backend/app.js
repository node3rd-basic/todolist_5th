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
    doneAt: "2024-06-03",
    createdAt: new Date(),
    updatedAt: null,
  },
  {
    id: 2,
    userId: 2,
    title: "팀프로젝트",
    doneAt: "2024-06-07",
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
    doneAt: "2024-06-04",
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

  const newId = todoItems[todoItems.length - 1] ? todoItems[todoItems.length - 1].id + 1 : 1;

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

app.listen(port, () => {
  console.log(port, "포트로 연결되었습니다.");
});
