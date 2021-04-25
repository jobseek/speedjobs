import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from './ProfileImage';
import ProfileGender from './ProfileGender';
import ProfileInputs from './ProfileInputs';
import ProfileTextarea from './ProfileTextarea';
import { InputText, StyledButton } from '../Styled';
import {
  PROFILE_GET_REQUEST,
  PROFILE_UPDATE_REQUEST,
} from '../../../reducers/profile';

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
  }, [profile, history]);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({ type: PROFILE_UPDATE_REQUEST, data: form, me: user.me.id });
    },
    [dispatch, form]
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
    dispatch({ type: PROFILE_GET_REQUEST, data: user.me.id });
  }, [user.me, dispatch]);

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
      <ProfileImage onChange={(e) => onChangeHandler(e)} value={form.picture} />

      {/* 이름 */}
      <ProfileInputs name={'이름'} />
      <InputText
        onChange={(e) => onChangeHandler(e)}
        name={'name'}
        type="text"
        value={form.name}
      />
      {/* 닉네임 */}
      <ProfileInputs name={'닉네임'} />
      <InputText
        onChange={(e) => onChangeHandler(e)}
        name={'nickname'}
        type="text"
        value={form.nickname}
      />
      {/* 생년월일 */}
      <ProfileInputs name={'생년월일'} />
      <InputText
        onChange={(e) => onChangeHandler(e)}
        name={'birth'}
        type="text"
        value={form.birth}
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
      <ProfileGender
        onChange={(e) => onChangeHandler(e)}
        name={'gender'}
        value={form.gender}
      />

      {/* 연락처: 집 or 핸드폰 */}
      <ProfileInputs name={'연락처'} />
      <InputText
        onChange={(e) => onChangeHandler(e)}
        name={'contact'}
        type="tel"
        maxLength="13"
        value={form.contact}
      />
      {/* 한 줄 소개 */}
      <ProfileInputs name={'한 줄 소개'} />
      <ProfileTextarea
        onChange={(e) => onChangeHandler(e)}
        name={'bio'}
        value={form.bio}
      />

      {/* 변경 사항 저장 버튼 */}
      <StyledButton wide onClick={(e) => onSubmitHandler(e)}>
        변경 사항 저장
      </StyledButton>
    </div>
  );
}
