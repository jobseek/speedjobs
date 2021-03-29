import React from 'react';
import styled from 'styled-components';

import { TextAreaCombine } from '../Styled';

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

export default function ResumeSelf() {
  return (
    <>
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <ResumeTitle>
          자기소개
          <Warning>자유양식으로 500자 이내로 작성해주세요</Warning>
        </ResumeTitle>
        <TextAreaCombine cols="96" rows="10" />
      </div>
    </>
  );
}
