// import todoItems from "../db/todoitems.js";
import todoItemsDB from "../db/todoitems.js";
import * as todoItemsRepository from "../repository/todoitems.repository.js";
//userId를 가져왔으니 user.id에서 userId로
//인증했다면 해당 유저의 아이디로userid 만들어진 할일todoitem 목록 찾아서filter 보내기res
//목록조회
export async function getTodoItemsByUserId(userId) {
  return await todoItemsRepository.findMany(userId);
}
//할일등록
export async function postTodoItem(user_id, title) {
  const newTodoItem = {
    user_id: user_id,
    title: title,
  };
  const savedTodoItemId = await todoItemsRepository.saveTodoItem(newTodoItem);
  //api 스펙이 안맞으므로 다시 돌려야함 맵 : 아이디로 투두아이템 조회해서 꺼내와야함
  //아이디로 1개조회 -> 이걸로 맵 돌리기
  const savedTodoItem = await todoItemsRepository.oneTodoItem(savedTodoItemId);
  console.log("savedTodoItem->", savedTodoItem);
  //하나씩 지정해주기.......
  return {
    id: savedTodoItem.id,
    userId: savedTodoItem.user_id,
    title: savedTodoItem.title,
    doneAt: savedTodoItem.done_at,
    createdAt: savedTodoItem.created_at,
    updatedAt: savedTodoItem.updated_at,
  };
}
//할일 1개 조회
export async function oneTodoItem(id) {
  const todoItem = await todoItemsRepository.oneTodoItem(id);
  if (!todoItem) {
    throw new Error("투두아이템이 없습니다.");
  }
  return todoItem;
}
//할일수정//

export async function toggleTodoItemDone(userId, id) {
  console.log("iddddd", id);
  const todoItem = await todoItemsRepository.oneTodoItem(id);
  console.log("todoItem----->", todoItem);
  if (!todoItem) {
    throw new Error("해당 투두아이템을 찾을 수 없습니다.");
  }
  if (todoItem.user_id !== userId) {
    throw new Error("일치하지 않습니다.");
  }
  return await todoItemsRepository.update(id);
}
//삭제
export async function findDelById(userId, id) {
  const findTodoItem = await todoItemsRepository.oneTodoItem(id);
  if (!findTodoItem) {
    throw new Error("일치하지 않습니다.");
  }
  //userid와 todoItem의 유저아이디가 같은지 확인해야함
  console.log("findTodoItem-->", findTodoItem);
  if (findTodoItem.user_id !== userId) {
    console.log("user_id-->", findTodoItem.user_id);
    console.log("userId", userId);
    throw new Error("할말이없당...");
  }
  await todoItemsRepository.deleteItem(id);
  //할일이 있다면 : 자르기
  // todoItemsRepository.spliceIndex(delTodoItem, 1);
  return;
}
