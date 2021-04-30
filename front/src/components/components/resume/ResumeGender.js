import React from 'react';

export default function ResumeGender({ onChange, name, value }) {
  return (
    <div style={{ marginLeft: '10px' }}>
      <input
        type="radio"
        name={name}
        value="M"
        onChange={onChange}
        checked={value === 'M'}
      />
      <label>&nbsp;&nbsp;남</label>

      <input
        type="radio"
        name={name}
        value="F"
        onChange={onChange}
        checked={value === 'F'}
        style={{ marginLeft: '100px' }}
      />
      <label>&nbsp;&nbsp;여</label>
    </div>
  );
}
