import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  PostTitleInput,
  StyledButton,
  StyledHeaderDiv,
} from '../components/Styled';
import { RECRUIT_ADD_DONE, RECRUIT_ADD_REQUEST } from '../../reducers/recruit';
import RecruitAddContents from '../components/RecruitAdd/RecruitAddContents';

export default function RecruitAdd() {
  const [form, setForm] = useState({
    title: '',
    position: 'TEMPORARY',
    thumbnail: '',
    experience: 'ZERO',
    content: '',
    openDate: '',
    closeDate: '',
    status: 'PROCESS',
    tagIds: [],
  });
  const recruit = useSelector((state) => state.recruit);
  const [totalTag, setTotalTag] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const onChangHandler = useCallback(
    (e) => {
      console.log(e.target.name);
      if (e.target.name.endsWith('Date')) {
        console.log('hi');
        setForm((prev) => ({
          ...prev,
          [e.target.name]: moment(e.target.value).format('YYYY-MM-DD 00:00:00'),
        }));
      } else {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
      console.log(form);
    },
    [form]
  );
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      console.log(form);
      dispatch({ type: RECRUIT_ADD_REQUEST, data: form });
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

  useEffect(() => {
    setForm((p) => ({ ...p, tagIds: totalTag }));
  }, [totalTag]);

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
          <RecruitAddContents setTags={setTotalTag} onChange={onChangHandler} />
        </div>
      </form>
    </div>
  );
}
