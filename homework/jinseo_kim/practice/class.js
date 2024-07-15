    class 붕어빵 { 
    constructor(속재료){
        if(속재료) {
            this.속재료  = 속재료 
        } else {
            this.속재료 = '팤'
        }
    }

    굽기() {
    console.log(`속재료가 ${this.속재료} 인 붕어빵을 구웠습니다.`)
    }
}

    const 빵3 =  new 붕어빵('딸기');
    const 빵4 =  new 붕어빵('민초');
    const 빵5 =  new 붕어빵('');

    console.log(빵3.속재료)
    console.log(빵4.속재료)
    console.log(빵5.속재료)

    빵3.굽기()