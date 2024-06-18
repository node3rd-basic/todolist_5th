// const express = require("express");
import express from "express";

const app = express();
const port = 3000;

//controller 앞,뒤 전부 미들웨어 , req~ res send : controller
// app.get(
//   "/",
//   (req, res, next) => {
//     console.log("첫번째 미들웨어");
//     next();
//   },
//   //컨트롤러
//   (req, res, next) => {
//     console.log("controller");
//     next();
//   },
//   (req, res, next) => {
//     console.log("두번째 미들웨어");
//     next();
//   },

//   (req, res, next) => {
//     console.log("세번째 미들웨어");
//     res.send("test");
//   }
// );
app.get("/", (err, req, res, next) => {
  //err 고의발생
  console.log(unknownVariable);
  throw new Error("error 발생");

  console.log("controller");
  res.send("");
});

//에러처리 미들웨어
app.use((err, req, res, next) => {
  console.log("error 발생시 해당 미들웨어 실행됨");
  res.status(500).json({ message: "error 발생" });
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
