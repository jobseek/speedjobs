import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Comment, { CommentsForm } from './Comment';
import {
  COMMENT_ADD_DONE,
  COMMENT_ADD_REQUEST,
  COMMENT_GET_DONE,
  COMMENT_GET_REQUEST,
} from '../../../reducers/comment';

const BlogComment = styled.div`
  position: relative;
  overflow: auto;
  padding: 40px 10px 0 0;
`;

const CommentList = styled.div``;

export default function PostDetailComment(props) {
  const [dummyComment, setDummyComment] = useState([]);
  const mapComment = dummyComment.map((comment) => (
    <Comment
      writer={comment.title}
      content={comment.postDetail.content}
      date={`${comment.createdDate[0]}/${comment.createdDate[1]}/${comment.createdDate[2]}`}
    ></Comment>
  ));

  const comment = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const addComment = (newCom) => {
    dispatch({
      type: COMMENT_ADD_REQUEST,
      data: newCom,
    });
  };
  // 화면 변환시 최초 실행
  useEffect(() => {
    dispatch({
      type: COMMENT_GET_REQUEST,
    });
  }, [dispatch]);

  useEffect(() => {
    if (comment.commentGetDone) {
      const getArr = comment.commentGetData.content;
      setDummyComment([...getArr]);
      dispatch({
        type: COMMENT_GET_DONE,
      });
    } else if (comment.commentAddDone) {
      console.log('AddData= ', comment.commentAddData);
      dispatch({
        type: COMMENT_ADD_DONE,
      });
    } else if (comment.commentAddData !== null) {
      dispatch({
        type: COMMENT_GET_REQUEST,
      });
    }
  }, [comment, dispatch]);

  return (
    <>
      <BlogComment>
        <CommentsForm onclick={addComment} />
        <CommentList>{mapComment}</CommentList>
      </BlogComment>
    </>
  );
}
