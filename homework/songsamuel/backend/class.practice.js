class Animal {
  // 동물 생성자 함수
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    console.log(`${this.name}의 이름을 가진 동물은 소리를 냅니다.`);
  }
}

class Dog extends Animal {
  constructor(name, size) {
    super(name);
    this.size = size;
  }

  animalSize() {
    console.log(
      `이 동물의 이름은 ${this.name}이고 크기가 ${this.size}만 합니다.`
    );
  }
}

class Cat extends Animal {
  constructor(name, color) {
    super(name);
    this.color = color;
  }

  animalColor() {
    console.log(`이 ${this.color}의 색을 가진 동물은 ${this.name}입니다.`);
  }
}

const anyAnimal = new Animal("사자"); // Animal { name: '사자' }
const dogAnimal = new Dog("치와와", "S"); // dog { name: '치와와', size: 'S' }
const catAnimal = new Cat("스핑크스_고양이", "살구색");

console.log(anyAnimal); // Animal { name: '고양이' }
console.log(dogAnimal); // dog { name: '치와와', size: 'S' }
console.log(catAnimal);

anyAnimal.makeSound();
dogAnimal.animalSize();
dogAnimal.makeSound(); // 가능
//catAnimal.animalSize(); // 오류 발생 왜?? animalSize는 dog에 있는 함수니까!

console.log(Cat instanceof Animal); // 예상 False
console.log(
  "anyAnimal is an instance of Animal? :",
  anyAnimal instanceof Animal
); // 예상 true
console.log("anyAnimal is an instance of Dog? :", anyAnimal instanceof Dog); // 예상 False
console.log("anyAnimal is an instance of Cat? :", anyAnimal instanceof Cat); // 예상 False
console.log(
  "dogAnimal is an instance of Animal? :",
  dogAnimal instanceof Animal
); // 예상  true
console.log("dogAnimal is an instance of Dog? :", dogAnimal instanceof Dog); // 예상  true
console.log("dogAnimal is an instance of Cat? :", dogAnimal instanceof Cat); // 예상 False
console.log(
  "catAnimal is an instance of Animal? :",
  catAnimal instanceof Animal
); // 예상  true
console.log("catAnimal is an instance of Dog? :", catAnimal instanceof Dog); // 예상  False
console.log("catAnimal is an instance of Cat? :", catAnimal instanceof Cat); // 예상  true

// 모두 정답
