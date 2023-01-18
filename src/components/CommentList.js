import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apis } from "../apis/api";
import Form from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { loadComment, deleteComment, updateMode } from "../store/comment";

function CommentList({ commentList, getComments }) {
  const [selectedComment, setSelectedComment] = useState({});
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comment.comments);

  useEffect(() => {
    //댓글 목록 불러오기
    const getCommentFunction = (dispatch) => {
      apis.getComments().then((res) => dispatch(loadComment(res.data)));
    };
    dispatch(getCommentFunction);
  }, []);

  const deleteCommentBtn = async (comment) => {
    // 댓글 삭제
    const deleteCommentFunction = (dispatch) => {
      apis
        .deleteComments(comment.id)
        .then(() => dispatch(deleteComment(comment.id)));
    };
    await dispatch(deleteCommentFunction);
  };

  //댓글 수정

  //댓글 수정모드
  const updateModeBtn = (comment) => {
    const selected = commentList.filter((item) => item.id === comment.id);
    setSelectedComment(selected[0]);

    dispatch(updateMode(selected[0]));
  };

  return (
    <div>
      {comments.map((comment, key) => (
        <Comment key={key}>
          <img src={comment.profile_url} alt="" />
          {comment.author}
          <CreatedAt>{comment.createdAt}</CreatedAt>
          <Content>{comment.content}</Content>
          <Button>
            <button
              type="button"
              onClick={() => {
                updateModeBtn(comment);
              }}
            >
              수정
            </button>
            <button type="button" onClick={() => deleteCommentBtn(comment)}>
              삭제
            </button>
          </Button>
          <hr />
        </Comment>
      ))}
      <Form getComments={getComments} selectedComment={selectedComment}></Form>
    </div>
  );
}

export default CommentList;

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > button {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
