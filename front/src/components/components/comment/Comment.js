import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import 'autoheight-textarea';
import { ThumbUp } from '@styled-icons/material-rounded/ThumbUp';
import { StyledButton } from '../Styled';

const CommentForm = styled.form`
  padding-top: 1rem;
  padding-bottom: 0.5rem;
`;

const ClearFix = styled.div`
  padding-top: 1rem;
  padding-bottom: 0.5rem;
`;

const BlogCommentAvatar = styled.div`
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

const A1 = styled.a`
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
  border: none;
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

export default function Comment({ writer, content, date, onClick }) {
  const user = useSelector((state) => state.user);
  return (
    <ClearFix>
      <BlogCommentAvatar />
      <PostComment>
        <MetaP>
          <div>
            {date} <A1>{writer}</A1>
          </div>
          <ThumbUpSt />
        </MetaP>
        <autoheight-textarea>
          <P1 value={content} readOnly />
        </autoheight-textarea>
        <Meta>
          {user.me !== null ? (
            <StyledButton white onClick={onClick}>
              삭제
            </StyledButton>
          ) : (
            ''
          )}
        </Meta>
      </PostComment>
    </ClearFix>
  );
}

export function CommentsForm(props) {
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

  return (
    <CommentForm>
      <BlogCommentAvatar />
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
