/* map 연습 */

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const squareNum = number.map((number) => number * number);

console.log(squareNum);

const doubleNum = number.map((number) => number * 2);

console.log(doubleNum);

/* filter 연습 */

const evenNum = number.filter((number) => number % 2 === 0);
console.log(evenNum);

const game = [
  {
    name: "dark soul",
    genre: "soullike",
    launch: 2011,
    maker: "From Software",
  },
  {
    name: "dark soul2",
    genre: "soullike",
    launch: 2014,
    maker: "From Software",
  },
  {
    name: "dark soul3",
    genre: "soullike",
    launch: 2016,
    maker: "From Software",
  },
  {
    name: "elden ring",
    genre: "soullike",
    launch: 2022,
    maker: "Bandai Namco",
  },
  {
    name: "Dave the Diver",
    genre: "simulation",
    launch: 2023,
    maker: "NeoWiz",
  },
  { name: "lies of P", genre: "soullike", launch: 2023, maker: "NeoWiz" },
  { name: "Tekken 8", genre: "fight", launch: 2024, maker: "Bandai Namco" },
];

const soulGame = game.filter((game) => game.genre === "soullike");

console.log(soulGame);

const soulGame22 = game.filter(
  (game) => game.genre === "soullike" && game.launch === 2022
);

console.log(soulGame22);

const oldGame = game.filter((game) => game.launch <= 2020);

console.log(oldGame);

const FromSoul = game.filter((game) =>
  game.maker === "From Software" && game.genre === "soullike" ? true : false
);

console.log(FromSoul);

/* json화 */
const jsonGame = JSON.stringify(game, null, 2);
console.log(jsonGame);

/* spread */
const newObj = { ...game };

console.log(newObj);

const newGame = {
  name: "elden ring golden branch",
  genre: "soullike",
  launch: 2024,
  maker: "From Software",
};

console.log(newGame);

/* arr에 객체 추가 */
const updatedGame = [...game, newGame];

console.log(updatedGame);

const changeGameName = { ...newGame, name: "Elden Ring DLC" };

console.log(changeGameName);
