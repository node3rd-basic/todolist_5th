//에러객체를 확장시킨 커스텀 에러를 만듬 : 메세지도, status도 받음
export default class customError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
