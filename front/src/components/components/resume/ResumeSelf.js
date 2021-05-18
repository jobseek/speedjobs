import React, { useState } from 'react';
import { TextArea, TextAreaLength, Warning } from '../Styled';

export default function ResumeSelf({ onChangeIntro, form }) {
  const [result, setResult] = useState(0);

  function calc() {
    setResult(form.coverLetter.length);
  }

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <h5 style={{ marginBottom: '15px' }}>
          자기소개
          <Warning>자유양식으로 500자 이내로 작성해주세요</Warning>
        </h5>
        <div
          className={'container-fluid'}
          style={{ padding: '0 0p 0px 30px', width: '100%' }}
        >
          <TextArea
            cols="96"
            rows="10"
            value={form.coverLetter}
            onChange={(e) => onChangeIntro(e)}
            onKeyPress={calc}
            onKeyDown={calc}
            onKeyUp={calc}
          />
          <div style={{ textAlign: 'right' }}>
            <TextAreaLength type="number" value={result} readOnly />
          </div>
        </div>
      </div>
    </>
  );
}
