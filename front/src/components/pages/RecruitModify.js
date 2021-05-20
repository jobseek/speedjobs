import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  HeaderTitle,
  PostTitleInput,
  StyledButton,
  StyledHeaderDiv,
} from '../components/Styled';
import {
  RECRUIT_GET_DONE,
  RECRUIT_GET_REQUEST,
  RECRUIT_MODIFY_DONE,
} from '../../reducers/recruit';
import RecruitAddContents from '../components/RecruitAdd/RecruitAddContents';

export default function RecruitModify() {
  const { id } = useParams();
  const [form, setForm] = useState();
  const { recruit } = useSelector((state) => state);
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
      if (form.title === '' || form.content === '') {
        if (form.title === '') alert('제목을 입력하세요.');
        else if (form.content === '') alert('내용을 입력하세요.');
      } else {
        // dispatch({ type: RECRUIT_MODIFY_REQUEST, data: form });
      }
    },
    [form]
  );

  // 화면 렌더링 후 원래 공고글 정보 불러오기
  useEffect(() => {
    dispatch({
      type: RECRUIT_GET_REQUEST,
      data: id,
    });
  }, [dispatch, id]);
  useEffect(() => {
    if (recruit.recruitGetDone) {
      setForm((p) => ({ ...p, ...recruit.recruit }));
      dispatch({
        type: RECRUIT_GET_DONE,
      });
    }
  }, [recruit.recruitGetDone, recruit.recruit, dispatch]);

  useEffect(() => {
    if (recruit.recruitModifyDone) {
      dispatch({
        type: RECRUIT_MODIFY_DONE,
      });
      history.goBack();
    }
  }, [recruit, history, dispatch]);

  useEffect(() => {
    setForm((p) => ({ ...p, tags: totalTag }));
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
        <StyledHeaderDiv>
          <HeaderTitle>
            <PostTitleInput
              onChange={(e) => onChangHandler(e)}
              name={'title'}
              placeholder={'제목을 입력해주세요'}
              value={form?.title}
            />
          </HeaderTitle>
          <div style={{ flex: '0 0' }}>
            <StyledButton
              wide
              style={{ letterSpacing: '10px', paddingLeft: '20px' }}
              onClick={(e) => onSubmitHandler(e)}
            >
              수정
            </StyledButton>
          </div>
        </StyledHeaderDiv>

        <div className={'container'}>
          <RecruitAddContents
            setTags={setTotalTag}
            onChange={onChangHandler}
            form={form}
          />
        </div>
      </form>
    </div>
  );
}
