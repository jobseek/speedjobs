import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInputs from './ProfileInputs';
import { InputText, MyImage, ProfileImg, TextArea } from '../Styled';
import { PROFILE_GET_REQUEST } from '../../../reducers/profile';

const StyledInputText = styled(InputText)`
  border: none;
`;

const StyledTextarea = styled(TextArea)`
  border: none;
`;

export default function CorporateDetails() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const [item, setItem] = useState({
    name: '',
    scale: '',
    contact: '',
    picture: '',
    nickname: '',
    homepage: '',
    address: '',
    detailedAddress: '',
    avgSalary: '',
    description: '',
    companyName: '',
    registrationNumber: '',
  });

  useEffect(() => {
    if (user.me === null) return;
    dispatch({ type: PROFILE_GET_REQUEST, me: user.me });
  }, [user.me, dispatch]);

  useEffect(() => {
    if (profile.profileGetData) {
      const profileTemp = { ...profile.profileGetData };
      if (profile.profileGetData.picture === null) {
        profileTemp.picture =
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
      }
      setItem((p) => ({ ...p, ...profileTemp }));
    }
  }, [profile.profileGetData]);

  return (
    <div className="container">
      {/* 프로필 이미지*/}
      <ProfileImg>
        <MyImage src={item.picture} alt="profile_image" />
      </ProfileImg>
      {/* 기업이름*/}
      <ProfileInputs name={'기업이름'} />
      <StyledInputText type="text" value={item.companyName || ''} disabled />
      {/* 담당자 이름*/}
      <ProfileInputs name={'담당자 이름'} />
      <StyledInputText type="text" value={item.name || ''} disabled />
      {/* 담당자 닉네임*/}
      <ProfileInputs name={'담당자 닉네임'} />
      <StyledInputText type="text" value={item.name || ''} disabled />
      {/* 담당자 연락처*/}
      <ProfileInputs name={'담당자 연락처'} />
      <StyledInputText type="text" value={item.contact || ''} disabled />
      {/* 담당자 이메일*/}
      <ProfileInputs name={'담당자 이메일'} />
      <StyledInputText type="text" value={item.email || ''} disabled />
      {/* 대표 홈페이지*/}
      <ProfileInputs name={'대표 홈페이지'} />
      <StyledInputText type="text" value={item.homepage || ''} disabled />
      {/* 사업자 등록번호*/}
      <ProfileInputs name={'사업자 등록번호'} />
      <StyledInputText
        type="text"
        value={item.registrationNumber || ''}
        disabled
      />
      {/* 회사 규모*/}
      <ProfileInputs name={'회사 규모'} />
      <StyledInputText type="number" value={item.scale || ''} disabled />
      {/* 평균 연봉*/}
      <ProfileInputs name={'평균 연봉'} />
      <StyledInputText type="number" value={item.avgSalary || ''} disabled />
      {/* 회사 주소*/}
      <ProfileInputs name={'회사 주소'} />
      <StyledInputText
        type="text"
        value={item.address + ', ' + item.detailedAddress || ''}
        disabled
      />
      {/* 회사 소개*/}
      <ProfileInputs name={'회사 소개'} />
      <StyledTextarea
        value={item.description || ''}
        cols="96"
        rows="3"
        disabled
      />
    </div>
  );
}
