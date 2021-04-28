import React from 'react';
import styled from 'styled-components';
import { StyledButton } from '../../components/Styled';

const Info = styled.div`
  display: flex;
  border-bottom: 1px solid #a1a1a1;
  padding: 5px;
  margin-bottom: 10px;
`;
const Data = styled.div`
  flex: 1;
  text-align: center;
`;
const DataName = styled.div`
  flex: 0 0 100px;
`;

export default function CompanyInfo({ id }) {
  return (
    <>
      <div>
        <h3>네이버</h3>
        <div style={{ marginBottom: '20px' }}></div>
        <Info>
          <DataName>회사이메일</DataName>
          <Data>1@1.com</Data>
        </Info>
        <Info>
          <DataName>기업홈페이지</DataName>
          <Data>naver.com</Data>
        </Info>
        <Info>
          <DataName>사업자등록번호</DataName>
          <Data>12344</Data>
        </Info>
        <Info>
          <DataName>담당자 이름</DataName>
          <Data>홍길동</Data>
        </Info>
        <Info>
          <DataName>담당자 연락처</DataName>
          <Data>0101010101</Data>
        </Info>
      </div>
      <div
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '25px',
        }}
      >
        <StyledButton>확인</StyledButton>
        <StyledButton grey>삭제</StyledButton>
      </div>
    </>
  );
}
