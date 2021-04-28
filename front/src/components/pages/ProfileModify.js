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
        <StyledHeaderDiv padding style={{ position: 'relative' }}>
          <StyledHeaderMargin className={'container row justify-content-end'}>
            <div
              className={'col-md-9 col-8'}
              style={{ marginTop: '10px', paddingTop: '5px' }}
            >
              <h5>계정 관리</h5>
            </div>
            <div
              className={'col-md-3 col-4 text-right'}
              style={{ paddingRight: '0' }}
            >
              <StyledButton style={{ marginRight: '0' }} wide>
                개인정보 저장
              </StyledButton>
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
            <ProfileDiv className={'col-12 col-lg-10'}>
              <ProfileModify />
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
