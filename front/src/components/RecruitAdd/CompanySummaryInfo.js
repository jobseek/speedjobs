import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPANY_GET_DONE, COMPANY_GET_REQUEST } from '../../reducers/company';

const Info = styled.div`
  color: #a1a1a1;
  margin-right: 5px;
  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`;

export const InfoText = styled.textarea`
  width: 100%;
  height: 200px;
  resize: none;
  border: 1px solid #a1a1a1;
  border-radius: 15px;
  padding: 5px 10px;
  margin-top: 20px;
  outline: none;
  color: #a1a1a1;
  @media (max-width: 768px) {
    font-size: 0.75em;
  }
`;
// 이름 규모 연락처
export default function CompanySummaryInfo() {
  const dispatch = useDispatch();
  const { user, company } = useSelector((state) => state);
  const [info, setInfo] = useState({});
  // 기업회원 정보조회
  useEffect(() => {
    if (user.me !== null) {
      dispatch({
        type: COMPANY_GET_REQUEST,
        data: { id: user.me.id },
      });
    }
  }, [dispatch, user.me]);
  useEffect(() => {
    if (company.companyGetDone) {
      setInfo(company.companyGetData);
      dispatch({
        type: COMPANY_GET_DONE,
      });
    }
  }, [company.companyGetDone, company.companyGetData, dispatch]);

  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <Info>회사 이름 : {info.companyName}</Info>
        <Info>회사 규모 : {info.scale}명</Info>
        <Info>회사 위치 : {info.address}</Info>
        <Info>평균 연봉 : {info.avgSalary}만 원</Info>
        <Info>연락처 : {info.contact}</Info>
        <InfoText
          placeholder="회사정보 수정은 마이페이지에서 가능합니다."
          value={info.description}
          readOnly
        />
      </div>
    </>
  );
}
