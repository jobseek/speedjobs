import React from 'react';
import styled from 'styled-components';

const MyModal = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  border-radius: 15px;
  padding-top: 20px;
  width: 350px;
  height: 400px;
  background-color: white;
`;

const Back = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: Black;
  opacity: 0.2;
`;

export default function ConfirmPassword(props) {
  return (
    <>
      <Back onClick={() => props.setShow(false)} />
      <MyModal>Component</MyModal>
    </>
  );
}
