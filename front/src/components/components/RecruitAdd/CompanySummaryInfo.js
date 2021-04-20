import styled from 'styled-components';
import React from 'react';
import Input from '../../admin/component/Input';

const Info = styled.div`
  color: #a1a1a1;
  margin-right: 5px;
`;
// 이름 규모 연락처
export default function CompanySummaryInfo({ onChange }) {
  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <Info>회사이름 : (주)어쩌구저쩌구</Info>
        <Info>회사규모 : 조금큼</Info>
        <Info>연락처 : 010-0000-0000</Info>
        <textarea
          placeholder="내용을 입력하세요"
          style={{
            width: '100%',
            height: '200px',
            resize: 'none',
            border: '1px solid #a1a1a1',
            borderRadius: '15px',
            padding: '5px 10px',
            marginTop: '20px',
          }}
          onChange={onChange}
        />
      </div>
    </>
  );
}
