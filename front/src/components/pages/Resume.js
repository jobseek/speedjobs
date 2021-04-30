import React, { useState } from 'react';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ResumeContents from '../components/resume/ResumeContents';

export default function Resume() {
  const [data, setData] = useState({
    open: '',
    name: '',
    gender: '',
    contact: '',
    birth: '',
    blogUrl: '',
    githubUrl: '',
    resumeImage: '',
  });
  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding title={'이력서'}>
          <div style={{ flex: '0 0' }}>
            <StyledButton wide>등록</StyledButton>
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
              <ResumeContents setData={setData} />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
