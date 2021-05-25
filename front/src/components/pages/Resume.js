import React, { useCallback, useEffect, useState } from 'react';
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
import { RESUME_ADD_DONE, RESUME_ADD_REQUEST } from '../../reducers/resume';
import { ME_REQUEST } from '../../reducers/user';
import ResumeContents from '../components/resume/ResumeContents';

export default function Resume() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const resume = useSelector((state) => state.resume);
  const [high, setHigh] = useState({
    education: 'HIGH',
    schoolName: '',
    major: '',
    inDate: '',
    outDate: '',
  });
  const [university, setUniversity] = useState({
    education: 'UNIVERSITY',
    schoolName: '',
    major: '',
    inDate: '',
    outDate: '',
  });
  const [graduate, setGraduate] = useState({
    education: 'GRADUATE',
    schoolName: '',
    major: '',
    inDate: '',
    outDate: '',
  });
  const [form, setForm] = useState({
    title: '',
    open: 'NO',
    name: '',
    address: '',
    email: '',
    gender: '',
    contact: '',
    birth: new Date(),
    blogUrl: '',
    githubUrl: '',
    resumeImage: '',
    coverLetter: '',
    tags: [],
    scholars: [{ high }, { university }, { graduate }],
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

  const onChangeIntro = (e) => {
    if (e.target.value.length <= 500) {
      setForm((prev) => ({ ...prev, coverLetter: e.target.value }));
    } else {
      alert('500자 이내로 작성해주세요');
    }
  };
  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      form.open = 'YES';
    } else {
      form.open = 'NO';
    }
  };

  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const onChangeHigh = useCallback((e) => {
    setHigh((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const onChangeUniversity = useCallback((e) => {
    setUniversity((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const onChangeGraduate = useCallback((e) => {
    setGraduate((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onChangeHighInDate = useCallback((e) => {
    const event = { target: { name: 'inDate', value: e } };
    const date = event.target.value;
    date.setHours(date.getHours() + 9);
    if (event.target.name === 'inDate') {
      setHigh((prev) => ({
        ...prev,
        [event.target.name]: date,
      }));
    }
  }, []);
  const onChangeUniversityInDate = useCallback((e) => {
    const event = { target: { name: 'inDate', value: e } };
    const date = event.target.value;
    date.setHours(date.getHours() + 9);
    if (event.target.name === 'inDate') {
      setUniversity((prev) => ({
        ...prev,
        [event.target.name]: date,
      }));
    }
  }, []);
  const onChangeGraduateInDate = useCallback((e) => {
    const event = { target: { name: 'inDate', value: e } };
    const date = event.target.value;
    date.setHours(date.getHours() + 9);
    if (event.target.name === 'inDate') {
      setGraduate((prev) => ({
        ...prev,
        [event.target.name]: date,
      }));
    }
  }, []);
  const onChangeHighOutDate = useCallback((e) => {
    const event = { target: { name: 'outDate', value: e } };
    const date = event.target.value;
    date.setHours(date.getHours() + 9);
    if (event.target.name === 'outDate') {
      setHigh((prev) => ({
        ...prev,
        [event.target.name]: date,
      }));
    }
  }, []);
  const onChangeUniversityOutDate = useCallback((e) => {
    const event = { target: { name: 'outDate', value: e } };
    const date = event.target.value;
    date.setHours(date.getHours() + 9);
    if (event.target.name === 'outDate') {
      setUniversity((prev) => ({
        ...prev,
        [event.target.name]: date,
      }));
    }
  }, []);
  const onChangeGraduateOutDate = useCallback((e) => {
    const event = { target: { name: 'outDate', value: e } };
    const date = event.target.value;
    date.setHours(date.getHours() + 9);
    if (event.target.name === 'outDate') {
      setGraduate((prev) => ({
        ...prev,
        [event.target.name]: date,
      }));
    }
  }, []);
  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (user.me === null) {
        dispatch({ type: ME_REQUEST });
      }
      if (
        form.title === '' ||
        form.birth === null ||
        form.address === '' ||
        form.contact === null ||
        form.email === '' ||
        form.gender === null ||
        form.name === ''
      ) {
        if (form.title === '') {
          alert('제목을 입력하세요');
        } else if (form.birth === null) {
          alert('생년월일을 입력하세요');
        } else if (form.address === '') {
          alert('주소를 입력하세요');
        } else if (form.contact === null) {
          alert('연락처를 입력하세요');
        } else if (form.email === '') {
          alert('이메일을 입력하세요');
        } else if (form.gender === null) {
          alert('성별을 입력하세요');
        } else if (form.name === '') {
          alert('이름을 입력하세요');
        }
      } else {
        dispatch({ type: RESUME_ADD_REQUEST, data: form });
      }
    },
    [user.me, dispatch, form]
  );

  useEffect(() => {
    if (resume.resumeAddDone) {
      dispatch({ type: RESUME_ADD_DONE });
      history.goBack();
    }
  }, [resume, history, dispatch]);

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
                handleOpen={handleOpen}
                open={open}
                setForm={setForm}
                form={form}
                onChangeIntro={onChangeIntro}
                onChangeHigh={onChangeHigh}
                onChangeUniversity={onChangeUniversity}
                onChangeGraduate={onChangeGraduate}
                onChangeHighInDate={onChangeHighInDate}
                onChangeHighOutDate={onChangeHighOutDate}
                onChangeUniversityInDate={onChangeUniversityInDate}
                onChangeUniversityOutDate={onChangeUniversityOutDate}
                onChangeGraduateInDate={onChangeGraduateInDate}
                onChangeGraduateOutDate={onChangeGraduateOutDate}
                high={high}
                university={university}
                graduate={graduate}
              />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
