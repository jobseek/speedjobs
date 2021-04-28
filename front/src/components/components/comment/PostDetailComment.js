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
  padding-right: 10px;
`;

const CommentList = styled.div``;

export default function PostDetailComment(props) {
  const [dummyComment, setDummyComment] = useState([]);
  const mapComment = dummyComment.map((comment) => (
    <Comment
      key={comment.id}
      postId={props.id}
      commentId={comment.id}
      authorId={comment.authorId}
      writer={comment.author}
      content={comment.content}
      date={`${comment.createdDate[0]}/${comment.createdDate[1]}/${comment.createdDate[2]}`}
      img={comment.picture}
      onClick={() => deleteHandler(comment.id, props.id)}
    />
  ));

  // 새댓글 내보내기
  const { comment, post, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const addComment = (newCom) => {
    dispatch({
      type: COMMENT_ADD_REQUEST,
      data: newCom,
    });
  };

  // 댓글 삭제하기
  const deleteHandler = (c, p) => {
    const idData = { commentId: c, postId: p };
    dispatch({
      type: COMMENT_DELETE_REQUEST,
      data: idData,
    });
  };

  // 댓글 정보 불러오기
  useEffect(() => {
    if (post.postGetDone) {
      dispatch({
        type: COMMENT_GET_REQUEST,
        data: props.id,
      });
    }
  }, [dispatch, props.id, post.postGetDone]);

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
        data: props.id,
      });
    }
  }, [comment, dispatch, props.id]);

  return (
    <>
      <BlogComment>
        {user.me !== null ? (
          <CommentsForm id={props.id} onclick={addComment} />
        ) : (
          ''
        )}
        <CommentList>{mapComment}</CommentList>
      </BlogComment>
    </>
  );
}
