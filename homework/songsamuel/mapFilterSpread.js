// map 연습

// 1.
const numbers = [1, 2, 3, 4, 5];

const newNumbers = numbers.map((number) => {
  return number + 2;
});

console.log(newNumbers);

// 2.
//문자열 배열에서 각 문자열의 길이를 반환하는 새로운 배열을 만드세요.
const words = ["hello", "world", "javascript", "is", "fun"];

const lengths = words.map((number) => {
  return number.length;
});

console.log(lengths);

// 3.
//숫자 배열에서 각 숫자의 제곱을 반환하는 새로운 배열을 만드세요.
const numbers3 = [1, 2, 3, 4, 5];

const squares = numbers3.map((number) => {
  return number * number;
});

console.log(squares);

// 4.
//객체 배열에서 각 객체의 name 속성만을 포함하는 새로운 배열을 만드세요.
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

const names = users.map((n) => {
  return n.name;
});

console.log(names);

// filter 연습

// 1.
const fnumbers1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = fnumbers1.filter((fn) => {
  return fn % 2 === 0;
});

console.log(evenNumbers);

// 2. 문자열 배열에서 길이가 4 이상인 문자열만 골라내세요.
const words1 = ["tree", "cat", "elephant", "dog", "fish"];

const longWords1 = words1.filter((word) => {
  if (word.length >= 4) {
    return true;
  } else {
    return false;
  }
});

console.log(longWords1);

// 3. 숫자 배열에서 5보다 큰 숫자만 골라내세요.

const fnumbers3 = [1, 3, 5, 7, 9];

const greaterThanFive = fnumbers3.filter((fn3) => {
  if (fn3 > 5) {
    return true;
  } else {
    return false;
  }
});

console.log(greaterThanFive);

// 4. 객체 배열에서 나이가 30 이상인 객체만 골라내세요.

const users4 = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

const adults = users4.filter((u4) => {
  if (u4.age >= 30) {
    return true;
  } else {
    return false;
  }
});

console.log(adults);

// Spread 연산자 예제

// 1. 두 배열을 하나의 배열로 합치세요.
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combinedArray = [...array1, ...array2];

console.log(combinedArray);

// 2. 객체를 복사하고 새로운 속성을 추가하세요.

const person = { name: "John", age: 30 };

const updatedPerson = { ...person, gender: "man" }; // 왜 여기서는 []가 아니고 {}지??  gender란 객체(key : value)을 새롭게 추가하였기 때문에 {}를 쓴 것이다.
// 단순한 숫자를 추가해도 []를 쓰지 못한다. 왜?  person의 인자 값이 이미 객체의 모양이기 때문에 객체의 모양으로 넣어야한다. ex) num : 5
console.log(updatedPerson);

// 3. 두 문자열 배열을 하나의 배열로 합치세요.

const greetings = ["hello", "hi", "good morning"];
const farewells = ["goodbye", "see you", "take care"];

const phrases = [...greetings, ...farewells];

console.log(phrases);

// 4. 두 객체를 합쳐서 하나의 객체로 만드세요.

const person4 = { name: "Alice", age: 25 };
const job = { title: "Developer", company: "Tech Inc." };

const employee = { ...person4, ...job };

console.log(employee);

// 5. 배열을 복사하고 마지막에 새로운 요소를 추가하세요

const numbers5 = [1, 2, 3, 4];

const newNumbers5 = [...numbers5, 5];

console.log(newNumbers5);
