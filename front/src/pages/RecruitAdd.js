import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  HeaderTitle,
  PostTitleInput,
  StyledButton,
  StyledHeaderDiv,
} from '../components/Styled';
import { RECRUIT_ADD_DONE, RECRUIT_ADD_REQUEST } from '../reducers/recruit';
import RecruitAddContents from '../components/RecruitAdd/RecruitAddContents';

export default function RecruitAdd() {
  const [form, setForm] = useState({
    title: '',
    position: 'PERMANENT',
    thumbnail: '',
    experience: -1,
    content: '',
    openDate: '',
    closeDate: '',
    tagIds: [],
  });
  const recruit = useSelector((state) => state.recruit);
  const dispatch = useDispatch();
  const history = useHistory();
  const onChangHandler = useCallback((e) => {
    if (e.target.name.endsWith('Date')) {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: moment(e.target.value).format('YYYY-MM-DD 00:00:00'),
      }));
    } else {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }, []);
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (form.title === '' || form.content === '') {
        if (form.title === '') {
          alert('제목을 입력하세요');
        } else if (form.content === '') {
          alert('내용을 입력하세요');
        }
      } else {
        dispatch({ type: RECRUIT_ADD_REQUEST, data: form });
      }
    },
    [form, dispatch]
  );

  useEffect(() => {
    if (recruit.recruitAddDone) {
      dispatch({
        type: RECRUIT_ADD_DONE,
      });
      history.goBack();
    }
  }, [recruit, history, dispatch]);

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
        <StyledHeaderDiv>
          <HeaderTitle>
            <PostTitleInput
              onChange={(e) => onChangHandler(e)}
              name={'title'}
              placeholder={'제목을 입력해주세요'}
            />
          </HeaderTitle>
          <div style={{ flex: '0 0' }}>
            <StyledButton
              wide
              style={{ letterSpacing: '7px', paddingLeft: '14px' }}
              onClick={(e) => onSubmitHandler(e)}
            >
              등록
            </StyledButton>
          </div>
        </StyledHeaderDiv>

        <div className={'container'}>
          <RecruitAddContents
            onChange={onChangHandler}
            form={form}
            setForm={setForm}
          />
        </div>
      </form>
    </div>
  );
}
