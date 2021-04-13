import React from 'react';
import { TextAreaCombine, Warning } from '../Styled';

export default function ResumeSelf() {
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <h5 style={{ marginBottom: '15px' }}>
          자기소개
          <Warning>자유양식으로 500자 이내로 작성해주세요</Warning>
        </h5>
        <TextAreaCombine cols="96" rows="10" />
      </div>
    </>
  );
}
