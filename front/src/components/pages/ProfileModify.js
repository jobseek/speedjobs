import React from 'react';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledHeaderMargin,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ProfileModify from '../components/Profile/ProfileContents';

export default function Profile() {
  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding title={'계정 관리'}>
          <div style={{ flex: '0 0' }}>
            <StyledButton style={{ marginRight: '0' }} wide>
              개인정보 저장
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
            <ProfileDiv className={'col-12 col-lg-10'}>
              <ProfileModify />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
