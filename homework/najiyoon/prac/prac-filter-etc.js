const 공주머니 = ["빨간공", "파란공", "노란공", "초록공", "보라공", "주황공"]
const 공주머니_복제 = [...공주머니]
//1. map
const 베이직_공주머니 = 공주머니.map((공) => {
    if(공 === "초록공") {
        return 공 + "_챌린지반"
    } else {return 공 + "_베이직반"}
    
})
console.log(공주머니)
console.log(베이직_공주머니)

//2. 삼항연산자
const 베이직_공주머니1 = 공주머니.map((공) => {
   return 공 === "초록공" ? 공 + "_챌린지반" : 공 + "_베이직반"
    //공이 참이면 (초록공이면)  공 + "_챌린지반"을 수행하고 그렇지 않으면 공 + "_베이직반"을 수행
    //return이 하나 이므로 
    //{}, return 빼고 위로 올라가서, const 베이직_공주머니1 = 공주머니.map((공) => 공 === "초록공" ? 공 + "_챌린지반" : 공 + "_베이직반")
    //매개변수 하나 이므로 const 베이직_공주머니1 = 공주머니.map(공 => 공 === "초록공" ? 공 + "_챌린지반" : 공 + "_베이직반")
})
console.log(베이직_공주머니1)

//3. filter : 베이직 공만 고르고 싶음
const 베이직_공주머니2 = 베이직_공주머니1.filter((공) => {
    if(공.includes("베이직반")) {
        return true
    } else {
        return false
    }
})
console.log(베이직_공주머니2)
// # 비구조화 할당
const naji = {id: 1, name: "najiyoon", gender: "female"}
const najinaji = {...naji}

console.log(naji)
console.log(najinaji)

const najijiji = {...naji, id:3}
console.log(najijiji)
console.log(naji.name)
// # 과제 :  read-api-sample