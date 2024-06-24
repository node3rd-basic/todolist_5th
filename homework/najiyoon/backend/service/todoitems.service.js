// import todoItems from "../db/todoitems.js";
import * as todoItemsRepository from "../repository/todoitems.repository.js";
//userId를 가져왔으니 user.id에서 userId로
//인증했다면 해당 유저의 아이디로userid 만들어진 할일todoitem 목록 찾아서filter 보내기res
//목록조회
export function getTodoItemsByUserId(userId) {
  return todoItemsRepository.findMany(userId);
}
//할일등록
export function postTodoItem(userId, title) {
  const newId = todoItemsRepository.getNewId();

  const newTodoItem = {
    id: newId,
    userId: userId,
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: "2021-08-01",
  };
  todoItemsRepository.saveTodoItem(newTodoItem);
  return newTodoItem;
}
//할일 1개 조회
export function oneTodoItem(id) {
  const todoItem = todoItemsRepository.oneTodoItem(id);
  if (!todoItem) {
    throw new Error("투두아이템이 없습니다.");
  }
  return todoItem;
}

//수정
export function putTodoItem(id) {
  if (isNaN(id)) {
    res.status(400).send({
      result: false,
      message: "id 는 숫자여야 합니다.",
    });
    return;
  }

  //원하는 목록 중 todoItems.id할일 1개 찾기 : 내 할일목록에서 내가 원하는 번호의 목록 하나 수정하기
  const reInPutTodoItem = todoItemsRepository.oneTodoItem(
    (todoItems) => todoItems.id === id
  );
  if (!reInPutTodoItem) {
    res.send({ message: "해당하는 게시글이 없습니다." });
  }
  //수정할 수식 : 내가 원하는 투두아이템 필요함 : reInPutTodoItem /
  //indexof사용 이유 : 내가 수정할 위치에 splice로 수정하기 위함
  //할일 완료 여부 : done / null이면 날짜로, 날짜면 null로
  const putItemIndex = todoItems.indexOf(reInPutTodoItem);
  todoItems.splice(putItemIndex, 1, {
    ...reInPutTodoItem,
    doneAt: reInPutTodoItem.doneAt === null ? new Date() : null,
  });
}
