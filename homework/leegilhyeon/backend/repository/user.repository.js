import usersDB from "../db/users.js";

const incrementedTodoId = () =>
  usersDB.length === 0 ? 1 : usersDB[usersDB.length - 1].id + 1;

export function findUser(email) {
  const existedUser = usersDB.find((user) => user.email === email);
  return existedUser;
}

export function pushUser(newUser) {
  usersDB.push({
    ...newUser,
    id: incrementedTodoId(usersDB),
  });
}
