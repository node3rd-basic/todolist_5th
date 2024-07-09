import * as todoitemsRepository from "../repositories/todoitems.repository.js";

//할 일 목록 조회
export const getMyPost = async (id) => {
  const [myPost] = await todoitemsRepository.getPostByUserId(id);

  return myPost;
};

//할 일 하나 조회

export const getMyPostById = async (id, postId) => {
  const myPostById = await todoitemsRepository.getPostById(postId);

  // 가져온 todo-item 의 userId 와 현재 사용자의 id 가 같은지 확인
  // 같지 않을 경우 403 에러처리
  if (myPostById.userId !== id) {
    throw new Error({ message: "권한이 없습니다." });
  }

  return myPostById;
};

//검색어로 할 일 조회

export const getMyPostByKeyword = async (id, keyword) => {
  const myPostByKeyword = await todoitemsRepository.getPostbyKeyword(
    id,
    keyword
  );

  return myPostByKeyword;
};

//할 일 삭제

export const deleteMyPostByPostId = async (id, postId) => {
  const deletedMyPostByPostId = await todoitemsRepository.deleteMyPostByPostId(
    id,
    postId
  );

  return deletedMyPostByPostId;
};

//할 일 수정

export const toggleTodoItemByPostId = async (id, postId) => {
  const toggledTodoItemByPostId =
    await todoitemsRepository.toggleTodoItemByPostId(id, postId);

  return toggledTodoItemByPostId;
};

//할 일 추가

export const createNewTodoItem = async (id, title) => {
  const createNewTodoItem = await todoitemsRepository.createNewTodoItem(
    id,
    title
  );

  console.log("뉴튜두아이템 : ", createNewTodoItem);
  return createNewTodoItem;
};
