import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import Comment, { CommentsForm } from './Comment';
import {
  COMMENT_ADD_REQUEST,
  COMMENT_DELETE_REQUEST,
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
  const mapComment = dummyComment.map((comment, index) => (
    <Comment
      key={comment.id}
      writer={comment.title}
      content={comment.postDetail.content}
      date={`${comment.createdDate[0]}/${comment.createdDate[1]}/${comment.createdDate[2]}`}
      onClick={() => deleteHandler(comment.id)}
    ></Comment>
  ));

  const { comment, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addComment = (newCom) => {
    dispatch({
      type: COMMENT_ADD_REQUEST,
      data: newCom,
    });
  };

  const deleteHandler = (id) => {
    dispatch({
      type: COMMENT_DELETE_REQUEST,
      data: id,
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
    } else if (
      comment.commentAddData !== null ||
      comment.commentDeleteData !== null
    ) {
      dispatch({
        type: COMMENT_GET_REQUEST,
      });
    }
  }, [comment, dispatch]);

  return (
    <>
      <BlogComment>
        {user.me !== null ? <CommentsForm onclick={addComment} /> : ''}
        <CommentList>{mapComment}</CommentList>
      </BlogComment>
    </>
  );
}
