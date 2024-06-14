import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

const makeUserId = (data) => {
  for (let i = 0; i < data.length; i++) {
    const id = data[i].userid;
    if (!id) {
      return 1;
    } else if (id !== i + 1) {
      return i + 1;
    }
  }
  return id + 1;
};

const todoData = [
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

const user = [
  {
    userId: 1,
    email: "aaaa1234@naver.com",
    password: "1234",
    name: "전수원",
    role: "student",
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];

//할일 목록 조회 api
app.get("/todo-items", (req, res, next) => {
  res.send({ data: todoData });
  return;
});

//할일 목록 한개 조회 api
app.get("/todo-items/:id", (req, res, next) => {
  const { id } = req.params;

  const selectData = todoData.find((el) => el.id === +id);

  res.send({ data: selectData });
  return;
});

//회원가입
app.post("/sign-up", (req, res, next) => {
  const { email, password, rePassword, role, name } = req.body;

  const emailExist = user.find((el) => el.email === email);

  if (emailExist) {
    res.json({ message: "존재하는 이메일입니다." });
    return;
  }
  if (password !== rePassword) {
    res.json({ message: "두 패스워드가 일치하지 않습니다." });
    return;
  }

  const userInfo = {
    userId: makeUserId(),
    email,
    password,
    name,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  user.push(userInfo);
  res.json({ data: userInfo });
  return;
});

app.listen(PORT, () => {
  console.log(`${PORT}번의 포트가 열렸습니다.`);
});
