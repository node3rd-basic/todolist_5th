//클래스 객체 생성
class Pet {
  constructor(name, age, gender = "male") {
    // gender = "male" << 이런식으로하면 입력하지않으면 male 자동으로 입력가능
    console.log("IN PET CONSTRUCTOR!");
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
  eat() {
    return `${this.name} is eating!`;
  }
}

const pet1 = new Pet("보리", 3);
console.log(pet1);
console.log(pet1.eat());

//부모클래스 상속받기
class Cat extends Pet {
  constructor(name, age, address = "서울") {
    console.log("IN CAT CONSTRUCTOR!");
    super(name, age);
    this.address = address;
    console.log(`${this.name}의 성별은${this.gender}입니다.`);
  }
  meow() {
    return "MEOWWWW";
  }
}
//Pet class에서 name과 age를 가져오고싶어서 상속을 받았지만, 원하지않은 gender까지 상속받았음..
const cat1 = new Cat("단비", 9);
console.log(cat1);
