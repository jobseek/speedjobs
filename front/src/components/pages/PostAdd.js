import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  PostTextArea,
  PostTitleInput,
  PostWriterDate,
  StyledButton,
  StyledHeaderDiv,
  TagBody,
} from '../components/Styled';
import { POST_ADD_REQUEST } from '../../reducers/post';

export default function PostAdd(props) {
  const [form, setForm] = useState({ title: '', content: '' });
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const history = useHistory();
  const onChangHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  useEffect(() => {
    if (post.postAddDone) {
      history.goBack();
    }
  }, [post, history]);
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (form.title === '' || form.content === '') {
        if (form.title === '') alert('제목을 입력하세요');
        else if (form.content === '') alert('내용을 입력하세요');
      } else {
        dispatch({ type: POST_ADD_REQUEST, data: form });
      }
    },
    [dispatch, form]
  );

  return (
    <div
      className="container text-left"
      style={{
        padding: '30px 0px 0px',
        textAlign: 'left',
      }}
    >
      <form>
        {/* 헤더*/}
        <StyledHeaderDiv fix>
          <div
            className={'container row justify-content-end'}
            style={{ paddingTop: '15px' }}
          >
            <div className={'col-md-8 col-6 p-0'} style={{ marginTop: '14px' }}>
              <PostTitleInput
                onChange={(e) => onChangHandler(e)}
                name={'title'}
                placeholder={'제목을 입력해주세요'}
              />
            </div>
            <div
              className={'col-md-4 col-6 text-right'}
              style={{ paddingRight: 0 }}
            >
              <StyledButton
                wide
                style={{ letterSpacing: '10px', paddingLeft: '20px' }}
                onClick={(e) => {
                  onSubmitHandler(e);
                }}
              >
                등록
              </StyledButton>
            </div>
          </div>
          <div className={'row'}></div>
        </StyledHeaderDiv>
        {/* 작성자*/}
        <div className={'container'}>
          <PostWriterDate>작성자 2020-01-01</PostWriterDate>
          {/* 태그*/}
          {/* 본문*/}
          <PostTextArea
            name={'content'}
            onChange={(e) => onChangHandler(e)}
            placeholder="내용을 입력하세요"
            rows={'20'}
          />
          <div style={{ marginTop: '40px' }}>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
            <TagBody grey>백엔드</TagBody>
          </div>
        </div>
      </form>
    </div>
  );
}
