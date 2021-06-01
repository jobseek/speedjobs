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
import ResumeContents from '../components/resume/ResumeContents';
import {
  RESUME_GET_REQUEST,
  RESUME_MODIFY_DONE,
  RESUME_MODIFY_REQUEST,
} from '../reducers/resume';
import { ME_REQUEST } from '../reducers/user';

export default function ResumeModify() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [, setMyResume] = useState(false);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
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
      dispatch({
        type: RESUME_MODIFY_REQUEST,
        data: form,
        resumeId: id,
      });
    },
    [user.me, dispatch, form, id]
  );

  useEffect(() => {
    dispatch({
      type: RESUME_GET_REQUEST,
      data: id,
    });
  }, [dispatch, id]);

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

  useEffect(() => {
    if (resume.resumeModifyDone) {
      dispatch({ type: RESUME_MODIFY_DONE });
      history.goBack();
    }
  }, [resume, history, dispatch]);

  useEffect(() => {
    if (resume.resumeGetDone) {
      const resumeTemp = { ...resume.resumeGet };
      if (resume.resumeGet.resumeImage === '') {
        resumeTemp.resumeImage =
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      const birthDay = new Date(
        resumeTemp.birth[0],
        resumeTemp.birth[1] - 1,
        resumeTemp.birth[2]
      );
      birthDay.setHours(birthDay.getHours() + 9);

      setForm((p) => ({
        ...p,
        ...resumeTemp,
        birth: birthDay,
        tags: resume.resumeGet.tags,
        careers: resumeTemp.careers.map((x) => {
          if (x.inDate !== null && x.outDate !== null) {
            const inDate = new Date(x.inDate[0], x.inDate[1] - 1, x.inDate[2]);
            inDate.setHours(inDate.getHours() + 9);
            const outDate = new Date(
              x.outDate[0],
              x.outDate[1] - 1,
              x.outDate[2]
            );
            outDate.setHours(outDate.getHours() + 9);
            return { ...x, inDate, outDate };
          }
          return { ...x };
        }),
        certificates: resumeTemp.certificates.map((x) => {
          if (x.certDate !== null) {
            const certDate = new Date(
              x.certDate[0],
              x.certDate[1] - 1,
              x.certDate[2]
            );
            certDate.setHours(certDate.getHours() + 9);
            return { ...x, certDate };
          }
          return { ...x };
        }),
      }));
      if (
        resumeTemp.scholars[0].inDate !== null &&
        resumeTemp.scholars[0].outDate !== null
      ) {
        const HighInDate = new Date(
          resumeTemp.scholars[0].inDate[0],
          resumeTemp.scholars[0].inDate[1] - 1,
          resumeTemp.scholars[0].inDate[2]
        );
        const HighOutDate = new Date(
          resumeTemp.scholars[0].outDate[0],
          resumeTemp.scholars[0].outDate[1] - 1,
          resumeTemp.scholars[0].outDate[2]
        );
        HighInDate.setHours(HighInDate.getHours() + 9);
        HighOutDate.setHours(HighOutDate.getHours() + 9);
        setHigh((p) => ({
          ...p,
          education: resumeTemp.scholars[0].education,
          schoolName: resumeTemp.scholars[0].schoolName,
          major: resumeTemp.scholars[0].major,
          inDate: HighInDate,
          outDate: HighOutDate,
        }));
      } else {
        setHigh((p) => ({
          ...p,
        }));
      }

      if (
        resumeTemp.scholars[1].inDate !== null &&
        resumeTemp.scholars[1].outDate !== null
      ) {
        const UniInDate = new Date(
          resumeTemp.scholars[1].inDate[0],
          resumeTemp.scholars[1].inDate[1] - 1,
          resumeTemp.scholars[1].inDate[2]
        );
        const UniOutDate = new Date(
          resumeTemp.scholars[1].outDate[0],
          resumeTemp.scholars[1].outDate[1] - 1,
          resumeTemp.scholars[1].outDate[2]
        );
        UniInDate.setHours(UniInDate.getHours() + 9);
        UniOutDate.setHours(UniOutDate.getHours() + 9);
        setUniversity((p) => ({
          ...p,
          education: resumeTemp.scholars[1].education,
          schoolName: resumeTemp.scholars[1].schoolName,
          major: resumeTemp.scholars[1].major,
          inDate: UniInDate,
          outDate: UniOutDate,
        }));
      } else {
        setUniversity((p) => ({
          ...p,
        }));
      }

      if (
        resumeTemp.scholars[2].inDate !== null &&
        resumeTemp.scholars[2].outDate !== null
      ) {
        const GraInDate = new Date(
          resumeTemp.scholars[2].inDate[0],
          resumeTemp.scholars[2].inDate[1] - 1,
          resumeTemp.scholars[2].inDate[2]
        );
        const GraOutDate = new Date(
          resumeTemp.scholars[2].outDate[0],
          resumeTemp.scholars[2].outDate[1] - 1,
          resumeTemp.scholars[2].outDate[2]
        );
        GraInDate.setHours(GraInDate.getHours() + 9);
        GraOutDate.setHours(GraOutDate.getHours() + 9);
        setGraduate((p) => ({
          ...p,
          education: resumeTemp.scholars[2].education,
          schoolName: resumeTemp.scholars[2].schoolName,
          major: resumeTemp.scholars[2].major,
          inDate: GraInDate,
          outDate: GraOutDate,
        }));
      } else {
        setGraduate((p) => ({
          ...p,
        }));
      }
    }
  }, [resume.resumeGetDone, setForm, resume.resumeGet]);

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
                id={id}
              />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
