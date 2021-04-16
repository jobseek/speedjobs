import React from 'react';
import {
  ProfileItems,
  ProfileTitles,
  RequiredItems,
  TextArea,
  TextAreaLength,
} from '../Styled';

// 글자 수 표시해주는 함수
function calc() {
  document.getElementById('result').value = document.getElementById(
    'content'
  ).value.length;
}

export default function ProfileContents({ onChange, name }) {
  return (
    <>
      <TextArea
        id="content"
        cols="96"
        rows="3"
        onChange={onChange}
        name={name}
        onKeyDown={calc}
        onKeyUp={calc}
        onKeyPress={calc}
      />
      <div style={{ textAlign: 'right' }}>
        <TextAreaLength id="result" type="number" value="0" readOnly />
      </div>
    </>
  );
}
