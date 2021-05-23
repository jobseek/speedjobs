import { useCookies } from 'react-cookie';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useHistory, useParams } from 'react-router';

import {
  PostTitleInput,
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ResumeContentsMd from '../components/resume/ResumeContentsMd';
import {
  RESUME_GET_REQUEST,
  RESUME_LIST_REQUEST,
  RESUME_MODIFY_REQUEST,
} from '../../reducers/resume';

export default function Resume() {
  const history = useHistory();
  const { id } = useParams();
  const [, setMyResume] = useState(false);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  const user = useSelector((state) => state.user);
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  useEffect(() => {
    setMyResume(false);
  }, []);

  useEffect(() => {
    if (user.me !== null && resume.resumeGet) {
      if (user.me.id === resume.resumeGet.authorId) setMyResume(true);
    }
  }, [user.meDone, resume.resumeGet, user.me]);
  useEffect(() => {
    if (refresh['REFRESH_TOKEN'] === undefined || user.me !== null)
      dispatch({
        type: RESUME_GET_REQUEST,
        data: id,
      });
  }, [dispatch, id, user.me, refresh]);

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
  const [form, setForm] = useState({
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

  useEffect(() => {
    dispatch({
      type: RESUME_GET_REQUEST,
      data: id,
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (resume.resumeGetDone) {
      const resumeTemp = { ...resume.resumeGet };
      setForm((p) => ({
        ...p,
        ...resumeTemp,
        birth: new Date(
          resumeTemp.birth[0],
          resumeTemp.birth[1],
          resumeTemp.birth[2]
        ),
        tags: resume.resumeGet.tags,
        careers: resumeTemp.careers.map((x) => {
          if (x.inDate !== null && x.outDate !== null) {
            const inDate = new Date(x.inDate[0], x.inDate[1], x.inDate[2]);
            const outDate = new Date(x.outDate[0], x.outDate[1], x.outDate[2]);
            return { ...x, inDate, outDate };
          }
          return { ...x };
        }),
        certificates: resumeTemp.certificates.map((x) => {
          if (x.certDate !== null) {
            const certDate = new Date(
              x.certDate[0],
              x.certDate[1],
              x.certDate[2]
            );
            return { ...x, certDate };
          }
          return { ...x };
        }),
      }));
      if (
        resumeTemp.scholars[0].inDate !== null &&
        resumeTemp.scholars[0].outDate !== null
      )
        setItem((p) => ({
          ...p,
          education: resumeTemp.scholars[0].education,
          schoolName: resumeTemp.scholars[0].schoolName,
          major: resumeTemp.scholars[0].major,
          inDate: new Date(
            resumeTemp.scholars[0].inDate[0],
            resumeTemp.scholars[0].inDate[1],
            resumeTemp.scholars[0].inDate[2]
          ),
          outDate: new Date(
            resumeTemp.scholars[0].outDate[0],
            resumeTemp.scholars[0].outDate[1],
            resumeTemp.scholars[0].outDate[2]
          ),
        }));
      if (
        resumeTemp.scholars[1].inDate !== null &&
        resumeTemp.scholars[1].outDate !== null
      )
        setItem2((p) => ({
          ...p,
          education: resumeTemp.scholars[1].education,
          schoolName: resumeTemp.scholars[1].schoolName,
          major: resumeTemp.scholars[1].major,
          inDate: new Date(
            resumeTemp.scholars[1].inDate[0],
            resumeTemp.scholars[1].inDate[1],
            resumeTemp.scholars[1].inDate[2]
          ),
          outDate: new Date(
            resumeTemp.scholars[1].outDate[0],
            resumeTemp.scholars[1].outDate[1],
            resumeTemp.scholars[1].outDate[2]
          ),
        }));
      if (
        resumeTemp.scholars[2].inDate !== null &&
        resumeTemp.scholars[2].outDate !== null
      )
        setItem3((p) => ({
          ...p,
          education: resumeTemp.scholars[2].education,
          schoolName: resumeTemp.scholars[2].schoolName,
          major: resumeTemp.scholars[2].major,
          inDate: new Date(
            resumeTemp.scholars[2].inDate[0],
            resumeTemp.scholars[2].inDate[1],
            resumeTemp.scholars[2].inDate[2]
          ),
          outDate: new Date(
            resumeTemp.scholars[2].outDate[0],
            resumeTemp.scholars[2].outDate[1],
            resumeTemp.scholars[2].outDate[2]
          ),
        }));
    }
  }, [resume.resumeGetDone, setForm, resume.resumeGet]);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: RESUME_MODIFY_REQUEST,
        data: form,
      });
      dispatch({ type: RESUME_LIST_REQUEST, data: user.me });
      history.push('/resume/total');
    },
    [dispatch, form, history, user.me]
  );

  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  console.log(form);

  return (
    <>
      <div className="container text-left">
        <StyledHeaderDiv padding>
          <PostTitleInput
            onChange={(e) => onChangeHandler(e)}
            name={'title'}
            value={form.title || ''}
            placeholder={'이력서 제목을 입력해주세요'}
            maxLength="20"
          />
          <div style={{ flex: '0 0' }}>
            <StyledButton wide onClick={onSubmitHandler}>
              수정
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
              <ResumeContentsMd
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
                id={id}
              />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
