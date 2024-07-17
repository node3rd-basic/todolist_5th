// 여기 class가 코드 상에서 아무것도 없는 상속 받는게 이상하지?
// Error이라는 곳은 이미 존재해서 거기를 상속 받는 것이다.

export default class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
