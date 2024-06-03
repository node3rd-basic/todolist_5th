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

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

//게임 데이터 arr 설정

const games = [
  {
    game_id: 0,
    name: "dark soul",
    genre: "soullike",
    launch: 2011,
    maker: "From Software",
  },
  {
    game_id: 1,
    name: "dark soul2",
    genre: "soullike",
    launch: 2014,
    maker: "From Software",
  },
  {
    game_id: 2,
    name: "dark soul3",
    genre: "soullike",
    launch: 2016,
    maker: "From Software",
  },
  {
    game_id: 3,
    name: "elden ring",
    genre: "soullike",
    launch: 2022,
    maker: "Bandai Namco",
  },
  {
    game_id: 4,
    name: "Dave the Diver",
    genre: "simulation",
    launch: 2023,
    maker: "NeoWiz",
  },
  {
    game_id: 5,
    name: "lies of P",
    genre: "soullike",
    launch: 2023,
    maker: "NeoWiz",
  },
  {
    game_id: 6,
    name: "Tekken 8",
    genre: "fight",
    launch: 2024,
    maker: "Bandai Namco",
  },
];

app.get("/games", (req, res) => {
  res.send(games);
});

// 새 게임 데이터 넣기
app.post("/games", (req, res) => {
  const new_game_id = games[games.length - 1]
    ? games[games.length - 1].id + 1
    : 1;
  const { name, genre, launch, maker } = req.body;
  const newGame = {
    game_id: new_game_id,
    name,
    genre,
    launch,
    maker,
  };

  games.push(newGame);

  return res.status(201).json({ games });
});

//todoData 선언(전역적)
const todoData = [
  {
    id: 1,
    userId: 1,
    title: "할일1",
    doneAt: "NULL",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 2,
    userId: 1,
    title: "할일1",
    doneAt: "NULL",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

//post하여 create하려고 했지만, 왜인지 모르겠으나 title이 undefined가 되어 작동하지 않음.

/* 
해결하기 위해 해본 것들 
1. 전체적인 오타 점검(games로 먼저 post 연습을 한 뒤에, 그걸 바탕으로 작업했기 때문에 혹시라도 games의 것이 남아있는지를 확인)
2. ES6 문법 대신 title : title으로 명확히 명시
3. app.post의 위치를 todoData 선언 바로 아래로 변경하여 코드 실행 순서 변경(기존 : app.listen 바로 위에 위치)
4. 과정 모두를 ChatGPT에게 알려준 뒤에, 왜 오류가 발생하는지 확인 요청 - html에서 title 필드가 없을 가능성이 있다는 답변 => 튜터님 작업 시에는 잘 되었음

????

이유를 찾았다!
원인 : app.use(express.json()) <= 이걸 안 해줬음...ㅋㅋ...
당연히 const {title} = req.body가 작동할 리 없다(const something = req.body는 express.json에서 정의되어 있기 때문에)

두 번째 문제
: newTodoData를 json으로 받아오지 않고 todoData를 json으로 받아오니 undefined 발생
당연함... todoData는 하나의 객체로만 이뤄져있지 않음...
왜 return res.status(201).json({ newTodoData })를 해주어야 하는가? => fe에서 하나의 obj에 대응해서 화면에 뿌려주도록 설정했기 때문에.
*/
app.post("/todo-items", (req, res) => {
  const newTodoId = todoData[todoData.length - 1]
    ? todoData[todoData.length - 1].id + 1
    : 1;
  const { title } = req.body;
  const newTodoData = {
    id: newTodoId,
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  todoData.push(newTodoData);

  return res.status(201).json({ newTodoData });
});

//todoData의 전체 리스트 get(READ)
app.get("/todo-items", (req, res) => {
  res.send(todoData);
});

//특정 id 의 todoData를 조회하는 get(READ)
app.get("/todo-items/:id", (req, res) => {
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
