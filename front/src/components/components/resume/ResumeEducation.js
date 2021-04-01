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

const MyEducation = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const EducationItems = styled.div`
  padding-left: 30px;
  @media (max-width: 992px) {
    padding-left: 0px;
  }
`;

const Test = styled.span`
  margin-right: 10px;
`;

export default function ResumeEducation() {
  return (
    <>
      <div
        style={{
          marginBottom: '30px',
        }}
      >
        <ResumeTitle>
          학력
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
        <div className={'col-12'}>
          <EducationItems>
            <MyEducation>고등학교</MyEducation>
            <div>
              <Test>
                <ResumeInputs name={'학교명'} />
              </Test>
              <Test>
                <ResumeInputs name={'문과/이과/예체능'} />
              </Test>
              <ResumeInputs small name={'기간'} />
            </div>
          </EducationItems>
          <EducationItems>
            <MyEducation>대학교</MyEducation>
            <Test>
              <ResumeInputs name={'학교명'} />
            </Test>
            <Test>
              <ResumeInputs name={'전공'} />
            </Test>
            <ResumeInputs small name={'기간'} />
          </EducationItems>
        </div>
      </div>
    </>
  );
}
