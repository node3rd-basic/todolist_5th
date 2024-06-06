import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // 브라우져나 express에서 받은 데이터들을 (ex) req.body 데이터들 ) json으로 바꾸기 위해서 사용
// 이것을 안쓰면 데이터를 읽지 못한다.

// app.get("/", (req, res) => {
//   res.send("연습만이 살 길이다.1");
// });

// app.get('/', (req,res) => {
//   res.send('연습만이 살길이다.2')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.3')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.4')
// })

// app.get('/', (req, res) => {
//     res.send('연습만이 살길이다.5')
// })

// // (숙제용)목록조회 API
// app.get("/todolists", (req, res, next) => {
//   const todolists = [
//     { id: 1, task: "숨쉬기" },
//     { id: 2, task: "먹기" },
//     { id: 3, task: "자기" },
//     { id: 4, task: "공부하기" },
//     { id: 5, task: "영화보기" },
//     { id: 6, task: "게임하기" },
//   ];

//   return res.send(todolists);
// });

// // (숙제용)목록 상세조회 API
// app.get("/todolists/:todolistId", (req, res, next) => {
//   const todolistId = Number(req.params.todolistId); // 여기서 숫자형으로 바꾸는 이유는 아래의 todo.id와 타입과 정보가 일치해야하기 때문에 숫자형으로 바꾸는 것이다.
//   // 또한 .todolistId를 작성하는 이유는 URL에 :todolistId에서 받아오는 값이랑 일치해야하기 때문이다.
//   const todolists = [
//     { id: 1, task: "숨쉬기" },
//     { id: 2, task: "먹기" },
//     { id: 3, task: "자기" },
//     { id: 4, task: "공부하기" },
//     { id: 5, task: "영화보기" },
//     { id: 6, task: "게임하기" },
//   ];

//   const findtodo = todolists.find((todo) => {
//     return todo.id === todolistId;
//   });

//   return res.send(findtodo);
// });

// 할일 목록들 API 만들기  (6차 강의)
app.get("/todo-items", (req, res, next) => {
  const todoItems = [
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

  res.send(todoItems);
});

// 할일 목록들 추가 API (6차 강의)
app.post("/todo-items", (req, res, next) => {
  const { title } = req.body;
  const todoItems = [
    {
      id: 1,
      userId: 1,
      title: title,
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

  res.send(todoItems);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
