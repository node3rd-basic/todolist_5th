// 유저 아이디, 투두 아이템 아이디 생성
export const getIncrementedId = (arr) => (arr[arr.length - 1] ? arr[arr.length - 1].id + 1 : 1);
