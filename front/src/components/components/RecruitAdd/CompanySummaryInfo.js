import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { DataInputs } from '../Styled';
import { COMPANY_GET_DONE } from '../../../reducers/company';

const InfoTitle = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 35px;
`;

const InfoDetails = styled.div`
  margin-bottom: 10px;
`;

const Infos = styled.div`
  display: inline-block;
  width: 33%;
  margin-bottom: 10px;

  @media (max-width: 992px) {
    width: 50%;
  }
`;

const Labels = styled.div`
  width: 120px;
  margin-right: 5px;
`;

const Inputs = styled(DataInputs)`
  width: 90%;
`;

export default function CompanySummaryInfo({ onChange }) {
  const company = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    if (company.companyGetData) {
      setData({ ...company.companyGetData });
      dispatch({
        type: COMPANY_GET_DONE,
      });
    }
  }, [company, dispatch]);

  return (
    <>
      <InfoTitle>회사 요약정보</InfoTitle>
      <InfoDetails>
        <Infos>
          <Labels>회사명</Labels>
          <Inputs
            type="text"
            name="companyName"
            value={data.companyName}
            readOnly
          />
        </Infos>
        <Infos>
          <Labels>회사 홈페이지</Labels>
          <Inputs type="text" name="homepage" value={data.homepage} readOnly />
        </Infos>
        <Infos>
          <Labels>회사 규모</Labels>
          <Inputs type="text" name="scale" value={data.scale} readOnly />
        </Infos>
        <Infos>
          <Labels>사업자 등록번호</Labels>
          <Inputs
            type="text"
            name="registrationNumber"
            value={data.registrationNumber}
            readOnly
          />
        </Infos>
        <Infos>
          <Labels>담당자</Labels>
          <Inputs type="text" name="name" value={data.name} readOnly />
        </Infos>
        <Infos>
          <Labels>연락처</Labels>
          <Inputs type="text" name="contact" value={data.contact} readOnly />
        </Infos>
        <Infos style={{ display: 'block', width: '95%' }}>
          <Labels>회사 소개</Labels>
          <textarea
            name="description"
            placeholder="회사정보 수정은 마이페이지에서 가능합니다."
            style={{
              width: '100%',
              height: '100px',
              resize: 'none',
              outline: 'none',
            }}
            value={data.description}
            readOnly
          />
        </Infos>
      </InfoDetails>
    </>
  );
}
