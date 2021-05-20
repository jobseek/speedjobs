import React from 'react';

export default function SelectGender({ onChange, name, value }) {
  return (
    <div style={{ margin: '0px 10px 15px 10px' }}>
      <div>
        <input
          type="radio"
          name={name}
          value="M"
          onChange={onChange}
          checked={value === 'M'}
        />
        <label>&nbsp;&nbsp;남</label>
      </div>

      <div>
        <input
          type="radio"
          name={name}
          value="F"
          onChange={onChange}
          checked={value === 'F'}
        />
        <label>&nbsp;&nbsp;여</label>
      </div>
    </div>
  );
}
