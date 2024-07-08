import * as todoitemsRepository from "../repositories/todoitems.repository.js";

//할 일 목록 조회
export const getMyPost = (id) => {
  const myPost = todoitemsRepository.getPostByUserId(id);

  return myPost;
};

//할 일 하나 조회

export const getMyPostById = (id, postId) => {
  const myPostById = todoitemsRepository.getPostById(postId);

  // 가져온 todo-item 의 userId 와 현재 사용자의 id 가 같은지 확인
  // 같지 않을 경우 403 에러처리
  if (myPostById.userId !== id) {
    throw new Error({ message: "권한이 없습니다." });
  }

  return myPostById;
};

//검색어로 할 일 조회

export const getMyPostByKeyword = (id, keyword) => {
  const myPostByKeyword = todoitemsRepository.getPostbyKeyword(id, keyword);

  return myPostByKeyword;
};

//할 일 삭제

export const deleteMyPostByPostId = (id, postId) => {
  const deletedMyPostByPostId = todoitemsRepository.deleteMyPostByPostId(
    id,
    postId
  );

  return deletedMyPostByPostId;
};

//할 일 수정

export const toggleTodoItemByPostId = (id, postId) => {
  const toggledTodoItemByPostId = todoitemsRepository.toggleTodoItemByPostId(
    id,
    postId
  );

  return toggledTodoItemByPostId;
};

//할 일 추가

export const createNewTodoItem = (id, title) => {
  const createNewTodoItem = todoitemsRepository.createNewTodoItem(id, title);

  return createNewTodoItem;
};
