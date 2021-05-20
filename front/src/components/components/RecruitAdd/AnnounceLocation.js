import React, { useState } from 'react';
import KakaoMap from '../../data/KakaoMap';
import DaumAddress from '../../data/DaumAddress';

export default function AnnounceLocation(props) {
  const [address, setAddress] = useState('');
  // 앞에 로케이션은 정보를 빼낼때 사용
  const [, setLocation] = useState([]);
  return (
    <>
      <div style={{ margin: '15px 0' }}>
        <DaumAddress onChange={setAddress} />
        <KakaoMap location={setLocation} address={address}></KakaoMap>
        {/* <div>{location[0] + ' ' + location[1]}</div> */}
      </div>
    </>
  );
}
