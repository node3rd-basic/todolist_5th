// 함수 선언문, 함수 표현식
function 함수선언문() {}
const 함수표현식 = () => {};

//실제 함수 문제
function helloworld() {
  return console.log("hello world");
}

//실행결과
helloworld(); //hello world

//함수를 변수에 담아서 사용해보기.
const Mul = (num) => {
  let number = num * num;
  return number;
};
console.log(Mul(8)); // 실행결과 64

//함수를 변수에 담아서 사용해보기.
const Mul2 = (num) => num * num;
console.log(Mul2(2)); // 실행결과 4
// return 도 하나로 되어로써 매개변수의 ( )를 생략가능하고 내부로직의 중괄호도 생략이 가능하다.

//콜백함수
const task = () => {
  const task2 = () => {
    return "Goodbye World";
  };
  return task2();
};
console.log(task2());
//이 콜백함수 코드는 외부함수 안에 내부함수가 들어있고, 내부함수는 Goodbye World 를 return 한다.

//함수 연습
//undefined 출력
function 함수01() {
  return;
}
console.log(함수01());

//고정된 값 1004 반환
function 함수2() {
  return 1004;
}
console.log(함수2());

//입력받은 매개변수를 계산하여 반환
function 함수3(num) {
  return (num * num) / num + 1;
}
console.log(함수3(5));

//두가지의 매개변수를 지지고 볶아서 반환
function 함수4(num, str) {
  return num + str;
}
console.log(함수4(123, "사오육칠"));

//Find / Filter 함수 사용하기
const Movie = {
  movie: [
    { id: 1, name: "파묘", 개봉일: "2024-02-22" },
    { id: 2, name: "마션", 개봉일: "2015-10-08" },
    { id: 3, name: "혹성탈출: 새로운 시대", 개봉일: "2024-05-08" },
    { id: 4, name: "오멘: 저주의 시작", 개봉일: "2024-04-03" },
  ],
};

//find 메소드를 사용하여 일치하는 데이터 출력하기
function findMovie2(movie) {
  return movie.name === "파묘";
}
const result = Movie.movie.find(findMovie2);
console.log("Find 메소드를 사용하여 일치하는 데이터 출력하기");
console.log(result);
console.log("================================");

//filter 메소드를 사용하여 key 개봉일 의 valeu 값중 일치하는 값 찾아서 출력하기
const filterData = (filter) => {
  const filteredData = Movie.movie.filter((el) => el.개봉일.includes(filter));
  return filteredData;
};
console.log("Filter 메소드를 사용하여 Key 개봉일 의 valeu 값을 찾아 출력하기");
console.log(filterData("2022"));
console.log("================================");  