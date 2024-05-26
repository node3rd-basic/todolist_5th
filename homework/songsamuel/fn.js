//1. 인사말 출력 함수
function greet() {
    console.log("안녕하세요!");
}


//2. 고정된 값 반환 함수
function returnFive() {
    return 5;
}

// 예시 사용
let value = returnFive();  // value는 5
console.log(value);  // 출력: 5



//3. 숫자를 문자열로 변환하는 함수
function numberToString(num) {
    return num.toString();
}

// 예시 사용
let strNum = numberToString(123);  // strNum는 "123"
console.log(strNum);  // 출력: "123"




//4. 문자열에 느낌표를 추가하는 함수
function addExclamation(str) {
    return str + "!";
}

// 예시 사용
let excited = addExclamation("안녕하세요");  // excited는 "안녕하세요!"
console.log(excited);  // 출력: 안녕하세요!




//5. 숫자의 절댓값을 반환하는 함수
function absoluteValue(num) {
    return Math.abs(num);
}

// 예시 사용
let absVal = absoluteValue(-7);  // absVal는 7
console.log(absVal);  // 출력: 7




//6. 숫자가 양수인지 확인하는 함수
function isPositive(num) {
    return num > 0;
}

// 예시 사용
let isPos = isPositive(10);  // isPos는 true
console.log(isPos);  // 출력: true

isPos = isPositive(-5);  // isPos는 false
console.log(isPos);  // 출력: false




//7. 문자열을 소문자로 변환하는 함수
function toLowerCase(str) {
    return str.toLowerCase();
}

// 예시 사용
let lower = toLowerCase("HELLO");  // lower는 "hello"
console.log(lower);  // 출력: hello




//8. 문자열을 대문자로 변환하는 함수
function toUpperCase(str) {
    return str.toUpperCase();
}

// 예시 사용
let input = "hello";
let upper = toUpperCase(input);  // upper는 "HELLO"
console.log(upper);  // 출력: HELLO




//9. 두 문자열을 연결하는 함수
function concatenate(str1, str2) {
    return str1 + str2;
}

// 예시 사용
let combined = concatenate("Hello, ", "World!");  // combined는 "Hello, World!"
console.log(combined);  // 출력: Hello, World!




//10. 문자열의 길이를 반환하는 함수
function getLength(str) {
    return str.length;
}

// 예시 사용
let length = getLength("hello");  // length는 5
console.log(length);  // 출력: 5