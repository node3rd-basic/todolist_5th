//함수선언문1
function add(num1, num2) {
    return num1 + num2;
}
const something = add;
const result = something(2, 3);
console.log(result);

//함수선언문2 - 코딩테스트
function solution(n) {
    
    const pizza = n/7
    const answer = Math.ceil(pizza)
    return answer;
}

//함수표현식
const add = function(num1, num2){
    return num1 + num2
  }
  const something1 = add;
  const result1 = something1(3, 4);
  console.log(result1);
//함수표현식 2
const solution = function(n) {
    const pizza = n/7
    const answer = Math.ceil(pizza)
    return answer
}

//화살표함수
const add = (num1, num2) => num1 + num2;
const something2 = add;
const result2 = something2(3, 4);
console.log(result2);
//화살표함수 2
const solution = n => {
    const pizza = n/7 
    const answer = Math.ceil(pizza)
    return answer
}
//화살표함수2
const solution = n => Math.ceil(n/7)
//콜백함수
function task2() {
    setTimeout(function(){
    let val = 3 + 2;
    console.log(val);
    }, 1000);
 }
 task2();
 console.log('end');
//배열1
const movie = [
    {id: 1, name: "영화1", 개봉일: "2024-05-1"},
    {id: 2, name: "영화2", 개봉일: "2024-05-1"},
    {id: 3, name: "영화3", 개봉일: "2024-05-1"},
    {id: 4, name: "영화4", 개봉일: "2024-05-1"},
]
const findmovie = movie[2];
console.log(findmovie)
//배열2
function solution(my_string) {
    const arr = my_string.split('');
   const reverse = arr.reverse();
    const answer = reverse.join('');
return answer;
}
// find
const pokemon = ['피카츄', '라이츄', '파이리', '꼬부기']
const findpokemon = pokemon.find(p => p === '파이리')
console.log(findpokemon)
// # 비구조화 할당

// # 구조 분해 할당