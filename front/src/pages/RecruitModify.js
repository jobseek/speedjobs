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
  RECRUIT_MODIFY_REQUEST,
} from '../reducers/recruit';
import RecruitAddContents from '../components/RecruitAdd/RecruitAddContents';

export default function RecruitModify() {
  const { id } = useParams();
  const [modify, setModify] = useState(false);
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

  // 공고 정보 불러오기
  useEffect(() => {
    dispatch({
      type: RECRUIT_GET_REQUEST,
      data: id,
    });
  }, [dispatch, id]);
  useEffect(() => {
    if (recruit.recruitGetDone) {
      setForm(recruit.recruit);
      dispatch({
        type: RECRUIT_GET_DONE,
      });
    }
  }, [recruit.recruit, recruit.recruitGetDone, dispatch]);

  // 공고정보 바꿔끼우기
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

  // 공고 수정하기
  const onModifyHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (form.title === '' || form.content === '') {
        if (form.title === '') {
          alert('제목을 입력하세요');
        } else if (form.content === '') {
          alert('내용을 입력하세요');
        }
      } else {
        setForm((p) => ({
          title: p.title,
          position: p.position,
          thumbnail: p.thumbnail,
          experience: p.experience,
          content: p.content,
          openDate: p.openDate,
          closeDate: p.closeDate,
          tagIds: p.tagIds,
        }));
        setModify(true);
      }
    },
    [form]
  );
  useEffect(() => {
    if (modify) {
      dispatch({ type: RECRUIT_MODIFY_REQUEST, data: form, recruitId: id });
      setModify(false);
    }
    //  eslint-disable-next-line
  }, [modify]);
  useEffect(() => {
    if (recruit.recruitModifyDone) {
      dispatch({
        type: RECRUIT_MODIFY_DONE,
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
              value={form.title}
              placeholder={'제목을 입력해주세요'}
            />
          </HeaderTitle>
          <div style={{ flex: '0 0' }}>
            <StyledButton
              wide
              style={{ letterSpacing: '7px', paddingLeft: '14px' }}
              onClick={(e) => onModifyHandler(e)}
            >
              수정
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
