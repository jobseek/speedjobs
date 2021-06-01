import React, { useState } from 'react';
import { InputBox, InputPlaceholder } from './adminStyled';

export default function Input({
  placeholder,
  type,
  disabled,
  changeHandler,
  value,
  name,
  onKeyDown,
}) {
  const [focus, set] = useState(false);
  return (
    <>
      <div style={{ position: 'relative' }}>
        <InputPlaceholder focus={focus} value={value !== ''}>
          {placeholder}
        </InputPlaceholder>

        <InputBox
          name={name}
          disabled={disabled}
          onFocus={() => set((p) => !p)}
          onBlur={() => set((p) => !p)}
          value={value}
          onChange={changeHandler}
          onKeyDown={onKeyDown}
          type={type}
        />
      </div>
    </>
  );
}
