import React, { useState } from 'react';

export default function ProfileInputs() {
  const [formData, setFormData] = useState({
    gender: '',
  });

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ margin: '0px 10px 15px 10px' }}>
      <div>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleChange}
          checked={formData.gender === 'male'}
        />
        <label>&nbsp;&nbsp;남</label>
      </div>

      <div>
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleChange}
          checked={formData.gender === 'female'}
        />
        <label>&nbsp;&nbsp;여</label>
      </div>

      <div>
        <input
          type="radio"
          name="gender"
          value="noResponse"
          onChange={handleChange}
          checked={formData.gender === 'noResponse'}
        />
        <label>&nbsp;&nbsp;응답없음</label>
      </div>
    </div>
  );
}
