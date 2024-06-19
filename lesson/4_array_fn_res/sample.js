const 공주머니 = ["빨간공", "파란공", "노란공", "초록공", "보라공", "주황공"]
const 공주머니_복제 = [...공주머니]

const ironman = { id: 1, name: "아이언맨", 평점:"8" }
const ironman_복제 = {...ironman}


const ironmanEng = { id: 1, name: "아이언맨", 평점:"8", name: "Ironman" }
console.log(ironmanEng)

const ironmanEngDes = { ...ironman, name: "Ironman" }
console.log(ironmanEngDes)

const { name: nameReName, 평점, ...info } = ironmanEng
console.log(nameReName, info)

const { name: nameReName, 평점, ...info } = ironmanEng
console.log(nameReName, info)
