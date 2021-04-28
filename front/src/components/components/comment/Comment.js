import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import 'autoheight-textarea';
import { ThumbUp } from '@styled-icons/material-rounded/ThumbUp';
import { StyledButton } from '../Styled';
import {
  COMMENT_GET_REQUEST,
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
  onClick,
}) {
  const user = useSelector((state) => state.user);

  // 댓글 작성자 기본이미지 설정
  const [image, setImage] = useState(
    'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  );
  useEffect(() => {
    if (img !== null) {
      setImage(img);
    }
  }, [img]);

  // 댓글 수정하기
  const dispatch = useDispatch();
  const comment = useSelector((s) => s.comment);
  const [modify, setModify] = useState(true);
  const [form, setForm] = useState({
    post: postId,
    comment: commentId,
    diff: content,
  });
  const onChangeHandler = (e) => {
    setForm((p) => ({ ...p, diff: e.target.value }));
  };
  const modifyHandler = (e) => {
    console.log('form= ', form);
    if (modify) {
      setModify(false);
    } else {
      dispatch({
        type: COMMENT_MODIFY_REQUEST,
        data: form,
      });
    }
  };
  useEffect(() => {
    if (comment.commentModifyDone) {
      setModify(true);
      dispatch({
        type: COMMENT_GET_REQUEST,
        data: postId,
      });
    }
  }, [comment.commentModifyDone, dispatch, postId]);

  return (
    <ClearFix>
      <BlogCommentAvatar src={image} />
      <PostComment>
        <MetaP>
          <div>
            {date} <A1>{writer}</A1>
          </div>
          <ThumbUpSt />
        </MetaP>
        <autoheight-textarea>
          <P1
            value={form.diff}
            onChange={(e) => onChangeHandler(e)}
            readOnly={modify}
          />
        </autoheight-textarea>

        {user.me.id === authorId ? (
          <Meta>
            <StyledButton white onClick={(e) => modifyHandler(e)}>
              수정
            </StyledButton>
            <StyledButton white onClick={onClick}>
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
    'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
  );
  const [result, setResult] = useState('0/300');
  const [comForm, setComForm] = useState({
    id: props.id,
    content: '',
  });
  const commentHandler = () => {
    props.onclick(comForm);
    setResult('0/300');
    setComForm({ ...comForm, content: '' });
  };

  const cal = () => {
    setResult(comForm.content.length.toString() + '/300');
  };

  useEffect(() => {
    if (user.me.picture !== null) {
      setImg(user.me.picture);
    }
  }, [user.me.picture]);

  return (
    <CommentForm>
      <BlogCommentAvatar src={img} />
      <PostComment>
        <autoheight-textarea>
          <CmtInput
            maxLength="300"
            rows="4"
            value={comForm.content}
            placeholder="내용을 입력해주세요."
            onKeyPress={cal}
            onKeyDown={cal}
            onKeyUp={cal}
            onChange={(e) =>
              setComForm({ ...comForm, content: e.target.value })
            }
          />
        </autoheight-textarea>
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
      </PostComment>
    </CommentForm>
  );
}
