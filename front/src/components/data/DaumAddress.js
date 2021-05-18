import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { StyledButton } from '../components/Styled';

export default function DaumAddress({ onChange }) {
  const addressStyle = {
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    border: '1px solid #eee',
    position: 'fixed',
    top: '200px',
    width: '78%',
    zIndex: '5',
  };
  const [isOpen, setIsOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [exAddress, setExAddress] = useState('');
  const [zipcode, setZipcode] = useState('');

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const handleComplete = (data) => {
    console.log('data= ', data);
    const fullAddr = data.address;
    let extraAddr = '';
    if (isOpen) {
      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddr +=
            extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        extraAddr += extraAddr !== '' ? `(${extraAddr})` : '';
      }
      setIsOpen(false);
    }
    setAddress(fullAddr); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setExAddress(extraAddr);
    setZipcode(data.zonecode);
  };
  useEffect(() => {
    if (detailAddress !== '') setFullAddress(address + ' ' + detailAddress);
  }, [address, detailAddress]);
  useEffect(() => {
    console.log(fullAddress);
    onChange(fullAddress);
  }, [fullAddress, onChange]);

  // const showRef = useRef();
  // const ClickHandler = (e) => {
  //   if (showRef.current) {
  //     if (isOpen && !showRef.current.contains(e.target)) {
  //       setIsOpen(false);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   addEventListener('click', ClickHandler, true);
  //   return () => {
  //     removeEventListener('click', ClickHandler, true);
  //   };
  // });
  return (
    <div>
      <div>
        <input
          type="text"
          name="postcode"
          placeholder="우편번호"
          value={zipcode}
          style={{ width: '25%' }}
        />
        <StyledButton mid onClick={() => onClickHandler()}>
          우편번호 찾기
        </StyledButton>
        {isOpen && (
          <DaumPostcode
            style={addressStyle}
            onComplete={handleComplete}
            // ref={showRef}
          />
        )}
      </div>
      <input
        type="text"
        name="roadAddress"
        placeholder="주소"
        value={address}
        style={{ width: '100%' }}
      />
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          name="detailAddress"
          placeholder="상세주소"
          onChange={(e) => setDetailAddress(e.target.value)}
          style={{ width: '70%' }}
        />
        <input
          type="text"
          name="extraAddress"
          placeholder="참고항목"
          value={exAddress}
          style={{ width: '30%' }}
        />
      </div>
    </div>
  );
}
