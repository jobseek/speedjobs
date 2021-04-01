import React from 'react';
import { ResumeTitle, TextAreaCombine, Warning } from '../Styled';

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
