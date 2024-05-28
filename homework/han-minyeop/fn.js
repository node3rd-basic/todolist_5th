function 안녕() {
  console.log("hi!");
}

안녕(); 

const 화살표함수 = () => {
  console.log("hi!");
}

화살표함수();

function 인사하기(name) {
  console.log("hi! " + name);
}

인사하기("minyeop");

function 더하기(a, b) {
  return a + b;
}

console.log(더하기(1, 2)); 

const 동물 = ["호랑이", "사자", "코끼리", "기린", "원숭이", "돼지"];

const 호랑이 = 동물.find(동물 => 동물 === "호랑이");
const 코끼리 = 동물.find(동물 => 동물 === "코끼리"); 

console.log("호랑이", 호랑이);
console.log("코끼리", 코끼리);

const 숫자 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const 짝수 = 숫자.filter(숫자 => 숫자 % 2 === 0);
const 홀수 = 숫자.filter(숫자 => 숫자 % 2 !== 0);

console.log("짝수", 짝수); // [2, 4, 6, 8, 10]

function 콜백함수(함수) {
  함수();
}

콜백함수(() => {
  console.log("콜백함수 실행");
} );