import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import Email from '../svg/Email';
import {StyledButton} from '../Styled';
// import { SIGN_UP_DONE } from '../../../reducers/user';

const StyledModal = styled.div`
  position: fixed;
  left: 50%;
  top: 70px;
  transform: translateX(-50%);
  width: 400px;
  height: 250px;
  background-color: white;
  z-index: 11;
  border-radius: 5px;
  @media (max-width: 500px) {
    width: 100%;
    height: 130%;
    left: 0;
    top: 0;
    transform: translateX(0);
    padding-top: 100px;
  }
`;

export default function ModalAlert({
  children,
  text,
  dispatchType,
  setPopModal,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
      dispatch({ type: { dispatchType } });
      // SIGN_UP_DONE
    };
  });
  return (
    <>
      <StyledModal>
        {children}
        <Email></Email>
        <div style={{ marginTop: '35px' }}>{text}</div>
        <StyledButton wide onClick={() => setPopModal(false)}>
          확인
        </StyledButton>
      </StyledModal>
    </>
  );
}
