//map문제 예시
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => [num * 2, num * 5]);
console.log(doubled); // [2, 4, 6, 8, 10]

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
