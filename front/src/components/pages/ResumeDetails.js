import { v4 } from 'uuid';
import React, { useEffect, useState } from 'react';
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
  RESUME_GET_REQUEST,
} from '../../reducers/resume';
import ResumeInputs from '../components/resume/ResumeInputs';
import ResumeGender from '../components/resume/ResumeGender';

export default function ResumeDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [, setMyResume] = useState(false);
  const user = useSelector((state) => state.user);
  const resume = useSelector((state) => state.resume);
  const [refresh, ,] = useCookies(['REFRESH_TOKEN']);
  const [content, setContent] = useState({
    open: '',
    name: '',
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
    if (resume.resumeGet) {
      const resumeTemp = { ...resume.resumeGet };
      if (resume.resumeGet.resumeImage === null) {
        resumeTemp.resumeImage =
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      console.log('=== resumeTemp ===', resumeTemp);
      setContent((p) => ({
        ...p,
        ...resumeTemp,
      }));
    }
  }, [resume.resumeGet, setContent]);

  const careers = content.careers.map((x) => {
    return (
      <div key={x.index}>
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <ResumeInputs
            flex={'1'}
            itemName={'회사이름'}
            value={x.companyName || ''}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'직급'}
            value={x.position}
            name={'position'}
            disabled
          />
          <div style={{ display: 'inline-block', margin: '0 0 5px 0' }}>
            <ResumeInputs
              itemName={'입사날짜'}
              basic
              value={x.inDate || ''}
              disabled
            />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeInputs
              itemName={'퇴사날짜'}
              basic
              value={x.outDate || ''}
              disabled
            />
          </div>
        </div>
      </div>
    );
  });
  const certificates = content.certificates.map((y) => {
    return (
      <div key={y.index} style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            width: '100%',
          }}
        >
          <ResumeInputs
            flex={'1'}
            itemName={'이름'}
            value={y.certName}
            name={'certName'}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'급수'}
            value={y.degree}
            name={'degree'}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'점수'}
            value={y.score}
            name={'score'}
            disabled
          />
        </div>
        <div
          key={y.index}
          style={{ display: 'flex', flexWrap: 'nowrap', width: '100%' }}
        >
          <ResumeInputs
            flex={'1'}
            itemName={'발급기관'}
            value={y.institute}
            name={'institute'}
            disabled
          />
          <ResumeInputs
            flex={'1'}
            itemName={'발급번호'}
            value={y.certNumber}
            name={'certNumber'}
            disabled
          />
          <div style={{ display: 'inline-block', marginBottom: '5px' }}>
            <ResumeInputs
              itemName={'발급일자'}
              basic
              value={y.certDate || ''}
              disabled
            />
          </div>
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
      history.push('/resume/total');
    }
  });

  return (
    <>
      <div className="container text-left">
        <StyledHeaderDiv padding>
          <PostTitleInput name={'title'} value={content.title} disabled />
          <div style={{ flex: '0 0' }}>
            <StyledButton mid>수정</StyledButton>
          </div>
          <div style={{ flex: '0 0' }}>
            <StyledButton mid onClick={() => DeleteHandler()}>
              삭제
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
              <div className={'container-fluid'}>
                <div style={{ marginBottom: '40px' }}>
                  <h5 style={{ display: 'inline-block' }}>기본 정보</h5>
                  <Warning>
                    입력하신 정보는 절대 사용자 동의 없이 외부로 유출, 공개되지
                    않습니다.
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
                      공개여부 : {content.open}
                    </div>
                  </span>
                  <div
                    style={{
                      width: '200px',
                      height: '230px',
                      margin: '25px auto',
                    }}
                  >
                    <ResumeImg src={content.resumeImage} alt="resumeImg" />
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <StyledHeaderMargin
                      style={{ display: 'flex', flexWrap: 'wrap' }}
                    >
                      <ResumeInputs
                        itemName={'이름'}
                        flex={'1 0 200px'}
                        name={'name'}
                        value={content?.name || ''}
                        disabled
                      />
                      <div style={{ width: '205px' }}>
                        <ResumeTitles>&nbsp;성별</ResumeTitles>
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
                      itemName={'연락처'}
                      basic
                      name={'contact'}
                      value={content?.contact || ''}
                      disabled
                    />
                    <div
                      style={{
                        marginRight: '5px',
                        flex: '0 0 200px',
                      }}
                    >
                      <ResumeInputs
                        itemName={'생년월일'}
                        basic
                        name={'contact'}
                        value={content?.birth || ''}
                        disabled
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <ResumeInputs
                      itemName={'주소'}
                      basic
                      name={'address'}
                      value={content?.address || ''}
                      disabled
                    />
                  </div>
                  <ResumeInputs
                    itemName={'Github'}
                    sns
                    name={'githubUrl'}
                    value={content?.githubUrl || ''}
                    disabled
                  />
                  <ResumeInputs
                    itemName={'기술 블로그'}
                    sns
                    name={'blogUrl'}
                    value={content?.blogUrl || ''}
                    disabled
                  />
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <h5 style={{ display: 'inline-block' }}>최종학력</h5>
                  <Warning>
                    최종 학력만 입력하세요 (편입한 경우 편입한 대학을
                    기입하세요)
                  </Warning>
                  <MyEducation>고등학교</MyEducation>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      flex={'1'}
                      itemName={'학교이름'}
                      name={'schoolName'}
                      value={content?.scholars[0].schoolName || ''}
                      disabled
                    />
                    <ResumeInputs
                      flex={'1'}
                      itemName={'전공'}
                      name={'major'}
                      value={content?.scholars[0].major || ''}
                      disabled
                    />
                    <div style={{ display: 'inline-block' }}>
                      <ResumeInputs
                        itemName={'입학날짜'}
                        basic
                        name={'contact'}
                        value={content?.scholars[0].inDate || ''}
                        disabled
                      />
                    </div>
                    <div
                      style={{ display: 'inline-block', marginBottom: '5px' }}
                    >
                      <ResumeInputs
                        itemName={'졸업날짜'}
                        basic
                        name={'contact'}
                        value={content?.scholars[0].outDate || ''}
                        disabled
                      />
                    </div>
                  </div>

                  <MyEducation>대학교</MyEducation>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      flex={'1'}
                      itemName={'학교이름'}
                      name={'schoolName'}
                      value={content.scholars[1].schoolName}
                      disabled
                    />
                    <ResumeInputs
                      flex={'1'}
                      itemName={'전공'}
                      name={'major'}
                      value={content.scholars[1].major}
                      disabled
                    />
                    <div style={{ display: 'inline-block' }}>
                      <ResumeInputs
                        itemName={'입학날짜'}
                        basic
                        value={content?.scholars[1].inDate || ''}
                        disabled
                      />
                    </div>
                    <div
                      style={{ display: 'inline-block', marginBottom: '5px' }}
                    >
                      <ResumeInputs
                        itemName={'졸업날짜'}
                        basic
                        value={content?.scholars[1].outDate || ''}
                        disabled
                      />
                    </div>
                  </div>

                  <MyEducation>대학원</MyEducation>
                  <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                    <ResumeInputs
                      flex={'1'}
                      itemName={'학교이름'}
                      name={'schoolName'}
                      value={content.scholars[2]?.schoolName || ''}
                      disabled
                    />
                    <ResumeInputs
                      flex={'1'}
                      itemName={'전공'}
                      name={'major'}
                      value={content.scholars[2]?.major || ''}
                      disabled
                    />
                    <div style={{ display: 'inline-block' }}>
                      <ResumeInputs
                        itemName={'입학날짜'}
                        basic
                        value={content?.scholars[2]?.inDate || ''}
                        disabled
                      />
                    </div>
                    <div
                      style={{ display: 'inline-block', marginBottom: '5px' }}
                    >
                      <ResumeInputs
                        itemName={'졸업날짜'}
                        basic
                        value={content?.scholars[2]?.outDate || ''}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <h5>자격증</h5>
                  <div style={{ display: 'inline-block', width: '100%' }}>
                    {certificates}
                  </div>
                </div>
                <div style={{ marginBottom: '40px' }}>
                  <h5 style={{ display: 'inline-block' }}>경력</h5>
                  <div style={{ display: 'inline-block', width: '100%' }}>
                    {careers}
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ marginBottom: '15px' }}>자기소개</h5>
                  <div
                    className={'container-fluid'}
                    style={{ padding: '0 0p 0px 30px', width: '100%' }}
                  >
                    <TextArea
                      cols="96"
                      rows="10"
                      value={content.coverLetter}
                      disabled
                    />
                  </div>
                </div>
                <h5>Skill</h5>
                <div>
                  {content.tags.map((t) => (
                    <TagBody grey>{t.name}</TagBody>
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
