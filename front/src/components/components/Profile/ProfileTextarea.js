import React, { useState } from 'react';
import { TextArea, TextAreaLength } from '../Styled';

/**
 * 한 줄 소개, 회사 소개 컴포넌트
 * 1. 상위 컴포넌트에서 onChange, name, value를 가져온다.
 * 2. useState를 이용해서 변경된 내용을 담을 text와 내용의 길이를 담을 result를 초기화 해준다.
 * 3. onChangeHandler 이벤트를 이용해서 변경된 내용이 100자 이내일 경우와 초과될 경우를 고려한다.
 * 4. 100자 이내일 경우 text에 변경된 내용을 담고, result에 변경된 내용의 길이를 담는다.
 * 5. 100자 초과일 경우 경고창을 띄운다.
 * 6. name, onChange, value에는 상위 컴포넌트에서 받아온 props를 담는다.
 * 7. onKeyPress, onKeyDown, onKeyUp에 onChangeHandler 이벤트를 걸어준다.
 * 8. 마지막으로 TextAreaLength 태그 안에 value에 변경된 내용의 길이 result를 담는다.
 */

export default function ProfileTextarea({ name, form, setForm }) {
  const [result, setResult] = useState(0);

  function calc() {
    setResult(form.bio.length);
  }

  const onChangeBio = (e) => {
    if (e.target.value.length <= 100) {
      setForm((p) => ({ ...p, bio: e.target.value }));
    } else {
      alert('100자 이내로 작성해주세요');
    }
  };

  return (
    <>
      <TextArea
        cols="96"
        rows="3"
        name={name}
        onChange={(e) => onChangeBio(e)}
        onKeyPress={calc}
        onKeyDown={calc}
        onKeyUp={calc}
        value={form.bio}
      />
      <div style={{ textAlign: 'right' }}>
        <TextAreaLength type="number" value={result} readOnly />
      </div>
    </>
  );
}
