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
    this.color == color;
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
//catAnimal.animalSize(); // 오류 발생 왜?? animalSize는 dog에 있는 함수니까!

console.log(Cat instanceof Animal); // 예상 False
console.log("anyAnimal1", anyAnimal instanceof Animal); // 예상 true
console.log("anyAnimal2", anyAnimal instanceof Dog); // 예상 False
console.log("anyAnimal3", anyAnimal instanceof Cat); // 예상 False
console.log("dogAnimal1", dogAnimal instanceof Animal); // 예상  true
console.log("dogAnimal2", dogAnimal instanceof Dog); // 예상  true
console.log("dogAnimal3", dogAnimal instanceof Cat); // 예상 False
console.log("catAnimal1", catAnimal instanceof Animal); // 예상  true
console.log("catAnimal2", catAnimal instanceof Dog); // 예상  False
console.log("catAnimal3", catAnimal instanceof Cat); // 예상  true

// 모두 정답
