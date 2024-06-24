import * as todoItemRepository from '../repositories/todoItem.repository.js';

// userId를 매개변수로 받아서 할일 찾기
export function getTodoItemsByUserId(userId) {
  // todoItemRepository의 findMany 메서드를 실행하는데 userId 값을 매개변수로 준다.
  return todoItemRepository.findMany(userId);
}

// 할일 찾기
// 매개변수로 ID를 받아서 할일 찾기
export function getTodoItemById(id) {
  // todoItemRepository의 findOneById 메서드를 실행하는데 ID 값을 매개변수로 준다.
  // todoItem에는 반환받은 할일 객체가 들어있다.
  const todoItem = todoItemRepository.findOneById(id);
  // todoItem이 없으면 에러 던지기.
  if (!todoItem) {
    throw new Error('Todo item not found');
  }
  // 위의 로직을 패스할 경우 todoItem를 반환한다.
  return todoItem;
}

// 할일 생성
// 매개변수로 title, userId를 받아서 할일 생성
export function createTodoItem(title, userId) {
  // todoItemRepository의 getNewId를 실행하여 newTodoId에 id값을 저장한다.
  const newTodoId = todoItemRepository.getNewId();
  // id, userId, title, doneAt, createdAt, updatedAt 을 각각의 값으로 채운 후, newTodoItem 객체에 저장한다.
  const newTodoItem = {
    id: newTodoId,
    userId: Number(userId),
    title: title,
    doneAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  // todoItemRepository의 pushItem 메소드를 실행하는데 저장한 newTodoItem를 매개변수로 준다.
  todoItemRepository.pushItem(newTodoItem);
  // 저장한 newTodoItem 값을 반환한다.
  return newTodoItem;
}

// 할일 삭제
// 매개변수로 ID를 받아서 할일 삭제
export function deleteTodoItemById(id) {
  // getTodoItemById 메서드를 실행하는데 ID 값을 매개변수로 주고, 찾은 할일 객체를 selectedTodoItem에 저장한다.
  const selectedTodoItem = getTodoItemById(id);
  // todoItemRepository의 deleteOne 메서드를 실행하는데, selectedTodoItem을 매개변수로 준다.
  todoItemRepository.deleteOne(selectedTodoItem);
}

// 할일 상태 수정
// 매개변수로 ID를 받는다.
export function toggleDonAtById(id) {
  // getTodoItemById 메서드를 실행하는데 ID 값을 매개변수로 준다.
  // 이 메서드가 실행되어 찾은 할일 객체를 selectedTodoItem에 저장한다.
  const selectedTodoItem = getTodoItemById(id);
  // 찾은 todoItem 객체 에서 doanAt의 값이 Null 이면 지금날짜를 dontAt에 넣어준다.
  const doneAt = selectedTodoItem.doneAt ? null : new Date();
  // update 메소드 호출하여 실행하는데 매개변수는 찾은todo item 과 done at
  // todoItemRepository의 update 메서드를 호출하는데 매개변수로 selectedTodoItem과, dontAt을 넣어준다.
  todoItemRepository.update(selectedTodoItem, doneAt);
}
