import React, { useEffect, useState } from 'react';
import KakaoMap from '../../data/KakaoMap';
import DaumAddress from '../../data/DaumAddress';

export default function AnnounceLocation({ form, setForm }) {
  // 도로명주소
  const [, setAddr] = useState('');
  const [location, setLocation] = useState([]);

  const value = location[0];
  const value2 = location[1];

  useEffect(() => {
    setForm((p) => ({ ...p, latitude: value, longitude: value2 }));
  }, [setForm, value2, value]);

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <div>&nbsp;&nbsp;주소</div>
        <DaumAddress
          onChange={setAddr}
          form={form}
          setForm={setForm}
          value={value}
          value2={value2}
        />
        <KakaoMap
          location={setLocation}
          address={form.address}
          setForm={setForm}
        />
      </div>
    </>
  );
}
