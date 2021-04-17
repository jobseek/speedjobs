import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  StyledArticle,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ProfileContents from '../components/Profile/ProfileContents';
import ConfirmPassword from '../components/Profile/ConfirmPassword';

export default function Profile() {
  const [show, setShow] = useState(false);

  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding style={{ position: 'relative' }}>
          <div className={'container row justify-content-end'}>
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
              <StyledButton
                style={{ marginRight: '0' }}
                wide
                onClick={() => setShow(show !== true)}
              >
                개인정보 수정
              </StyledButton>
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
            <StyledArticle className={'col-12 col-lg-10'}>
              <div className={'container-fluid'}>
                <ProfileContents />
              </div>
            </StyledArticle>
          </div>
        </div>
      </div>
      {show ? <ConfirmPassword setShow={setShow} /> : ''}
    </form>
  );
}
