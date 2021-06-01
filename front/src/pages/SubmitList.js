import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  ProfileDiv,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import SubmitItem from '../components/SubmitItem';
import { RECRUIT_LIST_DONE, RECRUIT_LIST_REQUEST } from '../reducers/recruit';
import { RESUME_LIST_DONE, RESUME_LIST_REQUEST } from '../reducers/resume';
import ResumeItem from '../components/ResumeItem';

const ApplicationInfo = styled.div`
  border: 1px #eee solid;
  border-radius: 5px;
  width: 95%;
  height: 60px;
  margin: 0 auto 10px;
  padding: 10px 50px;
  color: #707070;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const CountText = styled.span`
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const CountNumber = styled.span`
  font-size: 25px;
  margin-right: 8px;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const ListSetting = styled.div`
  margin-left: 25px;
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export default function SubmitList() {
  const dispatch = useDispatch();
  const { user, recruit, resume } = useSelector((state) => state);
  const [process, setProcess] = useState([]);
  const [all, setAll] = useState([]);
  const [arr, setArr] = useState([]);
  const [resumes, setResumes] = useState([]);

  // 작성한 공고목록 & 오픈된 이력서목록 불러오기 요청
  useEffect(() => {
    dispatch({
      type: RECRUIT_LIST_REQUEST,
      data: { size: 99, page: 0, companyName: user.me?.nickname },
    });
    dispatch({
      type: RESUME_LIST_REQUEST,
      data: { size: 99, page: 0, open: 'YES' },
    });
  }, [dispatch, user.me?.nickname]);

  // 기업이 작성한 공고목록 불러오기
  useEffect(() => {
    if (recruit.recruitList) {
      setAll(recruit.recruitList.content);
      const processTmp = recruit.recruitList.content.filter(
        (i) => i.status === 'REGULAR' || i.status === 'PROCESS'
      );
      setProcess(processTmp);
      dispatch({
        type: RECRUIT_LIST_DONE,
      });

      // 초기화면 목록
      setArr(recruit.recruitList.content);
    }
  }, [dispatch, recruit.recruitList]);

  // 오픈된 이력서목록 불러오기
  useEffect(() => {
    if (resume.resumeList) {
      setResumes(resume.resumeList.content);
      dispatch({
        type: RESUME_LIST_DONE,
      });
    }
  }, [resume.resumeList, dispatch]);

  const mapArr = arr.map((i, index) => {
    if (i.open === undefined) {
      return (
        <SubmitItem
          key={index}
          id={i.id}
          title={i.title}
          date={i.openDate}
          tags={i.tags}
          status={i.status}
          position={i.position}
        />
      );
    } else {
      return <ResumeItem resume={i} key={index} />;
    }
  });

  return (
    <div className="container text-left">
      <StyledHeaderDiv padding title={'지원이력서 목록'} />
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <StyledLeftLayout borderNone className={'col-12 col-lg-2 text-left'}>
            {/* 기업회원을 위한 사이드메뉴로 수정 필요 */}
            <SideMenu />
          </StyledLeftLayout>
          <ProfileDiv className={'col-12 col-lg-10 p-0'}>
            <ListSetting>
              <ApplicationInfo>
                <div
                  style={{
                    display: 'flex',
                    verticalAlign: 'middle',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>
                    <CountNumber>{resumes.length}</CountNumber>
                    <CountText onClick={() => setArr(resumes)}>
                      오픈된 이력서
                    </CountText>
                  </span>
                  <span>
                    <CountNumber>{process.length}</CountNumber>
                    <CountText onClick={() => setArr(process)}>
                      채용중 공고
                    </CountText>
                  </span>
                  <span>
                    <CountNumber>{all.length}</CountNumber>
                    <CountText onClick={() => setArr(all)}>전체 공고</CountText>
                  </span>
                </div>
              </ApplicationInfo>
              {mapArr}
            </ListSetting>
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
