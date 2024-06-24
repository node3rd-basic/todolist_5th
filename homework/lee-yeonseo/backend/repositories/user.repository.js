import usersDB from '../db/users.js';

//투두아이템 아이디, 유저 아이디 생성
export const getIncrementedId = () => (usersDB[usersDB.length - 1] ? usersDB[usersDB.length - 1].id + 1 : 1);

export const findUserByEmail = (email) => {
  const existedUser = usersDB.find((user) => user.email === email);

  return existedUser;
};

export const createUser = (newUser) => {
  usersDB.push(newUser);
};

export const findUser = (email, password) => {
  const user = usersDB.find((user) => user.email === email && user.password === password);

  return user;
};
