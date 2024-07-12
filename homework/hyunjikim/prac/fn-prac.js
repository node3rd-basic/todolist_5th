// 과제 - 아무 함수나 10개 만들어보고 호출 및 콜백 연습하기

// 1. 함수 선언식
// 가장 기본적인 함수 선언 방식, 함수가 정의되기 전에 호출해도 문제 없음 
sayHello(); // 호출하는 부분
function sayHello() {
   console.log("안녕하세요");
};
// 출력: 안녕하세요


// 2. 함수 표현식
// 함수를 변수에 할당할 수 있으며 할당한 이후에만 호출할 수 있음
const sayHello1 = function () {
   console.log("안녕하세요");
};
sayHello1(); // 호출하는 부분
// 출력: 안녕하세요


// 3. 화살표 함수
// function 키워드 대신에 =>를 사용하여 함수를 정의
// 함수 표현식의 한 종류이기 때문에 정의된 후에만 호출 가능
// 반드시 변수에 할당되거나, 다른 함수의 인자로 전달하는 방식으로 사용
// function이랑 함수명 없고 = () => {}
const sayHello2 = () => {
   console.log("안녕하세요")
};
sayHello2(); // 호출하는 부분
// 출력: 안녕하세요


// 4. void 함수
// 반환값이 없는 (돌려줄 값이 없는) 함수
// 자바스크립트에서 모든 함수는 기본적으로 반환값이 없는 경우 undefined를 반환
// 함수의 반환값이 없음을 void를 반환한다고 표현

// 4-1. 반환값이 있는 일반적인 함수
// 두 값을 더한 결과를 반환
function plus(a, b) {
   return a + b;
} // 두 값을 더하는 함수 정의
const result = plus(3, 5); // 함수 호출 및 결과 저장
console.log(result); // 결과 출력
// 두 값을 더한 결과를 반환합니다.
// 결과를 변수에 저장하고 출력합니다.

// 4-2. 반환값이 없는 함수
// 두 값을 더한 결과를 단순히 출력만 하고 반환값은 없음
function plus1(a, b) {
   console.log(a + b);
}  // 반환값이 없으므로 undefined를 반환
const result1 = plus1(3, 5) // 두 값을 더한 결과를 출력하는 함수 정의
console.log(result1) // 함수 호출
// 출력: 8
console.log("plus1은", result1) // 결과 출력 (result1은 undefined)
// 출력: plus1은 undefined
// 두 값을 더한 결과를 콘솔에 출력합니다.
// return 문이 없으므로, 함수는 undefined를 반환합니다.
// 호출 결과는 undefined입니다.

// 4-3. void 함수
// 명시적으로 반환값이 없음을 나타내기 위해 void 키워드를 사용, undefined를 반환
function plus2(a, b) {
   console.log(a + b)
   return void 0;
}  // 반환값이 없음을 명시적으로 나타냄
const result2 = plus2(3, 5) // 두 값을 더한 결과를 출력하는 void 함수 정의
console.log(result2) // 함수 호출
console.log("result2는", result2) // 결과 출력  (result는 undefined)
// 출력: result2는 undefined
// 두 값을 더한 결과를 콘솔에 출력합니다.
// 명시적으로 undefined를 반환합니다 (return void 0; 사용).
// 호출 결과는 undefined입니다.


// 5. 화살표 함수 축약형
// 화살표 함수가 단일 표현식인 경우 중괄호 {}와 return 키워드를 생략할 수 있다
// 원래 화살표 함수
const 함수이름 = (매개변수) => {
   return 표현식;
};
// 축약형 화살표 함수
const 함수이름1 = (매개변수) => 표현식;

// 5-1. 두 수를 더하는 화살표 함수 축약해보기
// 원래 화살표 함수
const add = (a, b) => {
   return a + b;
};
console.log(add(3, 5)); // 출력: 8
// 축약형 화살표 함수
const add1 = (a, b) => a + b;
console.log(add1(3, 5)) // 출력: 8


// 6. callback 함수
// 다른 함수의 인수로 전달되어, 특정 작업이 완료된 후 호출되는 함수
// 기본적인 콜백 함수 예제
function hi(name, callback) {
   // hi 함수 정의
   // 첫 번째 매개변수는 이름(name), 두 번째 매개변수는 콜백 함수(callback)
   console.log("Hello, " + name);
   // 주어진 이름을 사용하여 인사말 출력하기
   callback();
   // 콜백 함수 호출
}

function gb() {
   // gb 함수 정의
   console.log("Goodbye!");
   // 작별 인사말 출력하기
}

hi("Tom", gb);
// hi 함수 호출
// "Tom"이라는 이름과 gb함수를 콜백 함수로 전달

// 출력:
// Hello, Tom // hi 함수 내에서 출력된 것
// Goodbye! // 콜백 함수 gb 내에서 출력된 것


// 7. find 함수
// 자바스크립트의 배열 메서드 중 하나 (메서드 = 객체에 속한 함수 / find 메서드는 배열 객체에 속해 있음)
// 배열에서 주어진 조건을 만족하는 첫 번째 요소를 반환
// 만약 조건을 만족하는 요소가 없으면 undefined를 반환
// find 메서드는 콜백 함수를 사용하여 각 요소를 검사
// 객체 배열에서도 사용할 수 있으며, 특정 속성을 가진 객체를 찾는 데 유용함

// 문법
// array.find(callback(element[, index[, array]])[, thisArg])
// callback: 배열의 각 요소에 대해 실행할 함수, 이 함수는 다음 인수들을 받음
// element: 배열의 현재 요소
// index (선택적): 배열의 현재 요소의 인덱스
// array (선택적): find 메서드가 호출된 배열 자체
// thisArg (선택적): callback 함수 내부에서 this로 사용할 값

// 7-1. 숫자 배열에서 10보다 큰 첫번째 값 찾기 (기본 사용법)
const numbers = [5, 12, 8, 130, 44];
const found = numbers.find(element => element > 10);
console.log(found);  // 출력: 12
// 배열 numbers의 각 요소에 대해 element > 10 조건을 만족하는지 검사
// 조건을 만족하는 첫 번째 요소는 12이며, found 변수에 저장
// console.log(found);는 12를 출력

// 7-2. 객체 배열에서 특정 조건을 만족하는 객체 찾기
// 이름이 John인 객체 찾기
const users = [
   { id: 1, name: 'John' },
   { id: 2, name: 'Alice' },
   { id: 3, name: 'Bob' }
 ];
 const user = users.find(user => user.name === 'John');
 console.log(user); // 출력: { id: 1, name: 'John' }
//  배열 users의 각 객체에 대해 user.name === 'John' 조건을 만족하는지 검사
//  조건을 만족하는 첫 번째 객체는 { id: 1, name: 'John' }이며, user 변수에 저장
//  console.log(user);는 { id: 1, name: 'John' }을 출력

// 7-3. 조건을 만족하는 요소가 배열에 없는 경우
const numbers1 = [4, 6, 8, 10];
const found1 = numbers1.find(element => element > 10);
console.log(found1);  // 출력: undefined
// 배열 numbers1의 각 요소에 대해 element > 10 조건을 만족하는지 검사
// 조건을 만족하는 요소가 없으므로 found1 변수에는 undefined가 저장
// console.log(found1);는 undefined를 출력
 











