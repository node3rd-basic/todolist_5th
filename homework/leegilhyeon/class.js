class 애완동물 {
  울음소리 = "야옹";
  constructor(울음소리) {
    if (울음소리) {
      this.울음소리 = 울음소리;
    }
  }
}

const 냐옹이 = new 애완동물("야옹");
const 멍멍이 = new 애완동물("멍멍");
console.log(냐옹이); //{ '울음소리': '야옹' }
console.log(멍멍이); //{ '울음소리': '멍멍' }

class 고양이 extends 애완동물 {
  색상 = "검은색";
  성격 = "온순";
  constructor(울음소리, 색상) {
    super(울음소리);
    this.색상 = 색상;
  }
  소개() {
    console.log(`${this.성격}한 성격을 가진 ${this.색상} 고양이입니다.`);
    //this.색상 = "흰색";
    console.log(`${this.색상}고양이는 ${this.울음소리}하고 웁니다.`);
  }
  get성격() {
    return this.성격;
  }
}
console.log(고양이);
const 깜냥이 = new 고양이("냐옹", "검정색");
깜냥이.소개();

console.log(깜냥이 instanceof 고양이);

class 강아지 extends 애완동물 {
  constructor(울음소리) {
    super(울음소리);
  }
}

const 흰둥이 = new 강아지("멍멍", "흰색");
console.log(흰둥이.울음소리);
console.log(흰둥이.색상); //undefined

const 냥이 = new 고양이("미-유", "회색");
console.log(냥이.울음소리);
console.log(냥이.색상);
냥이.소개();
