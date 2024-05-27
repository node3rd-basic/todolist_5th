
//1. 인사말 출력 함수
function greet() {
    console.log("안녕하세요!");
}

greet(); // "안녕하세요."



// 2. 화살표 함수 
const oo = () => {
    console.log(8);
}

const oo1 = () => {
    console.log("팔");
}

oo();  // 8
oo1(); // "팔"



//3. 콜백 함수
function Five(pp) {
    console.log(5 + pp());
}

const plus = () =>{
    return 10;
}

Five(plus);  // = 15


function plusNumber(값1, 값2) {
    console.log(5 + 7 + 값1 + 값2);
}

const Pnumber = () => {
    return 10;
}

plusNumber(Pnumber(), 3);  // 25



// 4. 
const twoNumber = (num1, num2) => {
    if (num1 <= 3) {
        console.log(num1 + "은 3보다 크거나 작습니다.");
    } else {
        console.log(num2 + "은 3보다 크네요.");
    }
}

twoNumber(2, 10); // 2은 3보다 크거나 작습니다.




//5. 
const 공주머니 = ["red", "blue", "pink", "black"];

// const ball = 공주머니.find(공 => 공 === "red");

const ball = 공주머니.find(
    function(공) {
    return 공 === "red";
});

console.log("redball", ball)   // <- redball red




//6. 문자열에 느낌표를 추가하는 함수
function addExclamation(str) {
    return str + "!";
}

// 예시 사용
let excited = addExclamation("안녕하세요");  // excited는 "안녕하세요!"
console.log(excited);  // 출력: 안녕하세요!




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
const combined = concatenate("Hello, ", "World!");  // combined는 "Hello, World!"
console.log(combined);  // 출력: Hello, World!



//10. 문자열의 길이를 반환하는 함수
function getLength(str) {
    return str.length;
}

// 예시 사용
const length = getLength("hello");  // length는 5
console.log(length);  // 출력: 5