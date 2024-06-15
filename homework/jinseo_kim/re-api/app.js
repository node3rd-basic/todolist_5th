// 뭘 가져와야 되는지 ( 찾아야 하는지 )
// 클라이언트에서 어떤값을 받아야 되고? ( req / 컨트롤러 )
// 요 사이가 비즈니스 로직 ( service )
// 우리는 어떠한 값을 던져줘야 하는지 ( res / 컨트롤러 )

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const port = 3000;
const app = express();
const secretKey = '1a2b3c4b';

app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`서버오픈, ${port} 포트`);
});

const users = [
  {
    id: 1,
    email: '1111',
    password: '1111',
    role: 'student',
    name: '1111',
  },
  {
    id: 2,
    email: '2222',
    password: '2222',
    role: 'student',
    name: '2222',
  },
];

const todoItems = [
  {
    id: 1,
    userId: 1,
    title: '할일1',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 2,
    userId: 1,
    title: '할일1',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 3,
    userId: 1,
    title: '할일1',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 4,
    userId: 1,
    title: '할일1',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 5,
    userId: 2,
    title: '할일2',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 6,
    userId: 2,
    title: '할일2',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 7,
    userId: 2,
    title: '할일2',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
  {
    id: 8,
    userId: 2,
    title: '할일2',
    doneAt: null,
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01',
  },
];

// 회원가입 API
app.post('/sign-up', (req, res) => {
  // req.body 를 통해 api spec을 받아서 저장한다.
  const { email, password, rePassword, role, name } = req.body;
  // 입력받은 값에 빈칸이 없는지 검증한다. 필수값이 누락된 경우 400에러 처리
  if (!email || !password || !rePassword || !role || !name) {
    res.status(400).send({ message: '입력필드의 필수값이 누락되었습니다.' });
    return;
  }
  // 이메일 중복 없는지 검증한다, 중복 이메일 가입시 409 에러처리
  const extUser = users.find((usr) => usr.email === email);
  if (extUser) {
    res.status(409).send({ message: 'email이 중복입니다.' });
    return;
  }
  // 비밀번호와 비밀번호 확인이 일치하는지 확인, 일치하지 않을경우 400 에러처리
  if (password !== rePassword) {
    res.status(400).send({ message: '비밀번호를 확인해주세요.' });
    return;
  }
  // id 값을 검증하여 +1, 1 을 준다.
  //users의 길이가 0일때 > id에 1을 넣는다.
  //users의 길이가 0이 아닐때 > id에 users.length의 길이 -1 하고 +1을 넣는다.
  const id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
  // 모든로직 통과하면 newUser에 저장하고
  const newUser = { email, password, role, name, id };
  // users에 push 한다.
  users.push(newUser);
  // json 으로 newUser를 보여준다.
  res.send({ message: '회원가입에 성공했습니다.' });
  console.log(newUser);
});

// 로그인 API
app.post('/sign-in', (req, res) => {
  // req.body 로 email pass 받음
  const { email, password } = req.body;
  // users 에서 email pass 일치하는 user 저장
  const findUser = users.find((usr) => usr.email === email && usr.password === password);
  const { password: _pw, ...user } = findUser;
  // 일치하면jwt.sign으로 json 을 전달함
  if (user) {
    const token = jwt.sign(user, secretKey);
    res.send({ token });
  }
});

// 내정보 API
app.get('/users/me', (req, res) => {
  // req headers 에서 authorization 을 받아서 token에 저장한다.
  const token = req.headers.authorization;
  // try catch 를 실행한다.
  try {
    // token 과 secretKey 를 사용하여 jwt.verify를 하고, user에 저장한다.
    const user = jwt.verify(token, secretKey);
    // 그리고 user를 json으로 보낸다.
    res.status(200).json(user);

    // catch 에서 에러가 나면 실행한다.
  } catch (error) {
    res.status(401).send({ message: '당신은 권한이 없습니다.' });
  }
});

// 할일 목록들 조회 API
app.get('/todo-items', (req, res) => {
  // req.header를 통해 token을 받아서 저장한다.
  const token = req.headers.authorization;
  // try 실행
  try {
    // user 에 jwt.verify 를 한 정보를 넣는다.
    const user = jwt.verify(token, secretKey);
    // res.send를 통해 값을 전달한다.
    res.send(
      // todoItems 를 filter 걸어서 userId와 일치하는 값을 전달한다.
      todoItems.filter((todoItem) => todoItem.userId === Number(user.id)),
    );
    // catch 실행
  } catch (error) {
    // 권한이 없다고 보낸다.
    res.status(401).send({ message: '당신은 권한이 없습니다.' });
  }
});

// 할일 등록 API
app.post('/todo-items', (req, res) => {
  // req.header를 통해 token을 받아서 저장한다.
  const token = req.headers.authorization;
  // try 실행
  try {
    // user 에 jwt.verify 를 한 정보를 넣는다.
    const user = jwt.verify(token, secretKey);
    // 요청받은 body 에서 title 값을 가져온다.
    const { title } = req.body;
    // newTodoId 의 길이를 측정한다, 만약 0일경우 ID를 1로, 0이 아닐경우 마지막  ID에 +1을 한다.
    const newTodoId = todoItems.length === 0 ? 1 : todoItems[todoItems.length - 1].id + 1;

    // 새로운 newTodoItem 객체를 생성한다.
    const newTodoItem = {
      // ID는 위에서 계산한 값을, userID는 1로 고정, title은 위에서 가져온 title값을, dontAt 은 null을, createdAt 과 updatedAt 는 현재시간을 저장한다.
      id: newTodoId,
      userId: Number(user.id),
      title,
      doneAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // todoItems 변수에 newTodoItem를 추가한다.
    todoItems.push(newTodoItem);

    // Number(user.id))
    res.send(newTodoItem);
    // catch 실행
  } catch (error) {
    console.log(error);
    // 권한이 없다고 보낸다.
    res.status(401).send({ message: '당신은 권한이 없습니다.' });
  }
});

// 할일 삭제 API
// req.params로 todo-items 을 삭제하는 API 설계를 시작한다.
// req.headers.authorization로 받아서 token을 저장한다.
// jwt.verify로 token을 디코딩 하여 user 정보를 저장한다.
// req.params로 삭제할 할일 ID를 받아서 저장한다.
// todo-items 에서 find돌려서 해당id의 할일 목록이 있는지 확인한다.
// 삭제할 할일 목록이 없으면 status(404) 과 함께 에러메세지 출력한다.
// 받은 사용자 정보에서 users.id 값과 todo-items의 userId가 일치하는지 확인한다.
// 일치하지 않을 경우 status(401) 과 함께 에러메세지 출력한다.
// 위의 로직을 모두 통과할 경우 splice 를 사용하여 로컬변수에서 삭제한다.
// 그리고 result : true 를 반환한다.

// req.params로 todo-items 를 삭제하는 API 설계를 시작한다.
app.delete('/todo-items/:id', (req, res) => {
  // req.headers.authorization로 받아서 token을 저장한다.
  const token = req.headers.authorization;
  // try 블록을 실행한다.
  try {
    // jwt.verify로 token을 디코딩 하여 user 정보를 저장한다.
    const user = jwt.verify(token, secretKey);
    // req.params로 삭제할 할일 ID를 받아서 저장한다.
    const { id } = req.params;
    // todo-items 에서 find돌려서 해당id의 할일 목록이 있는지 확인한다.
    // 아래의 로직은 todoItems 배열에서 findIndex 메소드를 실행하는데, 조건은 todoItems 객체 배열에서
    // id키 값이, req.params로 입력받은 id값과 일치하는 객체의 index를 deleteItem 변수에 저장하는 로직이다.
    const deleteItem = todoItems.findIndex((todoItem) => todoItem.id === Number(id));
    // 삭제할 할일 목록이 없으면(findIndex 에서 -1을 반환했을때) status(404) 과 함께 에러메세지 출력한다.
    if (deleteItem === -1) {
      res.status(404).send({ message: '할일을 찾을 수 없습니다.' });
      return;
    }
    // 받은 사용자 정보에서 users.id 값과 todo-items의 userId가 일치하는지 확인한다.
    // 아래의 로직은 todoItems객체배열에서 특정 인덱스(위 로직에서 찾은 인덱스)를 참조하여
    // userId 키에 해당하는 값이 jwt.verify 를 통해 판별한 user의 id 값과 일치하지 않는지 확인하는 로직이다.
    if (todoItems[deleteItem].userId !== user.id) {
      // 일치하지 않을 경우 status(401) 과 함께 에러메세지 출력한다.
      res.status(401).send({ message: '당신은 권한이 없습니다.' });
      return;
    }
    // 위의 로직을 모두 통과할 경우 splice 를 사용하여 로컬변수에서 삭제한다.
    todoItems.splice(deleteItem, 1);
    // 그리고 result : true 를 반환한다.
    res.send({ result: 'true' });
  } catch (error) {
    res.status(401).send({ message: '에러가 발생했습니다.' });
  }
});

// 할일 완료/비완료 API
// req.params로 todo-items 을 완료/비완료로 변경하는 API 설계를 시작한다.
// req.headers.authorization로 받아서 token을 저장한다.
// jwt.verify로 token을 디코딩 하여 user 정보를 저장한다.
// req.params로 상태 변경할 할일 ID를 받아서 저장한다.
// todo-items 에서 find돌려서 해당id의 할일 목록이 있는지 확인한다.
// 삭제할 할일 목록이 없으면 status(404) 과 함께 에러메세지 출력한다.
// 받은 사용자 정보에서 users.id 값과 todo-items의 userId가 일치하는지 확인한다.
// 일치하지 않을 경우 status(401) 과 함께 에러메세지 출력한다.
// 위의 로직을 모두 통과할 경우 splice 를 사용하여 로컬변수에서 put한다.
// 그리고 result : true 를 반환한다.

// req.params로 todo-items 을 완료/비완료로 변경하는 API 설계를 시작한다.
app.put('/todo-items/:id', (req, res) => {
  // req.headers.authorization로 받아서 token을 저장한다.
  const token = req.headers.authorization;
  try {
    // jwt.verify로 token을 디코딩 하여 user 정보를 저장한다.
    const user = jwt.verify(token, secretKey);
    // req.params로 상태 변경할 할일 ID를 받아서 저장한다.
    const { id } = req.params;
    // todo-items 에서 find돌려서 해당id의 할일 목록이 있는지 확인한다.
    const selectItemIndex = todoItems.findIndex((sel) => sel.id === Number(id));
    // 삭제할 할일 목록이 없으면 status(404) 과 함께 에러메세지 출력한다.
    if (selectItemIndex === -1) {
      res.status(404).send({ message: '할일을 찾을 수 없습니다.' });
      return;
    }
    // 받은 사용자 정보에서 users.id 값과 todo-items의 userId가 일치하는지 확인한다.
    if (todoItems[selectItemIndex].userId !== user.id) {
      // 일치하지 않을 경우 status(401) 과 함께 에러메세지 출력한다.
      res.status(401).send({ message: '당신은 권한이 없습니다.' });
      return;
    }
    // 위의 로직을 모두 통과할 경우 selectItem 에 할일을 담는다.
    const selectItem = todoItems.find((sel) => sel.id === Number(id));
    const putItem = { ...selectItem, doneAt: selectItem.doneAt == null ? new Date() : null };
    console.log(selectItem);
    // 위의 로직을 모두 통과할 경우 splice 를 사용하여 로컬변수에서 put한다.
    // splice 메소드를 사용하여 todoItems[selectItem] 을 치환한다.
    todoItems.splice(selectItemIndex, 1, putItem);
    res.status(200).send({ result: 'true' });
    // todoItem
  } catch (error) {
    res.status(401).send({ message: '에러가 발생했습니다.' });
  }
});

// 할일 상세 조회 API
app.get('/todo-items/:id', (req, res) => {
  res.send({ message: '할일 상세조회다.' });
});

// 할일 목록들 조회 API
app.get('/todo-items/search/:keyword', (req, res) => {
  res.send({ message: '할일 상세조회다.' });
});
