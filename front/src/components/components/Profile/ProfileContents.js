import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ProfileInputs from './ProfileInputs';
import ProfileGender from './ProfileGender';
import ProfileTextarea from './ProfileTextarea';
import { InputText, StyledButton } from '../Styled';
import ProfileImage from './ProfileImage';
import { PROFILE_UPDATE_REQUEST } from '../../../reducers/profile';

export default function ProfileContents() {
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    password: '',
    sex: '',
    contact: '',
    intro: '',
    picture: '',
  });
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  useEffect(() => {
    if (profile.profileUpdateDone) {
      history.goForward();
    }
  }, [profile, history]);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      // dispatch({ type: PROFILE_UPDATE_REQUEST, data: form, me: user.me.id });
      if (
        form.name === '' ||
        form.nickname === '' ||
        form.password === '' ||
        form.sex === '' ||
        form.contact === '' ||
        form.intro === ''
      ) {
        if (form.name === '') {
          alert('이름을 입력하세요');
        } else if (form.nickname === '') {
          alert('닉네임을 입력하세요');
        } else if (form.password === '') {
          alert('비밀번호를 입력하세요');
        } else if (form.contact === '') {
          alert('연락처를 입력하세요');
        } else if (form.intro === '') {
          alert('자신을 소개해주세요');
        }
      } else {
        dispatch({ type: PROFILE_UPDATE_REQUEST, data: form, me: user.me.id });
      }
    },
    [dispatch, form]
  );
  return (
    <div className="container">
      <form>
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
        <ProfileGender onChange={(e) => onChangeHandler(e)} name={'sex'} />
        {/* 연락처: 집 or 핸드폰 */}
        <ProfileInputs name={'연락처'} />
        <InputText
          onChange={(e) => onChangeHandler(e)}
          name={'contact'}
          type="tel"
        />
        {/* 한 줄 소개 */}
        <ProfileInputs name={'한 줄 소개'} />
        <ProfileTextarea onChange={(e) => onChangeHandler(e)} name={'intro'} />
        {/* 변경 사항 저장 버튼 */}
        <StyledButton wide onClick={(e) => onSubmitHandler(e)}>
          변경 사항 저장
        </StyledButton>
      </form>
    </div>
  );
}
