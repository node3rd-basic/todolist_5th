/** map 사용해보기 */
// 문자 더해서 배열 만들기
const colors = [ "Red", "Orange", "Yellow", "Green", "Blue", "Navy", "Purple" ];

const colorBalls = colors.map(colors => colors + " Ball");

console.log(colorBalls);
console.log("========================");

// 문자와 숫자 더해서 배열 만들기
const numbers = [ 1, 2 ,3 ,4 ,5 ];

const numberPeople = numbers.map(numbers => numbers + "명 입니다.");

console.log(numberPeople);
console.log("========================");

// 해당하는 value 찾아서 배열 만들기
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

const todoLists = todos.map(todos => todos.do);

console.log(todoLists);
console.log("========================");


/** filter 사용해보기 */
// 10의 배수만 찾아서 배열 만들기
const fiveTimes = [ 5, 10 ,15 ,20 ,25 ,30, 35 ,40, 45 ,50 ];

const tenTimes = fiveTimes.filter(fiveTimes => fiveTimes % 10 === 0 );

console.log(tenTimes);
console.log("========================");

// 조건에 맞는 Object만 배열 만들기
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

const todoEveryday = todos.filter(todos2 => todos2.date === "Everyday");

console.log(todoEveryday);
console.log("========================");


/** 스프레드 연산자(...) 사용해보기 */
// 배열 복제 후 일치여부 확인하기
const sports = [ "soccer", "baseball", "hockey"];
const copySports = [ ...sports ];

console.log(sports === copySports);
console.log("========================");

// 배열 합치기
const individualSports = [ "golf", "tennis", "racing" ];
const teamSports = [ "soccer", "baseball", "hockey" ];

const addSports = [ ...individualSports, ...teamSports ];

console.log(addSports);
console.log("========================");

// Object에서 value 변경하기
const todoEveryday2 = { id: 1, do: "study-node", where: "home", date: "Everyday" };

const changetodoEveryday2 = { ...todoEveryday2, where: 'starbucks'};

console.log(changetodoEveryday2);