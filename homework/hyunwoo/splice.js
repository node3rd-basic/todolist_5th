/** splice 함수 사용해보기 */
// Orange 삭제하기
const colors = [ "Red", "Orange", "Yellow", "Green", "Blue", "Navy", "Purple" ];

const deleteOrange = colors.splice(1, 1);

console.log(deleteOrange);
console.log(colors);
console.log("=============================================");

// Green을 Pink로 수정하기
const colors2 = [ "Red", "Orange", "Yellow", "Green", "Blue", "Navy", "Purple" ];

const patchGreen = colors2.splice(3, 1, "Pink");

console.log(patchGreen);
console.log(colors2);
console.log("=============================================");

// index값 찾아서 할일 수정하기
const todos = [
    { id: 1, do: "study-node", where: "home", date: "Everyday" },
    { id: 2, do: "homework", where: "home", date: "Thursday" },
    { id: 3, do: "project", where: "home", date: "Wednesday"} ,
    { id: 4, do: "project-growth", where: "home", date: "Thursday" },
    { id: 5, do: "algorithm", where: "home", date: "Everyday" },
    { id: 6, do: "car-wash", where: "car-wash", date: "Sunday" },
    { id: 7, do: "running", where: "park", date: "Monday" },
    { id: 8, do: "health", where: "gym", date: "Wednesday" },
    { id: 9, do: "shopping", where: "mart", date: "Saturday" },
    { id: 10, do: "cleaning", where: "home", date: "Tuesday" }
];

const todoId = 3;

const existTodo = todos.find((todo) => todo.id === todoId);

const todoIndex = todos.indexOf(existTodo);

const patchTodo = todos.splice(todoIndex, 1, { id: 3, do: "conference", where: "home", date: "Wednesday"});

console.log(patchTodo);
console.log(todos);
console.log("=============================================");

// spread 사용하여 할일 수정하기
const todos2 = [
    { id: 1, do: "study-node", where: "home", date: "Everyday" },
    { id: 2, do: "homework", where: "home", date: "Thursday" },
    { id: 3, do: "project", where: "home", date: "Wednesday"} ,
    { id: 4, do: "project-growth", where: "home", date: "Thursday" },
    { id: 5, do: "algorithm", where: "home", date: "Everyday" },
    { id: 6, do: "car-wash", where: "car-wash", date: "Sunday" },
    { id: 7, do: "running", where: "park", date: "Monday" },
    { id: 8, do: "health", where: "gym", date: "Wednesday" },
    { id: 9, do: "shopping", where: "mart", date: "Saturday" },
    { id: 10, do: "cleaning", where: "home", date: "Tuesday" }
];

const todoId2 = 10;

const existTodo2 = todos2.find((todo) => todo.id === todoId2);

const todoIndex2 = todos2.indexOf(existTodo2);

const patchTodo2 = todos2.splice(todoIndex2, 1, { ...existTodo2, do: "study JWT" });

console.log(patchTodo2);
console.log(todos2);
console.log("=============================================");

// index값 찾아서 할일 삭제하기
const todos3 = [
    { id: 1, do: "study-node", where: "home", date: "Everyday" },
    { id: 2, do: "homework", where: "home", date: "Thursday" },
    { id: 3, do: "project", where: "home", date: "Wednesday"} ,
    { id: 4, do: "project-growth", where: "home", date: "Thursday" },
    { id: 5, do: "algorithm", where: "home", date: "Everyday" },
    { id: 6, do: "car-wash", where: "car-wash", date: "Sunday" },
    { id: 7, do: "running", where: "park", date: "Monday" },
    { id: 8, do: "health", where: "gym", date: "Wednesday" },
    { id: 9, do: "shopping", where: "mart", date: "Saturday" },
    { id: 10, do: "cleaning", where: "home", date: "Tuesday" }
];

const todoId3 = 6;

const existTodo3 = todos3.find((todo) => todo.id === todoId3);

const todoIndex3 = todos3.indexOf(existTodo3);

const deleteTodo = todos3.splice(todoIndex3, 1);

console.log(deleteTodo);
console.log(todos3);
console.log("=============================================");