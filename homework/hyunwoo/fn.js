/** 다양한 함수 10개 만들어보기 */

// 1. 기본 함수 표현식
function sum(a, b) {
  return a + b;
}
console.log(sum(2, 4));

// 2. 화살표 함수로 변경
const subtraction = (a, b) => {
  return a - b;
};
console.log(subtraction(10, 5));

// 3. 화살표 함수 축약하기
const multiplication = (a, b) => a * b;
console.log(multiplication(3, 7));

// 4. void 함수
function nothing(not) {
  console.log("반환값이" + not);
}
nothing("없습니다.");

// 5. 타입이 다른 변수 넣어보기 - 숫자, 문자 더하기
const numStr = (a, b) => a + b;
console.log(numStr(2024, "년도입니다."));

// 6. 타입이 다른 변수 넣어보기(2) - NaN 반환하기
const minusStr = (a, b) => a - b;
console.log(minusStr("뺄셈을 합니다.", 10));

// 7. 변수에 함수 작성하기
const square = (a, b) => a * b;
console.log(square(multiplication(2, 4), 5));

// 8. 변수에 함수 작성하기(2)
const num2 = () => 2;
const sum2 = (n) => num2() * n;
console.log(sum2(5));

// 9. 콜백함수
const sayHello = (callback) => {
  const today = "오늘도";
  callback(today);
};
sayHello((today) => {
  console.log(today + " 안녕하세요");
});

// 10. 콜백함수(2)
const sum3 = (a, b) => a + b;
const subtraction2 = (a, b) => a - b;
const multiplication2 = (a, b) => a * b;
const division = (a, b) => a / b;

const calculator = (callback, a, b) => {
  return callback(a, b);
};

console.log("더하면" + calculator(sum3, 10, 5));
console.log("빼면" + calculator(subtraction2, 10, 5));
console.log("곱하면" + calculator(multiplication2, 10, 5));
console.log("나누면" + calculator(division, 10, 5));


/** find 함수 연습하기 */

// 영화목록에서 영화 이름으로 정보 검색하기
const movieList = [
  { id: 1, name: "The Shawshank Redemption", rate: "8.7" },
  { id: 2, name: "The Godfather", rate: "8.695" },
  { id: 3, name: "The Godfather Part II", rate: "8.576" },
  { id: 4, name: "Schindler's List", rate: "8.567" },
  { id: 5, name: "12 Angry Men", rate: "8.541" },
  { id: 6, name: "Dilwale Dulhania Le Jayenge", rate: "8.538" },
  { id: 7, name: "Spirited Away", rate: "8.536" },
  { id: 8, name: "The Dark Knight", rate: "8.515" },
  { id: 9, name: "Parasite", rate: "8.509" },
  { id: 10, name: "The Green Mile", rate: "8.505" },
];

const findMovieName = (name) => {
  return movieList.find((movie) => movie.name === name);
};

const movieInfos = findMovieName("The Godfather");
console.log(movieInfos);
