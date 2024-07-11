// 함수 : 어떤 처리를 수행하도록 만든 코드 블록

// - 함수 만드는 법
function 함수명() {
   console.log("함수가 호출됨") // 명령하고 싶은 어떤 것이든 넣을 수 있음
}

// 많이 쓰이는 화살표 함수 만드는 법, 펑션이랑 함수명 없고 괄호-화살표-코드블럭
() => {
   console.log("화살표 함수 호출됨")
}
// 이름이 없는데 어떻게 호출하느냐 : 함수를 변수에 넣어주면 됨
const 화살표_함수 = () => {
   console.log("화살표 함수 호출됨")
}

// - 함수 호출하는 법
함수명();
화살표_함수();


// void 함수
// 돌려주는 게 아무 것도 없음, 반환할 값이 없는 함수를 void를 반환한다고 얘기함
// 반환할 값이 없는 상태

// 1. 반환값이 없는 함수 (값을_입력받는_함수)
function 값을_입력받는_함수(값1, 값2) {
   console.log(값1 + 값2)
}
const 함수처리후_받은값 = 값을_입력받는_함수(1, 2)
console.log("함수처리후_받은값", 함수처리후_받은값)
// 값1과 값2를 더한 결과를 콘솔에 출력합니다.
// return 문이 없으므로, 함수는 undefined를 반환합니다.
// 함수처리후_받은값 변수에 저장된 값은 undefined입니다.

// 2. 반환값이 있는 함수 (값을_반환하는_함수)
function 값을_반환하는_함수(값1, 값2) {
   console.log(값1 + 값2)
   return 값1 + 값2
}
const 함수처리후_받은값2 = 값을_반환하는_함수(1, 2)
console.log("함수처리후_받은값2", 함수처리후_받은값2)
// 값1과 값2를 더한 결과를 콘솔에 출력합니다.
// return 문에 의해 두 값의 합을 반환합니다.
// 함수처리후_받은값2 변수에 저장된 값은 3입니다.

// 3. void 함수 (void_함수)
function void_함수() {
   return undefined
}
console.log(void_함수())
// 명시적으로 undefined를 반환합니다.
// void 함수는 반환값이 없음을 명확히 나타내기 위해 사용됩니다.
// console.log(void_함수())는 undefined를 출력합니다.


// 함수는 단순하게 만든다 -> 한 가지 일만 하도록 만든다
function 영화목록가져오기() {
   // 영화 api 가져오기
   getMoviesFrom()
   // 정제하기
   // 화면 표기
}
// 하나의 함수 안에 다 넣지 말고 기능 하나당 함수 만들기, 그래야 해석하기 쉬워짐
function getMoviesFrom() {

}

// 화살표 함수 축약형
// - return문이 한 줄인 경우 return 키워드와 중괄호를 생략할 수 있다
// - 인자가 하나인 경우 인자를 감싸는 괄호를 생략할 수 있다

// 일반 화살표 함수
const 화살표함수 = (값1, 값2) => {
   const 변경된값 = 값1 * 10
   const 변경된값2 = 값2 * 10
   return 변경된값 * 변경된값2
}
// 축약형 화살표 함수
const 화살표함수_축약형 = (값1, 값2) => (값1 * 10) * (값2 * 10)

console.log("화살표함수_축약형", 화살표함수(12, 23))


// 일반 화살표 함수
const 화살표함수2 = (값1) => {
   const 변경된값 = 값1 * 10
   return 변경된값
}
// 축약형 화살표 함수
const 화살표함수_축약형2 = 값1 => 값1 * 10

console.log("화살표함수2", 화살표함수2(12))
console.log("화살표함수_축약형2", 화살표함수_축약형2(12))

// const 화살표함수_축약형2 = 값1 => 값1 * 10
// 이 구문에서
// const 화살표함수_축약형2 : 변수 타입 = 함수
//  = 값1 : 인자로 받는 값 = 파라미터, 인자라고 함. 얘네도 변수와 다름 없다


// callback 함수
function 함수1(변수) { // 변수 : 함수인 변수
   console.log("hello world")
   // console.log(변수()) // 이건 undefined 뜸, 함수인 변수의 결과를 찍어야 되는데 리턴이 없기 때문
}

const 함수인_변수 = () => {
   console.log("goodbye world")
}

// const 결과 = 함수인_변수()
함수1(함수인_변수)
함수1("이것은 함수인 척하는 문자열")
// 함수1 실행 -> 내부에서 hello world 출력 -> 함수인_변수 실행 -> 내부에서 goodbye world 출력

// 함수1( function() { return "goodbye world"}) 이 형태도 가능
// 아래와 같은 형태

// app.listen(port, () => {
//    console.log(`Example app listening on port ${port}`)
// }) app.listen으로 프로그램 연 다음에 요청을 기다리는 상태로 대기, 이 기능을 열어준 다음에 내가 준 기능을 실행할 것
// => 콜백이라고 함, 내부적으로 다시 불러오니까

// app.get('/', (req, res) => {
//    res.send('Hello World!')
// }) '/' url로 들어와서 함수를 실행하라는 뜻

const getSumOfTwoNumbers = (num1, num2) => {
   return num1 + num2
}
console.log("sum : ", getSumOfTwoNumbers("문자", 2))
// 에러는 나지 않지만 내가 원하는 기능이 잘 작동이 안 됨 (js는 덜 예민한 언어, 노드js도)
// 인자 값들은 같은 타입만 받도록 설계해야 됨
// 결과값도 늘 같은 타입이 나갈 수 있도록
// 과일 깎는 기계의 목표는 과일을 넣었으면 과일 깎은 게 나오는 것


const getSumOfTwoNumbers1 = (num1, num2) => {
   if (num1 > 10) {
      return "큰 값은 안 됩니다"
   }
   return num1 + num2
}
console.log("sum : ", getSumOfTwoNumbers1(9, 2)) * 100
console.log("sum : ", getSumOfTwoNumbers1(111, 2)) * 100
// 1100과 NaN 나옴, 낫 어 넘버라는 뜻
// 이 처리로 인해서 장애가 일어나는 것, 차라리 에러를 내는 게 함수 입장에선 나음
// 함수가 뱉는 값은 늘 동일한 타입의 결과값을 내줘야 한다

// 배열 : 변수들의 집합을 가진 하나의 변수, 변수들의 뭉치 (주머니)
// - 배열 만드는 법
const 공주머니 = ["빨간공", "파란공", "노란공", "초록공", "보라공", "주황공"]

// 컴퓨터는 공을 찾을 때 주머니를 한 번에 열어서 보는 기능이 없음
// 주머니 밑에 바닥이 있고 바닥을 조건이라고 친다면
// 바닥에 놓고 공이 주머니에 있는 만큼 하나씩 꺼내서 보고 아니면 다시 넣는 작업이 필요함
const 빨간공찾는_함수 = (공) => {
   console.log(공)
   const is빨간공 = 공 === "빨간공"
   return is빨간공
}

// for, foreach, while 외에 반복문 수행 방법
// find, map. filter
// find
const 빨간공 = 공주머니.find(빨간공찾는_함수)
console.log("빨간공", 빨간공)

// 이걸 화살표 함수로 축약하면
const 초록공 = 공주머니.find(공 => 공 === "초록공")
console.log("초록공", 초록공)

