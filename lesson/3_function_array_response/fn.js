// 함수 : 어떤 처리를 반복적으로 수행하도록 만든 코드 뭉치
// - 함수 만드는 법
function 함수이름() {
    console.log("함수가 호출됨")
}

const 화살표_함수 = () => {
    console.log("화살 함수가 호출됨")
}

// - 함수 호출하는 법
함수이름();
화살표_함수();


function 값을_입력_받는_함수(값1, 값2) {
    console.log(값1 + 값2)
}

// void 함수
const 함수처리후_받은값 = 값을_입력_받는_함수(1, 2)
console.log("함수처리후_받은값", 함수처리후_받은값)



function 값을_반환_하는_함수(값1, 값2) {
    return 값1 + 값2
}
const 함수처리후_받은값2 = 값을_반환_하는_함수(1, 2)
console.log("함수처리후_받은값2", 함수처리후_받은값2)

function void_함수() {
    return undefined
}
console.log(void_함수())

// 함수는 단순하게 만든다 -> 한가지 일만 하도록 만든다.
// 화살표 함수 축약형
//  - return 문이 한줄인 경우 return 키워드와 중괄호를 생략할 수 있다.
//  - 인자가 하나인 경우 인자를 감싸는 괄호를 생략할 수 있다.
const 화살표함수 = (값1) => {
    return 값1 * 10
}

const 화살표함수_축약형 = 값1 => 값1 * 10

console.log("화살표함수", 화살표함수(12))
const 숫자 = 1000
console.log("화살표함수_축약형", 화살표함수_축약형(숫자))

// callback 함수
function 함수1(변수) { // 변수 : 함수인_변수
    console.log("hello world")
    console.log(변수())
}

const 함수인_변수 = () => {
    return "Goodbye world"
}

// const 결과 = 함수인_변수()
함수1(함수인_변수)
// 함수1("이것은 함수인척 하는 문자열")

// 함수1 실행 -> 내부에서 hello world 출력 -> 함수인_변수 실행 -> 내부에서 Goodbye world 출력

const getSumOfTwoNumbers = (num1, num2) => {
    // if (num1 > 10) {
    //     throw new Error("num1은 10보다 작아야 합니다.")
    // }

    return num1 + num2
}

console.log("sum : ", getSumOfTwoNumbers( 9, 2) * 100)
console.log("sum : ", getSumOfTwoNumbers( 111, 2) * 100)


// 배열
const 공주머니 = ["빨간공", "파란공", "노란공", "초록공", "보라공", "주황공"]

const 영화목록 = [
    {id: 1, name: "영화1", 개봉일: "2024-05-1"},
    {id: 2, name: "영화2", 개봉일: "2024-05-1"},
    {id: 3, name: "영화3", 개봉일: "2024-05-1"},
    {id: 4, name: "영화4", 개봉일: "2024-05-1"},
]

// find

const 빨간공 = 공주머니.find(공 => 공 === "빨간공")
const 초록공 = 공주머니.find(공 => 공 === "초록공")

console.log("빨간공", 빨간공)
console.log("초록공", 초록공)

// map
const 반표기된_공주머니 = 공주머니.map(공 => 공 === "초록공" ? 공 + "_챌린지반" : 공 + "_베이직반")

console.log(공주머니)
console.log(반표기된_공주머니)

// filter

const 베이직반_공주머니 = 반표기된_공주머니.filter(공 => {
    if (공.includes("스탠다드반")) {
        return true
    } else {
        return false
    }
})

console.log("공주머니", 공주머니)
console.log("베이직반_공주머니", 베이직반_공주머니)
