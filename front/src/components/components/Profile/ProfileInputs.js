import React from 'react';

export default function ProfileInputs(props) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <span style={{ color: 'red' }}>*&nbsp;&nbsp;</span>
      {props.name}
    </div>
  );
}
