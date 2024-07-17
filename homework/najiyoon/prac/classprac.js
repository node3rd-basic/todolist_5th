//붕어빵 :)

class 붕어빵 {
  //else부분 대신 디폴트처럼 속재료는 팥으로 지정하고, 속재료가 있다면 그걸로 진행. 없으면 기본인 팥
  속재료 = "팥";
  상태 = "미디엄";
  //클래스당 constructor는 하나만
  constructor(속재료) {
    if (속재료) {
      //constructor에서 받은 속재료는 속재료
      this.속재료 = 속재료;
    }
    // else {
    //   this.속재료 = "팥";
    // }
  }
  //빵을 굽는 행위 : 동작은 메서드로 => 메서드 ; 함수와 같음
  굽기(상태) {
    if (상태) {
      this.상태 = 상태;
      console.log(
        `띵동 - 주문하신 ${this.속재료}  들어간 ${this.속재료}붕어빵을 구웠습니다.`
      );
    }
  }
  get상태() {
    return this.상태;
  }
}
//객체만들 때 class 안에 constructor이 존재하면
//함수실행 방법 ; 객체실행할 때 함수를 실행하는 것처럼 constructor(속재료)실행됨
//물론 존재한다면..
//이렇게 객체에 의해서 하나씩 만들어진 변수를 = 인스턴트
const 붕어빵1 = new 붕어빵("슈크림");
const 붕어빵2 = new 붕어빵("치즈");
const 붕어빵3 = new 붕어빵();
console.log("붕어빵1.속재료", 붕어빵1.속재료);
console.log("붕어빵2.속재료", 붕어빵2.속재료);
//
붕어빵1.굽기("미디움레어");
console.log("붕어빵1상태", 붕어빵1.get상태()); //미디움레어
붕어빵1.굽기();
console.log("붕어빵1상태", 붕어빵1.get상태()); //미디엄 예상했으나, 위의 미디움레어가 이어진다고 생각하면 됨
붕어빵1.굽기("웰던");
console.log("붕어빵1상태", 붕어빵1.get상태()); //웰던
붕어빵2.굽기();
// 붕어빵3.굽기();
console.log("붕어빵2상태", 붕어빵2.get상태());
console.log("붕어빵1상태", 붕어빵1.get상태());
console.log(붕어빵3.상태);

/////

//붕어빵 :)
class 길거리빵 {
  속재료 = "팥";

  constructor(속재료) {
    this.속재료 = 속재료;
  }
}

class 붕어빵빵 extends 길거리빵 {
  //else부분 대신 디폴트처럼 속재료는 팥으로 지정하고, 속재료가 있다면 그걸로 진행. 없으면 기본인 팥

  상태 = "미디엄";
  크기 = "M";
  constructor(속재료, 크기) {
    super(속재료);
    this.크기 = 크기;
    // else {
    //   this.속재료 = "팥";
    // }
  }
  //빵을 굽는 행위 : 동작은 메서드로 => 메서드 ; 함수와 같음
  굽기() {
    this.상태 = 상태;
    console.log(
      `띵동 - 주문하신 ${this.속재료}  들어간 ${this.속재료}붕어빵을 구웠습니다.`
    );
  }
  get상태() {
    return this.상태;
  }
}

class 국화빵 extends 길거리빵 {
  constructor(속재료) {
    super(속재료);
  }
}
//객체만들 때 class 안에 constructor이 존재하면
//함수실행 방법 ; 객체실행할 때 함수를 실행하는 것처럼 constructor(속재료)실행됨
//물론 존재한다면..
//이렇게 객체에 의해서 하나씩 만들어진 변수를 = 인스턴트
const 빵1 = new 붕어빵빵("슈크림", "S");
const 빵2 = new 국화빵("팥");
const 빵3 = new 붕어빵빵("치즈", "L");

console.log(빵1);
console.log(빵2);
console.log(빵3);
console.log(빵1.상태);
console.log(빵2.속재료);
console.log(빵3.크기);

console.log(빵1 instanceof 붕어빵빵);
console.log(빵2 instanceof 국화빵);
console.log(빵2 instanceof 길거리빵);
