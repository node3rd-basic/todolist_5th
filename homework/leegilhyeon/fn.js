function 더하기(a,b) {
    return(a+b);
}
console.log(더하기(10,23))

function 테스트() {
    console.log("테스트입니다.")
}
테스트();

function void_함수() {
    return undefined
};
console.log(void_함수());

function 함수 (변수) {
    console.log("안녕하세요")
    console.log(변수());
}

const 변수인함수 = () => {
    return "안녕히계세요"
};

함수(변수인함수)

const 변수인함수2 = () => {
    const 내부함수 = () => {
        return "내부함수입니다."
    }
    return 내부함수;
}

함수(변수인함수2())

//배열속 원하는 데이터 찾기

const 영화데이터 = ["아이언맨", "스파이더맨", "토르" ,"캡틴아메리카","해리포터"]

const 영화찾기 = 영화데이터.find(영화 => 영화 === "토르")

console.log(영화찾기)

//영화데이터 배열요소 실행
영화데이터.forEach((영화)=>console.log([영화]));

//배열 속 속성하나로 객체 찾기

const movieData = [
    {id:1, name: "아이언맨", 평점: "8점"},
    {id:2, name: "아이언맨1", 평점: "9점"},
    {id:3, name: "아이언맨2", 평점: "8.9점"},
    {id:4, name: "스파이더맨", 평점: "8.5점"},
    {id:5, name: "토르", 평점: "8.3점"},
    {id:6, name: "캡틴아메리카", 평점: "8.6점"},
    {id:7, name: "해리포터", 평점: "9.5점"}
]

//해리포터 영화정보 찾기
const movieSerch = movieData.find(({name})=>name === "해리포터");

console.log(movieSerch)  //{ id: 7, name: '해리포터', '평점': '9.5점' }
