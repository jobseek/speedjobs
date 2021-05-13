import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useHistory } from 'react-router';
import {
  PostTitleInput,
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ResumeContents from '../components/resume/ResumeContents';
import { RESUME_ADD_REQUEST, RESUME_LIST_REQUEST } from '../../reducers/resume';

export default function Resume() {
  const history = useHistory();
  const [item, setItem] = useState({
    education: 'HIGH',
    schoolName: '',
    major: '',
    inDate: '',
    outDate: '',
  });
  const [item2, setItem2] = useState({
    education: 'UNIVERSITY',
    schoolName: '',
    major: '',
    inDate: '',
    outDate: '',
  });
  const [item3, setItem3] = useState({
    education: 'GRADUATE',
    schoolName: '',
    major: '',
    inDate: '',
    outDate: '',
  });

  const onChangeHighSchool = useCallback((e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const onChangeUniversity = useCallback((e) => {
    setItem2((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const onChangeGraduate = useCallback((e) => {
    setItem3((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onChangeInDate = useCallback((e) => {
    const event = { target: { name: 'inDate', value: e } };
    if (event.target.name === 'inDate') {
      setItem((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }, []);
  const onChangeInDate2 = useCallback((e) => {
    const event = { target: { name: 'inDate', value: e } };
    if (event.target.name === 'inDate') {
      setItem2((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }, []);
  const onChangeInDate3 = useCallback((e) => {
    const event = { target: { name: 'inDate', value: e } };
    if (event.target.name === 'inDate') {
      setItem3((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }, []);

  const onChangeOutDate = useCallback((e) => {
    const event = { target: { name: 'outDate', value: e } };
    if (event.target.name === 'outDate') {
      setItem((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }, []);
  const onChangeOutDate2 = useCallback((e) => {
    const event = { target: { name: 'outDate', value: e } };
    if (event.target.name === 'outDate') {
      setItem2((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }, []);
  const onChangeOutDate3 = useCallback((e) => {
    const event = { target: { name: 'outDate', value: e } };
    if (event.target.name === 'outDate') {
      setItem3((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  }, []);

  const dispatch = useDispatch();
  const [bookmark, setBookmark] = useState(false);

  const onChangeIntro = (e) => {
    if (e.target.value.length <= 500) {
      setForm((prev) => ({ ...prev, coverLetter: e.target.value }));
    } else {
      alert('500자 이내로 작성해주세요');
    }
  };

  const handleBookmark = () => {
    setBookmark(!bookmark);
    if (!bookmark) {
      form.open = 'YES';
    } else {
      form.open = 'NO';
    }
  };
  const user = useSelector((state) => state.user);
  const [form, setForm] = useState({
    createDate: new Date(),
    open: 'NO',
    name: '',
    gender: '',
    contact: '',
    birth: new Date(),
    blogUrl: '',
    githubUrl: '',
    resumeImage: '',
    coverLetter: '',
    tags: [],
    scholars: [
      {
        item,
      },
      {
        item2,
      },
      { item3 },
    ],
    certificates: [
      {
        index: v4(),
        certName: '',
        certNumber: '',
        institute: '',
        certDate: '',
        score: '',
        degree: '',
      },
    ],
    careers: [
      {
        index: v4(),
        companyName: '',
        position: '',
        inDate: '',
        outDate: '',
      },
    ],
  });

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (user.me.id === null) return;
      dispatch({
        type: RESUME_ADD_REQUEST,
        data: form,
      });
      dispatch({ type: RESUME_LIST_REQUEST, data: user.me });
      history.push('/resume/total');
    },
    [dispatch, form, user.me, history]
  );

  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  return (
    <>
      <div className="container text-left">
        <StyledHeaderDiv padding>
          <PostTitleInput
            onChange={(e) => onChangeHandler(e)}
            name={'title'}
            placeholder={'이력서 제목을 입력해주세요'}
            maxLength="20"
          />
          <div style={{ flex: '0 0' }}>
            <StyledButton wide onClick={onSubmitHandler}>
              등록
            </StyledButton>
          </div>
        </StyledHeaderDiv>
        <div className="container" style={{ marginTop: '70px' }}>
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            <ProfileDiv className={'col-12 col-lg-10 p-0'}>
              <ResumeContents
                onChange={onChangeHandler}
                bookMark={handleBookmark}
                bookMark1={bookmark}
                setForm={setForm}
                form={form}
                onChangeIntro={onChangeIntro}
                onChangeHighSchool={onChangeHighSchool}
                onChangeUniversity={onChangeUniversity}
                onChangeGraduate={onChangeGraduate}
                onChangeInDate={onChangeInDate}
                onChangeOutDate={onChangeOutDate}
                onChangeInDate2={onChangeInDate2}
                onChangeOutDate2={onChangeOutDate2}
                onChangeInDate3={onChangeInDate3}
                onChangeOutDate3={onChangeOutDate3}
                item={item}
                item2={item2}
                item3={item3}
              />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
