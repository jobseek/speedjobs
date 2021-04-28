import styled from 'styled-components';
import React, { useState } from 'react';
import KakaoMap from '../../data/KakaoMap';

const InputAddress = styled.input`
  margin: 0 0 10px 0;
  width: 50%;
  border: none;
  border-bottom: 1px solid #a1a1a1;

  &:focus {
    outline: none;
  }
`;

export default function AnnounceLocation(props) {
  const [address, setAddress] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  // 앞에 로케이션은 정보를 빼낼때 사용
  const [, setLocation] = useState([]);
  return (
    <>
      <div style={{ margin: '15px 0' }}>
        <InputAddress
          placeholder={'도로명주소를 입력하시고 엔터를 눌러주세요'}
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
        <KakaoMap location={setLocation} address={sendAddress}></KakaoMap>
        {/* <div>{location[0] + ' ' + location[1]}</div> */}
      </div>
    </>
  );
}
