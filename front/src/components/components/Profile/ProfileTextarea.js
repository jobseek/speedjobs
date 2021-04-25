import React, { useEffect, useRef, useState } from 'react';
import { TextArea, TextAreaLength } from '../Styled';

export default function ProfileTextarea({
  onChange,
  name,
  bio,
  disabled,
  value,
}) {
  const [textLength, setTextLength] = useState('');
  const [result, setResult] = useState(0);

  console.log(value);
  // console.log(value.length);

  function calc() {
    if (value !== null) {
      setResult(value.length);
    } else {
      setResult(textLength.length);
    }
  }

  const ref = useRef();
  useEffect(() => {
    ref.current.innerHTML = bio !== undefined ? bio : '';
    calc();
  }, [bio]);

  const onChangeHandler = (e) => {
    if (e.target.value.length <= 100) {
      setTextLength(e.target.value);
      calc();
    } else {
      alert('100자 이내로 작성해주세요');
    }
  };

  return (
    <>
      <TextArea
        ref={ref}
        id="content"
        cols="96"
        rows="3"
        name={name}
        onChange={onChange}
        onKeyPress={(e) => onChangeHandler(e)}
        onKeyDown={(e) => onChangeHandler(e)}
        onKeyUp={(e) => onChangeHandler(e)}
        disabled={disabled}
        defaultValue={bio}
        value={value}
      />
      <div style={{ textAlign: 'right' }}>
        <TextAreaLength id="result" type="number" value={result} readOnly />
      </div>
    </>
  );
}
