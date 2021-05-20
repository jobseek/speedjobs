import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COMPANY_GET_REQUEST } from '../../../reducers/company';

const Info = styled.div`
  color: #a1a1a1;
  margin-right: 5px;
`;
// 이름 규모 연락처
export default function CompanySummaryInfo() {
  const dispatch = useDispatch();
  const { user, company } = useSelector((state) => state);
  const [info, setInfo] = useState({});
  // 기업회원 정보조회
  useEffect(() => {
    dispatch({
      type: COMPANY_GET_REQUEST,
      data: { id: user.me.id },
    });
  }, [dispatch, user.me?.id]);
  useEffect(() => {
    if (company.companyGetDone) {
      setInfo(company.companyGetData);
    }
  }, [company.companyGetDone, company.companyGetData]);

  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <Info>회사이름 : {info.companyName}</Info>
        <Info>회사규모 : {info.scale}명</Info>
        <Info>연락처 : {info.contact}</Info>
        <textarea
          placeholder="회사정보 수정은 마이페이지에서 가능합니다."
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
            border: '1px solid #a1a1a1',
            borderRadius: '15px',
            padding: '5px 10px',
            marginTop: '20px',
            outline: 'none',
          }}
          value={info.description}
          readOnly
        />
      </div>
    </>
  );
}
