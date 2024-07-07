class Car {
  Type = "Gasoline";
  Price = "3000";
  constructor(Type) {
    if (Type) {
      this.Type = Type;
    }
  }

  Buy() {
    console.log(`Type이 ${this.Type}인 자동차를 구매했습니다.`);
  }

  getPrice() {
    return this.Price;
  }
}

const Car1 = new Car();
const Car2 = new Car("Hybrid");
console.log(Car1.Type);
console.log(Car2.Type);
Car1.Buy();
console.log(Car1.getPrice());
console.log("===================================");

class Sonata extends Car {
  Color = "Black";

  constructor(Type, Color) {
    super(Type);
    this.Color == Color;
  }

  getColor() {
    console.log(
      `Sonata의 타입은 ${this.Type}이고, 색상은 ${this.Color}입니다.`
    );
  }
}

const Sonata1 = new Sonata();
console.log(Sonata1.Type);
Sonata1.getColor();
Sonata1.getPrice();
console.log(Sonata1 instanceof Sonata);
console.log(Sonata1 instanceof Car)