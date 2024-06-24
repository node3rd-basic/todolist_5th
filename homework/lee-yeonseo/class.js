class Flower {
  constructor(name = '장미') {
    this.name = name;
    this.isWatered = false;
  }

  watering() {
    this.isWatered = true;
  }
}

class Daisy extends Flower {
  constructor(name, year) {
    super(name);
    this.year = year;
  }
}

class Marguerite extends Daisy {
  constructor(name, year) {
    super(name, year);
  }
}

const daisy1 = new Daisy('데이지', 3);
const marguerite1 = new Marguerite('마가렛', 4); //왜 year가 undefined?

daisy1.watering();

console.log(daisy1);
console.log(marguerite1);
console.log('데이지1은 데이지의 인스턴스', daisy1 instanceof Daisy);
console.log('데이지1은 플라워의 인스턴스', daisy1 instanceof Flower);
console.log('데이지1은 마가렛의 인스턴스', daisy1 instanceof Marguerite);
console.log('-------------------');
console.log('마가렛은 데이지의 인스턴스', marguerite1 instanceof Daisy);
console.log('마가렛은 플라워의 인스턴스', marguerite1 instanceof Flower);

class Dessert {
  type = '케이크';
  constructor(type) {
    this.type = type;
  }
}

class Cookie extends Dessert {
  constructor(name, baked) {
    super(name);
    this.baked = baked;
  }

  bake() {
    this.baked = this.baked ? false : true;
  }
}

const oreo = new Cookie('오레오', true);
console.log(oreo);

oreo.bake();
console.log(oreo);

console.log('쿠키의 인스턴스', oreo instanceof Cookie);
console.log('디저트의 인스턴스', oreo instanceof Dessert);
