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

/**
 * 기업회원 상세 컴포넌트
 * 1. useSelector를 이용해서 profile 리덕스 상태를 불러온다.
 * 2. useState를 이용해서 input 값에 들어갈 변수들을 선언하고 빈문자열로 초기화한다.
 * 3. useEffect를 이용해서 profile.profileGetData 리덕스 상태를 조회한 결과를 profileTemp에 저장한다.
 *    - 단, 신규 회원은 개인정보 조회 시 profile.proflieGetDate.picture가 null이므로 이를 처리해주어야 한다.
 * 4. setItem <= profileTemp를 전개 연산자 이용해서 저장한다.
 * 5. 각 항목에 해당하는 item을 뿌려준다.
 */

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
      {/* 회사 주소*/}
      <ProfileInputs name={'회사 주소'} />
      <StyledInputText type="number" value={item.address || ''} disabled />
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
