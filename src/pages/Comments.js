import React, { useEffect, useState } from "react";
import CommentList from "../components/CommentList";
import PageListContainer from "../containers/PageListContainer";
// import Form from "../components/Form";
import { apis } from "../apis/api";

const Comments = () => {
  const [commentList, setCommentList] = useState([]);

  const getComments = async () => {
    const { data } = await apis.getComments();
    setCommentList(data);
  };

  useEffect(() => {
    try {
      getComments();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <CommentList commentList={commentList} getComments={getComments} />
      <PageListContainer />
      {/* <Form getComments={getComments} /> */}
    </div>
  );
};

export default Comments;
