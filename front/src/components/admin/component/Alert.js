import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StyledButton } from '../../components/Styled';

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  text-align: center;
  height: 230px;
  background-color: white;
  padding: 50px;
  box-shadow: 1px 1px 15px #949494;
  box-shadow: 1px 1px 20px #d7d7d7;
  border-radius: 5px;
`;

export default function Alert({ children, setAlert, onOk }) {
  const ref = useRef();
  const onClickHandler = useCallback(
    (e) => {
      if (!ref.current?.contains(e.target)) {
        console.log('event');
        setAlert(false);
      }
    },
    [setAlert]
  );
  useEffect(() => {
    document.addEventListener('click', onClickHandler);
    return () => {
      document.removeEventListener('click', onClickHandler);
    };
  }, [onClickHandler]);
  return (
    <Container ref={ref}>
      {children}
      <div style={{ marginTop: '40px' }}>
        <StyledButton onClick={onOk}>확인</StyledButton>
        <StyledButton grey onClick={() => setAlert(false)}>
          취소
        </StyledButton>
      </div>
    </Container>
  );
}
