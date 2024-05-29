const ballpocket = ["빨간공", "파란공", "노란공", "초록공", "보라공", "주황공"];
const ballpocket_clone = [...ballpocket, "검정공"];

//추가하여 복제도 가능하다.
console.log(ballpocket);
console.log(ballpocket_clone);

ballpocket.push("흰색공");

//이건 안되네 ?
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
