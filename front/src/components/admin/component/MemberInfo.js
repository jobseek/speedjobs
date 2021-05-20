import React, { useCallback, useEffect } from 'react';
import { Data, DataName, Info } from './CompanyInfo';
import { StyledButton } from '../../components/Styled';

export default function MemberInfo({ selected }) {
  useEffect(() => {
    console.log(selected);
  }, [selected]);
  const userInfo = useCallback(() => {
    if (selected.role === 'ROLE_MEMBER') {
      console.log('member');
      return (
        <>
          <div>
            <h3>{selected.name}</h3>
            <div style={{ marginBottom: '20px' }}></div>
            <Info>
              <DataName>이메일</DataName>
              <Data>{selected.email}</Data>
            </Info>
            <Info>
              <DataName>성별</DataName>
              <Data>{selected.gender}</Data>
            </Info>
            <Info>
              <DataName>provider</DataName>
              <Data>{selected.provider}</Data>
            </Info>
            <Info>
              <DataName>생년월일</DataName>
              <Data>{selected.birth.join('-')}</Data>
            </Info>
            <Info>
              <DataName>연락처</DataName>
              <Data>{selected.contact}</Data>
            </Info>
          </div>
        </>
      );
    } else
      return (
        <>
          <div>
            <h3>{selected.companyName}</h3>
            <div style={{ marginBottom: '20px' }}></div>
            <Info>
              <DataName>회사이메일</DataName>
              <Data>{selected.email}</Data>
            </Info>
            <Info>
              <DataName>기업홈페이지</DataName>
              <Data>{selected.homepage}</Data>
            </Info>
            <Info>
              <DataName>사업자등록번호</DataName>
              <Data>{selected.registrationNumber}</Data>
            </Info>
            <Info>
              <DataName>담당자 이름</DataName>
              <Data>{selected.name}</Data>
            </Info>
            <Info>
              <DataName>담당자 연락처</DataName>
              <Data>{selected.contact}</Data>
            </Info>
          </div>
          <div style={{ textAlign: 'right' }}>
            <StyledButton grey>삭제</StyledButton>
          </div>
        </>
      );
  }, [selected]);
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {selected === -1 && <>회원을 선택해주세요</>}
      {selected !== -1 && <>{userInfo()}</>}
    </div>
  );
}
