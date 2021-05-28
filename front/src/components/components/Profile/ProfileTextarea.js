import React, { useState } from 'react';
import { TextArea, TextAreaLength } from '../Styled';

export default function ProfileTextarea({ onChange, value }) {
  const [result, setResult] = useState(0);

  function calc() {
    setResult(value.length);
  }

  return (
    <>
      <TextArea
        cols="96"
        rows="3"
        value={value}
        onChange={(e) => onChange(e)}
        onKeyPress={calc}
        onKeyDown={calc}
        onKeyUp={calc}
      />
      <div style={{ textAlign: 'right' }}>
        <TextAreaLength type="number" value={result} readOnly />
      </div>
    </>
  );
}
