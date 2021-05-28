import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { InputText } from '../components/Styled';

const MyInputText = styled(InputText)`
  width: 100%;
  display: inline-block;
`;

export default function DaumAddress({
  onChange,
  setForm,
  form,
  value,
  value2,
}) {
  const addressStyle = {
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    border: '1px solid #eee',
    position: 'fixed',
    top: '200px',
    width: '30%',
    zIndex: '2',
  };
  const [isOpen, setIsOpen] = useState(false);
  const [fullAddress] = useState('');
  const [addr, setAddr] = useState('');
  const [detailedAddr] = useState('');
  const [, setExAddress] = useState('');
  const [, setZipcode] = useState('');
  const dropRef = useRef();

  const onClickHandler = (e) => {
    if (dropRef.current) {
      if (isOpen && !dropRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
  };

  const handleComplete = (data) => {
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
    setAddr(fullAddr); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setExAddress(extraAddr);
    setZipcode(data.zonecode);
  };
  const detailedAddrHandler = useCallback(
    (e) => {
      setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    },
    [setForm]
  );

  useEffect(() => {
    if (addr !== '') {
      setForm((p) => ({
        ...p,
        address: addr,
        latitude: value,
        longitude: value2,
        detailedAddress: detailedAddr,
      }));
    } else {
      setForm((p) => ({
        ...p,
        address: p.address,
        latitude: p.latitude,
        longitude: p.longitude,
        detailedAddress: p.detailedAddress,
      }));
    }
  }, [addr, setForm, value, value2, detailedAddr]);
  useEffect(() => {
    onChange(fullAddress);
  }, [fullAddress, onChange]);

  useEffect(() => {
    addEventListener('click', onClickHandler, true);
    return () => {
      removeEventListener('click', onClickHandler, true);
    };
  });

  return (
    <>
      <div>
        {isOpen && (
          <DaumPostcode style={addressStyle} onComplete={handleComplete} />
        )}
        <div ref={dropRef} style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <MyInputText
            type="text"
            name="roadAddress"
            placeholder="주소"
            value={form.address}
            onClick={() => setIsOpen(isOpen !== true)}
            readOnly
          />
          <MyInputText
            type="text"
            name="detailedAddress"
            placeholder="상세주소"
            value={form.detailedAddress}
            onChange={(e) => detailedAddrHandler(e)}
          />
        </div>
      </div>
    </>
  );
}
