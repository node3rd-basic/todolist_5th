import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/movie", (req, res) => {
  const moviedata = [
    { id: 1, name: "영화1", 개봉일: "2024-05-11" },
    { id: 2, name: "영화2", 개봉일: "2024-05-12" },
    { id: 3, name: "영화3", 개봉일: "2024-05-13" },
    { id: 4, name: "영화4", 개봉일: "2024-05-14" },
    { id: 5, name: "영화4", 개봉일: "2024-05-14" },
    { id: 6, name: "영화4", 개봉일: "2024-05-14" },
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

app.get("/work/:userId", (req, res) => {
  const userId = req.params.userId;
  const workdata = [
    { id: 1, title: "공부하기", date: "2024-05-21" },
    { id: 2, title: "운동하기", date: "2024-05-21" },
    { id: 3, title: "강의듣기", date: "2024-05-21" },
    { id: 4, title: "잠자기", date: "2024-05-21" },
  ];
  const selectdata = workdata.find((el) => el.id === Number(userId));
  res.send(selectdata);
});

app.listen(PORT, () => {
  console.log(`${PORT}포트번호에 연결되었습니다.`);
});
