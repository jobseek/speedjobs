import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
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
        <StyledHeaderDiv padding title={'계정관리'}>
          <div style={{ flex: '0 0' }}>
            {role === 'ROLE_MEMBER' ? (
              <Link to={'/profile/modify'}>
                <StyledButton style={{ marginRight: '0' }} wide>
                  개인정보 수정
                </StyledButton>
              </Link>
            ) : (
              <Link to={'/profile/modify2'}>
                <StyledButton style={{ marginRight: '0' }} wide>
                  기업정보 수정
                </StyledButton>
              </Link>
            )}
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

            {console.log('잉????: ', role)}

            <ProfileDiv className={'col-12 col-lg-10'}>
              {role === 'ROLE_MEMBER' ? (
                <ProfileDetails /> // 개인회원 정보
              ) : (
                <ProfileDetails2 /> // 기업회원 정보
              )}
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
