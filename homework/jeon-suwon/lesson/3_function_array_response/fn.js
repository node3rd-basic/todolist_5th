// 함수 만드는법 3가지

//함수선언식
function funcA() {
  console.log("함수A가 호출됨");
}
//함수표현식
const funcB = function () {
  console.log("함수B가 호출됨");
};
//화살표함수
const arrowfunc = () => {
  console.log("화살표 함수가 호출됨");
};

// 함수 호출
funcA();
funcB();
arrowfunc();

//함수 인자 활용
function sumA(value1, value2) {
  console.log(value1 + value2);
}

const resultA = sumA(1, 2);
//함수에 함수를 넣어서 undefinde.
console.log("덧셈 값입니다.", resultA);

console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
//함수안에 함수
function sumB(value1, value2, value3 = 5) {
  const result = value1 + value2;

  // function multiA(a, b) {
  //   return a * b;
  // }
  const multiA = (a, b) => a * b;

  return multiA(result, value3);
}

const resultB = sumB(1, 2, 3);
console.log("덧셈 값입니다.", resultB);

//

// 함수는 단순하게 만든다 -> 한가지 일만 하도록 만든다.
// 화살표 함수 축약형
//  - return 문이 한줄인 경우 return 키워드와 중괄호를 생략할 수 있다.
//  - 인자가 하나인 경우 인자를 감싸는 괄호를 생략할 수 있다.

const arrowfuncsumA = (value1, value2) => {
  return value1 + value2;
};

const arrowfuncsumB = (value1, value2) => value1 + value2;

console.log("화살표함수", arrowfuncsumA(1, 2));
console.log("화살표함수_축약형", arrowfuncsumB(1, 2));
//위와 아래의값이 동일하다는것을 볼 수 있다.

const getSumOfTwoNumbers = (num1, num2) => num1 + num2;
// if (num1 > 10) {
//     throw new Error("num1은 10보다 작아야 합니다.")
// }

console.log("sum : ", getSumOfTwoNumbers(9, 2) * 100);
console.log("sum : ", getSumOfTwoNumbers(111, 2) * 100);

// callback 함수
function findUserAndCallBack(id, cb) {
  const user = {
    id: id,
    name: "User" + id,
    email: id + "@test.com",
  };
  cb(user);
}

findUserAndCallBack(1, function (user) {
  console.log("user:", user);
});

// 배열

// find() ex)
const 공주머니 = ["빨간공", "파란공", "노란공", "초록공", "보라공", "주황공"];

const 공 = 공주머니.find((el) => {
  const tool = el == "공";
  return tool;
});
const 초록공 = 공주머니.find((공) => 공 === "공");

console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
console.log("빨간공", 공);
console.log("초록공", 초록공);

const Data = {
  movie: [
    { id: 1, name: "영화1", 개봉일: "2024-05-11" },
    { id: 2, name: "영화2", 개봉일: "2024-05-12" },
    { id: 3, name: "영화3", 개봉일: "2024-05-13" },
    { id: 4, name: "영화4", 개봉일: "2024-05-14" },
    { id: 5, name: "영화4", 개봉일: "2024-05-14" },
    { id: 6, name: "영화4", 개봉일: "2024-05-14" },
  ],
  book: [
    { id: 1, name: "책1", 개봉일: "2024-05-21" },
    { id: 2, name: "책2", 개봉일: "2024-05-22" },
    { id: 3, name: "책3", 개봉일: "2024-05-23" },
    { id: 4, name: "책4", 개봉일: "2024-05-24" },
  ],
};

// const movie = [
//   { id: 1, name: "영화1", 개봉일: "2024-05-11" },
//   { id: 2, name: "영화2", 개봉일: "2024-05-12" },
//   { id: 3, name: "영화3", 개봉일: "2024-05-13" },
//   { id: 4, name: "영화4", 개봉일: "2024-05-14" },
//   { id: 5, name: "영화4", 개봉일: "2024-05-14" },
//   { id: 6, name: "영화4", 개봉일: "2024-05-14" },
// ];

// const book = [
//   { id: 1, name: "책1", 개봉일: "2024-05-21" },
//   { id: 2, name: "책2", 개봉일: "2024-05-22" },
//   { id: 3, name: "책3", 개봉일: "2024-05-23" },
//   { id: 4, name: "책4", 개봉일: "2024-05-24" },
// ];
// const dataid = movie.find((data) => data.id === 1);

const findid = (dataType, id) => {
  const selectdata = Data[dataType];
  if (!selectdata) {
    return `선택하신 ${dataType}는 존재하지 않는 데이터 타입입니다.`;
  }

  const finddataid = selectdata.find((el) => el.id === id);
  if (id > selectdata.length) {
    return `선택하신 ${id}는 존재하지않는 id입니다.`;
  }
  return finddataid;
};

console.log(findid("movie", 2));
//                   ㄴ> movie를 Data객체안에 넣어서 변수말고 String값으로 넣어야한다.
console.log(findid("book", 3));
console.log(findid("book", 11));
console.log(findid("book", 5));
