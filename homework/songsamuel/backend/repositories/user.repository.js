import userDB from "../db/users.js";

export function findUserByEmail(email) {
  return userDB.email === email;
}

export function getIncrementedId() {
  return userDB[userDB.length - 1] ? userDB[userDB.length - 1].id + 1 : 1;
}

export function pushNewUser(newUser) {
  return userDB.push(newUser);
}

export function findUser(email, password) {
  const user = userDB.find(
    (user) => user.email === email && user.password === password
  );

  return user;
}
