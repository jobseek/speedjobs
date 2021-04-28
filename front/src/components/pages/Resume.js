import React from 'react';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledHeaderMargin,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ResumeContents from '../components/resume/ResumeContents';

export default function Resume() {
  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding style={{ position: 'relative' }}>
          <StyledHeaderMargin className={'container row justify-content-end'}>
            <div
              className={'col-md-9 col-8'}
              style={{ marginTop: '14px', paddingTop: '5px' }}
            >
              <h5>이력서</h5>
            </div>
            <div className={'col-md-3 col-4 text-right pr-0'}>
              <StyledButton wide>등록</StyledButton>
            </div>
          </StyledHeaderMargin>
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
              <ResumeContents />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
