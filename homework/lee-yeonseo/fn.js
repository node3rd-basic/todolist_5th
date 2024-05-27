//콜백함수 실습
//콜백함수 = 다른 함수의 매개변수로 전달되어 나중에 호출되는 함수...

function sayHello(name) {
  console.log(`hello, ${name}!`);
}

function greet(callback) {
  const name = "lys";
  callback(name); // === console.log(`hello, ${name}!`)
}

greet(sayHello);
/**여기서 sayHello(lys)처럼 괄호를 열면 sayHello가 이미 실행을 하기 때문에
 * greet 내부의 callback(name)부분이 함수가 아닌게 되어서 오류가 생긴다..?
 * 그래서 매개변수로 콜백함수를 넣을 때는 괄호를 열면 안된다..?*/

//1
const numbersArray = [1, 2, 3, 4, 5];

function callback1(number) {
  return number * 2;
}

function fn1(numbers_Array, callback1) {
  return numbers_Array.map(callback1); //.map(num=>num*2)...?
}

console.log("1번", fn1(numbersArray, callback1));

//2
function callback2(number) {
  return number ** 2;
}

function fn2(number, callback2) {
  return callback2(number);
}

console.log("2번", fn2(2, callback2));

//3
function callback3(str) {
  const a = str.substring(0, 1);
  console.log("3번,", `${a}는 ${str}의 첫번째 글자입니다.`);
}

function fn3(callback) {
  const str = "안녕하세요";
  callback(str);
}

fn3(callback3);

//화살표 함수
const fn4 = (num) => `${num * 2}는 ${num}의 2배수입니다.`;
console.log("4번", fn4(4));

//2
const strArray = ["a", "b", "c", "d", "e", "f"];
const fn5 = (arr, num) => {
  return arr[num];
};

console.log("5번", fn5(strArray, 4));

//3
const fn6 = (a, b) => (a > b ? 1 : 0);
console.log("6번", fn6(3, 7));

//일반 함수
function fn7(str) {
  return str.length;
}
console.log("7번", fn7("으어ㅏ라ㅏㅏㅏ"));

//2
function fn8(a, b) {
  return a > b ? a : b;
}
console.log("8번", fn8(3, 6));

//3
const numArr = [3, 4, 5, 1, 3, 5, 9];
function fn9(arr) {
  return arr.findIndex((num) => num === 1);
}
console.log("9번", fn9(numArr));

//4
function fn10(str) {
  return str.substring(3, 6);
}
console.log("10번", fn10("으어아안녕하세에요"));

//find 메서드
const numbers = [1, 3, 5, 8, 9, 10];
function find1(numbers) {
  return numbers.find((num) => num % 2 === 0);
}

console.log("find 1번", find1(numbers));

//2
const fruits = ["apple", "banana", "orange", "grape"];
function find2(fruits, type) {
  return fruits.find((fruit) => fruit === type);
}
console.log("find 2번", find2(fruits, "banana"));

//3
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

function find3(users) {
  return users.find((user) => user.id === 2);
}
console.log("find 3번", find3(users));

//4
const products = [
  { id: 1, name: "Apple", price: 1000 },
  { id: 2, name: "Banana", price: 500 },
  { id: 3, name: "Orange", price: 1500 },
];

function find4(products, price) {
  return products.find((product) => product.price === price);
}

console.log("find 4번", find4(products, 500));
