import axios from "axios";

const Axios = () => {
  const api = axios.create({
    baseURL: "http://localhost:4000/comments",
  });

  return api;
};

export const apis = {
  getComments: () => Axios().get(), //목록 불러오기
  postComments: (comment) => Axios().post("", comment), //댓글 작성
  putComments: (id) => Axios().put(`/${id}`), // 댓글 수정
  deleteComments: (id) => Axios().delete(`/${id}`), //댓글 삭제
};
