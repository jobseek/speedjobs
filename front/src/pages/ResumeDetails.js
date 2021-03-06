import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { LockFill, UnlockFill } from '@styled-icons/bootstrap';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
  MyEducation,
  PostTitleInput,
  ProfileDiv,
  ResumeImg,
  ResumeTitles,
  StyledButton,
  StyledHeaderDiv,
  StyledHeaderMargin,
  StyledLeftLayout,
  TagBody,
  TextArea,
  Warning,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import {
  RESUME_DELETE_DONE,
  RESUME_DELETE_REQUEST,
  RESUME_GET_DONE,
  RESUME_GET_REQUEST,
} from '../reducers/resume';
import ResumeInputs from '../components/resume/ResumeInputs';
import ResumeGender from '../components/resume/ResumeGender';

const MyPostTitleInput = styled(PostTitleInput)`
  height: 35px;
  padding: 0 20px 3px;
`;

const MyLock = styled(LockFill)`
  width: 25px;
  color: red;
`;

const MyUnlock = styled(UnlockFill)`
  width: 25px;
  color: #7c7c7c;
`;

export default function ResumeDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [, setMyResume] = useState(false);
  const user = useSelector((state) => state.user);
  const resume = useSelector((state) => state.resume);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  const [content, setContent] = useState({
    title: '',
    open: '',
    name: '',
    email: '',
    gender: '',
    contact: '',
    birth: '',
    blogUrl: '',
    githubUrl: '',
    resumeImage: '',
    coverLetter: '',
    tags: [],
    scholars: [
      {
        education: 'HIGH',
        schoolName: '',
        major: '',
        inDate: '',
        outDate: '',
      },
      {
        education: 'UNIVERSITY',
        schoolName: '',
        major: '',
        inDate: '',
        outDate: '',
      },
      {
        education: 'GRADUATE',
        schoolName: '',
        major: '',
        inDate: '',
        outDate: '',
      },
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
    setMyResume(false);
  }, []);

  useEffect(() => {
    if (user.me !== null && resume.resumeGet) {
      if (user.me.id === resume.resumeGet.authorId) {
        setMyResume(true);
      }
    }
  }, [user.meDone, resume.resumeGet, user.me]);

  useEffect(() => {
    if (refresh['REFRESH_TOKEN'] === undefined || user.me !== null) {
      dispatch({
        type: RESUME_GET_REQUEST,
        data: id,
      });
    }
  }, [dispatch, id, user.me, refresh]);

  useEffect(() => {
    if (resume.resumeGetDone) {
      const resumeTemp = { ...resume.resumeGet };
      if (resume.resumeGet.resumeImage === '') {
        resumeTemp.resumeImage =
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      const birthDay = resumeTemp.birth?.join('-');
      const highInDate = resumeTemp.scholars[0].inDate?.join('-');
      const highOutDate = resumeTemp.scholars[0].outDate?.join('-');
      const universityInDate = resumeTemp.scholars[1].inDate?.join('-');
      const universityOutDate = resumeTemp.scholars[1].outDate?.join('-');
      const graduateInDate = resumeTemp.scholars[2]?.inDate?.join('-');
      const graduateOutDate = resumeTemp.scholars[2]?.outDate?.join('-');

      setContent((p) => ({
        ...p,
        ...resumeTemp,
        birth: birthDay,
        scholars: [
          {
            education: resumeTemp.scholars[0]?.education,
            schoolName: resumeTemp.scholars[0]?.schoolName,
            major: resumeTemp.scholars[0]?.major,
            inDate: highInDate,
            outDate: highOutDate,
          },
          {
            education: resumeTemp.scholars[1]?.education,
            schoolName: resumeTemp.scholars[1]?.schoolName,
            major: resumeTemp.scholars[1]?.major,
            inDate: universityInDate,
            outDate: universityOutDate,
          },
          {
            education: resumeTemp.scholars[2]?.education,
            schoolName: resumeTemp.scholars[2]?.schoolName,
            major: resumeTemp.scholars[2]?.major,
            inDate: graduateInDate,
            outDate: graduateOutDate,
          },
        ],
      }));
      dispatch({ type: RESUME_GET_DONE });
    }
  }, [resume.resumeGet, resume.resumeGetDone, setContent, dispatch]);

  const careers = content.careers.map((x, index) => {
    let inDate = '';
    let outDate = '';
    if (x.inDate !== null && x.outDate !== null) {
      inDate = x.inDate[0] + '-' + x.inDate[1] + '-' + x.inDate[2];
      outDate = x.outDate[0] + '-' + x.outDate[1] + '-' + x.outDate[2];
    }
    return (
      <div key={index}>
        <div key={x.index} style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'????????????'}
            value={x.companyName || ''}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'??????'}
            value={x.position || ''}
            name={'position'}
            disabled
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'????????????'}
            basic
            value={inDate || ''}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'????????????'}
            basic
            value={outDate || ''}
            disabled
          />
        </div>
      </div>
    );
  });
  const certificates = content.certificates.map((y, index) => {
    let certDate = '';
    if (y.certDate !== null) {
      certDate = y.certDate[0] + '-' + y.certDate[1] + '-' + y.certDate[2];
    }
    return (
      <div key={index}>
        <div
          key={y.index}
          style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}
        >
          <ResumeInputs
            flex={'1'}
            itemName={'??????'}
            value={y.certName || ''}
            name={'certName'}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'????????????'}
            value={y.institute || ''}
            name={'institute'}
            disabled
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'??????'}
            value={y.score || ''}
            name={'score'}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'??????'}
            value={y.degree || ''}
            name={'degree'}
            disabled
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'????????????'}
            value={y.certNumber || ''}
            name={'certNumber'}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'????????????'}
            basic
            value={certDate || ''}
            disabled
          />
        </div>
      </div>
    );
  });

  const DeleteHandler = () => {
    dispatch({
      type: RESUME_DELETE_REQUEST,
      data: id,
    });
  };

  useEffect(() => {
    if (resume.resumeDeleteDone) {
      dispatch({
        type: RESUME_DELETE_DONE,
      });
      history.push('/resume/list');
    }
  });

  return (
    <>
      <div className="container text-left">
        <StyledHeaderDiv padding>
          <MyPostTitleInput name={'title'} value={content.title} disabled />
        </StyledHeaderDiv>
        {user.me?.role !== 'ROLE_COMPANY' ? (
          <div
            style={{
              textAlign: 'right',
              marginTop: '60px',
            }}
          >
            <span style={{ flex: '0 0' }}>
              <StyledButton
                mid
                onClick={() => history.push(`/resume/modify/${id}`)}
                style={{ marginRight: '0' }}
              >
                ??????
              </StyledButton>
            </span>
            <span style={{ flex: '0 0' }}>
              <StyledButton
                mid
                onClick={() => DeleteHandler()}
                style={{ marginRight: '0' }}
              >
                ??????
              </StyledButton>
            </span>
          </div>
        ) : (
          <div
            style={{
              textAlign: 'right',
              marginTop: '60px',
              height: '30px',
            }}
          ></div>
        )}
        <div className="container">
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            <ProfileDiv className={'col-12 col-lg-10 p-0'}>
              <div className={'container-fluid'}>
                <div style={{ marginBottom: '40px' }}>
                  <h5 style={{ display: 'inline-block' }}>?????? ??????</h5>
                  <Warning>
                    ???????????? ????????? ?????? ????????? ?????? ?????? ????????? ??????, ????????????
                    ????????????.
                  </Warning>
                  <span>
                    <div
                      style={{
                        position: 'absolute',
                        border: 'none',
                        background: 'none',
                        right: '9px',
                        top: '9px',
                      }}
                    >
                      {content.open === 'NO' ? (
                        <span>
                          <MyLock />
                        </span>
                      ) : (
                        <span>
                          <MyUnlock />
                        </span>
                      )}
                    </div>
                  </span>
                  <div
                    style={{
                      width: '200px',
                      height: '230px',
                      margin: '25px auto',
                    }}
                  >
                    <ResumeImg src={content.resumeImage} alt="resume_img" />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <StyledHeaderMargin
                      style={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                      <ResumeInputs
                        itemName={'??????'}
                        flex={'1 0 200px'}
                        name={'name'}
                        value={content?.name || ''}
                        disabled
                      />
                      <div style={{ width: '205px' }}>
                        <ResumeTitles>&nbsp;??????</ResumeTitles>
                        <ResumeGender
                          name={'gender'}
                          value={content?.gender || ''}
                          disabled
                        />
                      </div>
                    </StyledHeaderMargin>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <ResumeInputs
                      itemName={'?????????'}
                      basic
                      name={'contact'}
                      value={content?.contact || ''}
                      disabled
                    />
                  </div>
                  <div
                    style={{
                      flex: '0 0 205px',
                    }}
                  >
                    <ResumeInputs
                      itemName={'????????????'}
                      basic
                      name={'contact'}
                      value={content?.birth || ''}
                      disabled
                    />
                  </div>
                  <div style={{ display: 'flex' }}>
                    <ResumeInputs
                      itemName={'??????'}
                      basic
                      name={'address'}
                      value={content?.address || ''}
                      disabled
                    />
                  </div>
                  <ResumeInputs
                    itemName={'?????????'}
                    sns
                    name={'email'}
                    value={content?.email || ''}
                    disabled
                  />
                  <ResumeInputs
                    itemName={'Github'}
                    sns
                    name={'githubUrl'}
                    value={content?.githubUrl || ''}
                    disabled
                  />
                  <ResumeInputs
                    itemName={'?????? ?????????'}
                    sns
                    name={'blogUrl'}
                    value={content?.blogUrl || ''}
                    disabled
                  />
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <h5 style={{ display: 'inline-block' }}>????????????</h5>
                  <Warning>
                    ?????? ????????? ??????????????? (????????? ?????? ????????? ?????????
                    ???????????????)
                  </Warning>
                  <MyEducation>????????????</MyEducation>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      itemName={'????????????'}
                      basic
                      flex={'1'}
                      name={'schoolName'}
                      value={content?.scholars[0].schoolName || ''}
                      disabled
                    />
                    <ResumeInputs
                      itemName={'??????'}
                      basic
                      flex={'1'}
                      name={'major'}
                      value={content?.scholars[0].major || ''}
                      disabled
                    />
                  </div>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      itemName={'????????????'}
                      basic
                      flex={'1'}
                      name={'contact'}
                      value={content?.scholars[0].inDate || ''}
                      disabled
                    />
                    <ResumeInputs
                      itemName={'????????????'}
                      basic
                      flex={'1'}
                      name={'contact'}
                      value={content?.scholars[0].outDate || ''}
                      disabled
                    />
                  </div>
                  <MyEducation>?????????</MyEducation>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      flex={'1'}
                      itemName={'????????????'}
                      name={'schoolName'}
                      value={content?.scholars[1].schoolName || ''}
                      disabled
                    />
                    <ResumeInputs
                      flex={'1'}
                      itemName={'??????'}
                      name={'major'}
                      value={content?.scholars[1].major || ''}
                      disabled
                    />
                  </div>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      flex={'1'}
                      itemName={'????????????'}
                      basic
                      value={content?.scholars[1].inDate || ''}
                      disabled
                    />
                    <ResumeInputs
                      flex={'1'}
                      itemName={'????????????'}
                      basic
                      value={content?.scholars[1].outDate || ''}
                      disabled
                    />
                  </div>

                  <MyEducation>?????????</MyEducation>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      flex={'1'}
                      itemName={'????????????'}
                      name={'schoolName'}
                      value={content.scholars[2]?.schoolName || ''}
                      disabled
                    />
                    <ResumeInputs
                      flex={'1'}
                      itemName={'??????'}
                      name={'major'}
                      value={content.scholars[2]?.major || ''}
                      disabled
                    />
                  </div>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      flex={'1'}
                      itemName={'????????????'}
                      basic
                      value={content?.scholars[2]?.inDate || ''}
                      disabled
                    />
                    <ResumeInputs
                      flex={'1'}
                      itemName={'????????????'}
                      basic
                      value={content?.scholars[2]?.outDate || ''}
                      disabled
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <h5>?????????</h5>
                  <div style={{ display: 'inline-block', width: '100%' }}>
                    {certificates}
                  </div>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <h5 style={{ display: 'inline-block' }}>??????</h5>
                  <div style={{ display: 'inline-block', width: '100%' }}>
                    {careers}
                  </div>
                </div>
                <div style={{ marginBottom: '20px', marginRight: '5px' }}>
                  <h5 style={{ marginBottom: '15px' }}>????????????</h5>
                  <div className={'container-fluid'} style={{ padding: '0' }}>
                    <TextArea rows="10" value={content.coverLetter} disabled />
                  </div>
                </div>
                <h5>Skill</h5>
                <div>
                  {content.tags.map((t, index) => (
                    <TagBody key={index} grey>
                      {t.name}
                    </TagBody>
                  ))}
                </div>
              </div>
            </ProfileDiv>
          </div>
        </div>
      </div>
    </>
  );
}
