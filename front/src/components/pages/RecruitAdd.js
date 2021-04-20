import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  PostTitleInput,
  StyledButton,
  StyledHeaderDiv,
} from '../components/Styled';
import { RECRUIT_ADD_REQUEST } from '../../reducers/recruit';
import RecruitAddContents from '../components/RecruitAdd/RecruitAddContents';

export default function RecruitAdd() {
  const [form, setForm] = useState({
    title: '',
    position: '',
    experience: '',
    content: '',
    startRecruit: '',
    finishRecruit: '',
  });
  const recruit = useSelector((state) => state.recruit);
  const dispatch = useDispatch();
  const history = useHistory();
  const onChangHandler = useCallback(
    (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value })),
    []
  );
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: RECRUIT_ADD_REQUEST, data: form });
    },
    [form, dispatch]
  );

  useEffect(() => {
    console.log('effect');
    if (recruit.recruitAddDone) {
      console.log(recruit.recruitAddDone);
      console.log('back');
      history.goBack();
    }
  }, [recruit, history]);

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
            style={{ padding: '15px 0 0 15px' }}
          >
            <div className={'col-9 p-0'} style={{ marginTop: '14px' }}>
              <PostTitleInput
                onChange={(e) => onChangHandler(e)}
                name={'title'}
                placeholder={'제목을 입력해주세요'}
              />
            </div>
            <div className={'col-3 text-right'}>
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
          <RecruitAddContents onChange={onChangHandler} />
        </div>
      </form>
    </div>
  );
}
