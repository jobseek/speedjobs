import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledHeaderMargin,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ProfileDetails from '../components/Profile/ProfileDetails';
import ProfileDetails2 from '../components/Profile/ProfileDetails2';
import { PROFILE_GET_REQUEST } from '../../reducers/profile';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user.me === null) return;
    dispatch({
      type: PROFILE_GET_REQUEST,
      data: user.me,
    });
    setRole(user.me.role);
  }, [user.me, dispatch]);

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
              {role === 'ROLE_MEMBER' ? (
                <Link to="/profile/modify">
                  <StyledButton style={{ marginRight: '0' }} wide>
                    개인정보 수정
                  </StyledButton>
                </Link>
              ) : (
                <Link to="/profile/modify2">
                  <StyledButton style={{ marginRight: '0' }} wide>
                    기업정보 수정
                  </StyledButton>
                </Link>
              )}
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

            {console.log('잉????: ', role)}

            <ProfileDiv className={'col-12 col-lg-10'}>
              {role === 'ROLE_MEMBER' ? (
                <ProfileDetails />
              ) : (
                <ProfileDetails2 />
              )}
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
