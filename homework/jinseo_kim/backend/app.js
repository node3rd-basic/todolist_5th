import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World?, i am express");
});

app.listen(port, () => {
  console.log(`${port}로 서버가 열렸습니다!`);
});

// app.get 으로 할일목록 , 할일 목록중 한개 조회 하기 API 생성
const todolists = [
  { id: 1, task: "SA 작성" },
  { id: 2, task: "API 명세서 작성 " },
  { id: 3, task: "와이어프레임 작성" },
  { id: 4, task: "API 할당" },
  { id: 5, task: "기능구현" },
  { id: 6, task: "프로젝트 테스트" },
  { id: 7, task: "퍼블리싱" },
];
app.get("/todolists", (req, res, next) => {
  return res.send(todolists);
});

//
