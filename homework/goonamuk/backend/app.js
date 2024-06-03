/*
설치한 package를 사용하기 위해서는
사용이 필요한 js의 가장 위에 import로 호출-선언해야 한다.(yarn 환경)
import 패키지이름 from "패키지이름"

만약 한 파일 내에서 npm과 yarn의 방식을 혼용하면 오류 발생!!!!
=====
npm의 경우...
const 패키지이름 = require("패키지이름");
*/

import express from "express";

/*
cors는 프로그램에 접근하기 위한 교차 인증 절차를 구현해둔 package
교차 인증 절차란 = api 등을 사용할 때, 보안을 위해 고안된 절차
전체 오픈 / 인증 사용자 대상 오픈(회원가입 등) / 권한 취득자 대상 오픈
*/
import cors from "cors";

// /*
// dotenv는 '환경 변수'를 선언해주는 패키지
// 어떤 환경에서도 항상 일정해야 하는 변수가 필요할 때 사용
// 대체로 node_modules와 함께 .gitignore에 들어감.

// 이번 경우에는 port 번호를 .env 파일에 넣어뒀음(3000)
// */
// import dotenv from "dotenv";

const app = express();

// /*
// dotenv 내의 정보를 활용하기 위해서는
// dotenv.config();를 선언해야 한다.
// */
// dotenv.config();

/* 
위에서 app을 express()로 선언했기 때문에
app.use는 express.use와 동일
*/
app.use(cors());

const PORT = 3000;
/*
.get은 클라이언트가 서버에게 데이터를 받아오는 메소드(200)
.post는 클라이언트로부터 서버에게 데이터를 전송하는 메소드(201)

.get("/" <= URL에서 구분자를 /로 설정(반드시 문자열 선언"")),
(req <= 리퀘스트(요청), res <= 리스폰스(응답))
=> { (req를 받았을 때 res를 반환하는 화살표함수)
    res.send("hello world") <= res로 반환할 내용
}
*/
app.get("/", (req, res) => {
  res.send("hello world");
});

//게임 데이터 arr 설정(지역적)
app.get("/games", (req, res) => {
  const games = [
    {
      name: "dark soul",
      genre: "soullike",
      launch: 2011,
      maker: "From Software",
    },
    {
      name: "dark soul2",
      genre: "soullike",
      launch: 2014,
      maker: "From Software",
    },
    {
      name: "dark soul3",
      genre: "soullike",
      launch: 2016,
      maker: "From Software",
    },
    {
      name: "elden ring",
      genre: "soullike",
      launch: 2022,
      maker: "Bandai Namco",
    },
    {
      name: "Dave the Diver",
      genre: "simulation",
      launch: 2023,
      maker: "NeoWiz",
    },
    { name: "lies of P", genre: "soullike", launch: 2023, maker: "NeoWiz" },
    { name: "Tekken 8", genre: "fight", launch: 2024, maker: "Bandai Namco" },
  ];
  res.send(games);
});

//todoData 선언(전역적)
const todoData = [
  {
    id: 1,
    title: "할일1",
    createdAt: "2021-08-01",
  },
  {
    id: 2,
    title: "할일2",
    createdAt: "2021-08-01",
  },
];

//todoData의 전체 리스트 get(READ)
app.get("/todo-item", (req, res) => {
  res.send(todoData);
});

//특정 id 의 todoData를 조회하는 get(READ)
app.get("/todo-item/:id", (req, res) => {
  const id = Number(req.params.id);
  const checkData = todoData.find((todo) => todo.id === id);
  res.status(200).json({ checkData });
});
/*
.listen <= 포트 번호가 들어오면 실행

그런데, 나는 .env에서 포트 번호로 3000을 지정했기 때문에...
맨 위에서 dotenv를 import해서 이 js에서 작동하도록 한 뒤에
process.env.PORT로 지정한 포트 번호를 입력하고
깃헙에 공유되는 코드 내에서는 포트 번호가 노출되지 않도록 했음

process.env.변수이름 <= .env 파일 내에서 선언한 변수의 value를 사용
*/
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
