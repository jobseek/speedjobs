import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import ProfileGender from './ProfileGender';
import ProfileInputs from './ProfileInputs';
import ProfileTextarea from './ProfileTextarea';
import { InputText, StyledButton } from '../Styled';
import { PROFILE_UPDATE_REQUEST } from '../../../reducers/profile';

export default function ProfileModify() {
  const history = useHistory();
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
  });
  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  useEffect(() => {
    if (profile.profileUpdateDone) {
      history.push('/profile');
    }
  }, [profile, history]);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: PROFILE_UPDATE_REQUEST, data: form, me: user.me.id });
    },
    [dispatch, form, user.me.id]
  );

  //
  //   if (
  //     form.nickname === '' ||
  //     form.password === '' ||
  //     form.gender === '' ||
  //     form.contact === '' ||
  //     form.bio === ''
  //   ) {
  //     if (form.nickname === '') {
  //       alert('닉네임을 입력하세요');
  //     } else if (form.password === '') {
  //       alert('비밀번호를 입력하세요');
  //     } else if (form.contact === '') {
  //       alert('연락처를 입력하세요');
  //     } else if (form.bio === '') {
  //       alert('자신을 소개해주세요');
  //     } else if (form.gender === '') {
  //       alert('성별을 체크해주세요');
  //     }
  //   } else {
  //   }
  // },

  return (
    <div className="container">
      {/* 프로필 이미지 업로드 */}
      <ProfileImage onChange={(e) => onChangeHandler(e)} />

      {/* 이름 */}
      <ProfileInputs name={'이름'} />
      <InputText
        onChange={(e) => onChangeHandler(e)}
        name={'name'}
        type="text"
      />
      {/* 닉네임 */}
      <ProfileInputs name={'닉네임'} />
      <InputText
        onChange={(e) => onChangeHandler(e)}
        name={'nickname'}
        type="text"
      />
      {/* 비밀번호 */}
      <ProfileInputs name={'비밀번호'} />
      <InputText
        onChange={(e) => onChangeHandler(e)}
        name={'password'}
        type="password"
      />

      {/* <ProfileInputs name={'비밀번호 확인'} />*/}
      {/* <InputText onChange={(e) => onChangeHandler(e)} type="password" />*/}

      {/* 성별: 남, 여 체크 */}
      <ProfileInputs name={'성별'} />
      <ProfileGender onChange={(e) => onChangeHandler(e)} name={'gender'} />

      {/* 연락처: 집 or 핸드폰 */}
      <ProfileInputs name={'연락처'} />
      <InputText
        onChange={(e) => onChangeHandler(e)}
        name={'contact'}
        type="tel"
        maxLength="13"
      />
      {/* 한 줄 소개 */}
      <ProfileInputs name={'한 줄 소개'} />
      <ProfileTextarea onChange={(e) => onChangeHandler(e)} name={'bio'} />
      {/* 변경 사항 저장 버튼 */}
      <StyledButton wide onClick={(e) => onSubmitHandler(e)}>
        변경 사항 저장
      </StyledButton>
    </div>
  );
}
