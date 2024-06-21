import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

const secretKey = "공부 열심히 하자";

// 토큰 발급

const token = jwt.sign(
  {
    name: "송사무엘",
    email: "thdtkandpf@naver.com",
    role: "student",
  },
  secretKey
);

// console.log(token);

// 토큰 검증

const user = jwt.verify(token, secretKey);

console.log(user);
