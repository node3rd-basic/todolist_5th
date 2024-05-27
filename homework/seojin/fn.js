//함수 연습해보기


// Hello world 출력하기
function solution(){
   
};
console.log("Hello world!");


// 더한 값 반환하기
function numb (a, b) {
   return a + b;
};

console.log(numb(1, 2));

function voidFunc(){
    return undefined
};

console.log(voidFunc());


// 나머지 매개변수

function solution(a, b, c, ...args) {
    console.log(a, b, c);
    console.log(args);
}

solution(1,2,3,4,5,6,7,8);

// 화살표 함수로 리팩토링

const answer = () => {
    return "Goobye world!"
};

console.log(answer());

// 화살표 함수로 리팩토링2

const answer2 = (a, b) => a + b;

console.log(answer2(1, 2));

// 화살표 함수로 리팩토링3

const solution2 = (a, b, c, ...args) => {
    console.log(a, b, c);
    console.log(args);

  
};

solution2(1, 2, 3, 4, 5, 6, 7, 8);


// 응용하기

const sumNuber = (num1, num2) => {
    if (num1 > 10 ) {
        throw new Error("숫자가 10보다 큽니다.")
    }

    return num1 + num2
}

console.log(sumNuber(9, 2));
// console.log(sumNuber(12, 3));// 에러 부분


// 객체로서의 함수

const person = {
    name: "Seo-jin",


    sayHello: function() {
        console.log(`Hello, My name is ${this.name}`);
    }
}

person.sayHello();


// find 함수 연습하기

const movies = [
    { id: 1, title: "라스트 홀리 데이" },
    { id: 2, title: "쿵푸판다4" },
    { id: 3, title: "범죄도시4" },
    { id: 4, title: "파묘" },
    { id: 5, title: "탑건2" },
]


const findTitle = (title) => {
    return movies.find(movie => movie.title === title);
};


const movieTitle = "파묘";
const foundMovie = findTitle(movieTitle);

// 오류 생성
if (foundMovie) {
    console.log(`영화 id: ${foundMovie.id}, 영화 제목: ${foundMovie.title}`);
} else {
    console.log(`찾으시는 영화 "${movieTitle}" 은 존재하지 않습니다.`);
}



