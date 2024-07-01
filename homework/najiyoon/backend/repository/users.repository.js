import users from "../db/users.js";
//헷갈리니 data
export function findUserByEmail(email) {
  const data = users.find((users) => users.email === email);

  return data;
}
export function postNewUser(id, email, role, name, password) {
  const newUser = { id, email, role, name, password };
  //db에 저장하는거
  users.push(newUser);
  //일단은 서비스로 넘겨주는 것
  return newUser;
}
export function postUser(email, password) {
  const { password: _password, ...user } = users.find(
    (user) => user.email === email && user.password === password
  );

  return user;
}
