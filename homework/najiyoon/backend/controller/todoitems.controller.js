import todoItems from "../db/todoitems.js";

///할일목록 조회
export function getTodoItems(req, res, next) {
  try {
    const user = req.user;
    //인증했다면 해당 유저의 아이디로userid 만들어진 할일todoitem 목록 찾아서filter 보내기res
    res.send(todoItems.filter((todoItems) => todoItems.userId === user.id));

    // res.status(200).json({
    //   message: "목록조회에 성공했습니다.",
    // });
  } catch (err) {
    res.status(404).send(err.message);
  }
}

//할일등록
export function postTodoItem(req, res) {
  //인증시 뭘로 인증할건지 그 인증할 것은 어디서 가져올건지
  const user = req.user;
  const { title } = req.body;

  //새로운 할일이 없다면 1, 있다면 할일목록 +1 한 아이디
  const newId = todoItems[todoItems.length - 1]
    ? todoItems[todoItems.length - 1].id + 1
    : 1;

  const newTodoItem = {
    id: newId,
    userId: user.id,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: "2021-08-01",
  };

  //등록  :푸쉬할 곳.push(푸쉬할 것)
  todoItems.push(newTodoItem);
  //결과반환 : 클라이언트에게 전달
  res.send(newTodoItem);
}

//할일목록 1개 조회
export function getTodoItem(req, res, next) {
  //유저정보 가져 왔으니 user.id내가만든 할일todoitems 중에서 하나: 특정 할일id, 만 볼 수 있도록 :찾기
  //근데 아이디는 숫자이고, :id에서 가져옴
  const id = Number(req.params.id);

  const oneTodoItem = todoItems.filter((todoItem) => todoItem.id === id);
  //결과반환
  res.send(oneTodoItem);
}

//수정
export function putTodoItem(req, res, next) {
  //내가 원하는 할일 목록 아이디 찾기, 아이디는 숫자
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({
      result: false,
      message: "id 는 숫자여야 합니다.",
    });
    return;
  }

  //원하는 목록 중 todoItems.id할일 1개 찾기 : 내 할일목록에서 내가 원하는 번호의 목록 하나 수정하기
  const reInPutTodoItem = todoItems.find((todoItems) => todoItems.id === id);
  if (!reInPutTodoItem) {
    res.send({ message: "해당하는 게시글이 없습니다." });
  }
  //수정할 수식 : 내가 원하는 투두아이템 필요함 : reInPutTodoItem /
  //indexof사용 이유 : 내가 수정할 위치에 splice로 수정하기 위함
  //할일 완료 여부 : done / null이면 날짜로, 날짜면 null로
  const putItemIndex = todoItems.indexOf(reInPutTodoItem);
  console.log("putItemIndex--", putItemIndex);
  console.log("reInPutTodoItem-->", reInPutTodoItem);
  todoItems.splice(putItemIndex, 1, {
    ...reInPutTodoItem,
    doneAt: reInPutTodoItem.doneAt === null ? new Date() : null,
  });

  //반환
  res.send({ result: true });
}

//삭제
export function delTodoItem(req, res) {
  ////내가 원하는 할일 목록 아이디 찾기, 아이디는 숫자
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).send({
      result: false,
      message: "id 는 숫자여야 합니다.",
    });
  }
  //삭제하기: 할일이 없을 경우 -1 반환하는 것 생각
  const delTodoItem = todoItems.findIndex((todoItems) => todoItems.id === id);
  if (delTodoItem === -1) {
    res.status(400).json({ message: "해당하는 할일이 없습니다." });
  }

  //할일이 있다면 반환 : 자르기
  todoItems.splice(delTodoItem, 1);
  res.send({ result: true });
}
