import { user } from "../db/user.db.js";

export const newId = () => {
  user.length > 0 ? user[user.length - 1].userId + 1 : 1;
};

export const signUp = (email, password, role, name) => {
  const userInfo = {
    userId: newId(),
    email,
    password,
    name,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  user.push(userInfo);
  return userInfo;
};

export const findEmailById = (email) => {
  user.find((el) => el.email === email);
};

export const findUser = (email) => {
  const findUser = user.find((el) => el.email === email);
  return findUser;
};
