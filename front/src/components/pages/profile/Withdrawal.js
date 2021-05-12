import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

/**
 * 회원 탈퇴 페이지
 * 1. 회원 탈퇴 시 비밀번호를 확인하고 탈퇴할 수 있도록 한다.
 * 2. useState를 이용해서 password를 빈 문자열로 초기화 해준다.
 * 3. 비밀번호 입력하는 input 태그에 onChangeHandler 이벤트를 걸어준다.
 * 4. 입력된 비밀번호를 회원탈퇴 버튼을 클릭했을 때 발생하는 onDeleteHandler 이벤트를 걸어준다.
 * 5. dispatch를 사용해 PROFILE_DELETE_REQUEST 리덕스 상태를 보내준다.(입력된 password form과 사용자 정보 user.me 함께)
 * 6. 입력된 비밀번호가 다른 경우(에러 400, 403) 알림창으로 '비밀번호가 다릅니다.' 띄운다.
 * 7. 입력된 비밀번호가 맞은 경우 dispatch를 이용해서 LOG_OUT_REQUEST 상태를 보내 최종적으로 회원탈퇴와 로그아웃이 되도록 한다.
 */

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
