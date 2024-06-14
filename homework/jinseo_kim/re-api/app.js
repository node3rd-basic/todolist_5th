import express from "express";
import cors from "cors";

const port = 3000;
const app = express();

app.listen(port, () => {
  console.log(`서버오픈, ${port} 포트`);
});

// api spec을 보고 api controller 부터 작성한다.

// 회원가입 API
app.post("/sign-up", (req, res) => {
  res.send({ message: "회원가입이다." });
});

// 로그인 API
app.post("/sign-in", (req, res) => {
  res.send({ message: "로그인이다." });
});

// 내정보 API
app.get("/users/me", (req, res) => {
  res.send({ message: "로그인이다." });
});

// 할일 목록들 조회 API
app.get("/todo-items", (req, res) => {
  res.send({ message: "할일 목록들 이다." });
});

// 할일 상세 조회 API
app.get("/todo-items/:id", (req, res) => {
  res.send({ message: "할일 상세조회다." });
});

// 할일 목록들 조회 API
app.get("/todo-items/search/:keyword", (req, res) => {
  res.send({ message: "할일 상세조회다." });
});

// 할일 등록 API
app.post("/todo-items", (req, res) => {
  res.send({ message: "할일 등록이다." });
});

// 할일 완료여부 API
app.put("/todo-items/:id", (req, res) => {
  res.send({ message: "할일 완료여부다." });
});

// 할일 삭제 API
app.delete("/todo-items/:id", (req, res) => {
  res.send({ message: "할일 삭제다." });
});
