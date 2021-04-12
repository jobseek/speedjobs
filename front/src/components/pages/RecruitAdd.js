import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  PostTextArea,
  PostTitleInput,
  PostWriterDate,
  StyledButton,
  StyledHeaderDiv,
  TagBody,
} from '../components/Styled';
import { RECRUIT_ADD_REQUEST } from '../../reducers/recruit';
import RecruitAddContents from '../components/RecruitAdd/RecruitAddContents';

export default function RecruitAdd() {
  const [form, setForm] = useState({ content: '', title: '' });
  const recruit = useSelector((state) => state.recruit);
  const dispatch = useDispatch();
  const history = useHistory();
  const onChangHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  useEffect(() => {
    console.log('effect');
    if (recruit.recruitAddDone) {
      console.log(recruit.recruitAddDone);
      console.log('back');
      history.goBack();
    }
  }, [recruit, history]);
  const onSubmitHandler = useCallback(
    (e) => {
      console.log('handler');
      e.preventDefault();
      if (recruit.title === '' || recruit.content === '') {
        if (recruit.title === '') {
          alert('제목을 입력하세요');
        } else if (recruit.content === '') {
          alert('내용을 입력하세요');
        }
      } else {
        dispatch({ type: RECRUIT_ADD_REQUEST, data: form });
        setForm({ content: '', title: '' });
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
        {/* 헤더 */}
        <StyledHeaderDiv fix>
          <div
            className={'container row justify-content-end'}
            style={{ paddingTop: '15px' }}
          >
            <div className={'col-md-9 col-4 p-0'} style={{ marginTop: '14px' }}>
              <PostTitleInput
                onChange={(e) => onChangHandler(e)}
                name={'title'}
                placeholder={'제목을 입력해주세요'}
              />
            </div>
            <div className={'col-md-3 col-3 text-right'}>
              <StyledButton
                wide
                style={{ letterSpacing: '10px', paddingLeft: '20px' }}
                onClick={(e) => onSubmitHandler(e)}
              >
                등록
              </StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>

        <div className={'container'}>
          {/* <PostTextArea*/}
          {/*  name={'content'}*/}
          {/*  onChange={(e) => onChangHandler(e)}*/}
          {/*  placeholder="내용을 입력하세요"*/}
          {/*  rows={'20'}*/}
          {/* />*/}
          <RecruitAddContents onChange={(e) => onChangHandler(e)} />
        </div>
      </form>
    </div>
  );
}
