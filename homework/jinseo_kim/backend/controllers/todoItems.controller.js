import * as todoItemService from '../services/todoItem.service.js';
import * as validate from '../validatetor/todoitemid.validatetor.js';

// // ID값이 숫자인지 검증
// // 매개변수로 req를 받아서 실행한다.
// const validateTodoItemId = (req) => {
//   // req.params.id를 숫자로 변환 하고, idAsNumber에 저장한다.
//   const idAsNumber = Number(req.params.id);
//   // idAsNumber이 NaN(Not a Number)이면 에러를 던진다.
//   if (isNaN(idAsNumber)) {
//     throw new Error('Id must be a number');
//   }
//   // 위의 로직을 패스하면 idAsNumber를 반환한다.
//   return idAsNumber;
// };

// 할일 목록들 조회
export function getTodoItems(req, res) {
  // req.user를 받아 user에 저장한다.
  const user = req.user;
  // todoItemService의 getTodoItemsByUserId메소드를 실행하는데 user.id를 매개변수로 실행한다.
  // 해당 user.id 와 일치하는 할일객체들이 todoItems에 저장된다.
  const todoItems = todoItemService.getTodoItemsByUserId(user.id);
  // res로 todoItems를 반환한다.
  res.send(todoItems);
}

// 할일 등록
export function postTodoItem(req, res) {
  // req.body로 받은 title을 title에 저장한다.
  const { title } = req.body;
  // req.user로 받은 user를 user에 저장한다.
  const user = req.user;
  // todoItemService의 createTodoItem메소드를 실행하는데 title, user.id를 매개변수로 실행한다.
  // newTodoItem에는 새로운 title과 id를 가진 할일 객체가 저장되 있고, 데이터베이스에 push 되있다.
  const newTodoItem = todoItemService.createTodoItem(title, user.id);
  // newTodoItem를 반환한다.
  res.send(newTodoItem);
}

// 할일 삭제 API
export function deleteTodoItem(req, res) {
  // 입력받은 id값이 숫자인지 검사하고, 숫자가 맞다면 id에 저장한다.
  const id = validate.validateTodoItemId(req);
  // todoItemService의 deleteTodoItemById메소드를 실행하는데 id를 매개변수로 실행한다.
  // 이 메소드가 실행되면 데이터베이스에서 id를 가진 todoItem를 삭제한다.
  todoItemService.deleteTodoItemById(id);
  // result: 'true' 를 반환한다.
  res.send({ result: 'true' });
}

// 할일 완료/미완료
export function putTodoItem(req, res) {
  // 입력받은 id값이 숫자인지 검사하고, 숫자가 맞다면 id에 저장한다.
  const id = validate.validateTodoItemId(req);
  // todoItemService의 toggleDonAtById메소드를 실행하는데 id를 매개변수로 실행한다.
  // 이 메소드가 실행되면 id를 가진 todoItem의 doneAt 값을 toggle 된다.
  todoItemService.toggleDonAtById(id);
  // result: 'true' 를 반환한다.
  res.send({ result: 'true' });
}
