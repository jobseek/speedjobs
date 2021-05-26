import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  PROFILE_DELETE_DONE,
  PROFILE_DELETE_REQUEST,
} from '../../../reducers/profile';
import { LOG_OUT_REQUEST } from '../../../reducers/user';
import {
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../../components/Styled';
import SideMenu from '../../components/SideMenu';

const MyInput = styled.input`
  width: 200px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid silver;
  padding-left: 10px;

  &:focus {
    outline: none;
  }
`;

export default function Withdrawal() {
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
    },
    [dispatch, user.me, form]
  );

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onDeleteHandler(e);
      }
    },
    [onDeleteHandler]
  );

  useEffect(() => {
    if (profile.profileDeleteError === 400) {
      console.log('비밀번호 형식에 맞지 않음');
    } else if (profile.profileDeleteError === 403) {
      console.log('비밀번호가 다름');
    } else if (profile.profileDeleteDone) {
      dispatch({
        type: LOG_OUT_REQUEST,
        data: user.me,
      });
    }

    if (profile.profileDeleteError || profile.profileDeleteDone) {
      dispatch({ type: PROFILE_DELETE_DONE });
    }
  }, [
    profile.profileDeleteDone,
    profile.profileDeleteError,
    dispatch,
    user.me,
  ]);

  return (
    <form>
      <div className="container text-left">
        <StyledHeaderDiv padding title={'회원탈퇴'} />
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
                  <MyInput
                    type="password"
                    onChange={(e) => onChangeHandler(e)}
                    onKeyPress={(e) => handleKeyPress(e)}
                    name={'password'}
                    placeholder="비밀번호 확인"
                  />
                </div>
                <StyledButton
                  red
                  style={{ marginRight: '0' }}
                  wide
                  onClick={(e) => onDeleteHandler(e)}
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
