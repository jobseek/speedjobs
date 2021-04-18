import React from 'react';
import {
  ProfileItems,
  ProfileTitles,
  RequiredItems,
  TextArea,
  TextAreaLength,
} from '../Styled';

function calc() {
  document.getElementById('result').value = document.getElementById(
    'content'
  ).value.length;
}

export default function ProfileContents() {
  return (
    <ProfileItems>
      <ProfileTitles>
        <RequiredItems>*&nbsp;&nbsp;</RequiredItems>한 줄 소개
      </ProfileTitles>
      <TextArea
        id="content"
        cols="96"
        rows="3"
        onKeyDown={calc}
        onKeyUp={calc}
        onKeyPress={calc}
      />
      <div style={{ textAlign: 'right' }}>
        <TextAreaLength id="result" type="number" value="0" readOnly />
      </div>
    </ProfileItems>
  );
}
