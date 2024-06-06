import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const tododata = [
  {
    id: 2,
    userId: 1,
    title: "TIL작성하기",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 5,
    userId: 1,
    title: "과제하기",
    doneAt: "2021-08-01",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

// 조회API
app.get("/todo-items", (req, res) => {
  res.send(tododata);
});

// 추가API
app.post("/todo-items", (req, res) => {
  const { title } = req.body;

  const makeid = (data) => {
    for (let i = 0; i < data.length; i++) {
      const id = data[i].id;
      if (!id) {
        return 1;
      } else if (id !== i + 1) {
        return i + 1;
      }
    }
    return id + 1;
  };

  const items = {
    id: makeid(tododata),
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  tododata.push(items);
  return res.send(items);
});

//특정todolist/API조회
app.get("/todo-items/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  const selectdata = tododata.find((el) => el.id === userId);
  res.send(selectdata);
});

//변경API
app.post("/todo-items/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const { title } = req.body;

  const selectData = tododata.findIndex((el) => el.id === userId);
  if (selectData === -1) {
    return res.json({ massege: "없는 Id입니다." });
  }

  const changeData = {
    id: userId,
    userId: 1,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tododata.splice(selectData, 1, changeData);

  return res.json({ changeData });
});

//삭제API
app.delete("/todo-items/:userId", (req, res) => {
  const userId = Number(req.params.userId);

  const selectData = tododata.findIndex((el) => el.id === userId);
  if (selectData === -1) {
    return res.json({ massege: "없는 Id입니다." });
  }

  tododata.splice(selectData, 1);
  return res.json({ massege: "정상적으로 삭제되었습니다." });
});

app.listen(PORT, () => {
  console.log(`${PORT}포트번호에 연결되었습니다.`);
});
