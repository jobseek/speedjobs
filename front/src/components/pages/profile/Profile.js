import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {PROFILE_GET_REQUEST} from '../../../reducers/profile';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../../components/Styled';
import SideMenu from '../../components/SideMenu';
import IndividualDetails from '../../components/Profile/IndividualDetails';
import CorporateDetails from '../../components/Profile/CorporateDetails';

/**
 * 회원 조회 상위 컴포넌트
 * 1. dispatch => PROFILE_GET_REQUEST 액션 발생
 * 2. setRole을 이용해서 role의 정보를 저장한다. (useState 사용)
 * 3. role === ROLE_MEMBER => 개인회원 수정 페이지, 개인회원 조회 페이지
 * 4. role === ROLE_COMPANY => 기업회원 수정 페이지, 기업회원 조회 페이지
 */

export default function Profile() {
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.me === null) {
      return;
    }
    dispatch({ type: PROFILE_GET_REQUEST, data: user.me });
    setRole(user.me.role);
  }, [user.me, dispatch]);

  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding title={'계정관리'}>
          <div style={{ flex: '0 0' }}>
            {role === 'ROLE_MEMBER' ? (
              <Link to={'/profile/individual/modify'}>
                <StyledButton style={{ marginRight: '0' }} wide>
                  개인정보 수정
                </StyledButton>
              </Link>
            ) : (
              <Link to={'/profile/corporate/modify'}>
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

            <ProfileDiv className={'col-12 col-lg-10'}>
              {role === 'ROLE_MEMBER' ? (
                <IndividualDetails /> // 개인회원 상세 컴포넌트
              ) : (
                <CorporateDetails /> // 기업회원 상세 컴포넌트
              )}
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
