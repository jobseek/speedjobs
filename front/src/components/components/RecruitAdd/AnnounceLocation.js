import React, { useState } from 'react';
import KakaoMap from '../../data/KakaoMap';

export default function AnnounceLocation(props) {
  const [address, setAddress] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  return (
    <>
      <input
        value={address}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            console.log('pressed');
            setSendAddress(address);
          }
        }}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <KakaoMap address={sendAddress}></KakaoMap>
    </>
  );
}
