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

// 할일 목록 전역 변수 설정 // 그리고 이게 DB 대신에 쓰는 것이다.
const todoItems = [
  {
    id: 1,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 2,
    userId: 1,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 3,
    userId: 1,
    title: "할일3",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 4,
    userId: 1,
    title: "할일4",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 할일 목록들 조회 API 만들기  (6차 강의)
app.get("/todo-items", (req, res, next) => {
  const readTodoItems = todoItems;

  res.send(readTodoItems);
});

// 할일 목록들 추가 API (6차 강의)
app.post("/todo-items", (req, res, next) => {
  // 입력을 받을 데이터
  const { title } = req.body;

  // todo-items 목록에 추가될 새로운 할 일의 틀
  const creatTodoItems = {
    id: 3,
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: null,
  };

  // 새로운 할 일의 틀을 기존의 틀 (즉 목록 리스트)에 집어넣는(push) 추가하는 코드
  todoItems.push(creatTodoItems);
  res.send(todoItems);
});

// 할 일 목록들 중 하나 수정 APi (7차 강의)

app.put("/todo-items/:id", (req, res, next) => {
  const { id } = req.params;
  const todoId = Number(id);

  // :id로 입력 받은 값이 todoItems에 있는지 확인 작업
  // 여기서 이걸 쓰는 이유! const AddtodoItem에서 ...을 쓸 때 뽑아 쓸 {} 전체를 가져와야하니까 찾는 것!
  const checkTodoItem = todoItems.find((할일) => 할일.id === todoId);
  if (!checkTodoItem) {
    res.send({ message: "존재하지 않는 Id입니다." });
    return;
  }

  // 수정될 id값이 어디인지 todoItems에서 찾는 작업 ex) :id가 3이면 3번위치 자리
  // 여기는 실질적인 객체{} 데이터가 아닌 위치만 찾는다.
  const todoItemsIndex = todoItems.indexOf(checkTodoItem);

  const newDoneAt = checkTodoItem.doneAt === null ? new Date() : null;

  // 수정할 위치에서 자르고 수정할 값 넣는 작업.
  const addtodoItem = todoItems.splice(todoItemsIndex, 1, {
    ...checkTodoItem,
    doneAt: newDoneAt,
  });

  res.send({
    result: true,
    data: addtodoItem,
  });
});

// 할 일 목록들 중 하나 삭제 API (7차 강의)
app.delete("/todo-items/:id", (req, res, next) => {
  const { id } = req.params;
  const did = Number(id);

  const delTodoItem = todoItems.find((삭제할_일) => 삭제할_일.id === did);

  if (!delTodoItem) {
    res.send("해당 할 일이 없습니다.");
    return;
  }

  const delTodoItem_index = todoItems.indexOf(delTodoItem);

  console.log(delTodoItem_index);

  const clearTodoItem = todoItems.splice(delTodoItem_index, 1);

  res.send({
    result: true,
    date: clearTodoItem,
  });
});

// 할 일 목록들 중 하나 삭제 API 2 (7차 강의)
app.delete("/todo-items/:id", (req, res, next) => {
  const { id } = req.params;
  const todoid = Number(id);

  const indexTodoItem = todoItems.findIndex(
    (삭제할_일) => 삭제할_일.id === todoid
  );
  if (indexTodoItem === -1) {
    res.send("존재하지 않는 할 일 입니다.");
    return;
  }

  console.log(indexTodoItem);
  const clearTodoItem = todoItems.splice(indexTodoItem, 1);

  res.send({
    result: true,
    date: clearTodoItem,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
