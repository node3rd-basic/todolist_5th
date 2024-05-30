//map문제 예시

//1.
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => [num * 2, num * 5]);
//                                         ㄴ > 배열안에 배열형태로도 만들수있음.
console.log(doubled); // [ [ 2, 5 ], [ 4, 10 ], [ 6, 15 ], [ 8, 20 ], [ 10, 25 ] ]

//2.
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];
const names = users.map((user) => user.name);
console.log(names); // ["Alice", "Bob", "Charlie"]
//                           ㄴ > 배열안에 객체에서 원하는 값만 가져 올 수 있다.

//3.
const numberss = [1, 2, 3, 4, 5];
const objects = numberss.map((num) => ({ value: num }));
console.log(objects); // [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]
//                            ㄴ> 배열값을 객체형태로 만들 수 있다

//4.
const letters = ["a", "b", "c", "d"];
const indexed = letters.map((letter, index) => [letter, index]);
console.log(indexed); // [['a', 0], ['b', 1], ['c', 2], ['d', 3]]
//                           ㄴ> 맵에 인덱스 사용

//활용예시
function solution(sizes) {
  const sortedSizes = sizes.map((size) => [
    Math.max(size[0], size[1]),
    Math.min(size[0], size[1]),
  ]);

  const maxWidth = Math.max(...sortedSizes.map((size) => size[0]));

  //const maxWidth = ([...sortedSizes].map((size) => size[0]));
  //[ 60, 70, 60, 80 ]

  const maxHeight = Math.max(...sortedSizes.map((size) => size[1]));
  console.log(maxWidth);

  const walletSize = maxWidth * maxHeight;
  return walletSize;
}

//filter
const filternumbers = [1, 2, 3, 4, 5, 6];
const evens = filternumbers.filter((num) => num % 2 === 0);
console.log(evens); // [2, 4, 6]

const number = [1, 2, 3, 4, 5];
const withoutThree = number.filter((num) => num !== 3);
console.log(withoutThree); // [1, 2, 4, 5]

const user = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];
const adults = users.filter((user) => user.age >= 30);
console.log(adults); // [{ name: 'Bob', age: 30 }, { name: 'Charlie', age: 35 }]

const items = [{ id: 1, name: "item1" }, { id: 2, name: "item2" }, { id: 3 }];
const itemsWithName = items.filter((item) => item.name !== "");
console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
console.log(itemsWithName); // [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }]

// 테스트 케이스
console.log(
  solution([
    [60, 50],
    [30, 70],
    [60, 30],
    [80, 40],
  ])
); // 4000

const ballpocket = ["빨간공", "파란공", "노란공", "초록공", "보라공", "주황공"];
const ballpocket_clone = [...ballpocket, "검정공"];

//추가하여 복제도 가능하다.
console.log(ballpocket);
console.log(ballpocket_clone);

ballpocket.push("흰색공");

//이건 안되네
console.log(ballpocket);
console.log(ballpocket_clone);

//구조 분해 할당
let [item1 = "ball", item2 = "book", ...rest] = ["good", "very", "out"];

console.log(...rest);

let [i, j] = [10, 20];
console.log(i); // 10
console.log(j); // 20

let array = [1, 2, 3, 4, 5];
let [a, b, ...rests] = array;
console.log(a, b); // 1, 2
console.log(...rests); //3, 4, 5
