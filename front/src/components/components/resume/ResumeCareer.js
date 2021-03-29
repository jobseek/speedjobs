import React from 'react';
import styled from 'styled-components';
import ResumeInputs from './ResumeInputs';

const ResumeTitle = styled.div`
  margin-bottom: 15px;
  font-size: 25px;
`;

const Warning = styled.span`
  margin-left: 20px;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -1px;
  @media (max-width: 992px) {
    display: block;
    margin-left: 0px;
    margin-top: 10px;
    font-size: 10px;
  }
`;

const CareerItems = styled.div`
  padding-left: 30px;
`;

const Test = styled.span`
  margin-right: 10px;
`;

export default function ResumeCareer() {
  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <ResumeTitle>
          경력
          <Warning>
            <span
              style={{
                fontSize: '17px',
              }}
            >
              +
            </span>
            &nbsp;&nbsp;버튼을 누르면 추가할 수 있습니다.
          </Warning>
        </ResumeTitle>
        <CareerItems>
          <Test>
            <ResumeInputs name={'회사명'} />
          </Test>
          <Test>
            <ResumeInputs name={'직무'} />
          </Test>
          <ResumeInputs small name={'기간'} />
        </CareerItems>
        <CareerItems>
          <Test>
            <ResumeInputs name={'회사명'} />
          </Test>
          <Test>
            <ResumeInputs name={'직무'} />
          </Test>
          <ResumeInputs small name={'기간'} />
        </CareerItems>
      </div>
    </>
  );
}
