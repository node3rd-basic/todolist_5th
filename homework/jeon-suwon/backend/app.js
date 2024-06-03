import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/todo-items", (req, res) => {
  const moviedata = [
    {
      id: 1,
      userId: 1,
      title: "과제하기",
      doneAt: "2021-08-01",
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
    {
      id: 2,
      userId: 1,
      title: "TIL작성하기",
      doneAt: null,
      createdAt: "2021-08-01",
      updatedAt: "2021-08-01",
    },
  ];
  res.send(moviedata);
});

app.get("/book", (req, res) => {
  const bookdata = [
    { id: 1, name: "책1", 개봉일: "2024-05-21" },
    { id: 2, name: "책2", 개봉일: "2024-05-22" },
    { id: 3, name: "책3", 개봉일: "2024-05-23" },
    { id: 4, name: "책4", 개봉일: "2024-05-24" },
  ];
  res.send(bookdata);
});

app.get("/work", (req, res) => {
  const workdata = [
    { id: 1, title: "공부하기", date: "2024-05-21" },
    { id: 2, title: "운동하기", date: "2024-05-21" },
    { id: 3, title: "강의듣기", date: "2024-05-21" },
    { id: 4, title: "잠자기", date: "2024-05-21" },
  ];
  res.send(workdata);
});

app.get("/todo-items/:userId", (req, res) => {
  const userId = req.params.userId;
  const workdata = [
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
  const selectdata = workdata.find((el) => el.id === Number(userId));
  res.send(selectdata);
});

app.listen(PORT, () => {
  console.log(`${PORT}포트번호에 연결되었습니다.`);
});
