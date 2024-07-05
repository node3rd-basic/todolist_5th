import usersDB from "../db/users.js";

// id 지정하기
const getIncrementedId = (user) =>
  usersDB.length === 0 ? 1 : usersDB[usersDB.length - 1].id + 1;

// user email 찾기
export function findOne(email) {
  return usersDB.find((user) => user.email === email);
}

// user 저장하기
export function save(user) {
  usersDB.push({
    ...user,
    id: getIncrementedId(usersDB),
  });
}
