import styled from 'styled-components';
import React, { useEffect, useRef } from 'react';
import Loading from '../Notification/Loading';

const MsgHistory = styled.div`
  position: relative;
  height: 516px;
  background-color: #ffffff;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 3px;
    background-color: white;
  }
  &::-webkit-scrollbar-thumb {
    width: 3px;
    background-color: grey;
    border-radius: 20px;
  }
  @media (max-width: 992px) {
    height: calc(100% - 100px);
  }
`;

export default function HistoryBox({ loading, ...props }) {
  const ref = useRef();
  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [props.children]);
  return (
    <>
      <MsgHistory ref={ref}>
        {loading ? <Loading></Loading> : props.children}
      </MsgHistory>
    </>
  );
}
