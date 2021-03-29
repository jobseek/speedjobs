import React from 'react';
import {
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ResumeContents from '../components/resume/ResumeContents';

export default function Resume() {
  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding style={{ position: 'relative' }}>
          <div className={'container row justify-content-end'}>
            <div
              className={'col-md-9 col-8'}
              style={{ marginTop: '14px', paddingTop: '5px' }}
            >
              <h5>이력서</h5>
            </div>
            <div className={'col-md-3 col-4 text-right'}>
              <StyledButton wide>수정</StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        <div className="container" style={{ marginTop: '100px' }}>
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            <ResumeContents />
          </div>
        </div>
      </div>
    </form>
  );
}
