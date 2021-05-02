import React from 'react';
import { Link } from 'react-router-dom';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';

export default function ResumeList() {
  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding title={'이력서'}>
          <div style={{ flex: '0 0' }}>
            <Link to="/resume">
              <StyledButton wide>작성</StyledButton>
            </Link>
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
              이력서 목록 페이지
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
