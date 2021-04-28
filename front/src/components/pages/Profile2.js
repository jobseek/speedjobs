import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledHeaderMargin,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import {
  PROFILE_DELETE_REQUEST,
  PROFILE_GET_REQUEST,
} from '../../reducers/profile';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    if (user.me === null) return;
    dispatch({
      type: PROFILE_GET_REQUEST,
      data: user.me,
    });
    setRole(user.me.role);
  }, [user.me, dispatch]);

  useEffect(() => {
    if (profile.profileDeleteDone) {
      window.location.replace('/');
    }
  }, [profile]);

  const deleteHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: PROFILE_DELETE_REQUEST,
        data: user.me,
      });
    },
    [dispatch, user.me]
  );

  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding style={{ position: 'relative' }}>
          <StyledHeaderMargin className={'container row justify-content-end'}>
            <div
              className={'col-md-12 col-8'}
              style={{ marginTop: '10px', paddingTop: '5px' }}
            >
              <h5>회원 탈퇴</h5>
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
              <div
                style={{
                  textAlign: 'center',
                  borderRadius: '10px',
                  marginTop: '100px',
                }}
              >
                <h2>경고: 정말로 탈퇴 하시겠습니까?</h2>
                <p>회원탈퇴 버튼을 클릭하면 모든 정보가 지워집니다.</p>
                <StyledButton
                  red
                  style={{ marginRight: '0' }}
                  wide
                  onClick={(e) => deleteHandler(e)}
                >
                  회원탈퇴
                </StyledButton>
              </div>
            </ProfileDiv>
          </div>
        </div>
      </div>
    </form>
  );
}
