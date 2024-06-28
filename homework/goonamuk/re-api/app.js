import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cors());

const secretKey = "1234567890";

const todoitems = [
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
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 3,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 4,
    userId: 1,
    title: "할일1",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 5,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 6,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 7,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
  {
    id: 8,
    userId: 2,
    title: "할일2",
    doneAt: null,
    createdAt: "2021-08-01",
    updatedAt: "2021-08-01",
  },
];
const users = [
  {
    id: 1,
    email: "1111",
    password: "1111",
    role: "student",
    name: "1111",
  },
  {
    id: 2,
    email: "2222",
    password: "2222",
    role: "student",
    name: "2222",
  },
];

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    req.user = jwt.verify(token, secretKey);
    next();
  } catch (error) {
    res.status(401).json({ message: "잘못된 접근입니다." });
  }
};

//회원가입 기능
app.post("/sign-up", (req, res) => {
  const { email, name, role, password, rePassword } = req.body;

  //값 전부 입력됐는지 확인, 안 들어왔으면 err(400)
  if (!email || !name || !role || !password || !rePassword) {
    res.status(400).json({
      status: 400,
      message: "필수 입력 정보가 누락되었습니다. 확인 후 다시 입력해주세요.",
    });
    return;
  }

  //비밀번호와 비밀번호 확인 일치여부 체크, 일치하지 않으면 err(400)
  if (password !== rePassword) {
    res.status(400).json({
      status: 400,
      message: "비밀번호 확인이 비밀번호와 다릅니다. 다시 한 번 확인해주세요.",
    });
    return;
  }

  //이메일 중복인지 확인, 중복이면 err(409)
  const isExistUser = users.find((user) => user.email === email);

  if (isExistUser) {
    res.status(409).json({
      status: 409,
      message: "이미 가입된 이력이 있는 회원입니다. 다시 한 번 확인해주세요.",
    });
    return;
  }

  //user id 생성
  const newUser = {
    id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
    email: email,
    name: name,
    role: role,
    password: password,
  };
  users.push(newUser);

  res.status(201).json({ message: "회원가입 성공!" });
});

//로그인 기능
app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: 400,
      message: "누락된 값이 있습니다. 다시 한 번 확인해주세요.",
    });
    return;
  }
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  user.password = undefined;

  if (!user) {
    res.status(400).json({
      message:
        "이메일 혹은 비밀번호가 잘못되었습니다. 다시 한 번 확인해주세요.",
    });
    return;
  }
  // user = { password: _pw, ...user };
  const token = jwt.sign(user, secretKey);

  res.status(201).json({ status: 201, message: "로그인 성공!", token });
});

//내 정보 조회
app.get("/users/me", authMiddleware, (req, res) => {
  const user = req.user;
  console.log(req.user);

  res.status(200).json(user);
});

//게시글 전체 조회
app.get("/todo-items", authMiddleware, (req, res) => {
  const user = req.user;
  console.log(user);

  //유저 아이디와 동일한 값을 아이디로 가지는 아이템만 반환
  res.send(todoitems.filter((item) => item.userId === user.id));
});

//게시글 작성
app.post("/todo-items", authMiddleware, (req, res) => {
  //title을 받아온다
  const { title } = req.body;
  const user = req.user;
  const userId = users.find((user) => user.id);

  //user에서 얻어온 id값을 todoitems arr-obj에 입력한다
  const newTodoitem = {
    id: todoitems[todoitems.length - 1]
      ? todoitems[todoitems.length - 1].id + 1
      : 1,
    userId: user.id,
    title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  todoitems.push(newTodoitem);

  res.send(newTodoitem);
});

//게시글 하나만 id로 조회
app.get("/todo-items/:id", authMiddleware, (req, res) => {
  const user = req.user;

  //아이템 아이디를 파람스로 불러옴 => 파람스는 문자열인거 기억하기
  const { id } = req.params;
  const selectItem = todoitems.find((item) => item.id === +id);

  //로그인한 유저의 id값과 todoitem의 userId값이 일치하는지 확인하고, 불일치 시 401 반환
  if (user.id !== selectItem.userId) {
    res.status(401).json({ message: "유저 정보가 일치하지 않습니다." });
    return;
  }
  res.send(selectItem);
});

// //게시글을 keyword로 검색(회원 이름, 할 일 이름 등)
// app.get("/todo-items/search/:keyword", (req, res) => {
//   const { keyword } = req.params;

//   res
//     .status(200)
//     .json({ status: 200, message: `${keyword}로 게시글 검색 성공!` });
// });

//게시글 수정
app.put("/todo-items/:id", authMiddleware, (req, res) => {
  //정신차려라 title 내용 수정하는게 아니라 토글이다
  const { id } = req.params;

  //id 찾아서 todoitem을 찾기
  //그냥 찾기만 했었는데 별도로 선언해줘야... 나중에 splice할 때 좀 낫다는 걸 알았다...
  const toggleItem = todoitems.find((todoitem) => todoitem.id === +id);
  const toggleItemIndex = todoitems.findIndex(
    (todoitem) => todoitem.id === +id
  );

  //splice는 idx, 지울 갯수, 바꿀 내용의 세 가지 인자를 받음
  //생각해보니까 todoitem의 id는 1부터 시작 = idx보다 항상 1이 많음
  //틀렸다... 게시글이 삭제되면 idx가 달라진다.
  todoitems.splice(toggleItemIndex, 1, {
    ...toggleItem,
    doneAt: toggleItem.doneAt == null ? new Date() : null,
  });
  res.status(201).json({ status: 201, message: "게시글 수정 성공!" });
});

//게시글 삭제
app.delete("/todo-items/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  //   아래 코드... 작성했었는데... 생각해보니까 id만 있어도 삭제는 가능함... 에휴 댕청이슈 ㅡㅡ
  const deleteItem = todoitems.findIndex((todoitem) => todoitem.id === +id);

  todoitems.splice(deleteItem, 1);
  res.status(201).json({ status: 201, message: "게시글 삭제 성공!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`${PORT} 번으로 서버가 열렸어요!`);
});
