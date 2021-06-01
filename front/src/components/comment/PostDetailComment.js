import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment, { CommentsForm } from './Comment';
import {
  COMMENT_ADD_REQUEST,
  COMMENT_GET_DONE,
  COMMENT_GET_REQUEST,
} from '../../reducers/comment';

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
      favorite={comment.favorite}
    />
  ));

  // 새댓글 내보내기
  const { comment, post, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const addComment = (newCom) => {
    if (newCom.content === '') {
      alert('댓글 내용을 입력해주세요.');
    } else {
      dispatch({
        type: COMMENT_ADD_REQUEST,
        data: newCom,
      });
    }
  };

  // 게시글 정보 불러오기 후에 댓글 정보 불러오기
  useEffect(() => {
    if (post.postGetDone) {
      dispatch({
        type: COMMENT_GET_REQUEST,
        data: props.id,
      });
    }
  }, [dispatch, props.id, post.postGetDone]);

  // 불러온 댓글 정보 화면에 표현하기
  useEffect(() => {
    if (comment.commentGetDone) {
      const getArr = comment.commentGetData.content;
      setDummyComment([...getArr]);
      dispatch({
        type: COMMENT_GET_DONE,
      });
    } else if (comment.commentAddData !== null) {
      alert('댓글이 등록되었습니다.');
      dispatch({
        type: COMMENT_GET_REQUEST,
        data: props.id,
      });
    } else if (comment.commentDeleteData !== null) {
      alert('댓글이 삭제되었습니다.');
      dispatch({
        type: COMMENT_GET_REQUEST,
        data: props.id,
      });
    }
  }, [
    comment.commentGetDone,
    comment.commentAddData,
    comment.commentDeleteData,
    comment.commentGetData?.content,
    dispatch,
    props.id,
  ]);

  return (
    <>
      <BlogComment>
        <CommentList>{mapComment}</CommentList>
        {user.me !== null ? (
          <CommentsForm id={props.id} onclick={addComment} />
        ) : (
          ''
        )}
      </BlogComment>
    </>
  );
}
