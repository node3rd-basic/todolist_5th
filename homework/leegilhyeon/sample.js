//map, filter,  스프레드 연산자 (...) 사용해보기
//map, filter 
const 영화데이터 = ["아이언맨", "스파이더맨", "토르" ,"캡틴아메리카","해리포터"]

const 영화사 = 영화데이터.map((movie)=>{
    if(movie === "해리포터") {
        return movie + "워너 브러더스 픽쳐스"
    } else {
        return movie + " 마블"
    }
})
console.log(영화사)

const 마블_영화사 = 영화사.filter((movie)=>{
    if(movie.includes("마블")){
     return true
    } else {return false}
})
console.log(마블_영화사)

const 음식 = ["짜장면", "떡볶이", "탕수육", "짜장밥", "짬뽕"]

const 음식분류 = 음식.map((food)=>{
     if (food === "떡볶이") {
        return food + " 분식"
    } else { 
        return food + " 중식" }
})
console.log(음식분류)

const 음식찾기 = 음식분류.filter((food)=>{
    if(food.includes("분식")){
     return true
    } else {return false}
})
console.log(음식찾기)

//스프레드 연산자(...)

const colors = ["red", "yellow", "blue", "green", "pink"]
const plusColors = ["black", "white", ...colors]

console.log(colors)
console.log(plusColors)

const friend = {name:"르탄", age:"25", gender:"male"}
const friendUpdata = {...friend,gender:"female"}
const friendPlus = {number: 1,...friend}

console.log(friend)
console.log(friendUpdata)
console.log(friendPlus)

