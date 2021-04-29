import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledHeaderMargin,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import { PROFILE_DELETE_REQUEST } from '../../reducers/profile';
import { LOG_OUT_REQUEST } from '../../reducers/user';

export default function Profile() {
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ password: '' });

  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onDeleteHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: PROFILE_DELETE_REQUEST,
        data: form,
        me: user.me,
      });
      dispatch({
        type: LOG_OUT_REQUEST,
        data: user.me,
      });
      console.log(profile);
    },
    [dispatch, user.me, profile, form]
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

                <div>
                  <input
                    type="password"
                    onChange={(e) => onChangeHandler(e)}
                    name={'password'}
                    placeholder="비밀번호 확인"
                  />
                </div>

                <StyledButton
                  red
                  style={{ marginRight: '0' }}
                  wide
                  onClick={(e) => {
                    onDeleteHandler(e);
                  }}
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
