import React, { useEffect } from 'react';
import {
  MyImage,
  ProfileImg,
  StyledArticle,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ProfileContents from '../components/Profile/ProfileContents';

export default function Profile() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding style={{ position: 'relative' }}>
          <div className={'container row justify-content-end'}>
            <div
              className={'col-md-9 col-8'}
              style={{ marginTop: '14px', paddingTop: '5px' }}
            >
              <h5>계정 관리</h5>
            </div>
            <div className={'col-md-3 col-4 text-right'}>
              <StyledButton wide>프로필 저장</StyledButton>
            </div>
          </div>
        </StyledHeaderDiv>
        <div style={{ marginTop: '100px' }}>
          <div className="row justify-content-center">
            <StyledLeftLayout
              borderNone
              className={'col-12 col-lg-2 text-left'}
            >
              <SideMenu />
            </StyledLeftLayout>
            <StyledArticle
              className={'col-12 col-lg-10'}
              style={{ paddingLeft: '60px' }}
            >
              <ProfileImg>
                <MyImage
                  src="http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  alt="profile"
                />
              </ProfileImg>
              <ProfileContents />
            </StyledArticle>
          </div>
        </div>
      </div>
    </form>
  );
}
