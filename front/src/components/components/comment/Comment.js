import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import 'autoheight-textarea';
import { ThumbUp } from '@styled-icons/material-rounded';

import { StyledButton } from '../Styled';
import {
  COMMENT_DELETE_REQUEST,
  COMMENT_FAV_REQUEST,
  COMMENT_GET_REQUEST,
  COMMENT_HATE_REQUEST,
  COMMENT_MODIFY_REQUEST,
} from '../../../reducers/comment';

const CommentForm = styled.form`
  padding-top: 1rem;
  padding-bottom: 0.5rem;
`;

const ClearFix = styled.div`
  padding-top: 1rem;
  padding-bottom: 0.5rem;
`;

const BlogCommentAvatar = styled.img`
  position: relative;
  float: left;
  margin-left: 0;
  margin-top: 0;
  width: 65px;
  height: 65px;
  opacity: 1;
  filter: Alpha(opacity=100);
  border-radius: 4px;
  background-color: #d3d3d3;
  @media (max-width: 992px) {
    width: 0;
  }
`;

const PostComment = styled.div`
  border: 1px solid #eee;
  margin-bottom: 20px;
  margin-left: 85px;
  margin-right: 0;
  padding: 10px 20px;
  position: relative;
  border-radius: 4px;
  text-align: left;
  overflow-wrap: normal;
  @media (max-width: 992px) {
    margin-left: 5px;
    padding: 5px 10px;
    width: 100%;
  }
`;

const A1 = styled.span`
  color: #f2d411;
  text-decoration: none;
`;

const P1 = styled.textarea`
  font-size: 14px;
  color: #4e5564;
  overflow-y: hidden;
  width: 100%;
  outline: none;
  resize: none;
  border-color: #eee;
  border-radius: 5px;

  &:read-only {
    border: none;
  }
`;

const MetaP = styled.div`
  font-size: 13px;
  color: #aaaaaa;
  padding-bottom: 8px;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const Meta = styled.div`
  font-size: 13px;
  color: #aaaaaa;
  margin-bottom: 0;
  text-align: right;
`;

const CmtInput = styled.textarea`
  resize: none;
  width: 100%;
  border: 1px solid #eee;
  font-size: 14px;
  color: #4e5564;
  margin-top: 10px;
  padding: 8px;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: #f5df4d;
  }
`;

const ThumbUpSt = styled(ThumbUp)`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  color: #aaaaaa;

  ${(props) =>
    props.fav &&
    css`
      color: #f2d411;
    `}

  &:hover {
    color: #f2d411;
  }
`;

const TextLength = styled.input`
  width: 80px;
  color: silver;
  border: none;
  text-align: right;
  outline: none;
  user-select: none;
`;

export default function Comment({
  postId,
  commentId,
  authorId,
  writer,
  content,
  date,
  img,
  favorite,
}) {
  // 댓글 작성자 기본이미지 설정
  const [image, setImage] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  );
  useEffect(() => {
    if (img !== null) {
      setImage(img);
    }
  }, [img]);

  // 댓글 수정하기
  const { user, comment } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [readOnly, setReadOnly] = useState(true);
  const [modifyForm, setModifyForm] = useState({
    post: postId,
    comment: commentId,
    diff: content,
  });
  const onChangeHandler = (e) => {
    setModifyForm((p) => ({ ...p, diff: e.target.value }));
  };
  // readOnly가 true면 댓글수정화면이 아님(일반댓글화면) & false면 댓글수정화면 맞음
  const modifyHandler = () => {
    if (readOnly) {
      setReadOnly(false);
    } else {
      dispatch({
        type: COMMENT_MODIFY_REQUEST,
        data: modifyForm,
      });
    }
  };
  useEffect(() => {
    if (comment.commentModifyDone) {
      setReadOnly(true);
      dispatch({
        type: COMMENT_GET_REQUEST,
        data: postId,
      });
    } else if (
      (comment.commentFavDone || comment.commentHateDone) &&
      !comment.commentGetLoading
    ) {
      dispatch({
        type: COMMENT_GET_REQUEST,
        data: postId,
      });
    }
  }, [
    comment.commentModifyDone,
    comment.commentFavDone,
    comment.commentHateDone,
    comment.commentGetLoading,
    dispatch,
    postId,
  ]);

  // 댓글 삭제하기
  const deleteHandler = () => {
    const idData = { post: postId, comment: commentId };
    dispatch({
      type: COMMENT_DELETE_REQUEST,
      data: idData,
    });
  };

  // 좋아요 싫어요
  const favForm = { post: postId, comment: commentId };
  // 댓글작성자와 로그인회원이 다른 경우 && 좋아요 한 댓글이 아닌 경우 => 좋아요
  const favoriteHandler = () => {
    if (!favorite && user.me?.id !== authorId) {
      dispatch({
        type: COMMENT_FAV_REQUEST,
        data: favForm,
      });
    } else if (favorite && user.me?.id !== authorId) {
      dispatch({
        type: COMMENT_HATE_REQUEST,
        data: favForm,
      });
    }
  };

  return (
    <ClearFix>
      <BlogCommentAvatar src={image} />
      <PostComment>
        <MetaP>
          <div>
            {date} <A1>{writer}</A1>
          </div>
          <div>
            {user.me?.id !== authorId ? (
              <ThumbUpSt fav={favorite} onClick={() => favoriteHandler()} />
            ) : (
              ''
            )}
          </div>
        </MetaP>
        <autoheight-textarea>
          <P1
            value={modifyForm.diff}
            onChange={(e) => onChangeHandler(e)}
            readOnly={readOnly}
          />
        </autoheight-textarea>
        {user.me?.id === authorId ? (
          <Meta>
            <StyledButton white onClick={() => modifyHandler()}>
              수정
            </StyledButton>
            <StyledButton white onClick={() => deleteHandler()}>
              삭제
            </StyledButton>
          </Meta>
        ) : (
          ''
        )}
      </PostComment>
    </ClearFix>
  );
}

export function CommentsForm(props) {
  const user = useSelector((state) => state.user);
  const [img, setImg] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  );
  const [result, setResult] = useState('0/300');
  const [comForm, setComForm] = useState({
    id: props.id,
    content: '',
  });

  // 새 댓글 저장하기
  const commentHandler = () => {
    props.onclick(comForm);
    setResult('0/300');
    setComForm({ ...comForm, content: '' });
  };

  // 작성한 댓글 글자수 계산
  const cal = () => {
    setResult(comForm.content.length.toString() + '/300');
  };

  // 로그인한 회원정보에 이미지 있는 경우 이미지 저장
  useEffect(() => {
    if (user.me.picture !== null) {
      setImg(user.me.picture);
    }
  }, [user.me.picture]);

  const onChangeHandler = (e) => {
    setComForm((p) => ({ ...p, content: e.target.value }));
  };

  return (
    <CommentForm>
      <BlogCommentAvatar src={img} />
      <PostComment>
        <autoheight-textarea>
          <CmtInput
            maxLength="300"
            rows="4"
            placeholder="내용을 입력해주세요."
            onKeyPress={cal}
            onKeyDown={cal}
            onKeyUp={cal}
            onChange={onChangeHandler}
            value={comForm.content}
          ></CmtInput>
        </autoheight-textarea>
        <MetaP
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0',
            padding: '0',
          }}
        >
          <MetaP>
            <A1>{user.me.nickname}</A1>
          </MetaP>
          <Meta>
            <TextLength value={result} readOnly />
            <StyledButton
              onClick={() => {
                commentHandler();
              }}
            >
              등록
            </StyledButton>
          </Meta>
        </MetaP>
      </PostComment>
    </CommentForm>
  );
}
