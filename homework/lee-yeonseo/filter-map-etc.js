//filter, map 메서드 연습
// 1
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function filter1(numbers) {
  return numbers.filter((num) => !(num % 2));
}

function map1(numbers) {
  return numbers.map((num) => `${num}은 숫자입니다.`);
}

console.log("filter 1번", filter1(numbers));
console.log("map 1번", map1(numbers));

// 2
const peoples = [
  { name: "Alice", age: 17 },
  { name: "Bob", age: 22 },
  { name: "Charlie", age: 16 },
  { name: "David", age: 19 },
];

function filter2(peoples) {
  return peoples.filter((people) => people.age >= 18);
}

function map2(peoples) {
  return peoples.map((people) => people.name.toUpperCase());
}

console.log("filter 2번", filter2(peoples));
console.log("map 2번", map2(peoples));

// 3
const products = [
  { id: 1, name: "Apple", price: 1200 },
  { id: 2, name: "Banana", price: 800 },
  { id: 3, name: "Orange", price: 1500 },
  { id: 4, name: "Grapes", price: 2000 },
];

function filter3(products) {
  return products.filter((product) => product.price >= 1000);
}

function map3(products) {
  return products.map((product) => product.price * 0.8);
}

console.log("filter 3번", filter3(products));
console.log("map 3번", map3(products));

//4
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 58 },
  { name: "Charlie", score: 95 },
  { name: "David", score: 77 },
  { name: "Eve", score: 43 },
];

function filter4(students) {
  return students.filter((student) => student.score >= 60);
}

function map4(students) {
  return students.map(
    (student) => `${student.name}의 점수는 ${student.score}점입니다.`
  );
}

console.log("filter 4번", filter4(students));
console.log("map 4번", map4(students));

// 삼항 연산자 연습
// 짝수면 1, 홀수면 -1
function ternary1(num) {
  return num % 2 ? -1 : 1;
}
console.log("ternary1 짝수", ternary1(2));
console.log("ternary1 홀수", ternary1(3));

// 1000원 이상이면 할인
function ternary2(price) {
  return price >= 1000 ? price * 0.9 : price;
}
console.log("ternary2 할인o", ternary2(5000));
console.log("ternary2 할인x", ternary2(900));

// 비구조화할당, 스프레드 연산자 연습
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
};

const userName = user.name;
const copyUser = { ...user, name: "Bob" };
console.log(userName);
console.log(copyUser);

const colors = ["red", "green", "blue"];
const copyColors = [...colors];
copyColors.push("orange");
console.log("colors", colors);
console.log("copyColors", copyColors);
