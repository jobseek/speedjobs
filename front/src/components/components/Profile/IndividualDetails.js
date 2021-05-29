import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ProfileInputs from './ProfileInputs';
import { InputText, MyImage, ProfileImg, TextArea } from '../Styled';

const StyledInputText = styled(InputText)`
  border: none;
`;

const StyledTextarea = styled(TextArea)`
  border: none;
`;

export default function IndividualDetails() {
  const profile = useSelector((state) => state.profile);
  const [item, setItem] = useState({
    bio: '',
    name: '',
    birth: '',
    gender: '',
    picture: '',
    contact: '',
    nickname: '',
    password: '',
  });

  useEffect(() => {
    if (profile.profileGetDone) {
      const profileTemp = { ...profile.profileGetData };
      const birthDay = profileTemp.birth?.join('-');
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setItem((p) => ({
        ...p,
        ...profileTemp,
        birth: birthDay,
      }));
    }
  }, [profile.profileGetDone, profile.profileGetData]);

  return (
    <div className="container">
      {/* 프로필 이미지*/}
      <ProfileImg>
        <MyImage
          src={
            item.picture === ''
              ? 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
              : item.picture
          }
          alt="profile_image"
        />
      </ProfileImg>
      {/* 이름*/}
      <ProfileInputs name={'이름'} />
      <StyledInputText type="text" value={item.name || ''} disabled />
      {/* 닉네임*/}
      <ProfileInputs name={'닉네임'} />
      <StyledInputText type="text" value={item.nickname || ''} disabled />
      {/* 이메일*/}
      <ProfileInputs name={'이메일'} />
      <StyledInputText type="text" value={item.email || ''} disabled />
      {/* 생년월일*/}
      <ProfileInputs name={'생년월일'} />
      <StyledInputText type="text" value={item.birth || ''} disabled />
      {/* 성별*/}
      <ProfileInputs name={'성별'} />
      <StyledInputText type="text" value={item.gender || ''} disabled />
      {/* 연락처*/}
      <ProfileInputs name={'연락처'} />
      <StyledInputText type="tel" value={item.contact || ''} disabled />
      {/* 한 줄 소개*/}
      <ProfileInputs name={'한 줄 소개'} />
      <StyledTextarea value={item.bio || ''} cols="96" rows="3" disabled />
    </div>
  );
}
