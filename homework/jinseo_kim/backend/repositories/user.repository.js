import usersFromDB from '../db/users.js';

export function findUser(email) {
  return usersFromDB.find((user) => user.email === email);
}

export function pushUser(user) {
  usersFromDB.push({
    ...user,
    id: getIncrementedId(usersFromDB),
  });
}

const getIncrementedId = (arr) => (usersFromDB.length === 0 ? 1 : usersFromDB[usersFromDB.length - 1].id + 1);
