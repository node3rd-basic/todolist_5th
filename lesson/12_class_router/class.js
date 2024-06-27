class 길거리빵_틀 {
    속재료 = "팥"

    constructor(속재료) {
        this.속재료 = 속재료
    }
}

class 붕어빵 extends 길거리빵_틀 {
    상태 = "생"
    크기 = "M"
    constructor(속재료, 크기) {
        super(속재료)
        this.크기 = 크기
    }

     굽기() {
        this.상태 = "익음"
        console.log(`속재료가 ${this.속재료} 인 붕어빵 을 구웠습니다.`)
     }

     get상태() {
        return this.상태
     }
}


class 국화빵 extends 길거리빵_틀 {
    constructor(속재료) {
        super(속재료);
    }
}

const 빵1 = new 붕어빵("슈크림", "L")
const 빵2 = new 국화빵("팥", "S")
const 빵3 = new 붕어빵("민초", "S")


console.log(빵1.속재료)
console.log(빵1.크기)
console.log(빵2.속재료)
console.log(빵2.크기)
console.log(빵3.속재료)
console.log(빵3.크기)

console.log(빵1 instanceof 붕어빵)
console.log(빵2 instanceof 국화빵)
console.log(빵2 instanceof 길거리빵_틀)
