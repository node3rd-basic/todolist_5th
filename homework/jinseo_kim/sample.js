// map, filter,  스프레드 연산자 (...) 사용해보기
// 1번 과제는 본인의 homework/{이름}/sample.js (혹은 mapFilterSpread.js 등의 확인 가능한 이름) 에 작성해주시면 되고

// Movie Data
// Movie 객체 내부에 movie 라는 배열을 갖고있으며 Key:Value 로 구성되어 있음
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
    { id: 16, name: "가디언즈 오브 갤럭시 VOL.2", 개봉일: "2017-05-05" },
    { id: 17, name: "닥터 스트레인지", 개봉일: "2016-11-04" },
    { id: 18, name: "캡틴 아메리카: 시빌 워", 개봉일: "2016-05-06" },
    { id: 19, name: "앤트맨", 개봉일: "2015-07-17" },
    { id: 20, name: "어벤져스: 에이지 오브 울트론", 개봉일: "2015-05-01" },
    { id: 21, name: "가디언즈 오브 갤럭시", 개봉일: "2014-08-01" },
    { id: 22, name: "캡틴 아메리카: 윈터 솔져", 개봉일: "2014-04-04" },
    { id: 23, name: "토르: 다크 월드", 개봉일: "2013-11-08" },
    { id: 24, name: "아이언맨 3", 개봉일: "2013-05-03" },
    { id: 25, name: "어벤져스", 개봉일: "2012-05-04" },
    { id: 26, name: "퍼스트 어벤져", 개봉일: "2011-07-22" },
    { id: 27, name: "토르: 천둥의 신", 개봉일: "2011-05-06" },
    { id: 28, name: "아이언맨 2", 개봉일: "2010-05-07" },
    { id: 29, name: "인크레더블 헐크", 개봉일: "2008-06-13" },
    { id: 30, name: "아이언맨 ", 개봉일: "2008-05-02" },
  ],
};

// 1.내부 데이터에 접근하기 find(), filter()

// 1-1. 인덱스로 접근하기
const findMovies1 = Movie.movie[0];
// { id: 1, name: "가디언즈 오브 갤럭시: Volume 3", 개봉일: "2023-05-05" }
console.log("영화 목록중 Index 가 0인 영화는");
console.log(findMovies1);
console.log("================================");

// 1-2. 특정 영화에 접근하기 함수 선언문
const findMovies2 = Movie.movie.find(function (movie) {
  return movie.id === 1;
  // { id: 1, name: "가디언즈 오브 갤럭시: Volume 3", 개봉일: "2023-05-05" }
});
// selectMovie1 라는 변수를 만든 다음, Movie 객체 내부의 movie 배열에서 find 메서드를 사용하여 조건에 맞는 요소를 찾는다.
// 익명 함수를 선언한 후, 배열의 각 요소를 movie라는 매개변수로 받아서 movie.id가 1과 같은지 확인하고, 조건에 맞는 첫 번째 요소를 반환한다.
console.log("영화 목록중 Key-ID 의 Value-1 인 영화는");
console.log(findMovies2);
console.log("================================");

// 1-3. 영화 ID값에 접근하기 함수 표현식 (화살표 함수)
const findMovies3 = Movie.movie.find((movie) => movie.id === 2);
// { id: 1, name: "가디언즈 오브 갤럭시: Volume 3", 개봉일: "2023-05-05" }
console.log("영화 목록중 Key-ID 의 Value-2 인 영화는");
console.log(findMovies3);
console.log("================================");

// 1-4. 영화 제목중 일치하는 값에 접근하기 (완벽히 일치 O)
const findMovies4 = Movie.movie.find(
  (movie) => movie.name === "토르: 러브 앤 썬더"
);
console.log("영화 목록중 '토르: 러브 앤 썬더' 가 정확히 포함된 영화는");
console.log(findMovies4);
console.log("================================");

// 1-5. 영화 제목중 일치하는 값에 접근하기 (완벽히 일치 X)
const findMovies5 = Movie.movie.find((movie) =>
  movie.name.includes("스파이더")
);
console.log("영화 목록중 스파이더가 포함된 첫 번째 영화는");
console.log(findMovies5);
console.log("================================");

// 1-6. 영화 제목중 일치하는 값에 접근하기 (완벽히 일치 X)
const filterdMovies = Movie.movie.filter((movie) =>
  movie.name.includes("스파이더")
);
console.log("영화 목록중 스파이더가 포함된 영화는");
console.log(filterdMovies);
console.log("================================");

// 2-1. 내부 데이터에 접근하여 map() 메소드를 통해 Value를 수정하고 새로운 배열에 출력하기
const ball = ["빨간공", "파란공", "초록공", "노란공", "초록공", "검은공"];
console.log(ball);

const ballBasicClass = ball.map((ballName) => {
  // ballBasicClass 라는 새로운 변수를 만든다.
  // map 함수가 ball 배열의 각 요소를 순회하고 실행될 때, 해당 요소가 ballName이라는 이름의 매개변수로 전달된다.
  // 코드의 가독성을 위해 각 요소가 무엇을 나타내는지를 잘 설명하는 이름을 사용한다.

  return ballName + "_베이직반";
  // 전달받은 매개변수 ballName 에 _베이직반 이라는 단어를 붙여서 return 한다.
});
console.log(ballBasicClass);

// 2-2. 내부 데이터에 접근 하여 map() 메소드를 통해 모든 영화 제목앞에 '마블 -' 을 붙여서 출력하기
const movieMarvel1 = {
  movie: Movie.movie.map((marvel) => ({
    ...marvel, // 기존 영화 객체의 모든 속성을 복사/
    name: "마블 - " + marvel.name, // name 속성에 "마블- "을 붙임
  })),
};

// 2-3. 내부 데이터에 접근 하여 map() 메소드를 통해 모든 영화 제목앞에 '마블 -' 을 붙여서 출력하기
const movieMarvel2 = {
  movie: Movie.movie.map((marvel) => ({
    // ...marvel, // 기존 영화 객체의 모든 속성을 복사/
    id: marvel.id,
    name: "마블 - " + marvel.name, // name 속성에 "마블- "을 붙임
    개봉일: marvel.개봉일,
  })),
};

console.log("전체영화 목록");
console.log(Movie);
console.log("================================");
console.log("영화 제목앞에 마블 - 붙이기");
console.log(movieMarvel1);
console.log("================================");
console.log("영화 제목앞에 마블 - 붙이기, 스프레드 연산자 사용");
console.log(movieMarvel2);
console.log("================================");
