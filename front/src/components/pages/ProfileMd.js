import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  InputText,
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledHeaderMargin,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ProfileImage from '../components/Profile/ProfileImage';
import ProfileInputs from '../components/Profile/ProfileInputs';
import ProfileGender from '../components/Profile/ProfileGender';
import ProfileTextarea from '../components/Profile/ProfileTextarea';
import {
  PROFILE_GET_REQUEST,
  PROFILE_UPDATE_REQUEST,
} from '../../reducers/profile';

export default function ProfileMd() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    password: '',
    gender: '',
    contact: '',
    bio: '',
    picture: '',
    birth: '',
  });

  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  useEffect(() => {
    if (profile.profileUpdateDone) {
      // history.push('/profile');
      window.location.replace('/profile');
    }
  }, [profile]);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: PROFILE_UPDATE_REQUEST,
        data: form,
        data2: user.me,
        me: user.me?.id,
      });
    },
    [dispatch, form, user.me, user.me?.id]
  );

  useEffect(() => {
    if (profile.profileGetData) {
      console.log('테스트', profile.profileGetData);
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setForm({ ...profileTemp });
    }
  }, [profile.profileGetData]);

  useEffect(() => {
    if (user.me === null) return;
    dispatch({ type: PROFILE_GET_REQUEST, data: user.me });
  }, [user.me, dispatch]);

  return (
    <div className="container text-left">
      <StyledHeaderDiv padding style={{ position: 'relative' }}>
        <StyledHeaderMargin className={'container row justify-content-end'}>
          <div
            className={'col-md-9 col-8'}
            style={{ marginTop: '10px', paddingTop: '5px' }}
          >
            <h5>계정 수정</h5>
          </div>
          <div
            className={'col-md-3 col-4 text-right'}
            style={{ paddingRight: '0' }}
          >
            <StyledButton
              style={{ marginRight: '0' }}
              wide
              onClick={(e) => onSubmitHandler(e)}
            >
              변경 사항 저장
            </StyledButton>
          </div>
        </StyledHeaderMargin>
      </StyledHeaderDiv>
      <div className="container" style={{ marginTop: '70px' }}>
        <div className="row justify-content-center">
          <StyledLeftLayout borderNone className={'col-12 col-lg-2 text-left'}>
            <SideMenu />
          </StyledLeftLayout>
          <ProfileDiv className={'col-12 col-lg-10'}>
            {/* <ProfileModify />*/}
            <ProfileImage
              onChange={(e) => onChangeHandler(e)}
              value={form.picture || ''}
            />

            {/* 이름 */}
            <ProfileInputs name={'이름'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'name'}
              type="text"
              value={form.name || ''}
            />
            {/* 닉네임 */}
            <ProfileInputs name={'닉네임'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'nickname'}
              type="text"
              value={form.nickname || ''}
            />
            {/* 생년월일 */}
            <ProfileInputs name={'생년월일'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'birth'}
              type="text"
              value={form.birth || ''}
            />

            {/* 비밀번호 */}
            {/* <ProfileInputs name={'비밀번호'} />*/}
            {/* <InputText*/}
            {/*  onChange={(e) => onChangeHandler(e)}*/}
            {/*  name={'password'}*/}
            {/*  type="password"*/}
            {/*  value={form.password}*/}
            {/* />*/}
            {/* {console.log('비밀본호-------', form.password)}*/}

            {/* <ProfileInputs name={'비밀번호 확인'} />*/}
            {/* <InputText onChange={(e) => onChangeHandler(e)} type="password" />*/}

            {/* 성별: 남, 여 체크 */}
            <ProfileInputs name={'성별'} />
            <ProfileGender
              onChange={(e) => onChangeHandler(e)}
              name={'gender'}
              value={form.gender || ''}
            />

            {/* 연락처: 집 or 핸드폰 */}
            <ProfileInputs name={'연락처'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'contact'}
              type="tel"
              maxLength="13"
              value={form.contact || ''}
            />
            {/* 한 줄 소개 */}
            <ProfileInputs name={'한 줄 소개'} />
            <ProfileTextarea
              onChange={(e) => onChangeHandler(e)}
              name={'bio'}
              value={form.bio || ''}
            />
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
