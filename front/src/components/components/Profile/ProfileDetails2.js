import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_GET_REQUEST } from '../../../reducers/profile';
import ProfileInputs from './ProfileInputs';
import { InputText, MyImage, ProfileImg, TextArea } from '../Styled';

const StyledInputText = styled(InputText)`
  border: none;
`;

const StyledTextarea = styled(TextArea)`
  border: none;
`;

export default function ProfileDetails() {
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [item, setItem] = useState({
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

  useEffect(() => {
    if (profile.profileGetData) {
      console.log('테스트', profile.profileGetData);
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'http://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setItem({ ...profileTemp });
    }
  }, [profile.profileGetData]);

  useEffect(() => {
    if (user.me === null) return;
    dispatch({
      type: PROFILE_GET_REQUEST,
      data: user.me,
    });
  }, [user.me, dispatch]);

  return (
    <div className="container">
      <h2>기업회원 조회 페이지</h2>
      <ProfileImg>
        <MyImage src={item.picture} alt="profile" />
      </ProfileImg>
      <ProfileInputs name={'기업이름'} />
      <StyledInputText
        name={'companyName'}
        type="text"
        value={item.companyName || ''}
        disabled
      />
      <ProfileInputs name={'담당자 이름'} />
      <StyledInputText
        name={'name'}
        type="text"
        value={item.name || ''}
        disabled
      />
      <ProfileInputs name={'담당자 연락처'} />
      <StyledInputText
        name={'contact'}
        type="text"
        value={item.contact || ''}
        disabled
      />
      {/* <ProfileInputs name={'닉네임'} />*/}
      {/* <StyledInputText*/}
      {/*  name={'nickname'}*/}
      {/*  type="text"*/}
      {/*  value={item.nickname || ''}*/}
      {/*  disabled*/}
      {/* />*/}
      <ProfileInputs name={'담당자 이메일'} />
      <StyledInputText
        name={'email'}
        type="text"
        value={item.email || ''}
        disabled
      />
      <ProfileInputs name={'대표 홈페이지'} />
      <StyledInputText
        name={'homepage'}
        type="text"
        value={item.homepage || ''}
        disabled
      />
      <ProfileInputs name={'사업자 등록번호'} />
      <StyledInputText
        name={'registrationNumber'}
        type="text"
        value={item.registrationNumber || ''}
        disabled
      />
      <ProfileInputs name={'회사 규모'} />
      <StyledInputText
        name={'scale'}
        type="number"
        value={item.scale || ''}
        disabled
      />
      <ProfileInputs name={'회사 주소'} />
      <StyledInputText
        name={'address'}
        type="number"
        value={item.address || ''}
        disabled
      />
      <ProfileInputs name={'회사 소개'} />
      <StyledTextarea
        name={'description'}
        value={item.description || ''}
        cols="96"
        rows="3"
        disabled
      />
    </div>
  );
}
