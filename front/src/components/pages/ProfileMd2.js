import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  InputText,
  ProfileDiv,
  StyledButton,
  StyledHeaderDiv,
  StyledLeftLayout,
} from '../components/Styled';
import SideMenu from '../components/SideMenu';
import ProfileImage from '../components/Profile/ProfileImage';
import ProfileInputs from '../components/Profile/ProfileInputs';
import ProfileTextarea from '../components/Profile/ProfileTextarea';
import {
  PROFILE_GET_REQUEST,
  PROFILE_UPDATE_REQUEST,
} from '../../reducers/profile';

export default function ProfileMd2() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [form, setForm] = useState({
    companyName: '',
    name: '',
    nickname: '',
    registrationNumber: '',
    contact: '',
    picture: '',
    description: '',
    scale: '',
    homepage: '',
    address: '',
  });

  const onChangeHandler = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (user.me.id === null) return;
      dispatch({
        type: PROFILE_UPDATE_REQUEST,
        data: form,
        data2: user.me,
        me: user.me.id,
      });
      history.push('/profile');
    },
    [dispatch, form, user.me, history]
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
      <StyledHeaderDiv padding title={'기업 정보 수정'}>
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

            <ProfileInputs name={'기업이름'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'companyName'}
              type="text"
              value={form.companyName || ''}
              disabled
            />

            <ProfileInputs name={'담당자 이름'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'name'}
              type="text"
              value={form.name || ''}
            />

            <ProfileInputs name={'담당자 닉네임'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'nickname'}
              type="text"
              value={(form.nickname = form.name || '')}
              readonly
            />

            <ProfileInputs name={'담장자 연락처'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'contact'}
              type="text"
              value={form.contact || ''}
            />

            <ProfileInputs name={'담장자 이메일'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'email'}
              type="email"
              value={form.email || ''}
            />

            <ProfileInputs name={'대표 홈페이지'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'homepage'}
              type="text"
              value={form.homepage || ''}
            />

            <ProfileInputs name={'사업자 등록번호'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'registrationNumber'}
              type="text"
              value={form.registrationNumber || ''}
              disabled
            />

            <ProfileInputs name={'회사 규모'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'scale'}
              type="text"
              value={form.scale || ''}
            />

            <ProfileInputs name={'회사 주소'} />
            <InputText
              onChange={(e) => onChangeHandler(e)}
              name={'address'}
              type="text"
              value={form.address || ''}
            />

            <ProfileInputs name={'회사 소개'} />
            <ProfileTextarea
              onChange={(e) => onChangeHandler(e)}
              name={'description'}
              value={form.description || ''}
            />
          </ProfileDiv>
        </div>
      </div>
    </div>
  );
}
