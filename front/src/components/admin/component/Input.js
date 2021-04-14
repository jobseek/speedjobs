import React, { useState } from 'react';
import { InputBox, InputPlaceholder } from './adminStyled';

export default function Input({ placeholder, type }) {
  const [focus, set] = useState(false);
  const [value, setValue] = useState('');
  return (
    <>
      <div style={{ position: 'relative' }}>
        <InputPlaceholder focus={focus} value={value !== ''}>
          {placeholder}
        </InputPlaceholder>

        <InputBox
          onFocus={() => set((p) => !p)}
          onBlur={() => set((p) => !p)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
        />
      </div>
    </>
  );
}
