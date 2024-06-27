import usersDB from "../db/users.js";
//헷갈리니 data
export function findUserByEmail(email) {
  const data = usersDB.find((usersDB) => usersDB.email === email);

  return data;
}
//디비와 아이디가 필요하지 않나
export function checkAlreadyId() {
  return usersDB.length === 0 ? 1 : usersDB[usersDB.length - 1].id + 1;
}
export function postNewUser(id, email, role, name, password) {
  const newUser = { id, email, role, name, password };
  //db에 저장하는거
  usersDB.push(newUser);
  //일단은 서비스로 넘겨주는 것
  return newUser;
}

//로그인//
export function postUser(email, password) {
  const { password: _password, ...user } = usersDB.find(
    (userDB) => userDB.email === email && userDB.password === password
  );

  return user;
}
