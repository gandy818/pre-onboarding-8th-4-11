import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { apis } from "../apis/api";
import { addComment } from "../store/comment";

function Form({ getComments, selectedComment }) {
  const [commentData, setCommentData] = useState({
    profile_url: "",
    author: "",
    content: "",
    createdAt: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(selectedComment).length !== 0) {
      console.log(selectedComment);
      setCommentData({
        ...commentData,
        profile_url: selectedComment.profile_url,
        author: selectedComment.author,
        content: selectedComment.content,
        createdAt: selectedComment.createdAt,
      });
    }
  }, []);

  //댓글 추가
  const createComment = async (dispatch) => {
    await apis
      .postComments(commentData)
      .then((res) => dispatch(addComment(res.data)));
  };

  //댓글 추가 버튼
  const submitBtn = (e) => {
    e.preventDefault();
    dispatch(createComment);
  };

  return (
    <FormStyle>
      <form>
        <input
          type="text"
          name="profile_url"
          placeholder="https://picsum.photos/id/1/50/50"
          required
          value={commentData.profile_url}
          onChange={(e) => {
            setCommentData({ ...commentData, profile_url: e.target.value });
          }}
        />
        <br />
        <input
          type="text"
          name="author"
          placeholder="작성자"
          value={commentData.author}
          onChange={(e) => {
            setCommentData({ ...commentData, author: e.target.value });
          }}
        />
        <br />
        <textarea
          name="content"
          placeholder="내용"
          required
          value={commentData.content}
          onChange={(e) => {
            setCommentData({ ...commentData, content: e.target.value });
          }}
        ></textarea>
        <br />
        <input
          type="text"
          name="createdAt"
          placeholder="2020-05-30"
          required
          value={commentData.createdAt}
          onChange={(e) => {
            setCommentData({ ...commentData, createdAt: e.target.value });
          }}
        />
        <br />
        <button type="submit" onClick={submitBtn}>
          등록
        </button>
      </form>
    </FormStyle>
  );
}

export default Form;

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }
  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }
  & > form > input[type="text"] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }
  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;
