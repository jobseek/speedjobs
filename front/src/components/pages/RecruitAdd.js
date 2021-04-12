import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  PostTitleInput,
  StyledButton,
  StyledHeaderDiv,
} from '../components/Styled';
import RecruitAddContents from '../components/RecruitAdd/RecruitAddContents';

import { POST_GET_REQUEST } from '../../reducers/post';

export default function RecruitAdd() {
  const dispatch = useDispatch();

  const [recruitForm, setRecruitForm] = useState({
    content: '',
    title: '',
  });

  const SubmitHandler = () => {
    dispatch({
      type: POST_GET_REQUEST,
      data: recruitForm,
    });
  };

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
                placeholder={'제목을 입력해주세요'}
                onChange={(e) => {
                  setRecruitForm({ ...recruitForm, title: e.target.value });
                }}
              />
            </div>
            <div className={'col-md-3 col-3 text-right'}>
              <StyledButton
                wide
                style={{ letterSpacing: '10px', paddingLeft: '20px' }}
                onClick={() => SubmitHandler()}
              >
                등록
              </StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        {/* 내용 */}
        <div className={'container'}>
          <RecruitAddContents
            onChange={(e) =>
              setRecruitForm({ ...recruitForm, content: e.target.value })
            }
          />
        </div>
      </form>
    </div>
  );
}
