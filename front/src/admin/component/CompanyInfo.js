import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledButton } from '../../components/Styled';
import {
  COMPANY_ALLOW_DONE,
  COMPANY_ALLOW_REQUEST,
} from '../../reducers/admin';

export const Info = styled.div`
  display: flex;
  border-bottom: 1px solid #a1a1a1;
  padding: 5px;
  margin-bottom: 10px;
`;
export const Data = styled.div`
  flex: 1;
  text-align: center;
`;
export const DataName = styled.div`
  flex: 0 0 100px;
`;

export default function CompanyInfo({ info, set, refresh }) {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state);

  const companyAllow = useCallback(() => {
    dispatch({
      type: COMPANY_ALLOW_REQUEST,
      data: info,
    });
  }, [info, dispatch]);

  useEffect(() => {
    if (admin.companyAllowDone || admin.companyAllowFail) {
      if (admin.companyAllowDone) {
        set(-1);
        refresh(true);
      }
      dispatch({
        type: COMPANY_ALLOW_DONE,
      });
    }
  }, [admin.companyAllowDone, admin.companyAllowFail, dispatch, refresh, set]);
  return (
    <>
      <div>
        <h3>{info.companyName}</h3>
        <div style={{ marginBottom: '20px' }}></div>
        <Info>
          <DataName>회사이메일</DataName>
          <Data>{info.email}</Data>
        </Info>
        <Info>
          <DataName>기업홈페이지</DataName>
          <Data>{info.homepage}</Data>
        </Info>
        <Info>
          <DataName>사업자등록번호</DataName>
          <Data>{info.registrationNumber}</Data>
        </Info>
        <Info>
          <DataName>담당자 이름</DataName>
          <Data>{info.name}</Data>
        </Info>
        <Info>
          <DataName>담당자 연락처</DataName>
          <Data>{info.contact}</Data>
        </Info>
      </div>
      <div
        style={{
          position: 'absolute',
          right: '20px',
          bottom: '25px',
        }}
      >
        <StyledButton onClick={() => companyAllow()}>확인</StyledButton>
        <StyledButton grey>삭제</StyledButton>
      </div>
    </>
  );
}
