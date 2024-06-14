import express from "express";

const app = express();
const PORT = 3000;

const todoData = [
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

const user = [
  {
    userId: 1,
  },
];

//할일 목록 조회 api
app.get("/todo-items", (req, res, next) => {
  return res.send({ data: todoData });
});

//할일 목록 한개 조회 api
app.get("/todo-items/:id", (req, res, next) => {
  const { id } = req.params;

  const selectData = todoData.find((el) => el.id === +id);

  return res.send({ data: selectData });
});

app.listen(PORT, () => {
  console.log(`${PORT}번의 포트가 열렸습니다.`);
});
