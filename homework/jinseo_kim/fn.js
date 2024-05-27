// 1. 함수 선언문 과 함수 표현식
function 함수선언문() {}
const 함수표현식 = () => {};

// 2. 함수를 실행하는 방법
함수선언문();
함수표현식();

// 3. VOID 함수
function void함수() {
  console.log("이것은 VOID 함수라고 합니다.");
}
void함수();
// 이 함수는 내부 로직에서 return 값이 없으나, 콘솔에 출력되기는 한다.
// 이처럼 명시적으로 반환값이 없는 함수를 void 함수라고 한다.

// 4. 실제 함수를 사용해보기.
function 헬로월드() {
  return console.log("Hello World!");
}
function 굿바이월드() {
  return console.log("Goodbye World!");
}
헬로월드(); //Hello World!
굿바이월드(); //Goodbye World!

// 5-1. 함수를 변수에 담아서 사용해보기.
const 변수함수 = (num) => {
  let number = num * num;
  return number;
};
console.log(변수함수(3)); // 9

// 5-2. 함수를 변수에 담아서 사용해보기를 간결하게 줄여보기
const 변수함수2 = (num) => num * num;
console.log(변수함수2(3)); // 9
// 이 코드는 입력받는 매개변수가 하나
// return 도 하나로 되어로써 매개변수의 ( )를 생략가능하고
// 내부로직의 중괄호 역시 생략이 가능하다.

// 6. 콜백함수
const 외부함수 = () => {
  const 내부함수 = () => {
    return "Goodbye World";
  };
  return 내부함수();
};
console.log(외부함수());

// 이 콜백함수 코드는 외부함수 안에 내부함수가 들어있고, 내부함수는 Goodbye World 를 return 한다.
// 외부 함수는 다시 내부함수의 값을 return 한다.
// console.log 를 통해 외부함수를 실행하면 Goodbye World 가 출력된다.

// 7. 함수 연습하기
// undefined 출력
function 함수01() {
  return;
}
console.log(함수01());

// 고정된 값 1004 반환
function 함수2() {
  return 1004;
}
console.log(함수2());

// 입력받은 매개변수를 계산하여 반환
function 함수3(num) {
  return (num * num) / num + 1;
}
console.log(함수3(5));

// 두가지의 매개변수를 지지고 볶아서 반환
function 함수4(num, str) {
  return num + str;
}
console.log(함수4(123, "사오육칠"));

// 8. Find / Filter 함수 사용하기
const Movie = {
  movie: [
    { id: 1, name: "가디언즈 오브 갤럭시: Volume 3", 개봉일: "2023-05-05" },
    { id: 2, name: "앤트맨과 와스프: 퀀텀매니아", 개봉일: "2023-02-17" },
    { id: 3, name: "블랙 팬서: 와칸다 포에버", 개봉일: "2022-11-11" },
    { id: 4, name: "토르: 러브 앤 썬더", 개봉일: "2022-07-08" },
    { id: 5, name: "닥터 스트레인지: 대혼돈의 멀티버스", 개봉일: "2022-05-06" },
    { id: 6, name: "스파이더맨: 노 웨이 홈", 개봉일: "2021-12-15" },
    { id: 7, name: "이터널스", 개봉일: "2021-11-05" },
    { id: 8, name: "스파이더맨: 파 프롬 홈", 개봉일: "2019-07-02" },
    { id: 9, name: "어벤져스: 엔드게임", 개봉일: "2019-04-24" },
    { id: 10, name: "캡틴 마블", 개봉일: "2019-03-08" },
    { id: 11, name: "앤트맨과 와스프", 개봉일: "2018-07-06" },
    { id: 12, name: "어벤져스: 인피니티 워", 개봉일: "2018-04-25" },
    { id: 13, name: "블랙 팬서", 개봉일: "2018-02-16" },
    { id: 14, name: "토르: 라그나로크", 개봉일: "2017-11-03" },
    { id: 15, name: "스파이더맨: 홈커밍", 개봉일: "2017-07-07" },
  ],
};

// 8-1. Find 메소드를 사용하여 일치하는 데이터 출력하기
function findMovie2(movie) {
  return movie.name === "스파이더맨: 노 웨이 홈";
}
const result = Movie.movie.find(findMovie2);
console.log("Find 메소드를 사용하여 일치하는 데이터 출력하기");
console.log(result);
console.log("================================");

// 8-2. Filter 메소드를 사용하여 Key 개봉일 의 valeu 값중 일치하는 값 찾아 출력하기
const filterData = (filter) => {
  const filteredData = Movie.movie.filter((el) => el.개봉일.includes(filter));
  return filteredData;
};
console.log("Filter 메소드를 사용하여 Key 개봉일 의 valeu 값을 찾아 출력하기");
console.log(filterData("2022"));
console.log("================================");
