// 다양한 함수 10가지 만들어보기

// 두수의 합
function add(a, b) {
    return a + b;
}
// 함수 호출 예제
const result = add(3, 5);
console.log(result); // 8

// 더 큰 숫자를 구하는 함수
function max(a, b) {
    return Math.max(a, b);
}

// 함수 호출 예제
console.log(max(4, 7)); // 7
console.log(max(5, 3)); // 5


// 인사말 출력 함수
function Hello() {
    console.log("Hello, World!");
}

// 함수 호출 예제
Hello(); // "Hello, World!"

// 숫자를 두배로 만들기
function double(num) {
    return num * 2;
}

// 함수 호출 예제
console.log(double(5)); // 10

// 두수를 곱하는 함수
function multiply(a, b) {
    return a * b;
}

// 함수 호출 예제
console.log(multiply(3, 5)); // 15

// 숫자 1을 증가시키는 함수
function increase(num) {
    return num + 1;
}

// 함수 호출 예제
console.log(increase(5)); // 6

// 숫자를 제곱하는 함수
function square(num) {
    return num * num;
}

// 함수 호출 예제
console.log(square(4)); // 16

// 문자열 두개를 붙이는 함수
function attach(str1, str2) {
    return str1 + str2;
}

// 함수 호출 예제
console.log(attach("Hello", "World")); // "HelloWorld"

// 두수를 빼는 함수
function subtract(a, b) {
    return a - b;
}

// 함수 호출 예제
console.log(subtract(7, 3)); // 4

//find 함수 연습하기

const movieData = [
    {id: 1, name: "아이언맨", 평점:"8"},
    {id: 2, name: "캡틴아메리카", 평점: "7"},
    {id: 3, name: "토르", 평점: "8.5"},
    {id: 4, name: "로키", 평점: "9"},
    {id: 5, name: "어벤져스", 평점: "9.5"},
    {id: 6, name: "스파이더맨", 평점: "8.7"},
];

// 영화 검색
const searchMovie = (name) => {
    return movieData.find((movie) => movie.name === name);
};

// 함수 호출 예제
const findMovie = searchMovie("로키");
console.log(findMovie);
