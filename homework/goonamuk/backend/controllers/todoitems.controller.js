import * as todoitemsService from "../services/todoitems.service.js";

//할 일 전체 조회
export const myPost = async (req, res, next) => {
  try {
    const { id } = req.user;
    const myPost = await todoitemsService.getMyPost(id);

    res.status(200).send(myPost);
    return;
  } catch (error) {
    next(error);
  }
};

//할 일 한 가지 조회
export const myPostById = async (req, res, next) => {
  try {
    // id 값이 숫자인지 확인
    const { id } = req.user;
    const postId = Number(req.params.id);

    const myPostById = await todoitemsService.getMyPostById(id, postId);

    res.status(200).json(myPostById);
    return;
  } catch (error) {
    next(error);
  }
};

//할 일 검색

export const searchByKeyword = async (req, res, next) => {
  try {
    const { keyword } = req.params;
    const { id } = req.user;

    const searchByKeyword = await todoitemsService.getMyPostByKeyword(
      id,
      keyword
    );

    res.status(200).json(searchByKeyword);
    return;
  } catch (error) {
    next(error);
  }
};

//할 일 삭제

export const deleteMyPostByPostId = async (req, res) => {
  // id 값이 숫자인지 확인
  const { id } = req.user;
  const postId = Number(req.params.id);

  const deletedMyPostByPostId = await todoitemsService.deleteMyPostByPostId(
    id,
    postId
  );

  res.status(200).send({ result: true, deletedMyPostByPostId });
  return;
};

//할 일 완료/수정

export const toggleTodoItem = async (req, res) => {
  //user에서 id값 색인
  const { id } = req.user;
  const postId = Number(req.params.id);

  const toggledTodoItemByPostId = await todoitemsService.toggleTodoItemByPostId(
    id,
    postId
  );

  res.json({ result: true });
};

//할 일 추가
export const createNewTodoItem = async (req, res) => {
  const { title } = req.body;
  const { id } = req.user;
  // title 값이 들어왔는지 확인
  if (!title || title.trim() === "") {
    res.status(400).json({ message: "title 을 입력해주세요." });
    return;
  }
  const createNewTodoItem = await todoitemsService.createNewTodoItem(id, title);
  res.json(createNewTodoItem);
};
