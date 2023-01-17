import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { apis } from "../apis/api";
import Form from "../components/Form";

function CommentList({ commentList, getComments }) {
  const [commentData, setCommentData] = useState({});
  const [selectedComment, setSelectedComment] = useState({});
  const storeData = useSelector((state) => state.state);

  const dispatch = useDispatch();

  const updateMode = (comment) => {
    const selected = commentList.filter((item) => item.id === comment.id);
    setSelectedComment(selected[0]);
    // try {
    //   dispatch({ type: "update" });
    //   const selected = storeData.filter((item) => item.id === comment.id);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const deleteComment = async (comment) => {
    // const selected = commentList.filter((item) => item.id === comment.id);
    try {
      const { data } = await apis.deleteComments(comment.id);
      console.log(data);
      getComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {commentList.map((comment, key) => (
        <Comment key={key}>
          <img src={comment.profile_url} alt="" />
          {comment.author}
          <CreatedAt>{comment.createdAt}</CreatedAt>
          <Content>{comment.content}</Content>
          <Button>
            <button
              type="button"
              onClick={() => {
                updateMode(comment);
              }}
            >
              수정
            </button>
            <button type="button" onClick={() => deleteComment(comment)}>
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
