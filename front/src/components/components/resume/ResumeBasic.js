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

const Private = styled.span`
  position: relative;
  margin-top: 10px;
  float: right;
  font-size: 14px;
  font-weight: bold;
  @media (max-width: 992px) {
    top: -65px;
  }
`;

const ResumeImg = styled.div`
  display: inline-block;
  border: 1px solid black;
  width: 180px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  margin-top: 12px;
  margin-left: 30px;
  @media (max-width: 992px) {
    margin-left: 0px;
  }
`;

export default function ResumeBasic() {
  return (
    <>
      <ResumeTitle>
        기본 정보
        <Warning>
          입력하신 정보는 절대 사용자 동의 없이 외부로 유출, 공개되지 않습니다.
        </Warning>
        <Private>비공개</Private>
      </ResumeTitle>
      <div
        className={'row m-0 p-0'}
        style={{
          marginBottom: '10px',
        }}
      >
        <div className={'col-12 col-lg-4 text-center'}>
          <ResumeImg>이미지 업로드</ResumeImg>
        </div>
        <div className={'col-12 col-lg-4'}>
          {/* 이름 */}
          <ResumeInputs name={'이름'} />
          {/* 이메일 */}
          <ResumeInputs name={'이메일'} />
          {/* 연락처 */}
          <ResumeInputs name={'연락처'} />
        </div>
        <div className={'col-12 col-lg-4'}>
          {/* 생년월일 */}
          <ResumeInputs name={'생년월일'} />
          {/* 성별 */}
          <ResumeInputs name={'성별'} />
        </div>
      </div>
      <div
        style={{
          width: '100%',
          marginBottom: '30px',
        }}
      >
        <ResumeInputs wide name={'주소'} />
        <ResumeInputs wide name={'SNS'} />
      </div>
    </>
  );
}
