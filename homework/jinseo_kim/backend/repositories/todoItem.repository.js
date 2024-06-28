import todoItemsFromDB from '../db/todoItems.js';

// 여러개 찾기
// userId를 매개변수로 받아서 할일 찾기
export function findMany(userId) {
  // todoItemsFromDB에서 filter 메서드를 실행하는데 userId를 매개변수로 해서, userId 값이 일치하는 할일 객체를 반환한다.
  return todoItemsFromDB.filter((todoItem) => todoItem.userId === Number(userId));
}

// todoItem을 매개변수로 받아 데이터 베이스에 할일 넣기
export function pushItem(todoItem) {
  // todoItemsFromDB에 push 메서드를 실행하는데 새로운 할일 객체가 들어있는 todoItem를 넣는다.
  return todoItemsFromDB.push(todoItem);
}

// 새로운 ID 값 생성
export function getNewId() {
  // todoItemsFromDB의 길이를 측정하여, 0이면 1을, 아니면 todoItemsFromDB의 길이의 -1인 INDEX(마지막 요소)의 ID 값에 1을 더해서 반환한다.
  return todoItemsFromDB.length === 0 ? 1 : todoItemsFromDB[todoItemsFromDB.length - 1].id + 1;
}

// 매개변수로 ID를 받아서 할일 찾기
export function findOneById(id) {
  // todoItemsFromDB 에서 find 메서드를 실행하는데 ID 값을 매개변수로 해서, 동일한 ID 값을 가진 할일객체를 반환한다.
  return todoItemsFromDB.find((todoItem) => todoItem.id === id);
}

// 할일 업데이트
// todoItem 과 doneAt를 매개변수로 받는다.
export function update(todoItem, doneAt) {
  // todoItemsFromDB 에서 indexOf 메서드를 사용하여 매개변수로 받은 todoItem객체를 찾고, 인덱스 값을 todoItemIndex에 저장한다.
  const todoItemIndex = todoItemsFromDB.indexOf(todoItem);
  // todoItemsFromDB 에서 splice 메서드를 사용하여 todoItemIndex의 위치에서 1개의 todoItem를 지우고,
  // todoItemIndex의 위치에 스프레드 연산자를 사용하여 todoItem의 doneAt을 넣고 넣어, todoItem를 업데이트 한다.
  todoItemsFromDB.splice(todoItemIndex, 1, { ...todoItem, doneAt });
}

//  todoItem을 매개변수로 받아서 할일 삭제
export function deleteOne(todoItem) {
  // todoItemsFromDB에서 indexOf로 일치하는 todoItem의 할일 객체를 찾아 deleteItemIndex에 저장한다.
  const deleteItemIndex = todoItemsFromDB.indexOf(todoItem);
  // todoItemsFromDB에서 splice로 deleteItemIndex의 위치에서 1개의 todoItem을 삭제한다.
  todoItemsFromDB.splice(deleteItemIndex, 1);
}
